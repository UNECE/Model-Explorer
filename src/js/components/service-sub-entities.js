import React, { PropTypes } from 'react'
import { Link } from 'react-router'

//TODO make it generic (it's duplicated for gsim inputs and outputs)
export default function ServiceSubEntities(
    { entities, remove, disabled, noMsg, makeLink }) {
  if (entities.length === 0)
    return <span className="form-control">{noMsg}</span>
  return (
      <ul className="list-group" style={{ marginBottom: '5px' }}>
        { entities.map(({ uri, label }) =>
            <li className="list-group-item" key={uri}>
              <Link to={makeLink(uri)}>
                {label}
              </Link>
              { !disabled &&
               <a href="#" className="pull-right"
                  onClick={() => remove(uri)} >
                 <span className="glyphicon glyphicon-remove"></span>
               </a>
              }
            </li> )}
      </ul>
  )
}

ServiceSubEntities.propTypes = {
  entities: PropTypes.array.isRequired,
  remove: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  noMsg: PropTypes.string.isRequired,
  makeLink: PropTypes.func.isRequired
}