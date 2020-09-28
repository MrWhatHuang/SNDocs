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

目录结构

![mapPages](/img/threejs/mapPages.png "mapPages")

根据各个模块对所有弹框进行了分类，分别是 pos、process、risk、sou 还有个 tools 文件夹存放一些配置类的页面比如标记相机和选点组件等

### contentNext.vue

该页面挂载所有弹框组件，并集中调度他们的显示与隐藏，为了避免页面篇幅太大用到了一个动态组件注册。

- 首先循环遍历文件夹下的所有.vue 文件并以组件形式注册到该页面

```javascript
importCommponent () {
  // 注册子组件
  let _this = this
  const requireComponents = require.context('.', true, /\.vue$/)
  // 遍历出每个组件的路径
  requireComponents.keys().forEach(fileName => {
    // 组件实例
    const reqCom = requireComponents(fileName)
    let path = fileName.split('/')
    if (path.length > 2) {
      // 截取路径作为组件名
      const reqComName = path[path.length - 1].replace('.vue', '')
      // 组件挂载
      _this.constructor.component(reqComName, reqCom.default || reqCom)
    }
  })
}
```

- 在 data 里面声明弹框名称和所在方位

```json
dialogs: [
  { name: 'targetFollow', position: 'left-small' },
  { name: 'history', position: 'left-small' },
  { name: 'personSpread', position: 'left' },
  { name: 'personList', position: 'right' },
  ...
]
```

- 最后在 `template` 标签内以 `component` 标签的形式循环渲染出来

```html
<message-box-mix
  v-for="(item, index) in dialogs"
  :key="index"
  :type="item.position"
  v-model="comVisible[item.name + 'Visible']"
  :showVisible="showVisible[item.name + 'Visible']"
  :style="'top:'+item.offset+'px;'+'transition:'+(item.transition?' top 1s ease 0s;':';')"
>
  <component :is="item.name" :ref="item.name"></component>
</message-box-mix>
```

### index.vue

加载两个地图和上面的弹框组件页 [contentNext.vue](/threejs/organization/map/#contentnext-vue)

```html
<template>
  <div class="map-page-container">
    <!--报警铃声-->
    <audio
      id="myAudio"
      ref="myAudio"
      :src="require('@/assets/video/alarm.mp3')"
      preload="load"
      controls="controls"
      loop="true"
      hidden="true"
    ></audio>
    <div class="map-container">
      <!------------地图中间页------------>
      <map-content ref="mapContent" :comegoList="comegoList"></map-content>
      <!-- ---------cesium地图加载--------- -->
      <cesium-map
        v-if="$parent.isShowMapType === '1'"
        :personDistributionData="personDistributionData"
        @gisloadEnd="gisloadEnd"
        @clickObject="clickObject"
        class="map-content"
        ref="cesiumMap"
      ></cesium-map>
      <!-- ---------threejs地图加载--------- -->
      <three-map
        v-else
        cameraType="orthographic"
        ref="threeMap"
        @loaded="mapLoaded"
      ></three-map>
      <!-- ---------SOS报警--------- -->
      <alert-box
        v-model="alertStatus"
        :twinkle="true"
        :data="alertData"
      ></alert-box>
      <!-- ---------设备仪表报警--------- -->
      <meter-alarm v-model="meterAlarmStatus" ref="meterAlarm"></meter-alarm>
    </div>
  </div>
</template>
```

![地图图层](/img/threejs/mapPagesIndex.png "地图图层")

## map-home-layer.vue

地图底部图层组件，切换各元素的显隐

![地图图层](/img/threejs/map-home-layer.png "地图图层")

## map-home.vue

地图 logo，菜单，工具、登陆人信息和切换地图组件放置处
