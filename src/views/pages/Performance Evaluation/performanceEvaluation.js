import React from 'react'

import { CButton, CButtonGroup } from '@coreui/react'

const performanceEvaluation = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <CButtonGroup role="group" aria-label="Basic example">
        <CButton color="primary" style={{ margin: 1 }}>
          Left
        </CButton>
        <CButton color="primary" style={{ margin: 1 }}>
          Middle
        </CButton>
        <CButton color="primary" style={{ margin: 1 }}>
          Right
        </CButton>
      </CButtonGroup>
    </div>
  )
}

export default performanceEvaluation
