import React, { useState } from "react";
import { 
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CTable,
} from '@coreui/react'
import { Link } from "react-router-dom";
import _ from 'lodash'
import Panel from "./Panel"
import { ValidatorBadges } from "./ValidatorBadges";

function ValidatorsPanel(props) {
  const { chain, validators } = props
  let types = ['active', 'inactive']
  const unknownValidators = typeValidators('unknown')
  if (unknownValidators.length > 0) {
    if(unknownValidators.length == validators.length){
      types = ['unknown']
    }else{
      types.push('unknown')
    }
  }

  const [activeKey, setActiveKey] = useState(types[0])

  function typeValidators(type){
    if (!validators) return []
    switch (type) {
      case 'active':
        return validators.filter(el => el.status === 'BOND_STATUS_BONDED')
      case 'inactive':
        return validators.filter(el => el.status && el.status !== 'BOND_STATUS_BONDED')
      case 'unknown':
        return validators.filter(el => !el.status)
    }
  }

  function filterValidators(type){
    if(!validators) return []
    let filtered = typeValidators(type)
    if(props.limit) return _.take(filtered, props.limit)

    return filtered
  }

  return (
    <Panel title="Validators">
      <>
        <CNav variant="tabs" role="tablist">
          {types.map(type => {
            return (
              <CNavItem key={type}>
                <CNavLink className="small" role="button" active={activeKey === type} onClick={() => setActiveKey(type)}>
                  {_.startCase(type)} ({typeValidators(type).length})
                </CNavLink>
              </CNavItem>
            )
          })}
        </CNav>
        <CTabContent>
          {types.map(type => {
            return (
              <CTabPane role="tabpanel" aria-labelledby="home-tab" visible={activeKey === type} key={type}>
                <CTable>
                  <tbody className="small">
                    <tr>
                      <th colSpan={2}>Validator</th>
                      {!props.limit && (
                        <th className="d-none d-xl-table-cell">Details</th>
                      )}
                      {type === 'active'
                      ? (
                        <th className="text-center">Rank</th>
                      ) : (
                        <th className="text-center">Status</th>
                      )}
                      <th className="text-center">{props.limit ? 'Comm.' : 'Commission'}</th>
                      <th>Badges</th>
                      {!props.limit &&
                        <th></th>
                      }
                    </tr>
                    {filterValidators(type).map(validator => {
                      return (
                        <tr key={validator.address}>
                          <td width={20} className="align-middle">
                            <img src={validator.mintscan_image || validator.keybase_image || 'https://craftypixels.com/placeholder-image/30x30/ffffff/a6a6a6&text=missing'}
                              width={20} height={20} className="m-2 rounded-circle shadow overflow-hidden" />
                          </td>
                          <td className="align-middle">
                            {validator.moniker || validator.name}
                          </td>
                          {!props.limit && (
                            <td className="d-none d-xl-table-cell w-50">{validator.description?.details}</td>
                          )}
                          {type === 'active'
                            ? (
                              <td className="align-middle text-center" width={60}>
                                {validator.rank}
                              </td>
                            ) : (
                              <td className="align-middle text-center" width={60}>
                                {validator.jailed && 'Jailed'}
                              </td>
                            )}
                          <td className="align-middle text-center" width={60}>
                            {validator.commission?.commission_rates && (
                              <span>{_.round(parseFloat(validator.commission.commission_rates.rate) * 100, 2)}%</span>
                            )}
                          </td>
                          <td className="align-middle" width={180}>
                            <div className="text-start">
                              <ValidatorBadges validator={validator} chain={chain} />
                            </div>
                          </td>
                          {!props.limit &&
                            <td className="align-middle text-center">
                              <a href={`https:/restake.app/${chain.path}`} target="_blank" className="btn btn-light btn-sm">Stake</a>
                            </td>
                          }
                        </tr>
                      )
                    })}
                  </tbody>
                </CTable>
              </CTabPane>
            )
          })}
        </CTabContent>
        <div className="text-end">
          {props.limit && (
            <Link to={`/${chain.path}/validators`} className="btn btn-light">See more</Link>
          )}
        </div>
      </>
    </Panel>
  )
}

export default ValidatorsPanel