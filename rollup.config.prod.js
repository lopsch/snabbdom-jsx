import pkg from './package.json'
import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import progress from 'rollup-plugin-progress'
import eslint from 'rollup-plugin-eslint'
import minify from 'rollup-plugin-babel-minify'
import rolluprc from './.rolluprc.json'

export default [
  {
    input: rolluprc.entryConfig,
    output: [
      {
        file: pkg.browser,
        format: 'umd',
        name: 'snabbdom-jsx-pragma',
        exports: 'named',
        sourcemap: true
      }
    ],
    plugins: [
      progress({ clearLine: false }),
      eslint({ throwOnError: true, throwOnWarning: true }),
      babel(rolluprc.babelConfig),
      resolve(),
      commonjs()
    ]
  },
  {
    input: rolluprc.entryConfig,
    output: [
      {
        file: pkg.min,
        format: 'umd',
        name: 'snabbdom-jsx-pragma',
        exports: 'named',
        sourcemap: true
      }
    ],
    plugins: [
      progress({ clearLine: false }),
      eslint({ throwOnError: true, throwOnWarning: true }),
      babel(rolluprc.babelConfig),
      resolve(),
      commonjs(),
      minify()
    ]
  },
  {
    input: rolluprc.entryConfig,
    output: [
      { file: pkg.module, format: 'es', exports: 'named', sourcemap: true },
      { file: pkg.main, format: 'cjs', exports: 'named', sourcemap: true }
    ],
    plugins: [
      progress({ clearLine: false }),
      eslint({ throwOnError: true, throwOnWarning: true }),
      babel(rolluprc.babelConfig)
    ]
  }
]
