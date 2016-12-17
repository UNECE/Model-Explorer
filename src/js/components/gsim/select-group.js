import React from 'react'
import { sparqlConnect } from '../../sparql/configure-sparql'
import { Link } from 'react-router'
import classnames from 'classnames'

//TODO use group uri instead of label
//It allows to improve aesthetics for expected groups (and ensure order) to make
//the GSIM explorer looks like the image with the four colored squares.
const baseGroupLabel = 'Base'
const otherGroupLabels = [
  'Business', 'Exchange', 'Structures', 'Concepts'
]

/**
 * Builds the query that retrieves the list of all GSIM groups.
 */
const queryBuilder = () => `
  SELECT ?group ?label WHERE {
    ?group rdfs:subClassOf gsim:GSIMObject .
    ?group rdfs:label ?label
  }
`

const connector = sparqlConnect(queryBuilder, {
  queryName: 'GSIMGroups'
})

function GSIMSelectGroup({ selectedGroup, GSIMGroups, select }) {
  const groupsByLabel = GSIMGroups.reduce((_, group) => {
    _[group.label] = group
    return _
  }, {})
  
  const baseGroup = groupsByLabel[baseGroupLabel]
  const otherGroups = otherGroupLabels.map(label => groupsByLabel[label])
  
  const cnBase = `base-group-link ${selectedGroup && 'base-group-link-small'}`
  const cn = selectedGroup ? 'gsim-select-group-small' : 'gsim-select-group-full'
  return (
    <div className="gsim-select-group">
      <Link className={cnBase}
        onClick={e => { e.preventDefault(); select(baseGroup.group)}}>
        Base group
      </Link>
      <div className={cn}>
        { otherGroups.map(({ group, label }) => {
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
            <Link onClick={e => {e.preventDefault();select()}}>
              main explorer
            </Link>
        }
      </div>
    </div>
  )
}

export default connector(GSIMSelectGroup)