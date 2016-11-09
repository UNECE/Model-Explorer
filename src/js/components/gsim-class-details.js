import React from 'react'
import { sparqlConnect } from '../sparql/configure-sparql'
import { LOADED } from 'sparql-connect'

function GSIMClassDetails({ loaded, label, definition, explanatoryText }) {
  if(loaded !== LOADED) return <span>loading......</span>
  return (
    <dl className="dl-horizontal">
      <dt>Label</dt>
      <dd>{label}</dd>
      <dt>Definition</dt>
      <dd>{definition}</dd>
      <dt>Explanatory text</dt>
      <dd>{explanatoryText}</dd>
    </dl>
  )
}

export default sparqlConnect.GSIMClassDetails(GSIMClassDetails)
