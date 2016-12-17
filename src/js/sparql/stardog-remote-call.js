//Stardog HTTP API documentation: http://docs.stardog.apiary.io/#
import fetch from 'isomorphic-fetch'
import P from '../sparql/prefixes'
import { parse } from '../utils/sparql-parser/index'

const bodyFromSparql = query =>
  encodeURIComponent('query') + '=' +
  encodeURIComponent(query)

const buildPrefix = (name, uri) => `PREFIX ${name}: <${uri}>`

/**
 * Parse a sparql query and try to fix missing prefixes
 *
 * If the query is valid, it returns the initial query.
 * If the syntax is correct but some prefixes are missing, it will try to fix
 * missing prefixes by looking up in `knownPrefixes`
 * If there's an issue with the syntax or if it was not able to fix missing
 * prefixes, it will throw an error.
 * 
 * @param  {string} query         sparql query
 * @param  {object} knownPrefixes an object with prefix as key an related url
 *                                as value
 * @return {string}       sparql query
 */
function parseQuery(query, knownPrefixes) {
  //for missing prefixes that have been defined locally, we will add then
  //to the query
  const { missingPrefixes } = parse(query)
  
  if (missingPrefixes.length === 0) return query
  const found = [], notFound = []
  missingPrefixes.forEach(p => {
    knownPrefixes.hasOwnProperty(p) ? 
      found.push([p, knownPrefixes[p]]) : notFound.push(p) 
  })
  if ((notFound.length) > 0) throw new Error(
    `Some prefixes (${notFound.join(',')}) are missing in \n\`${query}\``
  )
  //we add missing prefixes which are found in `prefixes.js`
  const buildQuery = found.map(([name, uri]) => buildPrefix(name, uri))
  buildQuery.push(query)
  return buildQuery.join('\n')
}

function processQuery(query) {
  //Safety check: if we don't set the query params properly, or if the
  //connected component does not receive the expected props, we might find
  //`undefined` somewhere in the query.
  if (query.includes('undefined')) console.warn(
    'One query refers to `undefied`, there might be an issue ' +
    'with query parameters configuration or with the component props. ' +
    `Query: \n${query}`
  )
  //we check the query syntax and add missing prefix that have been defined
  //locally
  let parsedQuery
  try {
    parsedQuery = parseQuery(query, P)
  }
  catch (err) {
    throw new Error(
      `Invalid query ${err} in ${query}`
    )
  }
  return parsedQuery
}

export default (queryURL, authorization) => query =>
  fetch(queryURL, {
    method: 'POST',
    headers: {
      'Authorization': authorization,
      'Accept': 'application/sparql-results+json',
      // We need to pass some `x-www-form-urlencoded` data. `multipart/form-data`
      // created with `new FormData()` does not work.
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: bodyFromSparql(processQuery(query))
  })
  .then(res => res.json())

