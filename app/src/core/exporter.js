// 导出配置单：spec.json（机器可读）+ spec.md（人机可读）
window.PickWeb = window.PickWeb || {};

window.PickWeb.exportMode = 'md';

window.PickWeb.buildSpec = function () {
  const s = window.PickWeb.state;
  const modName = id => { const m = window.PickWeb.getModule(id); return m ? m.name : id; };
  const modTech = id => { const m = window.PickWeb.getModule(id); return m ? m.tech : id; };
  const variantLabel = sec => {
    const m = window.PickWeb.getModule(sec.moduleId);
    const v = m && m.variants.find(x => x.id === sec.variantId);
    return v ? v.label : sec.variantId;
  };

  const theme = window.PickWeb.getTheme(s.themeId);

  const json = {
    $schema: "https://raw.githubusercontent.com/54huang/PWC-pickwebcreater/main/schemas/site-spec.schema.json",
    version: "0.1",
    generator: "pickweb",
    site: {
      name: s.projectName,
      purpose: s.purpose,
      stack: s.stack,
      theme: s.themeId,
      themeName: theme ? theme.name : s.themeId
    },
    pages: [
      {
        title: "home",
        slug: "home",
        purpose: s.purpose,
        sections: s.sections.map(sec => ({
          module: sec.moduleId,
          name: modName(sec.moduleId),
          tech: modTech(sec.moduleId),
          variant: sec.variantId,
          variantLabel: variantLabel(sec)
        }))
      }
    ],
    constraints: [
      "仅使用上述已选模块与变体，不得自行增加页面区块",
      "仅使用上述主题风格的色彩、圆角与排版，保持视觉一致",
      "按 sections 数组的顺序搭建页面结构"
    ]
  };

  const lines = [];
  lines.push('# 前端配置单');
  lines.push('');
  lines.push('> 本单由「前端选品台」生成，交给 AI（Codex）作为约束上下文：只按单组装已选模块与风格。');
  lines.push('');
  lines.push('- 项目名称：' + s.projectName);
  lines.push('- 一句话用途：' + s.purpose);
  lines.push('- 技术栈：' + s.stack);
  lines.push('- 主题风格：' + (theme ? theme.name : s.themeId));
  lines.push('');
  lines.push('## 页面结构');
  lines.push('');
  lines.push('### home');
  if (s.sections.length === 0) {
    lines.push('- （空）');
  } else {
    s.sections.forEach((sec, i) => {
      lines.push(`${i + 1}. ${modName(sec.moduleId)}（${modTech(sec.moduleId)} / 变体：${variantLabel(sec)}）`);
    });
  }
  lines.push('');
  lines.push('## 对 AI 的约束');
  lines.push('');
  lines.push('- 仅使用上述已选模块与变体，不得自行增加页面区块');
  lines.push('- 仅使用上述主题风格的色彩、圆角与排版，保持视觉一致');
  lines.push('- 按上述顺序搭建页面结构');

  return {
    json: JSON.stringify(json, null, 2),
    md: lines.join('\n')
  };
};

window.PickWeb.openExport = function () {
  document.getElementById('exportModal').classList.add('show');
  window.PickWeb.renderExport();
};

window.PickWeb.closeExport = function () {
  document.getElementById('exportModal').classList.remove('show');
};

window.PickWeb.switchTab = function (mode) {
  window.PickWeb.exportMode = mode;
  document.getElementById('tabMd').classList.toggle('active', mode === 'md');
  document.getElementById('tabJson').classList.toggle('active', mode === 'json');
  window.PickWeb.renderExport();
};

window.PickWeb.renderExport = function () {
  const spec = window.PickWeb.buildSpec();
  document.getElementById('exportText').value = window.PickWeb.exportMode === 'md' ? spec.md : spec.json;
};

window.PickWeb.copyExport = function () {
  const text = document.getElementById('exportText').value;
  const done = () => window.alert('已复制到剪贴板');
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(done).catch(() => fallbackCopy(text, done));
  } else {
    fallbackCopy(text, done);
  }
};

function fallbackCopy(text, done) {
  const ta = document.getElementById('exportText');
  ta.focus();
  ta.select();
  try { document.execCommand('copy'); done(); } catch (e) { window.alert('复制失败，请手动全选复制'); }
}

window.PickWeb.downloadExport = function () {
  const spec = window.PickWeb.buildSpec();
  const isMd = window.PickWeb.exportMode === 'md';
  const content = isMd ? spec.md : spec.json;
  const filename = isMd ? 'spec.md' : 'spec.json';
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
