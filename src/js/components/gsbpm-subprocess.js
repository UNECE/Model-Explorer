import React from 'react'
import { uriToLink } from '../routes'

export default function GSBPMSubprocess({ subprocess, code, label, active }) {
  return (
    <a className="subprocess cell" 
        href={uriToLink.serviceBySubProcess(subprocess)}>
      <div>{code}</div>
      <div>{label}</div>
    </a>
  )
}