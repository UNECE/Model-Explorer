import React, { Component } from 'react'
import SelectSubprocess from './select-subprocess'

export default class ServiceEditor extends Component {
  constructor(props) {
    super(props)
    this.handleClick = () => 
      this.props.handleClick({ label: this.refs.name.value })
  }
  
  render() {
    return (
      <form>
        <div>
          <label>Service name:</label>
          <input type="text" ref="name" />  
        </div>
        <div>
          <label>GSBPM Subprocess:</label>
          <SelectSubprocess />
        </div>
        <button onClick={e => {
          e.preventDefault()
          this.handleClick()
        }}>Create</button>
      </form>
    )
  }
}