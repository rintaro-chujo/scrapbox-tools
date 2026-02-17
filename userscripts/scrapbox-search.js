(function() {
  'use strict';

  scrapbox.PopupMenu.addButton({
    title: 'Note',
    onClick: text => {
      const keyword = text.split(/\n/)
        .map(line => line.replace(/\[(.*)\]/g,'$1')).join('\n');
      keyword.split(/\s+/).map(word => `[${word}]`).join(' ');
      window.location.href = `https://scrapbox.io/rchujo/search/page?q=${encodeURIComponent(keyword)}`;
      return;
    }
  });
})();
