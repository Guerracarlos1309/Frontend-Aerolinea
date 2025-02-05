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
import { helpFetch } from '../../../Api/helpFetch.js'

const api = helpFetch()

const Payment = () => {
  const [payments, setPayments] = useState([])
  const [selectedPayment, setSelectedPayment] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [filteredPayments, setFilteredPayments] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [showAddModal, setShowAddModal] = useState(false) //
  const [newPayment, setNewPayment] = useState({
    id: '',
    date: '',
    amount: '',
    status: '',
    customer: '',
  })

  useEffect(() => {
    fetchPayments()
  }, [])
  useEffect(() => {}, [payments])

  useEffect(() => {
    applyFilters()
  }, [searchTerm, statusFilter, payments])

  const fetchPayments = () => {
    api.get('/plane').then((data) => {
      if (!data.error) {
        setPayments(data.data)
      }
    })
  }

  const handleViewDetails = (payment) => {
    setSelectedPayment(payment)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedPayment(null)
  }

  const applyFilters = () => {
    let filtered = payments

    if (searchTerm) {
      filtered = filtered.filter((payment) =>
        payment.tuition.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (statusFilter) {
      filtered = filtered.filter((payment) => payment.status === statusFilter)
    }

    setFilteredPayments(filtered)
  }

  const handleSearchChange = (e) => setSearchTerm(e.target.value)
  const handleStatusChange = (e) => setStatusFilter(e.target.value)

  const handleOpenAddModal = (e) => {
    e.preventDefault()
    api.post('/payments', { body: newPayment }).then((response) => {
      if (!response.error) {
        setNewPayment({
          id: '',
          date: '',
          amount: '',
          status: '',
          customer: '',
        })
        setShowAddModal(false)
        fetchPayments()
      }
    })
  }
  const handleCloseAddModal = () => setShowAddModal(false)
  const handleSavePayment = () => {
    if (
      !newPayment.id ||
      !newPayment.date ||
      !newPayment.amount ||
      !newPayment.status ||
      !newPayment.customer
    ) {
      return
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewPayment({ ...newPayment, [name]: value })
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Module de Planes - Admin</strong>
          </CCardHeader>

          <CCardBody>
            <CTable hover responsive>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">passenger capacity</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Flight hours</CTableHeaderCell>
                  <CTableHeaderCell scope="col">id Status</CTableHeaderCell>
                  <CTableHeaderCell scope="col">id Model</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {filteredPayments.length > 0 ? (
                  filteredPayments.map((payment) => (
                    <CTableRow key={payment.tuition}>
                      <CTableHeaderCell scope="row">{payment.name}</CTableHeaderCell>
                      <CTableDataCell>{payment.passenger_capacity}</CTableDataCell>
                      <CTableDataCell>{payment.flight_hours}</CTableDataCell>
                      <CTableDataCell>{payment.id_status}</CTableDataCell>
                      <CTableDataCell>{payment.id_model}</CTableDataCell>
                      <CTableDataCell>
                        {/* <CButton
                          color="primary"
                          size="sm"
                          onClick={() => handleViewDetails(payment)}
                        >
                          Ver detalles
                        </CButton> */}
                      </CTableDataCell>
                    </CTableRow>
                  ))
                ) : (
                  <CTableRow>
                    <CTableDataCell colSpan="6" className="text-center">
                      No se encontraron resultados.
                    </CTableDataCell>
                  </CTableRow>
                )}
              </CTableBody>
              <div style={{ margin: 15, marginLeft: 0 }}>
                <CButton
                  color="success"
                  size="sm"
                  onClick={() => {
                    window.location.href = 'http://localhost:7500/download-excel'
                  }}
                >
                  Descargar Excel
                </CButton>
              </div>
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

      <CModal visible={showAddModal} onClose={handleCloseAddModal}>
        <CModalHeader>
          <CModalTitle>Agregar Nuevo Pago</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CFormInput name="id" label="ID" value={newPayment.id} onChange={handleInputChange} />
            <CFormInput
              name="date"
              label="Fecha"
              type="date"
              value={newPayment.date}
              onChange={handleInputChange}
            />
            <CFormInput
              name="amount"
              label="Monto"
              type="number"
              value={newPayment.amount}
              onChange={handleInputChange}
            />
            <CFormSelect
              name="status"
              label="Estado"
              value={newPayment.status}
              onChange={handleInputChange}
            >
              <option value="">Seleccionar Estado</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
              <option value="Failed">Failed</option>
            </CFormSelect>
            <CFormInput
              name="customer"
              label="Cliente"
              value={newPayment.customer}
              onChange={handleInputChange}
            />
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="success" onClick={handleOpenAddModal} onClose={showAddModal}>
            Guardar
          </CButton>
          <CButton color="secondary" onClick={handleCloseAddModal}>
            Cancelar
          </CButton>
        </CModalFooter>
      </CModal>
    </CRow>
  )
}

export default Payment
