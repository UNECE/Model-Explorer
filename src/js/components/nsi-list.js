import React from 'react'
import { uriToLink } from '../routes'

export default function NSIList({ nsis }) {
  
  if (nsis.length === 0) 
    return (
      <div className="alert alert-warning" role="alert">
        Sorry, the NSI list is empty.
      </div>
    )
 //structure nsi list : first level nsi, secund level service and role  (idea : make a table)
 //1 build a list of distinct nsi (for loop)
 
 //2 for each distinct nsi, collect the part in the nsis list ; There can be no service/role, in this case a null value (or anything  else )
 //3 structure of nsis : {nsi, nsi, nsi} nsi={uri, label, services_and_roles = null}
 // => use nsis.reduce(???) to do it in one pass

var nsisReduced = nsis.reduce(function(accumulator, currentValue, currentIndex, array){
	
	/*if(accumulator === [] ){
		return(accumulator.push(objectToPush)) 
	} else{*/
	//console.log({a: currentIndex, b: Array.isArray(accumulator), c: accumulator})
	//console.log()
	var currentValueWithKey0, currentValueWithKey
	var containsRole = currentValue.service != '' 
	if(containsRole){
		currentValueWithKey0 = currentValue
		currentValueWithKey0['key'] = 0
		currentValueWithKey=[currentValueWithKey0]
	} else {
		currentValueWithKey = []
	}
	
	var objectToPush = [{nsi: currentValue.nsi, label: currentValue.label, key:currentIndex,  serviceAndRole: currentValueWithKey }]
	if(currentIndex == 0){
		return(objectToPush)
	}
	var functionIndex=function(p){ 
	return(p.nsi == currentValue.nsi) }
		var nsiFound = accumulator.findIndex(functionIndex)
		if(nsiFound != -1){
			if(containsRole){
				if (accumulator[nsiFound].serviceAndRole.length > 0 && currentValueWithKey.length > 0 ){
				currentValueWithKey[0]['key'] = 1+accumulator[nsiFound].serviceAndRole[accumulator[nsiFound].serviceAndRole.length-1].key
				}
				accumulator[nsiFound].serviceAndRole= accumulator[nsiFound].serviceAndRole.concat(currentValueWithKey)
			}
			return(accumulator)
		}

	
	return(accumulator.concat(objectToPush))
	}
	,[])
	
	//console.log(nsisReduced)
  return(
    <ul className="list-group">
      { nsisReduced.map(({nsi, label, key, serviceAndRole }) => NSIelement({nsi, label, key, serviceAndRole })
)
       }
    </ul>
  )
}

function NSIelement({nsi, label, key, serviceAndRole }) {
if(serviceAndRole.length > 0){
return (
          <li className="list-group-item" key={key}>
           { label }
		   <NSIserviceAndRoleList nsi={nsi} label = {label} serviceAndRole={serviceAndRole}/>
          </li>
		)
} else {
          return( <li className="list-group-item" key={key}>
           { label }
          </li>)
	
}
		
}

function NSIserviceAndRoleList({ nsi, label, serviceAndRole }) {
		//<div className="test">
		//<tr className="list-group-NSI_sarl">
		//</tr>
		//</div>
		var style = {table:{}, th: {}, td: {}, thead: {}, tbody: {}, tr: {}}
		style.th=style.td={padding: '5px'}
return (

		<table style={style.table}>
		<thead style={style.thead}>
<tr style={style.tr}>
	<th style={style.th}>Service</th>
	<th style={style.th}>Level</th>
	<th style={style.th}>Role</th>

</tr>
	</thead>
<tbody>
      { serviceAndRole.map((serviceAndRoleElement) => NSIserviceAndRoleElement(serviceAndRoleElement,style))}
</tbody>
	</table>
         
		)

}

function NSIserviceAndRoleElement(serviceAndRoleElement,style) {
//<li className="list-group-item" key={serviceAndRoleElement.key}>
//</li>
return (
          
			  <tr style={style.tr} key={serviceAndRoleElement.key}>
			  <td style={style.td}>
				<a href={uriToLink.serviceDetails(serviceAndRoleElement.service)}>
			  {//uri={serviceAndRoleElement.service}
			  }
			  {serviceAndRoleElement.serviceLabel}</a>
			  </td>
			  <td style={style.td}>
			  {//uri={serviceAndRoleElement.descriptionLevel}
			  }
			  {serviceAndRoleElement.descriptionLevelName}
			  </td>
			  <td style={style.td}>
			  {//uri={serviceAndRoleElement.role}
			  }
			  {serviceAndRoleElement.roleLabel}
			  </td>
			  </tr>

          
		)	
}

NSIList.propTypes = {
  nsis: React.PropTypes.array.isRequired
}
