import React from 'react'
import { Link } from 'react-router'
import { uriToLink } from '../../routes'
import { sparqlConnect} from '../../sparql/configure-sparql'

function GSBPMSubprocesses({ subprocesses }) {
  
  return(
    <div className="list-group">
      { subprocesses.map(({ subprocess, label }) =>
        <Link key={subprocess} to={uriToLink.GSBPMSubProcessDetails(subprocess)}
          className="list-group-item" title={label}>
          { label }
        </Link>)
       }
    </div>
  )
}

export default sparqlConnect.SubsByGSBPMPhase(GSBPMSubprocesses, {
  loading: () => <span>loading subprocesses</span>
})  