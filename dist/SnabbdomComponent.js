"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SnabbdomComponent = function SnabbdomComponent(_props, _children) {
  _classCallCheck(this, SnabbdomComponent);

  this.props = _props || {};
  this.children = _children || [];
};

exports.default = SnabbdomComponent;


SnabbdomComponent.prototype.snabbdomComponent = true;
SnabbdomComponent.prototype.render = function () {
  throw new Error("Subclasses must override 'render' to return a properly configured 'class SnabbdomComponent'.");
};
//# sourceMappingURL=SnabbdomComponent.js.map