(function() {
  'use strict';

  const cfg = window.SCRAPBOX_TOOLS_CONFIG || {};
  const kitId = cfg.adobeKitId || 'YOUR_KIT_ID';
  const adobeFontFamily = cfg.adobeFontFamily || "'yu-gothic-pr6n', sans-serif";

  (function(d) {
    var config = {
      kitId: kitId,
      scriptTimeout: 3000,
      async: true
    },
    h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
  })(document);

  const style = `
    body,
    .page,
    .line,
    .editor,
    textarea,
    .form-control,
    .grid-style-item .title,
    .search-form .form-control,
    .page-list-item a .title {
      font-family: ${adobeFontFamily} !important;
    }
  `;

  if (typeof GM_addStyle !== 'undefined') {
    GM_addStyle(style);
  } else {
    const styleElement = document.createElement('style');
    styleElement.type = 'text/css';
    styleElement.innerHTML = style;
    document.head.appendChild(styleElement);
  }

  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
        if (document.documentElement.classList.contains('wf-active')) {
          console.log('Adobe Fonts loaded and active (via wf-active class).');
          observer.disconnect();
        }
      }
    });
  });
  observer.observe(document.documentElement, {
    attributes: true
  });
  console.log('Scrapbox Custom Adobe Font UserScript Initialized! Waiting for Adobe Fonts to load...');
})();
