import React, { useState } from 'react'
import { CForm, CFormInput, CButton } from '@coreui/react'

const recruitmentCrew = ({ onCrewAdded }) => {
  const [license, setLicense] = useState('')
  const [name, setName] = useState('')
  const [id, setId] = useState('')
  const [birthdate, setBirthdate] = useState('')
  const [speciality, setSpeciality] = useState('')
  const [flightHours, setFlightHours] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [address, setaddress] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:3004/crew', {
        method: 'POST',

        body: JSON.stringify({
          license,
          name,
          id,
          birthdate,
          speciality,
          flightHours,
          email,
          phoneNumber,
          address,
        }),
      })

      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor')
      }

      const newCrew = await response.json()
      setLicense('')
      setName('')
      setId('')
      setBirthdate('')
      setSpeciality('')
      setFlightHours('')
      setEmail('')
      setPhoneNumber('')
      setaddress('')
      alert('Crew added successfully')
      if (onCrewAdded) {
        onPersonAdded(newCrew)
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
          label="id"
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
          id="license"
          label="License"
          value={license}
          onChange={(e) => setLicense(e.target.value)}
          required
          className="mb-3"
        />
        <CFormInput
          type="text"
          id="birthdate"
          label="Birthdate"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
          required
          className="mb-3"
        />
        <CFormInput
          type="text"
          id="speciality"
          label="Speciality"
          value={speciality}
          onChange={(e) => setSpeciality(e.target.value)}
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
          type="email"
          id="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mb-3"
        />
        <CFormInput
          type="tel"
          id="tel"
          label="PhoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
          className="mb-3"
        />
        <CFormInput
          type="text"
          id="address"
          label="Address"
          value={address}
          onChange={(e) => setaddress(e.target.value)}
          required
          className="mb-3"
        />

        <CButton type="submit" color="primary">
          Add staff
        </CButton>
      </CForm>
    </div>
  )
}

export default recruitmentCrew
