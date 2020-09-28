# 选点功能

## 1、开始选点

**代码文件** `@/src/views/map/pages/tools/selectPointTool.vue`

```javascript
init (data, name, type = 'out', buildingId) {
  this.data = data
  this.name = name
  this.type = type
  this.buildingId = buildingId
  if (this.buildingId) {
    this.enterBuilding(this.buildingId)
    this.handleSelect()
  }
  if (this.type === 'out') {
    threeMap.changeCameraMode('2D') // 切换到2D模式
  }
}
```

加载该页面时传入 `type` 类型，室内会直接进入 2D 模式，传入 `buildingId` 会直接进入建筑单体模式。

根据传入的 `name` 判断选择的选点的类型，室内还是室外选点以及选点的个数限制。

```javascript
threeMap.startClickCoordinate(3, 100, 0);
```

第一个参数为最少选择的点位数（一般用于绘制体块因为三点才能绘成面），第一个参数为最多选择的点位数，第三个参数为区别室内还是室外选点。

**代码文件** `@/src/components/ThreeMap/index.vue`

```javascript
startClickCoordinate (minNum = 1, maxNum = 1, type = 0) {
  // 开始选点坐标 type:0室外,1室内
  this.changeCameraMode('2D')
  this.pointsNum = [minNum, maxNum]
  this.drawStatus = true
  this.drawType = type
}
```

先调用 `changeCameraMode` 函数改变为 2D 选点模式，`drawStatus` 状态更改为 `true` 后鼠标点击事件会被函数 `mouseClick` 捕获到

```javascript
mouseClick (val, event, intersects) {
  // 鼠标点击事件 选点用
  if (this.drawStatus && event.buttons === 1) {
    // ...
    if (this.drawType === 0) {
      // 室外
      this.selectPoint.push(val)
    } else {
      // 室内
      let floorObj = this.searchParent(intersects.object, 'floor') // 找到所点的楼层
      if (!floorObj) return
      let nameArr = floorObj.name.split('_') // 获取模型命名数组
      let floor = ''
      let heightArr = []
      if (nameArr[2] === 'd') { // 如果是楼顶
        let floors = floorObj.parent.children // 获取整栋楼的楼层
        let floorsDesc = _.orderBy(floors, 'name', 'desc') // 排序楼层 最高层在第一位
        let topNameArr = floorsDesc[0].name.split('_') // 获取最高层模型命名数组
        let topHeightArr = topNameArr[topNameArr.length - 1].split(',') // 读取最高层高度数组（最低点、最高点）
        heightArr = [topHeightArr[1], topHeightArr[1]]
      } else {
        floor = Number(nameArr[2].replace('f', '')) // 读取楼层号
        heightArr = nameArr[nameArr.length - 1].split(',') // 读取楼层高度数组（最低点、最高点）
      }
      val = intersects.point

      this.selectInsiteParmas.floor = floor
      this.selectInsiteParmas.minH = Number(heightArr[0]) / 1000
      this.selectInsiteParmas.maxH = Number(heightArr[1]) / 1000
      this.selectInsiteParmas.buildId = floorObj.parent.name

      this.selectPoint.push(val)
    }
    player.selectPoint(val, this.selectPoint.length, this.pointsNum)
    if (this.selectPoint.length > 1) {
      // 绘制路线
      player.drawLine(
        this.selectPoint[this.selectPoint.length - 2],
        this.selectPoint[this.selectPoint.length - 1]
      )
    }
  }
  // ...
}
```

如果是室外选点则直接返回，否则需要读取所在的楼层信息一并返回。

在 line 35 处长度大于 1 的选点会在中间连线。

## 2、结束选点

**代码文件** `@/src/views/map/pages/tools/selectPointTool.vue`

```javascript
let point = threeMap.stopClickCoordinate();
```

调用 `stopClickCoordinate` 函数，返回已选点位数组。

**代码文件** `@/src/components/ThreeMap/index.vue`

```javascript
stopClickCoordinate (minNum = 3, maxNum = 100) {
  // 停止选点坐标 最少点数 室外只返回所有点的数组 室内则返回一个对象parmas里面存储楼层的信息
  let result = []
  if (this.selectPoint.length >= 2) {
    player.drawLine(
      this.selectPoint[0],
      this.selectPoint[this.selectPoint.length - 1]
    )
  }
  this.drawStatus = false
  if (
    this.selectPoint.length > minNum - 1 &&
    this.selectPoint.length <= maxNum
  ) {
    this.changeCameraMode('3D')
  }
  result = this.selectPoint.map(val => {
    return {
      x: val.x,
      y: val.z,
      z: val.y
    }
  })
  result.companyNum = this.selectPoint.companyNum
  this.pointsNum = [minNum, maxNum]
  if (this.drawType === 0) {
    return result
  } else {
    this.drawType = 0
    if (result.length === 0) { // 如果没有任何点 则清除楼层信息
      this.selectInsiteParmas = {}
    }
    return { selectPoint: result, parmas: this.selectInsiteParmas }
  }
}
```

在 line 26 处判断，如果是室外选点则直接返回一个点位数组，如果是室内选点则返回一个对象，包含点位数组和楼层信息。
