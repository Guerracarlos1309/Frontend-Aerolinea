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

const reports = () => {
  const [visible, setVisible] = useState(false)
  const [reports, setReports] = useState([
    { id: 1, name: 'Reporte de Ventas', date: '2023-01-01', status: 'Generado' },
    { id: 2, name: 'Reporte de Compras', date: '2023-01-15', status: 'Generado' },
    { id: 3, name: 'Reporte de Inventario', date: '2023-02-01', status: 'Generado' },
  ])

  const handleDelete = (id) => {
    setReports(reports.filter((report) => report.id !== id))
    setVisible(false)
  }

  return (
    <div className="p-4">
      <div className="flex mb-4" style={{ display: 'flex' }}>
        <CFormInput
          style={{ marginRight: 20, width: 350 }}
          type="text"
          placeholder="Search for report..."
          className="w-full p-2 mb-3"
        />
        <CFormInput
          style={{ width: 350 }}
          type="date"
          placeholder="Search for date..."
          className="w-full p-2 mb-3 ml-4"
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
          {reports.map((report) => (
            <CTableRow key={report.id}>
              <CTableHeaderCell scope="row">{report.id}</CTableHeaderCell>
              <CTableDataCell>{report.name}</CTableDataCell>
              <CTableDataCell>{report.date}</CTableDataCell>
              <CTableDataCell>{report.status}</CTableDataCell>
              <CTableDataCell>
                <CButton color="primary" size="sm" className="me-2">
                  edit
                </CButton>
                <CButton color="success" size="sm" className="me-2">
                  descargar
                </CButton>
                <CButton color="danger" size="sm" onClick={() => setVisible(true)}>
                  eliminar
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
