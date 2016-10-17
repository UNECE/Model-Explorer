export function removeInArrByKey(arr, val, key) {
  return arr.filter(o => o[key] !== val)
}

export function addInArr(arr, o) {
  const index = arr.indexOf(o)
  if (index > -1) return arr
  const arrCopy = arr.slice(0)
  arrCopy.push(o)
  return arrCopy
}