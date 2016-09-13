import React from 'react'

function GSIMGroupSelector({ groups }) {
  return(
    <div>
      <h3>GSIM group selector</h3>
      <select name="gsim-group-selector">
        { Object
            .keys(groups)
            .map(key => <option key={key} value={key}>{key}</option>)
        }
      </select>
    </div>
  )
}

GSIMGroupSelector.propTypes = {
  groups: React.PropTypes.object.isRequired
}

export default GSIMGroupSelector
