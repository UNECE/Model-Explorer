# Javascript related information

This file does not intend to provide an extensive presentation of all the javascript background needed to start coding the application, but it rather tries to give the minimal information and some external references to avoid confusing the developer who would not be familiar with some features of the language.

## Destructuring

[Destructuring assignments](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) allow to extract some information from an object or an array. They look like this:

```javascript
const person = { firstname: 'john', lastname: 'doe' }
const { firstname, lastname } = person
console.log(firstname) // 'john'
console.log(lastname) // 'doe'
```

This approach can be used for destructuring function arguements. We use them a lot when defining `React` components:

```javascript
function ServicesList({ results }) {
  return (...)
}
```

A `React` component will be given some props by its parent. In this example, the props are supposed to contain a prop called `results`. This code is equivalent to:

```javascript
function ServicesList(props) {
  let results = props.results
  (...)
}
```

Destructuring assignments are also frequently used to process the results of a query:
```javascript
function ServiceList({ results })
  return(
    <div>
      { results.map(({ service, label, description }) =>
        <span>Service: {service} - {label} - {description}</span>
       }
    </div>
  )
}
```
In this example, each item within `results` is expected to be an object with at least three properties: `service`, `label` and `description`.

## Arrow functions

[Arrow functions](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions) are a short and convenient way to write small anonymous functions. They look like this:

```javascript
const increment = a => a + 1
```

They are used extensively in this application, but the regular function expression `function () {}` is still preferred when the logic is not trivial.

## Template literals

[Template literals](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Template_literals) are convenient to describe strings that would be otherwise built by concatenating (`+`) multiple strings. There are use in particular to describe query builders:

```javascript
const serviceSubs = service => `
  SELECT DISTINCT ?sub ?label
  WHERE {
      <${service}>  cspa:hasPackageDefinition ?definition .
      ?definition cspa:aimsAt ?function .
      ?function  cspa:gsbpmSubProcess ?sub .
      ?sub       skos:prefLabel ?label
  }
`
```

Another advantage of template literals is that they allow to write multiline strings easily.

## Export and import

This application uses `export` and `import` ES6 statements. Some useful information about them can be found here [import](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Statements/import) and there [export](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Instructions/export).

Briefly, we can keep in mind that there are two kind of `export`(s): named exports and default exports. Both are used in this application.

Named exports follow one of these patterns:
```javascript
export const firstNameExport = ...
//or
export {
  secondNamedExport,
  thirdNamedExport
}
```

While default exports look like this:
```javascript
const mainPurposeOfThisFile = ...
export default mainPurposeOfThisFile
```

Imports of named exports use curly brackets to identify which exported variables should be imported.

```javascript
import { firstNameExport, secondNamedExport } from '...'
```

while default exports are imported with:
```javascript
import mainPurposeOfThisFile from '...'
```

When we import a default export, the name we give to the local variable does not need to match the name defined in the module. The code above could be re-written like this:

```javascript
import aRelevantName from '...'
```

### Components

Components live in their own file, so we use `export default` to expose them. There might be in the same file a generic definition of the component, what is sometimes called a [presentational component](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.sdajayptd), and a 'connected' component. Most of the time, only the 'connected' component will have a purpose for the outside world, so the export looks like this (see [src/js/components/nsi/details.js](../src/js/components/nsi/details.js)):
```javascript
function NSIDetails({ nsi, shortName, address, geo }) {
}

export default connector(NSIDetails)
```

If a presentational component is intended to be connected to multiple queries (see [src/js/components/shared/services-list.js](../src/js/components/shared/services-list.js)), a good practice is to let it stay in its own file, and then create one file for each connected component.

### Routes

The two kinds of exports can coexist in a same file. This approach is used for route definitions. The routes are exported as default,  because that's really what the file is about, but we also export utility functions related to these routes with named exports.

For instance, in [src/js/components/servies/routes.js](../src/js/components/servies/routes.js'):

```javascript
//utility function
export const linkService = transform(...)
)

export default (
  <Route>
    (...)
  </Route>
)
```

Imports will look like this:
```javascript
import { linkService } from '.../routes'
import routes from '.../routes'
```

## Function which return functions

It's a very common pattern in javascript, but it might be confusing for those who are not familiar with it. For instance, `sparqlConnect` is a function that returns a function that can be used to connect a component to a query:

```javascript
const connector = sparqlConnect(queryBuilder, {
  queryName: 'NSIDetails',
  params: ['nsi']
})
function NSIDetails(props) {
  return (...)
}

export default connector(NSIDetails)
```

