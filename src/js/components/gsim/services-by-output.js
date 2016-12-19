import { sparqlConnect } from 'sparql-connect'
import ServicesByGSIM from './services-by-in-out-pres'

/**
 * Builds the query that retrieves the list of all CSPA services with a given
 * GSIM output.
 */
const queryBuilder = GSIMClass => `
  SELECT DISTINCT ?service ?label
  WHERE {
    ?service a cspa:package ;
             cspa:label ?label ;
             cspa:hasPackageDefinition ?pckgDefinition .

    ?pckgDefinition cspa:definitionHasOutput ?input .
    ?input cspa:gsimOutput <${GSIMClass}>
  }
`
const connector = sparqlConnect(queryBuilder, {
  queryName: 'servicesByGSIMOutput',
  params: ['GSIMClass'],
  whatWeGet: 'services'
})

export default connector(ServicesByGSIM)

