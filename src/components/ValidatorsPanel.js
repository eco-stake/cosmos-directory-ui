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
  const types = ['active', 'inactive']

  const { chain, validators } = props
  const [activeKey, setActiveKey] = useState(types[0])

  function filterValidators(type){
    if(!validators) return []
    let filtered = []
    switch(type){
      case 'active':
        filtered = validators.filter(el => el.status === 'BOND_STATUS_BONDED')
        break;
      case 'inactive':
        filtered = validators.filter(el => el.status !== 'BOND_STATUS_BONDED')
        break;
    }
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
                  {_.startCase(type)}
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
                    </tr>
                    {filterValidators(type).map(validator => {
                      return (
                        <tr key={validator.address}>
                          <td width={20}>
                            <img src={validator.mintscan_image || validator.keybase_image || 'https://craftypixels.com/placeholder-image/30x30/ffffff/a6a6a6&text=missing'}
                              width={20} height={20} className="m-2 rounded-circle shadow overflow-hidden" />
                          </td>
                          <td className="align-middle">
                            {validator.moniker}
                          </td>
                          {!props.limit && (
                            <td className="d-none d-xl-table-cell w-50">{validator.description.details}</td>
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
                            {_.round(parseFloat(validator.commission.commission_rates.rate) * 100, 2)}%
                          </td>
                          <td className="align-middle" width={180}>
                            <div className="text-start">
                              <ValidatorBadges validator={validator} chain={chain} />
                            </div>
                          </td>
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