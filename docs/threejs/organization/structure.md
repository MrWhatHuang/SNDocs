# 地图总体结构

```markdown
    .
    ├─ node_modules
    │  └─ three ------------------------------ `核心依赖包`
    ├─ src
    │  ├─ assets
    │  │  └─ threeJsLib ---------------------- `封装的api库`
    │  ├─ components
    │  │  ├─ ThreeMap ------------------------ `适应业务对api库的一些调用及数据处理`
    │  │  └─ threeMapDialog ------------------ `倾斜摄影threejs分层的弹框`
    │  └─ views
    │     └─ map ----------------------------- `地图展示主体`
    └─ static
       ├─ 3DModels --------------------------- `放置3D模型`
       └─ config
          └─ index.js ------------------------ `包含对地图的一些配置`
```
