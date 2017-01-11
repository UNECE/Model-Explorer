import React from 'react'

/*
React router doesn't support dot (.) in the URL (it won't load the page if we
access it directly). We translate dots to underscores.
*/
//It will be called when building the URL
const pointToUnderscore = str => {
  //We throw an error if the original string contains an underscore (safety
  //check).
  if (str.includes('_')) throw new Error(
    'Values embedded in the URL cannot contain underscores, error ' +
    `when parsing string ${str}`
  )
  return str.replace('.', '_')
}
//It will be called when extracting props from the URL
const underscoreToPoint = str => str.replace('_', '.')


const uriTransformer = (transform, Cmpnt) => {
  const paramNames = transform.match(/:([a-zA-Z_$][a-zA-Z0-9_$]*)/g)
  if (paramNames === 0) console.warn('weird, no param in pattern')
  //FIXME handle multiple parameters
  if (paramNames.length > 1) throw new Error('not implemented yet')
  const paramName = paramNames[0].slice(1)
  function transformProps(props) {
    const { routeParams } = props
    if (!routeParams.hasOwnProperty(paramName)) throw new Error(
      `Expected param \`${paramName}\` was not found in route ` +
      `${props.location.pathName}`
    )

    return Object.assign({}, props, { 
      [paramName]: transform.replace(':' + paramName, underscoreToPoint(routeParams[paramName])) })
  }
  return function (props) {
    return React.createElement(Cmpnt, transformProps(props));
  }
}


/**
 * Takes two string patterns and return a function which transforms a string
 * implementing the `from` pattern into a string implementing the `to` pattern.
 *
 * A 'pattern' embeds string like ':myParam' to identify parameters in the
 * pattern.
 *
 * Example:
 * 
 * const peopleTransform(
 *  'http://myrepo.com/people/:firstname/meaningless/:lastname',
 *  '/someone/:firstname/:lastname'
 *  )
 *
 * peopleTransform('http://myrepo.com/people/john/meaningless/doe')
 * ->
 * '/someone/john/doe'
 * 
 * @param  {string} patternFrom
 * @param  {string} patternTo
 * @return {function}
 */
export function transform(patternFrom, patternTo) {
  //extract param names in pattern from
  //`paramsPatternFromArr` looks like `[':firstname', ':lastname']`
  const paramsPatternFromArr = patternFrom.match(/:[a-zA-Z_$][a-zA-Z0-9_$]*/g)
  //build a regular expression to match strings which look like pattern from,
  //but with values in place of parameters
  //Attention: parameter values may contain a dots or dashes.
  //We add a $ at the end of the RegExp to ensure that we consume the whole
  //string (if we don't, there might be an error with the pattern)
  const fromRegexp = new RegExp(
    patternFrom.replace(/:[a-zA-Z_$][a-zA-Z0-9_$]*/g,
    '([\-\.a-zA-Z_$$0-9]+)') + '$'
  )
  
  //regular expression to check if a string looks like a parameter description
  //(for instance ``:firstname`)
  var rId = /:[a-zA-Z_$][a-zA-Z0-9_$]*/
  
  // `paramsPatternTo` looks like `{ :firstname: 3, :lastname: 5 }`
  const paramsPatternTo = {}
  // ['/someone/', ':firstName', '/', ':lastname']
  const segmentsTo = patternTo
    .split(/(:[a-zA-Z_$][a-zA-Z0-9_$]*)/g)
    //there might some empty strings, if the pattern starts or ends with a
    //parameter, or if there are two consecutive parameters (but this should not
    //happen since parameters are supposed to be separated at least by a '/').
    .filter(str => str !== '')
    .map((str, i) => {
      //we keep track of the position of the parameter in the segments the
      //"to" string will be made of.
      if (rId.test(str)) paramsPatternTo[str] = i
      return str
    })
  
  return function transformString(from) {
    // we extract parameters values in `from` string
    // ['john', 'doe']
    let params = fromRegexp.exec(from)
    
    if (!params) throw new Error(
        `Problem while parsing \`${from}\`, expected \`${patternFrom}\``
      )
    // { :firstName: 'john', :lastName: 'doe'}
    const paramsFrom = paramsPatternFromArr.reduce((_, param, i) => {
      _[param] = params[i+1]
      return _
    }, {})
    // replace params in `segmentsTo`
    // ['/someone/', ':firstName', '/', :lastName'] ->
    // ['/someone/', 'john', '/', doe']
    const segments = segmentsTo.slice()
    Object.keys(paramsPatternTo).forEach(param => {
      segments[paramsPatternTo[param]] = pointToUnderscore(paramsFrom[param])
    })
    return segments.join('')
  }
}

export function wrapRoute(element) {
  const { children, ...otherProps } = element.props
  if (otherProps.hasOwnProperty('transform') && 
      otherProps.hasOwnProperty('component')) {
    const { transform, component } = otherProps
    delete otherProps.transform
    const wrappedComponent = uriTransformer(transform, component)
    otherProps.component = wrappedComponent
  }
  if (children)
    otherProps.children = Array.isArray(children) ?
      children.map(wrapRoute) : wrapRoute(children)
  return React.createElement(element.type, otherProps)
}





