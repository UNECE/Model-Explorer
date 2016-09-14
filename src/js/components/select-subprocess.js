import React from 'react'
import { sparqlConnect } from '../sparql/configure-sparql'
import { LOADED } from 'sparql-connect'

function SelectSubprocess({ value, handleChange, loaded, subs }) {
  if (loaded !== LOADED) return <span>loading gsbpm subprocesses</span>
  return (
    <select className="form-control" value={value} 
            onChange={e => handleChange(e.target.value)}>
      { subs.map(({ sub, label, code }) =>
          <option key={sub} value={sub}>{`${code} - ${label}`}</option> )}
    </select>
  )
}

export default sparqlConnect.subprocesses(SelectSubprocess)
