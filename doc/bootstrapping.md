# Bootstrapping the application

The application starting point is `index.html`, which just loads the `js/model-explorer.js` script and declares an HTML `div` element.

The `model-explorer.js` script is a bundle produced by the build process from the different `javascript` files that constitute the source code. The entry point is `main.js`, which calls `ReactDOM.render` on the `Root` React component into the `div` element in `index.html`. The `Root` component only has a `render` method which returns a `Provider` component from [React Redux](https://github.com/reactjs/react-redux), which itself embeds the [router](https://github.com/ReactTraining/react-router).

The `Provider` component is passed a `store` property with a value provided by the `store/configure-store` script. This script returns in fact the result of the Redux `createStore` [method](https://github.com/reactjs/redux/blob/master/docs/api/createStore.md) applied to the following arguments:

* `reducer`: `mainReducer` which is a reducer provided by [sparql-connect](https://github.com/noknot/sparql-connect)
* `preloadedState`: `undefined` at this stage.
* `enhancer`: a [composition](https://github.com/reactjs/redux/blob/master/docs/api/compose.md) of two Redux middlewares ([Redux Thunk](https://github.com/gaearon/redux-thunk) and [Redux Logger](https://github.com/evgenyrodionov/redux-logger)) and of the [Redux DevTools](https://github.com/zalmoxisus/redux-devtools-extension) extension.

In short, the `Provider` component initiates the application state in its `store`.

What's next:
- [Routing mechanism](./routes.md) (what appears in the navigation bar);
- [How to populate `React` components with `sparql` query results](./sparql.md);
- [Something about javascript bothers you when reading the code](./javascript.md).