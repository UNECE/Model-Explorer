import React from 'react'
import { Link } from 'react-router'
import { sparqlConnect } from '../sparql/configure-sparql'
import { LOADED } from 'sparql-connect'
import { uriToLink } from '../routes'

function ServiceSubs({ loaded, subs }) {
  if (loaded !== LOADED) return <span>loading subprocesses</span>
  return (
    <div>
      Subprocess(es):
      <ul>
        { subs.map(({ sub, label }) =>
            <li key={sub}>
              <Link to={uriToLink.serviceBySubProcess(sub)}>
                {label}
              </Link>
            </li> )}
      </ul>
    </div>
  )
}

export default sparqlConnect.serviceSubprocesses(ServiceSubs)
