
import { buildRouterMapping } from './utils/router-mapping'

/*
In order to show nice URLs, we can define some mappgins between route paremeters
and unique identifiers (most of the time URI).
*/

const prefix = 'http://unece.org/services#'
const rPrefix = new RegExp(prefix + '(.*)')

const routes = {
  serviceDetails: {
    pattern: 'service/:serviceId',
    paramsToProps: (state, { serviceId }) => ({
      service: `${prefix}${serviceId}`
    }),
    uriToLink: uri => {
      const serviceId = uri.match(rPrefix)[1]
      return `service/${serviceId}`
    }
  }
}

export const {
  connectFromRoute,
  uriToLink,
  path,
  paramsToProps
} = buildRouterMapping(routes)
