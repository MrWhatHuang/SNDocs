# 一、threeJsLib - 封装的 API 库

## 目录结构

![threeJsLib 文件目录](/img/threejs/threeJsLib.png "threeJsLib 文件目录")

API 库不关心业务，只关心需要实现的功能，如创建地图场景、绘制点位、体块、操作相机等等。

## pulgins 目录

该文件夹下放在一些引用到的第三方库

`3DTilesRendererJS` ---- [ThreeJs 加载倾斜摄影的库](https://github.com/NASA-AMMOS/3DTilesRendererJS)，库由 NASA 开发并在 2020 年初开源，所以对倾斜摄影的格式支持还不是很完全，目前项目中还未实际使用到，可持续关注。

`MapControls.js` ---- [相机控制器]() 的一种，在 [r109](https://github.com/mrdoob/three.js/releases/tag/r109) 版本被 ThreeJs 团队移除，[理由](https://github.com/mrdoob/three.js/pull/17516)是和另一个控制器`OrbitControls`比较相似，但个人感觉比较好用所以保留了下来。

## texture 目录

贴图文件夹，目前使用贴图相关的 API 还无实际用途。

## threeApp.js

基于 ThreeJs 封装的[API](../api/point)库

## threeApp.scss

ThreeJs 绘制的一些 html 元素的样式文件

- 信息框
- [光晕的扩散效果动画](../api/animation)
