(function() {
  'use strict';

  const replaceText = text => {
    const reg = /[\[\［].*?[\]\］]/g;
    let lines = text.split('\n');
    lines = lines.map(line => line.replace(reg, ''));
    return lines.join('\n');
  };

  scrapbox.PopupMenu.addButton({
    title: 'replace',
    onClick: replaceText
  });
})();
