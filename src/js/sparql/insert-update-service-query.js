import P from './prefixes'

//IMPORTANT: when we update a service, we first clear the graph, that means that
//afterwards, the graph will consist only of the data handled by the ui. This is
//OK for now because we expose all the data constituent of a graph in the UI,
//but it will no be satisfactory if we manually add some data.

/**
 * Escape line breaks to embed a string in a sparql query
 */
function escapeLinebreaks(str) {
  return str.replace(/\n/g, '\\n')
}

/* Create a new service. This query is not intended to be used with 
   sparqlConnect.
*/
export const insertUpdateService = ({ 
    graphName, service, label, subs, inputs, outputs, builderOrg,
    description, restrictions, outcomes }, update = false ) => {
  
  const _description = escapeLinebreaks(description)
  const _restrictions = escapeLinebreaks(restrictions)
  const _outcomes = escapeLinebreaks(outcomes)
  
  const clearGraphIfNeeded = update ? `CLEAR GRAPH <${graphName}>;` : ''
  const GSIMInTriples = 
    inputs.length === 0 ?
      '' :
` ;
cspa:definitionHasInput [
    a cspa:DefinitionInput ; 
    ${
      inputs.map(GSIMClass =>
        `cspa:gsimInput <${GSIMClass}>`
      ).join(' ;')
    }
  ]`
  
  const GSIMOutTriples = 
    outputs.length === 0 ?
      '' :
` ;
cspa:definitionHasOutput [
    a cspa:DefinitionOutput ; 
    ${
      outputs.map(GSIMClass =>
        `cspa:gsimOutput <${GSIMClass}>`
      ).join(' ;')
    }
  ]`
  
  const GSBPMSubTriples = 
    subs.length === 0 ?
      '' : 
      //should start with `;` which goes at the end of the previous line
      '; ' + subs.map(sub =>
          `cspa:gsbpmSubProcess <${sub}>`
        ).join(' ;')
  
  const query = `
PREFIX cspa:    <${P.cspa}>
PREFIX gsbpm:   <${P.gsbpm}>
PREFIX gsim:    <${P.gsim}>
PREFIX service: <${P.service}>
PREFIX nsi:     <${P.nsi}>

${clearGraphIfNeeded}

INSERT DATA {
  GRAPH <${graphName}> {
    <${service}>
      a cspa:package ; 
      cspa:label "${label}" ; 
      cspa:hasPackageDefinition [
        a cspa:ServiceDefinition ; 
        cspa:aimsAt [
          a cspa:BusinessFuncion ;
          cspa:description "${_description}" ;
          cspa:outcomes "${_outcomes}" ;
          cspa:restrictions "${_restrictions}"
          ${GSBPMSubTriples}
        ]
        ${GSIMInTriples}
        ${GSIMOutTriples}
      ] ;
      cspa:hasPackageImplementation [
        a cspa:ServiceImplementationDescription;
        cspa:comesFrom [
          a cspa:Provenance; 
          cspa:builderOrganization [
            a cspa:Organization;
            cspa:organization <${builderOrg}>
          ]
        ]
      ]
    }
}`
  return {
    query,
    serviceURI: service
  }
}