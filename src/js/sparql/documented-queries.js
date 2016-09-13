import queries from './queries'

const {
  GSBPMDescription,
  subprocessServices,
  services,
  serviceDetails,
  serviceSubprocesses,
  serviceInputs
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
  },
  // subprocessServices: {
  //   descr: 'Retrieve all the services related to a subprocess',
  //   whatWeGet: 'services',
  //   results: {
  //     service: 'service (uri)',
  //     label: 'service label'
  //   },
  //   queryBuilder: subprocessServices
  // },
  services: {
    descr: 'Retrieve a list of services',
    whatWeGet: 'services',
    params: [],
    results: {
      service: 'service (uri)',
      label: 'label of the service'
    },
    queryBuilder: services
  }, 
  serviceDetails: {
    descr: 'Retrieve details for a service',
    singleResult: true,
    params: [{
      name: 'service',
      descr: 'service (uri)'
    }],
    results: {
      label: 'service label'
    },
    queryBuilder: serviceDetails
  },
  serviceSubprocesses: {
    descr: 'Retrieve details for a service',
    params: [{
      name: 'service',
      descr: 'service (uri)'
    }],
    whatWeGet: 'subs',
    results: {
      sub: 'subprocess (uri)',
      label: 'subproces label'
    },
    queryBuilder: serviceSubprocesses
  },
  serviceInputs: {
    descr: 'Retrieve gsim inputs for a service',
    whatWeGet: 'inputs',
    params: [{
      name: 'service'
    }],
    results: {
      gsimClass: 'gsimClass',
      label: 'label of the gsim class',
      definition: 'definition of the gsim class'
    },
    queryBuilder: serviceInputs
  }
}
