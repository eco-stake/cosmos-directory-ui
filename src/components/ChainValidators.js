import React from "react";
import { 
  CRow, 
} from '@coreui/react'
import ValidatorsPanel from "./ValidatorsPanel";

function ChainValidators(props) {
  const { chain, validators } = props

  return (
    <CRow xs={{ cols: 1, gutter: 4 }} xl={{ cols: 1 }}>
      <ValidatorsPanel chain={chain} validators={validators} />
    </CRow>
  )
}

export default ChainValidators