import React from 'react'

export default function NSIList({ nsis }) {

  if (nsis.length === 0)
    return (
      <div className="alert alert-warning" role="alert">
        Sorry, the NSI list is empty.
      </div>
    )

  return(
    <ul className="list-group">
      { nsis.map(({ nsi, label }) =>
          <li className="list-group-item">
            {nsi.slice(-2)}-{ label }
          </li>)
       }
    </ul>
  )
}

NSIList.propTypes = {
  nsis: React.PropTypes.array.isRequired
}
