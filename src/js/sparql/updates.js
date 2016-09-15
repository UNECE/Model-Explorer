import { fetchQuery } from './configure-sparql.js'
import { insertService } from '../sparql/insert-service-query'

 export function createService(descr) {
   const { query, serviceURI } = insertService(descr)
   return fetchQuery(query)
            .then(() => serviceURI)
 }
  