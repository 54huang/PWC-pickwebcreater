// 入口：初始化、事件绑定
window.PickWeb = window.PickWeb || {};

function closeDrawer() {
  document.getElementById('drawerOverlay').classList.remove('show');
  document.getElementById('drawerPanel').classList.remove('show');
}

function bindInputs() {
  document.getElementById('projName').addEventListener('input', function (e) {
    window.PickWeb.state.projectName = e.target.value;
    window.PickWeb.saveState();
  });
  document.getElementById('projPurpose').addEventListener('input', function (e) {
    window.PickWeb.state.purpose = e.target.value;
    window.PickWeb.saveState();
  });
  document.getElementById('stack').addEventListener('change', function (e) {
    window.PickWeb.state.stack = e.target.value;
    window.PickWeb.saveState();
  });
}

function bindFaq() {
  const canvas = document.getElementById('canvas');
  canvas.addEventListener('click', function (e) {
    const q = e.target.closest('.faq-q');
    if (!q) return;
    const item = q.closest('.faq-item');
    const secEl = item.closest('.sec');
    const idx = parseInt(secEl.dataset.index, 10);
    const section = window.PickWeb.state.sections[idx];
    if (!section) return;
    if (section.variantId === 'drawer') {
      document.getElementById('drawerTitle').textContent = item.dataset.q;
      document.getElementById('drawerBody').textContent = item.dataset.a;
      document.getElementById('drawerOverlay').classList.add('show');
      document.getElementById('drawerPanel').classList.add('show');
    } else {
      item.classList.toggle('open');
    }
  });
  document.getElementById('drawerClose').addEventListener('click', closeDrawer);
  document.getElementById('drawerOverlay').addEventListener('click', closeDrawer);
}

window.PickWeb.resetAll = function () {
  window.PickWeb.state = JSON.parse(JSON.stringify(window.PickWeb.defaultState));
  window.PickWeb.clearStorage();
  document.getElementById('projName').value = window.PickWeb.state.projectName;
  document.getElementById('projPurpose').value = window.PickWeb.state.purpose;
  document.getElementById('stack').value = window.PickWeb.state.stack;
  window.PickWeb.applyTheme(window.PickWeb.state.themeId);
  window.PickWeb.renderThemes();
  window.PickWeb.renderCanvas();
};

function init() {
  // 恢复本地保存的状态
  const saved = window.PickWeb.loadState();
  if (saved && typeof saved === 'object') {
    window.PickWeb.state = Object.assign({}, window.PickWeb.defaultState, saved);
    if (!Array.isArray(window.PickWeb.state.sections)) window.PickWeb.state.sections = [];
  }
  // 回填输入框
  document.getElementById('projName').value = window.PickWeb.state.projectName;
  document.getElementById('projPurpose').value = window.PickWeb.state.purpose;
  document.getElementById('stack').value = window.PickWeb.state.stack;
  // 渲染
  window.PickWeb.renderLib();
  window.PickWeb.renderThemes();
  window.PickWeb.applyTheme(window.PickWeb.state.themeId);
  window.PickWeb.renderCanvas();
  // 绑定
  bindInputs();
  bindFaq();
  window.PickWeb.initDnd();
}

init();
