import React from "react";
import { 
  CRow, 
} from '@coreui/react'
import OverviewPanel from "./OverviewPanel";
import ConfigurationPanel from './ConfigurationPanel';
import AssetsPanel from "./AssetsPanel";

function ChainDetails(props) {
  const { chain, assetlist, status } = props

  return (
    <CRow md={{ cols: 1, gutter: 4 }} lg={{ cols: 2 }}>
      <ConfigurationPanel chain={chain} />
      <AssetsPanel chain={chain} assetlist={assetlist} />
    </CRow>
  )
}

export default React.memo(ChainDetails)