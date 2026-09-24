// 模块注册表：可扩展。每个模块包含通俗名、技术名、缩略图标、描述、分类与变体。
window.PickWeb = window.PickWeb || {};
window.PickWeb.modules = [
  {
    id: 'navbar', name: '导航栏', tech: 'Navbar', emoji: '🧭', category: '结构',
    desc: '页面顶部的菜单，放 Logo 和跳转链接',
    variants: [ { id: 'default', label: '标准' } ],
    render() {
      return `<header class="mod-navbar">
        <span class="logo">◈ Logo</span>
        <nav><a>首页</a><a>产品</a><a>关于</a><a>联系</a></nav>
        <button class="btn">开始</button>
      </header>`;
    }
  },
  {
    id: 'hero', name: '主视觉', tech: 'Hero', emoji: '🚀', category: '首屏',
    desc: '首屏的大标题和行动按钮，定第一印象',
    variants: [ { id: 'center', label: '居中' }, { id: 'left', label: '左对齐' } ],
    render(variant) {
      const align = variant === 'left' ? 'text-align:left;' : 'text-align:center;';
      const ctaAlign = variant === 'left' ? 'justify-content:flex-start;' : 'justify-content:center;';
      return `<section class="mod mod-hero" style="${align}">
        <h1>一句打动人心的主标题</h1>
        <p>这里是副标题，用一句话说清楚你的产品能为访客带来什么价值。</p>
        <div class="hero-cta" style="${ctaAlign}">
          <button class="btn">立即开始</button>
          <button class="btn ghost">了解更多</button>
        </div>
      </section>`;
    }
  },
  {
    id: 'features', name: '特性', tech: 'Features', emoji: '✨', category: '内容',
    desc: '三张卡片，展示产品的核心卖点',
    variants: [ { id: 'default', label: '三列卡片' } ],
    render() {
      return `<section class="mod">
        <h2>核心特性</h2>
        <div class="grid3">
          <div class="card"><div class="ic">⚡</div><h3>快速上手</h3><p>开箱即用，五分钟完成部署。</p></div>
          <div class="card"><div class="ic">🔒</div><h3>安全可靠</h3><p>数据加密，权限分级，稳定运行。</p></div>
          <div class="card"><div class="ic">📈</div><h3>持续增长</h3><p>内置分析，驱动业务不断增长。</p></div>
        </div>
      </section>`;
    }
  },
  {
    id: 'gallery', name: '画廊', tech: 'Gallery', emoji: '🖼️', category: '内容',
    desc: '展示作品、案例或产品图片的网格',
    variants: [ { id: 'default', label: '六宫格' } ],
    render() {
      return `<section class="mod">
        <h2>作品展示</h2>
        <div class="grid3 mod-gallery">
          <div class="tile">①</div><div class="tile">②</div><div class="tile">③</div>
          <div class="tile">④</div><div class="tile">⑤</div><div class="tile">⑥</div>
        </div>
      </section>`;
    }
  },
  {
    id: 'pricing', name: '价格表', tech: 'Pricing', emoji: '💳', category: '转化',
    desc: '三档套餐对比，引导用户选择付费方案',
    variants: [ { id: 'default', label: '三档对比' } ],
    render() {
      return `<section class="mod mod-pricing">
        <h2>定价方案</h2>
        <div class="grid3">
          <div class="card"><h3>基础版</h3><div class="price">¥0<span> / 月</span></div><div class="feat">核心功能<br>1 个项目<br>社区支持</div></div>
          <div class="card hot"><h3>专业版</h3><div class="price">¥99<span> / 月</span></div><div class="feat">全部功能<br>无限项目<br>优先支持</div></div>
          <div class="card"><h3>企业版</h3><div class="price">定制<span></span></div><div class="feat">专属定制<br>专属支持<br>SLA 保障</div></div>
        </div>
      </section>`;
    }
  },
  {
    id: 'faq', name: '常见问题', tech: 'FAQ', emoji: '❓', category: '转化',
    desc: '问答区，可切换「手风琴展开」或「抽屉滑出」',
    variants: [
      { id: 'accordion', label: '手风琴展开' },
      { id: 'drawer', label: '抽屉滑出' }
    ],
    render(variant) {
      const items = [
        { q: '这个产品适合我吗？', a: '如果你需要一个快速搭建、易于维护的网站，它非常适合你。' },
        { q: '可以退款吗？', a: '支持 7 天无理由退款，联系客服即可办理。' },
        { q: '支持定制吗？', a: '企业版支持深度定制，可按需求调整功能和视觉。' }
      ];
      const list = items.map(it => `
        <div class="faq-item" data-q="${it.q}" data-a="${it.a}">
          <button class="faq-q">${it.q}</button>
          <div class="faq-a">${it.a}</div>
        </div>`).join('');
      const hint = variant === 'drawer' ? '<div class="drawer-hint">点击问题，答案会从右侧像抽屉一样滑出来</div>' : '';
      return `<section class="mod mod-faq">
        <h2>常见问题</h2>
        <div class="faq-list">${list}</div>${hint}
      </section>`;
    }
  },
  {
    id: 'cta', name: '行动号召', tech: 'CTA', emoji: '📣', category: '转化',
    desc: '页面收尾的强引导，促使访客采取行动',
    variants: [ { id: 'default', label: '居中号召' } ],
    render() {
      return `<section class="mod mod-cta">
        <h2>准备好开始了吗？</h2>
        <button class="btn">联系我们</button>
      </section>`;
    }
  },
  {
    id: 'footer', name: '页脚', tech: 'Footer', emoji: '🦶', category: '结构',
    desc: '页面底部的版权、链接和备案信息',
    variants: [ { id: 'default', label: '标准页脚' } ],
    render() {
      return `<footer class="mod-footer">
        <div class="top"><span class="logo">◈ Logo</span>
          <div class="links"><a>关于</a><a>隐私</a><a>条款</a><a>联系</a></div></div>
        <p>© 2026 我的网站 · 保留所有权利</p>
      </footer>`;
    }
  }
];

// 便捷查询
window.PickWeb.getModule = id => window.PickWeb.modules.find(m => m.id === id);
