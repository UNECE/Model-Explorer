/**
 * Remove all items in an array where a given property matches a given value
 *
 * It takes an array of objects.
 * It returns an array where matching objects have been removed.
 * It does not mutate the initial array.
 * 
 * @param  {array} arr  an array of objects
 * @param  {*}     val  the value to match
 * @param  {string} key the key to check
 * @return {array}      an array with the objects not matching the criteria
 */
export function removeInArrByKey(arr, val, key) {
  return arr.filter(o => o[key] !== val)
}

/**
 * Add an object at the end of an array if it is not present
 *
 * It does not mutate the intial array.
 * 
 * @param  {array} arr  an array of objects
 * @param  {*}     o    object to be added
 * @return {array}      an array with the new object added
 */
export function addInArr(arr, o) {
  const index = arr.indexOf(o)
  if (index > -1) return arr
  const arrCopy = arr.slice(0)
  arrCopy.push(o)
  return arrCopy
}

/**
 * Sort an array of objects by a given key
 *
 * We can sort by a "nested" key if multiple keys are given. For instance,
 * `sortByKeys(arr, 'person', 'firstname')` will compare `obj.person.firstname`
 * for each object in the array.
 * Returns a new array.
 * 
 * @param  {array}  arr an array to sort
 * @param  {string} key the key to check for sorting
 * @return {array}      a sorted array
 */
export function sortByKeys(arr, ...keys) {
  let take
  if (keys.length === 1) take = obj => obj[keys[0]]
  else take = obj => keys.reduce((_, key) => _[key], obj)
  return arr.sort((a, b) => {
    const left = take(a)
    const right = take(b)
    return right < left ? 1 :
           right === left ? 0 :
           -1
  })
}