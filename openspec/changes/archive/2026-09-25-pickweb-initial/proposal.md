# Proposal

## Why

不懂前端的客户无法准确向 AI 描述他们想要的前端效果，导致 AI 反复追问、自由发挥、浪费 token。需要一个本地的"前端选品台"，把前端需求收敛成可点选的模块与风格，让客户可视化 DIY，并导出一份无歧义的配置单来约束 AI 按单组装。

## What Changes

- 新增本地运行的选品界面：模块库（通俗名 + 技术名 + 缩略图三件套）、拖拽落地、画布内拖拽排序、实时预览、主题换肤、本地持久化
- 新增配置单导出：`spec.json`（严格 JSON Schema）+ `spec.md`（人机可读）
- 新增 Codex 消费层：`AGENTS.md`，让 Codex 读取配置单后按单组装、不自作主张
- 新增配置单 JSON Schema（`schemas/site-spec.schema.json`），作为后续 MCP 的对接点

## Capabilities

### New Capabilities

- `picker-ui`: 选品界面——模块库、拖拽落地与排序、实时预览、主题换肤、本地持久化
- `spec-export`: 配置单导出——生成 `spec.json` 与 `spec.md`，并受 `site-spec` JSON Schema 约束
- `codex-integration`: Codex 消费层——通过 `AGENTS.md` 让 Codex 读取配置单后按单组装

### Modified Capabilities

<!-- 新项目，暂无需要修改的既有能力 -->

## Impact

- 新增 `app/` 纯前端静态站点（HTML/CSS/JS，零依赖、离线可用）
- 新增 `schemas/site-spec.schema.json`
- 新增 `AGENTS.md`（Codex 项目上下文）
- 后续 MCP 复用 `spec-export` 的 schema 作为可调用资源
