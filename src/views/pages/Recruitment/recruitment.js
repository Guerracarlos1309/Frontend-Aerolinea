import React from "react";

import {
    CForm,
    CCol,
    CFormInput,
    CFormLabel,
    CInputGroupText,
    CInputGroup,
    CFormSelect,
    CButton,

} from '@coreui/react'

const recruitment = () => {
    return(

    <CForm className="row g-3">
  <CCol md={4}>
    <CFormInput
      type="text"
      id="validationDefault01"
      label="First name"
      required
    />
  </CCol>
  <CCol md={4}>
    <CFormInput
      type="text"
      id="validationDefault02"
      label="Last name"
      required
    />
  </CCol>
  <CCol md={4}>
    <CFormLabel htmlFor="validationDefaultUsername">Username</CFormLabel>
    <CInputGroup>
      <CInputGroupText id="inputGroupPrepend02">@</CInputGroupText>
      <CFormInput
        type="text"
        id="validationDefaultUsername"
        defaultValue=""
        aria-describedby="inputGroupPrepend02"
        required
      />
    </CInputGroup>
  </CCol>

  

  <CCol md={4}>
    <CFormInput
      type="text"
      id="validationDefault01"
      label="Phone Number"
      required
    />
  </CCol>

  <CCol md={4}>
    <CFormInput
      type="text"
      id="validationDefault01"
      label="Address"
      required
    />
  </CCol>
  <CCol md={3}>
    <CFormSelect id="validationDefault04" label="Speciality">
      <option enabled>Choose...</option>
      <option>Pilot</option>
      <option>Copilot</option>
      <option>azafata</option>
      
    </CFormSelect>
  </CCol>

  
  
  <CCol md={3}>
    <CFormSelect id="validationDefault04" label="Country">
      <option enabled>Choose...</option>
      <option>San cristobal</option>
      <option>cordero</option>
      <option>cordero</option>
      <option>cordero</option>
      <option>cordero</option>
    </CFormSelect>
  </CCol>
  <CCol md={3}>
    <CFormSelect id="validationDefault04" label="State">
      <option enabled>Choose...</option>
      <option>San cristobal</option>
      <option>cordero</option>
      <option>cordero</option>
      <option>cordero</option>
      <option>cordero</option>
    </CFormSelect>
  </CCol>
  
  
  <CCol xs={12}>
    <CButton color="primary" type="submit">
      Save Changes
    </CButton>
  </CCol>
</CForm>
)
}

export default recruitment;