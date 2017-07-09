export function tryFlatten (array) {
  if (Array.isArray(array)) {
    return flatten(array, [])
  }

  return array
}

function flatten (array, start) {
  for (let i = 0; i < array.length; i++) {
    const elm = array[i]

    if (Array.isArray(elm)) {
      flatten(elm, start)
    } else {
      start.push(elm)
    }
  }

  return start
}

export function isPrimitive (val) {
  return (
    typeof val === 'string' ||
    typeof val === 'number' ||
    typeof val === 'boolean' ||
    typeof val === 'symbol' ||
    val === null ||
    val === undefined
  )
}

export function isClass (val) {
  return (
    isFunc(val) &&
    !!val.prototype.snabbdomComponent &&
    typeof val.prototype.render === 'function'
  )
}

export function isFunc (val) {
  return typeof val === 'function'
}

export function isObj (val) {
  return typeof val === 'object'
}

export function isSvg (val) {
  return (
    val &&
    typeof val === 'string' &&
    val[0] === 's' &&
    val[1] === 'v' &&
    val[2] === 'g' &&
    (val.length === 3 || val[3] === '.' || val[3] === '#')
  )
}
