import React from 'react'
import { sparqlConnect } from '../../../sparql/configure-sparql'
import ServiceList from '../../shared/service-list'
import P from '../../../sparql/prefixes'

/**
 * Builds the query that retrieves the list of all CSPA services in a given GSBPM phase.
 */
const queryBuilder = GSBPMPhase => `
  PREFIX gsbpm: <${P.GSBPM}>
  PREFIX skos:  <${P.SKOS}>
  PREFIX cspa:  <${P.CSPA}>

  SELECT ?service ?label WHERE {
    <${GSBPMPhase}> skos:narrower ?subprocess .
    ?function cspa:gsbpmSubProcess ?subprocess .
    ?definition cspa:aimsAt ?function .
    ?service cspa:hasPackageDefinition ?definition .
    ?service cspa:label ?label
  }
`
const connector = sparqlConnect(queryBuilder, {
  queryName: 'servicesByGSBPMPhase',
  params: ['GSBPMPhase']
})

function ServicesByGSBPMPhase({ servicesByGSBPMPhase }) {
  return <ServiceList
    services={servicesByGSBPMPhase}
    msg="No service implements this GSBPM phase" />
}

export default connector(ServicesByGSBPMPhase)