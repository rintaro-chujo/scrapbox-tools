(function() {
  'use strict';

  $('#text-input').on('keydown', e => {
    if (e.keyCode != 0x09) return true;
    if ($('.cursor-line .code-block').length != 0) return true;
    if ($('.cursor-line .table-block').length != 0) return true;
    if ($('.popup-menu').length != 0) return true;

    let keydown = document.createEvent('Events');
    keydown.initEvent('keydown', true, true);
    keydown.keyCode = e.which = (e.shiftKey ? 37 : 39);
    keydown.ctrlKey  = true;
    $('#text-input')[0].dispatchEvent(keydown);

    return false;
  });
})();
