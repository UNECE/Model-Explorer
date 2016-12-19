import { insertService } from '../sparql/insert-service-query'
import { removeServiceQuery } from '../sparql/remove-service-query'

//TODO improve, update helpers should be included in sparql-connect
//At initialization, `fetchQuery` is not available since we need the
//authentication token first (which will be set within the `authentication`
//module).
const fetchQueryHolder = {
  fetchQuery: null
}

export const setFetchQueryUpdate = fetchQuery =>
  fetchQueryHolder.fetchQuery = fetchQuery

export function createService(descr) {
  const { query, serviceURI } = insertService(descr)
  return fetchQueryHolder.fetchQuery(query)
          .then(() => serviceURI)
 }

export function removeService(serviceGraph) {
  return fetchQueryHolder.fetchQuery(removeServiceQuery(serviceGraph))
}