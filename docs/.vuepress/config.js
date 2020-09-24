/*
 * @Descripttion: 
 * @version: 
 * @Author: Mr.What
 * @Date: 2020-09-24 11:16:26
 * @LastEditors: Mr.What
 * @LastEditTime: 2020-09-24 22:29:16
 */
module.exports = {
  title: 'Hello VuePress',
  description: 'Just playing around',
  themeConfig: {
    nav: [
      { text: 'three.js', link: '/threejs/' }
    ],
    sidebar: [
      {
        title: 'API',
        sidebarDepth: 1,
        children: [
          '/threejs/point',
          '/threejs/geometry',
          '/threejs/track',
          '/threejs/animation'
        ]
      }
    ],
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