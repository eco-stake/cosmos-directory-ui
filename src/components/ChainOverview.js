import React from "react";
import { 
  CRow, 
} from '@coreui/react'
import OverviewPanel from "./OverviewPanel";
import SourcesPanel from "./SourcesPanel";
import NodePanel from "./NodePanel";
import ValidatorsPanel from "./ValidatorsPanel";

function ChainOverview(props) {
  const { chain, assetlist, validators, status } = props

  return (
    <CRow xs={{ cols: 1, gutter: 4 }} xl={{ cols: 2 }}>
      <OverviewPanel chain={chain} assetlist={assetlist} status={status} />
      <SourcesPanel chain={chain} />
      <ValidatorsPanel chain={chain} validators={validators} limit={10} />
      <NodePanel chain={chain} apis={chain.apis} peers={chain.peers} status={status} limit={3} />
    </CRow>
  )
}

export default ChainOverview