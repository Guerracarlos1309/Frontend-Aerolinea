// import React from "react";

// import {
// CTable,
// CTableHead,
// CTableBody,
// CTableRow,
// CTableHeaderCell,
// CTableDataCell,
// CFormInput,
// CButton,
// } from '@coreui/react'

// const reserves = () => {
    
    
//     return (
    
//     <div className="p-4" style={{backgroundColor: null}}>
//     <CFormInput
//       type="text"
//       placeholder="Search for reservation number..."
     
//       className="mb-3"
//     />


//   <CTable>
// <CTableHead>
//   <CTableRow>
//     <CTableHeaderCell scope="col">#</CTableHeaderCell>
//     <CTableHeaderCell scope="col">Reservation Number</CTableHeaderCell>
//     <CTableHeaderCell scope="col">Info</CTableHeaderCell>
    
//   </CTableRow>
// </CTableHead>
// <CTableBody>
//   <CTableRow>
//     <CTableHeaderCell scope="row">1</CTableHeaderCell>
//     <CTableDataCell>159</CTableDataCell>
    
    
//     <CTableDataCell>
//     <CButton color="primary" size="sm" className="me-2">
//               view
//             </CButton>
            
//     </CTableDataCell>
   
//   </CTableRow>
//   <CTableRow>
//     <CTableHeaderCell scope="row">2</CTableHeaderCell>
//     <CTableDataCell>753</CTableDataCell>
    
//     <CTableDataCell>
//     <CButton color="primary" size="sm" className="me-2">
//               view
//             </CButton>
            
//     </CTableDataCell>
//   </CTableRow>
//   <CTableRow>
//     <CTableHeaderCell scope="row">3</CTableHeaderCell>
//     <CTableDataCell>852</CTableDataCell>
    
//     <CTableDataCell><CButton color="primary" size="sm" className="me-2">
//               view
//             </CButton>
//             </CTableDataCell>

//   </CTableRow>
// </CTableBody>
// </CTable>
// </div>
// )
// }


// export default reserves


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
        placeholder="Buscar por número de reserva..."
        className="mb-3"
      />

      <CTable>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Número de Reserva</CTableHeaderCell>
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
          <CModalTitle>Detalles de la Reserva</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {selectedReservation && (
            <CCard>
              <CCardBody>
                <CCardTitle>Factura de Reserva #{selectedReservation.number}</CCardTitle>
                <CCardText>
                  <strong>Fecha:</strong> {selectedReservation.date}
                </CCardText>
                <CCardText>
                  <strong>Cliente:</strong> {selectedReservation.clientName}
                </CCardText>
                <CListGroup flush>
                  <CListGroupItem>
                    <div className="d-flex justify-content-between">
                      <span>Servicio de habitación</span>
                      <span>$100.00</span>
                    </div>
                  </CListGroupItem>
                  <CListGroupItem>
                    <div className="d-flex justify-content-between">
                      <span>Servicios adicionales</span>
                      <span>$50.00</span>
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
            Cerrar
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  )
}