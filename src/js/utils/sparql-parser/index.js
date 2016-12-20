import { Parser } from './sparql-parser'

const parser = new Parser()

/**
 * Parse a query and check its syntax, including missing prefixes
 *
 * It throws an error if it's not a valid sparql query. It returns an object
 * representing the query if the syntax is ok.
 *
 * Possible missing prefixes will be listed in `missingPrefixes` array
 *
 * @param  {string} query sparql query
 * @return {object}       javascript representation of the query
 */
export function parse(query) {
  //reset Parser properties
  //we want all prefixes to be explicit in the request sent to the server.
  Parser.prefixes = {}
  Parser.missingPrefixes = []
  return parser.parse(query)
}