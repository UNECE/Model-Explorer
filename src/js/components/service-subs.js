import React from 'react'
import { sparqlConnect } from '../sparql/configure-sparql'
import { LOADED } from 'sparql-connect'

function ServiceSubs({ loaded, subs }) {
  if (loaded !== LOADED) return <span>loading subprocesses</span>
  return (
    <div>
      Subprocess(es):
      <ul>
        { subs.map(({ sub, label }) =>
            <li key={sub}>{label}</li> )}
      </ul>
    </div>
  )
}

export default sparqlConnect.serviceSubprocesses(ServiceSubs)