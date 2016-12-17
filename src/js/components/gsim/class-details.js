import React from 'react'
import ServicesByGSIMInput from './services-by-input'
import ServicesByGSIMOutput from './services-by-output'
import { sparqlConnect} from '../../sparql/configure-sparql'
  
/**
 * Builds the query that retrieves the details for a GSIM class
 */
const queryBuilder = GSIMClass => `
  SELECT ?label ?definition ?explanatoryText
  WHERE {
    <${GSIMClass}> rdfs:label ?label ;
                   gsim:classDefinition ?definition ;
    OPTIONAL { <${GSIMClass}>  gsim:classExplanatoryText ?explanatoryText }
  }
`

const connector = sparqlConnect(queryBuilder, {
  queryName: 'GSIMClassDetails',
  params: ['GSIMClass'],
  singleResult: true
})

function GSIMClassDetails({ GSIMClass, label, definition, explanatoryText }) {
  return (
    <div>
      <dl className="dl-horizontal">
        <dt>Label</dt>
        <dd>{label}</dd>
        <dt>Definition</dt>
        <dd>{definition}</dd>
        <dt>Explanatory text</dt>
        <dd>{explanatoryText}</dd>
      </dl>
      <h3>Services referencing this GSIM class</h3>
      <dl className="dl-horizontal">
        <dt>As input</dt>
        <dd>
          <ServicesByGSIMInput
            GSIMClass={GSIMClass}
            msg="No service references this GSIM class as input"/>
        </dd>
        <dt>As output</dt>
        <dd>
          <ServicesByGSIMOutput
            GSIMClass={GSIMClass}
            msg="No service references this GSIM class as output" />
        </dd>
      </dl>
    </div>
  )
}

export default connector(GSIMClassDetails)
