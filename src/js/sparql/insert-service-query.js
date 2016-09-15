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
  const serviceURI = `${servicePrefix}${name}`
  //We generate URIs where we could have use blank nodes since we didn't manage
  //to insert multiple blank nodes in an INSERT query
  const pckgDefURI = serviceURI + '_packageDefinition'
  const aimsAtURI = serviceURI + '_aimsAt'
  const inURI = serviceURI + '_in'
  const outURI = serviceURI + '_out'
       
  const GSIMInStmts = GSIMIn.map(GSIMClass => `
    <${inURI}>
       a cspa:DefinitionInput ; 
       cspa:gsimInput <${GSIMClass}> .
  `).join('\n')
  
  const GSIMOutStmts = GSIMOut.map(GSIMClass => `
    <${outURI}>
       a cspa:DefinitionOutput ; 
       cspa:gsimOutput <${GSIMClass}> .
  `).join('\n')
  
  const query = `
    PREFIX cspa: <${CSPAPrefix}>
    PREFIX gsbpm: <${GSBPMPrefix}>
    PREFIX gsim: <${GSIMPrefix}>

    INSERT DATA { 
      <${serviceURI}> a cspa:package ; 
               cspa:label "${label}" ; 
               cspa:hasPackageDefinition <${pckgDefURI}> . 

      <${pckgDefURI}> a cspa:ServiceDefinition ; 
           cspa:aimsAt <${aimsAtURI}> ; 
           cspa:definitionHasInput <${inURI}> ; 
           cspa:definitionHasOutput <${outURI}> . 

      <${aimsAtURI}>
          a cspa:BusinessFuncion ;
           cspa:description "${description}" ;
           cspa:outcomes "${outcomes}" ;
           cspa:gsbpmSubProcess <${GSBPMSub}> ;
           cspa:restrictions "${restrictions}" .

      ${GSIMInStmts}
      ${GSIMOutStmts}
    }
  `
  return {
    query,
    serviceURI
  }
}