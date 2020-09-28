module.exports = {
  title: 'Tools & API \'s Documents',
  description: 'Docs',
  port: '7777',
  themeConfig: {
    nav: require('./nav.js'),
    sidebar: require('./sidebar.js'),
    sidebarDepth: 2
  },
  markdown: {
    lineNumbers: true
  },
  head: [
    ['script', { src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.slim.min.js' }],
    ['script', { src: 'https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.5.2/jquery.fancybox.min.js' }],
    ['link', { rel: 'stylesheet', type: 'text/css', href: 'https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.5.2/jquery.fancybox.min.css' }]
  ],
  configureWebpack: {
    resolve: {
      alias: {
        '@alias': 'path/to/some/dir'
      }
    }
  }
}