// 拖拽：从模块库拖入 + 画布内拖拽排序
window.PickWeb = window.PickWeb || {};

window.PickWeb.dnd = { type: null, moduleId: null, sourceIndex: null, targetIndex: null };

function hideIndicator() {
  const el = document.getElementById('dropIndicator');
  if (el) el.style.display = 'none';
}

function cleanupDnd() {
  window.PickWeb.dnd.type = null;
  window.PickWeb.dnd.moduleId = null;
  window.PickWeb.dnd.sourceIndex = null;
  window.PickWeb.dnd.targetIndex = null;
  document.querySelectorAll('.lib-card.dragging').forEach(c => c.classList.remove('dragging'));
  document.querySelectorAll('.sec.sorting-source').forEach(s => s.classList.remove('sorting-source'));
  const canvas = document.getElementById('canvas');
  if (canvas) canvas.classList.remove('drag-over');
  hideIndicator();
}

function updateIndicator(clientY) {
  const canvas = document.getElementById('canvas');
  const secs = Array.from(canvas.querySelectorAll('.sec'));
  if (secs.length === 0) return;
  const canvasRect = canvas.getBoundingClientRect();
  let targetIndex = secs.length;
  for (let k = 0; k < secs.length; k++) {
    const r = secs[k].getBoundingClientRect();
    if (clientY < r.top + r.height / 2) { targetIndex = k; break; }
  }
  window.PickWeb.dnd.targetIndex = targetIndex;
  const indicator = document.getElementById('dropIndicator');
  const top = targetIndex < secs.length
    ? secs[targetIndex].getBoundingClientRect().top
    : secs[secs.length - 1].getBoundingClientRect().bottom;
  indicator.style.display = 'block';
  indicator.style.left = (canvasRect.left + 8) + 'px';
  indicator.style.width = (canvasRect.width - 16) + 'px';
  indicator.style.top = (top - 1) + 'px';
}

function applySort() {
  const s = window.PickWeb.state.sections;
  const src = window.PickWeb.dnd.sourceIndex;
  let tgt = window.PickWeb.dnd.targetIndex;
  if (src == null || tgt == null || src < 0 || src >= s.length) return;
  if (tgt < 0) tgt = 0;
  if (tgt > s.length) tgt = s.length;
  if (tgt === src || tgt === src + 1) return; // 位置未变
  const moved = s.splice(src, 1)[0];
  const insertAt = tgt > src ? tgt - 1 : tgt;
  s.splice(insertAt, 0, moved);
  window.PickWeb.renderCanvas();
  window.PickWeb.saveState();
}

window.PickWeb.initDnd = function () {
  const canvas = document.getElementById('canvas');

  document.addEventListener('dragstart', function (e) {
    const lib = e.target.closest('.lib-card');
    if (lib) {
      window.PickWeb.dnd.type = 'library';
      window.PickWeb.dnd.moduleId = lib.dataset.module;
      e.dataTransfer.setData('text/plain', lib.dataset.module);
      e.dataTransfer.effectAllowed = 'copy';
      lib.classList.add('dragging');
      return;
    }
    const handle = e.target.closest('.drag-handle');
    if (handle) {
      window.PickWeb.dnd.type = 'sort';
      window.PickWeb.dnd.sourceIndex = parseInt(handle.dataset.index, 10);
      e.dataTransfer.setData('text/plain', 'sort');
      e.dataTransfer.effectAllowed = 'move';
      const sec = handle.closest('.sec');
      if (sec) sec.classList.add('sorting-source');
    }
  });

  document.addEventListener('dragend', cleanupDnd);

  canvas.addEventListener('dragover', function (e) {
    e.preventDefault();
    if (window.PickWeb.dnd.type === 'library') {
      e.dataTransfer.dropEffect = 'copy';
      canvas.classList.add('drag-over');
    } else if (window.PickWeb.dnd.type === 'sort') {
      e.dataTransfer.dropEffect = 'move';
      updateIndicator(e.clientY);
    }
  });

  canvas.addEventListener('dragleave', function () {
    canvas.classList.remove('drag-over');
  });

  canvas.addEventListener('drop', function (e) {
    e.preventDefault();
    if (window.PickWeb.dnd.type === 'library') {
      const modId = window.PickWeb.dnd.moduleId || e.dataTransfer.getData('text/plain');
      const mod = window.PickWeb.getModule(modId);
      if (mod) {
        window.PickWeb.state.sections.push({ moduleId: mod.id, variantId: mod.variants[0].id });
        window.PickWeb.renderCanvas(true);
        window.PickWeb.saveState();
      }
    } else if (window.PickWeb.dnd.type === 'sort') {
      applySort();
    }
    cleanupDnd();
  });
};
