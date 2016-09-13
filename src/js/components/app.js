import React from 'react'
import { Link } from 'react-router'

//TODO config routes for GSIM and GSBPM explorers in the dedictated file
export default function App({ children }) {
  return (
    <div className="container-fluid">
      <header>
        Explore with:
        <ul>
          <li>
            <Link to="/gsbpm">GSBPM</Link>
          </li>
          <li>
            <Link to="/gsim">GSIM</Link>
          </li>
        </ul>

      </header>
      <h1>Model Explorer</h1>
      {/* Children is a special prop name with react. Here, it allows
          `react-router` to populate our main component with the components
          that match the route */}
      { children }
    </div>
  )
}
