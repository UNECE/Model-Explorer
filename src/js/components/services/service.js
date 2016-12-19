import React, { Component } from 'react'
import { sparqlConnect, sparqlCombine } from 'sparql-connect'
import { browserHistory } from 'react-router'
import { updateService } from '../../sparql/updates'
import { removeService } from '../../sparql/updates'
import ServiceEditorDetails from './details-pres'
import { removeInArrByKey, addInArr } from '../../utils/arrays'

/**
 * Builds the query that retrieves the details of a given CSPA service.
 */
const serviceDetails = service => `
  SELECT
    ?label ?description ?outcomes ?subprocess ?restrictions ?graphName
    ?builderOrg
  WHERE {
    GRAPH ?graphName {
      <${service}>
        cspa:hasPackageDefinition [
           a cspa:ServiceDefinition; cspa:aimsAt [
             cspa:description ?description ;
              cspa:outcomes ?outcomes ;
              cspa:restrictions ?restrictions ]] ;
        cspa:hasPackageImplementation [
           a cspa:ServiceImplementationDescription ;
            cspa:comesFrom [
              a cspa:Provenance ;
              cspa:builderOrganization [
                cspa:organization ?builderOrg ]]] ;
        cspa:label ?label ;
    }
  }
`

/**
 * Builds the query that retrieves the GSBPM subprocess for a given service.
 */
//TODO investigate, we shouldn't need DISTINCT, should we ?
const serviceSubs = service => `
  SELECT DISTINCT ?sub ?label
  WHERE {
      <${service}>  cspa:hasPackageDefinition ?definition .
      ?definition cspa:aimsAt ?function .
      ?function  cspa:gsbpmSubProcess ?sub .
      ?sub       skos:prefLabel ?label
  }
`


/**
 * Builds the query that retrieves the list of GSIM inputs of a given CSPA service.
 */
const serviceInputs = service => `
  SELECT DISTINCT ?gsimClass ?label ?definition
  WHERE {
      <${service}> a cspa:package ;
          cspa:label ?servicelabel ;
          cspa:hasPackageDefinition ?pckgDefinition .

      ?pckgDefinition
          cspa:definitionHasInput ?input .
      ?input cspa:gsimInput ?gsimClass .
      ?gsimClass rdfs:label ?label .
      ?gsimClass gsim:classDefinition ?definition
  }
`
/**
 * Builds the query that retrieves the list of GSIM outputs of a given CSPA service.
 */
const serviceOutputs = service => `
  SELECT DISTINCT ?gsimClass ?label ?definition
  WHERE {
      <${service}> a cspa:package ;
          cspa:label ?servicelabel ;
          cspa:hasPackageDefinition ?pckgDefinition .

      ?pckgDefinition
          cspa:definitionHasOutput ?input .
      ?input cspa:gsimOutput ?gsimClass .
      ?gsimClass rdfs:label ?label .
      ?gsimClass gsim:classDefinition ?definition
  }
`



const connector = sparqlCombine(
  sparqlConnect(serviceDetails, {
    queryName: 'serviceDetails',
    params: ['service'],
    singleResult: true
  }),
  sparqlConnect(serviceInputs, {
    queryName: 'serviceInputs',
    params: ['service']
  }),
  sparqlConnect(serviceOutputs, {
    queryName: 'serviceOutputs',
    params: ['service']
  }),
  sparqlConnect(serviceSubs, {
    queryName: 'serviceSubs',
    params: ['service']
  })
)

function descrFromProps(props) {
  const {
    //`serviceDetails` has `singleResult` set to `true`, so the component
    //is populated with the query variables 
    graphName, label, description, outcomes, restrictions, builderOrg,
    serviceInputs: inputs,
    serviceOutputs: outputs,
    serviceSubs: subs
  } = props
  
  const { service } = props //filled in by `connectFromRoute`
  
  return {
    service,
    graphName,
    label,
    description,
    outcomes,
    restrictions,
    builderOrg,
    subs,
    inputs,
    outputs
  }  
}

