//TODO we might need to filter on the language, but for now english seems to be
//the only language available
/**
 * Builds the query that retrieve the GSBPM overlook
 */
const GSBPMDescription = () => `
  PREFIX gsbpm: <http://rdf.unece.org/models/gsbpm#>
  PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
  select ?phase ?phaseLabel ?subprocess ?subprocessLabel ?phaseCode ?subprocessCode where {
   ?phase a gsbpm:Phase ;
          skos:narrower ?subprocess ;
   OPTIONAL {
     ?phase skos:prefLabel ?phaseLabel
   }
   OPTIONAL {
     ?subprocess skos:prefLabel ?subprocessLabel
   }
   OPTIONAL {
     ?phase skos:notation ?phaseCode
   }
   OPTIONAL {
     ?subprocess skos:notation ?subprocessCode
   }
  }
 `


const services = () => `
  PREFIX cspa:<http://rdf.unece.org/models/cspa#>
  PREFIX gsbpm: <http://rdf.unece.org/models/gsbpm#>
  PREFIX skos: <http://www.w3.org/2004/02/skos/core#>

  SELECT distinct ?service ?label
  WHERE { 
    ?service a cspa:package .
    ?service cspa:label ?label 
  }
`

const serviceDetails = service => `
  PREFIX cspa:<http://rdf.unece.org/models/cspa#>
  PREFIX skos: <http://www.w3.org/2004/02/skos/core#>

  SELECT ?label
  WHERE { 
      <${service}> cspa:label ?label
  }
`

//TODO investigate, we shouldn't need DISTINCT, should we ?
const serviceSubprocesses = service => `
  PREFIX cspa:<http://rdf.unece.org/models/cspa#>
  PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
  
  SELECT DISTINCT ?sub ?label
  WHERE { 
      <${service}>  cspa:hasPackageDefinition ?definition .
      ?defnition cspa:aimsAt ?function .
      ?function  cspa:gsbpmSubProcess ?sub .
      ?sub       skos:prefLabel ?label
  }
`



export default {
  GSBPMDescription,
  services,
  serviceDetails,
  serviceSubprocesses
}
