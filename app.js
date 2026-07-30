const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const results = document.getElementById('results');
const errorMsg = document.getElementById('errorMsg');

let scanner = null;
let scanCount = 0;

function setError(msg) {
  errorMsg.textContent = msg;
}

function clearError() {
  errorMsg.textContent = '';
}

function appendResult(text) {
  scanCount++;
  results.hidden = false;

  const item = document.createElement('div');
  item.className = 'result-item';

  const numSpan = document.createElement('span');
  numSpan.className = 'result-num';
  numSpan.textContent = `#${scanCount}`;

  const textEl = document.createElement('p');
  textEl.className = 'result-text';

  if (/^https?:\/\//i.test(text)) {
    const a = document.createElement('a');
    a.href = text;
    a.textContent = text;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    textEl.appendChild(a);
  } else {
    textEl.textContent = text;
  }

  item.appendChild(numSpan);
  item.appendChild(textEl);
  results.appendChild(item);
}

async function startScanning() {
  clearError();
  startBtn.hidden = true;
  stopBtn.hidden = false;

  scanner = new Html5Qrcode('reader');

  try {
    await scanner.start(
      { facingMode: 'environment' },
      { fps: 10, qrbox: { width: 250, height: 250 } },
      (decodedText) => {
        stopScanning();
        appendResult(decodedText);
      },
      () => {}
    );
  } catch (err) {
    scanner = null;
    startBtn.hidden = false;
    stopBtn.hidden = true;
    setError(err.message || 'Could not access camera. Make sure you allow camera permissions and are using HTTPS.');
  }
}

async function stopScanning() {
  stopBtn.hidden = true;
  startBtn.hidden = false;

  if (scanner) {
    try {
      await scanner.stop();
      scanner.clear();
    } catch (_) {}
    scanner = null;
  }
}

startBtn.addEventListener('click', startScanning);
stopBtn.addEventListener('click', stopScanning);
