import queries from './documented-queries'
import { buildSparqlConnector } from 'sparql-connect'
import credentials from '../credentials'
import config from '../config'
import buildFetch from './stardog-remote-call.js'

//We need a `fetchQuery` function that will send queries to the server and
//return the results.
//Here we need some extra configuration to use authentication and to point to
//the proper remote URL
const { username, password } = credentials
const authorization = 'Basic ' + btoa(`${username}:${password}`)
const queryURL = config.queryURL
const fetchQuery = buildFetch(queryURL, authorization)

export const {
  sparqlConnect,
  mainReducer
} = buildSparqlConnector(queries, fetchQuery)
