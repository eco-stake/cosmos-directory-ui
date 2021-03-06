import React from 'react'
import { 
  CContainer, 
  CRow, 
  CCol, 
  CCard, 
  CCardBody, 
  CCardTitle, 
} from '@coreui/react'
import { Link } from 'react-router-dom'
import _ from 'lodash'

import DataTable from './DataTable'
import ChainImage from './ChainImage'

function ChainList(props) {
  function renderChain(chain){
    const available = !!props.status[chain.name]?.available
    const data = [
      {
        key: 'Chain',
        value: chain.chain_id
      },
      {
        key: 'Height',
        value: chain.height
      },
      {
        key: 'Token',
        value: chain.symbol
      },
      {
        key: 'Status',
        value: chain.status === 'live' ? <span className="text-success p-0">Live</span> : <span className="text-danger p-0">{_.startCase(chain.status)}</span>
      },
      {
        key: 'APIs',
        value: available ? <span className="text-success p-0">Available</span> : <span className="text-danger p-0">Unavailable</span>
      }
    ]
    return (
      <CCol xs key={chain.chain_name}>
        <CCard className="mb-3" style={{ maxWidth: '540px' }}>
          <CRow className="g-0">
            <CCol md={3} className="text-center">
              <ChainImage chain={chain} width={60} height={60} className="m-2 shadow overflow-hidden" />
            </CCol>
            <CCol md={9}>
              <CCardBody>
                <CCardTitle><Link to={'/' + chain.path} className="stretched-link text-reset">{chain.pretty_name}</Link></CCardTitle>
                <DataTable small className="mt-3" bodyClass="small" data={data} />
              </CCardBody>
            </CCol>
          </CRow>
        </CCard>
      </CCol>
    )
  }

  return (
    <CContainer lg>
      <CRow xs={{ cols: 1, gutter: 4 }} md={{ cols: 2 }} lg={{ cols: 3 }} xxl={{ cols: 4 }}>
        {Object.values(props.chains).map(chain => {
          return renderChain(chain)
        })}
      </CRow>
    </CContainer>
  )
}

export default ChainList