import React from 'react'
import ServiceList from '../../shared/service-list'
import { sparqlConnect } from 'sparql-connect'


/**
 * Builds the query that retrieves the list of all CSPA services in a given GSBPM subprocess.
 */
const queryBuilder = (GSBPMSub) => `
  SELECT ?service ?label WHERE {
    ?function cspa:gsbpmSubProcess <${GSBPMSub}> .
    ?definition cspa:aimsAt ?function .
    ?service cspa:hasPackageDefinition ?definition .
    ?service cspa:label ?label
  }
`

const connector = sparqlConnect(queryBuilder, {
  queryName: 'servicesByGSBPMSub',
  params: ['GSBPMSub']
})

function ServicesByGSBPM({ servicesByGSBPMSub }) {
  return <ServiceList
    services={servicesByGSBPMSub}
    msg="No service implements this GSBPM subprocess" />
}

export default connector(ServicesByGSBPM)