// 主题注册表：可扩展。每套主题是一组 CSS 变量，一键全局换肤。
window.PickWeb = window.PickWeb || {};
window.PickWeb.themes = [
  { id: 'minimal', name: '极简', swatch: ['#ffffff', '#111111', '#e5e7eb'],
    css: { '--bg': '#ffffff', '--surface': '#f6f7f9', '--text': '#111111', '--muted': '#666666',
           '--primary': '#111111', '--primary-text': '#ffffff', '--accent': '#8b8b8b',
           '--border': '#e5e7eb', '--radius': '6px', '--shadow': '0 1px 3px rgba(0,0,0,.08)' } },
  { id: 'tech', name: '科技蓝', swatch: ['#eef2ff', '#4f46e5', '#a855f7'],
    css: { '--bg': '#eef2ff', '--surface': '#ffffff', '--text': '#0f172a', '--muted': '#475569',
           '--primary': '#4f46e5', '--primary-text': '#ffffff', '--accent': '#a855f7',
           '--border': '#dbeafe', '--radius': '12px', '--shadow': '0 10px 30px rgba(79,70,229,.14)' } },
  { id: 'dark', name: '暗黑', swatch: ['#0b0f1a', '#22d3ee', '#a855f7'],
    css: { '--bg': '#0b0f1a', '--surface': '#151b2b', '--text': '#e6e9f2', '--muted': '#8b93a7',
           '--primary': '#22d3ee', '--primary-text': '#06232b', '--accent': '#a855f7',
           '--border': '#232b3d', '--radius': '12px', '--shadow': '0 10px 30px rgba(0,0,0,.45)' } },
  { id: 'glass', name: '玻璃拟态', swatch: ['#e0e7ff', '#fce7f3', '#fef3c7'],
    css: { '--bg': 'linear-gradient(135deg,#e0e7ff,#fce7f3,#fef3c7)', '--surface': 'rgba(255,255,255,.55)',
           '--text': '#1a1a2e', '--muted': '#5a5a7a', '--primary': '#6d5dfc', '--primary-text': '#ffffff',
           '--accent': '#f472b6', '--border': 'rgba(255,255,255,.7)', '--radius': '18px',
           '--shadow': '0 12px 34px rgba(80,70,180,.18)' } }
];

window.PickWeb.getTheme = id => window.PickWeb.themes.find(t => t.id === id);
