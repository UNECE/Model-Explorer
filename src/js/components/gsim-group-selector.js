import React from 'react'
import { browserHistory, Link } from 'react-router'

// FIXME mock data while waiting for
const _fakeGSIM = {
  groups: {
    business: {},
    exchange: {},
    structures: {},
    concepts: {}
  },
  classes: {
    informationSet: {},
    dataSet: {},
    referentialMetadataStructure: {}
  }
}

function GSIMGroupSelector({ location, children }) {
  console.dir(children)
  return(
    <div>
      <h3>GSIM group selector</h3>
      {
        Object
          .keys(_fakeGSIM.groups)
          .map(group =>
            <div key={group} className="panel panel-default">
              <Link to={`${location.pathname}/${group}`}>
                <div className="panel-body">
                  {group} <span className="glyphicon glyphicon-arrow-right pull-right"></span>
                </div>
              </Link>
            </div>)
      }
      { children }
    </div>
  )
}

export default GSIMGroupSelector
