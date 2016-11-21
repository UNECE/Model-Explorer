import React from 'react'
import { sparqlConnect } from '../sparql/configure-sparql'
import { LOADED } from 'sparql-connect'

function ServicesByNSI({ loaded, services }) {
    if (loaded !== LOADED) return <span>services are loading...</span>
    return (
      <div>
        
        <table className="table">
          <thead>
            <tr>
              <th>Service</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            { services.map(({ service, serviceLabel, roleLabel }) =>
              <tr key={service}>
              <td>
                { serviceLabel }
              </td>
              <td>
                { roleLabel }
              </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    )
  
}

export default sparqlConnect.servicesByNSI(ServicesByNSI)