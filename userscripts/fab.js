(function() {
  'use strict';

  const cfg = window.SCRAPBOX_TOOLS_CONFIG || {};
  const PROJECT_NAME = cfg.projectName;
  if (!PROJECT_NAME) {
    console.error('SCRAPBOX_TOOLS_CONFIG.projectName is required.');
    return;
  }
  const POST_URL = cfg.fabPostUrl || 'https://scrapbox-notes.vercel.app/';

  const ICONS = {
    HOME: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"></rect><rect x="14" y="3" width="7" height="7" rx="1"></rect><rect x="3" y="14" width="7" height="7" rx="1"></rect><rect x="14" y="14" width="7" height="7" rx="1"></rect></svg>`,
    CALENDAR: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
    SEARCH: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>`,
    PLUS: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
    TWEET: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 5h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H9l-4 4v-4H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z"></path></svg>`
  };

  const cleanup = () => {
    const existingButtons = document.getElementById('custom-floating-buttons');
    if (existingButtons) existingButtons.remove();
    const existingStyle = document.getElementById('custom-floating-buttons-style');
    if (existingStyle) existingStyle.remove();
  };

  const getFormattedDate = () => {
    const date = new Date();
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}${mm}${dd}`;
  };

  const fabApi = window.SCRAPBOX_TOOLS_FAB || (window.SCRAPBOX_TOOLS_FAB = {
    buttons: [],
    register(btn) {
      if (!btn || !btn.id) return;
      const idx = this.buttons.findIndex(b => b.id === btn.id);
      if (idx >= 0) this.buttons[idx] = btn;
      else this.buttons.push(btn);
      if (typeof this.refresh === 'function') this.refresh();
    },
    refresh: null
  });

  const createButtons = () => {
    cleanup();

    const container = document.createElement('div');
    container.id = 'custom-floating-buttons';
    document.body.appendChild(container);

    const dailyNoteDate = getFormattedDate();

    const buttons = [
      {
        href: `/${PROJECT_NAME}/`,
        title: 'ページ一覧を開く',
        icon: ICONS.HOME,
        target: ''
      },
      {
        href: `/${PROJECT_NAME}/${dailyNoteDate}`,
        title: `今日のノート (${dailyNoteDate}) を開く`,
        icon: ICONS.CALENDAR,
        target: ''
      },
      {
        href: POST_URL,
        title: '新規ページ',
        icon: ICONS.TWEET,
        target: ''
      },
      {
        href: `/${PROJECT_NAME}/new`,
        title: '新規ページ',
        icon: ICONS.PLUS,
        target: ''
      }
    ].concat(fabApi.buttons || []);

    buttons.forEach(btnInfo => {
      const button = document.createElement('a');
      button.href = btnInfo.href;
      button.title = btnInfo.title;
      button.innerHTML = btnInfo.icon;
      if (btnInfo.target) {
        button.target = btnInfo.target;
      }
      if (btnInfo.onClick) {
        button.addEventListener('click', (e) => {
          e.preventDefault();
          btnInfo.onClick(e);
        });
      }
      button.rel = 'noopener noreferrer';
      container.appendChild(button);
    });

    const styleElement = document.createElement('style');
    styleElement.id = 'custom-floating-buttons-style';
    styleElement.textContent = `
      #custom-floating-buttons {
        position: fixed;
        bottom: 25px;
        right: 10px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        z-index: 10000;
      }
      #custom-floating-buttons a {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        background: rgba(0, 0, 0, 0);
        backdrop-filter: blur(10px);
        color: #555;
        border-radius: 8px;
        text-decoration: none;
        transition: all 0.2s ease-in-out;
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        border: 1px solid rgba(0, 0, 0, 0.05);
      }
      #custom-floating-buttons a:hover {
        background: rgba(100, 100, 100, 0.5);
        transform: scale(1.05);
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
        color: #007aff;
      }
    `;
    document.head.appendChild(styleElement);

    console.log(`[UserScript] Scrapbox Floating Helper Buttons for /${PROJECT_NAME}/ initialized.`);
  };

  fabApi.refresh = createButtons;
  createButtons();

  if (typeof scrapbox !== 'undefined' && scrapbox.addListener) {
    scrapbox.addListener('layout:changed', createButtons);
  }
})();
