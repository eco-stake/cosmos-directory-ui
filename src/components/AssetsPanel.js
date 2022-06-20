import React, { useState } from "react";
import { 
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CRow,
  CCol,
  CTable
} from '@coreui/react'
import Panel from "./Panel"
import DataTable from './DataTable'
import _ from 'lodash'

function AssetsPanel(props) {
  const { chain, assetlist } = props
  if(!assetlist?.assets) return null

  const [activeKey, setActiveKey] = useState(assetlist.assets[0].symbol)


  const assets = assetlist.assets.map(asset => {
    const data = [
      {
        key: 'Name',
        value: asset.name
      },
      {
        key: 'Symbol',
        value: asset.symbol
      },
    ]

    if (asset.description) data.push({
      key: 'Description',
      value: asset.description
    })

    if(asset.coingecko_id) data.push({
      key: 'Coingecko ID',
      value: asset.coingecko_id
    })

    if (asset.display) data.push({
      key: 'Display',
      value: asset.display
    })

    if (asset.base) data.push({
      key: 'Base',
      value: asset.base
    })

    if(asset.denom_units){
      data.push({
        key: 'Denom Units',
        value: (
          <CTable small>
            <tbody className="small">
              <tr>
                <th>Denom</th>
                <th>Exponent</th>
              </tr>
              {asset.denom_units.map(unit => {
                return (
                  <tr key={unit.denom}>
                    <td>{unit.denom}</td>
                    <td>{unit.exponent}</td>
                  </tr>
                )
              })}
            </tbody>
          </CTable>
        )
      })
    } 

    const assetLinks = Object.keys(asset.logo_URIs || {}).map(type => {
      const url = asset.logo_URIs[type]
      return (
        <a key={type} href={url} target="_blank">{type.toUpperCase()}</a>
      )
    }).reduce((prev, curr) => [ prev, ' | ', curr ], []);

    return {
      name: asset.name,
      symbol: asset.symbol,
      image: asset.logo_URIs?.svg || asset.logo_URIs?.png,
      assetLinks: assetLinks,
      data: data
    }
  })
  return (
    <Panel title={`${props.title || 'Native Assets'}`}>
      <>
        <CNav variant="tabs" role="tablist">
          {assets.map(asset => {
            return (
              <CNavItem key={asset.symbol}>
                <CNavLink className="small px-2 px-md-3" role="button" active={activeKey === asset.symbol} onClick={() => setActiveKey(asset.symbol)}>
                  {asset.symbol}
                </CNavLink>
              </CNavItem>
            )
          })}
        </CNav>
        <CTabContent>
          {assets.map(asset => {
            return (
              <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === asset.symbol} key={asset.symbol}>
                <CRow className="g-0">
                  <CCol md={9}>
                    <DataTable bodyClass="small" columnclass="align-middle" data={asset.data} />
                  </CCol>
                  <CCol md={3} className="text-center">
                    <img src={asset.image || 'https://craftypixels.com/placeholder-image/60x60/ffffff/a6a6a6&text=missing'} className="m-2 rounded-circle shadow overflow-hidden" width={80} height={80} />
                    <p className="mt-3 small text-center">{asset.assetLinks}</p>
                  </CCol>
                </CRow>
              </CTabPane>
            )
          })}
        </CTabContent>
      </>
    </Panel>
  )
}

export default AssetsPanel
