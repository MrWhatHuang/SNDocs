module.exports = {
  title: 'Tools & API \'s Documents',
  description: 'Docs',
  port: '7777',
  themeConfig: {
    nav: require('./nav.js'),
    sidebar: require('./sidebar.js'),
    sidebarDepth: 2
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@alias': 'path/to/some/dir'
      }
    }
  }
}