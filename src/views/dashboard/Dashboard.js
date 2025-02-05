import React, { useState, useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CWidgetStatsA,
} from '@coreui/react'
import { helpFetch } from '../../Api/helpFetch.js'

const api = helpFetch()

const Dashboard = () => {
  const [flights, setFlights] = useState([])
  const [reservations, setReservations] = useState([])
  const [planes, setPlanes] = useState([])
  const [crew, setCrew] = useState([])
  const [payments, setPayments] = useState([])

  useEffect(() => {
    loadCrew()
    loadFlights()
    loadPayments()
    loadPlanes()
    loadReserves
  }, [])

  const loadReserves = () => {
    api.get('/reservations').then((data) => {
      if (!data.error && Array.isArray(data)) {
        setReserves(data)
      }
    })
  }

  const loadPlanes = () => {
    api.get('/planes').then((data) => {
      if (!data.error && Array.isArray(data)) {
        setPlanes(data)
      }
    })
  }

  const loadFlights = () => {
    api.get('/Flights').then((data) => {
      if (!data.error && Array.isArray(data)) {
        setFlights(data)
      }
    })
  }

  const loadCrew = () => {
    api.get('/crew').then((data) => {
      if (!data.error && Array.isArray(data)) {
        setCrew(data)
      }
    })
  }

  const loadPayments = () => {
    api.get('/payments').then((data) => {
      if (!data.error && Array.isArray(data)) {
        setPayments(data)
      }
    })
  }
  const totalFlights = flights.length
  const scheduledFlights = flights.filter((flight) => flight.status === 'Scheduled').length
  const cancelledFlights = flights.filter((flight) => flight.status === 'Cancelled').length
  const totalReservations = reservations.length
  const totalPlanes = planes.length
  const totalRevenue = payments.reduce((sum, payment) => sum + parseFloat(payment.amount), 0)
  const flightsByAirline = flights.reduce((acc, flight) => {
    acc[flight.aerolinea] = (acc[flight.aerolinea] || 0) + 1
    return acc
  }, {})

  const flightStatus = flights.reduce((acc, flight) => {
    acc[flight.status] = (acc[flight.status] || 0) + 1
    return acc
  }, {})

  const topDestinations = flights.reduce((acc, flight) => {
    acc[flight.destino] = (acc[flight.destino] || 0) + 1
    return acc
  }, {})

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>Tablero de Control de Aerolínea</CCardHeader>
          <CCardBody>
            <CRow>
              <CCol sm={6} lg={3}>
                <CWidgetStatsA color="primary" value={totalFlights} title="Total de Vuelos" />
              </CCol>
              <CCol sm={6} lg={3}>
                <CWidgetStatsA
                  color="success"
                  value={scheduledFlights}
                  title="Vuelos Programados"
                />
              </CCol>
              <CCol sm={6} lg={3}>
                <CWidgetStatsA color="warning" value={cancelledFlights} title="Vuelos Cancelados" />
              </CCol>
              <CCol sm={6} lg={3}>
                <CWidgetStatsA color="info" value={totalReservations} title="Reservaciones" />
              </CCol>
            </CRow>

            <CRow className="mt-4">
              <CCol lg={6}>
                <CCard>
                  <CCardHeader>Estado de Vuelos</CCardHeader>
                  <CCardBody>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        marginTop: '20px',
                      }}
                    >
                      <div>
                        <strong>Vuelos Programados:</strong> {scheduledFlights}
                      </div>
                      <div>
                        <strong>Vuelos Cancelados:</strong> {cancelledFlights}
                      </div>
                      <div>
                        <strong>Total Vuelos:</strong> {totalFlights}
                      </div>
                    </div>
                  </CCardBody>
                </CCard>
              </CCol>
              <CCol lg={6}>
                <CCard>
                  <CCardHeader>Últimos Vuelos</CCardHeader>
                  <CCardBody>
                    <CTable striped>
                      <CTableHead>
                        <CTableRow>
                          <CTableHeaderCell>Número</CTableHeaderCell>
                          <CTableHeaderCell>Salida</CTableHeaderCell>
                          <CTableHeaderCell>Destino</CTableHeaderCell>
                          <CTableHeaderCell>Estado</CTableHeaderCell>
                        </CTableRow>
                      </CTableHead>
                      <CTableBody>
                        {flights.slice(0, 5).map((flight) => (
                          <CTableRow key={flight.id}>
                            <CTableDataCell>{flight.numeroVuelo}</CTableDataCell>
                            <CTableDataCell>{flight.Salida}</CTableDataCell>
                            <CTableDataCell>{flight.destino}</CTableDataCell>
                            <CTableDataCell>{flight.status}</CTableDataCell>
                          </CTableRow>
                        ))}
                      </CTableBody>
                    </CTable>
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>

      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>Vuelos por Aerolínea</CCardHeader>
            <CCardBody>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                  height: '300px',
                  border: '1px solid #ddd',
                }}
              >
                {Object.entries(flightsByAirline).map(([airline, count]) => (
                  <div
                    key={airline}
                    style={{
                      width: '50px',
                      marginRight: '10px',
                      backgroundColor: getRandomColor(),
                      height: `${count * 30}px`,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'flex-end',
                      color: 'white',
                    }}
                  >
                    {count}
                  </div>
                ))}
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: '10px',
                }}
              >
                {Object.keys(flightsByAirline).map((airline) => (
                  <div
                    key={airline}
                    style={{
                      marginRight: '10px',
                      fontSize: '12px',
                    }}
                  >
                    {airline}
                  </div>
                ))}
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>Panel de Control de Aerolínea</CCardHeader>
            <CCardBody>
              <CRow>
                <CCol sm={6} lg={3}>
                  <CWidgetStatsA color="primary" value={totalFlights} title="Total Vuelos" />
                </CCol>
                <CCol sm={6} lg={3}>
                  <CWidgetStatsA
                    color="success"
                    value={`$${totalRevenue.toFixed(2)}`}
                    title="Ingresos Totales"
                  />
                </CCol>
                <CCol sm={6} lg={3}>
                  <CWidgetStatsA color="warning" value={totalReservations} title="Reservaciones" />
                </CCol>
                <CCol sm={6} lg={3}>
                  <CWidgetStatsA color="info" value={crew.length} title="Miembros de Tripulación" />
                </CCol>
              </CRow>

              <CRow className="mt-4">
                <CCol lg={6}>
                  <CCard>
                    <CCardHeader>Estado de Vuelos</CCardHeader>
                    <CCardBody>
                      {Object.entries(flightStatus).map(([status, count]) => (
                        <div key={status} className="mb-2">
                          <strong>{status}:</strong> {count} vuelos
                        </div>
                      ))}
                    </CCardBody>
                  </CCard>
                </CCol>
                <CCol lg={6}>
                  <CCard>
                    <CCardHeader>Top 5 Destinos</CCardHeader>
                    <CCardBody>
                      {Object.entries(topDestinations)
                        .sort((a, b) => b[1] - a[1])
                        .slice(0, 5)
                        .map(([destination, count]) => (
                          <div key={destination} className="mb-2">
                            <strong>{destination}:</strong> {count} vuelos
                          </div>
                        ))}
                    </CCardBody>
                  </CCard>
                </CCol>
              </CRow>

              <CRow className="mt-4">
                <CCol xs={12}>
                  <CCard>
                    <CCardHeader>Últimos Vuelos</CCardHeader>
                    <CCardBody>
                      <CTable striped>
                        <CTableHead>
                          <CTableRow>
                            <CTableHeaderCell>Número</CTableHeaderCell>
                            <CTableHeaderCell>Aerolínea</CTableHeaderCell>
                            <CTableHeaderCell>Salida</CTableHeaderCell>
                            <CTableHeaderCell>Destino</CTableHeaderCell>
                            <CTableHeaderCell>Estado</CTableHeaderCell>
                          </CTableRow>
                        </CTableHead>
                        <CTableBody>
                          {flights.slice(0, 5).map((flight) => (
                            <CTableRow key={flight.id}>
                              <CTableDataCell>{flight.numeroVuelo}</CTableDataCell>
                              <CTableDataCell>{flight.aerolinea}</CTableDataCell>
                              <CTableDataCell>{flight.Salida}</CTableDataCell>
                              <CTableDataCell>{flight.destino}</CTableDataCell>
                              <CTableDataCell>{flight.status}</CTableDataCell>
                            </CTableRow>
                          ))}
                        </CTableBody>
                      </CTable>
                    </CCardBody>
                  </CCard>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CRow>
  )
}

function getRandomColor() {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

export default Dashboard
