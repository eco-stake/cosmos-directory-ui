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
import { cilSearch, cilMenu, cibAtom } from '@coreui/icons'
import { Link, useNavigate } from 'react-router-dom'
import Moment from 'react-moment'
import _ from 'lodash'

import CommandPalette from 'react-command-palette';
import ChainImage from './ChainImage'

const AppHeader = (props) => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)
  const navigate = useNavigate()

  const { chains, chain, chainRepository, activeSection, setSection } = props

  function lastUpdate(){
    if(!chainRepository) return

    const date = new Date(chainRepository.timestamp * 1000)
    const { url, commit } = chainRepository
    return <a href={`${url}/commit/${commit}`} className="text-reset" target="_blank"><Moment fromNow>{date}</Moment></a>
  }

  function commands(){
    const data = [
      {
        name: 'Overview',
        command() { navigate('/') }
      }
    ]
    if(!chains?.chains) return data

    return chains.chains.reduce((sum, chain) => {
      data.push({
        name: chain.pretty_name,
        command() { navigate('/' + chain.path + (activeSection && activeSection !== 'overview' ? `/${activeSection}` : '')) }
      })
      return data
    }, data)
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
              <Link to="/" className="text-reset text-decoration-none d-none d-sm-inline">cosmos.directory</Link>
              <Link to="/" className="text-reset text-decoration-none d-sm-none px-1"><CIcon icon={cibAtom} size="lg" /></Link>
              <Link to={'/' + props.chain.path} onClick={() => props.setShowCommands(true)} className="text-secondary text-decoration-none"> / {props.chain.path} <ChainImage chain={props.chain} width={20} height={20} className="me-1 mb-1 rounded-circle shadow-sm" /></Link>
            </>
          ) : (
            <Link to="/" onClick={() => props.setShowCommands(true)} className="text-reset text-decoration-none">cosmos.directory</Link>
          )}
        </CHeaderBrand>
        <CHeaderNav>
          <CNavItem>
            <CommandPalette open={props.showCommands} commands={commands()} closeOnSelect={true}
              resetInputOnOpen={true} placeholder="Start typing a network" trigger={<CNavLink><CIcon icon={cilSearch} title="CMD-Shift-P" size="lg" /></CNavLink>}
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
                  <CNavLink className="px-2 px-md-3" role="button" active={activeSection === key} onClick={() => setSection(key)}>
                    {_.startCase(key)}
                  </CNavLink>
                </CNavItem>
              )
            })}
          </CNav>
        )}
        <p className={`ms-auto small${chain && ' d-none d-md-block'}`}>
          <em><a href="https://github.com/cosmos/chain-registry" target="_blank" className="text-reset">Chain Registry</a> updated: {lastUpdate()}</em></p>
      </CContainer>
    </CHeader>
  )
}

export default AppHeader