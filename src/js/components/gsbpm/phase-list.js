import React from 'react'
import { uriToLink } from '../../routes'
import { Link } from 'react-router'
import { sparqlConnect } from '../../sparql/configure-sparql'
import GSBPMSubprocess from './sub'
import { groupByWithOrder } from '../../utils/group-by'

/**
* Returns the HTML code for a GSBPM phase and its subprocesses.
*/
function GSBPMPhase({id, phaseLabel, entries}) {
  return(
    <div className="phase">
      <div className="cell title">
        <Link to={uriToLink.GSBPMPhaseDetails(id)} >
          <div>{phaseLabel}</div>
        </Link>
      </div>
      <GSBPMSubprocessList entries={entries}/>
    </div>
  );
}

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

/**
* Returns the HTML code for the GSBPM phases.
*/
function GSBPMPhasesList({ phases }) {
  const refinedPhases = groupByWithOrder(phases, 'phase', ['phaseCode'], 'phaseLabel', 'phaseCode')
  return(
    <div className="phases">
      {refinedPhases.map(
        ({ id, props, entries }) => <GSBPMPhase
          key={id} id={id}  phaseLabel={props.phaseLabel}  entries={entries}/>
        )
      }
    </div>
  );
}

export default sparqlConnect.GSBPMDescription(GSBPMPhasesList, {
  loading: () => 
    <span>Loading GSBPM data...</span>
});


