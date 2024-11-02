import { element } from 'prop-types'
import React from 'react'
import { recruitment } from './views/pages/Recruitment/recruitment'
import { performanceEvaluation } from './views/pages/Performance Evaluation/performanceEvaluation'
import { listFlight } from './views/pages/list of Flight/listFlight'
import { flightManagement } from './views/pages/Flight Management/flightManagement'
import { reserves } from './views/pages/reserves/reserves'
import { payments } from './views/pages/payments/payments'
import { reports } from './views/pages/reports/reports'
import { users } from './views/pages/user/users'


const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

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
