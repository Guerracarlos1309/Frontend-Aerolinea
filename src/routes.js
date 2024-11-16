import { element } from 'prop-types'
import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const recruitment = React.lazy(() => import('./views/pages/Recruitment/recruitment'))
const performanceEvaluation = React.lazy(
  () => import('./views/pages/Performance Evaluation/performanceEvaluation'),
)
const listFlight = React.lazy(() => import('./views/pages/list of Flight/listFlight'))
const flightManagement = React.lazy(
  () => import('./views/pages/Flight Management/flightManagement'),
)
const payments = React.lazy(() => import('./views/pages/payments/payments'))
const reports = React.lazy(() => import('./views/pages/reports/reports'))
const users = React.lazy(() => import('./views/pages/user/users'))
const editProfile = React.lazy(() => import('./views/pages/editProfile/editProfile'))
const reserves = React.lazy(() => import('./views/pages/reserves/reserves'))
const recruitmentFlights = React.lazy(() => import('./views/pages/Recruitment/recruitmentFlight'))
const recruitmentCrew = React.lazy(() => import('./views/pages/Recruitment/recruitmentCrew'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/recruitment', name: 'Recruitment', element: recruitment },
  { path: '/performanceEvaluation', name: 'RerformanceEvaluation', element: performanceEvaluation },
  { path: '/listFlight', name: 'ListFlight', element: listFlight },
  { path: '/flightManagement', name: 'FlightManagement', element: flightManagement },
  { path: '/reserves', name: 'Reserves', element: reserves },
  { path: '/payments', name: 'Payments', element: payments },
  { path: '/reports', name: 'Reports', element: reports },
  { path: '/users', name: 'Users', element: users },
  { path: '/editProfile', name: 'Profile', element: editProfile },
  { path: '/recruitmentFlights', name: 'Recruitment Flights', element: recruitmentFlights },
  { path: '/recruitmentCrew', name: 'Recruitment Crew', element: recruitmentCrew },
]

export default routes
