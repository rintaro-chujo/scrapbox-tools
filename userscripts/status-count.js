(function() {
  'use strict';

  const statusDom = document.createElement('div');
  document.querySelector('.status-bar').appendChild(statusDom);
  updateStatusDom();
  updateCount();
  scrapbox.on('layout:changed', updateStatusDom);
  scrapbox.on('lines:changed', updateCount);

  function updateStatusDom () {
    if (scrapbox.Layout !== 'page') {
      document.querySelector('.status-bar').removeChild(statusDom);
    } else {
      document.querySelector('.status-bar').appendChild(statusDom);
    }
  }

  function updateCount () {
    if (!window.scrapbox.Page.lines) return;
    const chars = scrapbox.Page.lines.map(line => line.text.length).reduce((a, b) => a + b);
    const words = scrapbox.Page.lines.map(line => line.text.split(/\s/).length).reduce((a, b) => a + b);
    const lines = scrapbox.Page.lines.length;
    statusDom.innerText = `${lines}lines ${words}words ${chars}char`;
  }
})();
