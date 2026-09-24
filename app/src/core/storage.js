// localStorage 持久化：失败时静默降级，不影响使用
window.PickWeb = window.PickWeb || {};

window.PickWeb.STORAGE_KEY = 'pickweb.state.v1';

window.PickWeb.saveState = function () {
  try {
    localStorage.setItem(window.PickWeb.STORAGE_KEY, JSON.stringify(window.PickWeb.state));
  } catch (e) { /* 忽略：file:// 或隐私模式下可能不可用 */ }
};

window.PickWeb.loadState = function () {
  try {
    const raw = localStorage.getItem(window.PickWeb.STORAGE_KEY);
    if (!raw) return null;
    const saved = JSON.parse(raw);
    if (saved && typeof saved === 'object') return saved;
  } catch (e) { /* 忽略 */ }
  return null;
};

window.PickWeb.clearStorage = function () {
  try { localStorage.removeItem(window.PickWeb.STORAGE_KEY); } catch (e) { /* 忽略 */ }
};
