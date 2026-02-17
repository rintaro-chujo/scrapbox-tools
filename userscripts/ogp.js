(function() {
  'use strict';

  scrapbox.PopupMenu.addButton({
    title: 'Get OGP',
    onClick: (text) => {
      return `[https://ricapitolare.vercel.app/svg?url=${text}#.svg ${text}]`;
    },
  });
})();
