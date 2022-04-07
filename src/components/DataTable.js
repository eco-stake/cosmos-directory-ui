import React from "react";
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
            <th className={`${props.labelclass || ''}`}>{header[0]}</th>
            <th className={`${props.valueclass || ''}`}>{header[1]}</th>
          </tr>
        )}
        {data.map(({key, label, value}) => {
          return (
            <tr key={key}>
              <td className={`${props.columnclass || ''} ${props.labelclass || ''}`} scope="row">{label || key}</td>
              <td className={`${props.columnclass || ''} ${props.valueclass || ''}`}>{value}</td>
            </tr>
          )
        })}
      </tbody>
    </CTable>
  )
}

export default DataTable