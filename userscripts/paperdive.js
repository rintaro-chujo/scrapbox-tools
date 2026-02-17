(function() {
  'use strict';

  scrapbox.PopupMenu.addButton({
    title: 'Paper',
    onClick: text => {
      window.open('https://paper-to-cosence.web.app/?q="' + text + '"', '', 'location=no, width=580, height=720');
      return `[${text}]`;
    }
  });
})();
