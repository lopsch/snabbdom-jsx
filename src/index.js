import { tryFlatten, isPrimitive, isClass, isFunc, isObj, isSvg } from './utils'

const DEF_NS = 'props'
const DEF_MODS = ['hook', 'on', 'style', 'class', 'props', 'attrs', 'dataset']
const SVG_NS = 'http://www.w3.org/2000/svg'

export function normalizeAttrs (attrs) {
  const map = {}

  for (let key in attrs) {
    if (DEF_MODS.includes(key)) {
      map[key] = attrs[key]
    } else if (key !== 'key' && key !== 'classNames' && key !== 'selector') {
      const idx = key.indexOf('-')
      if (idx !== -1) {
        const nsKey = key.substring(0, idx)
        const attrsKey = key.substring(idx + 1)
        addAttr(nsKey, attrsKey, attrs[key])
      } else if (!map[key]) {
        addAttr(DEF_NS, key, attrs[key])
      }
    }
  }

  return map

  function addAttr (nsKey, key, val) {
    const ns = map[nsKey] || {}
    ns[key] = val
    map[nsKey] = ns
  }
}

function buildFromStringTag (tag, attrs, children) {
  if (attrs.selector && attrs.selector !== '') {
    tag = tag + attrs.selector
  }

  if (
    attrs.classNames &&
    ((Array.isArray(attrs.classNames) && attrs.classNames.length !== 0) ||
      attrs.classNames !== '')
  ) {
    const cns = attrs.classNames
    tag =
      tag +
      '.' +
      (Array.isArray(cns) ? cns.join('.') : cns.replace(/\s+/g, '.'))
  }

  return {
    sel: tag,
    data: normalizeAttrs(attrs),
    children: children.map(c => (isPrimitive(c) ? { text: c } : c)),
    key: attrs.key
  }
}

function buildFromComponent (tag, attrs, children) {
  let res
  const isClass_ = isClass(tag)
  const isFunc_ = isFunc(tag)
  const hasRender_ = isObj(tag) && typeof tag.render === 'function'

  if (isClass_) {
    const Tag = tag
    res = new Tag(attrs, children).render()
  } else if (hasRender_) {
    res = tag.render(attrs, children)
  } else if (isFunc_) {
    res = tag(attrs, children)
  } else {
    console.error(
      'JSX tag error: tag =',
      tag,
      ', attrs =',
      attrs,
      ', children =',
      children
    )
    throw new Error(
      `JSX tag must be either a 'string', a 'function' or
      an 'object'/a 'class' with either a 'view' or a 'render' method.`
    )
  }

  if (res) {
    res.key = attrs.key
  }

  return res
}

function mapPropsToAttrs (data) {
  const attrs = data.attrs || (data.attrs = {})
  const props = data.props || (data.props = {})

  for (let key in props) {
    if (attrs[key] === undefined) {
      attrs[key] = props[key]
      delete props[key]
    }
  }

  data.attrs = attrs

  if (Object.keys(props).length > 0) {
    data.props = props
  } else {
    delete data.props
  }

  return data
}

function addNSAndAttrs (vnode) {
  const data = vnode.data || {}
  data.ns = SVG_NS
  vnode.data = mapPropsToAttrs(data)

  if (vnode.sel !== 'foreignObject') {
    for (let i = 0; i < vnode.children.length; i++) {
      addNSAndAttrs(vnode.children[i])
    }
  }
}

function buildVnode (tag, attrs, children) {
  children = tryFlatten(children)

  if (typeof tag === 'string') {
    const vnode = buildFromStringTag(tag, attrs, children)
    const sel = vnode.sel

    if (isSvg(sel)) {
      addNSAndAttrs(vnode)
    }

    return vnode
  } else {
    return buildFromComponent(tag, attrs, children)
  }
}

export default function html (tag, attrs, children) {
  attrs = attrs || {}
  children = children || []
  if (typeof attrs !== 'object') {
    console.error(
      'JSX attrs error: tag =',
      tag,
      ', attrs =',
      attrs,
      ', children =',
      children
    )
    throw new Error("JSX attrs must be of type 'object'.")
  }

  if (arguments.length > 3 || !Array.isArray(children)) {
    children = Array.prototype.slice.call(arguments, 2)
  }

  return buildVnode(tag, attrs, children)
}
