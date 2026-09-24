# Tasks

## 1. 选品界面（picker-ui）

- [x] 1.1 模块与主题数据注册表：新增 `app/src/data/modules.js`（8 个模块）与 `themes.js`（4 套主题）；验证：浏览器打开 `app/index.html`，左侧可见 8 个模块卡片、右侧可见 4 套主题
- [x] 1.2 拖拽落地与画布内排序：`app/src/core/dnd.js` 支持从模块库拖入画布、用 ⠿ 把手拖拽排序，辅以上移/下移/删除按钮；验证：拖模块进画布可落地，拖动把手可调整顺序
- [x] 1.3 实时预览与主题换肤：`app/src/core/renderer.js` + `styles.css` 基于 CSS 变量渲染；验证：切换主题画布即时换肤，模块变多时预览窗口可向下滚动
- [x] 1.4 本地持久化：`app/src/core/storage.js` 用 localStorage 保存配置；验证：刷新页面后项目信息、主题与模块列表恢复

## 2. 配置单导出（spec-export）

- [x] 2.1 导出 spec.json：`app/src/core/exporter.js` 生成含 site / pages / sections / constraints 的合法 JSON；验证：导出后 `JSON.parse` 不报错
- [x] 2.2 导出 spec.md：生成人机可读配置单，列出项目信息、模块顺序、风格变体与约束条款；验证：导出内容包含上述信息
- [x] 2.3 配置单 JSON Schema：`schemas/site-spec.schema.json` 定义导出结构；验证：spec.json 字段与 schema 一致

## 3. Codex 消费层（codex-integration）

- [x] 3.1 编写 `AGENTS.md`：声明当项目存在 `spec.json` / `spec.md` 时，Codex 优先读取并按单组装，不自行增加区块，遵循主题风格；验证：Codex 读 AGENTS.md 后按配置单约束生成
- [x] 3.2 在根 README 补充 Codex 消费方式与配置单对接说明；验证：文档描述的用法与实现一致

## 4. 集成验证

- [x] 4.1 全流程验证：双击 `app/index.html`，完成"拖入 → 排序 → 换肤 → 导出"全流程，确认预览可滚动、spec.json 可被 JSON 解析、spec.md 内容完整
