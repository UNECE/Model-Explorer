import React from 'react'
import { sparqlConnect } from '../../sparql/configure-sparql'
import { uriToLink } from '../../routes'
import { Link } from 'react-router'

function ServicesByNSI({ services }) {
  if (services.length === 0) { return <span>This NSI has no role for any service</span> }
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
                <Link to={uriToLink.serviceDetails(service)}>{ serviceLabel }</Link>
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

export default sparqlConnect.servicesByNSI(ServicesByNSI, {
  loading: () => <span>services are loading...</span>
})
