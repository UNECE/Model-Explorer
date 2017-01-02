import { insertUpdateService } from '../sparql/insert-update-service-query'
import { removeServiceQuery } from '../sparql/remove-service-query'
import { getFetchQuery } from 'sparql-connect'

export function createService(descr) {
  const { query, serviceURI } = insertUpdateService(descr)
  const fetchQuery = getFetchQuery()
  return fetchQuery(query)
    .then(() => serviceURI)
}
 
export function updateService(descr) {
  const { query, serviceURI } = insertUpdateService(descr, true)
  const fetchQuery = getFetchQuery()
  return fetchQuery(query)
    .then(() => serviceURI)
}

export function removeService(serviceGraph) {
  const fetchQuery = getFetchQuery()
  return fetchQuery(removeServiceQuery(serviceGraph))
}