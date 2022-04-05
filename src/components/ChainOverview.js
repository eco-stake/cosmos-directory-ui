import React from "react";
import { 
  CRow, 
} from '@coreui/react'
import OverviewPanel from "./OverviewPanel";
import SourcesPanel from "./SourcesPanel";
import NodePanel from "./NodePanel";
import ConfigurationPanel from './ConfigurationPanel';
import AssetsPanel from "./AssetsPanel";

function ChainOverview(props) {
  const { chain, assetlist, status } = props

  return (
    <CRow md={{ cols: 1, gutter: 4 }} lg={{ cols: 2 }}>
      <OverviewPanel chain={chain} assetlist={assetlist} status={status} />
      <SourcesPanel chain={chain} />
      <NodePanel title="Nodes" chain={chain} apis={chain.apis} peers={chain.peers} status={status} />
      <ConfigurationPanel chain={chain} />
      <AssetsPanel chain={chain} assetlist={assetlist} />
    </CRow>
  )
}

export default React.memo(ChainOverview)