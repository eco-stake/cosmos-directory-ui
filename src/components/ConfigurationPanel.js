import React, { Fragment } from 'react'
import Panel from "./Panel";
import DataTable from './DataTable'

function ConfigurationPanel(props) {
  const { chain, status } = props

  const data = [
    {
      key: 'Chain ID',
      value: chain.chain_id
    },
    {
      key: 'Height',
      value: status.height
    },
  ]

  if(chain.bech32_prefix) data.push({
    key: 'Bech32 Prefix',
    value: chain.bech32_prefix
  })

  if(chain.slip44) data.push({
    key: 'Slip44',
    value: chain.slip44
  })

  if(chain.key_algos) data.push({
    key: 'Key Algorithms',
    value: chain.key_algos.join(', ')
  })

  if(chain.fees?.fee_tokens) data.push({
    key: 'Fee Tokens',
    value: chain.fees.fee_tokens.map(el => el.denom).join(', ')
  })

  if(chain.codebase?.git_repo){
    const url = chain.codebase?.git_repo
    data.push({
      key: 'Git Repository',
      value: <a href={url} target="_blank">{url}</a>
    })
  }

  if(chain.codebase?.recommended_version) data.push({
    key: 'Version',
    value: chain.codebase.recommended_version
  })

  if(chain.codebase?.compatible_versions) data.push({
    key: 'Compatible Versions',
    value: chain.codebase.compatible_versions.join(', ')
  })

  const daemon_name = chain.codebase?.daemon_name || chain.daemon_name
  if(daemon_name) data.push({
    key: 'Daemon Name',
    value: daemon_name
  })

  const node_home = chain.codebase?.node_home || chain.node_home
  if(node_home) data.push({
    key: 'Node Home',
    value: node_home
  })

  const genesis_url = chain.codebase?.genesis?.genesis_url || chain.genesis?.genesis_url
  if(genesis_url){
    data.push({
      key: 'Genesis URL',
      value: <a href={genesis_url} target="_blank">{genesis_url}</a>
    })
  }
    })
  }

  if (chain.explorers) {
    data.push({
      key: 'Explorers',
      value: chain.explorers.map(explorer => {
        return (
          <Fragment key={explorer.url}>
            <a href={explorer.url} key={explorer.url} target="_blank">{explorer.url}</a><br />
          </Fragment>
        )
      })
    })
  }

  return (
    <Panel title="Configuration">
      <DataTable bodyClass="small" valueclass="text-break" data={data} />
    </Panel>
  )
}

export default ConfigurationPanel