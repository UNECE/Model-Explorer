//TODO we might need to filter on the language, but for now english seems to be
//the only language available
/**
 * Builds the query that retrieve the GSBPM overlook
 */
const GSBPMDescription = () => `
  PREFIX gsbpm: <http://rdf.unece.org/models/gsbpm#>
  PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
  select ?phase ?phaseLabel ?subprocess ?subprocessLabel where {
   ?phase a gsbpm:Phase ;
          skos:narrower ?subprocess ;
   OPTIONAL {
     ?phase skos:prefLabel ?phaseLabel
   }
   OPTIONAL {
     ?subprocess skos:prefLabel ?subprocessLabel
   }
  }
 `
 
export default {
  GSBPMDescription
}