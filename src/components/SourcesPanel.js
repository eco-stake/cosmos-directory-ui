import React from "react";
import { 
  CTooltip
} from '@coreui/react'
import Panel from "./Panel";
import DataTable from './DataTable'

function SourcesPanel(props) {
  const { chain } = props
  const data = [
    {
      key: 'chain-registry',
      label: <a href="https://github.com/cosmos/chain-registry" target="_blank" className="text-reset">Chain Registry</a>,
      value: (
        <>
          <a href={`https://chains.cosmos.directory/${chain.path}`} target="_blank">chains.cosmos.directory/{chain.path}</a><br />
          <a href={`https://chains.cosmos.directory/${chain.path}/chain`} target="_blank">chains.cosmos.directory/{chain.path}/chain</a><br />
          <a href={`https://chains.cosmos.directory/${chain.path}/assetlist`} target="_blank">chains.cosmos.directory/{chain.path}/assetlist</a><br />
        </>
      )
    },
    {
      key: 'validator-registry',
      label: <a href="https://github.com/eco-stake/validator-registry" target="_blank" className="text-reset">Validator Registry</a>,
      value: (
        <>
          <a href={`https://validators.cosmos.directory/chains/${chain.path}`} target="_blank">validators.cosmos.directory/chains/{chain.path}</a><br />
        </>
      )
    },
    {
      key: 'API Proxies',
      label: (
        <CTooltip content="Load balanced, health checked and minimal caching of the Chain Registry public APIs"><span className="tooltip-abbr">API Proxies</span></CTooltip>
      ),
      value: (
        <>
          <a href={`https://rpc.cosmos.directory/${chain.path}`} target="_blank">rpc.cosmos.directory/{chain.path}</a><br />
          <a href={`https://rest.cosmos.directory/${chain.path}`} target="_blank">rest.cosmos.directory/{chain.path}</a><br />
        </>
      )
    },
    {
      key: 'API Status',
      label: (
        <CTooltip content="Current status of the Chain Registry public APIs"><span className="tooltip-abbr">API Status</span></CTooltip>
      ),
      value: (
        <>
          <a href={`https://status.cosmos.directory/${chain.path}`} target="_blank">status.cosmos.directory/{chain.path}</a><br />
        </>
      )
    },
  ]
  return (
    <Panel key={'data-' + chain.chain_name} title="Data sources">
      <DataTable bodyClass="small" labelclass="d-none d-sm-table-cell" data={data} />
      <div className="text-end">
        <a href="https://github.com/eco-stake/cosmos-directory#api-documentation" target="_blank" className="btn btn-light">See API docs</a>
      </div>
    </Panel>
  )
}

export default SourcesPanel