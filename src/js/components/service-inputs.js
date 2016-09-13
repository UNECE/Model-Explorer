import React from 'react'
import { LOADED } from 'sparql-connect'
import { sparqlConnect } from '../sparql/configure-sparql'

function ServiceInputs({ loaded, inputs, label }) {
    if (loaded !== LOADED) return <span>loading gsim inputs</span>
    return (
      <div>
        Inputs:
        <ul>
        { inputs.map(({ gsimClass, label }) => 
        <li key={gsimClass}>{gsimClass}</li> )}
        </ul>
      </div>
    )
}

export default sparqlConnect.serviceInputs(ServiceInputs)