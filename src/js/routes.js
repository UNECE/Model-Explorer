
import { buildRouterMapping } from './utils/router-mapping'

/*
In order to show nice URLs, we can define some mappgins between route paremeters
and unique identifiers (most of the time URI).
*/

const servicePrefix = 'http://unece.org/services#'
const GSIMPrefix = 'http://rdf.unece.org/models/gsim#'
const GSBPMPrefix = 'http://id.unece.org/models/gsbpm/'

const regedPrefix = (prefix) => new RegExp(prefix + '(.*)')

const routes = {
  // create: {
  //   pattern: 'create',
  //   paramsToProps: 
  // }
  serviceDetails: {
    pattern: 'service/:serviceId',
    paramsToProps: (state, { serviceId }) => ({
      service: `${servicePrefix}${serviceId}`
    }),
    uriToLink: uri => {
      const serviceId = uri.match(regedPrefix(servicePrefix))[1]
      return `service/${serviceId}`
    }
  },
  servicesByGsimInput: {
    pattern: 'servicesByGsimInput/:gsimClassId',
    paramsToProps: (state, { gsimClassId }) => ({
      gsimClass: gsimClassId
    }),
    uriToLink: uri => {
      const gsimClassId = uri.match(regedPrefix(GSIMPrefix))[1]
      return `servicesByGsimInput/${gsimClassId}`
    }
  },
  serviceBySubProcess: {
    pattern: 'servicebysubprocess/:subprocess',
    paramsToProps: (state, { subprocess }) => ({

    }),
    uriToLink: uri => {
      const subprocessId = uri.match(regedPrefix(GSBPMPrefix))[1]
      return `servicebysubprocess/${subprocessId}`
    }
  }
} 

export const {
  connectFromRoute,
  uriToLink,
  path,
  paramsToProps
} = buildRouterMapping(routes)
