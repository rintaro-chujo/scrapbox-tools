(function() {
  'use strict';

  function exportPage(projectName) {
    if (document.domain != 'scrapbox.io') return;
    if (!scrapbox || scrapbox.Layout !== 'page') return;

    const currentPageName = encodeURIComponent(scrapbox.Page.title);
    const body = encodeURIComponent(scrapbox.Page.lines.slice(1).map(l => l.text).join('\n'));
    window.open(`https://scrapbox.io/${projectName}/${currentPageName}?body=${body}`);
  }

  window.exportPage = exportPage;
})();
