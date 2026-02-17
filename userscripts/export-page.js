(function() {
  'use strict';

  const cfg = window.SCRAPBOX_TOOLS_CONFIG || {};
  const projectName = cfg.projectName;
  if (!projectName) {
    console.error('SCRAPBOX_TOOLS_CONFIG.projectName is required.');
    return;
  }
  const publicProjectName = cfg.publicProjectName || `${projectName}-public`;

  function exportPage(projectName) {
    if (document.domain != 'scrapbox.io') return;
    if (!scrapbox || scrapbox.Layout !== 'page') return;

    const currentPageName = encodeURIComponent(scrapbox.Page.title);
    const body = encodeURIComponent(scrapbox.Page.lines.slice(1).map(l => l.text).join('\n'));
    window.open(`https://scrapbox.io/${projectName}/${currentPageName}?body=${body}`);
  }

  function exportPage2() {
    if (document.domain != 'scrapbox.io') return;
    if (!scrapbox || scrapbox.Layout !== 'page') return;

    const body = encodeURIComponent(scrapbox.Page.lines.slice(1).map(l => l.text).join('\n'));
    window.open(`http://localhost:3000#${body}`);
  }

  scrapbox.PageMenu.addItem({
    title: 'Send to Public',
    onClick: () => exportPage(publicProjectName),
  });

  scrapbox.PageMenu.addItem({
    title: 'Send to Public2',
    onClick: () => { exportPage2(); },
  });
})();
