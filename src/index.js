import html, { normalizeAttrs } from './jsx'
import { tryFlatten, isPrimitive, isClass, isFunc, isObj, isSvg } from './utils'
import SnabbdomComponent from './SnabbdomComponent'

export default html
export {
  html,
  normalizeAttrs,
  tryFlatten,
  isPrimitive,
  isClass,
  isFunc,
  isObj,
  isSvg,
  SnabbdomComponent
}
