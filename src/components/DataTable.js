import {
  CTable
} from '@coreui/react'

function DataTable(props){
  const { bodyClass, data, header, ...rest } = props
  if(!data) return null
  return (
    <CTable {...rest}>
      <tbody className={bodyClass}>
        {header && (
          <tr>
          {header.map((label) => {
            return (
              <th key={label}>{label}</th>
            )
          })}
          </tr>
        )}
        {data.map(({key, label, value}) => {
          return (
            <tr key={key}>
              <td className={`w-25 ${props.columnclass} ${props.labelclass}`} scope="row">{label || key}</td>
              <td className={`w-25 ${props.columnclass} ${props.valueclass}`}>{value}</td>
            </tr>
          )
        })}
      </tbody>
    </CTable>
  )
}

export default DataTable