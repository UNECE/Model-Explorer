/**
  Returns the query to remove a service.
  
  Is is not supposed to be used with `sparql-connect`
**/
export const removeServiceQuery = serviceGraph => `DROP GRAPH <${serviceGraph}>`