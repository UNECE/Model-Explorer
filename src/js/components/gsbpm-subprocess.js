import React from 'react'
import { Link } from 'react-router'
import { uriToLink } from '../routes'

const removeWhiteSpaces = (str) => str.replace(/\s+/g, '')

export default function GSBPMSubprocess(props) {
  return(
    <p>
      <Link to={uriToLink.serviceBySubProcess(props.id)}>
        {props.label}
      </Link>
    </p>
  )
}

GSBPMSubprocess.propTypes = {
  id: React.PropTypes.string.isRequired,
  label: React.PropTypes.string.isRequired,
}
