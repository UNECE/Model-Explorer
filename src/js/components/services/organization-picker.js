import React from 'react'
import { sparqlConnect } from '../../sparql/configure-sparql'
import P from '../../sparql/prefixes'

/**
 * Builds the query that retrives all the organizations
 */
const queryBuilder = () => `
  PREFIX org: <${P.ORG}>
  PREFIX skos:  <${P.SKOS}>

  SELECT ?org ?label
  WHERE {
    ?org a org:Organization ;
         skos:prefLabel ?label
  }
`

const connector = sparqlConnect(queryBuilder, {
  queryName: 'organizations'
})

function OrganizationPicker({ disabled, value, organizations, onChange }) {
  return (
    <select
      value={value}
       disabled={disabled}
       onChange={e => onChange(e.target.value)} className="form-control">
      { organizations.map(({ org, label }) => 
        <option key={org} value={org}>
          {label}
        </option>)}
    </select>
  )
}
export default connector(OrganizationPicker)