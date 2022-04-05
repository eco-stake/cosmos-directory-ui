import { Fragment } from "react";
import { 
  CRow, 
  CCol, 
  CCardBody, 
  CCardTitle,
} from '@coreui/react'
import _ from "lodash";
import Panel from "./Panel";
import DataTable from './DataTable'

function OverviewPanel(props) {
  const { chain, assetlist, status } = props

  function baseAsset(){
    return assetlist.assets && assetlist.assets[0];
  }

  function image(){
    return baseAsset()?.logo_URIs?.svg || baseAsset()?.logo_URIs?.png
  }

  function render(){
    const data = [
      {
        key: 'Chain ID',
        value: chain.chain_id
      }
    ]
    if (chain.codebase?.recommended_version) data.push({
      key: 'Version',
      value: chain.codebase.recommended_version
    })
    if (baseAsset()?.symbol) data.push({
      key: 'Token',
      value: baseAsset()?.symbol
    })
    data.push(...[
      {
        key: 'Status',
        value: chain.status === 'live' ? <span className="text-success p-0">Live</span> : <span className="text-danger p-0">{_.startCase(chain.status)}</span>
      },
      {
        key: 'APIs',
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
            <img src={image() || 'https://craftypixels.com/placeholder-image/60x60/ffffff/a6a6a6&text=missing'} className="m-2 rounded-circle shadow overflow-hidden" width={80} height={80} />
          </CCol>
          <CCol md={10}>
            <CCardBody>
              <CCardTitle className="mb-3">{chain.pretty_name}</CCardTitle>
              <DataTable bodyClass="small" data={data} />
            </CCardBody>
          </CCol>
        </CRow>
      </Panel>
    )
  }

  return render()
}

export default OverviewPanel