import React from 'react'
import { connectFromRoute } from '../routes'
import { sparqlConnect } from '../sparql/configure-sparql'
import { LOADED } from 'sparql-connect'

function ServiceBySubProcess({ loaded, services }) {
  if(loaded !== LOADED) {
    return(<div>LOADING...</div>)
  }
  if(services.length === 0) {
    return(<div>
      There is no service implementing this subprocess.
    </div>)
  }
  return(
    <div>
      <ul>
      {
        services
          .map((service) =>
            <li key={service.serviceId}>
              {service.label}
            </li>)
      }
      </ul>
    </div>
  )
}

export default connectFromRoute(
  sparqlConnect.serviceBySubProcess(ServiceBySubProcess)
)
