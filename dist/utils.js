'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.tryFlatten = tryFlatten;
exports.isPrimitive = isPrimitive;
exports.isClass = isClass;
exports.isFunc = isFunc;
exports.isObj = isObj;
exports.isSvg = isSvg;
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
//# sourceMappingURL=utils.js.map