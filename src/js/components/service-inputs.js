import React from 'react'
import { LOADED } from 'sparql-connect'
import { sparqlConnect } from '../sparql/configure-sparql'
import { Link } from 'react-router'
import { uriToLink } from '../routes'

function ServiceInputs({ loaded, inputs, label }) {
    if (loaded !== LOADED) return <span>loading gsim inputs</span>
    return (
      <div>
        Inputs:
        <ul>
        { inputs.map(({ gsimClass, label }) => 
          <li key={gsimClass}>
            {label}
            &nbsp;(<Link to={uriToLink.servicesByGsimInput(gsimClass)}>
              view
            </Link>)
          </li> )}
        </ul>
      </div>
    )
}

export default sparqlConnect.serviceInputs(ServiceInputs)