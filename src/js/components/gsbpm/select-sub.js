import React from 'react'
import { sparqlConnect } from '../../sparql/configure-sparql'

function SelectSubprocess({ value, handleChange, subs }) {
  return (
    <select className="form-control" value={value} 
            onChange={e => handleChange(e.target.value)}>
      { subs.map(({ sub, label, code }) =>
          <option key={sub} value={sub}>{`${code} - ${label}`}</option> )}
    </select>
  )
}

export default sparqlConnect.subprocesses(SelectSubprocess, {
  loading: () => <span>loading gsbpm subprocesses</span>
})
