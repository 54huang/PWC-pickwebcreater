# codex-integration Specification

## Purpose
让 Codex 等编码 AI 读取配置单后按单组装前端，只使用已选模块与风格，减少猜测与 token 消耗。

## Requirements

### Requirement: 提供消费约定

项目 SHALL 提供 AGENTS.md，声明当存在 spec.json 或 spec.md 时，Codex MUST 优先读取并按单组装。

#### Scenario: Codex 发现配置单
- **WHEN** Codex 在项目中发现 spec.json 或 spec.md
- **THEN** Codex 按 AGENTS.md 约定读取配置单并以其为约束

### Requirement: 模块与变体约束

Codex MUST 仅使用配置单中声明的模块与变体，不得自行增加页面区块。

#### Scenario: 按单生成模块
- **WHEN** 配置单声明了特定模块与变体
- **THEN** Codex 只生成这些模块，不新增未声明的区块

### Requirement: 风格约束

Codex MUST 遵循配置单声明的主题风格，保持色彩、圆角与排版一致。

#### Scenario: 遵循主题风格
- **WHEN** 配置单指定了主题风格
- **THEN** Codex 使用对应的色彩、圆角与排版生成页面
