import React from 'react'
import { LOADED } from 'sparql-connect'
import { Link } from 'react-router'
import { uriToLink } from '../routes'
import { sparqlConnect } from '../sparql/configure-sparql'
import ServiceList from './service-list'

function Services({ loaded, services }) {
  if (loaded !== LOADED) return <span>loading services</span>
  return (<ServiceList services={services}/>)
}

export default sparqlConnect.services(Services)
export const DumbServices = Services
