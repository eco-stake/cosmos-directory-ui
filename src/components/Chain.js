import React, { useEffect, useState } from "react";
import { 
  CContainer, 
  CSpinner,
  CTabPane,
  CTabContent
} from '@coreui/react'
import ChainOverview from "./ChainOverview";
import ChainDetails from "./ChainDetails";
import ChainNodes from "./ChainNodes";

function Chain(props) {
  const { chainPath, directory, activeSection } = props
  const [chain, setChain] = useState()
  const [assetlist, setAssetlist] = useState()
  const [status, setStatus] = useState()
  const [refreshInterval, setRefreshInterval] = useState()

  function getChainStatus() {
    directory.getChainStatus(chainPath).then(status => {
      setStatus(status);
    });
  }

  function getChainAssetlist() {
    directory.getChainAssetlist(chainPath).then(assetlist => {
      setAssetlist(assetlist);
    }).catch(error => setAssetlist({}));
  }

  function getChainData() {
    directory.getChainData(chainPath).then(chain => {
      setChain(chain);
    });
  }
  
  useEffect(() => {
    return () => {
      clearInterval(refreshInterval)
    }
  }, [refreshInterval])
  
  useEffect(() => {
    if(chain && chainPath != chain.path){
      setRefreshInterval(clearInterval(refreshInterval))
      setChain(undefined)
      setAssetlist(undefined)
      setStatus(undefined)
    }
  }, [chain, chainPath])

  useEffect(() => {
    if(!chain){
      getChainData();
    }
  }, [chain]);

  useEffect(() => {
    if(chain && !refreshInterval){
      setRefreshInterval(setInterval(() => {
        getChainData()
        getChainAssetlist()
        getChainStatus()
      }, 5000))
    }
  }, [chain, refreshInterval])

  useEffect(() => {
    if(!assetlist){
      getChainAssetlist();
    }
  }, [assetlist]);

  useEffect(() => {
    if(!status){
      getChainStatus();
    }
  }, [status]);

  if(!chain || !assetlist || !status){
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
          <ChainOverview chain={chain} assetlist={assetlist} status={status} />
        </CTabPane>
        <CTabPane role="tabpanel" aria-labelledby="chain-tab" visible={activeSection === 'chain'} key={'chain'}>
          <ChainDetails chain={chain} assetlist={assetlist} status={status} />
        </CTabPane>
        <CTabPane role="tabpanel" aria-labelledby="nodes-tab" visible={activeSection === 'nodes'} key={'nodes'}>
          <ChainNodes chain={chain} status={status} />
        </CTabPane>
      </CTabContent>
    </CContainer>
  )
}

export default React.memo(Chain)