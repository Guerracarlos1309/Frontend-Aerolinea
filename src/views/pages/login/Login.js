import { React, useState } from 'react'
import { Link } from 'react-router-dom'
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
  const [visibleLg, setVisibleLg] = useState(false)
  const [visiblePass, setVisiblePass] = useState(false)
  const [visibleCont, setVisibleCont] = useState(false)

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4" style={{ backgroundColor: 'rgba(255, 189, 115, 1)' }}>
                <CCardBody>
                  <CForm>
                    <h1 id="negro">Login</h1>
                    <p id="negro" className="text-body-secondary">
                      Sign In to your account
                    </p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput placeholder="Username" autoComplete="username" />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton id="buttomLogin" color="primary" className="px-4">
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton
                          color="black"
                          id="negro"
                          className="px-0"
                          onClick={() => setVisiblePass(!visibleLg)}
                        >
                          Forgot password?
                        </CButton>

                        <CModal
                          alignment="center"
                          scrollable
                          visible={visiblePass}
                          onClose={() => setVisiblePass(false)}
                          aria-labelledby="VerticallyCenteredScrollableExample2"
                        >
                          <CModalHeader>
                            <CModalTitle id="VerticallyCenteredScrollableExample2">
                              Reset password
                            </CModalTitle>
                          </CModalHeader>
                          <CModalBody>
                            <div>
                              <strong>
                                Si Has olvidado tu contraseña ingresa tu direccion de correo
                                electronico para restablecerla
                              </strong>
                              <CFormInput
                                type="text"
                                placeholder="Ingresa tu correo o numero de telefono"
                                aria-label="default input example"
                                style={{ marginTop: 20 }}
                              />
                            </div>
                          </CModalBody>
                          <CModalFooter>
                            <CButton color="secondary" onClick={() => setVisiblePass(false)}>
                              Close
                            </CButton>
                            <CButton
                              color="primary"
                              onClick={() => setVisibleCont(true)}
                              onClose={() => setVisiblePass(false)}
                            >
                              Continue
                            </CButton>

                            <CModal
                              alignment="center"
                              scrollable
                              visible={visibleCont}
                              onClose={() => {
                                setVisibleCont(false)
                                setVisiblePass(false)
                              }}
                              aria-labelledby="VerticallyCenteredScrollableExample2"
                            >
                              <CModalHeader>
                                <CModalTitle id="VerticallyCenteredScrollableExample2">
                                  Ingresa el codigo de verificacion
                                </CModalTitle>
                              </CModalHeader>
                              <CModalBody>
                                <strong>
                                  {' '}
                                  Ingresa el codigo que te ha llegado a tu correo para poder
                                  ingresar al sistema y que puedas cambiar tu contraseña
                                </strong>
                                <CFormInput
                                  type="text-6"
                                  placeholder="Codigo de 6 digitos"
                                  aria-label="default input example"
                                  style={{ marginTop: 20 }}
                                />
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
                          </CModalFooter>
                        </CModal>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard
                id="loginDerecho"
                className="text-white bg-primary py-5"
                style={{ width: '44%', backgroundColor: 'red' }}
              >
                <CCardBody className="text-center">
                  <div>
                    <h2 id="negro">Sign up</h2>
                    <p id="negro">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="/register">
                      <CButton
                        id="buttomLogin"
                        color="primary"
                        className="mt-3"
                        active
                        tabIndex={-1}
                      >
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
