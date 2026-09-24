# spec-export Specification

## Purpose
把客户在选品界面中的选择导出为一份机器可读的 spec.json 与一份人机可读的 spec.md 配置单，用于约束 AI。

## Requirements

### Requirement: 导出机器可读配置单

系统 SHALL 导出 spec.json，包含 site、pages、sections 与 constraints 字段，并符合 site-spec JSON Schema。

#### Scenario: 生成 spec.json
- **WHEN** 客户点击导出并选择 JSON 形态
- **THEN** 系统生成包含 site、pages、sections、constraints 的合法 JSON

### Requirement: 导出人机可读配置单

系统 SHALL 导出 spec.md，列出项目信息、页面结构与对 AI 的约束。

#### Scenario: 生成 spec.md
- **WHEN** 客户点击导出并选择 Markdown 形态
- **THEN** 系统生成包含项目信息、模块顺序、风格变体与约束条款的 Markdown 文本

### Requirement: 下载与复制

系统 SHALL 支持把配置单下载为文件或复制到剪贴板。

#### Scenario: 下载文件
- **WHEN** 客户点击下载
- **THEN** 系统下载 spec.json 或 spec.md 文件

#### Scenario: 复制到剪贴板
- **WHEN** 客户点击复制
- **THEN** 系统把当前配置单文本写入剪贴板
