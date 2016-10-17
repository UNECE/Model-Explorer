import React, { Component } from 'react'
import { connectFromRoute } from '../routes'
import { sparqlConnect } from '../sparql/configure-sparql'
import { LOADED } from 'sparql-connect'
import { browserHistory } from 'react-router'
import { removeService } from '../sparql/updates'
import ServiceEditorDetails from './service-editor-details'
import { removeInArrByKey, addInArr } from '../utils/arrays'

export class Service extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editing: false
    }
    this.edit = () => this.setState({
      editing: true
    })
    this.cancel = () => this.setState({ 
      editing: false
    })
    this.save = () => {}
    
    this.remove = () => {
      this.props.flush()
      removeService(this.props.serviceInformation.serviceDetails.serviceGraph)
        .then(() => browserHistory.push(''))
    }
    //TODO see service creator and DRY
    this.editUtils = {
      hndlLabelChange: label => this.setState({ label }),
      hndlDescriptionChange: description => this.setState({ description }),
      hndlOutcomesChange: outcomes => this.setState({ outcomes }),
      hndlRestrictionsChange: restrictions => this.setState({ restrictions }),
      addInput: input => this.setState({
        inputs: addInArr(this.state.inputs, input)
      }),
      addOutput: output => this.setState({
        outputs: addInArr(this.state.Outputs, output)
      }),
      addSubprocess: subprocess => this.setState({
        subs: addInArr(this.state.subs, subprocess)
      }),
      removeInput: input => this.setState({
        inputs: removeInArrByKey(this.state.inputs, input, 'gsimClass')
      }),
      removeOutput: output => this.setState({
        outputs: removeInArrByKey(this.state.outputs, output, 'gsimClass')
      }),
      removeSubprocess: subprocess => this.set({
        subs: removeInArrByKey(this.state.subs, subprocess, 'sub')
      })
    }
  }
  
  render() {
    if (this.props.loaded !== LOADED) return <span>loading...</span>
    //we refrence the simple queries combined by `serviceEverything`
    const {
      serviceDetails: {
        service, label, description, outcomes, restrictions,
        serviceGraph
      },
      serviceInputs: inputs,
      serviceOutputs: outputs,
      serviceSubprocesses: subs
    } = this.props.serviceInformation
    
    const descr = {
      label, description, outcomes, restrictions,
      //FIXME we need multiple queries to gel all this information
      inputs: inputs,
      outputs: outputs,
      subs: subs
    }
    
    const { editing } = this.state
    const editUtils = {
      addInput: this.addInput,
      addOutput: this.addOutput,
      addSubprocess: this.addSubprocess,
      removeInput: this.removeInput,
      removeOutput: this.removeOutput,
      removeSubprocess: this.removeSubprocess,
      updateDescr: this.updateDescr
    }
    
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

Service.propTypes = {
  
}

export default connectFromRoute(
  sparqlConnect.serviceEverything(Service)
)