export class Service extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      editing: false,
      descr: descrFromProps(props)
    }
    
    this.edit = () => this.setState({
      editing: true
    })
    
    this.cancel = () => this.setState({ 
      editing: false,
      descr: this.initialDescr
    })
    
    
    this.remove = () => {
      this.props.flush()
      removeService(this.props.serviceInformation.serviceDetails.graphName)
        .then(() => browserHistory.push(''))
    }
    //TODO see service creator and DRY
    this.editUtils = {
      hndlLabelChange: label => this.setDescrInState({ label }),
      hndlDescriptionChange: description => this.setDescrInState({ description }),
      hndlOutcomesChange: outcomes => this.setDescrInState({ outcomes }),
      hndlRestrictionsChange: restrictions => this.setDescrInState({ restrictions }),
      hndlBuilderOrgChange: builderOrg => this.setDescrInState({ builderOrg }),
      addInput: input => this.setDescrInState({
        inputs: addInArr(this.state.descr.inputs, input)
      }),
      addOutput: output => this.setDescrInState({
        outputs: addInArr(this.state.descr.outputs, output)
      }),
      addSubprocess: subprocess => this.setDescrInState({
        subs: addInArr(this.state.descr.subs, subprocess)
      }),
      removeInput: input => this.setDescrInState({
        inputs: removeInArrByKey(this.state.descr.inputs, input, 'gsimClass')
      }),
      removeOutput: output => this.setDescrInState({
        outputs: removeInArrByKey(this.state.descr.outputs, output, 'gsimClass')
      }),
      removeSubprocess: subprocess => this.setDescrInState({
        subs: removeInArrByKey(this.state.descr.subs, subprocess, 'sub')
      })
    }
    
    //Helper function to not mutate `descr` in state
    this.setDescrInState = obj =>
      this.setState({ 
        descr: {
          ...this.state.descr,
          ...obj
        }
      })
    
    this.save = () => {
      const  {
        inputs, outputs, subs
      } = this.state.descr

      const descr = {
        ...this.state.descr,
        inputs: inputs.map(({ gsimClass }) => gsimClass),
        outputs: outputs.map(({ gsimClass }) => gsimClass),
        subs: subs.map(({ sub }) => sub)
      }
      return updateService(descr)
      //TODO value `uri`
        .then(uri => {
          this.props.flush()
          this.setState({ editing: false })
        })      
    }
  }
  
  componentWillReceiveProps(props) {
    //We cannot do this in the constructor since the component can be mounted
    //before the results are loaded
    //TODO there might be a better way to handle this (it might be
    //easier if the waiting before results are loaded was handled by 
    //`sparql-connect`, which could also show the "results are loading"
    //message when nedded).
    this.initialDescr = descrFromProps(props)
    
    this.setState({ descr: this.initialDescr })
  }
  
  render() {
    const { editing, descr } = this.state
    return (
      <form className="form-horizontal">
        <ServiceEditorDetails 
          descr={descr} editing={editing} editUtils={this.editUtils} />
        { !editing &&
          <div className="btn-toolbar pull-right">
            <button className="btn btn-primary"
                    onClick={e => { e.preventDefault(); this.edit() }}>
              <span className="glyphicon glyphicon-pencil"></span>&nbsp;
              Edit
            </button>
            <button className="btn btn-danger"
                    onClick={e => { e.preventDefault(); this.remove() }}>
              <span className="glyphicon glyphicon-remove"></span>&nbsp;
              Delete
            </button>
          </div>
        }
        { editing && 
          <div className="btn-toolbar pull-right">
          <button className="btn btn-primary"
                  onClick={e => { e.preventDefault(); this.save() }}>
            <span className="glyphicon glyphicon-save"></span>&nbsp;
            Save
          </button>
            <button className="btn btn-danger"
                    onClick={e => { e.preventDefault(); this.cancel() }}>
              <span className="glyphicon glyphicon-remove"></span>&nbsp;
              Cancel
            </button>
          </div>
        }
      </form>
    )
  }
}

export default connector(Service)