import React from "react";
import { 
  CRow, 
} from '@coreui/react'
import ValidatorsPanel from "./ValidatorsPanel";

function ChainValidators(props) {
  const { chain, validators } = props

  return (
    <CRow md={{ cols: 1, gutter: 4 }} lg={{ cols: 1 }}>
      <ValidatorsPanel chain={chain} validators={validators} />
    </CRow>
  )
}

export default React.memo(ChainValidators)