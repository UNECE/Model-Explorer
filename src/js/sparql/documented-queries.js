import queries from './queries'

const {
  NSIList,
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
  GSIMAllClasses,
  subprocesses,
  serviceBySubProcess,
  GSIMGroups
} = queries

const queries_ = {
  NSIList: {
    descr: 'Retrieve a list of statistical institutes',
    whatWeGet: 'nsis',
    params: [],
    results: {
      nsi: 'Statistical institute (uri)',
      label: 'label of the NSI'
    },
    queryBuilder: NSIList
  },
  GSBPMDescription: {
    descr: 'Retrieve a global description of the GSBPM',
    whatWeGet: 'phases',
    results: {
      phase: 'phase (uri)',
      phaseLabel: 'phase label',
      phaseCode: 'phase code',
      subprocess: 'subprocess (uri)',
      subprocessLabel: 'subprocess label',
      subprocessCode: 'subprocess code',
	  subprocessDefinition: 'subprocess definition'
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
      label: 'label of the service',
	  description: 'description of the service'
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
      label: 'service label',
      description: 'service description',
      outcomes: 'outcomes',
      subprocess: 'subprocess',
      restrictions: 'restrictions',
      serviceGraph: 'service graph'
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
    descr: 'Retrieve gsim outputs for a service',
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
  GSIMAllClasses: {
    descr: 'Retrieve all GSIM classes',
    whatWeGet: 'GSIMClasses',
    params: [],
    results: {
      GSIMClass: 'GSIM class (uri)',
      label: 'GSIM class label',
      definition: 'GSIM class definition'
    },
    queryBuilder: GSIMAllClasses
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

//queries must have a name in order to be combined into a higher order query
//there should not be conflicts between queries param names (same name means
//same value)
//TODO change the way we describe queries to avoid the need to specify a name
//(which causes boilerplate and fragility, since the name has to match the names
//in the params entry of the higher order query)
queries_.serviceDetails.name = 'serviceDetails'
queries_.serviceInputs.name = 'serviceInputs'
queries_.serviceOutputs.name = 'serviceOutputs'
queries_.serviceSubprocesses.name = 'serviceSubprocesses'

queries_.serviceEverything = {
  descr: 'Retrieve all the information about a service (higher order query)',
  queries: [
    queries_.serviceDetails, queries_.serviceInputs, queries_.serviceOutputs,
    queries_.serviceSubprocesses],
  //`whatWeGet` from initial queries will not be valued, all the results will be
  //available as entries in the `serviceInformation` prop passed to the
  //connected component. For example, `serviceInformation` will look like 
  //`{
  //  serviceDetails: {},
  //  serviceInputs: [],
  //  serviceOutputs: [],
  //  serviceSubprocesses: []
  //}`
  whatWeGet: 'serviceInformation',
  //mapping between the array of parameters defined for each query, and the
  //prop which needs to be passed to the component. In this cas, all the queries
  //will rely on the same prop `service`.
  params: {
    serviceDetails: ['service'],
    serviceInputs: ['service'],
    serviceOutputs: ['service'],
    serviceSubprocesses: ['service']
  }
}

export default queries_