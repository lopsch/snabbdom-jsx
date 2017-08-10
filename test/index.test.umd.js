/* eslint-env mocha */
import test from './index.test.common'
import * as jsx from '../lib/index.umd'

console.error = function () {}

export default function testUMD () {
  test('umd', jsx)
}
