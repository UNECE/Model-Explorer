import React, { Component, PropTypes } from 'react'
import { browserHistory } from 'react-router'
import { removeService } from '../sparql/updates'
import ServiceEditorDetails from './service-editor-details'

export default class ServiceEditor extends Component {
  constructor(props) {
    super(props)
    const { descr, commit } = props
    const {
      label, description, outcomes, subprocess, restrictions,
      inputs, outputs, subs
    } = descr
    
    this.state = {
      label,
      description,
      outcomes,
      restrictions,
      subprocess,
      subs,
      inputs,
      outputs,
    }
  
    this.save = () => {
      
    }
    
    this.addInput = () => {
      
    }
    
    this.addOutput = () => {
      
    }
    
    this.addSubprocess = () => {
      
    }
    this.removeInput = () => {}
    this.removeOutput = () => {}
    this.removeSubprocess = () => {}
    this.updateDescr = () => {}
  }
  
  render() {
    const {
      descr, editing
    } = this.props

    
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
      <div>
        <ServiceEditorDetails
          descr={descr}
          editing={editing}
          editUtils={editUtils} />
      </div>
    )
  }
}

ServiceEditor.propTypes = {
  descr: PropTypes.object.isRequired,
  editing: PropTypes.bool.isRequired,
  commit: PropTypes.func.isRequired
}