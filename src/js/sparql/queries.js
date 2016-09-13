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
const GSIMgroups = () => `
  PREFIX gsim:<http://rdf.unece.org/models/gsim#>

  SELECT ?pack WHERE {
  	?pack rdfs:subClassOf gsim:GSIMObject
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


export default {
  GSBPMDescription,
  services,
  serviceDetails,
  serviceSubprocesses,
  serviceInputs,
  gsimInputServices
}
