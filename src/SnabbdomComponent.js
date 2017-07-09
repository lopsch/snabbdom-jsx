export default class SnabbdomComponent {
  constructor (_props, _children) {
    this.props = _props || {}
    this.children = _children || []
  }
}

SnabbdomComponent.prototype.snabbdomComponent = true
SnabbdomComponent.prototype.render = function () {
  throw new Error(
    "Subclasses must override 'render' to return a properly configured 'class SnabbdomComponent'."
  )
}
