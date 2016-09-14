import React, { Component } from 'react'
import SelectSubprocess from './select-subprocess'
import SelectClass from './select-class'

export default class ServiceEditor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      label: '',
      GSIMIn: '',
      GSIMOut: '',
      GSBPMSub: '',
      outcomes: '',
      description: '',
      restrictions: ''
    }
    this.changeLabel = label => this.setState({ label })
    this.changeGSBPMSub = GSBPMSub => this.setState({ GSBPMSub })
    this.changeGSIMIn = GSIMIn => this.setState({ GSIMIn })
    this.changeGSIMOut = GSIMOut => this.setState({ GSIMOut })

    this.handleClick = () => {
      const {
        label, GSBPMSub, GSIMIn, GSIMOut, outcomes, description, restrictions
      } = this.state
      this.props.handleClick({
        label, GSBPMSub, GSIMIn, GSIMOut, outcomes, description, restrictions
      })
    }
  }

  render() {
    const { label, GSIMIn, GSIMOut, GSBPMSub } = this.state
    return (
      <form>
        <div className="form-group">
          <label>Service label:</label>
          <input className="form-control" type="text"
                 value={label}
                 onChange={e => this.changeLabel(e.target.value )}/>
        </div>
        <div className="form-group">
          <label>GSBPM Subprocess:</label>
          <SelectSubprocess value={GSBPMSub}
                            handleChange={this.changeGSBPMSub} />
        </div>
        <div className="form-group">
          <label>GSIM input:</label>
          <SelectClass value={GSIMIn}
                      handleChange={this.changeGSIMIn}/>
        </div>
        <div className="form-group">
          <label>GSIM output:</label>
          <SelectClass value={GSIMOut}
                       handleChange={this.changeGSIMOut}/>
        </div>
        <button type="button" className="btn btn-success"
                onClick={e => {
                  e.preventDefault()
                  this.handleClick()
        }}>Create</button>
      </form>
    )
  }
}
