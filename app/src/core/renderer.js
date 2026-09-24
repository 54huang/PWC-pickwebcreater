// 渲染层：模块库、主题、画布
window.PickWeb = window.PickWeb || {};

window.PickWeb.applyTheme = function (id) {
  const t = window.PickWeb.getTheme(id);
  if (!t) return;
  const root = document.documentElement;
  Object.entries(t.css).forEach(([k, v]) => root.style.setProperty(k, v));
};

window.PickWeb.renderLib = function () {
  const grid = document.getElementById('libGrid');
  grid.innerHTML = '';
  window.PickWeb.modules.forEach(m => {
    const card = document.createElement('div');
    card.className = 'lib-card';
    card.draggable = true;
    card.dataset.module = m.id;
    card.innerHTML = `
      <div class="emoji">${m.emoji}</div>
      <div class="meta">
        <div class="name">${m.name}</div>
        <div class="tech">${m.tech}</div>
        <div class="desc">${m.desc}</div>
      </div>`;
    grid.appendChild(card);
  });
};

window.PickWeb.renderThemes = function () {
  const grid = document.getElementById('themeGrid');
  grid.innerHTML = '';
  window.PickWeb.themes.forEach(t => {
    const btn = document.createElement('button');
    btn.className = 'theme-btn' + (t.id === window.PickWeb.state.themeId ? ' active' : '');
    btn.dataset.theme = t.id;
    btn.innerHTML = `
      <div class="sw">${t.swatch.map(c => `<span style="background:${c}"></span>`).join('')}</div>
      <div class="nm">${t.name}</div>`;
    btn.addEventListener('click', () => {
      window.PickWeb.state.themeId = t.id;
      window.PickWeb.applyTheme(t.id);
      document.querySelectorAll('.theme-btn').forEach(b => b.classList.toggle('active', b.dataset.theme === t.id));
      window.PickWeb.saveState();
    });
    grid.appendChild(btn);
  });
};

window.PickWeb.renderCanvas = function (animateLast) {
  const canvas = document.getElementById('canvas');
  if (window.PickWeb.state.sections.length === 0) {
    canvas.innerHTML = `<div class="canvas-empty">
      <div class="big">🧩</div>
      <div class="t">画布还是空的</div>
      <div class="s">从左侧拖一个模块进来，它会在这里落地生根。拖入后可用 ⠿ 拖动排序、切换风格变体或删除。</div>
    </div>`;
    return;
  }
  let html = '';
  window.PickWeb.state.sections.forEach((sec, i) => {
    const mod = window.PickWeb.getModule(sec.moduleId);
    if (!mod) return;
    const variantSel = mod.variants.length > 1
      ? `<select onchange="PickWeb.changeVariant(${i}, this.value)">${mod.variants.map(v =>
          `<option value="${v.id}" ${v.id === sec.variantId ? 'selected' : ''}>${v.label}</option>`).join('')}</select>`
      : '';
    html += `<div class="sec ${animateLast && i === window.PickWeb.state.sections.length - 1 ? 'drop-in' : ''}" data-index="${i}">
      <div class="toolbar">
        <button class="drag-handle" draggable="true" data-index="${i}" title="拖拽排序">⠿</button>
        <button title="上移" onclick="PickWeb.moveSection(${i}, -1)">↑</button>
        <button title="下移" onclick="PickWeb.moveSection(${i}, 1)">↓</button>
        ${variantSel}
        <button title="删除" class="del" onclick="PickWeb.removeSection(${i})">✕</button>
      </div>
      ${mod.render(sec.variantId)}
    </div>`;
  });
  canvas.innerHTML = html;
};

window.PickWeb.moveSection = function (i, dir) {
  const j = i + dir;
  if (j < 0 || j >= window.PickWeb.state.sections.length) return;
  const s = window.PickWeb.state.sections;
  [s[i], s[j]] = [s[j], s[i]];
  window.PickWeb.renderCanvas();
  window.PickWeb.saveState();
};

window.PickWeb.removeSection = function (i) {
  window.PickWeb.state.sections.splice(i, 1);
  window.PickWeb.renderCanvas();
  window.PickWeb.saveState();
};

window.PickWeb.changeVariant = function (i, variantId) {
  window.PickWeb.state.sections[i].variantId = variantId;
  window.PickWeb.renderCanvas();
  window.PickWeb.saveState();
};
