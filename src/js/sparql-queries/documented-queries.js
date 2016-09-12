import queries from './queries'

const {
  classifications,
  classificationDetails
} = queries

export default {
  classifications: {
    descr: 'Retrieve all the classifications',
    //a component connected to this query will receive `classifications` in
    //its props; `classifications` will be an array with the results of the
    //query; each row in this array will be an object with two properties (see
    //below)
    whatWeGet: 'classifications',
    //describe a row in the result set; each row in the results will be an
    //object with two properties: `classification` and `label`; it should match 
    //variable names in the sparql-query (not all the variables in the query
    //need to be represented here, only the one we interested in).
    results: {
      classification: 'classification (uri)',
      label: 'classification label'
    },
    //the query takes no param, that means we do not have expectation on what
    //the components props contain (it is because the sparql query does not
    //need any param)
    params: [],
    //reference the query builder function
    queryBuilder: classifications
  },
  classificationDetails: {
    descr: 'Retrieve details (depth and label) for a given classification',
    //`singleResult` is set to true: 
    //- an error will be raised if there is no result or more than one result
    //- results will be an object with the variable names described in
    //`results` as properties; no need for `whatWeGet`
    singleResult: true,
    //the query takes one param; we give it the name `classification`; that
    //means that a component connected to this query will have to be passed
    //a prop with the prop name `classification`.
    params: [{
      name: 'classification',
      descr: 'classification (uri)'
    }],
    results: {
      label: 'classification label (string)',
    },
    queryBuilder: classificationDetails
  }
}
