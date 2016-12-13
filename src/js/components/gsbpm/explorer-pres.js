import React from 'react'
import GSBPMPhasesList from './phase-list'

/**
* Returns the HTML code for the overall GSBPM layout.
*/
export default function GSBPMExplorer() {
  return(
    <div className="gsbpm">
      <div className="title cell">
        Quality management / Metadata management
      </div>
      <GSBPMPhasesList />
    </div>
  );
}

