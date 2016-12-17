import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { linkService } from './routes'
import { createService } from '../../sparql/updates'
import ServiceEditorDetails from './details-pres'
import { removeInArrByKey, addInArr } from '../../utils/arrays'
import P from '../../sparql/prefixes'
import { flush } from '../../sparql/configure-sparql'

class ServiceCreator extends Component {
  constructor() {
    super()
    
    this.state = {
      label: '',
      description: '',
      outcomes: '',
      restrictions: '',
      builderOrg: '',
      subs: [],
      inputs: [],
      outputs: []
    }
    //TODO DRY with `Service` component
    this.editUtils = {
      hndlLabelChange: label => this.setState({ label }),
      hndlDescriptionChange: description => this.setState({ description }),
      hndlOutcomesChange: outcomes => this.setState({ outcomes }),
      hndlRestrictionsChange: restrictions => this.setState({ restrictions }),
      hndlBuilderOrgChange: builderOrg => this.setState({ builderOrg }),
      addInput: input => this.setState({
        inputs: addInArr(this.state.inputs, input)
      }),
      addOutput: output => this.setState({
        outputs: addInArr(this.state.outputs, output)
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
      removeSubprocess: subprocess => this.setState({
        subs: removeInArrByKey(this.state.subs, subprocess, 'sub')
      })
    }
    
    this.create = () => {
      const  {
        label, description, outcomes, restrictions, builderOrg,
        inputs, outputs, subs
      } = this.state
      //TODO avoid empty label
      //TODO add upper case at the beginning of each word
      //TODO replace special characters
      const name = label ? label.replace(/\s*/g, '') : 'EMPTYLABEL'
      const service = `${P.service}${name}`
      const graphName = `${P.cspanamed}${name}`
      
      const descr = {
        service, graphName,
        label, description, outcomes, restrictions, builderOrg,
        inputs: inputs.map(({ gsimClass }) => gsimClass),
        outputs: outputs.map(({ gsimClass }) => gsimClass),
        subs: subs.map(({ sub }) => sub)
      }
      return createService(descr)
        .then(uri => {
          this.props.flush()
          browserHistory.push(linkService(uri))
        })
    }
    
  }
  
  render() {
    const descr = this.state
    return (
      <form className="form-horizontal">
        <ServiceEditorDetails 
          descr={descr} editing={true} editUtils={this.editUtils} />
        <div className="btn-toolbar pull-right">
          <button className="btn btn-primary"
                  onClick={e => { e.preventDefault(); this.create() }}>
            <span className="glyphicon glyphicon-save"></span>&nbsp;
            Create
          </button>
          <button className="btn btn-danger"
                  onClick={e => { e.preventDefault(); this.cancel() }}>
            <span className="glyphicon glyphicon-remove"></span>&nbsp;
            Cancel
          </button>
        </div>
      </form>
    )
  }
}

export default connect(undefined, { flush })(ServiceCreator)