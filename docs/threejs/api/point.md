# 点物体 Point

## insertOrUpdatePoint 插入并更新点物体

**Attributes**

| 参数     | 说明               | 类型     | 可选值     | 默认值 | 备注                |
| :------- | :----------------- | :------- | :--------- | :----- | :------------------ |
| id       | 物体 id            | String   | -          | -      |
| text     | 物体名称           | String   | -          | -      |
| type     | 物体类型           | String   | -          | -      |
| position | 坐标               | Array    | -          | -      | 示例：[100, 100, 0] |
| base64   | 图标               | String   | -          | -      |
| fun      | 点击图标的回调函数 | Function | -          | -      |
| visible  | 显隐性             | Boolean  | true/false | true   |
| floor    | 楼层号             | String   | -          | -      |

## removePoint 删除点物体

**Attributes**

| 参数 | 说明     | 类型         | 可选值 | 默认值 | 备注                                 |
| :--- | :------- | :----------- | :----- | :----- | :----------------------------------- |
| ids  | 物体 id  | String/Array | -      | -      | 可直接传物体 id 或多个物体 id 的数组 |
| type | 物体类型 | String       | -      | -      | 根据物体类型去遍历删除               |

## displayObjects 加载多个物体

**Attributes**

| 参数     | 说明         | 类型     | 可选值     | 默认值 | 备注 |
| :------- | :----------- | :------- | :--------- | :----- | :--- |
| arr      | 物体集合     | Array    | -          | -      |      |
| showName | 是否展示名称 | Boolean  | true/false | true   |
| fun      | 图标点击回调 | Function | -          | -      |      |

arr 参数示例

```json
{
  "typeName": "", // 类型名称
  "iconBase64": "", // 图标
  "iconSize": 24, // 图标大小
  "iconOffset": 0, // 图标偏移度 正向上 负向下
  "point": [
    {
      "x": 100,
      "y": 100,
      "z": 0,
      "id": "",
      "name": "",
      "cnName": "",
      "icon": "",
      "data": {
        "备注": ""
      }
    }
  ]
}
```

## displayShowOrHideObjects 删除点物体

| 参数 | 说明    | 类型   | 可选值 | 默认值 | 备注 |
| :--- | :------ | :----- | :----- | :----- | :--- |
| name | 物体 id | String | -      | -      |      |
