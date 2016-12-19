# Destructuring

function ServicesList({ results }) {
  return (
    <ul>
      { results.map(({ service, label }) => 
        <li key={service}>{ label }</li>
      )}
    </ul>
  )