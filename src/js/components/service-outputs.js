import React from 'react'
import { LOADED } from 'sparql-connect'
import { sparqlConnect } from '../sparql/configure-sparql'
import { Link } from 'react-router'
import { uriToLink } from '../routes'

function ServiceOutputs({ loaded, outputs, label }) {
    if (loaded !== LOADED) return <span>loading gsim inputs</span>
    return (
      <div>
        Outputs:
        <ul>
        { outputs.map(({ gsimClass, label }) =>
          <li key={gsimClass}>
            <Link to={uriToLink.servicesByGsimInput(gsimClass)}>
              {label}
            </Link>
          </li> )}
        </ul>
      </div>
    )
}

export default sparqlConnect.serviceOutputs(ServiceOutputs)
