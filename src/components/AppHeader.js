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
import { cilListRich, cilMenu } from '@coreui/icons'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'

const AppHeader = (props) => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)

  const { chain } = props

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
          <Link to="/" className="text-reset text-decoration-none">cosmos.directory</Link>
          {props.chain && <Link to={'/' + props.chain.path} className="text-secondary text-decoration-none"> / {props.chain.path}</Link>}
        </CHeaderBrand>
        <CHeaderNav>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilListRich} size="lg" />
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav className="ms-3">
        </CHeaderNav>
      </CContainer>
      <CHeaderDivider />
      <CContainer className="pt-2">
        {chain && (
          <CNav variant="tabs">
            <CNavItem>
              <CNavLink href="#" active>
                Overview
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink href="#">Chain</CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink href="#">Validators</CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink href="#">APIs</CNavLink>
            </CNavItem>
          </CNav>
        )}
        <p className="ms-auto small"><em>Last update: <Moment fromNow>{props.lastUpdate}</Moment></em></p>
      </CContainer>
    </CHeader>
  )
}

export default AppHeader