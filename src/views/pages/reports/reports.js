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

const reports = () => {
  const [visible, setVisible] = useState(false)
  const [reports, setReports] = useState([])
  const [editingReport, setEditingReport] = useState(null)
  const [deletingReportId, setDeletingReportId] = useState(null)
  const [busqueda, setBusqueda] = useState('')

  const nameFiltered = reports.filter(
    (report) => report.name && report.name.toLowerCase().includes(busqueda.toLowerCase()),
  )

  useEffect(() => {
    fetchReports()
  }, [])

  const fetchReports = async () => {
    try {
      const response = await fetch('http://localhost:3004/reports')
      const data = await response.json()
      setReports(data)
    } catch (error) {
      console.error('Error al obtener los reportes:', error)
    }
  }

  const handleEdit = (report) => {
    setEditingReport(report)
    setVisible(true)
  }

  const handleDelete = (id) => {
    setDeletingReportId(id)
    setVisible(true)
  }

  const confirmDelete = async () => {
    try {
      await fetch(`http://localhost:3004/reports/${deletingReportId}`, {
        method: 'DELETE',
      })
      setReports(reports.filter((report) => report.id !== deletingReportId))
      setVisible(false)
      setDeletingReportId(null)
    } catch (error) {
      console.error('Error al eliminar el reporte:', error)
    }
  }

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:3004/reports/${editingReport.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingReport),
      })
      const updatedReport = await response.json()
      setReports(reports.map((report) => (report.id === updatedReport.id ? updatedReport : report)))
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
          className="w-full p-2 mb-3"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>
      <CTable>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Date</CTableHeaderCell>
            <CTableHeaderCell scope="col">Status</CTableHeaderCell>
            <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {nameFiltered.map((report) => (
            <CTableRow key={report.id}>
              <CTableHeaderCell scope="row">{report.id}</CTableHeaderCell>
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
                  edit
                </CButton>

                <CModal visible={visible} onClose={() => setVisible(false)}>
                  <CModalHeader>
                    <CModalTitle>{editingReport ? 'EDIT REPORT' : 'DELETE REPORT'}</CModalTitle>
                  </CModalHeader>
                  <CModalBody>
                    {editingReport ? (
                      <>
                        <CFormInput
                          type="text"
                          value={editingReport.name}
                          onChange={(e) =>
                            setEditingReport({ ...editingReport, name: e.target.value })
                          }
                          label="NAME"
                          className="mb-3"
                        />
                        <CFormInput
                          type="date"
                          value={editingReport.date}
                          onChange={(e) =>
                            setEditingReport({ ...editingReport, date: e.target.value })
                          }
                          label="DATE"
                          className="mb-3"
                        />
                        <CFormInput
                          type="text"
                          value={editingReport.status}
                          onChange={(e) =>
                            setEditingReport({ ...editingReport, status: e.target.value })
                          }
                          label="STATUS"
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
                    <CButton color="primary" onClick={editingReport ? handleSave : confirmDelete}>
                      {editingReport ? 'Save' : 'Delete'}
                    </CButton>
                  </CModalFooter>
                </CModal>
                <CButton color="success" size="sm" className="me-2">
                  Download
                </CButton>
                <CButton color="danger" size="sm" onClick={() => handleDelete(report.id)}>
                  Delete
                </CButton>
                {visible && (
                  <CModal visible={visible} onClose={() => setVisible(false)}>
                    <CModalHeader>
                      <CModalTitle>Delete report</CModalTitle>
                    </CModalHeader>
                    <CModalBody>Are you sure you want to delete this report?</CModalBody>
                    <CModalFooter>
                      <CButton color="secondary" onClick={() => setVisible(false)}>
                        Cancel
                      </CButton>
                      <CButton color="primary" onClick={() => handleDelete(report.id)}>
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

export default reports
