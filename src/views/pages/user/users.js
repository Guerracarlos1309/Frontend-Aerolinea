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
import { helpFetch } from '../../../Api/helpFetch.js'

const api = helpFetch()

const Users = () => {
  const [visible, setVisible] = useState(false)
  const [users, setUsers] = useState([])
  const [userToEdit, setUserToEdit] = useState(null)
  const [editVisible, setEditVisible] = useState(false)
  const [busqueda, setBusqueda] = useState('')
  const [busquedaRol, setBusquedaRol] = useState('')
  const [selectedUser, setSelectedUser] = useState(null)
  const [nameFiltered, setNameFiltered] = useState([])

  useEffect(() => {
    setNameFiltered(
      users.filter((user) => user.gmail?.toLowerCase().includes(busqueda.toLowerCase())),
    )
  }, [users])

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    await api.get('/users').then(async (data) => {
      console.log(data.msg)

      if (!data.error) await setUsers(data.msg)
      console.log(users)
      console.log(data.msg)
    })
  }
  const deleteUser = async () => {
    if (!selectedUser) return

    await api.delet(`/users/`, selectedUser).then((response) => {
      if (!response.error) {
        setUsers(users.filter((user) => user.iduser !== selectedUser))
        setVisible(false)
      }
    })
  }

  const handleDelete = (iduser) => {
    setSelectedUser(iduser)
    setVisible(true)
  }

  const editUser = (e) => {
    e.preventDefault()
    setUsers(users.map((user) => (user.iduser === userToEdit.iduser ? userToEdit : user)))
    setEditVisible(false)
    console.log(`Usuario con ID ${userToEdit.iduser} actualizado`)
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
            <CTableHeaderCell scope="col">Firstname</CTableHeaderCell>
            <CTableHeaderCell scope="col">Lastname</CTableHeaderCell>
            <CTableHeaderCell scope="col">Email</CTableHeaderCell>
            <CTableHeaderCell scope="col">Phone Number</CTableHeaderCell>
            <CTableHeaderCell scope="col">status</CTableHeaderCell>
            <CTableHeaderCell scope="col">Edit</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {nameFiltered.length > 0 ? (
            nameFiltered.map((user) => (
              <CTableRow key={user.iduser}>
                <CTableHeaderCell scope="row">{user.iduser}</CTableHeaderCell>

                <CTableDataCell>{user.firstname}</CTableDataCell>
                <CTableDataCell>{user.lastname}</CTableDataCell>
                <CTableDataCell>{user.gmail}</CTableDataCell>
                <CTableDataCell>{user.phonenumber}</CTableDataCell>
                <CTableDataCell>{user.status}</CTableDataCell>

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

                  <CButton
                    color="danger"
                    size="sm"
                    onClick={() => {
                      handleDelete(user.iduser)
                    }}
                  >
                    {' '}
                    Delete
                  </CButton>
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
                value={userToEdit?.firstname || ''}
                onChange={(e) => setUserToEdit({ ...userToEdit, firstname: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <CFormInput
                type="email"
                id="email"
                label="Email"
                value={userToEdit?.gmail || ''}
                onChange={(e) => setUserToEdit({ ...userToEdit, gmail: e.target.value })}
              />
            </div>

            <div className="mb-3">
              <CFormInput
                type="tel"
                id="phoneNumber"
                label="Número de Teléfono"
                value={userToEdit?.phonenumber || ''}
                onChange={(e) => setUserToEdit({ ...userToEdit, phonenumber: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <CFormInput
                type="tel"
                id="address"
                label="address"
                value={userToEdit?.address || ''}
                onChange={(e) => setUserToEdit({ ...userToEdit, address: e.target.value })}
              />
            </div>

            <div className="mb-3">
              <CFormSelect
                id="role"
                label="Rol"
                value={userToEdit?.fk_role || ''}
                onChange={(e) => setUserToEdit({ ...userToEdit, fk_role: e.target.value })}
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
      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Delete user</CModalTitle>
        </CModalHeader>
        <CModalBody>Are you sure you want to delete this user?</CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Cancel
          </CButton>
          <CButton color="primary" onClick={deleteUser}>
            Delete
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  )
}

export default Users
