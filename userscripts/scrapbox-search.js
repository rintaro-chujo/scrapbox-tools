(function() {
  'use strict';

  const cfg = window.SCRAPBOX_TOOLS_CONFIG || {};
  const projectName = cfg.projectName;
  if (!projectName) {
    console.error('SCRAPBOX_TOOLS_CONFIG.projectName is required.');
    return;
  }

  scrapbox.PopupMenu.addButton({
    title: 'Note',
    onClick: text => {
      const keyword = text.split(/\n/)
        .map(line => line.replace(/\[(.*)\]/g,'$1')).join('\n');
      keyword.split(/\s+/).map(word => `[${word}]`).join(' ');
      window.location.href = `https://scrapbox.io/${projectName}/search/page?q=${encodeURIComponent(keyword)}`;
      return;
    }
  });
})();
