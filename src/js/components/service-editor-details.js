import React, { Component , PropTypes} from 'react'
import ServiceSubEntities from './service-sub-entities'
import { uriToLink } from '../routes'


function AddButton({ label, hndlClick, disabled }) {
  return (
    <button className="small-button btn btn-default btn-sm pull-right"
            onClick={hndlClick} 
            disabled={disabled} >
      <span className="glyphicon glyphicon-plus"></span>&nbsp;
      {label}
    </button>
  )
}

export default function ServiceEditorDetails({ descr, editing, editUtils }) {
  const  {
    label, description, outcomes, restrictions,
    inputs, outputs, subs
  } = descr
  
  const {
    updateDescr,
    addInput, addOutput, addSubprocess,
    removeInput, removeOutput, removeSubprocess
  } = editUtils
  
  return (
    <div>
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
          <ServiceSubEntities
            disabled={!editing}
            entities={subs}
            makeLink={uriToLink.serviceBySubProcess}
            noMsg="No GSBPM subprocess"
            add={addSubprocess}
            remove={removeSubprocess} />
          <AddButton
            label="Add subprocess" hndlClick={addSubprocess}
            disabled={!editing} />
        </div>
      </div>
      <div className="form-group">
        <label className="col-sm-3 control-label">GSIM Inputs</label>
        <div className="col-sm-9">
          <ServiceSubEntities
            disabled={!editing}
            entities={inputs}
            makeLink={uriToLink.servicesByGsim}
            noMsg="No GSIM input"
            add={addInput}
            remove={removeInput} />
          <AddButton 
            label="Add input" hndlClick={addInput}
            disabled={!editing} />
        </div>
      </div>
      <div className="form-group">
        <label className="col-sm-3 control-label">GSIM Outputs</label>
        <div className="col-sm-9">
          <ServiceSubEntities
            disabled={!editing}
            entities={outputs}
            makeLink={uriToLink.servicesByGsim}
            noMsg="No GSIM ouput"
            add={addOutput}
            remove={removeOutput} />
          <AddButton
            label="Add ouput" hndlClick={addOutput}
            disabled={!editing} />
        </div>
      </div>                          
    </div>
  )
}

ServiceEditorDetails.propTypes = {
  descr: PropTypes.object.isRequired,
  editing: PropTypes.bool.isRequired,
  editUtils: PropTypes.object.isRequired
}
