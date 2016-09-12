import { connect } from 'react-redux'

export function buildRouterMapping(routes) {
  
  const path = Object.keys(routes).reduce((mapping, route) => {
    mapping[route] = routes[route].pattern
    return mapping
  }, {})

  const paramsToProps = Object.keys(routes).reduce((mapping, route) => {
    mapping[routes[route].pattern] = (state, { routeParams }) => 
      routes[route].paramsToProps(state, routeParams)
    return mapping
  }, {})

  const uriToLink = Object.keys(routes).reduce((mapping, route) => {
    mapping[route] = routes[route].uriToLink
    return mapping
  }, {})

  const connectFromRoute = (...args) => connect(
    (state, ownProps) => {
      const mapRoute = paramsToProps[ownProps.route.path]
      if (mapRoute === undefined) throw new ReferenceError(
        `Mapping for route \`${ownProps.route.path}\`is missing`
      )
      return mapRoute ? mapRoute(state, ownProps) : {}
    })(...args)

  return {
    path,
    paramsToProps,
    uriToLink,
    connectFromRoute
  }
}



