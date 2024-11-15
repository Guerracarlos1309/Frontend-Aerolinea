import React, { useState, useEffect } from 'react'
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
  CForm,
} from '@coreui/react'

const flightManagement = () => {
  const [visible, setVisible] = useState(false)
  const [flights, setFlights] = useState([])
  const [flightToEdit, setFlightToEdit] = useState(null)
  const [editVisible, setEditVisible] = useState(false)
  const [flightDelete, setFlightDelete] = useState(null)
  const [flightVisible, setFlightVisible] = useState(false)

  useEffect(() => {
    fetchFlights()
  }, [])

  const fetchFlights = async () => {
    try {
      const response = await fetch('http://localhost:3004/Flights')
      const data = await response.json()
      setFlights(data)
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }

  const deleteFlight = async (id) => {
    try {
      await fetch(`http://localhost:3004/Flights/${id}`, {
        method: 'DELETE',
      })
      setFlights(flights.filter((flight) => flight.id !== id))
      setVisible(false)
    } catch (error) {
      console.error('Error deleting user:', error)
    }
  }

  const editFlight = (e) => {
    e.preventDefault()
    setFlights(flights.map((flight) => (flight.id === flightToEdit.id ? flightToEdit : flight)))
    setEditVisible(false)

    console.log(`Vuelo con ID ${flightToEdit.id} actualizado`)
  }

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
                  {flights.map((Flight) => (
                    <CTableRow key={Flight.id}>
                      <CTableDataCell>{Flight.numeroVuelo}</CTableDataCell>
                      <CTableDataCell>{Flight.Salida}</CTableDataCell>
                      <CTableDataCell>{Flight.destino}</CTableDataCell>
                      <CTableDataCell>{Flight.status}</CTableDataCell>
                      <CButton
                        style={{ marginLeft: 20, padding: 5 }}
                        color="info"
                        onClick={() => setFlightVisible(true)}
                      >
                        Info
                      </CButton>

                      <CModal
                        visible={flightVisible}
                        onClose={() => setFlightVisible(false)}
                        size="lg"
                      >
                        <CModalHeader>
                          <CModalTitle>Flights Details</CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                          <CCard>
                            <CCardBody>
                              {flights.map((Flight) => (
                                <CCardTitle>Vuelo Numero: #{Flight.numeroVuelo}</CCardTitle>
                              ))}
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
                          <CButton color="secondary" onClick={() => setFlightVisible(false)}>
                            Close
                          </CButton>
                        </CModalFooter>
                      </CModal>

                      <CButton
                        style={{ marginLeft: 20, padding: 5 }}
                        color="success"
                        onClick={() => {
                          setFlightToEdit(Flight)
                          setEditVisible(true)
                        }}
                      >
                        Edit
                      </CButton>

                      <CModal
                        alignment="center"
                        scrollable
                        visible={editVisible}
                        onClose={() => setEditVisible(false)}
                        aria-labelledby="VerticallyCenteredScrollableExample2"
                      >
                        <CModalHeader>
                          <CModalTitle id="VerticallyCenteredScrollableExample2">
                            Edit flight
                          </CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                          <CForm onSubmit={editFlight}>
                            <div className="mb-3">
                              <CFormInput
                                type="text"
                                id="name"
                                label="Status"
                                value={flightToEdit?.status || ''}
                                onChange={(e) =>
                                  setFlightToEdit({ ...flightToEdit, status: e.target.value })
                                }
                                placeholder="Flight Status"
                                style={{ width: 200, margin: 6 }}
                              />
                            </div>
                            <CModalFooter style={{ marginTop: 20 }}>
                              <CButton color="primary" type="submit">
                                Save changes
                              </CButton>
                            </CModalFooter>
                          </CForm>
                        </CModalBody>
                      </CModal>

                      <CButton
                        style={{ marginLeft: 20, padding: 5 }}
                        color="danger"
                        onClick={() => {
                          setFlightDelete(Flight.id)
                          setVisible(true)
                        }}
                      >
                        {''}
                        Delete
                      </CButton>
                      {visible && (
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
                            <CButton color="primary" onClick={() => deleteFlight(flightDelete)}>
                              Delete
                            </CButton>
                          </CModalFooter>
                        </CModal>
                      )}
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
