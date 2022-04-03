import React, { useEffect, useState } from "react";
import { 
  CContainer, 
  CSpinner,
  CTabPane
} from '@coreui/react'
import ChainOverview from "./ChainOverview";

function Chain(props) {
  const { chainPath, directory, activeKey } = props
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
    if(chain && chainPath != chain.path){
      setChain(undefined)
      setAssetlist(undefined)
      setStatus(undefined)
    }
  })

  useEffect(() => {
    if(!chain){
      clearInterval(refreshInterval)
      getChainData();
    }else if(!refreshInterval){
      setRefreshInterval(setInterval(() => {
        getChainData()
        getChainAssetlist()
        getChainStatus()
      }, 5000))
    }
  }, [chain]);

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
      <>
        <CTabPane role="tabpanel" aria-labelledby="chain-tab" visible={activeKey === 'overview'} key={'overview'}>
          <ChainOverview chain={chain} assetlist={assetlist} status={status} />
        </CTabPane>
      </>
    </CContainer>
  )
}

export default React.memo(Chain)