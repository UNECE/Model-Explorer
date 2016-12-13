import React from 'react'
import { browserHistory, Link } from 'react-router'
import { sparqlConnect } from '../../sparql/configure-sparql'
import { LOADED } from 'sparql-connect'

function GSIMGroupSelector({ location, children, loaded, groups }) {
  if (loaded !== LOADED) {
    return(<div>LOADING...</div>)
  }
  console.log(groups)
  return(
    <div>
      <h2>You may select a GSIM group</h2>
      {
        groups
          .map(group =>
            <div key={group.group} className="panel panel-default">
              <Link to={`${location.pathname}/${group.group}`}>
                <div className="panel-body">
                  {group.label} <span className="glyphicon glyphicon-arrow-right pull-right"></span>
                </div>
              </Link>
            </div>)
      }
      { children }
    </div>
  )
}

export default sparqlConnect.GSIMGroups(GSIMGroupSelector)
