import React from 'react'
import { sparqlConnect } from '../sparql/configure-sparql'
import { Link } from 'react-router'
import { uriToLink } from '../routes'
import { LOADED } from 'sparql-connect'

function Classifications({ loaded, classifications }) {
  if (loaded !== LOADED) return <span>classifications are loading</span>
  return (
    <ul>
      { classifications.map(({ classification, label }) =>
          <li key={classification}>
            <Link to={uriToLink.classificationDetails(classification)}>
              { label }
            </Link>
          </li>    
      )}
    </ul>
  )
}

export default sparqlConnect.classifications(Classifications)