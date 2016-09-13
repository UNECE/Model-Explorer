import React from 'react'
import { connectFromRoute } from '../routes'
import { sparqlConnect } from '../sparql/configure-sparql'

function ServiceDetails({ service, label }) {
  return (
    <div>
      details about a service
      {service} - {label}
    </div>
  )
}

export default connectFromRoute(
  sparqlConnect.serviceDetails(ServiceDetails)
)