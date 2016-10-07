import queries from './queries'

const {
  GSBPMDescription,
  subprocessServices,
  services,
  serviceDetails,
  serviceSubprocesses,
  serviceInputs,
  serviceOutputs,
  gsimInputServices,
  gsimOutputServices,
  GSIMClasses,
  subprocesses,
  serviceBySubProcess,
  GSIMGroups
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
  serviceOutputs: {
    descr: 'Retrieve gsim inputs for a service',
    whatWeGet: 'outputs',
    params: [{
      name: 'service'
    }],
    results: {
      gsimClass: 'gsimClass',
      label: 'label of the gsim class',
      definition: 'definition of the gsim class'
    },
    queryBuilder: serviceOutputs
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
  gsimOutputServices: {
    descr: 'Retrieve all services with the given gsim class as output',
    whatWeGet: 'services',
    params: [{
      name: 'gsimClass'
    }],
    results: {
      service: 'service (uri)',
      label: 'service label'
    },
    queryBuilder: gsimOutputServices
  },
  subprocesses: {
    descr: 'Retrieve all GSBPM subprocesses',
    whatWeGet: 'subs',
    params: [],
    results: {
      sub: 'gsbpm subprocess (uri)',
      label: 'gsbpm subprocess label',
      code: 'gsbpm subprocess code'
    },
    queryBuilder: subprocesses
  },
  GSIMClasses: {
    descr: 'Retrieve all GSIM classes',
    whatWeGet: 'GSIMClasses',
    params: [{
      name: 'group',
      descr: 'GSIM group'
    }],
    results: {
      GSIMClass: 'GSIM class (uri)',
      label: 'GSIM class label',
      definition: 'GSIM class definition'
    },
    queryBuilder: GSIMClasses
  },
  serviceBySubProcess: {
    descr: 'Retrieve a list of services implementing a GSBPM subprocess',
    whatWeGet: 'services',
    params: [
      {
        name: 'subprocess',
        descr: 'The subprocess id'
      }
    ],
    results: {
      service: 'CSPA Service (uri)',
      label: 'CSPA Service label'
    },
    queryBuilder: serviceBySubProcess
  },
  GSIMGroups: {
    descr: 'Retrieve the GSIM groups',
    whatWeGet: 'groups',
    params: [],
    results: {
      group: 'Group id (uri)',
      label: 'Group label'
    },
    queryBuilder: GSIMGroups
  }
}
