import React from 'react'
import { Link } from 'react-router'
import { uriToLink } from '../routes'

export default function ServiceList({ services }) {
  return(
    <ul>
      { services.map(({ service, label }) =>
        <li key={service}>
          <Link to={uriToLink.serviceDetails(service)}>
            { label }
          </Link>
        </li>)}
    </ul>
  )
}

ServiceList.propTypes = {
  services: React.PropTypes.array.isRequired
}
