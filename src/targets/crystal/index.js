'use strict'

module.exports = {
  info: {
    key: 'crystal',
    title: 'Crystal',
    extname: '.cr',
    default: 'native'
  },

  native: require('./native')
}
