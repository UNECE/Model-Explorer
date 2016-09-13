import React from 'react'
import GSIMGroupSelector from './gsim-group-selector'

// FIXME mock data while waiting for
const _fakeGSIM = {
  groups: {
    business: {},
    exchange: {},
    structures: {},
    concepts: {}
  }
}

function GSIMExplorer(props) {
  return(
    <div>
      <h2>This is the GSIM Explorer</h2>
      <GSIMGroupSelector groups={_fakeGSIM.groups} />
    </div>
  )
}

export default GSIMExplorer
