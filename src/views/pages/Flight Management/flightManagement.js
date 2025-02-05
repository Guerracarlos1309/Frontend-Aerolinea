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
  CListGroup,
  CListGroupItem,
  CForm,
  CFormLabel,
  CContainer,
} from '@coreui/react'
import { helpFetch } from '../../../Api/helpFetch.js'

const api = helpFetch()

const flightManagement = () => {
  const [flights, setFlights] = useState([])
  const [crew, setCrew] = useState([])
  const [editVisible, setEditVisible] = useState(false)
  const [flightDelete, setFlightDelete] = useState(null)
  const [crewDelete, setCrewDelete] = useState(null)
  const [flightVisible, setFlightVisible] = useState(false)
  const [selectedFlight, setSelectedFlight] = useState(null)
  const [selectedCrew, setSelectedCrew] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [visibleCrew, setVisibleCrew] = useState(false)
  const [newPlane, setNewPlane] = useState({
    id_flight: '',
    flight_number: '',
    airport_departure: '',
    airport_arrival: '',
    id_services: '',
    id_tuition: '',
    id_passenger: '',
  })
  const [formData, setFormData] = useState({
    numeroVuelo: '',
    aerolinea: '',
    fechaSalida: '',
    fechaLlegada: '',
    horaSalida: '',
    horaLlegada: '',
    Salida: '',
    destino: '',
    status: '',
  })

  const [formDataCrew, setFormDataCrew] = useState({
    id_license: '',
    firstname: '',
    lastname: '',
    birthdate: '',
    speciality: '',
    flight_hours: '',
    gmail: '',
    phone_number: '',
    address: '',
  })

  useEffect(() => {
    fetchFlights()
    loadCrew()
  }, [])

  useEffect(() => {}, [flights])
  useEffect(() => {}, [crew])

  const fetchFlights = () => {
    api.get('/flights').then((data) => {
      if (!data.error) {
        console.log(data)
        setFlights(data.data)
      }
    })
  }

  const loadCrew = () => {
    api.get('/crew').then((data) => {
      if (!data.error) {
        setCrew(data.data)
      }
    })
  }

  const deleteFlight = async () => {
    if (!selectedFlight) {
      console.error('No flight selected or invalid id')
      return
    }

    console.log('Selected Flight ID:', selectedFlight) // Verificar que selectedFlight tiene el valor correcto

    await api
      .delet(`/flights/delete`, selectedFlight)
      .then((response) => {
        if (!response.error) {
          fetchFlights()
          setFlightDelete(false)
          setSelectedFlight(null)
        } else {
          console.error('Error deleting flight', response.error)
        }
      })
      .catch((error) => {
        console.error('Error in DELETE request:', error)
      })
  }

  const deleteCrew = () => {
    if (!selectedCrew) {
      console.error('No crew member selected or invalid id_license')
      return
    }
    console.log('Selected crew ID before DELETE:', selectedCrew)
    api
      .delet(`/crew/delete`, selectedCrew)
      .then((response) => {
        if (!response.error) {
          loadCrew()
          setCrewDelete(false)
          setSelectedCrew(null)
        } else {
          console.error('Error deleting crew member:', response.error)
        }
      })
      .catch((error) => {
        console.error('Error in DELETE request:', error)
      })
  }

  const handleDeleteClick = (id_flight) => {
    console.log('id_flight:', id_flight) // Verificar que el id_flight es el correcto
    if (id_flight) {
      setSelectedFlight(id_flight) // Asignar el valor de id_flight a selectedFlight
      setFlightDelete(true) // Mostrar el modal de confirmación
    } else {
      console.error('Invalid Flight id')
    }
  }

  const handleDeleteClickCrew = (id) => {
    if (id) {
      setSelectedCrew(id)
      setCrewDelete(true)
    } else {
      console.error('Invalid crew id')
    }
  }

  const handleFlightClick = (flight) => {
    setSelectedFlight(flight)
    setFlightVisible(true)
  }

  const handleSaves = async () => {
    console.log('Selected flight:', selectedFlight)
    console.log('Form data:', formData)
    if (!selectedFlight) return
    api.put('/Flights', { body: formData }, selectedFlight.id).then((response) => {
      if (!response.error) {
        fetchFlights()
        setEditVisible(false)
        setSelectedFlight(null)
      } else {
        console.error('Error updating flight:', response)
      }
    })
  }

  const editFlight = (Flight) => {
    setSelectedFlight(Flight)
    setFormData(Flight)
    setEditVisible(true)
  }

  const handlesavesCrew = async () => {
    if (!selectedCrew) return
    api.put('/crew', { body: formDataCrew }, selectedCrew.id).then((response) => {
      if (!response.error) {
        loadCrew()
        setVisibleCrew(false)
        setSelectedCrew(null)
      } else {
        console.error('Error updating Crew:', response)
      }
    })
  }

  const editcrew = (crews) => {
    setSelectedCrew(crews)
    setFormDataCrew(crews)
    setVisibleCrew(true)
  }

  const handleEditChange = (e) => {
    const { id, value } = e.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }))
  }
  const handleEditChangeCrew = (e) => {
    const { id, value } = e.target
    setFormDataCrew((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (
      !newPlane.id_flight ||
      !newPlane.flight_number ||
      !newPlane.airport_departure ||
      !newPlane.airport_arrival ||
      !newPlane.id_services ||
      !newPlane.id_tuition ||
      !newPlane.id_passenger
    ) {
      alert('Por favor, completa todos los campos requeridos.')
      return
    }

    try {
      const response = await api.post('/flights/create', {
        body: {
          id_flight: newPlane.id_flight,
          flight_number: newPlane.flight_number,
          airport_departure: newPlane.airport_departure,
          airport_arrival: newPlane.airport_arrival,
          id_services: newPlane.id_services,
          id_tuition: newPlane.id_tuition,
          id_passenger: newPlane.id_passenger,
        },
      })

      console.log('Response from server:', response)

      if (response.status === 'success') {
        alert('Vuelo creado exitosamente.')
        fetchFlights()
        setModalOpen(false)
        setNewPlane({
          id_flight: '',
          flight_number: '',
          airport_departure: '',
          airport_arrival: '',
          id_services: '',
          id_tuition: '',
          id_passenger: '',
        })
      } else {
        const errorMessage = response.message || 'Error desconocido al crear el vuelo'
        alert(`Error al crear el vuelo: ${errorMessage}`)
      }
    } catch (error) {
      console.error('Error completo:', error)
      alert('Error al crear el vuelo: ' + (error.message || 'Error desconocido'))
    }
  }

  const handleInputChange = (e) => {
    const { id, value } = e.target
    setNewPlane((prevState) => ({
      ...prevState,
      [id]: value,
    }))
    console.log('Current newPlane state:', newPlane)
  }

  return (
    <div className="row">
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
          Flight Management
        </h2>
      </div>
      <div style={{ position: 'relative', marginBottom: 12, marginLeft: 10 }}>
        <CButton
          color="warning"
          onClick={() => setModalOpen(true)}
          style={{
            top: 20,
            right: 20,
            padding: '8px 16px',
            fontSize: '16px',
            borderRadius: '30px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.3s ease',
          }}
        >
          Añadir vuelo
        </CButton>
      </div>

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
                    <CTableHeaderCell scope="col">Flight Number</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Services</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Tuition</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Airport Departure</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Airport Arrival</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {flights.map((Flight) => (
                    <CTableRow key={Flight.id_flight}>
                      <CTableDataCell>{Flight.flight_number}</CTableDataCell>
                      <CTableDataCell>{Flight.service}</CTableDataCell>
                      <CTableDataCell>{Flight.tuition}</CTableDataCell>
                      <CTableDataCell>{Flight.a_departure}</CTableDataCell>
                      <CTableDataCell>{Flight.a_arrival}</CTableDataCell>

                      <CButton
                        style={{ marginLeft: 20, padding: 5 }}
                        color="info"
                        onClick={() => handleFlightClick(Flight)}
                      >
                        Info
                      </CButton>

                      <CButton
                        style={{ marginLeft: 20, padding: 5 }}
                        color="success"
                        onClick={() => {
                          editFlight(Flight)
                        }}
                      >
                        Edit
                      </CButton>

                      <CButton
                        style={{ marginLeft: 20, padding: 5 }}
                        color="danger"
                        onClick={() => handleDeleteClick(Flight.id_flight)} // Verifica si Flight.id tiene un valor correcto
                      >
                        Delete
                      </CButton>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

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
          Crew Management
        </h2>
      </div>

      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Crew Management</strong>
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
                  {crew.map((crews) => (
                    <CTableRow key={crews.id_license}>
                      <CTableDataCell>{crews.id_license}</CTableDataCell>
                      <CTableDataCell>{crews.firstname}</CTableDataCell>
                      <CTableDataCell>{crews.lastname}</CTableDataCell>
                      <CTableDataCell>{crews.speciality}</CTableDataCell>

                      <CButton
                        style={{ marginLeft: 20, padding: 5 }}
                        color="success"
                        onClick={() => {
                          editcrew(crews)
                        }}
                      >
                        Edit
                      </CButton>

                      <CButton
                        style={{ marginLeft: 20, padding: 5 }}
                        color="danger"
                        onClick={() => handleDeleteClickCrew(crews.id_license)}
                      >
                        Delete
                      </CButton>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CModal
        visible={flightDelete}
        onClose={() => setFlightDelete(false)}
        aria-labelledby="LiveDemoExampleLabel"
      >
        <CModalHeader>
          <CModalTitle id="LiveDemoExampleLabel">Do you want to delete?</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <p>Changes cannot be undone. Do you want to delete?</p>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setFlightDelete(false)}>
            Close
          </CButton>
          <CButton color="primary" onClick={deleteFlight}>
            Delete
          </CButton>
        </CModalFooter>
      </CModal>

      <CModal visible={flightVisible} onClose={() => setFlightVisible(false)} size="lg">
        <CModalHeader>
          <CModalTitle>Flight Details</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {selectedFlight ? (
            <CCard>
              <CCardBody>
                <CCardTitle>
                  <strong>Vuelo Numero: # </strong>
                  {selectedFlight.numeroVuelo}
                </CCardTitle>
                <CListGroup flush>
                  <CListGroupItem>
                    <div className="d-flex justify-content-between">
                      <strong>Id Flight:</strong>
                      <span>{selectedFlight.id}</span>
                    </div>
                  </CListGroupItem>
                  <CListGroupItem>
                    <div className="d-flex justify-content-between">
                      <strong>Flight Number:</strong>
                      <span>{selectedFlight.numeroVuelo}</span>
                    </div>
                  </CListGroupItem>
                  <CListGroupItem>
                    <div className="d-flex justify-content-between">
                      <strong>Airline:</strong>
                      <span>{selectedFlight.aerolinea}</span>
                    </div>
                  </CListGroupItem>
                  <CListGroupItem>
                    <div className="d-flex justify-content-between">
                      <strong>Fecha Salida:</strong>
                      <span>{selectedFlight.fechaSalida}</span>
                    </div>
                  </CListGroupItem>
                  <CListGroupItem>
                    <div className="d-flex justify-content-between">
                      <strong>Fecha Llegada:</strong>
                      <span>{selectedFlight.fechaLlegada}</span>
                    </div>
                  </CListGroupItem>
                  <CListGroupItem>
                    <div className="d-flex justify-content-between">
                      <strong>Hora salida:</strong>
                      <span>{selectedFlight.horaSalida}</span>
                    </div>
                  </CListGroupItem>
                  <CListGroupItem>
                    <div className="d-flex justify-content-between">
                      <strong>Hora llegada:</strong>
                      <span>{selectedFlight.horaLlegada}</span>
                    </div>
                  </CListGroupItem>
                  <CListGroupItem>
                    <div className="d-flex justify-content-between">
                      <strong>Salida:</strong>
                      <span>{selectedFlight.Salida}</span>
                    </div>
                  </CListGroupItem>
                  <CListGroupItem>
                    <div className="d-flex justify-content-between">
                      <strong>Destino:</strong>
                      <span>{selectedFlight.destino}</span>
                    </div>
                  </CListGroupItem>
                  <CListGroupItem>
                    <div className="d-flex justify-content-between">
                      <strong>Status Flight:</strong>
                      <span>{selectedFlight.status}</span>
                    </div>
                  </CListGroupItem>
                </CListGroup>
              </CCardBody>
            </CCard>
          ) : (
            <span>No flight details available.</span>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setFlightVisible(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>

      <CModal
        alignment="center"
        size="lg"
        scrollable
        visible={editVisible}
        onClose={() => setEditVisible(false)}
        aria-labelledby="VerticallyCenteredScrollableExample2"
      >
        <CModalHeader>
          <CModalTitle id="VerticallyCenteredScrollableExample2">Edit flight</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
              <CRow className="mb-3" style={{ flex: '1 1 45%' }}>
                <CCol>
                  <CFormLabel htmlFor="status">Status</CFormLabel>
                  <CFormInput
                    type="text"
                    name="status"
                    id="status"
                    value={formData.status}
                    onChange={handleEditChange}
                    placeholder="Flight Status"
                    style={{ margin: 6 }}
                  />
                </CCol>
              </CRow>

              <CRow className="mb-3" style={{ flex: '1 1 45%' }}>
                <CCol>
                  <CFormLabel htmlFor="horaSalida">Departure Time</CFormLabel>
                  <CFormInput
                    type="time"
                    name="horaSalida"
                    id="horaSalida"
                    value={formData.horaSalida}
                    onChange={handleEditChange}
                    placeholder="Departure Time"
                    style={{ margin: 6 }}
                  />
                </CCol>
              </CRow>

              <CRow className="mb-3" style={{ flex: '1 1 45%' }}>
                <CCol>
                  <CFormLabel htmlFor="fechaSalida">Departure Date</CFormLabel>
                  <CFormInput
                    type="date"
                    name="fechaSalida"
                    id="fechaSalida"
                    value={formData.fechaSalida}
                    onChange={handleEditChange}
                    placeholder="Departure Date"
                    style={{ margin: 6 }}
                  />
                </CCol>
              </CRow>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
              <CRow className="mb-3" style={{ flex: '1 1 45%' }}>
                <CCol>
                  <CFormLabel htmlFor="horaLlegada">Arrival Time</CFormLabel>
                  <CFormInput
                    type="time"
                    name="horaLlegada"
                    id="horaLlegada"
                    value={formData.horaLlegada}
                    onChange={handleEditChange}
                    placeholder="Arrival Time"
                    style={{ margin: 6 }}
                  />
                </CCol>
              </CRow>

              <CRow className="mb-3" style={{ flex: '1 1 45%' }}>
                <CCol>
                  <CFormLabel htmlFor="fechaLlegada">Arrival Date</CFormLabel>
                  <CFormInput
                    type="date"
                    name="fechaLlegada"
                    id="fechaLlegada"
                    value={formData.fechaLlegada}
                    onChange={handleEditChange}
                    placeholder="Arrival Date"
                    style={{ margin: 6 }}
                  />
                </CCol>
              </CRow>
            </div>

            <CModalFooter style={{ marginTop: 20 }}>
              <CButton color="primary" onClick={handleSaves}>
                Save Changes
              </CButton>
            </CModalFooter>
          </CForm>
        </CModalBody>
      </CModal>

      <CModal
        alignment="center"
        size="lg"
        scrollable
        visible={visibleCrew}
        onClose={() => setVisibleCrew(false)}
        aria-labelledby="VerticallyCenteredScrollableExample2"
      >
        <CModalHeader>
          <CModalTitle id="VerticallyCenteredScrollableExample2">Edit Crew</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
              <CRow className="mb-3" style={{ flex: '1 1 45%', margin: 5 }}>
                <CCol>
                  <CFormLabel htmlFor="license">license</CFormLabel>
                  <CFormInput
                    type="text"
                    name="license"
                    id="license"
                    value={formDataCrew.license}
                    onChange={handleEditChangeCrew}
                    placeholder="License"
                    style={{ margin: 6 }}
                  />
                </CCol>
              </CRow>

              <CRow className="mb-3" style={{ flex: '1 1 45%', margin: 5 }}>
                <CCol>
                  <CFormLabel htmlFor="name">Full Name</CFormLabel>
                  <CFormInput
                    type="text"
                    name="name"
                    id="name"
                    value={formDataCrew.name}
                    onChange={handleEditChangeCrew}
                    placeholder="Departure Time"
                    style={{ margin: 6 }}
                  />
                </CCol>
              </CRow>

              <CRow className="mb-3" style={{ flex: '1 1 45%', margin: 5 }}>
                <CCol>
                  <CFormLabel htmlFor="flightHours">Flight Hours</CFormLabel>
                  <CFormInput
                    type="text"
                    name="flightHours"
                    id="flightHours"
                    value={formDataCrew.flightHours}
                    onChange={handleEditChangeCrew}
                    placeholder="Departure Date"
                    style={{ margin: 6 }}
                  />
                </CCol>
              </CRow>
              <CRow className="mb-3" style={{ flex: '1 1 45%', margin: 5 }}>
                <CCol>
                  <CFormLabel htmlFor="speciality">speciality</CFormLabel>
                  <CFormInput
                    type="text"
                    name="speciality"
                    id="speciality"
                    value={formDataCrew.speciality}
                    onChange={handleEditChangeCrew}
                    placeholder="Departure Time"
                    style={{ margin: 6 }}
                  />
                </CCol>
              </CRow>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
              <CRow className="mb-3" style={{ flex: '1 1 45%', margin: 5 }}>
                <CCol>
                  <CFormLabel htmlFor="email">Email</CFormLabel>
                  <CFormInput
                    type="email"
                    name="email"
                    id="email"
                    value={formDataCrew.email}
                    onChange={handleEditChangeCrew}
                    placeholder="Arrival Time"
                    style={{ margin: 6 }}
                  />
                </CCol>
              </CRow>

              <CRow className="mb-3" style={{ flex: '1 1 45%', margin: 5 }}>
                <CCol>
                  <CFormLabel htmlFor="phoneNumber">Phone Number</CFormLabel>
                  <CFormInput
                    type="text"
                    name="phoneNumber"
                    id="phoneNumber"
                    value={formDataCrew.phoneNumber}
                    onChange={handleEditChangeCrew}
                    placeholder="Arrival Date"
                    style={{ margin: 6 }}
                  />
                </CCol>
              </CRow>
            </div>

            <CModalFooter style={{ marginTop: 20 }}>
              <CButton color="primary" onClick={handlesavesCrew}>
                Save Changes
              </CButton>
            </CModalFooter>
          </CForm>
        </CModalBody>
      </CModal>

      <CModal
        visible={crewDelete}
        onClose={() => setCrewDelete(false)}
        aria-labelledby="LiveDemoExampleLabel"
      >
        <CModalHeader>
          <CModalTitle id="LiveDemoExampleLabel">Do you want to delete?</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <p>Changes cannot be undone. Do you want to delete?</p>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setCrewDelete(false)}>
            Close
          </CButton>
          <CButton color="primary" onClick={deleteCrew}>
            Delete
          </CButton>
        </CModalFooter>
      </CModal>

      <CContainer fluid className="p-0">
        <div className="position-relative py-4">
          <div className="position-absolute top-50 start-0 end-0 border-top border-2 border-primary"></div>
          <div className="position-relative d-inline-block bg- px-4 mx-auto"></div>
        </div>
      </CContainer>

      <CModal visible={modalOpen} onClose={() => setModalOpen(false)} size="lg" scrollable>
        <CModalBody>
          <CCard size="lg" className="mx-auto" style={{ maxWidth: '100%' }}>
            <CCardHeader>
              <h4 className="mb-0">ADD NEW FLIGHT</h4>
            </CCardHeader>
            <CCardBody>
              <CForm onSubmit={handleSubmit}>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                  <CRow className="mb-3" style={{ flex: '1 1 45%' }}>
                    <CCol>
                      <CFormLabel htmlFor="id_flight">Flight ID</CFormLabel>
                      <CFormInput
                        id="id_flight"
                        placeholder="Enter Flight ID"
                        type="text"
                        value={newPlane.id_flight}
                        onChange={handleInputChange}
                        required
                      />
                    </CCol>
                  </CRow>

                  <CRow className="mb-3" style={{ flex: '1 1 45%' }}>
                    <CCol>
                      <CFormLabel htmlFor="flight_number">Flight Number</CFormLabel>
                      <CFormInput
                        id="flight_number"
                        placeholder="Enter Flight Number"
                        type="text"
                        value={newPlane.flight_number}
                        onChange={handleInputChange}
                        required
                      />
                    </CCol>
                  </CRow>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                  <CRow className="mb-3" style={{ flex: '1 1 45%' }}>
                    <CCol>
                      <CFormLabel htmlFor="airport_departure">Departure Airport</CFormLabel>
                      <CFormInput
                        id="airport_departure"
                        placeholder="Enter Departure Airport"
                        type="text"
                        value={newPlane.airport_departure}
                        onChange={handleInputChange}
                        required
                      />
                    </CCol>
                  </CRow>

                  <CRow className="mb-3" style={{ flex: '1 1 45%' }}>
                    <CCol>
                      <CFormLabel htmlFor="airport_arrival">Arrival Airport</CFormLabel>
                      <CFormInput
                        id="airport_arrival"
                        placeholder="Enter Arrival Airport"
                        type="text"
                        value={newPlane.airport_arrival}
                        onChange={handleInputChange}
                        required
                      />
                    </CCol>
                  </CRow>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                  <CRow className="mb-3" style={{ flex: '1 1 45%' }}>
                    <CCol>
                      <CFormLabel htmlFor="id_services">Service ID</CFormLabel>
                      <CFormInput
                        id="id_services"
                        placeholder="Enter Service ID"
                        type="text"
                        value={newPlane.id_services}
                        onChange={handleInputChange}
                        required
                      />
                    </CCol>
                  </CRow>

                  <CRow className="mb-3" style={{ flex: '1 1 45%' }}>
                    <CCol>
                      <CFormLabel htmlFor="id_tuition">Tuition ID</CFormLabel>
                      <CFormInput
                        id="id_tuition"
                        placeholder="Enter Tuition ID"
                        type="text"
                        value={newPlane.id_tuition}
                        onChange={handleInputChange}
                        required
                      />
                    </CCol>
                  </CRow>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                  <CRow className="mb-3" style={{ flex: '1 1 45%' }}>
                    <CCol>
                      <CFormLabel htmlFor="id_passenger">Passenger ID</CFormLabel>
                      <CFormInput
                        id="id_passenger"
                        placeholder="Enter Passenger ID"
                        type="text"
                        value={newPlane.id_passenger}
                        onChange={handleInputChange}
                        required
                      />
                    </CCol>
                  </CRow>
                </div>

                <CModalFooter>
                  <CButton type="submit" color="primary" className="px-4">
                    Add Flight
                  </CButton>
                  <CButton color="secondary" onClick={() => setModalOpen(false)}>
                    Close
                  </CButton>
                </CModalFooter>
              </CForm>
            </CCardBody>
          </CCard>
        </CModalBody>
      </CModal>
    </div>
  )
}

export default flightManagement
