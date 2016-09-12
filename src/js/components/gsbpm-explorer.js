import React from 'react'
import { sparqlConnect } from '../sparql/configure-sparql'

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
    props: { phaseLabel: 'This is the phase 1 of the GSBPM' },
    entries: [
      {
        subprocess: '',
        subprocessLabel: 'This is the subprocess 11'
      }
    ]
  }
}

function GSBPMExplorer({ loaded, phases }) {
  return (
    <ul>
      { Object.keys(_phases).map((i) =>
        <li key={i}>{i} - {_phases[i].props.phaseLabel}</li>
      )}
    </ul>
  );
}



export default sparqlConnect.GSBPMDescription(GSBPMExplorer);
