import React from 'react'

export default function GSBPMSubprocess({ code, label, active, hndlClick }) {
  return (
    <div className="subprocess cell" onClick={hndlClick}>
      <div>{code}</div>
      <div>{label}</div>
    </div>
  )
}