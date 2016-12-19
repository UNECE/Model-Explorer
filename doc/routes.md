# Routes

This application uses [react-router](https://github.com/ReactTraining/react-router) to mimic the behavior of traditional web applications where the different core functionalities are served by different pages. Hence, for instance, the URL in our browser will show `http://example.com/gsim/ProcessInputSpecification` when we're looking at the `ProcessInputSpecification` gsim class details, and will switch to `http://example.com/service/ConfidentializedAnalysis` if we look at the  `ConfidentializedAnalysis` service page details.

This mechanism is based on route definitions. In `react-router`, a route
definition looks like this:

```javascript
<Route path="service/:service" component={Service} />
```

Basically, it means that when the URL is `http://example.com/service/ConfidentializedAnalysis` we should show the `Service` component and provide it with a prop named `service` with `ConfidentializedAnalysis` as a value.

We can then link to this page with:

```javascript
<Link to="/service/ConfidentializedAnalysis">
  Show service details
</Link>
```

Route definitions can be split into multiple files, and composed in the same way as `React` components are. In this application, the main route is defined in `./src/js/components/routes`, and routes for each core functionality  are defined in a file called `routes.js` in the related folder (`gsbpm`, `gsim`, `nsis`, `services`)

## Make routes readable
  
Since we navigate trough resources which are identified by their URI, it is natural to use these URIs as identifiers in this application too. Yet, it is not convenient to embed whole URIs in the browser navigation bar. It would make it look like `http://example.com/service/http%3A%2F%2Funece.org%2Fservices%23ConfidentializedAnalysis`. To keep URLs readable, routes replace resources URIs by a short version of themselves (`ConfidentializedAnalysis` instead of the whole URI).
In order to make this work, we need to define some mappings between URIs and this short identifier so:
1. when we look at `http://example.com/service/ConfidentializedAnalysis` the application knows that the service identifier is `http://unece.org/services#ConfidentializedAnalysis` (not `ConfidentializedAnalysis`);
2. when we want to provide a link to this page, we can build this URL from the fully qualified URI: `http://unece.org/services#ConfidentializedAnalysis` should become something like `/service/ConfidentializedAnalysis`.

These bi-directional mappings are made of two parts. The `transform` property in a route definition allows to transform a short identifier to a URI. For instance:

```javascript
<Route 
  path="service/:service"
  component={Service}
  transform="http://unece.org/services#:service"/>
```
The application knows that it should use the `Service` component and provide it a prop named `service` that will be built by extracting the last segment of the URL (represented by `:service`) and embedding it in this pattern `http://unece.org/services#:service`.

Conversely, we can expose some functions that transform a resource identifier into a route URL. For instance:

```javascript
export const linkToService = transform(
  'http://unece.org/services#:service',
  '/service/:service'
)
```
can be used to build the URL from the service URI.

```javascript

<Link to={linkService('http://unece.org/services#ConfidentializedAnalysis')}>
  Show service details
</Link>
```
`linkToService('http://unece.org/services#ConfidentializedAnalysis')` will return `/service/ConfidentializedAnalysis`.

Remark: the `transform` prop added on route definition is not part of `react-router` API. It is added here as syntactic sugar. Under the hood, it will be transformed at the main route level by a `wrapRoute` function which processes routes and each time it encounters the `transform` property, wraps the component in a higher order component which extracts route parameters from the `routeParams` prop, and transforms them to build proper URIs.

