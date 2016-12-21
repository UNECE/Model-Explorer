import React from 'react'
import { Link } from 'react-router'
import { sparqlConnect } from 'sparql-connect'
import { linkService } from '../services/routes'

/**
 * Builds the query that retrives the list of all the services in which a NSI
 * is involved
 */
const queryBuilder = nsi => `
  SELECT ?service ?serviceLabel ?roleLabel
  WHERE {
    ?service a cspa:package ;
             cspa:label ?serviceLabel ;
    cspa:hasPackageImplementation [
    cspa:comesFrom [?role [ cspa:organization <${nsi}> ]]] .
    ?role rdfs:label ?roleLabel
  }
`
const connector = sparqlConnect(queryBuilder, {
  queryName: 'servicesByNSI',
  params: ['nsi']
})

function ServicesByNSI({ servicesByNSI }) {
  if (servicesByNSI.length === 0) {
    return <span>This NSI has no role for any service</span>
  }
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
            { servicesByNSI.map(({ service, serviceLabel, roleLabel }) =>
              <tr key={service}>
              <td>
                <Link to={linkService(service)}>
                  { serviceLabel }
                </Link>
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

export default connector(ServicesByNSI, {
  loading: () => <span>services are loading...</span>
})
