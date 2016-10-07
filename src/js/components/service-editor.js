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
      description: '',
      outcomes: '',
      restrictions: ''
    }
    
    this.changeLabel = label => this.setState({ label })
    this.changeDescription = description => this.setState({ description })
    this.changeRestrictions = restrictions => this.setState({ restrictions })
    this.changeOutcomes = outcomes => this.setState({ outcomes })
    this.changeGSBPMSub = GSBPMSub => this.setState({ GSBPMSub })
    this.changeGSIMIn = GSIMIn => this.setState({ GSIMIn })
    this.changeGSIMOut = GSIMOut => this.setState({ GSIMOut })

    this.handleClick = () => {
      const {
        label, GSBPMSub, GSIMIn, GSIMOut, outcomes, description, restrictions
      } = this.state
      this.props.handleClick({
        label, outcomes, description, restrictions,
        GSBPMSub: [GSBPMSub],
        GSIMIn: [GSIMIn],
        GSIMOut: [GSIMOut]
      })
    }
  }

  render() {
    const { label, GSIMIn, GSIMOut, GSBPMSub } = this.state
    return (
      <form>
        <div>
          <label>Label:</label>
          <input type="text" value={label}
                 onChange={e => this.changeLabel(e.target.value )}/>  
        </div>
        <div>
          <label>Description:</label>
          <input type="text" value={label}
                 onChange={e => this.changeDescriptionl(e.target.value )}/>  
        </div>
        <div>
          <label>Outcomes:</label>
          <input type="text" value={label}
                 onChange={e => this.changeOutcomes(e.target.value )}/>  
        </div>
        <div>
          <label>Restrictions:</label>
          <input type="text" value={label}
                 onChange={e => this.changeRestrictions(e.target.value )}/>  
        </div>                        
        <div>
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
