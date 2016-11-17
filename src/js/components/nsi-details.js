import React, { PropTypes } from 'react'
import { sparqlConnect } from '../sparql/configure-sparql'
import { connectFromRoute } from '../routes'
import { LOADED } from 'sparql-connect'

function NSIDetails({ nsi, loaded, name, shortName, address, geo }) {
  if (loaded !== LOADED) return <span>Loading...</span>
  var countryCode = nsi.slice(-2);
  var flagClassName = "flag-icon flag-icon-" + countryCode.toLowerCase() + " large-flag";
  // Computes the OpenStreetMap URL corresponding to the coordinates (NB: 18 is the zoom level)
  var osmURL = (geo) ? 'http://www.openstreetmap.org/#map=18/' + geo.substring(4).replace(',', '/') : '';
  var osmLink = (address && geo) ? '<a href="' + osmURL + '"><img src="../src/img/osm.svg"/></a>' : '';

  return (
    <div>
      <span className={flagClassName}></span>
      <h1>{name + ((shortName) ? ' (' + shortName + ')' : '')}</h1>
      <h2>{address}</h2>
      <p>{osmLink}</p>
    </div>
  )
}

export default connectFromRoute(sparqlConnect.NSIDetails(NSIDetails))
