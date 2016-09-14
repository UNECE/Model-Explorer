
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
      return `service/${serviceId}`
    }
  },
  servicesByGsimInput: {
    pattern: 'servicesByGsimInput/:gsimClassId',
    paramsToProps: (state, { gsimClassId }) => ({
      gsimClass: `${GSIMPrefix}${gsimClassId}`
    }),
    uriToLink: uri => {
      const gsimClassId = uri.match(regedPrefix(GSIMPrefix))[1]
      return `/servicesByGsimInput/${gsimClassId}`
    }
  },
  serviceBySubProcess: {
    pattern: '/servicebysubprocess/:subprocess',
    paramsToProps: (state, { subprocess }) => ({
      subprocess: `${GSBPMPrefix}${underscoreToPoint(subprocess)}`
    }),
    uriToLink: uri => {
      const subprocessId = uri.match(regedPrefix(GSBPMPrefix))[1]
      return `/servicebysubprocess/${pointToUnderscore(subprocessId)}`
    }
  }
}

export const {
  connectFromRoute,
  uriToLink,
  path,
  paramsToProps
} = buildRouterMapping(routes)
