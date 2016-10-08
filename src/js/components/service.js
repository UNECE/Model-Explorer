import React, { Component } from 'react'
import { connectFromRoute } from '../routes'
import { sparqlConnect } from '../sparql/configure-sparql'
import { LOADED } from 'sparql-connect'
import { browserHistory } from 'react-router'
import { removeService } from '../sparql/updates'
import ServiceEditor from './service-editor'

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
      removeService(this.props.serviceGraph)
        .then(() => browserHistory.push(''))
    }
    this.commit = () => {
      
    }
  }
  
  render() {
    if (this.props.loaded !== LOADED) return <span>loading...</span>
    const {
      service, label, description, outcomes, restrictions,
      serviceGraph
    } = this.props
    const descr = {
      label, description, outcomes, restrictions,
      //FIXME we need multiple queries to gel all this information
      inputs: [],
      outputs: [],
      subs: []
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
        <ServiceEditor descr={descr} editing={editing} commit={this.commit} />
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

export default connectFromRoute(
  sparqlConnect.serviceDetails(Service)
)