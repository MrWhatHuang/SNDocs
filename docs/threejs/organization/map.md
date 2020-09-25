# 三、map - 业务实现

## 目录结构

![map 文件目录](/img/threejs/map.png "map 文件目录")

地图页面主体和所有的内容弹框都在这里实现。

## components

地图部分用到的组件

- alertBox.vue 顶部弹出 SOS 报警弹框
- closeButton.vue 一个关闭按钮的封装，可能当时为了少复制点样式吧，没什么大用
- ContainerCard.vue 每个弹框的内容部分，提供一个插槽，为了规范内容部分的样式
- dateTimeSelecter.vue 轨迹部分的时间选择组件
- gridCamera.vue 和下面的组件配合展示多窗体的监控画面，该功能目前有代码但未实装
- gridCameraItem.vue
- inspectionItemView.vue 巡检每个检查事项的详情弹框
- MapChart.vue 封装地图适用的 chart 图表，主要为沉浸模式服务
- messageBox.vue 从右侧滑出的展示一些基本信息的小窗体，提供一个插槽，目前未使用
- messageBoxMix.vue 负责弹框窗体的动画，通过 props 传入窗体方位等
- messageLayout.vue 负责弹框窗体的内容，有关闭按钮以及内容滚动条
- meterAlarm.vue 顶部弹出的仪表报警
- numInput.vue 封装的一个选择数字组件
- personInOut.vue 人员进出记录组件，目前未使用
- selectFencing.vue 选择围栏组件
- wheelList.vue 人员进出记录组件，目前未使用

## page2nd

沉浸模式页面弹框

## pages

地图底图和所有业务弹框

## map-home-layer.vue

地图底部图层组件，切换各元素的显隐

![地图图层](/img/threejs/map-home-layer.png "地图图层")

## map-home.vue

地图 logo，菜单，工具、登陆人信息和切换地图组件放置处
