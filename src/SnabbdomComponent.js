export default class SnabbdomComponent {
  constructor (props_ = {}, children_ = []) {
    this.props = props_
    this.children = children_
  }
}

SnabbdomComponent.prototype.snabbdomComponent = true
SnabbdomComponent.prototype.render = function () {
  throw new Error(
    "Subclasses must override 'render' to return a properly configured 'class SnabbdomComponent'."
  )
}
