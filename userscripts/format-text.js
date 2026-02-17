(function() {
  'use strict';

  scrapbox.PopupMenu.addButton({
    title: 'Format Text',
    onClick: text => {
      return text.replace(/\r?\n/g, '');
    }
  });
})();
