import React from 'react'
import { sparqlConnect } from '../../sparql/configure-sparql'
import NSIList from './list-pres'
import P from '../../sparql/prefixes'

/**
 * Builds the query that retrieves the list of NSIs.
 */
const queryBuilder = () => `
  PREFIX org: <${P.ORG}>
  PREFIX skos: <${P.SKOS}>

  SELECT ?nsi ?label
  WHERE {
    ?nsi a org:Organization ; skos:prefLabel ?label .
  }
  ORDER BY ?nsi
`
const connector = sparqlConnect(queryBuilder, {
  queryName: 'nsis'
})

function NSIExplorer({ nsis }) {
  return(
    <div>
      <NSIList nsis={nsis}/>
    </div>
  )
}

export default connector(NSIExplorer, {
  loading: () => <span>Loading NSI list...</span>
})
