# 体块 Geometry

## drawExtrudeGeometry 绘制多边立方体块

**Attributes**

| 参数        | 说明           | 类型            | 可选值     | 默认值   | 备注                                   |
| :---------- | :------------- | :-------------- | :--------- | :------- | :------------------------------------- |
| points      | 多边形点阵数组 | Array           | -          | -        |
| parent      | 附着物体       | Object3D/String | -          | -        | 可以是 3D 物体或者物体名称，若空则创建 |
| name        | 体块名称       | String          | -          | -        |
| minH        | 体块底部位置   | Float           | -          | 0        |
| maxH        | 体块顶部位置   | Float           | -          | 20       |
| color       | 体块颜色       | String          | -          | 0x00ff00 |
| opacity     | 体块透明度     | Float           | -          | 0.5      |
| text        | 体块名称       | String          | -          | -        |
| wire        | 是否显示线框   | Boolean         | true/false | false    |
| dataEnitity | 存放数据       | -               | -          | -        | 备用参数，可以存储业务数据实体等       |

## clearExtrudeGeometry 清除体块

**Attributes**

| 参数 | 说明     | 类型   | 可选值 | 默认值 | 备注               |
| :--- | :------- | :----- | :----- | :----- | :----------------- |
| name | 体块名称 | String | -      | -      | 不传则删除所有体块 |
