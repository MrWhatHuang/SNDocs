# 二、ThreeMap - 业务库

## 目录结构

![ThreeMap 文件目录](/img/threejs/ThreeMap.png "ThreeMap 文件目录")

这里 `ThreeMap` 和 `threeMapDialog` 一起介绍，同属于关联业务和 API 的纽带。

## billBoard.vue

![billboard](/img/threejs/billboard.png "billboard")

双击建筑时显示的[建筑分层]()、[建筑透明]() div

## billBoardInfo.vue

![billboardInfo](/img/threejs/billboardInfo.png "billboardInfo")

各种点位[信息弹框]()，包括 `人员` 、 `车` 、 `摄像头` 、 `卡口` 、 `储罐` 、 `基站` 、 `信标` 、 `生产装置` 、 `气体监测点` 、 `四色区信息` 和 `视频监控画面` 。

## ThreeMap/index.vue

核心业务组件，跟 API 配合实现符合业务要求的各种方法。

目前承载的功能：

- 初始化 Three.js
- 加载厂区模型
- 缓存模型文件至 IndexedDB
- 响应浏览器窗体大小调整改变地图分辨率
- 移动相机、标记相机位置和重置相机
- 读取数据库关于相机初始位置的设置并移动相机
- 改变地图渲染模式-后处理、非后处理
- 切换地图 2D/3D 模式
- 鼠标悬停、双击事件响应
- 选点、删除选点和选点间的连线
- 给模型文件写入一些自定义的属性，如建筑标识等
- 建筑分层和还原
- 建筑透明和还原
- 其它各种点位、体块、光晕、轨迹功能的数据整理并调用对应 API

## threeMapDialog/index.vue

因为是倾斜摄影部分对内部分层的展示，所以说是对上面文件的阉割，只保留了

- 模型加载
- 相机移动
- 建筑分层
- 人员展示

几个必要功能
