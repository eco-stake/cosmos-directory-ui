import axios from 'axios'

function CosmosDirectory(){
  const directoryProtocol = process.env.DIRECTORY_PROTOCOL || 'https'
  const directoryDomain = process.env.DIRECTORY_DOMAIN || 'cosmos.directory'
  const rpcBase = `${directoryProtocol}://rpc.${directoryDomain}`
  const restBase = `${directoryProtocol}://rest.${directoryDomain}`
  const chainsUrl = `${directoryProtocol}://chains.${directoryDomain}`
  const validatorsUrl = `${directoryProtocol}://validators.${directoryDomain}`
  const statusUrl = `${directoryProtocol}://status.${directoryDomain}`

  function rpcUrl(name){
    return rpcBase + '/' + name
  }

  function restUrl(name){
    return restBase + '/' + name
  }

  function getStatus(){
    return axios.get(statusUrl)
      .then(res => res.data)
  }

  function getChains(){
    return axios.get(chainsUrl)
      .then(res => res.data)
  }

  function getChainStatus(name){
    return axios.get(statusUrl + '/' + name)
      .then(res => res.data)
  }

  function getChainData(name) {
    return axios.get([chainsUrl, name, 'chain'].join('/'))
      .then(res => res.data)
  }

  async function getAssetData(name) {
    return axios.get([chainsUrl, name, 'assetlist'].join('/'))
      .then(res => res.data)
  }

  function getValidators(){
    return axios.get(validatorsUrl)
      .then(res => res.data)
  }

  return {
    rpcUrl,
    restUrl,
    chainsUrl,
    getStatus,
    getChains,
    getChainStatus,
    getChainData,
    getAssetData,
    getValidators
  }
}

export default CosmosDirectory