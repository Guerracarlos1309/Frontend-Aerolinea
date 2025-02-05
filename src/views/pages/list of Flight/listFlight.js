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
import { helpFetch } from '../../../Api/helpFetch.js'

const api = helpFetch()

const ListFlight = () => {
  const [flights, setFlights] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [flightsPerPage] = useState(5)

  useEffect(() => {
    fetchListFlights()
  }, [])

  useEffect(() => {}, [flights])

  const fetchListFlights = async () => {
    await api.get('/flights').then((data) => {
      if (!data.error) {
        console.log(data)
        setFlights(data.data)
      }
    })
  }

  const totalPages = Math.ceil(flights.length / flightsPerPage)

  const indexOfLastFlight = currentPage * flightsPerPage
  const indexOfFirstFlight = indexOfLastFlight - flightsPerPage
  const currentFlights = flights.slice(indexOfFirstFlight, indexOfLastFlight)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <div className="row">
      <div className="mb-4 position-relative">
        <h2
          className="text-center position-relative pb-3"
          style={{
            fontFamily: 'Arial, sans-serif',
            color: '#4a4a4a',
            borderBottom: '3px solid',
            borderImage: 'linear-gradient(to right, transparent, #4a4a4a, transparent) 1',
          }}
        >
          List Of Flights
        </h2>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 20 }}>
        <CButtonGroup role="group" aria-label="Pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <CButton
              key={index + 1}
              color="warning"
              style={{ margin: 1 }}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </CButton>
          ))}
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
                    <CTableHeaderCell scope="col">Services</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Tuition</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Airport Departure</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Airport Arrival</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {currentFlights.map((flight) => (
                    <CTableRow key={flight.id_flight}>
                      <CTableDataCell>{flight.flight_number}</CTableDataCell>
                      <CTableDataCell>{flight.service}</CTableDataCell>
                      <CTableDataCell>{flight.tuition}</CTableDataCell>
                      <CTableDataCell>{flight.name}</CTableDataCell>
                      <CTableDataCell>{flight.a_departure}</CTableDataCell>
                      <CTableDataCell>{flight.a_arrival}</CTableDataCell>
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

export default ListFlight
