import React from 'react'
import { sparqlConnect } from '../sparql/configure-sparql'
import { LOADING, LOADED, FAILED } from 'sparql-connect'
import { groupByWithOrder } from '../utils/group-by'
import GSBPMSubprocess from './gsbpm-subprocess'

/**
* Returns the HTML code for the overall GSBPM layout.
*/
function GSBPMExplorer({loaded, phases, activeSubs}) {
  if (loaded !== LOADED) return <span>Loading GSBPM data...</span>
  const refinedPhases = groupByWithOrder(phases, 'phase', ['phaseCode'], 'phaseLabel', 'phaseCode')
  return(
    <div className="gsbpm">
      <div className="title cell">
        Quality management / Metadata management
      </div>
	    <GSBPMPhasesList refinedPhases={refinedPhases}/>
    </div>
  );
}

/**
* Returns the HTML code for the GSBPM phases.
*/
function GSBPMPhasesList({refinedPhases}) {
  return(
    <div className="phases">
		  {refinedPhases.map(
        ({ id, props, entries }) => <GSBPMPhase id={id}	phaseLabel={props.phaseLabel}	entries={entries}/>
		    )
		  }
    </div>
  );
}

/**
* Returns the HTML code for a GSBPM phase and its subprocesses.
*/
function GSBPMPhase({id, phaseLabel, entries}) {
  return(
    <div key={id} className="phase">
      <div className="cell title">
        {phaseLabel}
      </div>
      <GSBPMSubprocessList entries={entries}/>
    </div>
  );
}

/**
* Returns the HTML code for the GSBPM subprocesses of a given phase.
*/
function GSBPMSubprocessList({entries}) {
	return(
    <div className="subprocesses">
      <ul>
        {entries.sort((a, b) => {return a.subprocessCode > b.subprocessCode})
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

export default sparqlConnect.GSBPMDescription(GSBPMExplorer);
