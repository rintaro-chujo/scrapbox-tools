(function() {
  'use strict';

  function LinkAuthors(authorsStr) {
    const separators = /[,&;]|and|\n/gi;
    const removePattern = new RegExp(
      "[\\d†\\*]" +
      "|(\\s[a-z])+(\\s*$)" +
      "|ORCID" +
      "|View ORCID Profile" +
      "|Author links open overlay panel" +
      "|https?:\\/\\/\\S+",
      "gi"
    );
    const capitalize = words => words.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    const authors = authorsStr.replace(separators, ",")
      .split(",")
      .map(author => author.replace(removePattern, "").trim())
      .filter(author => author.length > 1)
      .map(author => `[${capitalize(author)}]`)
      .join(", ");

    return authors;
  }

  scrapbox.PopupMenu.addButton({
    title: 'Authors',
    onClick: LinkAuthors,
  });
})();
