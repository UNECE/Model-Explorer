import React from 'react'
import { sparqlConnect } from '../sparql/configure-sparql'
import { LOADING, LOADED, FAILED } from 'sparql-connect'
import { groupBy } from '../utils/group-by'
import GSBPMSubprocess from './gsbpm-subprocess'

//FIXME temporary data structure use for mocking
const _phases = {
  'http:// phase1': {
    props: { phaseLabel: 'This is the phase 1 of the GSBPM' },
    entries: [
      {
        subprocess: 'http://subprocess11',
        subprocessLabel: 'This is the subprocess 11'}
    ]
  },
  'http://phase2' :{
    props: { phaseLabel: 'This is the phase 2 of the GSBPM' },
    entries: [
      {
        subprocess: 'http://subprocess21',
        subprocessLabel: 'This is the subprocess 21'
      }
    ]
  }
}

function GSBPMExplorer({ loaded, phases }) {
  if(loaded !== LOADED) {
    return <p>LOADING...</p>
  }
  const refinedPhases = groupBy(phases, 'phase', 'phaseLabel')
  console.dir(refinedPhases)
  return (
    <ul>
      { Object.keys(refinedPhases).map((i) =>
        <li key={i}>
          {i} - {refinedPhases[i].props.phaseLabel}
          <ul>
          { refinedPhases[i].entries.map((sp) =>
            <li key={sp.subprocess}>
              <GSBPMSubprocess
                id={sp.subprocess}
                label={sp.subprocessLabel} />
            </li>
          )}
          </ul>
        </li>
      )}
    </ul>
  );
}

export default sparqlConnect.GSBPMDescription(GSBPMExplorer);
