import { 
  CCol, 
  CCard, 
  CCardBody, 
  CCardTitle,
} from '@coreui/react'

function Panel(props) {
  return (
    <CCol xs>
      <CCard className="mb-3">
        {props.title 
        ? (
          <CCardBody>
            <CCardTitle className="mb-3">{props.title}</CCardTitle>
            {props.children}
          </CCardBody>
        ) : props.children}
      </CCard>
    </CCol>
  )
}

export default Panel