import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { linkService } from '../services/routes'

export default function ServiceList({
  services,
  msg = 'Sorry, there is no service for this search criteria.' }) {
  
  if (services.length === 0) 
    return (
      <span>{msg}</span>
    )
    
  return(
    <div className="list-group">
      { services.map(({ service, label, description }) =>
        <Link key={service} to={linkService(service)}
          className="list-group-item" key={service} title={description}>
          { label }
        </Link>)
       }
    </div>
  )
}

ServiceList.propTypes = {
  msg: PropTypes.string,
  services: React.PropTypes.array.isRequired
}
