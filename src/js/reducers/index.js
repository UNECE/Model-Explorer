import { mainReducer } from '../sparql/configure-sparql'

//If there is nothing more than the sparql queries handling in the state,
//we can simply use `mainReducer`
export default mainReducer

//If there is more in the state, we should use `enhanceReducer`

/*
import { enhanceReducer } from '../sparql/configure-sparql'

const initialReducer = (state={}, action) => ...

export default enhanceReducer({ initialReducer  })
*/

