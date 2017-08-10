import pkg from './package.json'
import babel from 'rollup-plugin-babel'
import progress from 'rollup-plugin-progress'
import eslint from 'rollup-plugin-eslint'
import babelConfig from '.src/.babel.config'
import entryCofig from './src/.entry.config'

export default [
  {
    entry: entryCofig,
    dest: pkg.module,
    format: 'es',
    plugins: [
      progress({ clearLine: false }),
      eslint({ throwOnError: true, throwOnWarning: true }),
      babel(babelConfig)
    ],
    sourceMap: false,
    exports: 'named'
  }
]
