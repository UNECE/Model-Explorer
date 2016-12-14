import React from 'react'
import { Link } from 'react-router'
import { uriToLink } from '../../../routes'
import { sparqlConnect} from '../../../sparql/configure-sparql'
import P from '../../../sparql/prefixes'

/**
 * Builds the query that retrives all the subprocesses for a GSBPM phase
 */
//TODO we retrieve twice the same information, see GSBPM description query.
//There might be a better option, but for now it's easier to use a global query
//to show the GSBPM explorer, and some dedicated queries to show all the
//subprocesses in a given GSBPM phase.
const queryBuilder = GSBPMPhase => `
PREFIX skos:  <${P.SKOS}>

SELECT ?subprocess ?label 
WHERE {
 <${GSBPMPhase}> skos:narrower ?subprocess .
 ?subprocess skos:prefLabel ?label
}
`

const connector = sparqlConnect(queryBuilder, {
  queryName: 'subsByGSBPMPhase',
  params: ['GSBPMPhase']
})

function SubsByGSBPMPhase({ subsByGSBPMPhase }) {
  return(
    <div className="list-group">
      { subsByGSBPMPhase.map(({ subprocess, label }) =>
        <Link key={subprocess} to={uriToLink.GSBPMSubProcessDetails(subprocess)}
          className="list-group-item" title={label}>
          { label }
        </Link>)
       }
    </div>
  )
}

export default connector(SubsByGSBPMPhase, {
  loading: () => <span>loading subprocesses</span>
})  