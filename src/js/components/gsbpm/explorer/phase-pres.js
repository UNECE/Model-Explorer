import React from 'react'
import { linkGSBPMPhase } from '../routes'
import { Link } from 'react-router'
import GSBPMSubprocessList from './subs-list-pres'


/**
* Returns the HTML code for a GSBPM phase and its subprocesses.
*/
export default function GSBPMPhase({ id, phaseLabel, entries }) {
  return(
    <div className="phase">
      <div className="cell title">
        <Link to={linkGSBPMPhase(id)} >
          <div>{phaseLabel}</div>
        </Link>
      </div>
      <GSBPMSubprocessList entries={entries}/>
    </div>
  );
}


