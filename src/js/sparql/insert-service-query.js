import {
  SKOSPrefix, GSBPMPrefix, GSIMPrefix, RDFSPrefix, CSPAPrefix, servicePrefix
} from './prefixes'

/* Create a new service. This query is not intended to be used with 
   sparqlConnect.
*/
export const insertService = ({ 
    label, GSBPMSub, GSIMIn, GSIMOut,
    description, restrictions, outcomes }) => {
  
  //TODO add upper case at the beginning of each word
  //TODO replace special characters
  const name = 'sprinttest' + label.replace(/\s*/g, '')

  const GSIMInTriples = GSIMIn.map(GSIMClass =>
    `cspa:gsimInput <${GSIMClass}>`
  ).join(' ;')
  
  const GSIMOutTriples = GSIMOut.map(GSIMClass =>
    `cspa:gsimOutput <${GSIMClass}>`
  ).join(' ;')
  
  const GSBPMSubTriples = GSBPMSub.map(sub =>
    `cspa:gsbpmSubProcess <${sub}>`
  ).join(' ;')
  
  const query = `
PREFIX cspa:    <${CSPAPrefix}>
PREFIX gsbpm:   <${GSBPMPrefix}>
PREFIX gsim:    <${GSIMPrefix}>
PREFIX service: <${servicePrefix}>

INSERT DATA { 
  service:${name}
    a cspa:package ; 
    cspa:label "${label}" ; 
    cspa:hasPackageDefinition [
      a cspa:ServiceDefinition ; 
      cspa:aimsAt [
        a cspa:BusinessFuncion ;
        cspa:description "${description}" ;
        cspa:outcomes "${outcomes}" ;
        cspa:restrictions "${restrictions}" ;
        ${GSBPMSubTriples}
      ] ;
      cspa:definitionHasInput [
        a cspa:DefinitionInput ; 
        ${GSIMInTriples}
      ] ;
      cspa:definitionHasOutput [
        a cspa:DefinitionOutput ;
        ${GSIMOutTriples}
      ]
    ]
}`
  return {
    query,
    serviceURI: `${servicePrefix}${name}`
  }
}