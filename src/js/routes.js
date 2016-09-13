
import { buildRouterMapping } from './utils/router-mapping'

/*
In order to show nice URLs, we can define some mappgins between route paremeters
and unique identifiers (most of the time URI).
*/

const prefix = 'http://unece.org/services#'
const rPrefix = new RegExp(prefix + '(.*)')

const prefixGsim = 'http://rdf.unece.org/models/gsim#'
const rPrefixGsim = new RegExp(prefixGsim + '(.*)')

const routes = {
  // create: {
  //   pattern: 'create',
  //   paramsToProps: 
  // }
  serviceDetails: {
    pattern: 'service/:serviceId',
    paramsToProps: (state, { serviceId }) => ({
      service: `${prefix}${serviceId}`
    }),
    uriToLink: uri => {
      const serviceId = uri.match(rPrefix)[1]
      return `service/${serviceId}`
    }
  },
  servicesByGsimInput: {
    pattern: 'servicesByGsimInput/:gsimClassId',
    paramsToProps: (state, { gsimClassId }) => ({
      gsimClass: gsimClassId
    }),
    uriToLink: uri => {
      const gsimClassId = uri.match(rPrefixGsim)[1]
      return `servicesByGsimInput/${gsimClassId}`
    }
  }
} 

export const {
  connectFromRoute,
  uriToLink,
  path,
  paramsToProps
} = buildRouterMapping(routes)
