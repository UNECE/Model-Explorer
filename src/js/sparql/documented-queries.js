import queries from './queries'

const {
  GSBPMDescription
} = queries

export default {
  GSBPMDescription: {
    descr: 'Retrieve a globale description of the GSBPM',
    whatWeGet: 'phases',
    results: {
      phase: 'phase (uri)',
      phaseLabel: 'phase label',
      subprocess: 'subprocess (uri)',
      subprocessLabel: 'subprocess label'
    },
    params: [],
    queryBuilder: GSBPMDescription
  }
}
