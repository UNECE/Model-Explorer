import React, { Component } from 'react'
import { connectFromRoute } from '../routes'
import { sparqlConnect } from '../sparql/configure-sparql'
import ServiceSubs from './service-subs'
import ServiceInputs from './service-inputs'
import ServiceOutputs from './service-outputs'
import { LOADED } from 'sparql-connect'
import { browserHistory } from 'react-router'

class ServiceDetails extends Component {
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
    this.save = () => {
      
    }
  }
  
  
  render() {
    if (this.props.loaded !== LOADED) return <span>loading...</span>
    const {
      service, label, description, outcomes, subprocess, restrictions,
      serviceGraph
    } = this.props
    
    const { editing } = this.state
    return (
      <form className="form-horizontal">
        <div className="form-group">
          <label className="col-sm-3 control-label">Label</label>
          <div className="col-sm-9">
            <input
              disabled={!editing} type="text" className="form-control"
              value={label} onChange={() => {}}/>
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-3 control-label">Description</label>
          <div className="col-sm-9">
            <textarea rows="3" 
              disabled={!editing} type="text" className="form-control"
              value={description} />
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-3 control-label">Outcomes</label>
          <div className="col-sm-9">
            <textarea rows="3" 
              disabled={!editing} type="text" className="form-control"
              value={outcomes} />
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-3 control-label">Restrictions</label>
          <div className="col-sm-9">
            <textarea rows="3" 
              disabled={!editing} type="text" className="form-control"
              value={restrictions} />
          </div>
        </div>             
        <div className="form-group">
          <label className="col-sm-3 control-label">Subprocess</label>
          <div className="col-sm-9">
            <ServiceSubs disabled={!editing} service={service} />
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-3 control-label">GSIM Inputs</label>
          <div className="col-sm-9">
            <ServiceInputs disabled={!editing} service={service} />
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-3 control-label">GSIM Outputs</label>
          <div className="col-sm-9">
            <ServiceOutputs disabled={!editing} service={service} />
          </div>
        </div>                          
        { !editing &&
          <div className="btn-toolbar pull-right">
            <button className="btn btn-primary"
                    onClick={e => { e.preventDefault(); this.edit() }}>
              <span className="glyphicon glyphicon-pencil"></span>&nbsp;
              Edit
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
  sparqlConnect.serviceDetails(ServiceDetails)
)