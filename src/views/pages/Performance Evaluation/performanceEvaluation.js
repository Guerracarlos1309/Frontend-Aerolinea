import React, { useState, useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CSpinner,
  CListGroup,
  CListGroupItem,
} from '@coreui/react'

const DatosAerolinea = () => {
  const [users, setUser] = useState([])
  const [plane, setPlane] = useState([])
  const [crew, setCrew] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const [resUsers, resPlane, resCrew] = await Promise.all([
          fetch('http://localhost:3004/users'),
          fetch('http://localhost:3004/plane'),
          fetch('http://localhost:3004/crew'),
        ])

        if (!resUsers.ok || !resPlane.ok || !resCrew.ok) {
          throw new Error('Error al obtener los datos')
        }

        const datosUser = await resUsers.json()
        const datosPlane = await resPlane.json()
        const datosCrew = await resCrew.json()

        setUser(datosUser)
        setPlane(datosPlane)
        setCrew(datosCrew)
      } catch (err) {
        setError('Hubo un error al cargar los datos. Por favor, intenta de nuevo más tarde.')
      } finally {
        setCargando(false)
      }
    }

    obtenerDatos()
  }, [])

  if (cargando) {
    return (
      <div className="d-flex justify-content-center">
        <CSpinner color="primary" />
      </div>
    )
  }

  if (error) {
    return <div className="text-center text-danger">{error}</div>
  }

  return (
    <CRow>
      <CCol md={6}>
        <CCard className="mb-4">
          <CCardHeader>USERS</CCardHeader>
          <CCardBody>
            {users.length > 0 ? (
              <CListGroup>
                {users.map((user) => (
                  <CListGroupItem key={user.id}>
                    <strong>{user.name}</strong> - {user.role}
                  </CListGroupItem>
                ))}
              </CListGroup>
            ) : (
              <p>No hay trabajadores registrados.</p>
            )}
          </CCardBody>
        </CCard>
      </CCol>
      <CCol md={6}>
        <CCard className="mb-4">
          <CCardHeader>AIRLINE PLANES</CCardHeader>
          <CCardBody>
            {plane.length > 0 ? (
              <CListGroup>
                {plane.map((avion) => (
                  <CListGroupItem key={avion.id}>
                    <strong>{avion.name}</strong> - Capacidad: {avion.passengerCapacity} pasajeros -
                    Status: {avion.status}
                  </CListGroupItem>
                ))}
              </CListGroup>
            ) : (
              <p>No hay aviones registrados.</p>
            )}
          </CCardBody>
        </CCard>
      </CCol>
      <CCol md={6}>
        <CCard className="mb-4">
          <CCardHeader>AIRLINE STAFF</CCardHeader>
          <CCardBody>
            {crew.length > 0 ? (
              <CListGroup>
                {crew.map((crews) => (
                  <CListGroupItem key={crews.id}>
                    <strong>{crews.name}</strong> - {crews.license} - {crews.speciality}
                  </CListGroupItem>
                ))}
              </CListGroup>
            ) : (
              <p>No hay crews registrados.</p>
            )}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default DatosAerolinea
