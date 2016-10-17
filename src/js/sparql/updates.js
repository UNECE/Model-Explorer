import { fetchQuery } from './configure-sparql.js'
import { insertService } from '../sparql/insert-service-query'
import { removeServiceQuery } from '../sparql/remove-service-query'

//FIXME should be handled with action creators (but )

export function createService(descr) {
  const { query, serviceURI } = insertService(descr)
  return fetchQuery(query)
          .then(() => serviceURI)
 }

export function removeService(serviceGraph) {
  return fetchQuery(removeServiceQuery(serviceGraph))
}