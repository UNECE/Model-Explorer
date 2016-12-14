import { sparqlConnect } from '../../sparql/configure-sparql'
import ServicesByGSIM from './services-by-in-out-pres'
import P from '../../sparql/prefixes'

/**
 * Builds the query that retrieves the list of all CSPA services with a given GSIM input.
 */
const queryBuilder = GSIMClass => `
  PREFIX cspa:  <${P.CSPA}>
  PREFIX gsbpm: <${P.GSBPM}>
  PREFIX gsim:  <${P.GSIM}>
  PREFIX rdfs:  <${P.RDFS}>

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

