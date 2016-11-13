import React, { PropTypes } from 'react'
import { sparqlConnect } from '../sparql/configure-sparql'
import { connectFromRoute } from '../routes'
import { LOADED } from 'sparql-connect'

function NSIDetails({ nsi, loaded, name, shortName, address, geo }) {
  if (loaded !== LOADED) return <span>Loading...</span>
  return (
    <div>
      <h1>{name}</h1>
      <span className="flag-icon flag-icon-fr large-flag"></span>
    </div>
  )
}

export default connectFromRoute(sparqlConnect.NSIDetails(NSIDetails))
