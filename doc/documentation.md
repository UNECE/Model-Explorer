# Model-Explorer - Developer guide

This project is a single page application. It uses:
-  [React](https://github.com/facebook/react) to build visual components;
- [sparql-connect](https://github.com/noknot/sparql-connect) to populate components with [sparql](https://www.w3.org/TR/rdf-sparql-query/) query results;
- [webpack](https://webpack.github.io/) to bundle all the application assets into one file;
- javascript ES6 syntax, thanks to the `webpack` plugin for `babel` ;
- [jison](http://zaa.ch/jison/) to build a parser for `sparql` (grammar comes from [SPARQL.js](https://github.com/RubenVerborgh/SPARQL.js)).

[redux](https://github.com/reactjs/redux) is used by `sparql-connect` to manage the state of the application, but understanding of `redux` is not a prerequisite.

For those who would be confused by some libraries or some coding practices used in this application, relevant information might be found in these documents:

- [How to add a functionality](./add-functionality.md);
- [Routing mechanism](./routes.md) (what appears in the navigation bar);
- [How to populate `React` components with `sparql` query results](./sparql.md);
- [Something about javascript bothers you when reading the code](./javascript.md);
- [Bootstrapping the application](./bootstrapping.md).
