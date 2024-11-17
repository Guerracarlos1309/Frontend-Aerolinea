import React, { useState, useEffect } from 'react'
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
  CForm,
  CFormSelect,
} from '@coreui/react'

const Users = () => {
  const [visible, setVisible] = useState(false)
  const [users, setUsers] = useState([])
  const [userDelete, setUserDelete] = useState(null)
  const [userToEdit, setUserToEdit] = useState(null)
  const [editVisible, setEditVisible] = useState(false)
  const [busqueda, setBusqueda] = useState('')
  const [busquedaRol, setBusquedaRol] = useState('')

  const nameFiltered = users.filter(
    (user) =>
      user.name &&
      user.name.toLowerCase().includes(busqueda.toLowerCase()) &&
      user.role.toLowerCase().includes(busquedaRol.toLowerCase()),
  )

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:3004/users')
      const data = await response.json()
      setUsers(data)
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }

  const deleteUser = async (id) => {
    try {
      await fetch(`http://localhost:3004/users/${id}`, {
        method: 'DELETE',
      })
      setUsers(users.filter((user) => user.id !== id))
      setVisible(false)
    } catch (error) {
      console.error('Error deleting user:', error)
    }
  }

  const editUser = (e) => {
    e.preventDefault()
    setUsers(users.map((user) => (user.id === userToEdit.id ? userToEdit : user)))
    setEditVisible(false)
    console.log(`Usuario con ID ${userToEdit.id} actualizado`)
  }

  return (
    <div className="p-4">
      <div className="flex mb-4" style={{ display: 'flex' }}>
        <CFormInput
          type="text"
          placeholder="Search for name..."
          className="w-full p-2 mb-3"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          style={{ width: 300, margin: 10 }}
        />
        <CFormInput
          type="text"
          placeholder="Search for role..."
          className="w-full p-2 mb-3 ml-4"
          value={busquedaRol}
          onChange={(e) => setBusquedaRol(e.target.value)}
          style={{ width: 300, margin: 10 }}
        />
      </div>
      <CTable>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Email</CTableHeaderCell>
            <CTableHeaderCell scope="col">Phone Number</CTableHeaderCell>
            <CTableHeaderCell scope="col">address</CTableHeaderCell>
            <CTableHeaderCell scope="col">Role</CTableHeaderCell>
            <CTableHeaderCell scope="col">Edit</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {nameFiltered.length > 0 ? (
            nameFiltered.map((user) => (
              <CTableRow key={user.id}>
                <CTableHeaderCell scope="row">{user.id}</CTableHeaderCell>
                <CTableDataCell>{user.name}</CTableDataCell>
                <CTableDataCell>{user.email}</CTableDataCell>
                <CTableDataCell>{user.phoneNumber}</CTableDataCell>
                <CTableDataCell>{user.address}</CTableDataCell>
                <CTableDataCell>{user.role}</CTableDataCell>
                <CTableDataCell>
                  <CButton
                    color="primary"
                    size="sm"
                    className="me-2"
                    onClick={() => {
                      setUserToEdit(user)
                      setEditVisible(true)
                    }}
                  >
                    Edit
                  </CButton>

                  <CModal visible={editVisible} onClose={() => setEditVisible(false)}>
                    <CModalHeader>
                      <CModalTitle>Editar usuario</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                      <CForm onSubmit={editUser}>
                        <div className="mb-3">
                          <CFormInput
                            type="text"
                            id="name"
                            label="Nombre"
                            value={userToEdit?.name || ''}
                            onChange={(e) => setUserToEdit({ ...userToEdit, name: e.target.value })}
                          />
                        </div>
                        <div className="mb-3">
                          <CFormInput
                            type="email"
                            id="email"
                            label="Email"
                            value={userToEdit?.email || ''}
                            onChange={(e) =>
                              setUserToEdit({ ...userToEdit, email: e.target.value })
                            }
                          />
                        </div>

                        <div className="mb-3">
                          <CFormInput
                            type="tel"
                            id="phoneNumber"
                            label="Número de Teléfono"
                            value={userToEdit?.phoneNumber || ''}
                            onChange={(e) =>
                              setUserToEdit({ ...userToEdit, phoneNumber: e.target.value })
                            }
                          />
                        </div>
                        <div className="mb-3">
                          <CFormInput
                            type="tel"
                            id="address"
                            label="address"
                            value={userToEdit?.address || ''}
                            onChange={(e) =>
                              setUserToEdit({ ...userToEdit, address: e.target.value })
                            }
                          />
                        </div>

                        <div className="mb-3">
                          <CFormSelect
                            id="role"
                            label="Rol"
                            value={userToEdit?.role || ''}
                            onChange={(e) => setUserToEdit({ ...userToEdit, role: e.target.value })}
                            options={[
                              'Selecciona un rol',
                              { label: 'Admin', value: 'Admin' },
                              { label: 'User', value: 'User' },
                              { label: 'Guest', value: 'Guest' },
                            ]}
                          />
                        </div>
                        <CButton style={{ marginLeft: 160 }} type="submit" color="primary">
                          Guardar cambios
                        </CButton>
                      </CForm>
                    </CModalBody>
                  </CModal>
                  <CButton
                    color="danger"
                    size="sm"
                    onClick={() => {
                      setUserDelete(user.id)
                      setVisible(true)
                    }}
                  >
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
                        <CButton color="primary" onClick={() => deleteUser(userDelete)}>
                          Delete
                        </CButton>
                      </CModalFooter>
                    </CModal>
                  )}
                </CTableDataCell>
              </CTableRow>
            ))
          ) : (
            <CTableRow>
              <CTableDataCell colSpan="7">No se encontraron resultados</CTableDataCell>
            </CTableRow>
          )}
        </CTableBody>
      </CTable>
    </div>
  )
}

export default Users
