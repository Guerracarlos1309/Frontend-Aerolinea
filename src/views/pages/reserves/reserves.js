import React, { useState } from "react"
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
  CListGroupItem
} from '@coreui/react'

export default function Reserves() {
  const [visible, setVisible] = useState(false)
  const [selectedReservation, setSelectedReservation] = useState(null)

  const reservations = [
    { id: 1, number: "159", clientName: "Juan Pérez", date: "2023-05-15", total: 150.00 },
    { id: 2, number: "753", clientName: "María García", date: "2023-05-16", total: 200.00 },
    { id: 3, number: "852", clientName: "Carlos Rodríguez", date: "2023-05-17", total: 175.00 },
  ]

  const handleViewClick = (reservation) => {
    setSelectedReservation(reservation)
    setVisible(true)
  }

  return (
    <div className="p-4" style={{backgroundColor: 'none'}}>
      <CFormInput
        type="text"
        placeholder="Search by booking number..."
        className="mb-3"
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
          {reservations.map((reservation) => (
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
                  Ver
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
          {selectedReservation && (
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
                      <span>Id flight</span>
                      <span>159</span>
                    </div>
                  </CListGroupItem>
                  <CListGroupItem>
                    <div className="d-flex justify-content-between">
                      <span>Number of baggage</span>
                      <span>1599</span>
                    </div>
                  </CListGroupItem>

                  <CListGroupItem>
                    <div className="d-flex justify-content-between">
                      <span>Payment Method</span>
                      <span>card</span>
                    </div>
                  </CListGroupItem>

                  <CListGroupItem>
                    <div className="d-flex justify-content-between">
                      <span>Arrival Point</span>
                      <span>Madrid</span>
                    </div>
                  </CListGroupItem>

                  <CListGroupItem>
                    <div className="d-flex justify-content-between">
                      <span>Departure location</span>
                      <span>Atenas</span>
                    </div>
                  </CListGroupItem>


                  <CListGroupItem>
                    <div className="d-flex justify-content-between">
                      <span>Flight Time</span>
                      <span>20:18</span>
                    </div>
                  </CListGroupItem>

                  <CListGroupItem>
                    <div className="d-flex justify-content-between">
                      <strong>Total</strong>
                      <strong>${selectedReservation.total.toFixed(2)}</strong>
                    </div>
                  </CListGroupItem>
                </CListGroup>
              </CCardBody>
            </CCard>
          )}
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