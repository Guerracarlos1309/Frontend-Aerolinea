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
  CCardHeader,
  CForm,
  CRow,
  CCol,
  CFormSelect,
} from '@coreui/react'
import { helpFetch } from '../../../Api/helpFetch.js'

const api = helpFetch()

const reserves = () => {
  const [visible, setVisible] = useState(false)
  const [selectedReservation, setSelectedReservation] = useState({})
  const [reserves, setReserves] = useState([])
  const [busqueda, setBusqueda] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [nameFiltered, setNameFiltered] = useState([])
  const [reservation, setReservation] = useState({
    number: '',
    clientName: '',
    date: '',
    total: '',
    numberBabagge: '',
    idFlight: '',
    methodPay: '',
    arrival: '',
    departure: '',
    flightTime: '',
  })

  useEffect(() => {
    setNameFiltered(
      reserves.filter((reserve) =>
        String(reserve.id_reservation || '')
          .toLowerCase()
          .includes(busqueda.toLowerCase()),
      ),
    )
  }, [reserves, busqueda])

  useEffect(() => {
    loadReserves()
  }, [])

  const loadReserves = () => {
    api.get('/reserves').then((data) => {
      console.log(reserves)
      console.log(data)
      if (!data.error) {
        setReserves(data.data)
      }
    })
  }

  const handleViewClick = (reservation) => {
    setSelectedReservation(reservation)
    setVisible(true)
  }

  const handleChange = (e) => {
    const { id, value } = e.target
    setReservation({ ...reservation, [id]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    api.post('/reservations', { body: reservation }).then((response) => {
      if (!response.error) {
        setReservation({
          number: '',
          clientName: '',
          date: '',
          total: '',
          numberBabagge: '',
          idFlight: '',
          methodPay: '',
          arrival: '',
          departure: '',
          flightTime: '',
        })
        setShowModal(false)
        setShowSuccessModal(true)
        loadReserves()
      }
    })
  }

  return (
    <div className="p-4" style={{ backgroundColor: 'none' }}>
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
          Reserves
        </h2>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '500px',
          margin: '0 auto',
          gap: '10px',
        }}
      >
        <CFormInput
          type="text"
          placeholder="Search by booking number..."
          className="mb-3"
          style={{ flex: 1 }}
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <CButton
          color="info"
          size="sm"
          variant="outline"
          className="px-3 py-1"
          onClick={() => setShowModal(true)}
        >
          Add Reserve
        </CButton>
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '10px' }}>
        <CTable bordered hover responsive className="shadow-sm">
          <CTableHead color="dark">
            <CTableRow>
              <CTableHeaderCell scope="col" className="text-center" style={{ width: '10%' }}>
                #
              </CTableHeaderCell>
              <CTableHeaderCell scope="col" className="text-center" style={{ width: '50%' }}>
                Reservation Number
              </CTableHeaderCell>
              <CTableHeaderCell scope="col" className="text-center" style={{ width: '50%' }}>
                Departure Date
              </CTableHeaderCell>
              <CTableHeaderCell scope="col" className="text-center" style={{ width: '50%' }}>
                Arival Date
              </CTableHeaderCell>
              <CTableHeaderCell scope="col" className="text-center" style={{ width: '50%' }}>
                Reservation Status
              </CTableHeaderCell>
              <CTableHeaderCell scope="col" className="text-center" style={{ width: '50%' }}>
                Reservation Id Flight
              </CTableHeaderCell>
              <CTableHeaderCell scope="col" className="text-center" style={{ width: '30%' }}>
                Info
              </CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {nameFiltered.map((reservation, index) => (
              <CTableRow key={reservation.id_reservation}>
                <CTableHeaderCell scope="row" className="text-center">
                  {index + 1}
                </CTableHeaderCell>
                <CTableDataCell className="text-center">
                  {reservation.id_reservation}
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  {reservation.departure_date.split('T')[0]}
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  {reservation.arrival_date.split('T')[0]}
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  {reservation.reservation_status}
                </CTableDataCell>
                <CTableDataCell className="text-center">{reservation.id_flight}</CTableDataCell>
                <CTableDataCell className="text-center">
                  <CButton
                    color="info"
                    size="sm"
                    variant="outline"
                    className="px-3 py-1"
                    onClick={() => handleViewClick(reservation)}
                  >
                    View
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </div>

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

      <CModal visible={showModal} onClose={() => setShowModal(false)}>
        <CModalHeader>
          <strong>Create Reservation</strong>
        </CModalHeader>
        <CModalBody>
          <CCard>
            <CCardBody>
              <CForm onSubmit={handleSubmit}>
                <CRow>
                  <CCol md={6}>
                    <CFormInput
                      className="mb-3"
                      type="text"
                      id="number"
                      label="Reservation Number"
                      value={reservation.number}
                      onChange={handleChange}
                      required
                    />
                    <CFormInput
                      className="mb-3"
                      type="text"
                      id="clientName"
                      label="Client Name"
                      value={reservation.clientName}
                      onChange={handleChange}
                      required
                    />
                    <CFormInput
                      className="mb-3"
                      type="date"
                      id="date"
                      label="Date"
                      value={reservation.date}
                      onChange={handleChange}
                      required
                    />
                    <CFormInput
                      className="mb-3"
                      type="number"
                      id="total"
                      label="Total"
                      value={reservation.total}
                      onChange={handleChange}
                      required
                    />
                    <CFormInput
                      className="mb-3"
                      type="number"
                      id="numberBabagge"
                      label="Baggage Number"
                      value={reservation.numberBabagge}
                      onChange={handleChange}
                      required
                    />
                  </CCol>
                  <CCol md={6}>
                    <CFormInput
                      className="mb-3"
                      type="text"
                      id="idFlight"
                      label="Flight ID"
                      value={reservation.idFlight}
                      onChange={handleChange}
                      required
                    />
                    <CFormSelect
                      className="mb-3"
                      id="methodPay"
                      label="Payment Method"
                      value={reservation.methodPay}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Method</option>
                      <option value="Card">Card</option>
                      <option value="Cash">Cash</option>
                      <option value="PayPal">PayPal</option>
                    </CFormSelect>
                    <CFormInput
                      className="mb-3"
                      type="text"
                      id="arrival"
                      label="Arrival City"
                      value={reservation.arrival}
                      onChange={handleChange}
                      required
                    />
                    <CFormInput
                      className="mb-3"
                      type="text"
                      id="departure"
                      label="Departure City"
                      value={reservation.departure}
                      onChange={handleChange}
                      required
                    />
                    <CFormInput
                      className="mb-3"
                      type="time"
                      id="flightTime"
                      label="Flight Time"
                      value={reservation.flightTime}
                      onChange={handleChange}
                      required
                    />
                  </CCol>
                </CRow>
              </CForm>
            </CCardBody>
          </CCard>
        </CModalBody>
        <CModalFooter>
          <CButton color="danger" onClick={() => setShowModal(false)}>
            Cancel
          </CButton>
          <CButton type="submit" color="success" onClick={handleSubmit}>
            Save Reservation
          </CButton>
        </CModalFooter>
      </CModal>

      <CModal visible={showSuccessModal} onClose={() => setShowSuccessModal(false)}>
        <CModalHeader>
          <strong>Reservation Created</strong>
        </CModalHeader>
        <CModalBody>The reservation has been created successfully!</CModalBody>
        <CModalFooter>
          <CButton color="success" onClick={() => setShowSuccessModal(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  )
}

export default reserves
