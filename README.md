# GreasemonkeyHeaderPlugin

A plugin to simply add userscript-headers via webpack.

# Installation

    npm i --save-dev greasemonkey-header-plugin

# Usage
As this is a webpack-plugin you need webpack to use this script.

To enable the plugin you configure it as follows in your webpack.config.js:

    const GreasemonkeyHeaderPlugin = require('greasemonkey-header-plugin');
    const pkg = require('./package');

    module.exports = {
      entry: 'index.js',
      output: {
        filename: 'bundle.user.js',
        path: path.resolve(__dirname, 'dist')
      },
      plugins: [
        new GreasemonkeyHeaderPlugin({
            name: 'My awesome',
            author: 'Joe Dow',
            description: 'My awesome userscript',
            include: '/^https?:\\/\\/example.com\\/.*/',
            version: pkg.version,
            grant: 'none'
        })
      ]
    }

The given options are all translated to user-script tags but at least **name** and **include** are necessary.
