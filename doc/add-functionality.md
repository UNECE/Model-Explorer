# How to add a new functionality

Let's go back in time and add a (now existing) way to navigate through our data. We'll let out users explore the different organizations (NSIs), and for each organization, we'll show some details about it (for instance a list of all the services this organization is involved in).

## Add a default route for this new functionality

First, we need to create a new folder named `nsis` in [src/js/components](../src/js/components), with one file named `routes.js`. We'll start with a very simple route definition. 

```javascript
import { Route } from 'react-router'

//This component will stay in its own file, we'll work on it later
function NSIList() {
  return (
    <div>
      List of NSIs goes here
    </div>
  )
}

export default (
  <Route path="nsis" component={NSIList} />
)
```
See [how to define routes](./routes.md) for more information.

Then, we'll modify the main routes of our application [src/js/components/routes.js](../src/js/components/routes.js) to reference this new route (we add `NSIRoute` below other route definitions).

```javascript
(...)
import NSIRoute from './nsis/routes'
(...)

export default (
  <Route>
   (...)
   { NSIRoute }
  </Route>
)
```

We can now navigate to `http://localhost:8080/nsis` and we should see our default `NSIList` component.

## Add some logic to our main component

We'll move our `NSIList` component in its own file `src/js/components/nsis/list.js` and add some logic to it. For this, we will connect it to a `sparql` query, see [how to connect a component to a query](./sparql.md) for more information on this.

```javascript
import { sparqlConnect } from 'sparql-connect' 

const query = 'SELECT ?nsi ?label ...' //select all NSIs

const connector = sparqlConnect(query, {
  queryName: 'nsis'
})

function NSIList({ nsis }) {
  return (
    <div>
      {
        roles.map(({ nsi, label }) => 
          <div>NSI { label } - { nsi }/div>
        )
      }
    </div>
  )
}

export default connector(NSIList)
```

## Create a new route to show some details about a given NSI

In `src/js/components/nsis/routes.js`, we'll add a new route for the details. Since we would like the role list to stay the default component if a route starts with `/nsis/` but does not match any real route definition, we will switch it to `IndexRoute`. Our route definitions look like this:

```javascript
import { Route, IndexRoute } from 'react-router'
import NSIList from './list'

//We'll work on it later. 
function NSIDetails({ nsi }) {
  return (
    <div>
      Details about { nsi }
    </div>
  )
}

export default (
  <Route path="/nsis">
    <IndexRoute component="NSIList">
    <Route path=":nsi" component="NSIDetails" />
  </Route>
)
```

We can now navigate to `http://localhost:8080/nsis/fr` and we will see:
```html
<div>
  Details about fr
</div>
```

## Improve details

We'll put `NSIDetails` in its own file `src/js/components/nsis/details.js`, and connect it to a query.

```javascript
import { sparqlConnect } from 'sparql-connect'

const query = nsi => `
  SELECT ?name
  WHERE {
    <${nsi}> skos:prefLabel ?name ...
  }
`

const connector = sparqlConnect(query, {
  queryName: 'NSIDetails',
  params: ['nsi'],
  singleResult: true
})

function NSIDetails({ nsi, name }) {
  return (
    <span>NSI { name } - { nsi }</span>
  )
}

export default connector(NSIDetails)
```

We make `src/js/components/nsis/routes.js` reference this component, and we navigate to `http://localhost:8080/nsis/fr` and **it does not work**. Why ? 

Firstly, because we mistakenly supposed our `NSIDetails` component will be passed a prop named `nsi`. In this situation, `react-router` does not give it a prop name `nsi`, but a prop named `routeParams` in which there will be an entry called `nsi`. We could try to fix it with something like this to extract `nsi` from `routeParams`

```javascript
function NSIDetailsContainer({ routeParams }) {
  const nsi = routeParams.nsi
  return <NSIDetails nsi={nsi} />
}
```

It will still be not working, this time because the query will return no result. Why ? Because we passed our component a prop called `nsi` with the value `fr`. The `sparqlConnect` mechanism used this value to send a query about `fr`. But `fr` is a short identifier which works well to show in our navigation bar which NSI we are dealing with, but when we pass it to the query, it does match any existing resource.

That's what the prop "transform" in the route definition can be used for. We'll update our route to:

```javascript
export default (
  <Route path="/nsis">
    <IndexRoute component="NSIList">
    <Route path=":nsi" component="NSIDetails"
      transform="http://id.unece.org/nsi/:nsi" />
  </Route>
)
```

This will have two consequences:
- `NSIDetails` will be passed a prop called `nsi` (in place of `routeParams.nsi`) ;
- this prop will value to `http://id.unece.org/nsi/fr` instead of `fr`.

## How to link to a given NSI

We've just seen that when the URL looks like `http://localhost:8080/nsis/fr`, the application shows details about `http://id.unece.org/nsi/fr`. When other components want to add a link to the details about one NSI, the information they have is the full URI `http://id.unece.org/nsi/fr`, not the short name `fr`. So we need a mechanism to transform full URIs into short names. That's what the `transform` utility in [src/js/utils/router-ampping](../src/js/utils/router-mapping.js) provides. We should then add some useful exports to our route definitions, so other components know how to link to the NSI details page.

```javascript

import { transform } from '../../utils/router-mapping'

export const linkNSI = transform(
  'http://id.unece.org/nsi/:nsi',
  '/nsis/:nsi'
)
export default (
  <Route path="/nsis">
  (...)
  </Route>
)
```