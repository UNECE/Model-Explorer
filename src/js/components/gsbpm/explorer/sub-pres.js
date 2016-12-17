import React from 'react'
import { Link } from 'react-router'
import { linkGSBPMSub } from '../routes'

export default function GSBPMSubprocess({ subprocess, code, label, definition }) {
  return (
    <div className="subprocess cell">
      <Link to={linkGSBPMSub(subprocess)} title={definition}>
        <div>{code}</div>
        <div>{label}</div>
      </Link>
      <GSBPMSubprocessDefinition definition={definition}/>
    </div>
  )
}

function GSBPMSubprocessDefinition({definition}) {
  var divDefinitionStyle = {display: 'none'};
  return (
    <div style={divDefinitionStyle}>{definition}</div>
  )
}
