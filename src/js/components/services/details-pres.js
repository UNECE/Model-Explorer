import React, { PropTypes} from 'react'
import ServiceSubEntities from '../shared/service-sub-entities'
import { linkGSIMClass } from '../gsim/routes'
import { linkGSBPMSub } from '../gsbpm/routes'
import AddGSIM from './add-gsim'
import AddGSBPM from './add-gsbpm'
import OrganizationPicker from './organization-picker'

export default function ServiceDetails({ descr, editing, editUtils }) {
  const  {
    label, description, outcomes, restrictions, builderOrg,
    inputs, outputs, subs
  } = descr
  
  const {
    hndlLabelChange, hndlDescriptionChange, hndlOutcomesChange,
    hndlRestrictionsChange, hndlBuilderOrgChange,
    addInput, addOutput, addSubprocess,
    removeInput, removeOutput, removeSubprocess
  } = editUtils
  
  //TODO investigate `makeLink` usage
  return (
    <div>
      <div className="form-group">
        <label className="col-sm-3 control-label">Label</label>
        <div className="col-sm-9">
          <input
            disabled={!editing} type="text" className="form-control"
            value={label} onChange={ e => hndlLabelChange(e.target.value) }/>
        </div>
      </div>
      <div className="form-group">
        <label className="col-sm-3 control-label">Description</label>
        <div className="col-sm-9">
          <textarea rows="3" 
            disabled={!editing} type="text" className="form-control"
            value={description}
            onChange={ e => hndlDescriptionChange(e.target.value) }/>
        </div>
      </div>
      <div className="form-group">
        <label className="col-sm-3 control-label">Outcomes</label>
        <div className="col-sm-9">
          <textarea rows="3" 
            disabled={!editing} type="text" className="form-control"
            value={outcomes}
            onChange={ e => hndlOutcomesChange(e.target.value) }/>
        </div>
      </div>
      <div className="form-group">
        <label className="col-sm-3 control-label">Restrictions</label>
        <div className="col-sm-9">
          <textarea rows="3" 
            disabled={!editing} type="text" className="form-control"
            value={restrictions}
            onChange={ e => hndlRestrictionsChange(e.target.value) }/>
        </div>
      </div>
      <div className="form-group">
        <label className="col-sm-3 control-label">Builder organization</label>
        <div className="col-sm-9">
          <OrganizationPicker disabled={!editing} 
            value={builderOrg}
            onChange={org => hndlBuilderOrgChange(org)} />
        </div>
      </div>                
      <div className="form-group">
        <label className="col-sm-3 control-label">Subprocess</label>
        <div className="col-sm-9">
          <ServiceSubEntities
            disabled={!editing}
            entities={subs}
            uriName="sub"
            makeLink={linkGSBPMSub}
            noMsg="No GSBPM subprocess"
            add={addSubprocess}
            remove={removeSubprocess} />
        </div>
      </div>
      <AddGSBPM
        label="Add subprocess" add={addSubprocess}
        disabled={!editing} />
      <div className="form-group">
        <label className="col-sm-3 control-label">GSIM Inputs</label>
        <div className="col-sm-9">
          <ServiceSubEntities
            disabled={!editing}
            entities={inputs}
            uriName="gsimClass"
            makeLink={linkGSIMClass}
            noMsg="No GSIM input"
            add={addInput}
            remove={removeInput} />
        </div>
      </div>
      <AddGSIM
        label="Add input" add={addInput}
        disabled={!editing} />
      <div className="form-group">
        <label className="col-sm-3 control-label">GSIM Outputs</label>
        <div className="col-sm-9">
          <ServiceSubEntities
            disabled={!editing}
            entities={outputs}
            uriName="gsimClass"
            makeLink={linkGSIMClass}
            noMsg="No GSIM ouput"
            add={addOutput}
            remove={removeOutput} />
        </div>
      </div>                          
      <AddGSIM
      label="Add ouput" add={addOutput}
      disabled={!editing} />
    </div>
  )
}

ServiceDetails.propTypes = {
  descr: PropTypes.object.isRequired,
  editing: PropTypes.bool.isRequired,
  editUtils: PropTypes.object.isRequired
}
