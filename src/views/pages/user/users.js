import React from "react";
import  { useState } from 'react'
import {
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CFormInput,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
} from '@coreui/react';

 const users = () => {

  const [visible, setVisible] = useState(false)

 

  return (

    <div className="p-4" style={{backgroundColor: null}}>
      <CFormInput
        type="text"
        placeholder="Search for name..."
       
        className="mb-3"
      />

<CFormInput
        type="text"
        placeholder="search for Role..."

        className="mb-3"
      />
    <CTable>
  <CTableHead>
    <CTableRow>
      <CTableHeaderCell scope="col">#</CTableHeaderCell>
      <CTableHeaderCell scope="col">Name</CTableHeaderCell>
      <CTableHeaderCell scope="col">Email</CTableHeaderCell>
      <CTableHeaderCell scope="col">Phone Number</CTableHeaderCell>
      <CTableHeaderCell scope="col">Role</CTableHeaderCell>
      <CTableHeaderCell scope="col" >edit</CTableHeaderCell>
    </CTableRow>
  </CTableHead>
  <CTableBody>
    <CTableRow>
      <CTableHeaderCell scope="row">1</CTableHeaderCell>
      <CTableDataCell>Carlos Guerra</CTableDataCell>
      <CTableDataCell>guerracarlos1309@gmail.com</CTableDataCell>
      <CTableDataCell>4247842726</CTableDataCell>
      <CTableDataCell>Admin</CTableDataCell>
      <CTableDataCell>
      <CButton color="primary" size="sm" className="me-2">
                Edit
              </CButton>
              <CButton color="danger" size="sm" onClick={() => setVisible(!visible)}>Delete</CButton>
              <CModal visible={visible} onClose={() => setVisible(false)} aria-labelledby="LiveDemoExampleLabel">
                <CModalHeader>
                  <CModalTitle id="LiveDemoExampleLabel">Do you want to delete?</CModalTitle>
                </CModalHeader>
                <CModalBody>
                  <p>Changes cannot be undone. Do you want to delete?</p>
                </CModalBody>
                <CModalFooter>
                  <CButton color="secondary" onClick={() => setVisible(false)}>
                      Close
                 </CButton>
                <CButton color="primary">Delete</CButton>
                </CModalFooter>
                 </CModal>
      </CTableDataCell>
     
    </CTableRow>
    <CTableRow>
      <CTableHeaderCell scope="row">2</CTableHeaderCell>
      <CTableDataCell>Juan Hurtado</CTableDataCell>
      <CTableDataCell>Juan@gmail.com</CTableDataCell>
      <CTableDataCell>4247842726</CTableDataCell>
      <CTableDataCell>Admin</CTableDataCell>
      <CTableDataCell>
      <CButton color="primary" size="sm" className="me-2">
                Edit
              </CButton>
              <CButton color="danger" size="sm" onClick={() => setVisible(!visible)}>Delete</CButton>
              <CModal visible={visible} onClose={() => setVisible(false)} aria-labelledby="LiveDemoExampleLabel">
                <CModalHeader>
                  <CModalTitle id="LiveDemoExampleLabel">Do you want to delete?</CModalTitle>
                </CModalHeader>
                <CModalBody>
                  <p>Changes cannot be undone. Do you want to delete?</p>
                </CModalBody>
                <CModalFooter>
                  <CButton color="secondary" onClick={() => setVisible(false)}>
                      Close
                 </CButton>
                <CButton color="primary">Delete</CButton>
                </CModalFooter>
                 </CModal>
              
      </CTableDataCell>
    </CTableRow>
    <CTableRow>
      <CTableHeaderCell scope="row">3</CTableHeaderCell>
      <CTableDataCell>Rossy Chacon</CTableDataCell>
      <CTableDataCell>rossychacon30@gmail.com</CTableDataCell>
      <CTableDataCell>4247370080</CTableDataCell>
      <CTableDataCell>Admin</CTableDataCell>
      <CTableDataCell>
        <CButton color="primary" size="sm" className="me-2">
          Edit
        </CButton>
        <CButton color="danger" size="sm" onClick={() => setVisible(!visible)}>Delete</CButton>
              <CModal visible={visible} onClose={() => setVisible(false)} aria-labelledby="LiveDemoExampleLabel">
                <CModalHeader>
                  <CModalTitle id="LiveDemoExampleLabel">Do you want to delete?</CModalTitle>
                </CModalHeader>
                <CModalBody>
                  <p>Changes cannot be undone. Do you want to delete?</p>
                </CModalBody>
                <CModalFooter>
                  <CButton color="secondary" onClick={() => setVisible(false)}>
                      Close
                 </CButton>
                <CButton color="primary">Delete</CButton>
                </CModalFooter>
                 </CModal>
        
      </CTableDataCell>
              
    </CTableRow>
  </CTableBody>
</CTable>

</div>
  )
   
}

export default users;