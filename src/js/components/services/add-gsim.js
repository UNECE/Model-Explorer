import React, { Component , PropTypes} from 'react'
import { sparqlConnect } from 'sparql-connect'
import AddButton from './add-gsim-gsbpm-button-pres'

/**
* Builds the query that retrieves the list of all GSIM objects.
*/
const queryBuilder = () => `
  SELECT ?GSIMClass ?label ?definition WHERE {
    ?GSIMClass rdfs:subClassOf ?group ;
               gsim:classDefinition ?definition ;
               rdfs:label ?label .
    ?group rdfs:subClassOf gsim:GSIMObject
  }
`
const connector = sparqlConnect(queryBuilder, {
  queryName: 'GSIMAllClasses'
})

class AddGSIM extends Component {
  constructor() {
    super()
    this.state = {
      selected: ''
    }
    this.edit = () => this.setState({
      editing: true
    })
    this.hndlChange = val => this.setState({
      selected: val
    })
    this.ok = () => {
      this.setState({
        editing: false,
        selected: ''
      })
      //TODO fragile (we need to give back uri and label to make
      //`ServiceSubEntities` component work, see prop `uriName` and `label` in
      //`ServiceEditorDetails` call to `ServiceSubEntities`)
      if (!this.entitiesById) this.entitiesById = this.props.GSIMClasses.reduce(
        (_, { GSIMClass, label }) => {
          _[GSIMClass] = {
            label,
            gsimClass: GSIMClass
          }
          return _
        }, {})
      this.props.add(this.entitiesById[this.state.selected])
    }
    this.cancel = () => {
      this.setState({
        editing: false
      })
    }
  }
  render() {
    const { disabled, GSIMClasses, label } = this.props
    const { selected, editing } = this.state
    if (!editing) return <AddButton
      disabled={disabled} hndlClick={this.edit} label={label} />
    return (
      <div className="form-group">
        <div className="col-sm-6 col-sm-offset-3">
          <select className="form-control" value={selected}
              onChange={ e => this.hndlChange(e.target.value) }>
            <option key='__empty__' value=''></option>
            {
              GSIMClasses.map(({ GSIMClass, label }) => 
                <option key={GSIMClass} value={GSIMClass}>
                  { label }
                </option> )
            }
          </select>
      </div>
      <div className="col-sm-3 btn-toolbar">
        <button className="small-button btn btn-primary btn-sm pull-right"
            onClick={this.ok} disabled={selected === ''}>
            OK
        </button>
        <button className="small-button btn btn-danger btn-sm pull-right"
            onClick={this.cancel} >
          Cancel
        </button>
      </div>
    </div>
    )
  }
}

AddGSIM.propTypes = {
  add: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired
}

export default connector(AddGSIM)


