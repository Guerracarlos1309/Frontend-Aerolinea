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
} from '@coreui/react'
import { helpFetch } from '../../../Api/helpFetch.js'

const api = helpFetch()

const Reports = () => {
  const [visible, setVisible] = useState(false)
  const [reports, setReports] = useState([])
  const [editingReport, setEditingReport] = useState(null)
  const [deletingReportId, setDeletingReportId] = useState(null)
  const [busqueda, setBusqueda] = useState('')
  const [modalType, setModalType] = useState(null)
  const [selectedReport, setSelectedReport] = useState(null)

  useEffect(() => {
    fetchReports()
  }, [])

  const fetchReports = () => {
    api.get('/reports').then((data) => {
      if (!data.error && Array.isArray(data.msg)) {
        setReports(data)
      }
    })
  }

  const handleEdit = (report) => {
    setEditingReport(report)
    setModalType('edit')
    setVisible(true)
  }

  const handleDelete = (id) => {
    setSelectedReport(id)
    setVisible(true)
  }

  const confirmDelete = () => {
    api.delet('/reports', selectedReport).then((response) => {
      if (!response.error) {
        fetchReports()
        setReports((prevReports) => prevReports.filter((report) => report.id !== deletingReportId))
        setVisible(false)
        setDeletingReportId(null)
        setSelectedReport(null)
      }
    })
  }

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:7500/reports/${editingReport.id}`, {
        method: 'PUT',
        body: JSON.stringify(editingReport),
      })
      const updatedReport = await response.json()
      setReports((prevReports) =>
        prevReports.map((report) => (report.id === updatedReport.id ? updatedReport : report)),
      )
      setVisible(false)
      setEditingReport(null)
    } catch (error) {
      console.error('Error al actualizar el reporte:', error)
    }
  }

  return (
    <div className="p-4">
      <div className="flex mb-4" style={{ display: 'flex' }}>
        <CFormInput
          style={{ marginRight: 20, width: 350 }}
          type="text"
          placeholder="Search for report..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>
      <CTable>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>#</CTableHeaderCell>
            <CTableHeaderCell>Name</CTableHeaderCell>
            <CTableHeaderCell>Date</CTableHeaderCell>
            <CTableHeaderCell>Status</CTableHeaderCell>
            <CTableHeaderCell>Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {reports
            .filter((report) => report.name?.toLowerCase().includes(busqueda.toLowerCase()))
            .map((report) => (
              <CTableRow key={report.id}>
                <CTableHeaderCell>{report.id}</CTableHeaderCell>
                <CTableDataCell>{report.name}</CTableDataCell>
                <CTableDataCell>{report.date}</CTableDataCell>
                <CTableDataCell>{report.status}</CTableDataCell>
                <CTableDataCell>
                  <CButton
                    color="primary"
                    size="sm"
                    className="me-2"
                    onClick={() => handleEdit(report)}
                  >
                    Edit
                  </CButton>
                  <CButton color="danger" size="sm" onClick={() => handleDelete(report.id)}>
                    Delete
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            ))}
        </CTableBody>
      </CTable>

      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>{modalType === 'edit' ? 'Edit Report' : 'Delete Report'}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {modalType === 'edit' && editingReport ? (
            <>
              <CFormInput
                type="text"
                value={editingReport.name}
                onChange={(e) => setEditingReport({ ...editingReport, name: e.target.value })}
                label="Name"
                className="mb-3"
              />
              <CFormInput
                type="date"
                value={editingReport.date}
                onChange={(e) => setEditingReport({ ...editingReport, date: e.target.value })}
                label="Date"
                className="mb-3"
              />
              <CFormInput
                type="text"
                value={editingReport.status}
                onChange={(e) => setEditingReport({ ...editingReport, status: e.target.value })}
                label="Status"
                className="mb-3"
              />
            </>
          ) : (
            'Are you sure you want to delete this report?'
          )}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Cancel
          </CButton>
          <CButton color="primary" onClick={modalType === 'edit' ? handleSave : confirmDelete}>
            {modalType === 'edit' ? 'Save' : 'Delete'}
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  )
}

export default Reports
