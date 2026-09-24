# Design

## Context

项目当前已有 `app/` 纯前端静态站点（模块库、拖拽、预览、主题、导出）与 `schemas/site-spec.schema.json`。核心约束：零依赖、离线可用、双击即用（`file://` 协议下 ES modules 会因 CORS 被拦截）。动机见 proposal.md。

## Goals / Non-Goals

**Goals:**
- 保持零依赖、离线、双击即用，不引入构建工具
- 模块与主题做成数据注册表，便于扩展
- 导出的 spec.json 对齐 site-spec schema，为 MCP 预留对接点
- Codex 通过 AGENTS.md 按单组装

**Non-Goals:**
- 不实现 MCP server（后续）
- 不做服务端持久化、多用户或账号体系
- 首版只支持单页站点，不做多页面路由

## Decisions

- **纯静态多文件 + 普通 script 顺序加载，而非 ES modules**：file:// 下 ES modules 被浏览器拦截，普通 script 能双击即用。备选 Vite/React 构建会引入 node 依赖、丢失双击即用。
- **模块/主题用数据注册表（modules.js/themes.js），渲染器只消费注册表**：新增模块只需加数据条目，无需改渲染逻辑。备选把渲染写死在组件里，扩展成本高。
- **主题用 CSS 变量实现**：模块模板统一引用 CSS 变量，切主题只改 `:root` 变量即可全局换肤。备选按主题写多套 CSS，重复度高。
- **导出 schema 对齐 Automattic site-spec 的"页树 + sections"结构，渲染模型对齐 Flexilte LayoutConfig 的"模块 + 变体 + 顺序"**：站在已验证的开源设计上，避免从零发明。
- **localStorage 持久化，失败静默降级**：file:// 或隐私模式下 localStorage 可能不可用，用 try/catch 包裹。
- **原生 HTML5 Drag and Drop 实现拖拽与排序**：零依赖即可满足"拖入落地 + 把手排序"，备选第三方库会增加依赖。

## Risks / Trade-offs

- file:// 下 localStorage 不可用 → try/catch 静默降级，不持久化但不报错
- 拖拽排序在触屏或复杂嵌套下可能不稳 → 保留上移/下移按钮兜底
- 纯静态无法服务端保存 → 用导出/下载文件作为补偿，后续可加导入
- 单页文件随模块增多而增大 → 已拆分数据层与核心层，模块内聚在注册表

## Migration Plan

新项目，无迁移。首版直接以 `app/` 作为实现落点。
