(function() {
  'use strict';

  const cfg = window.SCRAPBOX_TOOLS_CONFIG || {};
  const projectName = cfg.projectName;
  if (!projectName) {
    console.error('SCRAPBOX_TOOLS_CONFIG.projectName is required.');
    return;
  }
  const notepadPageTitle = cfg.notepadPageTitle || `${projectName}'s note`;

  scrapbox.PageMenu.addItem({
    title: 'Open notepad',
    image: 'https://gyazo.com/57cceb3617a3ed1cab82637113a4900c/raw',
    onClick: () => window.open(`/${projectName}/${encodeURIComponent(notepadPageTitle)}`, '', 'location=no, width=580, height=720')
  });
})();
