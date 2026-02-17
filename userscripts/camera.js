(function() {
  'use strict';

  const cfg = window.SCRAPBOX_TOOLS_CONFIG || {};
  const PROJECT_NAME = cfg.projectName || 'your-project-name';
  const GYAZO_ACCESS_TOKEN = cfg.gyazoAccessToken || 'YOUR_GYAZO_API_TOKEN';

  const ICONS = {
    CAMERA: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>`,
    CLOSE: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`
  };

  const getDailyNoteTitle = () => {
    const d = new Date();
    return `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
  };

  const uploadToGyazo = async (blob) => {
    const formData = new FormData();
    formData.append('access_token', GYAZO_ACCESS_TOKEN);
    formData.append('imagedata', blob, 'camera_capture.png');

    const response = await fetch('https://upload.gyazo.com/api/upload', {
      method: 'POST',
      body: formData
    });
    const data = await response.json();
    return data.url;
  };

  const appendToScrapbox = async (title, text) => {
    const projectUrl = `https://scrapbox.io/api/pages/${PROJECT_NAME}/${encodeURIComponent(title)}`;
    const res = await fetch(projectUrl);
    let bodyText = "";

    if (res.ok) {
      const pageData = await res.json();
      bodyText = pageData.lines.map(l => l.text).join('\n');
    }

    const newContent = bodyText + "\n" + text;

    const importData = {
      pages: [{ title: title, lines: newContent.split('\n') }]
    };

    await fetch(`https://scrapbox.io/api/pages/${PROJECT_NAME}/import`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
      body: JSON.stringify(importData)
    });

    alert("Daily Noteに保存しました！");
    window.location.reload();
  };

  const startCamera = async () => {
    const overlay = document.createElement('div');
    overlay.id = 'camera-overlay';
    overlay.innerHTML = `
      <div class="camera-container">
        <video id="video" autoplay playsinline></video>
        <div class="camera-controls">
          <button id="capture-btn">📸 撮影してアップロード</button>
          <button id="close-btn">キャンセル</button>
        </div>
        <canvas id="canvas" style="display:none;"></canvas>
      </div>
    `;
    document.body.appendChild(overlay);

    const video = document.getElementById('video');
    const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }, audio: false });
    video.srcObject = stream;

    document.getElementById('close-btn').onclick = () => {
      stream.getTracks().forEach(track => track.stop());
      overlay.remove();
    };

    document.getElementById('capture-btn').onclick = async () => {
      const canvas = document.getElementById('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0);

      video.pause();
      document.getElementById('capture-btn').innerText = "アップロード中...";

      canvas.toBlob(async (blob) => {
        try {
          const imageUrl = await uploadToGyazo(blob);
          const dailyTitle = getDailyNoteTitle();
          await appendToScrapbox(dailyTitle, `[${imageUrl}]`);

          stream.getTracks().forEach(track => track.stop());
          overlay.remove();
        } catch (err) {
          alert("エラーが発生しました: " + err);
          console.error(err);
        }
      }, 'image/png');
    };
  };

  const createButtons = () => {
    const existing = document.getElementById('camera-floating-button');
    if (existing) existing.remove();

    const container = document.createElement('div');
    container.id = 'camera-floating-button';

    const btn = document.createElement('button');
    btn.innerHTML = ICONS.CAMERA;
    btn.title = "カメラで撮影してDailyNoteへ";
    btn.onclick = startCamera;

    container.appendChild(btn);
    document.body.appendChild(container);

    const style = document.createElement('style');
    style.textContent = `
      #camera-floating-button {
        position: fixed;
        bottom: 25px;
        right: 60px;
        z-index: 10000;
      }
      #camera-floating-button button {
        width: 45px; height: 45px;
        border-radius: 50%;
        background: #007aff;
        color: white;
        border: none;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        display: flex; align-items: center; justify-content: center;
      }
      #camera-overlay {
        position: fixed; top:0; left:0; width:100%; height:100%;
        background: black; z-index: 20000;
        display: flex; flex-direction: column; align-items: center; justify-content: center;
      }
      .camera-container { width: 100%; max-width: 600px; text-align: center; }
      #video { width: 90%; border-radius: 8px; background: #222; }
      .camera-controls { margin-top: 20px; display: flex; gap: 10px; justify-content: center; }
      .camera-controls button { padding: 12px 20px; border-radius: 8px; border: none; font-weight: bold; cursor: pointer; }
      #capture-btn { background: #28a745; color: white; }
      #close-btn { background: #dc3545; color: white; }
    `;
    document.head.appendChild(style);
  };

  createButtons();
  if (typeof scrapbox !== 'undefined' && scrapbox.addListener) {
    scrapbox.addListener('layout:changed', createButtons);
  }
})();
