import React from 'react'
import { Link } from 'react-router'
import { uriToLink } from '../routes'

export default function ServiceList({ services }) {
  return(
    <div>
      <h1>Service list</h1>
      <ul>
        { services.map(({ service, label }) =>
          <li key={service}>
            <Link to={uriToLink.serviceDetails(service)}>
              { label }
            </Link>
          </li>)}
      </ul>
    </div>
  )
}

ServiceList.propTypes = {
  services: React.PropTypes.array.isRequired
}
