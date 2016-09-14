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
  return (
    <ServiceEditor handleClick={handleClick}/>
  )
}
