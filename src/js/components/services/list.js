import React from 'react'
import { browserHistory } from 'react-router'
import { sparqlConnect } from 'sparql-connect'
import ServiceList from '../shared/service-list'

/**
* Builds the query that retrieves the list of CSPA services.
*/
//TODO implement auto-detection of prefixes
const queryBuilder = () => `
  SELECT distinct ?service ?label ?description
  WHERE {
    ?service a cspa:package .
    OPTIONAL {?service cspa:label ?label}
    OPTIONAL {?service cspa:hasPackageDefinition [
         a cspa:ServiceDefinition; cspa:aimsAt [cspa:description ?description]]}
  }
  ORDER BY ?label
`

const connector = sparqlConnect(queryBuilder, {
  queryName: 'services'
})


//TODO we should connect `ServiceList` instead of `Services`, to allow the
//query to stay close to the component that processes the results
function Services({ services }) {
  const handleClick = () =>
    browserHistory.push('/create')

  return (
    <div>
      <ServiceList services={services} />
      <button 
        className="btn btn-primary"
        onClick={handleClick}>Create a new service</button>
    </div>
  )
}

export default connector(Services)
