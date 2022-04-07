import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'

import { AppSidebarNav } from './AppSidebarNav'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

// sidebar nav config
import navigation from '../_nav'

import logo from '../assets/logo.png'
import logo2x from '../assets/logo@2x.png'
import logo3x from '../assets/logo@3x.png'

const AppSidebar = (props) => {
  const dispatch = useDispatch()
  const narrow = useSelector((state) => state.sidebarNarrow)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  return (
    <CSidebar
      position="fixed"
      unfoldable={false}
      narrow={narrow}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarBrand to="/">
        <Link to="/" className="text-reset sidebar-brand-full">
          <img src={logo} srcSet={`${logo2x} 2x, ${logo3x} 3x`} alt="cosmos.directory" className="img-fluid px-3" />
        </Link>
        <a href="/" className="text-reset text-decoration-none sidebar-brand-narrow">⚛️ · 📖</a>
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={navigation(Object.values(props.chains))} />
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => dispatch({ type: 'set', sidebarNarrow: !narrow })}
      />
    </CSidebar>
  )
}

export default AppSidebar