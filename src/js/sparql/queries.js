import {
  SKOSPrefix, ORGPrefix, GSBPMPrefix, GSIMPrefix, RDFSPrefix, CSPAPrefix
} from './prefixes'


//TODO we might need to filter on the language, but for now english seems to be
//the only language available

/**
 * Builds the query that retrieves the list of NSIs
 */
const NSIList = () => `
  PREFIX org: <${ORGPrefix}>
  PREFIX skos: <${SKOSPrefix}>

  SELECT ?nsi ?label

  WHERE {
    ?nsi a org:Organization ; skos:prefLabel ?label .
  }
  ORDER BY ?nsi
 `


/**
 * Builds the query that retrieve the GSBPM overlook
 */
const GSBPMDescription = () => `
  PREFIX gsbpm: <${GSBPMPrefix}>
  PREFIX skos:  <${SKOSPrefix}>
  SELECT ?phase ?phaseLabel ?subprocess ?subprocessLabel ?phaseCode
         ?subprocessCode
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
     ?phase skos:notation ?phaseCode
   }
   OPTIONAL {
     ?subprocess skos:notation ?subprocessCode
   }
  }
 `


const services = () => `
  PREFIX cspa:  <${CSPAPrefix}>
  PREFIX gsbpm: <${GSBPMPrefix}>
  PREFIX skos:  <${SKOSPrefix}>

  SELECT distinct ?service ?label
  WHERE {
    ?service a cspa:package .
    ?service cspa:label ?label
  }
`

const serviceDetails = service => `
  PREFIX cspa: <${CSPAPrefix}>
  PREFIX skos: <${SKOSPrefix}>

  SELECT ?label ?description ?outcomes ?subprocess ?restrictions ?serviceGraph
  WHERE {
    GRAPH ?serviceGraph {
      <${service}> cspa:hasPackageDefinition [
    	   a cspa:ServiceDefinition; cspa:aimsAt [ 
           cspa:description ?description ;
    	     cspa:outcomes ?outcomes ;
    	     cspa:gsbpmSubProcess ?subprocess ;
    	     cspa:restrictions ?restrictions ]] ;
    	 cspa:label ?label ;
    }
  }
`

//TODO investigate, we shouldn't need DISTINCT, should we ?
const serviceSubprocesses = service => `
  PREFIX cspa: <${CSPAPrefix}>
  PREFIX skos: <${SKOSPrefix}>

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
  PREFIX gsbpm: <${GSBPMPrefix}>
  PREFIX skos:  <${SKOSPrefix}>

  SELECT ?sub ?label ?code
  WHERE {
    ?sub a gsbpm:SubProcess ;
         skos:prefLabel ?label ;
         skos:notation ?code
  }
  ORDER BY ?code
`

const serviceInputs = service => `
  PREFIX cspa:  <${CSPAPrefix}>
  PREFIX gsbpm: <${GSBPMPrefix}>
  PREFIX gsim:  <${GSIMPrefix}>
  PREFIX rdfs:  <${RDFSPrefix}>

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
  PREFIX cspa:  <${CSPAPrefix}>
  PREFIX gsbpm: <${GSBPMPrefix}>
  PREFIX gsim:  <${GSIMPrefix}>
  PREFIX rdfs:  <${RDFSPrefix}>

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

const GSIMGroups = () => `
  PREFIX gsim: <${GSIMPrefix}>
  PREFIX rdfs: <${RDFSPrefix}>

  SELECT ?group ?label WHERE {
  	?group rdfs:subClassOf gsim:GSIMObject .
    ?group rdfs:label ?label
  }
`

/* Retrieve all GSIM classes for a group */
const GSIMClasses = group => `
  PREFIX gsim:  <${GSIMPrefix}>
  PREFIX skos:  <${SKOSPrefix}>

  SELECT ?GSIMClass ?label ?definition WHERE {
    ?GSIMClass rdfs:subClassOf <${group}> ;
               gsim:classDefinition ?definition ;
               rdfs:label ?label
  }
`

/* Retrieve all GSIM classes */
const GSIMAllClasses = () => `
  PREFIX gsim:  <${GSIMPrefix}>
  PREFIX skos:  <${SKOSPrefix}>

  SELECT ?GSIMClass ?label ?definition WHERE {
    ?GSIMClass rdfs:subClassOf ?group ;
               gsim:classDefinition ?definition ;
               rdfs:label ?label .
    ?group rdfs:subClassOf gsim:GSIMObject
  }
`

const gsimInputServices = gsimClass => `
  PREFIX cspa:  <${CSPAPrefix}>
  PREFIX gsbpm: <${GSBPMPrefix}>
  PREFIX gsim:  <${GSIMPrefix}>
  PREFIX rdfs:  <${RDFSPrefix}>

  SELECT DISTINCT ?service ?label
  WHERE {
    ?service a cspa:package ;
             cspa:label ?label ;
             cspa:hasPackageDefinition ?pckgDefinition .

    ?pckgDefinition cspa:definitionHasInput ?input .
    ?input cspa:gsimInput <${gsimClass}>
  }
`

const gsimOutputServices = gsimClass => `
  PREFIX cspa:  <${CSPAPrefix}>
  PREFIX gsbpm: <${GSBPMPrefix}>
  PREFIX gsim:  <${GSIMPrefix}>
  PREFIX rdfs:  <${RDFSPrefix}>

  SELECT DISTINCT ?service ?label
  WHERE {
    ?service a cspa:package ;
             cspa:label ?label ;
             cspa:hasPackageDefinition ?pckgDefinition .

    ?pckgDefinition cspa:definitionHasOutput ?input .
    ?input cspa:gsimOutput <${gsimClass}>
  }
`

const serviceBySubProcess = (subprocess) => `
  PREFIX gsbpm: <${GSBPMPrefix}>
  PREFIX skos:  <${SKOSPrefix}>
  PREFIX cspa:  <${CSPAPrefix}>

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
  gsimOutputServices,
  subprocesses,
  GSIMClasses,
  GSIMAllClasses,
  serviceBySubProcess,
  GSIMGroups
}
