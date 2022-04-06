import React, { useEffect, useState } from "react";
import { 
  CContainer, 
  CSpinner,
  CTabPane,
  CTabContent
} from '@coreui/react'
import ChainOverview from "./ChainOverview";
import ChainDetails from "./ChainDetails";
import ChainValidators from "./ChainValidators";
import ChainNodes from "./ChainNodes";

function Chain(props) {
  const { chainPath, directory, activeSection } = props
  const [chain, setChain] = useState()
  const [assetlist, setAssetlist] = useState()
  const [validators, setValidators] = useState()
  const [status, setStatus] = useState()

  function getChainData() {
    directory.getChainData(chainPath).then(chain => {
      setChain(chain);
    });
  }

  function getChainAssetlist() {
    directory.getChainAssetlist(chainPath).then(assetlist => {
      setAssetlist(assetlist);
    }).catch(error => setAssetlist({}));
  }

  function getChainValidators() {
    directory.getChainValidators(chainPath)
      .then(data => data.validators)
      .then(newValidators => {
        setValidators((validators) => {
          if (validators) {
            newValidators.sort((a, b) => {
              return validators.findIndex(el => el.address === a.address) - validators.findIndex(el => el.address === b.address);
            });
          }
          return newValidators
        })
      }).catch(error => setValidators([]));
  }
   
  function getChainStatus() {
    directory.getChainStatus(chainPath).then(status => {
      setStatus(status);
    });
  }
  
  useEffect(() => {
    if(chain && chainPath != chain.path){
      setChain(undefined)
      setAssetlist(undefined)
      setValidators(undefined)
      setStatus(undefined)
    }
  }, [chain, chainPath])

  useEffect(() => {
    if(!chain){
      getChainData();
    }
  }, [chain]);

  useEffect(() => {
    let refreshInterval
    if(chain){
      refreshInterval = setInterval(() => {
        getChainData()
        getChainAssetlist()
        getChainValidators()
        getChainStatus()
      }, 5000)
    }
    return () => {
      clearInterval(refreshInterval)
    }
  }, [chain])

  useEffect(() => {
    if(!assetlist){
      getChainAssetlist();
    }
  }, [assetlist]);

  useEffect(() => {
    if(!validators){
      getChainValidators();
    }
  }, [validators]);

  useEffect(() => {
    if(!status){
      getChainStatus();
    }
  }, [status]);

  if(!chain || !assetlist || !validators || !status){
    return (
      <div className="pt-3 text-center">
        <CSpinner />
      </div>
    )
  }

  return (
    <CContainer lg>
      <CTabContent>
        <CTabPane role="tabpanel" aria-labelledby="overview-tab" visible={activeSection === 'overview'} key={'overview'}>
          <ChainOverview chain={chain} assetlist={assetlist} validators={validators} status={status} />
        </CTabPane>
        <CTabPane role="tabpanel" aria-labelledby="chain-tab" visible={activeSection === 'chain'} key={'chain'}>
          <ChainDetails chain={chain} assetlist={assetlist} status={status} />
        </CTabPane>
        <CTabPane role="tabpanel" aria-labelledby="chain-tab" visible={activeSection === 'validators'} key={'validators'}>
          <ChainValidators chain={chain} validators={validators} />
        </CTabPane>
        <CTabPane role="tabpanel" aria-labelledby="nodes-tab" visible={activeSection === 'nodes'} key={'nodes'}>
          <ChainNodes chain={chain} status={status} />
        </CTabPane>
      </CTabContent>
    </CContainer>
  )
}

export default Chain