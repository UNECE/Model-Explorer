import React from 'react'
import { LOADED } from 'sparql-connect'
import { sparqlConnect } from '../sparql/configure-sparql'

function NSIExplorer({ loaded, nsis }) {
  if (loaded !== LOADED) return <span>Loading NSI list...</span>
  return(
    <div className="nsi-explorer">
      <p>List of NSIs loaded</p>
    </div>
  )
}

export default sparqlConnect.NSIList(NSIExplorer);
