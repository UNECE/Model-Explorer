
import { buildRouterMapping } from './utils/router-mapping'

/*
In order to show nice URLs, we can define some mappgins between route paremeters
and unique identifiers (most of the time URI).
*/

const prefix = 'http://stamina-project.org/codes'
const rPrefix = new RegExp(prefix + '\/(.*)')

const routes = {
  classificationDetails: {
    pattern: '/classification/:classificationId/details/:conceptSchemeId',
    paramsToProps: (state, { classificationId, conceptSchemeId })  => ({
      classification: `${prefix}/${classificationId}/${conceptSchemeId}`
    }),
    uriToLink: uri => {
      const [classifcationId, conceptSchemeId] = uri.match(rPrefix)[1].split('/')
      return `/classification/${classifcationId}/details/${conceptSchemeId}`
    }
  }
}

export const {
  connectFromRoute,
  uriToLink,
  path,
  paramsToProps
} = buildRouterMapping(routes)