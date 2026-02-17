(function() {
  'use strict';

  scrapbox.PopupMenu.addButton({
    title: 'Web',
    onClick: text => {
      const keyword = text.split(/\n/)
        .map(line => line.replace(/\[(.*)\]/g,'$1')).join('\n');
      const formattedText = keyword.split(/\s+/).map(word => `[${word}]`).join(' ');
      const webSearch = `[Web https://www.google.com/search?q=${encodeURIComponent(keyword)}]`;
      window.open(`https://www.google.com/search?q=${encodeURIComponent(keyword)}`);
      return `${formattedText} ${webSearch}`;
    }
  });
})();
