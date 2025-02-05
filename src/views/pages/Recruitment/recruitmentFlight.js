import React, { useState, useEffect } from 'react'
import {
  CForm,
  CFormInput,
  CButton,
  CCardBody,
  CCardHeader,
  CCard,
  CCol,
  CRow,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CFormSelect,
} from '@coreui/react'
import { helpFetch } from '../../../Api/helpFetch.js'

const api = helpFetch()

const recruitmentFlights = () => {
  const [modalAgg, setModalAgg] = useState(false)
  const [statuses, setStatuses] = useState([])
  const [newPlane, setNewPlane] = useState({
    id: '',
    tuition: '',
    name: '',
    passengerCapacity: '',
    flightHours: '',
    status: '',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    const planeData = {
      tuition: newPlane.tuition,
      name: newPlane.name,
      passenger_capacity: Number(newPlane.passengerCapacity),
      flight_hours: Number(newPlane.flightHours),
      id_status: Number(newPlane.status),
      id_model: 1,
    }

    console.log('Datos a enviar:', planeData)

    try {
      const response = await api.post('/plane/create', { body: planeData })
      console.log('Respuesta del servidor:', response)
      console.log('Datos enviados al backend:', planeData)
      console.log('Datos recibidos:', planeData)

      if (response && !response.error) {
        setNewPlane({
          tuition: '',
          name: '',
          passengerCapacity: '',
          flightHours: '',
          status: '',
          id_model: 1,
        })
        setModalAgg(true)
      } else {
        console.error('Error al agregar el avión', response.error)
      }
    } catch (error) {
      console.error('Error en la solicitud POST', error)
    }
  }
  const handleCloseModal = () => {
    setModalAgg(false)
  }

  const handleInputChange = (e) => {
    e.preventDefault()
    const { id, value } = e.target
    setNewPlane({
      ...newPlane,
      [id]: value,
    })
  }

  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        const response = await api.get('/plane/statuses')
        console.log('Statuses received:', response.data) // Asegúrate de que se reciban los datos
        if (Array.isArray(response.data)) {
          setStatuses(response.data) // Actualiza el estado con los datos recibidos
        } else {
          console.error('Response is not an array')
        }
      } catch (error) {
        console.error('Error fetching statuses:', error)
      }
    }

    fetchStatuses() // Llamar la función cuando el componente se monta
  }, [])
  return (
    <div>
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
          Recruitment Plane
        </h2>
      </div>
      <CCard className="w-50 mx-auto shadow">
        <CCardHeader className="text-center">
          {' '}
          <strong>Add Plane </strong>
        </CCardHeader>
        <CCardBody>
          <CForm onSubmit={handleSubmit}>
            <CRow>
              <CCol md={6}>
                <CFormInput
                  className="mb-3"
                  type="text"
                  id="id"
                  label="ID"
                  value={newPlane.id}
                  onChange={handleInputChange}
                  required
                />
                <CFormInput
                  className="mb-3"
                  type="text"
                  id="name"
                  label="Name"
                  value={newPlane.name}
                  onChange={handleInputChange}
                  required
                />
                <CFormInput
                  className="mb-3"
                  type="text"
                  id="tuition"
                  label="Tuition"
                  value={newPlane.tuition}
                  onChange={handleInputChange}
                  required
                />
              </CCol>
              <CCol md={6}>
                <CFormInput
                  className="mb-3"
                  type="text"
                  id="passengerCapacity"
                  label="Passenger Capacity"
                  value={newPlane.passengerCapacity}
                  onChange={handleInputChange}
                  required
                />
                <CFormInput
                  className="mb-3"
                  type="text"
                  id="flightHours"
                  label="Flight Hours"
                  value={newPlane.flightHours}
                  onChange={handleInputChange}
                  required
                />
                <CFormSelect
                  id="status"
                  value={newPlane.status} // El valor seleccionado del select
                  onChange={(e) => setNewPlane({ ...newPlane, status: e.target.value })} // Actualiza el estado con el valor seleccionado
                >
                  <option value="">Select Status</option>
                  {statuses.map((status) => (
                    <option key={status.id_status} value={status.id_status}>
                      {status.description} {/* Muestra la descripción del estado */}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
            </CRow>
            <div className="text-center mt-3">
              <CButton type="submit" color="primary">
                Add Plane
              </CButton>
            </div>
          </CForm>
        </CCardBody>
      </CCard>

      <CModal visible={modalAgg} onClose={handleCloseModal}>
        <CModalHeader>
          <strong>Plane added successfully</strong>
        </CModalHeader>
        <CModalBody>The Plane has been added successfully.</CModalBody>
        <CModalFooter>
          <CButton color="success" onClick={handleCloseModal}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  )
}

export default recruitmentFlights
