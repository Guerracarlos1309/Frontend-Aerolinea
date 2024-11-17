import React, { useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CForm,
  CFormInput,
  CFormSelect,
  CButton,
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CModalFooter,
} from '@coreui/react'

const paymentData = [
  { id: 1, date: '2023-05-01', amount: 100.0, status: 'Completed', customer: 'John Doe' },
  { id: 2, date: '2023-05-02', amount: 75.5, status: 'Pending', customer: 'Jane Smith' },
  { id: 3, date: '2023-05-03', amount: 200.0, status: 'Failed', customer: 'Bob Johnson' },
  { id: 4, date: '2023-05-04', amount: 50.0, status: 'Completed', customer: 'Alice Brown' },
  { id: 5, date: '2023-05-05', amount: 150.0, status: 'Pending', customer: 'Charlie Davis' },
]

const Payment = () => {
  const [cardNumber, setCardNumber] = useState('')
  const [cardName, setCardName] = useState('')
  const [expiryMonth, setExpiryMonth] = useState('')
  const [expiryYear, setExpiryYear] = useState('')
  const [cvv, setCvv] = useState('')
  const [payments, setPayments] = useState(paymentData)
  const [selectedPayment, setSelectedPayment] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [filterStatus, setFilterStatus] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const handleViewDetails = (payment) => {
    setSelectedPayment(payment)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedPayment(null)
  }

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value)
    filterPayments(e.target.value, searchTerm)
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
    filterPayments(filterStatus, e.target.value)
  }

  const filterPayments = (status, search) => {
    let filteredPayments = paymentData
    if (status) {
      filteredPayments = filteredPayments.filter((payment) => payment.status === status)
    }
    if (search) {
      filteredPayments = filteredPayments.filter(
        (payment) =>
          payment.customer.toLowerCase().includes(search.toLowerCase()) ||
          payment.id.toString().includes(search),
      )
    }
    setPayments(filteredPayments)
  }

  const handlePaymentSubmit = (e) => {
    e.preventDefault()

    console.log('Payment submitted', { cardNumber, cardName, expiryMonth, expiryYear, cvv })

    setCardNumber('')
    setCardName('')
    setExpiryMonth('')
    setExpiryYear('')
    setCvv('')
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Módulo de Pagos - Administrador</strong>
          </CCardHeader>
          <CCardBody>
            <CForm className="row g-3 mb-4">
              <CCol md={4}>
                <CFormInput
                  type="text"
                  placeholder="Buscar por cliente o ID"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </CCol>
              <CCol md={4}>
                <CFormSelect value={filterStatus} onChange={handleFilterChange}>
                  <option value="">Todos los estados</option>
                  <option value="Completed">Completado</option>
                  <option value="Pending">Pendiente</option>
                  <option value="Failed">Fallido</option>
                </CFormSelect>
              </CCol>
            </CForm>
            <CTable hover responsive>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">ID</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Fecha</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Monto</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Estado</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Cliente</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Acciones</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {payments.map((payment) => (
                  <CTableRow key={payment.id}>
                    <CTableHeaderCell scope="row">{payment.id}</CTableHeaderCell>
                    <CTableDataCell>{payment.date}</CTableDataCell>
                    <CTableDataCell>${payment.amount.toFixed(2)}</CTableDataCell>
                    <CTableDataCell>{payment.status}</CTableDataCell>
                    <CTableDataCell>{payment.customer}</CTableDataCell>
                    <CTableDataCell>
                      <CButton color="primary" size="sm" onClick={() => handleViewDetails(payment)}>
                        Ver detalles
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>

      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Módulo de Pagos - Nuevo Pago</strong>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={handlePaymentSubmit}>
              <CRow>
                <CCol md={6}>
                  <CFormInput
                    type="text"
                    id="cardNumber"
                    label="Número de Tarjeta"
                    placeholder="1234 5678 9012 3456"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    required
                    className="mb-3"
                  />
                </CCol>
                <CCol md={6}>
                  <CFormInput
                    type="text"
                    id="cardName"
                    label="Nombre en la Tarjeta"
                    placeholder="John Doe"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    required
                    className="mb-3"
                  />
                </CCol>
              </CRow>
              <CRow>
                <CCol md={4}>
                  <CFormSelect
                    id="expiryMonth"
                    label="Mes de Expiración"
                    value={expiryMonth}
                    onChange={(e) => setExpiryMonth(e.target.value)}
                    required
                    className="mb-3"
                  >
                    <option value="">Mes</option>
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                      <option key={month} value={month.toString().padStart(2, '0')}>
                        {month.toString().padStart(2, '0')}
                      </option>
                    ))}
                  </CFormSelect>
                </CCol>
                <CCol md={4}>
                  <CFormSelect
                    id="expiryYear"
                    label="Año de Expiración"
                    value={expiryYear}
                    onChange={(e) => setExpiryYear(e.target.value)}
                    required
                    className="mb-3"
                  >
                    <option value="">Año</option>
                    {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map(
                      (year) => (
                        <option key={year} value={year.toString()}>
                          {year}
                        </option>
                      ),
                    )}
                  </CFormSelect>
                </CCol>
                <CCol md={4}>
                  <CFormInput
                    type="text"
                    id="cvv"
                    label="CVV"
                    placeholder="123"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    required
                    className="mb-3"
                  />
                </CCol>
              </CRow>
              <CButton color="primary" type="submit" className="mt-3">
                Realizar Pago
              </CButton>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>

      <CModal visible={showModal} onClose={handleCloseModal}>
        <CModalHeader>
          <CModalTitle>Detalles del Pago</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {selectedPayment && (
            <div>
              <p>
                <strong>ID:</strong> {selectedPayment.id}
              </p>
              <p>
                <strong>Fecha:</strong> {selectedPayment.date}
              </p>
              <p>
                <strong>Monto:</strong> ${selectedPayment.amount.toFixed(2)}
              </p>
              <p>
                <strong>Estado:</strong> {selectedPayment.status}
              </p>
              <p>
                <strong>Cliente:</strong> {selectedPayment.customer}
              </p>
            </div>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={handleCloseModal}>
            Cerrar
          </CButton>
        </CModalFooter>
      </CModal>
    </CRow>
  )
}

export default Payment
