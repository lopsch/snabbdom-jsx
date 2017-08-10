/* eslint-env mocha */
import test from './index.test.common'
import * as jsx from '../lib/index.cjs'

console.error = function () {}

export default function testCJS () {
  test('cjs', jsx)
}
