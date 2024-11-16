import React, { useState } from 'react'
import { CForm, CFormInput, CButton } from '@coreui/react'

const performanceEvaluation = ({ onPersonAdded }) => {
  const [name, setNombre] = useState('')
  const [email, setEmail] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:3004/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
      })

      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor')
      }

      const newPerson = await response.json()
      setNombre('')
      setEmail('')
      alert('Persona añadida con éxito')
      if (onPersonAdded) {
        onPersonAdded(newPerson)
      }
    } catch (error) {
      console.error('Error al añadir persona:', error)
      alert('Error al añadir persona')
    }
  }

  return (
    <CForm onSubmit={handleSubmit} className="mb-3">
      <h2>Añadir Nueva Persona</h2>
      <CFormInput
        type="text"
        id="nombre"
        label="Nombre"
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
      <CButton type="submit" color="primary">
        Añadir Persona
      </CButton>
    </CForm>
  )
}

export default performanceEvaluation
