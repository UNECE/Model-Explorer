import React from 'react'
import { Link } from 'react-router'
import { uriToLink } from '../routes'

export default function ServiceList({ services }) {
  
  if (services.length === 0) 
    return (
      <div className="alert alert-warning" role="alert">
        Sorry, there is no service for this search criteria.
      </div>
    )
    
  return(
    <div className="list-group">
      { services.map(({ service, label, description }) =>
          <Link to={uriToLink.serviceDetails(service)}
                className="list-group-item" key={service} title={description}>
            { label }
          </Link>)
       }
    </div>
  )
}

ServiceList.propTypes = {
  services: React.PropTypes.array.isRequired
}
