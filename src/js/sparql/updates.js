import { fetchQuery } from './configure-sparql.js'

const servicePrefix = 'http://unece.org/services#'
const CSPAPrefix = 'http://rdf.unece.org/models/cspa#'
const RDFPrefix = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#'


const serviceURIFromLabel = label => {
  //TODO add upper case at the beginning of each word
  //TODO replace special characters
  const name = 'sprinttest' + label.replace(/\s*/g, '')
  return `${servicePrefix}${name}`
}

const queryInsertBuilderOld = (uri, label) => `
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX cspa: <http://rdf.unece.org/models/cspa#>
PREFIX gsim:  <http://rdf.unece.org/models/gsim#>

INSERT DATA {
  <${uri}> rdf:type cspa:package ;
           cspa:label "${label}" ;
           cspa:hasPackageDefinition _:b0 .
  _:b0     rdf:type cspa:ServiceDefinition ;
           cspa:aimsAt _:b1 ;
           cspa:definitionHasInput _:b2 ;
           cspa:definitionHasOutput _:b3 .
  _:b1     rdf:type cspa:BusinessFuncion .
  _:b2     rdf:type cspa:DefinitionInput ;
           cspa:gsimInput gsim:Variable .
  _:b3     rdf:type cspa:DefinitionInput ;
           cspa:gsimInput gsim:DataSet .
}
`

const queryInsertBuilder = ({ uri, label, GSBPMSub, GSIMIn, GSIMOut,
  description, restrictions, outcomes,
  uriPckgDef, uriAimsAt, uriIn, uriOut }) => `
  
PREFIX cspa: <http://rdf.unece.org/models/cspa#>
PREFIX gsbpm: <http://rdf.unece.org/models/gsbpm#>
PREFIX gsim: <http://rdf.unece.org/models/gsim#>

INSERT DATA { 
    <${uri}> a cspa:package ; 
             cspa:label "${label}" ; 
             cspa:hasPackageDefinition <${uriPckgDef}> . 

    <${uriPckgDef}> a cspa:ServiceDefinition ; 
         cspa:aimsAt <${uriAimsAt}> ; 
         cspa:definitionHasInput <${uriIn}> ; 
         cspa:definitionHasOutput <${uriOut}> . 

    <${uriAimsAt}>
        a cspa:BusinessFuncion ;
         cspa:description "${description}" ;
         cspa:outcomes "${outcomes}" ;
         cspa:gsbpmSubProcess <${GSBPMSub}> ;
         cspa:restrictions "${restrictions}" .

    <${uriIn}>
         a cspa:DefinitionInput ; 
         cspa:gsimInput <${GSIMIn}> .

   <${uriOut}>
        a cspa:definitionHasOutput ; 
        cspa:gsimOutput <${GSIMOut}> . 
}
`
/*
_:b3 a cspa:DefinitionInput ; 
     cspa:gsimInput <${GSIMOut}> .
 */
/*
Description: 
ConfidentializedAnalysis	 rdf:type	 http://rdf.unece.org/models/cspa#package
http://unece.org/services#ConfidentializedAnalysis	http://rdf.unece.org/models/cspa#hasPackageDefinition	_:bnode_d0531db0_730a_4bc9_a4f1_3b859424d49c_4085
http://unece.org/services#ConfidentializedAnalysis	 http://rdf.unece.org/models/cspa#label	Confidentialized Analysis
 */
 export function createService(descr) {
   const { label } = descr
   const uri = serviceURIFromLabel(label)
   const descrWithUri = {
     ...descr,
     outcomes: 'outcomes',
     description: 'description',
     restrictions: 'restrictions',
     uri,
     uriPckgDef: uri + '_packageDefinition',
     uriAimsAt: uri + '_aimsAt',
     uriIn: uri + '_in',
     uriOut: uri + '_out'
   }
   return fetchQuery(queryInsertBuilder(descrWithUri))
            .then(() => uri)
 }
  