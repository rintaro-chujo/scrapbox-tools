(function() {
  'use strict';

  const cfg = window.SCRAPBOX_TOOLS_CONFIG || {};
  const projectName = cfg.projectName || 'rchujo';
  const privateProjectName = cfg.privateProjectName || `${projectName}-private`;

  function createTitlePage(projectName) {
    if (document.domain != 'scrapbox.io') return;
    if (!scrapbox || scrapbox.Layout !== 'page') return;

    const currentPageName = encodeURIComponent(scrapbox.Page.title);
    const body = encodeURIComponent(`[/${privateProjectName}/${scrapbox.Page.title}]`);
    window.open(`https://scrapbox.io/${projectName}/${currentPageName}?body=${body}`);
  }

  scrapbox.PageMenu.addItem({
    title: 'Create title page in Main',
    onClick: () => createTitlePage(projectName),
  });
})();
