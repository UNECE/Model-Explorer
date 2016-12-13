import React from 'react'
import { sparqlConnect } from '../../sparql/configure-sparql'
import { LOADED } from 'sparql-connect'

function SelectClass({ value, handleChange, GSIMClasses }) {
  return (
    <select value={value} className="form-control"
            onChange={e => handleChange(e.target.value)}>
      { GSIMClasses.map(({ GSIMClass, label, code }) =>
          <option key={GSIMClass} value={GSIMClass}>{`${label}`}</option> )}
    </select>
  )
}

export default sparqlConnect.GSIMClasses(SelectClass, {
  loading: () => <span>loading GSIM classes</span>
})
