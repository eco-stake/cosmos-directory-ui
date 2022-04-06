import React from 'react'
import { CFooter } from '@coreui/react'
import GitHubButton from 'react-github-btn'
import PoweredByAkash from '../assets/powered-by-akash.svg'

const AppFooter = () => {
  return (
    <CFooter className="d-flex flex-wrap justify-content-between align-items-center pt-3 pb-5 mt-4 bg-white border-top">
      <a href="https://akash.network" target="_blank" rel="noreferrer" className="col-md-4 mb-0 text-muted">
        <img src={PoweredByAkash} alt="Powered by Akash" width={200} />
      </a>

      <a href="https://ecostake.com" target="_blank" rel="noreferrer" className="col-md-4 d-flex align-items-center justify-content-center me-lg-auto link-dark text-decoration-none">
        <span className="d-none d-sm-inline me-1">Built with 💚&nbsp;</span> by ECO Stake 🌱
      </a>

      <p className="col-md-4 mb-0 text-muted text-end justify-content-end d-none d-lg-flex">
        <GitHubButton href="https://github.com/eco-stake/cosmos-directory" data-icon="octicon-star" data-size="large" data-show-count="true" aria-label="Star eco-stake/cosmos-directory on GitHub">Star</GitHubButton>
      </p>
    </CFooter>
  )
}

export default AppFooter