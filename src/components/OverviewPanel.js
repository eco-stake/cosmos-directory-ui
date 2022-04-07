import React, { Fragment } from 'react'
import { Link } from "react-router-dom";
import { 
  CRow, 
  CCol, 
  CCardBody, 
  CCardTitle,
} from '@coreui/react'
import _ from "lodash";
import Panel from "./Panel";
import DataTable from './DataTable'
import ChainImage from "./ChainImage";

function OverviewPanel(props) {
  const { chain, assetlist, status } = props

  function baseAsset(){
    return assetlist.assets && assetlist.assets[0];
  }

  function render(){
    const data = [
      {
        key: 'Chain ID',
        value: chain.chain_id
      },
      {
        key: 'Height',
        value: status.height
      }
    ]
    if (baseAsset()?.symbol) data.push({
      key: 'Token',
      value: baseAsset()?.symbol
    })
    data.push(...[
      {
        key: 'Chain Status',
        value: chain.status === 'live' ? <span className="text-success p-0">Live</span> : <span className="text-danger p-0">{_.startCase(chain.status)}</span>
      },
      {
        key: 'API Status',
        value: status.available ? <span className="text-success p-0">Available</span> : <span className="text-danger p-0">Unavailable</span>
      },
    ])
    if(chain.explorers){
      data.push({
        key: 'Explorers',
        value: chain.explorers.map(explorer => {
          return (
            <Fragment key={explorer.url}>
              <a href={explorer.url} key={explorer.url} target="_blank">{explorer.url}</a><br />
            </Fragment> 
          )
        })
      })
    }
    return (
      <Panel key={'overview-' + chain.chain_name}>
        <CRow className="g-0">
          <CCol md={2} className="text-center">
            <ChainImage chain={chain} assetlist={assetlist} width={80} height={80} className="m-2 shadow overflow-hidden" />
          </CCol>
          <CCol md={10}>
            <CCardBody>
              <CCardTitle className="mb-3">{chain.pretty_name}</CCardTitle>
              <DataTable bodyClass="small" valueclass="text-break" data={data} />
              <div className="text-end">
                <Link to={`/${chain.path}/chain`} className="btn btn-light">See more</Link>
              </div>
            </CCardBody>
          </CCol>
        </CRow>
      </Panel>
    )
  }

  return render()
}

export default OverviewPanel