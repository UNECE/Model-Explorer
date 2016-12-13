import React from 'react'
import ServiceList from '../shared/service-list'

export default function ServicesByGSIM({ services, msg }){
  return <ServiceList
    services={services}
    msg={msg} />
}

