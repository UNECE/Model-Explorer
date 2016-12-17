import React from 'react'
import { sparqlConnect } from '../../../sparql/configure-sparql'
import ServicesByGSBPMPhase from './services-by-phase'
import GSBPMSubprocesses from './subs-by-phase'

/**
 * Builds the query that retrieves the details for a GSBPM sub process
 */
const queryBuilder = GSBPMPhase => `
  SELECT ?label ?code ?definition
  WHERE {
    <${GSBPMPhase}> skos:prefLabel ?label ;
                  skos:notation ?code ;
                  skos:definition ?definition
  }
`

const connector = sparqlConnect(queryBuilder, {
  queryName: 'GSBPMPhaseDetails',
  params: ['GSBPMPhase'],
  singleResult: true
})

function GSBPMPhaseDetails({ GSBPMPhase, label, code, definition }) {
  
  return (
      <div>
        <dl className="dl-horizontal">
          <dt>Label</dt>
          <dd>{label}</dd>
          <dt>Code</dt>
          <dd>{code}</dd>
          <dt>Definition</dt>
          <dd>{definition}</dd>
          <dt>Subprocesses</dt>
          <dd>
            <GSBPMSubprocesses GSBPMPhase={GSBPMPhase}/>
          </dd>
          <dt>Services</dt>
          <dd>
            <ServicesByGSBPMPhase GSBPMPhase={GSBPMPhase} />
          </dd>
        </dl>
      </div>
  )
}

export default connector(GSBPMPhaseDetails)
