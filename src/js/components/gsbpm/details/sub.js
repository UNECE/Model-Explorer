import React from 'react'
import { sparqlConnect } from '../../../sparql/configure-sparql'
import ServicesByGSBPMSubProcess from './services-by-sub'

/**
 * Builds the query that retrieves the details for a GSBPM sub process
 */
const queryBuilder = GSBPMSub => `
  SELECT ?label ?code ?definition
  WHERE {
    <${GSBPMSub}> skos:prefLabel ?label ;
                  skos:notation ?code ;
                  skos:definition ?definition
  }
`

const connector = sparqlConnect(queryBuilder, {
  queryName: 'GSBPMSubDetails',
  params: ['GSBPMSub'],
  singleResult: true
})

// GSBPMSub comes from `connectFromRoute` (it's then passed to the sparql
// connected component, which keeps it in its own props)
function GSBPMSubDetails({ GSBPMSub, label, code, definition }) {
  return (
      <div>
        <dl className="dl-horizontal">
          <dt>Label</dt>
          <dd>{label}</dd>
          <dt>Definition</dt>
          <dd>{definition}</dd>
          <dt>Code</dt>
          <dd>{code}</dd>
          <dt>Services</dt>
          <dd>
            <ServicesByGSBPMSubProcess GSBPMSub={GSBPMSub} />
          </dd>
        </dl>
      </div>
  )
}

export default connector(GSBPMSubDetails)
