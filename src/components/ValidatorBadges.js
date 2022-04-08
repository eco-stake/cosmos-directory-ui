import React from "react";
import { 
  CTooltip
} from '@coreui/react'

import CIcon from '@coreui/icons-react'
import {
  cilLoopCircular,
  cilHeart,
  cilScreenDesktop,
  cilLifeRing,
  cilGrain
} from '@coreui/icons'

function ValidatorBadges(props) {
  const { validator, chain } = props

  if(!validator || !chain) return null

  function website() {
    let url = validator.description && validator.description.website
    if (!url)
      return

    return url.startsWith('http') ? url : ('https://' + url)
  }

  function commissionPercent() {
    return validator.commission && validator.commission.commission_rates.rate
  }

  function renderBadge(icon, tooltip, check, link) {
    const classNames = ['mx-1']
    if (!check) {
      classNames.push('opacity-25')
    }

    let badge = <CIcon className={classNames.join(' ')} size="lg" icon={icon} />
    if(!check) return badge;

    if (link) {
      badge = <a href={link} target="_blank" className="text-reset text-decoration-none">{badge}</a>
    }

    return (
      <CTooltip content={tooltip}>
        {badge}
      </CTooltip>
    )
  }

  return (
    <div className="d-flex justify-content-center flex-wrap">
      {renderBadge(cilHeart, "Validator commission is greater than 0", commissionPercent() > 0.0)}
      {renderBadge(cilGrain, "Validator is not in the top 10", validator.rank > 10)}
      {renderBadge(cilScreenDesktop, "Validator has a website", website(), website())}
      {renderBadge(cilLifeRing, "Validator has a security contact", validator.description?.security_contact, `mailto:${validator.description?.security_contact}`)}
      {renderBadge(cilLoopCircular, "Validator offers REStake", validator.restake?.address, `https://restake.app/${chain.path}`)}
    </div>
  )
}

export default ValidatorBadges