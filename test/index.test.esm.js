/* eslint-env mocha */
import test from './index.test.common'
import * as jsx from '../lib/index.esm'

console.error = function () {}

export default function testESM () {
  test('esm', jsx)
}
