import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import CosmosDirectory from "./CosmosDirectory";

import AppSidebar from "./components/AppSidebar";
import AppHeader from "./components/AppHeader";
import ChainList from "./components/ChainList";
import AppFooter from "./components/AppFooter";

import './scss/style.scss'
import Chain from "./components/Chain";

import { CSpinner } from '@coreui/react'

export function App() {
  const [chains, setChains] = useState()
  const [chain, setChain] = useState()
  const [status, setStatus] = useState()
  const [activeKey, setActiveKey] = useState()
  const params = useParams()

  const directory = CosmosDirectory()

  useEffect(() => {
    if(!chains){
      directory.getChains()
        .then(chains => {
          setChains(chains)
        })
    }
  });

  useEffect(() => {
    if(!status){
      directory.getStatus()
        .then(data => data.chains)
        .then(data => data.reduce((a, v) => ({ ...a, [v.name]: v }), {}))
        .then(status => {
          setStatus(status)
        })
    }
  });

  useEffect(() => {
    if(chains && params.chain !== chain?.path){
      let chain
      if (params.chain) chain = chainsByPath()[params.chain]
      setChain(chain)
      setActiveKey('overview')
    }
  })

  function chainsByPath(){
    if(!chains) return {}

    return chains.chains.reduce((a, v) => ({ ...a, [v.path]: v }), {})
  }

  if(!chains || !status){
    return (
      <div className="pt-3 text-center">
        <CSpinner />
      </div>
    )
  }

  return (
    <div>
      <AppSidebar chains={chainsByPath()} chain={chain} />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader chain={chain} chainRepository={chains.repository} activeKey={activeKey} setActiveKey={setActiveKey} />
        <div className="body flex-grow-1 px-3">
          {chain
            ? (
              <Chain chainPath={chain.path} directory={directory} activeKey={activeKey} />
            ) : (
              <ChainList chains={chainsByPath()} status={status} />
            )}
        </div>
        <AppFooter />
      </div>
    </div>
  ); 
} 
