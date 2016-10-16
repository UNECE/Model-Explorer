import React from 'react'

export default function NSIList({ nsis }) {
  
  if (nsis.length === 0) 
    return (
      <div className="alert alert-warning" role="alert">
        Sorry, the NSI list is empty.
      </div>
    )
    
  return(
    <div className="list-group">
      { nsis.map(({ nsi, label }) =>
          <p>
            { label }
          </p>)
       }
    </div>
  )
}

NSIList.propTypes = {
  nsis: React.PropTypes.array.isRequired
}
