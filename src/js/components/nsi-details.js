import React, { PropTypes } from 'react'
import { sparqlConnect } from '../sparql/configure-sparql'
import { connectFromRoute } from '../routes'
import { LOADED } from 'sparql-connect'

function NSIDetails({ nsi, loaded, name, shortName, address, geo }) {
  if (loaded !== LOADED) return <span>Loading...</span>
  var countryCode = nsi.slice(-2);
  var flagClassName = "flag-icon flag-icon-" + countryCode.toLowerCase() +" large-flag";
  return (
    <div>
      <h1>{name + ((shortName) ? ' (' + shortName + ')' : '')}</h1>
      <span className={flagClassName}></span>
    </div>
  )
}

export default connectFromRoute(sparqlConnect.NSIDetails(NSIDetails))
