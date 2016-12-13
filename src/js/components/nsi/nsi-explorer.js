import React from 'react'
import { LOADED } from 'sparql-connect'
import { sparqlConnect } from '../../sparql/configure-sparql'
import NSIList from './nsi-list'

function NSIExplorer({ loaded, nsis }) {
  if (loaded !== LOADED) return <span>Loading NSI list...</span>
  return(
    <div>
      <NSIList nsis={nsis}/>
    </div>
  )
}

export default sparqlConnect.NSIList(NSIExplorer);
