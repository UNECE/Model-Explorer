import { buildSparqlConnector } from 'sparql-connect'

export const {
  flush,
  sparqlCombine,
  sparqlConnect,
  mainReducer,
  setFetchQuery
} = buildSparqlConnector()
