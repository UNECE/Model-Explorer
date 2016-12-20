import { insertUpdateService } from '../sparql/insert-update-service-query'
import { removeServiceQuery } from '../sparql/remove-service-query'
import { registerSetFetchQuery } from '../utils/authentication'

//At initialization, `fetchQuery` is not available since we need the
//authentication token first (which will be set within the `authentication`
//module). We create a placeholder for the `fetchQuery` function and we register
//a function to set `fetchQuery` when available (it will be called by the
//`authentication` module once the user is authenticated).
let fetchQuery = null
registerSetFetchQuery(fn => fetchQuery = fn)

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