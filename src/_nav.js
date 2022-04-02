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

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
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
  {
    // component: CNavGroup,
    component: CNavItem,
    name: 'Osmosis',
    to: '/osmosis',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
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
  },
]

export default _nav