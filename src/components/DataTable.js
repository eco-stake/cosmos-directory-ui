import {
  CTable
} from '@coreui/react'

function DataTable(props){
  const { bodyClass, data, ...rest } = props
  return (
    <CTable {...rest}>
      <tbody className={bodyClass}>
        {data.map(({key, value}) => {
          return (
            <tr key={key}>
              <td className="w-25 ps-0" scope="row">{key}</td>
              <td>{value}</td>
            </tr>
          )
        })}
      </tbody>
    </CTable>
  )
}

export default DataTable