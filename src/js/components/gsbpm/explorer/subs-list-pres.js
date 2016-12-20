import React from 'react'
import GSBPMSubprocess from './sub-pres'
import { sortByKeys } from '../../../utils/arrays'

/**
* Returns the HTML code for the GSBPM subprocesses of a given phase.
*/
export default function GSBPMSubprocessList({entries}) {
  //TODO make a utility function for sorting by key
  return(
    <div className="subprocesses">
      <ul>
        {
          sortByKeys(entries, 'subprocessCode')
            .map(({subprocess, subprocessCode, subprocessLabel, prefLabel, subprocessDefinition}) =>
              <li key={subprocess}>
                <GSBPMSubprocess subprocess={subprocess} code={subprocessCode} label={subprocessLabel} prefLabel={prefLabel} definition={subprocessDefinition} active={true}/>
              </li>
            )
        }
      </ul>
    </div>
  )
}
