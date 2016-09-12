import queries from './documented-queries'
import { buildSparqlConnector } from 'sparql-connect'
import credentials from '../credentials'
import config from '../config'
import buildFetch from '../utils/stardog-remote-call'

const { username, password } = credentials
const authorization = 'Basic ' + btoa(`${username}:${password}`)

const queryURL = config.queryURL

export const {
  sparqlConnect,
  mainReducer
} = buildSparqlConnector(queries, buildFetch(queryURL, authorization))
