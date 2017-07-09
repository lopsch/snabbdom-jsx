import Benchmark from 'benchmark'
import { tryFlatten, isSvg } from '../src/utils'
import { normalizeAttrs } from '../src/jsx'

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

const normalizeSuite = new Benchmark.Suite()
normalizeSuite
  .add('normalizeAttrs()', function () {
    return normalizeAttrs(toNormalize)
  })
  .on('cycle', function (event) {
    console.log(String(event.target))
  })
  .on('complete', function () {
    console.log('Fastest is ' + this.filter('fastest').map('name'))
  })
  .run({})

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

const flattenSuite = new Benchmark.Suite()
flattenSuite
  .add('tryFlatten()', function () {
    return tryFlatten(toFlatten)
  })
  .on('cycle', function (event) {
    console.log(String(event.target))
  })
  .on('complete', function () {
    console.log('Fastest is ' + this.filter('fastest').map('name'))
  })
  .run({})

const svg = 'svg#pic1'
const svgSuite = new Benchmark.Suite()
svgSuite
  .add('isSvg()', function () {
    return isSvg(svg)
  })
  .on('cycle', function (event) {
    console.log(String(event.target))
  })
  .on('complete', function () {
    console.log('Fastest is ' + this.filter('fastest').map('name'))
  })
  .run({})
