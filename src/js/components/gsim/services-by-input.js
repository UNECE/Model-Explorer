import { sparqlConnect } from 'sparql-connect'
import ServicesByGSIM from './services-by-in-out-pres'

/**
 * Builds the query that retrieves the list of all CSPA services with a given GSIM input.
 */
const queryBuilder = GSIMClass => `
  SELECT DISTINCT ?service ?label
  WHERE {
    ?service a cspa:package ;
             cspa:label ?label ;
             cspa:hasPackageDefinition ?pckgDefinition .

    ?pckgDefinition cspa:definitionHasInput ?input .
    ?input cspa:gsimInput <${GSIMClass}>
  }
`
const connector = sparqlConnect(queryBuilder, {
  queryName: 'servicesByGSIMInput',
  params: ['GSIMClass'],
  whatWeGet: 'services'
})

export default connector(ServicesByGSIM)

