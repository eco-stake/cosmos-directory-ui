import { useEffect, useState } from "react";

import { useParams, useNavigate } from "react-router-dom";

import CosmosDirectory from "./CosmosDirectory";

import AppSidebar from "./components/AppSidebar";
import AppHeader from "./components/AppHeader";
import ChainList from "./components/ChainList";
import AppFooter from "./components/AppFooter";

import './scss/style.scss'
import Chain from "./components/Chain";

import { CSpinner } from '@coreui/react'

export function App() {
  const params = useParams()
  const navigate = useNavigate()
  const [chains, setChains] = useState()
  const [chain, setChain] = useState()
  const [status, setStatus] = useState()
  const [activeSection, setActiveSection] = useState(params.section)
  const [showCommands, setShowCommands] = useState(false)

  const directory = CosmosDirectory()

  const SECTIONS = [
    'overview',
    'chain',
    'validators',
    'nodes'
  ]

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
    }
  })

  useEffect(() => {
    if(chain){
      if (!activeSection || !SECTIONS.includes(activeSection)){
        setSection('overview')
      }
      if(activeSection !== 'overview' && params.section !== activeSection){
        setActiveSection('overview')
      }
    }
  })

  function setSection(section){
    if(section !== activeSection){
      setActiveSection(section)
      if(section !== 'overview'){
        navigate(`/${chain.path}/${section}`)
      }else{
        navigate(`/${chain.path}`)
      }
    }
  }

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
        <AppHeader chains={chains} chain={chain} chainRepository={chains.repository}
          activeSection={activeSection} setSection={setSection} 
          showCommands={showCommands} setShowCommands={setShowCommands} />
        <div className="body flex-grow-1 px-3">
          {chain
            ? (
              <Chain chainPath={chain.path} directory={directory} activeSection={activeSection} />
            ) : (
              <ChainList chains={chainsByPath()} status={status} />
            )}
        </div>
        <AppFooter />
      </div>
    </div>
  ); 
} 
