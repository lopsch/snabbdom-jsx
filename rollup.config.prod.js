import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import pkg from './package.json'
import babel from 'rollup-plugin-babel'
import progress from 'rollup-plugin-progress'
import visualizer from 'rollup-plugin-visualizer'
import multiEntry from 'rollup-plugin-multi-entry'
import babelConfig from './src/.babel.config'
import entryCofig from './src/.entry.config'

export default [
  {
    entry: entryCofig,
    dest: pkg.browser,
    format: 'umd',
    moduleName: 'storageify',
    plugins: [
      progress({ clearLine: false }),
      resolve(),
      commonjs(),
      babel(babelConfig),
      multiEntry(),
      visualizer({ filename: './stats/index.html' })
    ],
    sourceMap: true,
    exports: 'named'
  },
  {
    entry: entryCofig,
    targets: [
      { dest: pkg.module, format: 'es' },
      { dest: pkg.main, format: 'cjs' }
    ],
    plugins: [progress({ clearLine: false }), babel(babelConfig), multiEntry()],
    sourceMap: true,
    exports: 'named'
  }
]
