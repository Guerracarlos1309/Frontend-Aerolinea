import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' })
  const [error, setError] = useState(null)
  const [visiblePass, setVisiblePass] = useState(false)
  const [visibleCont, setVisibleCont] = useState(false)
  const [modal, setModal] = useState(false)

  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    try {
      const response = await fetch(`http://localhost:3004/users?username_like=${formData.username}`)

      console.log('Response:', response)

      if (!response.ok) {
        throw new Error('Error al conectarse con la API')
      }

      const users = await response.json()
      console.log('Usuarios encontrados:', users)

      if (users.length === 0) {
        setError('Usuario no encontrado')
        return
      }

      const user = users.find((u) => u.username === formData.username)

      if (!user) {
        setError('Usuario no encontrado')
        return
      }

      if (formData.password !== user.password) {
        setError('Contraseña incorrecta')
        return
      }
      localStorage.setItem('loggedUser', JSON.stringify(user))

      setModal(true)
      setTimeout(() => {
        setModal(false)
        navigate('/home')
      }, 2000)
    } catch (error) {
      console.error('Error en la autenticación:', error)
      setError('Error al iniciar sesión')
    }
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleSubmit}>
                    <h1 id="negro">Login</h1>
                    <p id="negro" className="text-body-secondary">
                      Sign In to your account
                    </p>

                    {error && <p className="text-danger">{error}</p>}

                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Username"
                        autoComplete="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                      />
                    </CInputGroup>

                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                      />
                    </CInputGroup>

                    <CRow>
                      <CCol xs={6}>
                        <CButton id="buttomLogin" color="light" className="px-4" type="submit">
                          Login
                        </CButton>
                      </CCol>

                      <CCol xs={6} className="text-right">
                        <CButton
                          color="info"
                          id="negro"
                          className="px-3"
                          onClick={() => setVisiblePass(!visiblePass)}
                        >
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>

              <CCard id="loginDerecho" className="text-white bg-info py-5">
                <CCardBody className="text-center">
                  <h2 id="negro">Sign up</h2>
                  <p id="negro">
                    Register to access all airline modules, from checking and changing flights to
                    adding staff and planes.
                  </p>
                  <Link to="/register">
                    <CButton id="buttomLogin" color="light" className="mt-3">
                      Register Now!
                    </CButton>
                  </Link>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>

      <CModal visible={modal} onClose={() => setModal(false)}>
        <CModalHeader>
          <CModalTitle>Inicio de Sesión Exitoso</CModalTitle>
        </CModalHeader>
        <CModalBody>¡Bienvenido!</CModalBody>
      </CModal>

      <CModal alignment="center" visible={visiblePass} onClose={() => setVisiblePass(false)}>
        <CModalHeader>
          <CModalTitle>Reset password</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <strong>
            Si has olvidado tu contraseña, ingresa tu correo o número de teléfono para
            restablecerla.
          </strong>
          <CFormInput
            type="text"
            placeholder="Ingresa tu correo o numero de telefono"
            style={{ marginTop: 20 }}
          />
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisiblePass(false)}>
            Close
          </CButton>
          <CButton color="primary" onClick={() => setVisibleCont(true)}>
            Continue
          </CButton>
        </CModalFooter>
      </CModal>

      <CModal
        alignment="center"
        visible={visibleCont}
        onClose={() => {
          setVisibleCont(false)
          setVisiblePass(false)
        }}
      >
        <CModalHeader>
          <CModalTitle>Ingresa el código de verificación</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <strong>Ingresa el código enviado a tu correo para cambiar tu contraseña.</strong>
          <CFormInput type="text" placeholder="Código de 6 dígitos" style={{ marginTop: 20 }} />
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisibleCont(false)}>
            Close
          </CButton>
          <CButton color="primary" onClick={() => setVisibleCont(false)}>
            Save changes
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  )
}

export default Login
