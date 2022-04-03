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
      value: (
        <>
          <a href={`https://rpc.cosmos.directory/${chain.path}`} target="_blank">rpc.cosmos.directory/{chain.path}</a><br />
          <a href={`https://rest.cosmos.directory/${chain.path}`} target="_blank">rest.cosmos.directory/{chain.path}</a><br />
        </>
      )
    },
    {
      key: 'API Status',
      value: (
        <>
          <a href={`https://status.cosmos.directory/${chain.path}`} target="_blank">status.cosmos.directory/{chain.path}</a><br />
        </>
      )
    },
  ]
  return (
    <Panel key={'data-' + chain.chain_name} title="Data sources">
      <DataTable bodyClass="small" data={data} />
    </Panel>
  )
}

export default SourcesPanel