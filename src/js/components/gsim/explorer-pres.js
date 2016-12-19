import React, { Component } from 'react'
import GSIMSelectClass from './select-class'
import GSIMSelectGroup from './select-group'

  
class GSIMExplorer extends Component {
  constructor() {
    super()
    this.state = {
      selectedGroup: null
    }
    this.selectGroup = group => this.setState({
      selectedGroup: group
    })
  }
  render() {
    const { selectedGroup } = this.state
    return(
      <div className="gsim-explorer">
        <div>
          <GSIMSelectGroup 
            select={this.selectGroup}
            selectedGroup={selectedGroup}/>
        </div>
         { selectedGroup &&
           <div className="grow">
             <GSIMSelectClass group={selectedGroup} />
           </div>
         }
      </div>
    )
  }
}

export default GSIMExplorer
