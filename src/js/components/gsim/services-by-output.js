import { sparqlConnect } from '../../sparql/configure-sparql'
import ServicesByGSIM from './services-by-in-out'

export default 
  sparqlConnect.servicesByGSIMOutput(ServicesByGSIM)