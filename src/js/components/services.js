import React from 'react'
import { LOADED } from 'sparql-connect'
import { Link } from 'react-router'
import { uriToLink } from '../routes'
import { sparqlConnect } from '../sparql/configure-sparql'

function Services({ loaded, services }) {
  if (loaded !== LOADED) return <span>loading services</span>
  return (
    <ul>
      { services.map(({ service, label }) => 
        <li key={service}>
          <Link to={uriToLink.serviceDetails(service)}>
            { label }
          </Link>
        </li>)}
    </ul>
  )
}

export default sparqlConnect.services(Services)