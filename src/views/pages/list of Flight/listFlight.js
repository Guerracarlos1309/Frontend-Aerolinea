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
  CButton,
  CButtonGroup,
} from '@coreui/react'
import { helpHttp } from '../../../helper/helpHttp'

const listFlight = () => {
  const [flight, setListFlights] = useState([])

  let api = helpHttp()

  console.log(api)
  let url = 'http://localhost:3004/Flights'

  useEffect(() => {
    fetchListFlights()
  }, [])

  const fetchListFlights = async () => {
    try {
      const response = await fetch('http://localhost:3004/Flights')
      const data = await response.json()
      setListFlights(data)
    } catch (error) {
      console.error('Error al obtener los Vuelos', error)
    }
  }

  return (
    <div className="row">
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 20 }}>
        <CButtonGroup role="group" aria-label="Basic example">
          <CButton color="primary" style={{ margin: 1 }}>
            Left
          </CButton>
          <CButton color="primary" style={{ margin: 1 }}>
            Middle
          </CButton>
          <CButton color="primary" style={{ margin: 1 }}>
            Right
          </CButton>
        </CButtonGroup>
      </div>

      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>List of flights</strong>
            </CCardHeader>
            <CCardBody>
              <CTable hover responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">Flight Number</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Airline</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Flight Time</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Flight Date</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Departure city</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Arrival city</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {flight.map((flight) => (
                    <CTableRow key={flight.id}>
                      <CTableDataCell>{flight.numeroVuelo}</CTableDataCell>
                      <CTableDataCell>{flight.aerolinea}</CTableDataCell>
                      <CTableDataCell>{flight.horaSalida}</CTableDataCell>
                      <CTableDataCell>{flight.fechaSalida}</CTableDataCell>
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
    </div>
  )
}

export default listFlight
