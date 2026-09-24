# 前端选品台 · 初始版本（app/）

正式版的第一个可用版本，与 `prototype-v1/` 原型隔离，从原型提炼结论后重写，不继承原型代码。

## 与原型的差异

- 修复预览画布无法向下滚动的问题
- 代码拆分为数据层 / 渲染层 / 交互层，模块与主题做成可扩展注册表
- 新增 `localStorage` 本地持久化，刷新不丢失
- 新增画布内拖拽排序（不再只靠上下移动按钮）
- 导出 `spec.json` 结构更规范，预埋 MCP 对接点

## 使用方式

零依赖、离线可用。用浏览器打开 `index.html` 即可，双击运行。

## 目录结构

```
app/
├── index.html
└── src/
    ├── assets/styles.css
    ├── data/          # 可扩展注册表
    │   ├── modules.js # 模块：通俗名 + 技术名 + 缩略图标 + 变体
    │   └── themes.js  # 主题：CSS 变量皮肤
    └── core/
        ├── state.js   # 状态与默认值
        ├── storage.js # localStorage 持久化
        ├── renderer.js# 渲染
        ├── dnd.js     # 拖拽落地 + 排序
        ├── exporter.js# 导出配置单
        └── main.js    # 入口与事件绑定
```
