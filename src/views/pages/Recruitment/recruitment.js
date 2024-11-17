import React, { useState } from 'react'
import { CForm, CFormInput, CButton } from '@coreui/react'

const recruitment = ({ onPersonAdded }) => {
  const [name, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [id, setId] = useState('')
  const [phoneNumber, setPhone] = useState('')
  const [address, setaddress] = useState('')
  const [role, setrole] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:3004/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, id, phoneNumber, address, role }),
      })

      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor')
      }

      const newPerson = await response.json()
      setNombre('')
      setEmail('')
      setId('')
      setPhone('')
      setaddress('')
      setrole('')
      alert('User added successfully')
      if (onPersonAdded) {
        onPersonAdded(newPerson)
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
          id="Name"
          label="Name"
          value={name}
          onChange={(e) => setNombre(e.target.value)}
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
          label="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhone(e.target.value)}
          required
          className="mb-3"
        />
        <CFormInput
          type="text"
          id="address"
          label="address"
          value={address}
          onChange={(e) => setaddress(e.target.value)}
          required
          className="mb-3"
        />
        <CFormInput
          type="text"
          id="role"
          label="role"
          value={role}
          onChange={(e) => setrole(e.target.value)}
          required
          className="mb-3"
        />
        <CButton type="submit" color="primary">
          Add User
        </CButton>
      </CForm>
    </div>
  )
}

export default recruitment
