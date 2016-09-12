import React from 'react'
import { Link } from 'react-router'
import { sparqlConnect } from '../sparql/configure-sparql'
import { connectFromRoute } from '../routes'
import { LOADED } from 'sparql-connect'

function ClassificationDetails({ loaded, label }) {
  if (loaded !== LOADED) return <span>classification details are loading</span>
  return (
    <div>
      { label }
    </div>
  )
}
export default connectFromRoute(
  sparqlConnect.classificationDetails(ClassificationDetails))