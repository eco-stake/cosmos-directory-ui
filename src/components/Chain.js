import React, { Fragment, useEffect, useState } from "react";
import { 
  CContainer, 
  CRow, 
  CCol, 
  CCard, 
  CCardBody, 
  CCardTitle,
  CSpinner
} from '@coreui/react'
import DataTable from './DataTable'

function Chain(props) {
  const { chainName, directory } = props
  const [chain, setChain] = useState()
  const [assetlist, setAssetlist] = useState()
  const [status, setStatus] = useState()
  
  useEffect(() => {
    if(chain && chainName != chain.name){
      setChain(undefined)
      setAssetlist(undefined)
      setStatus(undefined)
    }
  })

  useEffect(() => {
    if(!chain){
      directory.getChainData(chainName).then(chain => {
        setChain(chain)
      })
    }
  });

  useEffect(() => {
    if(!assetlist){
      directory.getAssetData(chainName).then(assetlist => {
        setAssetlist(assetlist)
      })
    }
  });

  useEffect(() => {
    if(!status){
      directory.getChainStatus(chainName).then(status => {
        setStatus(status)
      })
    }
  });

  function baseAsset(){
    return assetlist.assets && assetlist.assets[0];
  }

  function image(){
    return baseAsset()?.logo_URIs?.svg || baseAsset()?.logo_URIs?.png
  }

  function renderOverview(){
    const data = [
      {
        key: 'Chain ID',
        value: chain.chain_id
      },
      {
        key: 'Token',
        value: baseAsset()?.symbol
      },
      {
        key: 'Status',
        value: chain.status
      },
      {
        key: 'Public APIs',
        value: status.available ? <span className="text-success p-0">Available</span> : <span className="text-danger p-0">Unavailable</span>
      },
    ]
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
      <CCol xs key={'overview-' + chain.chain_name}>
        <CCard className="mb-3">
          <CRow className="g-0">
            <CCol md={2} className="text-center">
              <img src={image() || 'https://craftypixels.com/placeholder-image/60x60/ffffff/a6a6a6&text=missing'} className="m-2 rounded-circle shadow overflow-hidden" width={80} height={80} />
            </CCol>
            <CCol md={10}>
              <CCardBody>
                <CCardTitle>{chain.pretty_name}</CCardTitle>
                <DataTable bodyClass="small" data={data} />
              </CCardBody>
            </CCol>
          </CRow>
        </CCard>
      </CCol>
    )
  }

  function renderSources(){
    const data = [
      {
        key: 'Chain Registry',
        value: (
          <>
            <a href={`https://chains.cosmos.directory/${chainName}`} target="_blank">chains.cosmos.directory/{chainName}</a><br />
            <a href={`https://chains.cosmos.directory/${chainName}/chain`} target="_blank">chains.cosmos.directory/{chainName}/chain</a><br />
            <a href={`https://chains.cosmos.directory/${chainName}/assetlist`} target="_blank">chains.cosmos.directory/{chainName}/assetlist</a><br />
          </>
        )
      },
      {
        key: 'Validator Registry',
        value: (
          <>
            <a href={`https://validators.cosmos.directory/chains/${chainName}`} target="_blank">validators.cosmos.directory/chains/{chainName}</a><br />
          </>
        )
      },
      {
        key: 'API Proxies',
        value: (
          <>
            <a href={`https://rpc.cosmos.directory/${chainName}`} target="_blank">rpc.cosmos.directory/{chainName}</a><br />
            <a href={`https://rest.cosmos.directory/${chainName}`} target="_blank">rest.cosmos.directory/{chainName}</a><br />
          </>
        )
      },
      {
        key: 'API Status',
        value: (
          <>
            <a href={`https://status.cosmos.directory/${chainName}`} target="_blank">status.cosmos.directory/{chainName}</a><br />
          </>
        )
      },
    ]
    return (
      <CCol xs key={'data-' + chain.chain_name}>
        <CCard className="mb-3">
          <CCardBody>
            <CCardTitle>Data sources</CCardTitle>
            <DataTable bodyClass="small" data={data} />
          </CCardBody>
        </CCard>
      </CCol>
    )
  }

  if(!chain || !assetlist || !status){
    return (
      <div className="pt-3 text-center">
        <CSpinner />
      </div>
    )
  }

  return (
    <CContainer lg>
      <CRow xs={{ cols: 1, gutter: 4 }} md={{ cols: 2 }}>
        <>
          {[renderOverview(), renderSources()]}
        </>
      </CRow>
    </CContainer>
  )
}

export default React.memo(Chain)