(function() {
  'use strict';

  const statusDom = document.createElement('div');
  statusDom.style.display = 'flex';
  statusDom.style.alignItems = 'center';

  const countDom = document.createElement('span');
  const timeDom  = document.createElement('span');
  timeDom.style.marginLeft = '1em';

  statusDom.append(countDom, timeDom);
  document.querySelector('.status-bar').appendChild(statusDom);

  updateStatusDom();
  updateCount();

  scrapbox.on('layout:changed', updateStatusDom);
  scrapbox.on('lines:changed', updateCount);

  function updateStatusDom () {
    const bar = document.querySelector('.status-bar');
    if (scrapbox.Layout !== 'page') {
      if (bar.contains(statusDom)) {
        bar.removeChild(statusDom);
      }
    } else {
      if (!bar.contains(statusDom)) {
        bar.appendChild(statusDom);
      }
    }
  }

  function updateCount () {
    if (!window.scrapbox.Page.lines) return;
    const lines = scrapbox.Page.lines.length;
    const words = scrapbox.Page.lines
      .map(l => l.text.split(/\s+/).filter(Boolean).length)
      .reduce((a, b) => a + b, 0);
    const chars = scrapbox.Page.lines
      .map(l => l.text.length)
      .reduce((a, b) => a + b, 0);

    countDom.innerText = `${lines} lines  ${words} words  ${chars} chars`;
    updateTime();
  }

  function updateTime () {
    const now = new Date();
    const z2 = v => String(v).padStart(2, '0');
    const formatted = [
      now.getFullYear(),
      z2(now.getMonth() + 1),
      z2(now.getDate())
    ].join('/') + ' ' + [
      z2(now.getHours()),
      z2(now.getMinutes())
    ].join(':');
    timeDom.innerText = formatted;
  }

  setInterval(updateTime, 1000);
})();
