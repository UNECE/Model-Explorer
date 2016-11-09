
import { buildRouterMapping } from './utils/router-mapping'

/*
In order to show nice URLs, we can define some mappgins between route paremeters
and unique identifiers (most of the time URI).
*/

const servicePrefix = 'http://unece.org/services#'
const GSIMPrefix = 'http://rdf.unece.org/models/gsim#'
const GSBPMPrefix = 'http://id.unece.org/models/gsbpm/'

const regedPrefix = (prefix) => new RegExp(prefix + '(.*)')

/*
React router doesn't support point (.) in the URL.
We have to translate point in id to underscore,
and back.
*/
const pointToUnderscore = (str) => str.replace('.', '_')
const underscoreToPoint = (str) => str.replace('_', '.')

const routes = {
  // create: {
  //   pattern: 'create',
  //   paramsToProps:
  // }
  create: {
    pattern: 'create',
    uriToLink: () => 'create'
  },
  serviceDetails: {
    pattern: 'service/:serviceId',
    paramsToProps: (state, { serviceId }) => ({
      service: `${servicePrefix}${serviceId}`
    }),
    uriToLink: uri => {
      const seriveIdMatch = uri.match(regedPrefix(servicePrefix))
      if (!seriveIdMatch) throw new Error(
        `${uri} does not match the expected prefix ${servicePrefix}`
      )
      const serviceId = seriveIdMatch[1]
      return `/service/${serviceId}`
    }
  },
  servicesByGsim: {
    pattern: ':gsimClass',
    paramsToProps: (state, { gsimClass }) => ({
      gsimClass: `${GSIMPrefix}${gsimClass}`
    }),
    uriToLink: uri => {
      const gsimClass = uri.match(regedPrefix(GSIMPrefix))[1]
      return `/gsim/${gsimClass}`
    }
  },
  //TODO we should define these mappings in a hierarchical way, corresponding
  //to the hierarchy of routes defined in `Root` (to avoid mistakes like
  //defining a mapping for the pattern `gsbpm:subprocess` instead of
  //`:subprocess`)
  servicesBySubProcess: {
    pattern: ':subprocess',
    paramsToProps: (state, { subprocess }) => ({
      subprocess: `${GSBPMPrefix}${underscoreToPoint(subprocess)}`
    }),
    uriToLink: uri => {
      const subprocessId = uri.match(regedPrefix(GSBPMPrefix))[1]
      return `/gsbpm/${pointToUnderscore(subprocessId)}`
    }
  }
}

export const {
  connectFromRoute,
  uriToLink,
  path,
  paramsToProps
} = buildRouterMapping(routes)
