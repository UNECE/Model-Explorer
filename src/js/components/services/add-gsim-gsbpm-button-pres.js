import React, { PropTypes } from 'react'
export default function AddButton({ disabled, hndlClick, label }) {
  return (
    <div className="form-group">
      <div className="col-sm-3 col-sm-offset-9">
        { !disabled && 
          <button 
            className="form-control btn btn-default btn-sm"
            onClick={e => { e.preventDefault(); hndlClick() }} >
          <span className="glyphicon glyphicon-plus"></span>&nbsp;
          {label}
        </button>
      }
      </div>
    </div>
  )
}

AddButton.propTypes = {
  disabled: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  hndlClick: PropTypes.func.isRequired
}