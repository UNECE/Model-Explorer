import React from 'react'

export default function NSIList({ nsis }) {

  if (nsis.length === 0)
    return (
      <div className="alert alert-warning" role="alert">
        Sorry, the NSI list is empty.
      </div>
    )

  return(
    <table className="table">
    <thead>
      <tr>
        <th>Coutry</th>
        <th>Institute</th>
      </tr>
    </thead>
    <tbody>
      { nsis.map(({ nsi, label }) =>
        <tr>
          <td>{nsi.slice(-2)}</td><td>{ label }</td>
        </tr>)
       }
      </tbody>
    </table>
  )
}

NSIList.propTypes = {
  nsis: React.PropTypes.array.isRequired
}
