# Model-Explorer

A web client for navigating UNECE models, developed for the [Implementing ModernStats Standards] project(http://www1.unece.org/stat/platform/display/hlgbas/Implementing+Modernstats+Standards).

This is a non exhaustive list of models :
 * GSBPM
 * GSIM
 * CSPA
 * EARF

Running this application suppose you have access to a RDF database with the relevant information. The database is queried through a `sparql` end point.

## Install

You first need to install [node.js](https://nodejs.org/en/).

Run `npm install` and then `npm run dev` (for develop or debug phases) or `npm run build` (for production).

Open a browser and navigate to `http://localhost:8080/`

## Documentation

Documentation can be found in the [doc](./doc/documentation.md) folder.