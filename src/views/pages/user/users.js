/*import React from 'react'
import {
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CFormInput,
} from '@coreui/react'

import { useState } from 'react'

const users = () => {
  const [visible, setVisible] = useState(false)

  return (
    <div className="p-4" style={{ backgroundColor: null }}>
      <div style={{ display: 'flex' }}>
        <CFormInput type="text" placeholder="Search for name..." className="mb-3" />
        <CFormInput
          style={{ marginLeft: 15 }}
          type="text"
          placeholder="search for Role..."
          className="mb-3"
        />
      </div>
      <CTable>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Email</CTableHeaderCell>
            <CTableHeaderCell scope="col">Phone Number</CTableHeaderCell>
            <CTableHeaderCell scope="col">Role</CTableHeaderCell>
            <CTableHeaderCell scope="col">edit</CTableHeaderCell>
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
              <CButton color="danger" size="sm" onClick={() => setVisible(!visible)}>
                Delete
              </CButton>
              <CModal
                visible={visible}
                onClose={() => setVisible(false)}
                aria-labelledby="LiveDemoExampleLabel"
              >
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
                  <CButton color="primary" onClick={() => setVisible(false)}>
                    Delete
                  </CButton>
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
              <CButton color="danger" size="sm" onClick={() => setVisible(!visible)}>
                Delete
              </CButton>
              <CModal
                visible={visible}
                onClose={() => setVisible(false)}
                aria-labelledby="LiveDemoExampleLabel"
              >
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
                  <CButton color="primary" onClick={() => setVisible(false)}>
                    Delete
                  </CButton>
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
              <CButton color="danger" size="sm" onClick={() => setVisible(!visible)}>
                Delete
              </CButton>
              <CModal
                visible={visible}
                onClose={() => setVisible(false)}
                aria-labelledby="LiveDemoExampleLabel"
              >
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
                  <CButton color="primary" onClick={() => setVisible(false)}>
                    Delete
                  </CButton>
                </CModalFooter>
              </CModal>
            </CTableDataCell>
          </CTableRow>
        </CTableBody>
      </CTable>
    </div>
  )
}

export default users*/

import React, { useState } from 'react'
import {
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CFormInput,
} from '@coreui/react'

const Users = () => {
  const [visible, setVisible] = useState(false)
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Carlos Guerra',
      email: 'guerracarlos1309@gmail.com',
      phoneNumber: '4247842726',
      role: 'Admin',
    },
    {
      id: 2,
      name: 'Juan Hurtado',
      email: 'Juan@gmail.com',
      phoneNumber: '4247842726',
      role: 'Admin',
    },
    {
      id: 3,
      name: 'Rossy Chacon',
      email: 'rossychacon30@gmail.com',
      phoneNumber: '4247370080',
      role: 'Admin',
    },
  ])

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id))
    setVisible(false)
  }

  return (
    <div className="p-4">
      <div className="flex mb-4">
        <CFormInput type="text" placeholder="Search for name..." className="w-full p-2 mb-3" />
        <CFormInput type="text" placeholder="Search for role..." className="w-full p-2 mb-3 ml-4" />
      </div>
      <CTable>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Email</CTableHeaderCell>
            <CTableHeaderCell scope="col">Phone Number</CTableHeaderCell>
            <CTableHeaderCell scope="col">Role</CTableHeaderCell>
            <CTableHeaderCell scope="col">Edit</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {users.map((user) => (
            <CTableRow key={user.id}>
              <CTableHeaderCell scope="row">{user.id}</CTableHeaderCell>
              <CTableDataCell>{user.name}</CTableDataCell>
              <CTableDataCell>{user.email}</CTableDataCell>
              <CTableDataCell>{user.phoneNumber}</CTableDataCell>
              <CTableDataCell>{user.role}</CTableDataCell>
              <CTableDataCell>
                <CButton color="primary" size="sm" className="me-2">
                  {' '}
                  Edit
                </CButton>
                <CButton color="danger" size="sm" onClick={() => setVisible(true)}>
                  {' '}
                  Delete
                </CButton>
                {visible && (
                  <CModal visible={visible} onClose={() => setVisible(false)}>
                    <CModalHeader>
                      <CModalTitle>Delete user</CModalTitle>
                    </CModalHeader>
                    <CModalBody>Are you sure you want to delete this user?</CModalBody>
                    <CModalFooter>
                      <CButton color="secondary" onClick={() => setVisible(false)}>
                        Cancel
                      </CButton>
                      <CButton color="primary" onClick={() => handleDelete(user.id)}>
                        Delete
                      </CButton>
                    </CModalFooter>
                  </CModal>
                )}
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </div>
  )
}

export default Users
