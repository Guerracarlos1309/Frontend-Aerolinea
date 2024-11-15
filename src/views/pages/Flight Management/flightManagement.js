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
  CFormInput,
  CCardTitle,
  CCardText,
  CListGroup,
  CListGroupItem,
} from '@coreui/react'

const flightManagement = () => {
  const [visible, setVisible] = useState(false)
  const [showModalEditar, setShowModalEditar] = useState(false)
  const [selectedFlight, setSelectedFlight] = useState({})

  const flightViewClick = (MFlights) => {
    setSelectedFlight(MFlights)
  }

  const flights = [
    {
      id: 1,
      flightNumber: 'BA178',
      from: 'Madrid',
      toward: 'barcelona',
      status: 'En espera',
    },
    {
      id: 2,
      flightNumber: 'JL015',
      from: 'Madrid',
      toward: 'Bogota',
      status: 'Retrasado',
    },
    {
      id: 3,
      flightNumber: 'EK032',
      from: 'Turin',
      toward: 'barcelona',
      status: 'Cancelado',
    },
    {
      id: 4,
      flightNumber: 'SQ232',
      from: 'Atenas',
      toward: 'Caracas',
      status: 'En vuelo',
    },
    {
      id: 5,
      flightNumber: 'IB6824',
      from: 'Barcelona',
      toward: 'Munchen',
      status: 'Cancelado',
    },
  ]

  const MFlights = [
    {
      id: 1,
      flightNumber: '12',
      horaSalida: '10:00',
      horaLlegada: '15:00',
      tipoVuelo: 'privado',
      aeropuertoSalida: 'cordero',
      aeropuertoLlegada: 'san cristobal',
      pilot: 'daniel',
    },
    {
      id: 2,
      flightNumber: '13',
      horaSalida: '20:00',
      horaLlegada: '02:00',
      tipoVuelo: 'comercial',
      aeropuertoSalida: 'cucuta',
      aeropuertoLlegada: 'caracas',
      pilot: 'daniel',
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
                    <CTableHeaderCell scope="col">Flight status</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {flights.map((flight) => (
                    <CTableRow key={flight.id}>
                      <CTableDataCell>{flight.flightNumber}</CTableDataCell>
                      <CTableDataCell>{flight.from}</CTableDataCell>
                      <CTableDataCell>{flight.toward}</CTableDataCell>
                      <CTableDataCell>{flight.status}</CTableDataCell>
                      <CButton
                        style={{ marginLeft: 20, padding: 5 }}
                        color="info"
                        onClick={() => flightViewClick()}
                      >
                        Info
                      </CButton>

                      <CModal
                        visible={selectedFlight}
                        onClose={() => flightViewClick(false)}
                        size="lg"
                      >
                        <CModalHeader>
                          <CModalTitle>Flights Details</CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                          <CCard>
                            <CCardBody>
                              <CCardTitle>Vuelo Numero: #{}</CCardTitle>
                              <CCardText>
                                <strong>Date:</strong> {}
                              </CCardText>
                              <CCardText>
                                <strong>Pilot:</strong> {}
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
                                    <strong>Services:</strong>
                                    {}
                                  </div>
                                </CListGroupItem>

                                <CListGroupItem>
                                  <div className="d-flex justify-content-between">
                                    <span>Plane: </span>
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

                      <CButton
                        style={{ marginLeft: 20, padding: 5 }}
                        color="success"
                        onClick={() => setShowModalEditar(true)}
                      >
                        Edit
                      </CButton>

                      <CModal
                        alignment="center"
                        scrollable
                        visible={showModalEditar}
                        onClose={() => setShowModalEditar(false)}
                        aria-labelledby="VerticallyCenteredScrollableExample2"
                      >
                        <CModalHeader>
                          <CModalTitle id="VerticallyCenteredScrollableExample2">
                            Edit flight
                          </CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                          <div style={{ display: 'flex' }}>
                            <CFormInput
                              type="text"
                              placeholder="Flight Number"
                              aria-label="default input example"
                              style={{ width: 200, margin: 6 }}
                            />
                            <CFormInput
                              type="text"
                              placeholder="Departure"
                              aria-label="default input example"
                              style={{ width: 200, margin: 6 }}
                            />
                          </div>

                          <div style={{ display: 'flex' }}>
                            <CFormInput
                              type="text"
                              placeholder="Arrivel time"
                              aria-label="default input example"
                              style={{ width: 200, margin: 6 }}
                            />
                            <CFormInput
                              type="text"
                              placeholder="Departure time"
                              aria-label="default input example"
                              style={{ width: 200, margin: 6 }}
                            />
                          </div>

                          <CFormInput
                            type="text"
                            placeholder="Flight Status"
                            aria-label="default input example"
                            style={{ width: 200, margin: 6 }}
                          />
                        </CModalBody>
                        <CModalFooter>
                          <CButton color="secondary" onClick={() => setShowModalEditar(false)}>
                            Close
                          </CButton>
                          <CButton color="primary">Save changes</CButton>
                        </CModalFooter>
                      </CModal>

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
