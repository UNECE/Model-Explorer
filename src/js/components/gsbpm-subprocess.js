import React from 'react'
import { Link } from 'react-router'

const removeWhiteSpaces = (str) => str.replace(/\s+/g, '')

function GSBPMSubprocess(props) {
  return(
    <p>
      <Link to={`/servicebysubprocess/${removeWhiteSpaces(props.label)}`}>
        {props.label}
      </Link>
    </p>
  )
}

export default GSBPMSubprocess;
