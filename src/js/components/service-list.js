import React from 'react'
import { Link } from 'react-router'
import { uriToLink } from '../routes'

export default function ServiceList({ services }) {
  return(
    <div>
      <h1>Service list</h1>
        <div className="list-group">
        { services.map(({ service, label }) =>
          <Link to={uriToLink.serviceDetails(service)}
                className="list-group-item" key={service}>
            { label }
          </Link>
        )}
      </div>
    </div>
  )
}

ServiceList.propTypes = {
  services: React.PropTypes.array.isRequired
}
