(function() {
  'use strict';

  scrapbox.PageMenu.addItem({
    title: 'add template',
    onClick: () => template(),
  });

  function template() {
    return `
---------------------------------------------------task-line----------------------------------------------------
朝棚


----------------------------------------------------idea-line--------------------------------------------------
  `;
  }
})();
