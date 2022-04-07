import React, { useState } from "react";
import { 
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CTable
} from '@coreui/react'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import Panel from "./Panel"
import DataTable from './DataTable'
import _ from 'lodash'

function NodePanel(props) {
  const { status, chain } = props
  if(!props.apis && !props.peers) return null

  const apiTypes = Object.keys(props.apis || {})
  const peerTypes = Object.keys(props.peers || {})
  const types = apiTypes.concat(peerTypes)
  const [activeKey, setActiveKey] = useState(types.find(type => {
    return (props.apis && props.apis[type]?.length) || (props.peers && props.peers[type]?.length)
  }))

  const data = apiTypes.reduce((sum, type) => {
    const apis = props.apis[type]
    if (!apis || !apis.length) return sum
    apis.sort((a, b) => {
      const aStatus = status[type]?.current[a.address] || {}
      const bStatus = status[type]?.current[b.address] || {}
      if (aStatus.available === bStatus.available){
        return parseInt(aStatus.responseTime) - parseInt(bStatus.responseTime)
        // return a.address > b.address ? 1 : -1
      };
      if (aStatus.available) return -1;
      return 1;
    })
    sum[type] = apis.map(api => {
      const apiStatus = status[type]?.current[api.address]
      const addressLink = <a href={api.address} target="_blank">{api.address}</a>
      return {
        key: type + api.address,
        label: api.provider ? <span>{api.provider}<br /><span className="small">{addressLink}</span></span> : <span className="small">{addressLink}</span>,
        value: !apiStatus ? (
          <span><em>Unknown</em></span>
          ) : (
            <>
              {apiStatus.available ? (
                <span className="d-xs-inline d-md-none text-success small">{apiStatus.responseTime || '-'}ms</span>
              ) : (
                <span className="d-xs-inline d-md-none text-danger small">N/A</span>
              )}
              <CTable small className="d-none d-md-table">
                <tbody className="small">
                  <tr>
                    <td>Status</td>
                    <td>{apiStatus.available ? <span className="text-success p-0">Available</span> : <span className="text-danger p-0">Unavailable</span>}</td>
                  </tr>
                  <tr>
                    <td>Height</td>
                    <td className={apiStatus.blockHeight < chain.height - 10 ? 'text-danger' : ''}>{apiStatus.blockHeight}</td>
                  </tr>
                  <tr>
                    <td>Response time</td>
                    <td>{apiStatus.responseTime || '-'}ms</td>
                  </tr>
                  <tr>
                    <td>Last error</td>
                    <td>{apiStatus.lastError}<br /><Moment fromNow>{apiStatus.lastErrorAt}</Moment></td>
                  </tr>
                  <tr>
                    <td>Last check</td>
                    <td><Moment fromNow>{apiStatus.lastCheck}</Moment></td>
                  </tr>
                </tbody>
              </CTable>
            </>
        )
      }
    })
    return sum
  }, {})

  peerTypes.reduce((sum, type) => {
    const peers = props.peers[type]
    if (!peers || !peers.length) return sum

    sum[type] = peers.map(peer => {
      return {
        key: peer.id.concat(peer.address),
        label: peer.provider ? peer.provider : <em>Unknown</em>,
        value: `${peer.id}@${peer.address}`
      }
    })
    return sum
  }, data)

  const tabs = {
    'rpc': 'RPC',
    'grpc': 'GRPC',
    'rest': 'REST',
    'seeds': 'Seeds',
    'persistent_peers': 'Peers'
  }

  return (
    <Panel title={`${props.title || 'Nodes'}`}>
      <>
        <CNav variant="tabs" role="tablist">
          {types.filter(el => data[el] && data[el].length).map(type => {
            return (
              <CNavItem key={type}>
                <CNavLink className="small px-2 px-md-3" role="button" active={activeKey === type} onClick={() => setActiveKey(type)}>
                  {tabs[type] || _.startCase(type)}
                </CNavLink>
              </CNavItem>
            )
          })}
        </CNav>
        <CTabContent>
          {apiTypes.filter(el => data[el] && data[el].length).map(type => {
            return (
              <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === type} key={type}>
                {['rpc', 'rest'].includes(type) &&
                  <p className="alert alert-secondary small mt-2">
                    <strong>{type.toUpperCase()} Proxy:</strong> <a href={`https://${type}.cosmos.directory/${chain.path}`} target="_blank">{`https://${type}.cosmos.directory/${chain.path}`}</a>
                  </p>
                }
                <DataTable bodyClass="small" columnclass="align-middle" data={props.limit ? _.take(data[type], props.limit) : data[type]} header={['Provider/Address', 'Check']} />
              </CTabPane>
            )
          })}
          {peerTypes.filter(el => data[el] && data[el].length).map(type => {
            return (
              <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === type} key={type}>
                <DataTable bodyClass="small" columnclass="align-middle small" labelclass="d-none d-md-table-cell" valueclass="text-break" data={data[type]} header={['Provider', 'Address']} />
              </CTabPane>
            )
          })}
        </CTabContent>
        {props.limit && (
        <div className="text-end">
          <Link to={`/${chain.path}/nodes`} className="btn btn-light">See more</Link>
        </div>
        )}
      </>
    </Panel>
  )
}

export default NodePanel