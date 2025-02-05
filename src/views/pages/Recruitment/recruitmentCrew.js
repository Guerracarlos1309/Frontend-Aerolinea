import React, { useState } from 'react'
import {
  CForm,
  CFormInput,
  CButton,
  CCard,
  CCardHeader,
  CCardBody,
  CRow,
  CCol,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
} from '@coreui/react'
import { helpFetch } from '../../../Api/helpFetch.js'

const api = helpFetch()

const RecruitmentCrew = () => {
  const [modalAgg, setModalAgg] = useState(false)
  const [newCrew, setNewCrew] = useState({
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

  const handleSubmit = async (e) => {
    e.preventDefault()

    const crewData = {
      id_license: newCrew.id_license,
      firstname: newCrew.firstname,
      lastname: newCrew.lastname,
      birthdate: newCrew.birthdate,
      speciality: newCrew.speciality,
      flight_hours: newCrew.flight_hours,
      gmail: newCrew.gmail,
      phone_number: newCrew.phone_number,
      address: newCrew.address,
    }

    console.log('Datos enviados:', crewData)

    try {
      const response = await api.post('/crew/create', { body: crewData })

      if (response && !response.error) {
        setNewCrew({
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

        setModalAgg(true)
      } else {
        console.error('Error al agregar el personal', response.error)
      }
    } catch (error) {
      console.error('Error en la solicitud POST:', error)
    }
  }

  const handleCloseModal = () => {
    setModalAgg(false)
  }

  const handleInputChange = (e) => {
    e.preventDefault()
    const { id, value } = e.target
    setNewCrew({
      ...newCrew,
      [id]: value,
    })
  }

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
          Recruitment Crew
        </h2>
      </div>

      <CCard className="w-50 mx-auto shadow" style={{ marginBottom: 20 }}>
        <CCardHeader className="text-center">
          <strong>Add Staff</strong>
        </CCardHeader>
        <CCardBody>
          <CForm onSubmit={handleSubmit}>
            <CRow>
              <CCol md={6}>
                <CFormInput
                  className="mb-3"
                  type="text"
                  id="id_license"
                  label="ID License"
                  value={newCrew.id_license}
                  onChange={handleInputChange}
                  required
                />
                <CFormInput
                  className="mb-3"
                  type="text"
                  id="firstname"
                  label="First Name"
                  value={newCrew.firstname}
                  onChange={handleInputChange}
                  required
                />
                <CFormInput
                  className="mb-3"
                  type="text"
                  id="lastname"
                  label="Last Name"
                  value={newCrew.lastname}
                  onChange={handleInputChange}
                  required
                />
                <CFormInput
                  className="mb-3"
                  type="date"
                  id="birthdate"
                  label="Birthdate"
                  value={newCrew.birthdate}
                  onChange={handleInputChange}
                  required
                />

                <CFormInput
                  className="mb-3"
                  type="text"
                  id="speciality"
                  label="Speciality"
                  value={newCrew.speciality}
                  onChange={handleInputChange}
                  required
                />
              </CCol>
              <CCol md={6}>
                <CFormInput
                  className="mb-3"
                  type="text"
                  id="flight_hours"
                  label="Flight Hours"
                  value={newCrew.flight_hours}
                  onChange={handleInputChange}
                  required
                />
                <CFormInput
                  className="mb-3"
                  type="email"
                  id="gmail"
                  label="Email"
                  value={newCrew.gmail}
                  onChange={handleInputChange}
                  required
                />
                <CFormInput
                  className="mb-3"
                  type="text"
                  id="phone_number"
                  label="Phone Number"
                  value={newCrew.phone_number}
                  onChange={handleInputChange}
                  required
                />
                <CFormInput
                  className="mb-3"
                  type="text"
                  id="address"
                  label="Address"
                  value={newCrew.address}
                  onChange={handleInputChange}
                  required
                />
              </CCol>
            </CRow>
            <div className="text-center mt-3">
              <CButton type="submit" color="primary">
                Add Staff
              </CButton>
            </div>
          </CForm>
        </CCardBody>
      </CCard>

      <CModal visible={modalAgg} onClose={handleCloseModal}>
        <CModalHeader>
          <strong>Crew added successfully</strong>
        </CModalHeader>
        <CModalBody>The crew has been added successfully.</CModalBody>
        <CModalFooter>
          <CButton color="success" onClick={handleCloseModal}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  )
}

export default RecruitmentCrew
