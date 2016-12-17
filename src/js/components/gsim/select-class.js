import React from 'react'
import { linkGSIMClass } from './routes'
import { Link } from 'react-router'
import { sparqlConnect } from '../../sparql/configure-sparql'
import P from '../../sparql/prefixes'

/**
 * Builds the query that retrieves the list of all GSIM objects of a given group.
 */
const queryBuilder = group => `
  PREFIX gsim:  <${P.GSIM}>
  PREFIX skos:  <${P.SKOS}>

  SELECT ?GSIMClass ?label ?definition WHERE {
    ?GSIMClass rdfs:subClassOf <${group}> ;
               gsim:classDefinition ?definition ;
               rdfs:label ?label
  }
  ORDER BY ?label
`
const connector = sparqlConnect(queryBuilder, {
  queryName: 'GSIMClasses',
  params: ['group']
})

function GSIMSelectClass({ GSIMClasses }){
  return (
    <div className="list-group">
      {
        GSIMClasses.map(({ GSIMClass, label }) =>
          <Link
            key={GSIMClass}
            className="list-group-item"
            to={linkGSIMClass(GSIMClass)}>{label}</Link>)
    }
    </div>
  )
}

export default connector(GSIMSelectClass)


