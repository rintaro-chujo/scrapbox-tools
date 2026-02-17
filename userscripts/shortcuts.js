(function() {
  'use strict';

  import('/api/code/rchujo/scrapbox-shortcut/script.js');
  const cfg = window.SCRAPBOX_TOOLS_CONFIG || {};
  const projectName = cfg.projectName || 'rchujo';

  function openTodayNote() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const date = String(today.getDate()).padStart(2, '0');
    const todayNote = `${year}${month}${date}`;
    location.href = `/${projectName}/${todayNote}`;
  }

  scrapboxShortcut.onBrowse('command+d', e => {
    openTodayNote();
  });
  scrapboxShortcut.onSearch('command+d', e => {
    openTodayNote();
  });
  scrapboxShortcut.onEdit('command+d', e => {
    openTodayNote();
  });

  scrapboxShortcut.onBrowse('command+h', e => {
    location.href = `/${projectName}/`;
  });
  scrapboxShortcut.onSearch('command+h', e => {
    location.href = `/${projectName}/`;
  });
  scrapboxShortcut.onEdit('command+h', e => {
    location.href = `/${projectName}/`;
  });

  scrapboxShortcut.onBrowse('command+n', e => {
    location.href = `/${projectName}/new`;
  });

  scrapboxShortcut.onBrowse('command+f', e => {
    $(".form-control").each(function(index, element) {
      element.focus();
    });
  });

  scrapboxShortcut.onSearch('command+n', e => {
    location.href = `https://scrapbox.io/${projectName}/new`;
  });

  scrapboxShortcut.onSearch('command+f', e => {
    document.activeElement.blur();
  });

  scrapboxShortcut.onEdit('command+n', e => {
    location.href = `https://scrapbox.io/${projectName}/new`;
  });

  scrapboxShortcut.onEdit('command+f', e => {
    $(".form-control").each(function(index, element) {
      element.focus();
    });
  });
})();
