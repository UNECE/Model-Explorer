import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
//`Root` set up our application with `react-redux` and `react-router`
import Root from './components/root'
//We can import css from javascript with webpack `style-loader`
import '../css/style.css'
import '../css/flag-icon-css/flag-icon.min.css'
//Our app will be embeded in `index.html`; webpack file loader allows this
//kind of import to mark this 'dependence': `index.html` will be automatically
//copy in the `dist` directory during the build process.
import 'file?name=[name].[ext]!../index.html'

ReactDOM.render(
  <Root/>,
  document.getElementById('base'));