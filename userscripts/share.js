(function() {
  'use strict';

  scrapbox.PopupMenu.addButton({
    title: 'Share',
    onClick: (text) => {
      if (navigator.share) {
        navigator.share({
          text: text,
        }).then(() => {
          console.log('共有成功');
        }).catch((error) => {
          console.error('共有失敗:', error);
        });
      } else {
        alert('このブラウザは Navigator.share() に対応していません。');
      }
    },
  });
})();
