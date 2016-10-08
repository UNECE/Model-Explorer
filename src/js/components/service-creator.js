import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { uriToLink } from '../routes'
import { createService } from '../sparql/updates'
import ServiceEditor from './service-editor'

export default function ServiceCreator() {
  const service = {}
  const handleClick = descr => {
    createService(descr)
      .then(uri => {
        browserHistory.push(uriToLink.serviceDetails(uri))
      })
  }
  
  const cancel = () => browserHistory.push('')
  
  const descr = {
    label: '',
    description: '',
    outcomes: '',
    restrictions: '',
    subs: [],
    inputs: [],
    outputs: []
  }
  
  const commit = data => console.log('it will create the service', data)
  
  return (
    <form className="form-horizontal">
      <ServiceEditor descr={descr} editing={true} commit={commit} />
      <div className="btn-toolbar pull-right">
      <button className="btn btn-primary"
              onClick={e => { e.preventDefault();  }}>
        <span className="glyphicon glyphicon-save"></span>&nbsp;
        Save
      </button>
        <button className="btn btn-danger"
                onClick={e => { e.preventDefault(); cancel() }}>
          <span className="glyphicon glyphicon-remove"></span>&nbsp;
          Cancel
        </button>
      </div>
    </form>
  )
}
