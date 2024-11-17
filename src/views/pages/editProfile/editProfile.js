import React from 'react'

import { useState } from 'react'

import {
  CButton,
  CTabs,
  CTabList,
  CTabContent,
  CTabPanel,
  CTab,
  CToast,
  CToastHeader,
  CToastBody,
  CInputGroup,
  CInputGroupText,
  CFormInput,
  CRow,
  CFormLabel,
  CCol,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CContainer,
} from '@coreui/react'

const editProfile = () => {
  const [visible, setVisible] = useState(false)

  return (
    <CTabs activeItemKey={2}>
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
        <CTab aria-controls="disabled-tab-pane" disabled itemKey={4}>
          Disabled
        </CTab>
      </CTabList>
      <CTabContent>
        <CTabPanel className="py-3" aria-labelledby="home-tab-pane" itemKey={1}>
          <CContainer>
            <CRow xs={{ cols: 1 }} sm={{ cols: 2 }} md={{ cols: 4 }}>
              <CCol>Name</CCol>
              <CCol>Email</CCol>
              <CCol>Address</CCol>
              <CCol>Status</CCol>
            </CRow>
          </CContainer>

          <CContainer>
            <CRow xs={{ cols: 1 }} sm={{ cols: 2 }} md={{ cols: 4 }}>
              <CCol>Carlos Guerra</CCol>
              <CCol>guerracarlos1309@gmail.com</CCol>
              <CCol>venezuela</CCol>
              <CCol>active</CCol>
            </CRow>
          </CContainer>
        </CTabPanel>
        <CTabPanel className="py-3" aria-labelledby="profile-tab-pane" itemKey={2}>
          <CInputGroup style={{ marginTop: 10 }} className="mb-3">
            <CInputGroupText id="basic-addon1">@</CInputGroupText>
            <CFormInput
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </CInputGroup>

          <CRow className="mb-3">
            <CCol sm={6}>
              <CFormInput
                style={{ marginTop: 10 }}
                placeholder="New password"
                type="password"
                id="inputPassword"
              />
            </CCol>

            <CCol sm={6}>
              <CFormInput
                style={{ marginTop: 10 }}
                placeholder="Repeat password"
                type="password"
                id="inputPassword"
              />
            </CCol>
          </CRow>

          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <CButton color="success" className="me-md-2" onClick={() => setVisible(!visible)}>
              Save changes
            </CButton>
            <CModal
              visible={visible}
              onClose={() => setVisible(false)}
              aria-labelledby="LiveDemoExampleLabel"
            >
              <CModalHeader>
                <CModalTitle id="LiveDemoExampleLabel">Do you want to save?</CModalTitle>
              </CModalHeader>
              <CModalBody>
                <p>The data will be updated.</p>
              </CModalBody>
              <CModalFooter>
                <CButton color="secondary" onClick={() => setVisible(false)}>
                  Close
                </CButton>
                <CButton color="primary">Save changes</CButton>
              </CModalFooter>
            </CModal>
          </div>
        </CTabPanel>

        <CTabPanel className="py-3" aria-labelledby="contact-tab-pane" itemKey={3}>
          <CToast animation={false} autohide={false} visible={true}>
            <CToastHeader closeButton>
              <svg
                className="rounded me-2"
                width="20"
                height="20"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid slice"
                focusable="false"
                role="img"
              >
                <rect width="100%" height="100%" fill="#007aff"></rect>
              </svg>
              <div className="fw-bold me-auto">Carlos Guerra</div>
              <small>7 min ago</small>
            </CToastHeader>
            <CToastBody>I'm the statistics administrator</CToastBody>
            <CToastBody>Phone number: 4247842726</CToastBody>
          </CToast>
        </CTabPanel>
      </CTabContent>
    </CTabs>
  )
}

export default editProfile
