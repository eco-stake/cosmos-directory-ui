import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNav,
  CNavLink,
  CNavItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilApps, cilMenu } from '@coreui/icons'
import { Link, useNavigate } from 'react-router-dom'
import Moment from 'react-moment'
import _ from 'lodash'

import CommandPalette from 'react-command-palette';

const AppHeader = (props) => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)
  const navigate = useNavigate()

  const { chains, chain, chainRepository, activeSection, setSection } = props

  function lastUpdate(){
    if(!chainRepository) return

    const date = new Date(chainRepository.timestamp * 1000)
    const { url, commit } = chainRepository
    return <a href={`${url}/commit/${commit}`} target="_blank"><Moment fromNow>{date}</Moment></a>
  }

  function commands(){
    if(!chains) return []

    return chains.chains.map(chain => {
      return {
        name: chain.pretty_name,
        command() { navigate('/' + chain.path + (activeSection && activeSection !== 'overview' ? `/${activeSection}` : '')) }
      }
    })
  }


  return (
    <CHeader position="sticky" className="mb-4 pb-0">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1 mt-1"
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderBrand component='span' className="me-auto">
          {props.chain ? (
            <>
              <Link to="/" className="text-reset text-decoration-none">cosmos.directory</Link>
              <Link to={'/' + props.chain.path} onClick={() => props.setShowCommands(true)} className="text-secondary text-decoration-none"> / {props.chain.path}</Link>
            </>
          ) : (
            <Link to="/" onClick={() => props.setShowCommands(true)} className="text-reset text-decoration-none">cosmos.directory</Link>
          )}
        </CHeaderBrand>
        <CHeaderNav>
          <CNavItem>
            <CommandPalette open={props.showCommands} commands={commands()} closeOnSelect={true}
              resetInputOnOpen={true} placeholder="Start typing a network" trigger={<CNavLink><CIcon icon={cilApps} size="lg" /></CNavLink>}
              onRequestClose={() => { props.setShowCommands(false) }} />
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav className="ms-3">
        </CHeaderNav>
      </CContainer>
      <CHeaderDivider />
      <CContainer fluid className="pt-2">
        {chain && (
          <CNav variant="tabs">
            {['overview', 'chain', 'validators', 'nodes'].map(key => {
              return (
                <CNavItem key={key}>
                  <CNavLink role="button" active={activeSection === key} onClick={() => setSection(key)}>
                    {_.startCase(key)}
                  </CNavLink>
                </CNavItem>
              )
            })}
          </CNav>
        )}
        <p className="ms-auto small"><em>Chains updated: {lastUpdate()}</em></p>
      </CContainer>
    </CHeader>
  )
}

export default AppHeader