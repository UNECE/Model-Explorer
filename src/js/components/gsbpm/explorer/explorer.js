import React from 'react'
import { sparqlConnect } from 'sparql-connect'
import { groupByWithOrder } from '../../../utils/group-by'
import GSBPMPhase from './phase-pres'

/**
 * Builds the query that retrieves the GSBPM overview.
 */
const queryBuilder = () => `
  SELECT ?phase ?phaseLabel ?subprocess ?subprocessLabel ?phaseCode
         ?subprocessCode ?subprocessDefinition
  WHERE {
   ?phase a gsbpm:Phase ;
          skos:narrower ?subprocess ;
   OPTIONAL {
     ?phase skos:prefLabel ?phaseLabel
   }
   OPTIONAL {
     ?subprocess skos:prefLabel ?subprocessLabel
   }
   OPTIONAL {
     ?subprocess skos:definition ?subprocessDefinition
   }
   OPTIONAL {
     ?phase skos:notation ?phaseCode
   }
   OPTIONAL {
     ?subprocess skos:notation ?subprocessCode
   }
  }
`
const connector = sparqlConnect(queryBuilder, {
  queryName: 'GSBPMPhaseList'
})

/**
* Returns the HTML code for the overall GSBPM layout.
*/
function GSBPMExplorer({ GSBPMPhaseList }) {
  const refinedPhases = groupByWithOrder(
    GSBPMPhaseList, 'phase', ['phaseCode'], 'phaseLabel', 'phaseCode')
  return(
    <div className="gsbpm">
      <div className="title cell">
        Quality management / Metadata management
      </div>
      <div className="phases">
        {refinedPhases.map(
          ({ id, props, entries }) => 
            <GSBPMPhase
                key={id}
                id={id} 
                phaseLabel={props.phaseLabel} 
                entries={entries} />
          )
        }
      </div>
      );
    </div>
  );
}

export default connector(GSBPMExplorer, {
  loading: () => <span>Loading GSBPM explorer</span>
})