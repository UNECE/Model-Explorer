import React from 'react'
import { sparqlConnect } from '../sparql/configure-sparql'
import { LOADING, LOADED, FAILED } from 'sparql-connect'
import { groupByWithOrder } from '../utils/group-by'
import GSBPMSubprocess from './gsbpm-subprocess'

function GSBPMExplorer({ loaded, phases }) {
  if(loaded !== LOADED) {
    return <p>LOADING...</p>
  }
  const refinedPhases = groupByWithOrder(phases, 'phase', ['phaseCode'], 'phaseLabel', 'phaseCode')
  return (
    <div className="row">
      <h1>GSBPM Explorer</h1>
      { refinedPhases.map(({ id, props, entries }) =>
        <div className="col-md-1" key={id}>
          <div className="phases">{props.phaseLabel}</div>
          { entries
              .sort((a, b) => {
                return a.subprocessCode > b.subprocessCode
              })
              .map(({ subprocess, subprocessLabel}) =>
                <div className="subprocess" key={subprocess}>
                  <GSBPMSubprocess
                    id={subprocess}
                    label={subprocessLabel} />
                </div>
          )}
        </div>
      )}

  </div>
  );
}

export default sparqlConnect.GSBPMDescription(GSBPMExplorer);
