import React from 'react'
import { sparqlConnect } from '../sparql/configure-sparql'
import { LOADED } from 'sparql-connect'

function SelectSubprocess({ loaded, subs }) {
  if (loaded !== LOADED) return <span>loading gsbpm subprocesses</span>
  return (
    <select>
      { subs.map(({ sub, label, code }) => 
          <option key={sub}>{`${code} - ${label}`}</option> )}
    </select>
  )
}

export default sparqlConnect.subprocesses(SelectSubprocess)