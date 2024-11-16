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
} from '@coreui/react'
import '@coreui/coreui/dist/css/coreui.min.css'

const Payment = () => {
  const [cardNumber, setCardNumber] = useState('')
  const [cardName, setCardName] = useState('')
  const [expiryMonth, setExpiryMonth] = useState('')
  const [expiryYear, setExpiryYear] = useState('')
  const [cvv, setCvv] = useState('')

  return (
    <CRow className="justify-content-center">
      <CCol md={6}>
        <CCard className="mx-4">
          <CCardHeader>
            <strong>Módulo de Pagos</strong>
          </CCardHeader>
          <CCardBody className="p-4">
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
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Payment
