/* eslint-env mocha */
import chai, { expect } from 'chai'
import assertarrays from 'chai-arrays'
import asserttype from 'chai-asserttype'

chai.use(assertarrays)
chai.use(asserttype)

export default function test (module, jsx) {
  describe(`(${module}) tryFlatten()`, () => {
    it('should return unflattened if not provided an array (undefined)', () => {
      const toFlatten = undefined
      expect(jsx.tryFlatten(toFlatten)).to.equal(toFlatten)
    })

    it("should return unflattened if not provided an array ('string')", () => {
      const toFlatten = 'flattenMe'
      expect(jsx.tryFlatten(toFlatten)).to.equal(toFlatten)
    })

    it("should return unflattened if not provided an array ('object')", () => {
      const toFlatten = { flattenMe: true }
      expect(jsx.tryFlatten(toFlatten)).to.equal(toFlatten)
    })

    it('should return flattened if provided an array', () => {
      const toFlatten = [
        'child',
        ['child', ['child'], ['child', 'child'], 'child'],
        ['child', ['child', 'child'], 'child'],
        'child',
        [
          'child',
          [
            'child',
            [
              'child',
              ['child', ['child'], ['child', 'child'], 'child'],
              [
                'child',
                [
                  'child',
                  'child',
                  [
                    'child',
                    ['child', ['child'], ['child', 'child'], 'child'],
                    ['child', ['child', 'child'], 'child'],
                    'child',
                    ['child', ['child'], ['child', 'child'], 'child'],
                    [
                      'child',
                      ['child', 'child'],
                      'child',
                      [
                        'child',
                        ['child', ['child'], ['child', 'child'], 'child'],
                        ['child', ['child', 'child'], 'child'],
                        'child',
                        ['child', ['child'], ['child', 'child'], 'child'],
                        ['child', ['child', 'child'], 'child'],
                        ['child', ['child'], ['child', 'child'], 'child'],
                        ['child', ['child', 'child'], 'child'],
                        'child',
                        ['child', ['child'], ['child', 'child'], 'child']
                      ]
                    ],
                    [
                      'child',
                      ['child'],
                      [
                        'child',
                        'child',
                        [
                          'child',
                          ['child', ['child'], ['child', 'child'], 'child'],
                          ['child', ['child', 'child'], 'child'],
                          'child',
                          ['child', ['child'], ['child', 'child'], 'child'],
                          ['child', ['child', 'child'], 'child'],
                          ['child', ['child'], ['child', 'child'], 'child'],
                          ['child', ['child', 'child'], 'child'],
                          'child',
                          ['child', ['child'], ['child', 'child'], 'child']
                        ]
                      ],
                      'child'
                    ],
                    ['child', ['child', 'child'], 'child'],
                    'child',
                    ['child', ['child'], ['child', 'child'], 'child']
                  ]
                ],
                'child'
              ],
              'child',
              ['child', ['child'], ['child', 'child'], 'child'],
              ['child', ['child', 'child'], 'child'],
              [
                'child',
                [
                  'child',
                  [
                    'child',
                    ['child', ['child'], ['child', 'child'], 'child'],
                    ['child', ['child', 'child'], 'child'],
                    'child',
                    ['child', ['child'], ['child', 'child'], 'child'],
                    ['child', ['child', 'child'], 'child'],
                    ['child', ['child'], ['child', 'child'], 'child'],
                    ['child', ['child', 'child'], 'child'],
                    'child',
                    ['child', ['child'], ['child', 'child'], 'child']
                  ]
                ],
                ['child', 'child'],
                'child'
              ],
              [
                'child',
                [
                  'child',
                  'child',
                  [
                    'child',
                    ['child', ['child'], ['child', 'child'], 'child'],
                    ['child', ['child', 'child'], 'child'],
                    'child',
                    ['child', ['child'], ['child', 'child'], 'child'],
                    ['child', ['child', 'child'], 'child'],
                    ['child', ['child'], ['child', 'child'], 'child'],
                    ['child', ['child', 'child'], 'child'],
                    'child',
                    ['child', ['child'], ['child', 'child'], 'child']
                  ]
                ],
                'child'
              ],
              'child',
              ['child', ['child'], ['child', 'child'], 'child']
            ]
          ],
          ['child', 'child'],
          'child'
        ],
        ['child', ['child', 'child'], 'child'],
        ['child', ['child'], ['child', 'child'], 'child'],
        ['child', ['child', 'child'], 'child'],
        'child',
        ['child', ['child'], ['child', 'child'], 'child']
      ]
      const flattened = []
      for (let i = 0; i < 245; i++) {
        flattened.push('child')
      }
      expect(jsx.tryFlatten(toFlatten)).to.be.equalTo(flattened)
    })
  })

  describe(`(${module}) isPrimitive()`, () => {
    it("should return true for 'string'", () => {
      expect(jsx.isPrimitive('string')).to.equal(true)
    })

    it("should return true for 'number'", () => {
      expect(jsx.isPrimitive(0)).to.equal(true)
    })

    it("should return true for 'boolean'", () => {
      expect(jsx.isPrimitive(true)).to.equal(true)
    })

    it("should return true for 'symbol'", () => {
      expect(jsx.isPrimitive(Symbol('string'))).to.equal(true)
    })

    it('should return true for null', () => {
      expect(jsx.isPrimitive(null)).to.equal(true)
    })

    it('should return true for undefined', () => {
      expect(jsx.isPrimitive(undefined)).to.equal(true)
    })

    it("should return false for 'object'", () => {
      expect(jsx.isPrimitive({})).to.equal(false)
    })

    it("should return false for 'function'", () => {
      expect(jsx.isPrimitive(function fn () {})).to.equal(false)
    })
  })

  describe(`(${module}) isClass()`, () => {
    it("should return 'true' if 'class'", () => {
      const Component = class Component extends jsx.SnabbdomComponent {
        render () {}
      }
      expect(jsx.isClass(Component)).to.equal(true)
      expect(jsx.isClass('class')).to.equal(false)
    })
  })

  describe(`(${module}) isFunc()`, () => {
    it("should return 'true' if 'function'", () => {
      const func = function () {}
      expect(jsx.isFunc(func)).to.equal(true)
      expect(jsx.isFunc('function')).to.equal(false)
    })
  })

  describe(`(${module}) isObj()`, () => {
    it("should return 'true' if 'object'", () => {
      const obj = {}
      expect(jsx.isObj(obj)).to.equal(true)
      expect(jsx.isObj('object')).to.equal(false)
    })
  })

  describe(`(${module}) isSvg()`, () => {
    it("should return 'true' if 'svg'", () => {
      const svg = 'svg#pic1'
      const notSvg = 'svgPic1'
      expect(jsx.isSvg(svg)).to.equal(true)
      expect(jsx.isSvg(notSvg)).to.equal(false)
    })
  })

  describe(`(${module}) normalizeAttrs()`, () => {
    it('should normalize attributes', () => {
      const fn = function () {}
      const toNormalize = {
        hook: { insert: fn },
        'hook-destroy': fn,
        on: { change: fn },
        'on-click': fn,
        style: { 'margin-top': '50px' },
        'style-margin-bottom': '50px',
        class: { red: true },
        'class-blue': true,
        props: { myProps: 'first' },
        'props-myPropsNext': 'next',
        attrs: { first: 1 },
        'attrs-second': 2,
        dataset: { first: 1 },
        'dataset-second': 2,
        myAttrProps: { second: fn },
        'myAttrNS-first': fn,
        'myAttrNS-second': fn,
        key: 'not_included',
        classNames: ['not_included'],
        selector: 'not_included'
      }
      const normalized = jsx.normalizeAttrs(toNormalize)
      const expected = {
        hook: { insert: fn, destroy: fn },
        on: { change: fn, click: fn },
        style: { 'margin-top': '50px', 'margin-bottom': '50px' },
        class: { red: true, blue: true },
        props: {
          myProps: 'first',
          myPropsNext: 'next',
          myAttrProps: { second: fn }
        },
        attrs: { first: 1, second: 2 },
        dataset: { first: 1, second: 2 },
        myAttrNS: {
          first: fn,
          second: fn
        }
      }

      expect(normalized).to.deep.equal(expected)
    })
  })

  describe(`(${module}) html()`, () => {
    it("should throw when provided invalid 'tag'", () => {
      expect(() => jsx.html()).to.throw(Error)
    })

    it("should build when provided 'string' as 'tag'", () => {
      expect(() => jsx.html('div', null, null)).to.not.throw()
    })

    it("should build when provided 'function' as 'tag'", () => {
      const Component = function () {}
      expect(() => jsx.html(Component, null, null)).to.not.throw()
    })

    it("should build when provided an 'object' with render 'function' as 'tag'", () => {
      const Component = { render: function () {} }
      expect(() => jsx.html(Component, null, null)).to.not.throw()
    })

    it("should throw when provided invalid 'class'", () => {
      const Component = class Component extends jsx.SnabbdomComponent {}
      expect(() => jsx.html(Component, null, null)).to.throw(Error)
    })

    it("should build when provided a 'class' with render 'function' as 'tag'", () => {
      const Component = class Component extends jsx.SnabbdomComponent {
        render () {}
      }
      expect(() => jsx.html(Component, null, null)).to.not.throw()
    })

    it("should build when provided 'tag', 'attrs' and 'children' (no child)", () => {
      const fn = function () {}
      const attrs = {
        hook: { insert: fn },
        'hook-destroy': fn,
        on: { change: fn },
        'on-click': fn,
        style: { 'margin-top': '50px' },
        'style-margin-bottom': '50px',
        class: { red: true },
        'class-blue': true,
        props: { myProps: 'first' },
        'props-myPropsNext': 'next',
        attrs: { first: 1 },
        'attrs-second': 2,
        dataset: { first: 1 },
        'dataset-second': 2,
        myAttrProps: { second: fn },
        'myAttrNS-first': fn,
        'myAttrNS-second': fn,
        key: 'key',
        classNames: 'class2 class3',
        selector: '#id.class1'
      }
      const vnode = <div {...attrs} />

      expect(vnode.key).to.equal('key')
      expect(vnode.sel).to.equal('div#id.class1.class2.class3')
      expect(vnode.children).to.equalTo([])
      expect(vnode.data).to.deep.equal(jsx.normalizeAttrs(attrs))
    })

    it("should build when provided 'tag', 'attrs' and 'children' (text child)", () => {
      const fn = function () {}
      const attrs = {
        hook: { insert: fn },
        'hook-destroy': fn,
        on: { change: fn },
        'on-click': fn,
        style: { 'margin-top': '50px' },
        'style-margin-bottom': '50px',
        class: { red: true },
        'class-blue': true,
        props: { myProps: 'first' },
        'props-myPropsNext': 'next',
        attrs: { first: 1 },
        'attrs-second': 2,
        dataset: { first: 1 },
        'dataset-second': 2,
        myAttrProps: { second: fn },
        'myAttrNS-first': fn,
        'myAttrNS-second': fn,
        key: 'key',
        classNames: ['class2', 'class3'],
        selector: '#id.class1'
      }
      const child = 'Hello, World!'
      const vnode = (
        <div {...attrs}>
          {child}
        </div>
      )

      expect(vnode.key).to.equal('key')
      expect(vnode.sel).to.equal('div#id.class1.class2.class3')
      expect(vnode.children[0]).to.deep.equal({ text: 'Hello, World!' })
      expect(vnode.data).to.deep.equal(jsx.normalizeAttrs(attrs))
    })

    it("should build when provided 'tag', 'attrs' and 'children' (vnode child)", () => {
      const fn = function () {}
      const attrs = {
        hook: { insert: fn },
        'hook-destroy': fn,
        on: { change: fn },
        'on-click': fn,
        style: { 'margin-top': '50px' },
        'style-margin-bottom': '50px',
        class: { red: true },
        'class-blue': true,
        props: { myProps: 'first' },
        'props-myPropsNext': 'next',
        attrs: { first: 1 },
        'attrs-second': 2,
        dataset: { first: 1 },
        'dataset-second': 2,
        myAttrProps: { second: fn },
        'myAttrNS-first': fn,
        'myAttrNS-second': fn,
        key: 'key',
        classNames: ['class2', 'class3'],
        selector: '#id.class1'
      }
      const child = <div>Hello, World!</div>
      const vnode = (
        <div {...attrs}>
          {child}
        </div>
      )
      const vnodeChild = vnode.children[0]

      expect(vnode.key).to.equal('key')
      expect(vnode.sel).to.equal('div#id.class1.class2.class3')
      expect(vnode.children[0]).to.deep.equal(child)
      expect(vnode.data).to.deep.equal(jsx.normalizeAttrs(attrs))

      expect(vnodeChild.key).to.equal(undefined)
      expect(vnodeChild.sel).to.equal('div')
      expect(vnodeChild.children[0]).to.deep.equal({ text: 'Hello, World!' })
      expect(vnodeChild.data).to.deep.equal({})
    })

    it("should build when provided 'tag', 'attrs' and 'children' ('tag' component with no child)", () => {
      const fn = function () {}
      const Component = (props, children) =>
        <div {...props}>
          {children}
        </div>
      const attrs = {
        hook: { insert: fn },
        'hook-destroy': fn,
        on: { change: fn },
        'on-click': fn,
        style: { 'margin-top': '50px' },
        'style-margin-bottom': '50px',
        class: { red: true },
        'class-blue': true,
        props: { myProps: 'first' },
        'props-myPropsNext': 'next',
        attrs: { first: 1 },
        'attrs-second': 2,
        dataset: { first: 1 },
        'dataset-second': 2,
        myAttrProps: { second: fn },
        'myAttrNS-first': fn,
        'myAttrNS-second': fn,
        key: 'key',
        classNames: ['class2', 'class3'],
        selector: '#id.class1'
      }
      const vnode = <Component {...attrs} />

      expect(vnode.key).to.equal('key')
      expect(vnode.sel).to.equal('div#id.class1.class2.class3')
      expect(vnode.children).to.equalTo([])
      expect(vnode.data).to.deep.equal(jsx.normalizeAttrs(attrs))
    })

    it("should build when provided 'tag', 'attrs' and 'children' ('tag' component with text child)", () => {
      const fn = function () {}
      const Component = (props, children) =>
        <div {...props}>
          {children}
        </div>
      const attrs = {
        hook: { insert: fn },
        'hook-destroy': fn,
        on: { change: fn },
        'on-click': fn,
        style: { 'margin-top': '50px' },
        'style-margin-bottom': '50px',
        class: { red: true },
        'class-blue': true,
        props: { myProps: 'first' },
        'props-myPropsNext': 'next',
        attrs: { first: 1 },
        'attrs-second': 2,
        dataset: { first: 1 },
        'dataset-second': 2,
        myAttrProps: { second: fn },
        'myAttrNS-first': fn,
        'myAttrNS-second': fn,
        key: 'key',
        classNames: ['class2', 'class3'],
        selector: '#id.class1'
      }
      const child = 'Hello, World!'
      const vnode = (
        <Component {...attrs}>
          {child}
        </Component>
      )

      expect(vnode.key).to.equal('key')
      expect(vnode.sel).to.equal('div#id.class1.class2.class3')
      expect(vnode.children[0]).to.deep.equal({ text: 'Hello, World!' })
      expect(vnode.data).to.deep.equal(jsx.normalizeAttrs(attrs))
    })

    it("should build when provided 'tag', 'attrs' and 'children' ('tag' component with vnode child)", () => {
      const fn = function () {}
      const Component = (props, children) =>
        <div {...props}>
          {children}
        </div>
      const attrs = {
        hook: { insert: fn },
        'hook-destroy': fn,
        on: { change: fn },
        'on-click': fn,
        style: { 'margin-top': '50px' },
        'style-margin-bottom': '50px',
        class: { red: true },
        'class-blue': true,
        props: { myProps: 'first' },
        'props-myPropsNext': 'next',
        attrs: { first: 1 },
        'attrs-second': 2,
        dataset: { first: 1 },
        'dataset-second': 2,
        myAttrProps: { second: fn },
        'myAttrNS-first': fn,
        'myAttrNS-second': fn,
        key: 'key',
        classNames: ['class2', 'class3'],
        selector: '#id.class1'
      }
      const child = <div>Hello, World!</div>
      const vnode = (
        <Component {...attrs}>
          {child}
        </Component>
      )
      const vnodeChild = vnode.children[0]

      expect(vnode.key).to.equal('key')
      expect(vnode.sel).to.equal('div#id.class1.class2.class3')
      expect(vnode.children[0]).to.deep.equal(child)
      expect(vnode.data).to.deep.equal(jsx.normalizeAttrs(attrs))

      expect(vnodeChild.key).to.equal(undefined)
      expect(vnodeChild.sel).to.equal('div')
      expect(vnodeChild.children[0]).to.deep.equal({ text: 'Hello, World!' })
      expect(vnodeChild.data).to.deep.equal({})
    })

    it("should build when provided 'tag', 'attrs' and 'children' ('tag' class with no child)", () => {
      const fn = function () {}
      const Component = class Component extends jsx.SnabbdomComponent {
        render () {
          return (
            <div {...this.props}>
              {this.children}
            </div>
          )
        }
      }
      const attrs = {
        hook: { insert: fn },
        'hook-destroy': fn,
        on: { change: fn },
        'on-click': fn,
        style: { 'margin-top': '50px' },
        'style-margin-bottom': '50px',
        class: { red: true },
        'class-blue': true,
        props: { myProps: 'first' },
        'props-myPropsNext': 'next',
        attrs: { first: 1 },
        'attrs-second': 2,
        dataset: { first: 1 },
        'dataset-second': 2,
        myAttrProps: { second: fn },
        'myAttrNS-first': fn,
        'myAttrNS-second': fn,
        key: 'key',
        classNames: ['class2', 'class3'],
        selector: '#id.class1'
      }
      const vnode = <Component {...attrs} />

      expect(vnode.key).to.equal('key')
      expect(vnode.sel).to.equal('div#id.class1.class2.class3')
      expect(vnode.children).to.equalTo([])
      expect(vnode.data).to.deep.equal(jsx.normalizeAttrs(attrs))
    })

    it("should build when provided 'tag', 'attrs' and 'children' ('tag' class with text child)", () => {
      const fn = function () {}
      const Component = class Component extends jsx.SnabbdomComponent {
        render () {
          return (
            <div {...this.props}>
              {this.children}
            </div>
          )
        }
      }
      const attrs = {
        hook: { insert: fn },
        'hook-destroy': fn,
        on: { change: fn },
        'on-click': fn,
        style: { 'margin-top': '50px' },
        'style-margin-bottom': '50px',
        class: { red: true },
        'class-blue': true,
        props: { myProps: 'first' },
        'props-myPropsNext': 'next',
        attrs: { first: 1 },
        'attrs-second': 2,
        dataset: { first: 1 },
        'dataset-second': 2,
        myAttrProps: { second: fn },
        'myAttrNS-first': fn,
        'myAttrNS-second': fn,
        key: 'key',
        classNames: ['class2', 'class3'],
        selector: '#id.class1'
      }
      const child = 'Hello, World!'
      const vnode = (
        <Component {...attrs}>
          {child}
        </Component>
      )

      expect(vnode.key).to.equal('key')
      expect(vnode.sel).to.equal('div#id.class1.class2.class3')
      expect(vnode.children[0]).to.deep.equal({ text: 'Hello, World!' })
      expect(vnode.data).to.deep.equal(jsx.normalizeAttrs(attrs))
    })

    it("should build when provided 'tag', 'attrs' and 'children' ('tag' class with vnode child )", () => {
      const fn = function () {}
      const Component = class Component extends jsx.SnabbdomComponent {
        render () {
          return (
            <div {...this.props}>
              {this.children}
            </div>
          )
        }
      }
      const attrs = {
        hook: { insert: fn },
        'hook-destroy': fn,
        on: { change: fn },
        'on-click': fn,
        style: { 'margin-top': '50px' },
        'style-margin-bottom': '50px',
        class: { red: true },
        'class-blue': true,
        props: { myProps: 'first' },
        'props-myPropsNext': 'next',
        attrs: { first: 1 },
        'attrs-second': 2,
        dataset: { first: 1 },
        'dataset-second': 2,
        myAttrProps: { second: fn },
        'myAttrNS-first': fn,
        'myAttrNS-second': fn,
        key: 'key',
        classNames: ['class2', 'class3'],
        selector: '#id.class1'
      }
      const child = <div>Hello, World!</div>
      const vnode = (
        <Component {...attrs}>
          {child}
        </Component>
      )
      const vnodeChild = vnode.children[0]

      expect(vnode.key).to.equal('key')
      expect(vnode.sel).to.equal('div#id.class1.class2.class3')
      expect(vnode.children[0]).to.deep.equal(child)
      expect(vnode.data).to.deep.equal(jsx.normalizeAttrs(attrs))

      expect(vnodeChild.key).to.equal(undefined)
      expect(vnodeChild.sel).to.equal('div')
      expect(vnodeChild.children[0]).to.deep.equal({ text: 'Hello, World!' })
      expect(vnodeChild.data).to.deep.equal({})
    })

    it("should build when provided 'tag', 'attrs' and 'children' ('tag' is 'svg')", () => {
      const childAttrs = {
        fill: 'none',
        stroke: 'white',
        d: 'M1.73,12.91 8.1,19.28 22.79,4.59'
      }
      const child = <path classNames='pathClass' {...childAttrs} />

      const vnodeAttrs = { viewBox: '0 0 24 24' }
      const vnode = (
        <svg selector='#svg.svg' classNames='svgClass' {...vnodeAttrs}>
          {child}
        </svg>
      )
      const vnodeChild = vnode.children[0]

      expect(vnode.key).to.equal(undefined)
      expect(vnode.sel).to.equal('svg#svg.svg.svgClass')
      expect(vnode.children[0]).to.deep.equal(child)
      expect(vnode.data).to.deep.equal({
        attrs: {
          viewBox: '0 0 24 24'
        },
        ns: 'http://www.w3.org/2000/svg'
      })

      expect(vnodeChild.key).to.equal(undefined)
      expect(vnodeChild.sel).to.equal('path.pathClass')
      expect(vnodeChild.children).to.equalTo([])
      expect(vnodeChild.data).to.deep.equal({
        attrs: {
          fill: 'none',
          stroke: 'white',
          d: 'M1.73,12.91 8.1,19.28 22.79,4.59'
        },
        ns: 'http://www.w3.org/2000/svg'
      })
    })
  })
}
