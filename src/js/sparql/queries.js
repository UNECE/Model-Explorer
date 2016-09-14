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
      ?definition cspa:aimsAt ?function .
      ?function  cspa:gsbpmSubProcess ?sub .
      ?sub       skos:prefLabel ?label
  }
`

/* Retrieve all GSBPM subprocesses */
const subprocesses = () => `
  PREFIX gsbpm: <http://rdf.unece.org/models/gsbpm#>
  PREFIX skos: <http://www.w3.org/2004/02/skos/core#>

  SELECT ?sub ?label ?code
  WHERE {
    ?sub a gsbpm:SubProcess ;
         skos:prefLabel ?label ;
         skos:notation ?code
  }
  ORDER BY ?code
`

const serviceInputs = service => `
  PREFIX cspa:  <http://rdf.unece.org/models/cspa#>
  PREFIX gsbpm: <http://rdf.unece.org/models/gsbpm#>
  PREFIX gsim:  <http://rdf.unece.org/models/gsim#>
  PREFIX rdfs:  <http://www.w3.org/2000/01/rdf-schema#>

  SELECT DISTINCT ?gsimClass ?label ?definition
  WHERE {
      <${service}> a cspa:package ;
          cspa:label ?servicelabel ;
          cspa:hasPackageDefinition ?pckgDefinition .

      ?pckgDefinition
          cspa:definitionHasInput ?input .
      ?input cspa:gsimInput ?gsimClass .
      ?gsimClass rdfs:label ?label .
      ?gsimClass gsim:classDefinition ?definition
  }
`

const serviceOutputs = service => `
  PREFIX cspa:  <http://rdf.unece.org/models/cspa#>
  PREFIX gsbpm: <http://rdf.unece.org/models/gsbpm#>
  PREFIX gsim:  <http://rdf.unece.org/models/gsim#>
  PREFIX rdfs:  <http://www.w3.org/2000/01/rdf-schema#>

  SELECT DISTINCT ?gsimClass ?label ?definition
  WHERE {
      <${service}> a cspa:package ;
          cspa:label ?servicelabel ;
          cspa:hasPackageDefinition ?pckgDefinition .

      ?pckgDefinition
          cspa:definitionHasOutput ?input .
      ?input cspa:gsimOutput ?gsimClass .
      ?gsimClass rdfs:label ?label .
      ?gsimClass gsim:classDefinition ?definition
  }
`

const GSIMgroups = () => `
  PREFIX gsim:<http://rdf.unece.org/models/gsim#>
  PREFIX rdfs:<http://www.w3.org/2000/01/rdf-schema#>

  SELECT ?group ?label WHERE {
  	?group rdfs:subClassOf gsim:GSIMObject .
    ?group rdfs:label ?label
  }
`

/* Retrieve all GSIM classes */
const GSIMClasses = () => `
  PREFIX gsim:  <http://rdf.unece.org/models/gsim#>
  PREFIX skos: <http://www.w3.org/2004/02/skos/core#>

  SELECT ?GSIMClass ?label ?definition WHERE {
    ?GSIMClass rdfs:subClassOf gsim:Concepts ;
               gsim:classDefinition ?definition ;
               rdfs:label ?label
  }
`

const gsimInputServices = gsimClass => `
  PREFIX cspa:  <http://rdf.unece.org/models/cspa#>
  PREFIX gsbpm: <http://rdf.unece.org/models/gsbpm#>
  PREFIX gsim:  <http://rdf.unece.org/models/gsim#>
  PREFIX rdfs:  <http://www.w3.org/2000/01/rdf-schema#>

  SELECT DISTINCT ?service ?label
  WHERE {
    ?service a cspa:package ;
             cspa:label ?label ;
             cspa:hasPackageDefinition ?pckgDefinition .

    ?pckgDefinition cspa:definitionHasInput ?input .
    ?input cspa:gsimInput <${gsimClass}>
  }
`


const serviceBySubProcess = (subprocess) => `
  PREFIX gsbpm: <http://rdf.unece.org/models/gsbpm#>
  PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
  PREFIX cspa:<http://rdf.unece.org/models/cspa#>

  SELECT ?service ?label WHERE {
    ?function cspa:gsbpmSubProcess <${subprocess}> .
    ?definition cspa:aimsAt ?function .
    ?service cspa:hasPackageDefinition ?definition .
    ?service cspa:label ?label
  }
`

export default {
  GSBPMDescription,
  services,
  serviceDetails,
  serviceSubprocesses,
  serviceInputs,
  serviceOutputs,
  gsimInputServices,
  subprocesses,
  GSIMClasses,
  serviceBySubProcess,
  GSIMGroups
}
