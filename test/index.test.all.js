/* eslint-env mocha */
import testESM from './index.test.esm'
import testCJS from './index.test.cjs'
import testUMD from './index.test.umd'

console.error = function () {}

testESM()
testCJS()
testUMD()
