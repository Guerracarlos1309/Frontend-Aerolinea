import { react, useState } from 'react'
import {
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CCardBody,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
} from '@coreui/react'

const flightManagement = () => {
  const [visible, setVisible] = useState(false)

  const flights = [
    {
      id: 1,
      flightNumber: 'BA178',
      from: 'Madrid',
      toward: 'barcelona',
    },
    {
      id: 2,
      flightNumber: 'JL015',
      from: 'Madrid',
      toward: 'Bogota',
    },
    {
      id: 3,
      flightNumber: 'EK032',
      from: 'Turin',
      toward: 'barcelona',
    },
    {
      id: 4,
      flightNumber: 'SQ232',
      from: 'Atenas',
      toward: 'Caracas',
    },
    {
      id: 5,
      flightNumber: 'IB6824',
      from: 'Barcelona',
      toward: 'Munchen',
    },
  ]
  return (
    <div className="row">
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Flight Management</strong>
            </CCardHeader>
            <CCardBody>
              <CTable hover responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">Flight number</CTableHeaderCell>
                    <CTableHeaderCell scope="col">From</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Toward</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {flights.map((flight) => (
                    <CTableRow key={flight.id}>
                      <CTableDataCell>{flight.flightNumber}</CTableDataCell>
                      <CTableDataCell>{flight.from}</CTableDataCell>
                      <CTableDataCell>{flight.toward}</CTableDataCell>

                      <CButton
                        style={{ marginLeft: 20, padding: 5 }}
                        color="info"
                        onClick={() => setVisible(true)}
                      >
                        Info
                      </CButton>
                      <CModal
                        fullscreen
                        visible={visible}
                        onClose={() => setVisible(false)}
                        aria-labelledby="FullscreenExample1"
                      >
                        <CModalHeader>
                          <CModalTitle id="FullscreenExample1">Full screen</CModalTitle>
                        </CModalHeader>
                        <CModalBody>...</CModalBody>
                      </CModal>
                      <CButton style={{ marginLeft: 20, padding: 5 }} color="success">
                        Edit
                      </CButton>
                      <CButton
                        style={{ marginLeft: 20, padding: 5 }}
                        color="danger"
                        onClick={() => setVisible(true)}
                      >
                        Delete
                      </CButton>
                      <CModal
                        visible={visible}
                        onClose={() => setVisible(false)}
                        aria-labelledby="LiveDemoExampleLabel"
                      >
                        <CModalHeader>
                          <CModalTitle id="LiveDemoExampleLabel">
                            Do you want to delete?
                          </CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                          <p>Changes cannot be undone. Do you want to delete?</p>
                        </CModalBody>
                        <CModalFooter>
                          <CButton color="secondary" onClick={() => setVisible(false)}>
                            Close
                          </CButton>
                          <CButton color="primary" onClick={() => setVisible(false)}>
                            Delete
                          </CButton>
                        </CModalFooter>
                      </CModal>
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

export default flightManagement
