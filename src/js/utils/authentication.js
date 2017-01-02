/**
 * The database requires authentication. This module defines some utility
 * functions to handle authentication. When the user is authenticated, it will
 * set a `fetchQuery`function in the modules which need to execute queries.
 */

import { checkAuthentication } from 'sparql-connect' 

//Track all the callback functions to call when the authentication succeeds
const authCallbacks = []

/**
 * Registers actions to perform when the authentication succeeds
 * @param  {function} cb callback
 */
export const setCallback = cb => authCallbacks.push(cb)

//Holds information about authentication status
const auth = { login: false, pending: false } 
 
 /**
  * It makes `react-router` redirect to the login page if the user is not
  * authenticated
  *
  * It keeps in memory the orginal requested page to allow transitioning
  * to this page when authentication is done.
  * 
  * See https://github.com/ReactTraining/react-router/blob/master/docs/API.md#onenternextstate-replace-callback
  */
export function requireAuth(nextState, replace) { 
  if (!auth.login) { 
    replace({ 
      pathname: '/login', 
      state: { nextPathname: nextState.location.pathname } 
    }) 
  } 
} 
/**
 * Build an authentication token based on a useranme and password, and check
 * if the token is valid. It returns a promise in order to chain
 * subsequent actions.
 * @param  {string}  username user
 * @param  {string}  password password
 * @return {promise}
 */
export function checkFromPassword(username, password) { 
  const authorization = 'Basic ' + btoa(`${username}:${password}`) 
  return check(authorization) 
} 

/**
 * The authentication token will be stored in local storage, so we need to check
 * if a token is already present. It returns a promise in order to chain
 * subsequent actions.
 */
export function checkFromStorage() { 
  return check(window.localStorage.token) 
} 

/** 
 * Takes an authentication token and checks its validity
 *
 * It builds a `fetch` function based on the authentication token. It performs
 * a test query to see if the server accepts this authentication token (if it
 * does not return an error). It will set `auth.login` accordingly and, if it
 * has suceeded, it will set this function in modules which need it.
 * 
 * @param  {string} authorization authentication token
 * @param  {promise}
 */
export function check(authorization) { 
  function success(isAuthenticated) { 
    //TODO handle wrong credentials
    if (!isAuthenticated) return
    auth.login = true 
    window.localStorage.token = authorization
    //pass the token where needed
    authCallbacks.map(cb => cb(authorization))
  }
  //TODO handle error during authentication
  const failure = error => {
    throw new Error(`Problem during authentication: \`${error}\``)
  }
  return checkAuthentication(authorization) 
    .then(success, failure) 
} 