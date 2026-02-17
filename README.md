# scrapbox-tools

Scrapbox/Cosense Userscripts and CSS extracted from Scrapbox pages and organized for public hosting.

## Structure
- `userscripts/` JavaScript userscripts
- `css/` CSS stylesheets (importable from Scrapbox settings)
- `config/config.example.js` Sample config (keep secrets in Scrapbox settings)

## Recommended usage (Scrapbox)
### Userscripts
In your Scrapbox project `settings` page:
```
code:script.js
// secrets/config kept here
window.SCRAPBOX_TOOLS_CONFIG = {
  adobeKitId: "YOUR_KIT_ID",
  adobeFontFamily: "'yu-gothic-pr6n', sans-serif",
  projectName: "YOUR_PROJECT_NAME",
  gyazoAccessToken: "YOUR_GYAZO_API_TOKEN",
  fabPostUrl: "https://scrapbox-notes.vercel.app/",
  shortcutScriptUrl: "https://scrapbox.io/api/code/YOUR_PROJECT/scrapbox-shortcut/script.js",
  publicProjectName: "YOUR_PROJECT_NAME-public",
  privateProjectName: "YOUR_PROJECT_NAME-private",
  notepadPageTitle: "YOUR_PROJECT_NAME's note"
};

import "https://cdn.jsdelivr.net/gh/rintaro-chujo/scrapbox-tools@main/userscripts/main.js";
```

### CSS
In your Scrapbox project `settings` page:
```
code:style.css
@import "https://cdn.jsdelivr.net/gh/rintaro-chujo/scrapbox-tools@main/css/settings.css";
```

## Notes
- If you want to enable/disable specific scripts, edit `userscripts/index.js` or use explicit imports in Scrapbox.
- `config/config.example.js` is a template only. Keep real secrets in Scrapbox settings.
