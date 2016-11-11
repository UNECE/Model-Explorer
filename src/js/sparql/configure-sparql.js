import queries from './documented-queries'
import { buildSparqlConnector } from 'sparql-connect'

export const {
  sparqlConnect, 
  mainReducer,
  setFetchQuery
} = buildSparqlConnector(queries)
