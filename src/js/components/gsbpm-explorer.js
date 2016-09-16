import React from 'react'
import { sparqlConnect } from '../sparql/configure-sparql'
import { LOADING, LOADED, FAILED } from 'sparql-connect'
import { groupByWithOrder } from '../utils/group-by'
import GSBPMSubprocess from './gsbpm-subprocess'
import { browserHistory } from 'react-router'
import { uriToLink } from '../routes'

const select = subprocess => 
  browserHistory.push(uriToLink.serviceBySubProcess(subprocess))
  
function GSBPMExplorer({ loaded, phases }) {
  if(loaded !== LOADED) {
    return <p>LOADING...</p>
  }
  const refinedPhases = groupByWithOrder(
    phases, 'phase', ['phaseCode'], 'phaseLabel', 'phaseCode')
  return (
    <div className="gsbpm">
      <div className="title cell">
        Quality management / Metadata management
      </div>
      <div className="phases">
      { refinedPhases.map(({ id, props, entries }) =>
        <div className="phase">
          <div className="cell title">
            {props.phaseLabel}
          </div>
          <div className="subprocesses">
            <ul>
            { entries
              .sort((a, b) => {
                return a.subprocessCode > b.subprocessCode
              })
              .map(({ subprocess, subprocessCode, subprocessLabel}) =>
                <li className="subprocess cell"
                    key={subprocess}
                    onClick={() => select(subprocess)} >
                  <div>{subprocessCode}</div>
                  <div>{subprocessLabel}</div>
                </li> ) }
              </ul>
          </div>
        </div> ) }
      </div>
    </div>
  );
}

export default sparqlConnect.GSBPMDescription(GSBPMExplorer);
