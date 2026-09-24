// 状态与默认值
window.PickWeb = window.PickWeb || {};

window.PickWeb.defaultState = {
  projectName: '我的网站',
  purpose: '展示产品与品牌，引导访客联系下单。',
  stack: '纯 HTML + CSS + JS',
  themeId: 'minimal',
  sections: [] // [{ moduleId, variantId }]
};

window.PickWeb.state = JSON.parse(JSON.stringify(window.PickWeb.defaultState));
