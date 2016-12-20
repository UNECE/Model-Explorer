import { insertUpdateService } from '../sparql/insert-update-service-query'
import { removeServiceQuery } from '../sparql/remove-service-query'

//At initialization, `fetchQuery` is not available since we need the
//authentication token first (which will be set within the `authentication`
//module). We create a placeholder for the `fetchQuery` function and we export
//`setFetchQuery` to change the value of `fetchQuery` (it will be used by the
//`authentication` module once the user is authenticated).
let fetchQuery = null

export const setFetchQueryUpdate = fn => fetchQuery = fn

export function createService(descr) {
  const { query, serviceURI } = insertUpdateService(descr)
  return fetchQuery(query)
          .then(() => serviceURI)
}
 
export function updateService(descr) {
  const { query, serviceURI } = insertUpdateService(descr, true)
  return fetchQuery(query)
    .then(() => serviceURI)
}

export function removeService(serviceGraph) {
  return fetchQuery(removeServiceQuery(serviceGraph))
}