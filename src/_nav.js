import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilMobile,
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
    color: 'red',
    to: 'dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
    },
  },
  {
    component: CNavTitle,
    name: 'Personnel Management',
  },
  {
    component: CNavGroup,
    name: 'Recruitment',
    to: 'recruitment',
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
    items: [
      { component: CNavItem, name: 'Recruitment Users', to: 'recruitment' },
      {
        component: CNavItem,
        name: 'recruitment Flight',
        to: 'recruitmentFlights',
      },
      {
        component: CNavItem,
        name: 'recruitment Crew',
        to: 'recruitmentCrew',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Performance Evaluation',
    to: 'performanceEvaluation',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Flight Management',
  },

  {
    component: CNavItem,
    name: 'List of Flights',
    to: 'listFlight',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  },

  {
    component: CNavItem,
    name: 'Flight Management',
    to: 'flightManagement',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  },

  {
    component: CNavItem,
    name: 'Reserves',
    to: 'reserves',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
  },

  {
    component: CNavItem,
    name: 'Payments',
    to: 'payments',
    icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
  },

  {
    component: CNavItem,
    name: 'Reports',
    to: 'reports',
    icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
  },

  {
    component: CNavItem,
    name: 'Users',
    to: 'users',
    icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Administration',
  },
  {
    component: CNavGroup,
    name: 'Login',
    icon: <CIcon icon={cilMobile} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Login',
        to: '/login',
      },
      {
        component: CNavItem,
        name: 'Register',
        to: '/register',
      },
      {
        component: CNavItem,
        name: 'Edit profile',
        to: 'editProfile',
      },
    ],
  },
]

export default _nav
