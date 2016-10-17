import React, { Component } from 'react'
import GSIMGroupSelector from './gsim-group-selector'
import { LOADED } from 'sparql-connect' 
import { sparqlConnect } from '../sparql/configure-sparql'
import { browserHistory } from 'react-router'
import { uriToLink } from '../routes'
import classnames from 'classnames'

const ALL = 'ALL'
//TODO use group uri instead of label
//It allows to improve aesthetics for expected groups (and ensure order) to make
//the GSIM explorer looks like the image with the four colored squares.
const knowGroupLabels = [
  'Business', 'Exchange', 'Structures', 'Concepts'
]

//TODO merge byGsimInput and byGsimOutput (small icon to differentiate between
//them)

//FIXME A request is sent even if the data has already been loaded. It does not
//concern only this component, and it might be an issue with `sparql-connect`
//with queries that do not take any parameters.
//
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

function GSIMSelectClass_({ loaded, GSIMClasses, selectClass }){
  if (loaded !== LOADED) return <span>loading...</span>
  return (
    <div className="list-group">
    {
      GSIMClasses.map(({ GSIMClass, label }) =>
        <a
          key={GSIMClass}
          className="list-group-item"
          href={uriToLink.servicesByGsim(GSIMClass)}>{label}</a>)
    }
    </div>
  )
}

const GSIMSelectClass = sparqlConnect.GSIMClasses(GSIMSelectClass_)

function GSIMSelectGroup_({ loaded, selectedGroup, groups, select, unselect }) {
  if (loaded !== LOADED) return <span>loading...</span>
  const groupsByLabel = groups.reduce((_, group) => {
    _[group.label] = group
    return _
  }, {})
  
  const knownGroups = knowGroupLabels.map(label => groupsByLabel[label])
  const unknownGroups = groups.filter(group => 
    knowGroupLabels.indexOf(group.label) === -1
  )
  const cn = selectedGroup ? 'gsim-select-group-small' : 'gsim-select-group-full'
  return (
    <div className={cn}>
      { knownGroups.map(({ group, label }) => {
          const cn = classnames(
            `gsim-group-${label.toLowerCase()}`,
            group === selectedGroup && 'active')
          return (
            <div key={group}
                   className={cn}
                   onClick={() => select(group)}>
                {label}
              </div> 
          )
        })
      }
      {
        selectedGroup && 
          <a href="#" onClick={e => {e.preventDefault();select()}}>
            main explorer
          </a>
      }
    </div>
  )
}

const GSIMSelectGroup = sparqlConnect.GSIMGroups(GSIMSelectGroup_)

export default GSIMExplorer
