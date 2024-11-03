import { element } from 'prop-types'
import React from 'react'
// import { recruitment } from './views/pages/Recruitment/recruitment'
// import { performanceEvaluation } from './views/pages/Performance Evaluation/performanceEvaluation'
// import { listFlight } from './views/pages/list of Flight/listFlight'
// import { flightManagement } from './views/pages/Flight Management/flightManagement'
// import { reserves } from './views/pages/reserves/reserves'
// import { payments } from './views/pages/payments/payments'
// import { reports } from './views/pages/reports/reports'
// import { users } from './views/pages/user/users'


const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const recruitment = React.lazy(() => import('./views/pages/Recruitment/recruitment'))
const performanceEvaluation = React.lazy(() => import('./views/pages/Performance Evaluation/performanceEvaluation'))
const listFlight = React.lazy (() => import ('./views/pages/list of Flight/listFlight'))
const flightManagement = React.lazy (() => import ('./views/pages/Flight Management/flightManagement'))
const reserves = React.lazy (() => import('./views/pages/reserves/reserves'))
const payments = React.lazy (() => import('./views/pages/payments/payments'))
const reports = React.lazy (() => import('./views/pages/reports/reports'))
const users = React.lazy (() => import ('./views/pages/user/users'))


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/recruitment', name: 'Recruitment', element: recruitment},
  { path: '/performanceEvaluation', name: 'RerformanceEvaluation', element: performanceEvaluation},
  { path: '/listFlight', name: 'ListFlight', element: listFlight},
  { path: '/flightManagement', name: 'FlightManagement', element: flightManagement},
  { path: '/reserves', name: 'Reserves', element: reserves},
  { path: '/payments', name: 'Payments', element: payments},
  { path: '/reports', name: 'Reports', element: reports},
  { path: '/users', name: 'Users', element: users},
  
]

export default routes
