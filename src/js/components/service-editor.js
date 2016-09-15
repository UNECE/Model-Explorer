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
          <label>Service label:</label>
          <input type="text" value={label}
                 onChange={e => this.changeLabel(e.target.value )}/>  
        </div>
        <div>
          <label>GSBPM Subprocess:</label>
          <SelectSubprocess value={GSBPMSub}
                            handleChange={this.changeGSBPMSub} />
        </div>
        <div>
          <label>GSIM input:</label>
          <SelectClass value={GSIMIn} 
                      handleChange={this.changeGSIMIn}/>
        </div>  
        <div>
          <label>GSIM output:</label>
          <SelectClass value={GSIMOut}
                       handleChange={this.changeGSIMOut}/>
        </div>                 
        <button onClick={e => {
          e.preventDefault()
          this.handleClick()
        }}>Create</button>
      </form>
    )
  }
}