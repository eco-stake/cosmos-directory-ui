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
  const [activeKey, setActiveKey] = useState(types[0])

  const data = apiTypes.reduce((sum, type) => {
    const apis = props.apis[type]
    if (!apis || !apis.length) return sum
    sum[type] = apis.map(api => {
      const apiStatus = status[type]?.current[api.address]
      const addressLink = <a href={api.address} target="_blank">{api.address}</a>
      return {
        key: api.address,
        label: api.provider ? <span>{api.provider}<br />{addressLink}</span> : addressLink,
        value: !apiStatus ? (
          <span>Status: <em>Unknown</em></span>
          ) : (
          <CTable small>
            <tbody className="small">
              <tr>
                <td>Status</td>
                <td>{apiStatus.available ? <span className="text-success p-0">Available</span> : <span className="text-danger p-0">Unavailable</span>}</td>
              </tr>
              <tr>
                <td>Height</td>
                <td>{apiStatus.blockHeight}</td>
              </tr>
              <tr>
                <td>Response time</td>
                <td>{apiStatus.responseTime}</td>
              </tr>
              <tr>
                <td>Last check</td>
                <td><Moment fromNow>{apiStatus.lastCheck}</Moment></td>
              </tr>
            </tbody>
          </CTable>
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

  return (
    <Panel title={`${props.title || 'Nodes'}`}>
      <>
        <CNav variant="tabs" role="tablist">
          {types.map(type => {
            return (
              <CNavItem key={type}>
                <CNavLink className="small" role="button" active={activeKey === type} onClick={() => setActiveKey(type)}>
                  {apiTypes.includes(type) ? type.toUpperCase() : _.startCase(type)}
                </CNavLink>
              </CNavItem>
            )
          })}
        </CNav>
        <CTabContent>
          {apiTypes.map(type => {
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
          {peerTypes.map(type => {
            return (
              <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === type} key={type}>
                <DataTable bodyClass="small" columnclass="align-middle small" data={data[type]} header={['Provider', 'Address']} />
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