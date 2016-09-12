/**
 * Builds the query that retrieve the list of all classifications.
 */
const classifications = () => `
  PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#>
  PREFIX skos:<http://www.w3.org/2004/02/skos/core#>
  SELECT ?classification ?label WHERE {
    ?classification rdf:type skos:ConceptScheme ; 
                    skos:prefLabel ?label .
  } 
 `

/**
 * Builds the query that gets the details about a classification.
 */
const classificationDetails = uri => `
  PREFIX dcterms: <http://purl.org/dc/terms/>
  PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
  SELECT ?label WHERE {
    <${uri}> skos:prefLabel ?label
  }
`
export default {
  classifications,
  classificationDetails
}