import React, { useState, useEffect } from "react";
import {
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CTable,
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
  const [panelData, setPanelData] = useState({})
  const [activeKey, setActiveKey] = useState(types.find(type => {
    return (props.apis && props.apis[type]?.length) || (props.peers && props.peers[type]?.length)
  }))

  useEffect(() => {
    setPanelData((panelData) => {
      const data = apiTypes.reduce((sum, type) => {
        const apis = props.apis[type]
        if (!apis || !apis.length) return sum
        if (panelData && panelData[type]) {
          apis.sort((a, b) => {
            return panelData[type].findIndex(el => el.key === type + a.address) - panelData[type].findIndex(el => el.key === type + b.address);
          });
        }else{
          apis.sort((a, b) => {
            const aStatus = status[type]?.current[a.address] || {}
            const bStatus = status[type]?.current[b.address] || {}
            if (aStatus.available === bStatus.available) {
              return parseInt(aStatus.responseTime) - parseInt(bStatus.responseTime)
              // return a.address > b.address ? 1 : -1
            };
            if (aStatus.available) return -1;
            return 1;
          })
        }
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
                <CTable small className="">
                  <tbody className="small">
                    <tr>
                      <td className="w-25">Status</td>
                      <td className="w-50">{apiStatus.available ? <span className="text-success p-0">Available</span> : <span className="text-danger p-0">Unavailable</span>}</td>
                    </tr>
                    <tr>
                      <td>Height</td>
                      <td className={apiStatus.blockHeight < chain.height - 10 ? 'text-danger' : ''}>{apiStatus.blockHeight > 0 ? apiStatus.blockHeight : '-'}</td>
                    </tr>
                    <tr>
                      <td>Response time</td>
                      <td>{apiStatus.responseTime || '-'}ms</td>
                    </tr>
                    <tr>
                      <td className="d-none d-md-table-cell">Last check</td>
                      <td className="d-none d-md-table-cell"><em><Moment fromNow>{apiStatus.lastCheck}</Moment></em></td>
                    </tr>
                    {apiStatus.lastError && (
                      <tr>
                        <td>Last error</td>
                        <td><span className={apiStatus.available ? 'opacity-50' : ''}>{apiStatus.lastError}<br /><em><Moment fromNow>{apiStatus.lastErrorAt}</Moment></em></span></td>
                      </tr>
                    )}
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

      return data
    })
  }, [props.apis, props.peers]);


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
          {types.filter(el => panelData[el] && panelData[el].length).map(type => {
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
          {apiTypes.filter(el => panelData[el] && panelData[el].length).map(type => {
            return (
              <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === type} key={type}>
                {['rpc', 'rest'].includes(type) &&
                  <p className="alert alert-secondary small mt-2">
                    <strong>{type.toUpperCase()} Proxy:</strong> <a href={`https://${type}.${process.env.DIRECTORY_DOMAIN}/${chain.path}`} target="_blank">{`https://${type}.${process.env.DIRECTORY_DOMAIN}/${chain.path}`}</a>
                  </p>
                }
                <DataTable bodyClass="small" columnclass="align-middle" labelclass="text-break w-25" valueclass="w-50" data={props.limit ? _.take(panelData[type], props.limit) : panelData[type]} header={['Provider', 'Status']} />
              </CTabPane>
            )
          })}
          {peerTypes.filter(el => panelData[el] && panelData[el].length).map(type => {
            return (
              <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === type} key={type}>
                <DataTable bodyClass="small" columnclass="align-middle small" labelclass="d-none d-md-table-cell" valueclass="text-break" data={panelData[type]} header={['Provider', 'Address']} />
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
