(function() {
  'use strict';

  $(".cursor-line").each(function(index, element) {
    element.focus();
  });

  document.documentElement.setAttribute('data-os', 'mac');
})();
