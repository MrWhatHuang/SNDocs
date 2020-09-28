# 轨迹功能

## 1、请求数据

**代码文件** `@/src/views/map/pages/pos/targetFollow.vue`

```javascript
async handleSearch (imPlay) {
  // ...
  await getPersonTrail({
    startTime: this.formData.date[0],
    endTime: this.formData.date[1],
    bindId: this.formData.id
  }).then(({ data }) => {
    this.isShowInfo = true
    if (data && data.code === 0) {
      this.timeArray = data.list
      if (data.list.length > 0) {
        this.mapObject.initTrack(this.timeArray, this.searchType, this.formData)
        this.mapObject.historyPlayerStatus = true // 告诉父级开始播放轨迹了，websocket推送的人和车默认要隐藏
        if (imPlay && this.timeArray.length > 0) { // 是否需要立即播放
          this.play()
        }
      }
    } else {
      this.$message.error(data.msg || '操作失败')
    }
  })
  // ...
}
```

根据起止时间和胸卡 ID 查询人员轨迹数据，如果查询出轨迹数据则调用 [initTrack](/threejs/api/track) API 函数传入轨迹数据、查看对象类型（0:人，1:车）、对象实体信息

## 2、处理轨迹数据并开启建筑可选

**代码文件** `@/src/views/map/pages/index.vue`

```javascript
initTrack (dataList, type, object) { // 加载轨迹
  if (this.mainMap.isShowMapType === '0') { // 3D地图
    dataList = this.formatTrailData(dataList)
    let trackList = []
    for (let i = 0; i < dataList.length; i++) {
      trackList.push([dataList[i].lngcoord, dataList[i].latcoord, dataList[i].altcoord, dataList[i].floor])
    }
    this.$refs.threeMap.initTrack(0, trackList, object.id, object.name || object.object.name || '',
      type === '0' ? this.personIcons[parseInt(object.object.icon) || 0] : this.carIcons)
    this.$refs.threeMap.moveCamera('trackPoint')
    this.$refs.threeMap.mapStatus = 2
    this.$refs.threeMap.setGroupVisibleByName('person', false)
    this.$refs.threeMap.setGroupVisibleByName('car', false)
    this.$refs.threeMap.mountFunction('buildSelect',
      obj => {
        // ...
      }, 0) // 挂载回调函数
  } else { // cesium地图
    // ...
  }
}
```

在 line 3 处调用 `formatTrailData` 函数对轨迹数据进行格式化处理，主要是用字段 `altcoord` 填充楼层号字段，后续需要增加的 [轨迹补帧]() 功能也可以写在该函数中，目前实现了一段但未实装。

```javascript
dataList = this.formatTrailData(dataList);
// ...
formatTrailData (data) { // 格式化轨迹数据--补帧
  let newData = []
  if (typeof data === 'object' && data.length > 0) {
    for (let i = 0; i < data.length; i++) {
      data[i].floor = data[i].altcoord
      newData.push(data[i])
    }
  }
  return newData
}
```

在 line 11 处开启[建筑可选模式]()，鼠标移动到建筑物上出现泛光效果

```javascript
this.$refs.threeMap.mapStatus = 2;
```

在 line 14 处挂载选择建筑(即双击建筑)的回调事件，这里注册的回调为显示 [建筑控制板](/threejs/organization/ThreeMap/#billboard-vue)

```javascript
this.$refs.threeMap.mountFunction('buildSelect',
obj => {
  // 建筑双击事件
  this.$refs.threeMap.showExtrudeGeometryBillBoard(...)
}, 0) // 挂载回调函数
```

## 3、在地图绘制轨迹并缓存轨迹数据

**代码文件** `@/src/assets/threeJsLib/threeApp.js`

```javascript
let trackListChache = [];
this.initTrack = function(index, trackList, id, text, base64) {
  if (trackList) {
    trackListChache = trackList;
  } else if (trackListChache) {
    trackList = trackListChache;
  } else {
    return;
  }
  // ...
};
```

该函数会绘制轨迹并将轨迹数据缓存到 `trackListChache` 变量，直到调用 [清除轨迹](/threejs/api/track/#removetrack-移除轨迹) 函数。

## 4、控制轨迹绘制节点

调用上面的函数后会发现地图上其实只出现了一个轨迹对象的图标，这是因为还没告诉地图需要呈现到什么时间节点的轨迹，默认只绘制出轨迹的第一个点，目前是通过一个间隔时长为一秒的循环定时器去刷新轨迹的时间节点。

**代码文件** `@/src/views/map/pages/pos/targetFollow.vue`

```javascript
startShowHistory () { // 地图展示轨迹
  this.interval = setInterval(() => {
    (this.timeIndex !== this.timeArray.length - 1) || this.puse()
    this.mapObject.updateTrackDataIndex(this.timeIndex)
    this.timeIndex = this.timeIndex < this.timeArray.length - 1 ? this.timeIndex + 1 : this.timeIndex
  }, 1000)
}
```

**代码文件** `@/src/views/map/pages/index.vue`

```javascript
updateTrackDataIndex (index) { // 更新轨迹播放进度
  this.timeIndex = index
  if (this.mainMap.isShowMapType === '0') { // 3D地图
    this.$refs.threeMap.initTrack(index)
  } else { // cesium地图
    // ...
  }
}
```

## 5、清除轨迹

调用[清除轨迹](/threejs/api/track/#removetrack-移除轨迹)API

## 常见问题 FAQ

室内轨迹消失？
轨迹被地面绿化遮挡？
