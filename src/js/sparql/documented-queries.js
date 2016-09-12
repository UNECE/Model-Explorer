import queries from './queries'

const {
  GSBPMDescription
} = queries

export default {
  GSBPMDescription: {
    descr: 'Retrieve a global description of the GSBPM',
    whatWeGet: 'phases',
    results: {
      phase: 'phase (uri)',
      phaseLabel: 'phase label',
      phaseCode: 'phase code',
      subprocess: 'subprocess (uri)',
      subprocessLabel: 'subprocess label',
      subprocessCode: 'subprocess code'
    },
    params: [],
    queryBuilder: GSBPMDescription
  }
}
