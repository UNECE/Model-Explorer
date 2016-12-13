import React from 'react'
import { browserHistory } from 'react-router'
import { uriToLink } from '../../routes'
import { sparqlConnect } from '../../sparql/configure-sparql'
import ServiceList from '../shared/service-list'


function Services({ services }) {
  const handleClick = () =>
    browserHistory.push(uriToLink.create())

  return (
    <div>
      <ServiceList services={services} />
      <button 
        className="btn btn-primary"
        onClick={handleClick}>Create a new service</button>
    </div>
  )
}

export default sparqlConnect.services(Services)
