import React from 'react'
import { sparqlConnect } from '../../sparql/configure-sparql'

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
export default sparqlConnect.organizations(OrganizationPicker)