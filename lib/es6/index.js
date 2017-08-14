var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

function tryFlatten(array) {
  if (Array.isArray(array)) {
    return flatten(array, []);
  }

  return array;
}

function flatten(array, start) {
  for (var i = 0; i < array.length; i++) {
    var elm = array[i];

    if (Array.isArray(elm)) {
      flatten(elm, start);
    } else {
      start.push(elm);
    }
  }

  return start;
}

function isPrimitive(val) {
  return typeof val === 'string' || typeof val === 'number' || typeof val === 'boolean' || (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'symbol' || val === null || val === undefined;
}

function isClass(val) {
  return isFunc(val) && !!val.prototype.snabbdomComponent && typeof val.prototype.render === 'function';
}

function isFunc(val) {
  return typeof val === 'function';
}

function isObj(val) {
  return (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object';
}

function isSvg(val) {
  return val && typeof val === 'string' && val[0] === 's' && val[1] === 'v' && val[2] === 'g' && (val.length === 3 || val[3] === '.' || val[3] === '#');
}

var DEF_NS = 'props';
var DEF_MODS = ['hook', 'on', 'style', 'class', 'props', 'attrs', 'dataset'];
var SVG_NS = 'http://www.w3.org/2000/svg';

function normalizeAttrs(attrs) {
  var map = {};

  for (var key in attrs) {
    if (DEF_MODS.includes(key)) {
      map[key] = attrs[key];
    } else if (key !== 'key' && key !== 'classNames' && key !== 'selector') {
      var idx = key.indexOf('-');
      if (idx !== -1) {
        var nsKey = key.substring(0, idx);
        var attrsKey = key.substring(idx + 1);
        addAttr(nsKey, attrsKey, attrs[key]);
      } else if (!map[key]) {
        addAttr(DEF_NS, key, attrs[key]);
      }
    }
  }

  return map;

  function addAttr(nsKey, key, val) {
    var ns = map[nsKey] || {};
    ns[key] = val;
    map[nsKey] = ns;
  }
}

function buildFromStringTag(tag, attrs, children) {
  if (attrs.selector && attrs.selector !== '') {
    tag = tag + attrs.selector;
  }

  if (attrs.classNames && (Array.isArray(attrs.classNames) && attrs.classNames.length !== 0 || attrs.classNames !== '')) {
    var cns = attrs.classNames;
    tag = tag + '.' + (Array.isArray(cns) ? cns.join('.') : cns.replace(/\s+/g, '.'));
  }

  return {
    sel: tag,
    data: normalizeAttrs(attrs),
    children: children.map(function (c) {
      return isPrimitive(c) ? { text: c } : c;
    }),
    key: attrs.key
  };
}

function buildFromComponent(tag, attrs, children) {
  var res = void 0;
  var isClass_ = isClass(tag);
  var isFunc_ = isFunc(tag);
  var hasRender_ = isObj(tag) && typeof tag.render === 'function';

  if (isClass_) {
    var Tag = tag;
    res = new Tag(attrs, children).render();
  } else if (hasRender_) {
    res = tag.render(attrs, children);
  } else if (isFunc_) {
    res = tag(attrs, children);
  } else {
    console.error('JSX tag error: tag =', tag, ', attrs =', attrs, ', children =', children);
    throw new Error('JSX tag must be either a \'string\', a \'function\' or\n      an \'object\'/a \'class\' with either a \'view\' or a \'render\' method.');
  }

  if (res) {
    res.key = attrs.key;
  }

  return res;
}

function mapPropsToAttrs(data) {
  var attrs = data.attrs || (data.attrs = {});
  var props = data.props || (data.props = {});

  for (var key in props) {
    if (attrs[key] === undefined) {
      attrs[key] = props[key];
      delete props[key];
    }
  }

  data.attrs = attrs;

  if (Object.keys(props).length > 0) {
    data.props = props;
  } else {
    delete data.props;
  }

  return data;
}

function addNSAndAttrs(vnode) {
  var data = vnode.data || {};
  data.ns = SVG_NS;
  vnode.data = mapPropsToAttrs(data);

  if (vnode.sel !== 'foreignObject') {
    for (var i = 0; i < vnode.children.length; i++) {
      addNSAndAttrs(vnode.children[i]);
    }
  }
}

function buildVnode(tag, attrs, children) {
  children = tryFlatten(children);

  if (typeof tag === 'string') {
    var vnode = buildFromStringTag(tag, attrs, children);
    var sel = vnode.sel;

    if (isSvg(sel)) {
      addNSAndAttrs(vnode);
    }

    return vnode;
  } else {
    return buildFromComponent(tag, attrs, children);
  }
}

function html$1(tag, attrs, children) {
  attrs = attrs || {};
  children = children || [];
  if ((typeof attrs === 'undefined' ? 'undefined' : _typeof(attrs)) !== 'object') {
    console.error('JSX attrs error: tag =', tag, ', attrs =', attrs, ', children =', children);
    throw new Error("JSX attrs must be of type 'object'.");
  }

  if (arguments.length > 3 || !Array.isArray(children)) {
    children = Array.prototype.slice.call(arguments, 2);
  }

  return buildVnode(tag, attrs, children);
}

var SnabbdomComponent = function SnabbdomComponent() {
  var props_ = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var children_ = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  classCallCheck(this, SnabbdomComponent);

  this.props = props_;
  this.children = children_;
};

SnabbdomComponent.prototype.snabbdomComponent = true;
SnabbdomComponent.prototype.render = function () {
  throw new Error("Subclasses must override 'render' to return a properly configured 'class SnabbdomComponent'.");
};

export { normalizeAttrs, tryFlatten, isPrimitive, isClass, isFunc, isObj, isSvg, SnabbdomComponent };
export default html$1;
//# sourceMappingURL=index.js.map
