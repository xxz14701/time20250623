const logs = [];

function recordTime(type) {
  const now = new Date().toLocaleString();
  logs.push({ type, time: now });
  const li = document.createElement('li');
  li.innerHTML = `<span style="font-weight:bold">${type}：</span>${now}`;
  document.getElementById('timeList').appendChild(li);
}

function downloadLog() {
  if (logs.length === 0) return alert('目前沒有任何記錄喔！');
  const lines = logs.map(e => `${e.type},${e.time}`).join('\n');
  const text = '類型,時間\n' + lines;
  const blob = new Blob([text], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'TimeLog.txt';
  a.click();
  URL.revokeObjectURL(url);
}

function clearList() {
  logs.length = 0;
  document.getElementById('timeList').innerHTML = '';
}

// Service Worker 註冊
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js')
      .then(() => console.log('SW 註冊成功'))
      .catch(err => console.error('SW 註冊失敗', err));
  });
}