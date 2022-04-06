import React from "react";
import { 
  CRow, 
} from '@coreui/react'
import NodePanel from "./NodePanel";

function ChainOverview(props) {
  const { chain, status } = props

  return (
    <CRow md={{ cols: 1, gutter: 4 }} lg={{ cols: 2 }}>
      <NodePanel title="APIs" chain={chain} apis={chain.apis} status={status} />
      <NodePanel title="Peers" chain={chain} peers={chain.peers} />
    </CRow>
  )
}

export default ChainOverview