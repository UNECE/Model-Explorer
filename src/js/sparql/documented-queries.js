import queries from './queries'

const {
  GSBPMDescription,
  subprocessServices,
  services,
  serviceDetails,
  serviceSubprocesses,
  serviceInputs,
  gsimInputServices,
  GSIMClasses,
  subprocesses
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
  },
  gsimInputServices: {
    descr: 'Retrieve all services with the given gsim class as input',
    whatWeGet: 'services',
    params: [{
      name: 'gsimClass'
    }],
    results: {
      service: 'service (uri)',
      label: 'service label'
    },
    queryBuilder: gsimInputServices
  },
  subprocesses: {
    descr: 'Retrieve all GSBPM subprocesses',
    whatWeGet: 'subs',
    params: [],
    results: {
      sub: 'gsbpm subprocess (uri)',
      code: 'gsbpm subprocess code',
      label: 'gsbpm subprocess label'
    },
    queryBuilder: subprocesses
  },
  GSIMClasses: {
    descr: 'Retrieve all GSIM classes',
    whatWeGet: 'GSIMClasses',
    params: [],
    results: {
      GSIMClass: 'GSIM class (uri)',
      label: 'GSIM class label',
      code: 'GSIM class code'
    },
    queryBuilder: GSIMClasses
  }
}
