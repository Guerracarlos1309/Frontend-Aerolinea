import React, { useEffect, useState } from 'react'
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

const Payment = () => {
  const [payments, setPayments] = useState([])
  const [selectedPayment, setSelectedPayment] = useState(null)
  const [showModal, setShowModal] = useState(false)

  const [busqueda, setBusqueda] = useState('')

  useEffect(() => {
    fetchPayments()
  }, [])

  const fetchPayments = async () => {
    try {
      const response = await fetch('http://localhost:3004/payments')
      const data = await response.json()
      setPayments(data)
    } catch (error) {
      console.error('Error al obtener los reportes: ', error)
    }
  }

  const handleViewDetails = (payment) => {
    setSelectedPayment(payment)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedPayment(null)
  }

  /*const nameFiltered = payments.filter(
    (payment) => payment.name && payment.name.toLowerCase().includes(busqueda.toLowerCase()),
  )*/
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
                  //value={busqueda}
                  //onChange={(e) => setBusqueda(e.target.value)}
                />
              </CCol>
              <CCol md={4}>
                <CFormSelect>
                  <option value="">Todos los estados</option>
                  <option value="Completed">Completed</option>
                  <option value="Pending">Pending</option>
                  <option value="Failed">Failed</option>
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
                    <CTableDataCell>${payment.amount}</CTableDataCell>
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
                <strong>Monto:</strong> ${selectedPayment.amount}
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
