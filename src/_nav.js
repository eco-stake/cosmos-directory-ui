import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = (chains) => {
  let nav = [
    {
      component: CNavItem,
      name: 'Dashboard',
      to: '/',
      icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
      // badge: {
      //   color: 'info',
      //   text: 'NEW',
      // },
    },
    {
      component: CNavTitle,
      name: 'Networks',
    },
  ]

  nav = nav.concat(chains.map(chain => {
    return {
      // component: CNavGroup,
      component: CNavItem,
      name: chain.pretty_name,
      to: '/' + chain.chain_name,
      icon: <img src={chain.image || 'https://craftypixels.com/placeholder-image/30x30/ffffff/a6a6a6&text=missing'} width={30} height={30} className="me-4 rounded-circle" />,
      // items: [
      //   {
      //     component: CNavItem,
      //     name: 'Chain',
      //     to: '/base/accordion',
      //   },
      //   {
      //     component: CNavItem,
      //     name: 'Validators',
      //     to: '/base/breadcrumbs',
      //   },
      //   {
      //     component: CNavItem,
      //     name: 'Nodes',
      //     to: '/base/cards',
      //   },
      // ],
    }
  }))

  return nav
}

export default _nav