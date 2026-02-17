(function() {
  'use strict';

  function addMetaTag(name, content) {
    let existingTag = document.querySelector(`meta[name="${name}"]`);
    if (!existingTag) {
      let metaTag = document.createElement('meta');
      metaTag.name = name;
      metaTag.content = content;
      document.head.appendChild(metaTag);
    }
  }

  addMetaTag('apple-mobile-web-app-capable', 'yes');
  addMetaTag('apple-mobile-web-app-status-bar-style', 'black-translucent');
})();
