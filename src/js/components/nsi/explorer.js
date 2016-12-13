import React from 'react'
import { sparqlConnect } from '../../sparql/configure-sparql'
import NSIList from './list'

function NSIExplorer({ nsis }) {
  return(
    <div>
      <NSIList nsis={nsis}/>
    </div>
  )
}

export default sparqlConnect.NSIList(NSIExplorer, {
  loading: () => <span>Loading NSI list...</span>
});
