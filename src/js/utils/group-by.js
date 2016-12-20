import { sortByKeys } from './arrays'

/**
 * Extract given properties from an object
 *
 * It takes an object and an array of keys to extract from this object.
 * 
 * @param  {object} entry initial object
 * @param  {array} props  list of property names
 * @return {object}       object with the expected properties
 */
const takeProps = (entry, props) =>
  props.reduce((filteredEntry, prop) => {
    filteredEntry[prop] = entry[prop]
    return filteredEntry
  }, {})

/**
 * Extract all but the given properties from an object
 *
 * It takes an object and an array of keys to skip.
 * 
 * @param  {object} entry  initial object
 * @param  {array} remove  list of property names to skip
 * @return {object}        object with the epected properties
 */
const leaveProps = (entry, props) =>
  Object.keys(entry).reduce((filteredEntry, prop) => {
    if (props.indexOf(prop) === -1) filteredEntry[prop] = entry[prop]
    return filteredEntry
  }, {})

/**
 * Transform an array of objects with multiple entries for a given key into an
 * object where all the entries with the same `key` value are grouped together.
 *
 * It returns an object where properties are the distinct values for `key` and
 * each entry has:
 * - an `id` property with the value of the key ;
 * - a `props` property with all the properties listed in the `props` argument.
 * These properties are supposed to be shared by all occurences with the same
 * `key` value (we keep those found on the first occurence for a given `key`
 * value)
 * - an `entries` property which is an array with for each object corresponding
 * to the current `key` value, all the remaining properties.
 *
 * Example:
 * * groupBy(
 * [
 *  { name: 'john', age: '35', country: 'uk', stuff: 'something' },
 *  { name: 'john', age: '35', country: 'uk', stuff: 'else' },
 *  { name: 'jack', age: '33', country: 'us', stuff: 'anything'}
 * ],
 * 'name', //key
 * 'age', 'country' //properties shared by all occurences with the same `name`
 * )
 * ->
 * {
 *  john: {
 *   props: { country: 'uk', age: '35' },
 *   entries: [{ stuff: 'something' }, { stuff: 'else' }]
 *  },
 *  jack: {
 *   props: { country: 'us', age: '33' },
 *   entries: [{ stuff: 'anything'}]
 *  }
 * }
 * 
 * @param  {array} results     list of objects
 * @param  {string} key        the key to group by
 * @param  {array}  props      the properties shared by all objects with the
 *                             same `id`
 * @return {object}            an object of objects with `key` values as
 *                             property names
 */
export function groupBy(results, key, ...props) {
  // no order for now
  return results.reduce((groups, entry) => {
    const keyValue = entry[key]
    if (!groups.hasOwnProperty(keyValue)) groups[keyValue] = {
      props: takeProps(entry, props),
      entries: []
    }
    groups[keyValue].entries.push(leaveProps(entry, key, props))
    return groups
  }, {})
}

/**
 * Transform an array of objects with multiple entries for a given key into an
 * array of objects grouped and sorted by this key.
 *
 * It returns an array where each item has:
 * - an `id` property with the value of the key ;
 * - a `props` property with all the properties listed in the `props` argument.
 * These properties are supposed to be shared by all occurences with the same
 * `key` value (we keep those found on the first occurence for a given `key`
 * value)
 * - an `entries` property which is an array with for each object corresponding
 * to the current `key` value, all the remaining properties.
 *
 * This array is sorted by `sortingKey`.
 * 
 * It does not value the ordering of the initial results (as a consequence of an
 * ORDER BY statement in the sparql query for instnace): sorting is fast on the
 * client, we can lose the order with `groupBy` and create then again with this
 * function.
 * 
 *  `sortingKey` should be in the props (ie, it should information related to
 *  the entity we group by).
 *
 * Example:
 * * groupByWithOrder(
 * [
 *  { name: 'john', age: '35', country: 'uk', stuff: 'something' },
 *  { name: 'john', age: '35', country: 'uk', stuff: 'else' },
 *  { name: 'jack', age: '33', country: 'us', stuff: 'anything'}
 * ],
 * 'name', //key
 * 'age', //sorting key
 * 'age', 'country' //properties shared by all occurences with the same `name`
 * )
 * ->
 * [
 * {
 *  id: 'jack',
 *  props: { country: 'us', age: '33' },
 *  entries: [{ stuff: 'anything'}]
 * }, {
 *  id: 'john',
 *  props: { country: 'uk', age: '35' },
 *  entries: [{ stuff: 'something' }, { stuff: 'else' }]
 * ]
 * 
 * @param  {array} results     list of objects
 * @param  {string} key        the key to group by
 * @param  {string} sortingKey the key to sort by
 * @param  {array}  props      the properties shared by all objects with the
 *                             same `id`
 * @return {array}             an array of object
 */
export function groupByWithOrder(results, key, sortingKey, ...props) {
  // no order for now
  const gByRslts = groupBy(results, key, ...props)
  const gByRsltsArr = Object.keys(gByRslts).reduce((arr, rsltKey) => {
    const { props, entries } = gByRslts[rsltKey]
    const refinedResult = {
      id: rsltKey,
      props,
      entries
    }
    arr.push(refinedResult)
    return arr
  }, [])
  return sortByKeys(gByRsltsArr, 'props', sortingKey)
}