const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const againBtn = document.getElementById('againBtn');
const result = document.getElementById('result');
const resultText = document.getElementById('resultText');
const errorMsg = document.getElementById('errorMsg');

let scanner = null;

function setError(msg) {
  errorMsg.textContent = msg;
}

function clearError() {
  errorMsg.textContent = '';
}

async function startScanning() {
  clearError();
  startBtn.hidden = true;
  stopBtn.hidden = false;
  result.hidden = true;

  scanner = new Html5Qrcode('reader');

  try {
    await scanner.start(
      { facingMode: 'environment' },
      { fps: 10, qrbox: { width: 250, height: 250 } },
      (decodedText) => {
        stopScanning();
        resultText.textContent = decodedText;
        result.hidden = false;
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
againBtn.addEventListener('click', () => {
  result.hidden = true;
  startScanning();
});
