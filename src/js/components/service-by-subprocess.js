import React from 'react'
import { connectFromRoute } from '../routes'
import { sparqlConnect } from '../sparql/configure-sparql'
import { LOADED } from 'sparql-connect'

function ServiceBySubProcess({ loaded, services }) {
  if(loaded !== LOADED) {
    return(<p>LOADING...</p>)
  }
  return(
    <div>
      {
        services.map((service) => <p key={service.name}>{service.label}</p>)
      }
    </div>
  )
}

export default connectFromRoute(
  sparqlConnect.serviceBySubProcess(ServiceBySubProcess)
)
