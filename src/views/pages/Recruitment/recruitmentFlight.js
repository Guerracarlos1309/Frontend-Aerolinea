import React, { useState } from 'react'
import { CForm, CFormInput, CButton } from '@coreui/react'

const recruitmentFlights = ({ onPlaneAdded }) => {
  const [tuition, setTuition] = useState('')
  const [name, setName] = useState('')
  const [id, setId] = useState('')
  const [passengerCapacity, setPassengerCapacity] = useState('')
  const [flightHours, setFlightHours] = useState('')
  const [status, setStatus] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:3004/plane', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tuition, name, id, passengerCapacity, flightHours, status }),
      })

      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor')
      }

      const newPlane = await response.json()
      setTuition('')
      setName('')
      setId('')
      setPassengerCapacity('')
      setFlightHours('')
      setStatus('')
      alert('Plane added successfully')
      if (onPlaneAdded) {
        onPersonAdded(newPlane)
      }
    } catch (error) {
      console.error('Error al añadir persona:', error)
      alert('Error al añadir persona')
    }
  }

  return (
    <div>
      <CForm onSubmit={handleSubmit} className="mb-3">
        <CFormInput
          type="id"
          id="id"
          label="Id"
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
          className="mb-3"
        />
        <CFormInput
          type="text"
          id="nombre"
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mb-3"
        />
        <CFormInput
          type="text"
          id="tuition"
          label="Tuition"
          value={tuition}
          onChange={(e) => setTuition(e.target.value)}
          required
          className="mb-3"
        />
        <CFormInput
          type="text"
          id="passengerCapacity"
          label="PassengerCapacity"
          value={passengerCapacity}
          onChange={(e) => setPassengerCapacity(e.target.value)}
          required
          className="mb-3"
        />
        <CFormInput
          type="text"
          id="flightHours"
          label="FlightHours"
          value={flightHours}
          onChange={(e) => setFlightHours(e.target.value)}
          required
          className="mb-3"
        />
        <CFormInput
          type="text"
          id="status"
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
          className="mb-3"
        />
        <CButton type="submit" color="primary">
          Add plane
        </CButton>
      </CForm>
    </div>
  )
}

export default recruitmentFlights
