import React from 'react'

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

export default function GSIMClassSelector({ params }) {
  console.dir(params)
  return(
    <div>
      <h3>This is the class selector</h3>
      {
        Object
          .keys(_fakeGSIM.classes)
          .map(klass =>
            <div key={klass} className="panel panel-default">
              <div className="panel-body">{klass}</div>
            </div>
          )
      }
    </div>
  )
}
