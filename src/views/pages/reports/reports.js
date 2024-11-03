import React from "react"

import {
    CButton,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
}from '@coreui/react'

import {
  useState
} from 'react'

const reports = () => {
    const [visible, setVisible] = useState(false)
return (
  <>
    <CButton color="primary" onClick={() => setVisible(!visible)}>Launch demo modal</CButton>
    <CModal
      visible={visible}
      onClose={() => setVisible(false)}
      aria-labelledby="LiveDemoExampleLabel"
    >
      <CModalHeader>
        <CModalTitle id="LiveDemoExampleLabel">Modal title</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <p>Woohoo, you're reading this text in a modal!</p>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => setVisible(false)}>
          Close
        </CButton>
        <CButton color="primary">Save changes</CButton>
      </CModalFooter>
    </CModal>
  </>
)
}

export default reports