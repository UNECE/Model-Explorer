import React from 'react'
import { sparqlConnect } from '../../sparql/configure-sparql'

//TODO looks like the query for the NSI explore. It might be a good idea to use
//the same query to avoid fetching twice similar information, but if the context
//(props passed by the parent component or results passed to this component)
//is not the (ie. `params` and `whatWeGet` in the `connector`), `sparql-connect`
//doest not allow it for now
/**
 * Builds the query that retrives all the organizations
 */
const queryBuilder = () => `
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