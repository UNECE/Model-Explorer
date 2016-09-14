import React from 'react'
import { LOADED } from 'sparql-connect'
import { Link, browserHistory } from 'react-router'
import { uriToLink } from '../routes'
import { sparqlConnect } from '../sparql/configure-sparql'
import ServiceList from './service-list'

function Services({ loaded, services }) {
  const handleClick = () => 
    browserHistory.push(uriToLink.create())
  if (loaded !== LOADED) return <span>loading services</span>
  return (
    <div>
      <ServiceList services={services}/>
      <button onClick={handleClick}>Create a new service</button>
    </div>
  )
}

export default sparqlConnect.services(Services)
export const DumbServices = Services
