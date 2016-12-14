import React from 'react'
import { uriToLink } from '../../routes'
import { Link } from 'react-router'
import { sparqlConnect } from '../../sparql/configure-sparql'
import GSBPMSubprocess from './sub'
import { groupByWithOrder } from '../../utils/group-by'


/**
* Returns the HTML code for the GSBPM subprocesses of a given phase.
*/
function GSBPMSubprocessList({entries}) {
  //TODO make a utility function for sorting by key
  return(
    <div className="subprocesses">
      <ul>
        {
          entries
            .sort((a, b) => {
              const left = a.subprocessCode
              const right = b.subprocessCode
              return right < left ? 1 :
                     right === left ? 0 :
                     -1
            })
            .map(({subprocess, subprocessCode, subprocessLabel, prefLabel, subprocessDefinition}) =>
              <li key={subprocess}>
                <GSBPMSubprocess subprocess={subprocess} code={subprocessCode} label={subprocessLabel} prefLabel={prefLabel} definition={subprocessDefinition} active={true}/>
              </li>
            )
        }
      </ul>
    </div>
  );
}




