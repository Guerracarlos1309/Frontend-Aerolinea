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
  CFormLabel,
  CFormTextarea,
  CContainer,
} from '@coreui/react'
import { Alert } from '@coreui/coreui'

const flightManagement = (onFlightAdded) => {
  const [visible, setVisible] = useState(false)
  const [flights, setFlights] = useState([])
  const [flightToEdit, setFlightToEdit] = useState(null)
  const [editVisible, setEditVisible] = useState(false)
  const [flightDelete, setFlightDelete] = useState(null)
  const [flightVisible, setFlightVisible] = useState(false)
  const [id, setId] = useState('')
  const [numeroVuelo, setNumeroVuelo] = useState('')
  const [aerolinea, setAerolinea] = useState('')
  const [fechaSalida, setFechaSalida] = useState('')
  const [fechaLlegada, setFechaLlegada] = useState('')
  const [horaSalida, setHoraSalida] = useState('')
  const [horaLlegada, setHoraLlegada] = useState('')
  const [Salida, setSalida] = useState('')
  const [destino, setDestino] = useState('')
  const [status, setStatus] = useState('')

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

  const handleSaves = async () => {
    try {
      const response = await fetch(`http://localhost:3004/Flights/${flightToEdit.id}`, {
        method: 'PUT',
        body: JSON.stringify(flightToEdit),
      })
      const updatedFlight = await response.json()
      setFlights(flights.map((Flight) => (Flight.id === updatedFlight.id ? updatedFlight : Flight)))
      setVisible(false)
      setFlightToEdit(null)
    } catch (error) {
      console.error('Error al actualizar el reporte:', error)
    }
  }

  const editFlight = (e) => {
    e.preventDefault()
    setFlights(flights.map((flight) => (flight.id === flightToEdit.id ? flightToEdit : flight)))
    setEditVisible(false)

    console.log(`Vuelo con ID ${flightToEdit.id} actualizado`)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:3004/Flights', {
        method: 'POST',

        body: JSON.stringify({
          id,
          numeroVuelo,
          aerolinea,
          fechaSalida,
          fechaLlegada,
          horaSalida,
          horaLlegada,
          Salida,
          destino,
          status,
        }),
      })
      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor')
      }

      const newPlane = await response.json()
      setId('')
      setNumeroVuelo('')
      setAerolinea('')
      setFechaSalida('')
      setFechaLlegada('')
      setHoraSalida('')
      setHoraLlegada('')
      setSalida('')
      setDestino('')
      setStatus('')
      alert('Flight added successfully')
      if (onFlightAdded) {
        onFlightAdded(newPlane)
      }
    } catch (error) {
      console.error('Error al añadir un vuelo:', error)
    }
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
                    <CTableHeaderCell scope="col">Departure city</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Arrival city</CTableHeaderCell>
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
                              <CButton color="primary" onClick={handleSaves} onClose={editVisible}>
                                Save Changes
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

      <CContainer fluid className="p-0">
        <div className="position-relative py-4">
          <div className="position-absolute top-50 start-0 end-0 border-top border-2 border-primary"></div>
          <div className="position-relative d-inline-block bg- px-4 mx-auto"></div>
        </div>
      </CContainer>

      <CCard className="mx-auto" style={{ maxWidth: '500px', marginBottom: 20 }}>
        <CCardHeader>
          <h4 className="mb-0">ADD NEW FLIGHT</h4>
        </CCardHeader>
        <CCardBody>
          <CForm onSubmit={handleSubmit}>
            <div style={{ display: 'flex' }}>
              <CRow className="mb-3">
                <CCol style={{ margin: 10 }}>
                  <CFormLabel htmlFor="Name Plane">Id Plane</CFormLabel>
                  <CFormInput
                    id="id"
                    placeholder="Ingrese El id del vuelo"
                    type="id"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    required
                  />
                </CCol>
              </CRow>

              <CRow className="mb-3">
                <CCol style={{ margin: 10 }}>
                  <CFormLabel htmlFor="Flight Number">Flight Number</CFormLabel>
                  <CFormInput
                    id="flightNumber"
                    placeholder="Ingrese el numero de vuelo del vuelo"
                    type="flightNumber"
                    value={numeroVuelo}
                    onChange={(e) => setNumeroVuelo(e.target.value)}
                    required
                  />
                </CCol>
              </CRow>
            </div>
            <CRow className="mb-3">
              <CCol style={{ margin: 10 }}>
                <CFormLabel htmlFor="Name Plane">Airline</CFormLabel>
                <CFormInput
                  id="id"
                  placeholder="Ingrese la Aerolinea"
                  type="text"
                  value={aerolinea}
                  onChange={(e) => setAerolinea(e.target.value)}
                  required
                />
              </CCol>
            </CRow>
            <div style={{ display: 'flex' }}>
              <CRow className="mb-3">
                <CCol style={{ margin: 10 }}>
                  <CFormLabel htmlFor="fecha Salida">departure date</CFormLabel>
                  <CFormInput
                    id="fechaSalida"
                    placeholder="Ingrese la fecha del vuelo"
                    type="date"
                    value={fechaSalida}
                    onChange={(e) => setFechaSalida(e.target.value)}
                    required
                  />
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CCol style={{ margin: 10 }}>
                  <CFormLabel htmlFor="fecha llegada">Date arrived</CFormLabel>
                  <CFormInput
                    id="fechaSalida"
                    placeholder="Ingrese la fecha del vuelo"
                    type="date"
                    value={fechaLlegada}
                    onChange={(e) => setFechaLlegada(e.target.value)}
                    required
                  />
                </CCol>
              </CRow>
            </div>
            <div style={{ display: 'flex' }}>
              <CRow className="mb-3">
                <CCol style={{ margin: 10 }}>
                  <CFormLabel htmlFor="Hora salida">departure time</CFormLabel>
                  <CFormInput
                    id="horaSalida"
                    placeholder="Ingrese la hora del vuelo"
                    type="time"
                    value={horaSalida}
                    onChange={(e) => setHoraSalida(e.target.value)}
                    required
                  />
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CCol style={{ margin: 10 }}>
                  <CFormLabel htmlFor="hora Llegada">Arrival Time</CFormLabel>
                  <CFormInput
                    id="horaLlegada"
                    placeholder="Ingrese la hora de llegada del vuelo"
                    type="time"
                    value={horaLlegada}
                    onChange={(e) => setHoraLlegada(e.target.value)}
                    required
                  />
                </CCol>
              </CRow>
            </div>
            <div style={{ display: 'flex' }}>
              <CRow className="mb-3">
                <CCol style={{ margin: 10 }}>
                  <CFormLabel htmlFor="Salida">Place of departure</CFormLabel>
                  <CFormInput
                    id="salida"
                    placeholder="Ingrese de donde saldra el vuelo"
                    type="text"
                    value={Salida}
                    onChange={(e) => setSalida(e.target.value)}
                    required
                  />
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CCol style={{ margin: 10 }}>
                  <CFormLabel htmlFor="destino">Place of arrival</CFormLabel>
                  <CFormInput
                    id="horaLlegada"
                    placeholder="Ingrese el destino del vuelo"
                    type="text"
                    value={destino}
                    onChange={(e) => setDestino(e.target.value)}
                    required
                  />
                </CCol>
              </CRow>
            </div>
            <CRow className="mb-3">
              <CCol style={{ margin: 10 }}>
                <CFormLabel htmlFor="Status">Status</CFormLabel>
                <CFormInput
                  id="status"
                  placeholder="Ingrese el status del vuelo"
                  type="text"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  required
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol className="text-center">
                <CButton type="submit" color="primary" className="px-4">
                  Add flight
                </CButton>
              </CCol>
            </CRow>
          </CForm>
        </CCardBody>
      </CCard>
    </div>
  )
}

export default flightManagement
