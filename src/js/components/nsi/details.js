import React from 'react'
import { sparqlConnect } from '../../sparql/configure-sparql'
import { connectFromRoute } from '../../routes'
import ServicesByNSI from './services-by-nsi'
import P from '../../sparql/prefixes'

 /**
  * Builds the query that retrieves the details on a given NSI.
  */
const queryBuilder = nsi => `
   PREFIX org: <${P.ORG}>
   PREFIX skos: <${P.SKOS}>
   PREFIX vcard: <${P.VCARD}>

   SELECT ?name ?shortName ?address ?geo
   WHERE {
     <${nsi}> skos:prefLabel ?name .
     OPTIONAL {
       <${nsi}> skos:altLabel ?shortName .
     }
     OPTIONAL {
       <${nsi}> org:hasSite/org:siteAddress ?card .
       ?card vcard:street-address ?address ; vcard:hasGeo ?geo .
     }
   }
  `

const connector = sparqlConnect(queryBuilder, {
  queryName: 'NSIDetails'
})


function NSIDetails({ nsi, shortName, address, geo }) {
  var countryCode = nsi.slice(-2).toLowerCase()
  var flagClassName = `flag-icon flag-icon-${countryCode} large-flag`
  // Computes the OpenStreetMap URL corresponding to the coordinates (NB: 18 is
  // the zoom level)
  let osmURL
  if (geo) {
    const geoFormatted = geo.substring(4).replace(',', '/')
    osmURL = `http://www.openstreetmap.org/#map=18/${geoFormatted}`
  }

  return (
    <div>
      <span className={flagClassName}></span>
      <h1>name { shortName && ` ( ${shortName} )`}</h1>
      {address &&
        <div>
        {geo && (<a href={osmURL}><img src="/img/osm.png"/></a>)}
        <h2>{address}</h2>
        </div>
       }
       <ServicesByNSI nsi={nsi} />
    </div>
  )
}

export default connectFromRoute(connector(NSIDetails))
