# 相机 camera

## setCamera 初始化相机控制器

**Attributes**

| 参数  | 说明     | 类型     | 可选值 | 默认值 | 备注                                             |
| :---- | :------- | :------- | :----- | :----- | :----------------------------------------------- |
| value | 相机实体 | Object3D | -      | -      | 相机控制器会把鼠标拖动转换为相机的位置移动及旋转 |

控制器的配置未以参数形式暴露出来，目前配置了一套符合项目需求的参数设置，后续根据需求可以暴露出来。

```javascript
// 使动画循环使用时阻尼或自转 意思是否有惯性
cameraControls.enableDamping = false;
// 使动画循环使用时阻尼或自转 意思是否有惯性
cameraControls.enableDamping = false;
// 动态阻尼系数 就是鼠标拖拽旋转灵敏度
cameraControls.dampingFactor = 0.25;
// 是否可以缩放
cameraControls.enableZoom = true;
// 是否自动旋转
cameraControls.autoRotate = false;
// 设置相机距离原点的最近距离
cameraControls.minDistance = 10;
// 设置相机距离原点的最远距离
cameraControls.maxDistance = 2000;
// 是否开启右键拖拽
cameraControls.enablePan = true;
// 限制旋转角度 Math.PI * 0.495
cameraControls.maxPolarAngle = Math.PI * 0.495;
```

## cameraMotion 移动相机-根据精确位置

**Attributes**

| 参数 | 说明         | 类型     | 可选值 | 默认值 | 备注 |
| :--- | :----------- | :------- | :----- | :----- | :--- |
| x    | 位置 x       | Number   | -      | -      |      |
| y    | 位置 y       | Number   | -      | -      |      |
| z    | 位置 z       | Number   | -      | -      |      |
| tarx | 朝向 x       | Number   | -      | -      |      |
| tary | 朝向 y       | Number   | -      | -      |      |
| tarz | 朝向 z       | Number   | -      | -      |      |
| fun  | 移动完成回掉 | Function | -      | -      |      |

结合 [Tween.js](https://github.com/tweenjs/tween.js/) 库对相机的位移进行位置数值补帧，使位移更自然平滑。

## moveCamera 移动相机-根据物体名称

**Attributes**

| 参数     | 说明           | 类型            | 可选值 | 默认值 | 备注                         |
| :------- | :------------- | :-------------- | :----- | :----- | :--------------------------- |
| val      | 移动至的目标   | String/Object3D | -      | -      |                              |
| distance | 移动远离目标的 | Number          | -      | 100    | 该参数防止相机钻到物体内部去 |

该 API 其实是对 [上一个 API](#cameramotion-移动相机-根据精确位置) 的二次封装，传入更简单的参数。

## resetCamera 重置相机

在 `three.js` 实例化的时候会从后台读取预设的相机参数，这时候相机就根据读取的参数进行重置

## getCameraLocation 获取相机位置

返回一个嵌套数组 `[[位置], [朝向]]`

## getCameraControls 获取相机控制器

一般供调使用

## getCamera 获取相机

一般供调使用

## startCameraRotate 开启相机环绕

围绕当前屏幕中心点所投射在模型地面上的那个点环绕相机

## endCameraRotate 关闭相机环绕

关闭相机环绕
