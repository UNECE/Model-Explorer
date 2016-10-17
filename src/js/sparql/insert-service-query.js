import {
  SKOSPrefix, GSBPMPrefix, GSIMPrefix, RDFSPrefix, CSPAPrefix, servicePrefix,
  CSPANamed
} from './prefixes'

/* Create a new service. This query is not intended to be used with 
   sparqlConnect.
*/
export const insertService = ({ 
    label, subs, inputs, outputs,
    description, restrictions, outcomes }) => {
  
  //TODO add upper case at the beginning of each word
  //TODO replace special characters
  const name = 'sprinttest' + label.replace(/\s*/g, '')

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
    inputs.length === 0 ?
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
PREFIX cspa:    <${CSPAPrefix}>
PREFIX gsbpm:   <${GSBPMPrefix}>
PREFIX gsim:    <${GSIMPrefix}>
PREFIX service: <${servicePrefix}>

INSERT DATA {
  GRAPH <${CSPANamed}${name}> {
    service:${name}
      a cspa:package ; 
      cspa:label "${label}" ; 
      cspa:hasPackageDefinition [
        a cspa:ServiceDefinition ; 
        cspa:aimsAt [
          a cspa:BusinessFuncion ;
          cspa:description "${description}" ;
          cspa:outcomes "${outcomes}" ;
          cspa:restrictions "${restrictions}"
          ${GSBPMSubTriples}
        ]
        ${GSIMInTriples}
        ${GSIMOutTriples}
      ]
    }
}`
  return {
    query,
    serviceURI: `${servicePrefix}${name}`
  }
}