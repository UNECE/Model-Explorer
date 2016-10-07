import React from 'react'
import { Link } from 'react-router'
import { sparqlConnect } from '../sparql/configure-sparql'
import { LOADED } from 'sparql-connect'
import { uriToLink } from '../routes'

//TODO make it generic (it's duplicated for gsim inputs and outputs)
function ServiceSubs({ loaded, subs, remove, disabled }) {
  if (loaded !== LOADED) return <span>loading subprocesses</span>
  return (
      <ul className="list-group" style={{ marginBottom: 0 }}>
        { subs.map(({ sub, label }) =>
            <li className="list-group-item" key={sub}>
              <Link to={uriToLink.serviceBySubProcess(sub)}>
                {label}
              </Link>
              { !disabled &&
               <a href="#" className="pull-right"
                  onClick={() => remove(sub)} >
                 <span className="glyphicon glyphicon-remove"></span>
               </a>
              }
            </li> )}
      </ul>
  )
}

export default sparqlConnect.serviceSubprocesses(ServiceSubs)
