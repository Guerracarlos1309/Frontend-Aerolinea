import React from 'react'
import { useState, useEffect } from 'react'

import {
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CFormInput,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CCard,
  CCardBody,
  CCardTitle,
  CCardText,
  CListGroup,
  CListGroupItem,
} from '@coreui/react'
import { helpHttp } from '../../../helper/helpHttp'

const reserves = () => {
  const [visible, setVisible] = useState(false)
  const [selectedReservation, setSelectedReservation] = useState({})
  const [reserves, setReserves] = useState([])
  const [busqueda, setBusqueda] = useState('')

  const nameFiltered = reserves.filter(
    (reserve) => reserve.number && reserve.number.toLowerCase().includes(busqueda.toLowerCase()),
  )

  let api = helpHttp()
  let url = 'http://localhost:3004/reservations'
  useEffect(() => {
    api.get(url).then((res) => {
      console.log(res)
      if (!res.err) {
        setReserves(res)
      } else {
        setReserves(null)
      }
    })
  }, [])

  /*const fetchReserves = async () => {
    try {
      const response = await fetch('http://localhost:3004/reservations')
      const data = await response.json()
      setReserves(data)
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }*/

  const handleViewClick = (reservation) => {
    setSelectedReservation(reservation)
    setVisible(true)
  }

  return (
    <div className="p-4" style={{ backgroundColor: 'none' }}>
      <CFormInput
        type="text"
        placeholder="Search by booking number..."
        className="mb-3"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      <CTable>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Reservation Number</CTableHeaderCell>
            <CTableHeaderCell scope="col">Info</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {nameFiltered.map((reservation) => (
            <CTableRow key={reservation.id}>
              <CTableHeaderCell scope="row">{reservation.id}</CTableHeaderCell>
              <CTableDataCell>{reservation.number}</CTableDataCell>
              <CTableDataCell>
                <CButton
                  color="primary"
                  size="sm"
                  className="me-2"
                  onClick={() => handleViewClick(reservation)}
                >
                  View
                </CButton>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>

      <CModal visible={visible} onClose={() => setVisible(false)} size="lg">
        <CModalHeader>
          <CModalTitle>Booking Details</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CCard>
            <CCardBody>
              <CCardTitle>Booking Invoice #{selectedReservation.number}</CCardTitle>
              <CCardText>
                <strong>Date:</strong> {selectedReservation.date}
              </CCardText>
              <CCardText>
                <strong>Customer:</strong> {selectedReservation.clientName}
              </CCardText>
              <CListGroup flush>
                <CListGroupItem>
                  <div className="d-flex justify-content-between">
                    <strong>Id flight:</strong>
                    {selectedReservation.idFlight}
                  </div>
                </CListGroupItem>
                <CListGroupItem>
                  <div className="d-flex justify-content-between">
                    <strong>Number of babbage:</strong>
                    {selectedReservation.numberBabagge}
                  </div>
                </CListGroupItem>

                <CListGroupItem>
                  <div className="d-flex justify-content-between">
                    <strong>Payment Method: </strong>
                    {selectedReservation.methodPay}
                  </div>
                </CListGroupItem>

                <CListGroupItem>
                  <div className="d-flex justify-content-between">
                    <strong>Arrival Point: </strong>
                    {selectedReservation.arrival}
                  </div>
                </CListGroupItem>

                <CListGroupItem>
                  <div className="d-flex justify-content-between">
                    <strong>Departure location: </strong>
                    {selectedReservation.departure}
                  </div>
                </CListGroupItem>

                <CListGroupItem>
                  <div className="d-flex justify-content-between">
                    <strong>Flight Time: </strong>
                    {selectedReservation.flightTime}
                  </div>
                </CListGroupItem>

                <CListGroupItem>
                  <div className="d-flex justify-content-between">
                    <strong>Total</strong>
                    <strong>{selectedReservation.total}</strong>
                  </div>
                </CListGroupItem>
              </CListGroup>
            </CCardBody>
          </CCard>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  )
}

export default reserves
