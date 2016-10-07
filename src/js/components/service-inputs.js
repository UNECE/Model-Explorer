import React from 'react'
import { LOADED } from 'sparql-connect'
import { sparqlConnect } from '../sparql/configure-sparql'
import { Link } from 'react-router'
import { uriToLink } from '../routes'

function ServiceInputs({ loaded, inputs, remove, disabled }) {
    if (loaded !== LOADED) return <span>loading gsim inputs</span>
    if (inputs.length === 0)
      return <span className="form-control">No GSIM input</span>
    return (
        <ul className="list-group" style={{ marginBottom: '5px' }}>
        { inputs.map(({ gsimClass, label }) =>
          <li className="list-group-item" key={gsimClass}>
            <Link to={uriToLink.servicesByGsim(gsimClass)}>
              {label}
            </Link>
            { !disabled &&
             <a className="pull-right"
                onClick={() => remove(gsimClass)} >
               <span className="glyphicon glyphicon-remove"></span>
             </a>
            }            
          </li> )}
        </ul>
    )
}

export default sparqlConnect.serviceInputs(ServiceInputs)
