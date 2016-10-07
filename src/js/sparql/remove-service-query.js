/* Create a new service. This query is not intended to be used with 
   sparqlConnect.
*/
export const removeServiceQuery = serviceGraph => `DROP GRAPH <${serviceGraph}>`