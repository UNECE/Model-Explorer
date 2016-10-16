import React from 'react'
import { Link } from 'react-router'

export default function App({ children }) {
  return (
    <div className="container-fluid">
      <header>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <Link className="navbar-brand" to="/">CSPA service app</Link>
            </div>
            <div className="collapse navbar-collapse">
              <ul className="nav navbar-nav">
                <li>
                  <Link to="/gsbpm">Search the GSBPM</Link>
                </li>
                <li>
                  <Link to="/gsim">Search the GSIM</Link>
                </li>
                <li>
                  <Link to="/nsis">NSIs</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      {/* Children is a special prop name with react. Here, it allows
          `react-router` to populate our main component with the components
          that match the route */}
      { children }
    </div>
  )
}
