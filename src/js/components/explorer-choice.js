import React from 'react'
import { Link } from 'react-router'

function ExplorerChoice(props) {
  return(
    <div>
      <h2>Select how you want to search a CSPA service.</h2>
      <ul>
        <li><Link to="/gsbpm">Using GSBPM</Link></li>
        <li><Link to="/gsim">Using GSIM</Link></li>
      </ul>
    </div>
  )
}

export default ExplorerChoice
