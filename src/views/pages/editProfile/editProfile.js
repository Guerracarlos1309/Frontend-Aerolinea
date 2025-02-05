import React, { useEffect, useState } from 'react'
import {
  CButton,
  CTabs,
  CTabList,
  CTabContent,
  CTabPanel,
  CTab,
  CInputGroup,
  CInputGroupText,
  CFormInput,
  CRow,
  CCol,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CContainer,
  CFormSelect,
} from '@coreui/react'
import { helpFetch } from '../../../Api/helpFetch.js'

const api = helpFetch()

const EditProfile = () => {
  const [visible, setVisible] = useState(false)
  const [userData, setUserData] = useState(null)
  const [successVisible, setSuccessVisible] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    address: '',
    role: '',
    username: '',
    password: '',
  })

  useEffect(() => {
    fetchUserData()
  }, [])

  const fetchUserData = async () => {
    const storedUser = JSON.parse(localStorage.getItem('loggedUser'))
    if (storedUser?.id) {
      api.get(`/users/${storedUser.id}`).then((data) => {
        if (!data.error) {
          setUserData(data)
          setFormData(data)
        }
      })
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSaves = async () => {
    if (!userData?.id) {
      console.error('User ID not found')
      return
    }

    try {
      console.log('Sending data:', formData)
      const response = await api.put(`/users`, { body: formData }, userData.id)

      if (!response.error) {
        console.log('Update successful!')
        fetchUserData()
        setVisible(false)
        setSuccessVisible(true)
      } else {
        console.error('Update error:', response.error)
      }
    } catch (error) {
      console.error('Request error:', error)
    }
  }

  return (
    <>
      <CTabs activeItemKey={1}>
        <CTabList variant="tabs" layout="justified">
          <CTab aria-controls="home-tab-pane" itemKey={1}>
            Profile
          </CTab>
          <CTab aria-controls="profile-tab-pane" itemKey={2}>
            Edit
          </CTab>
          <CTab aria-controls="contact-tab-pane" itemKey={3}>
            Contact
          </CTab>
        </CTabList>
        <CTabContent>
          <CTabPanel className="py-3" aria-labelledby="home-tab-pane" itemKey={1}>
            <CContainer>
              <CRow xs={{ cols: 1 }} sm={{ cols: 2 }} md={{ cols: 4 }}>
                <CCol>
                  <strong>Name:</strong> {userData?.name}
                </CCol>
                <CCol>
                  <strong>Email:</strong> {userData?.email}
                </CCol>
                <CCol>
                  <strong>Address:</strong> {userData?.address}
                </CCol>
                <CCol>
                  <strong>Status:</strong> {userData?.role}
                </CCol>
              </CRow>
            </CContainer>
          </CTabPanel>

          <CTabPanel className="py-3" aria-labelledby="profile-tab-pane" itemKey={2}>
            <CInputGroup className="mb-3">
              <CInputGroupText>Name</CInputGroupText>
              <CFormInput name="name" value={formData.name} onChange={handleChange} />
            </CInputGroup>

            <CInputGroup className="mb-3">
              <CInputGroupText>Email</CInputGroupText>
              <CFormInput name="email" value={formData.email} onChange={handleChange} />
            </CInputGroup>

            <CInputGroup className="mb-3">
              <CInputGroupText>Phone</CInputGroupText>
              <CFormInput name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
            </CInputGroup>

            <CInputGroup className="mb-3">
              <CInputGroupText>Address</CInputGroupText>
              <CFormInput name="address" value={formData.address} onChange={handleChange} />
            </CInputGroup>

            <CInputGroup className="mb-3">
              <CInputGroupText>Role</CInputGroupText>
              <CFormSelect name="role" value={formData.role} onChange={handleChange}>
                <option value="">Selecciona un rol</option>
                <option value="Admin">Admin</option>
                <option value="User">User</option>
                <option value="Guest">Guest</option>
              </CFormSelect>
            </CInputGroup>

            <CInputGroup className="mb-3">
              <CInputGroupText>Username</CInputGroupText>
              <CFormInput name="username" value={formData.username} disabled />
            </CInputGroup>

            <CRow className="mb-3">
              <CCol sm={6}>
                <CFormInput
                  name="password"
                  type="password"
                  placeholder="New password"
                  onChange={handleChange}
                />
              </CCol>
            </CRow>

            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <CButton color="success" className="me-md-2" onClick={() => setVisible(true)}>
                Save changes
              </CButton>
              <CModal visible={visible} onClose={() => setVisible(false)}>
                <CModalHeader>
                  <CModalTitle>Do you want to save?</CModalTitle>
                </CModalHeader>
                <CModalBody>The data will be updated.</CModalBody>
                <CModalFooter>
                  <CButton color="secondary" onClick={() => setVisible(false)}>
                    Close
                  </CButton>
                  <CButton color="primary" onClick={handleSaves}>
                    Save changes
                  </CButton>
                </CModalFooter>
              </CModal>
            </div>
          </CTabPanel>

          <CTabPanel className="py-3" aria-labelledby="contact-tab-pane" itemKey={3}>
            <strong>Phone number:</strong> {userData?.phoneNumber}
          </CTabPanel>
        </CTabContent>
      </CTabs>

      <CModal visible={successVisible} onClose={() => setSuccessVisible(false)}>
        <CModalHeader>
          <CModalTitle>Success</CModalTitle>
        </CModalHeader>
        <CModalBody>Your changes have been saved successfully.</CModalBody>
        <CModalFooter>
          <CButton color="primary" onClick={() => setSuccessVisible(false)}>
            OK
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default EditProfile
