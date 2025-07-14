const qrText = document.getElementById('qr-text');
const sizes = document.getElementById('sizes');
const generateBtn = document.getElementById('generateBtn');
const downloadBtn = document.getElementById('downloadBtn');
const qrContainer = document.querySelector('.qr-body');

let size = sizes.value;

generateBtn.addEventListener('click', (e) => {
  e.preventDefault();
  validateInput();
});

sizes.addEventListener('change', (e) => {
  size = e.target.value;
  if (qrText.value.trim().length > 0) {
    generateQRCode();
  }
});

downloadBtn.addEventListener('click', () => {
  const canvas = qrContainer.querySelector('canvas');
  if (canvas) {
    downloadBtn.setAttribute('href', canvas.toDataURL('image/png'));
    downloadBtn.setAttribute('download', 'qr-code.png');
  } else {
    alert("No QR code available for download.");
  }
});

function validateInput() {
  const text = qrText.value.trim();
  if (text.length === 0) {
    alert("Enter the text or URL to generate your QR code.");
    return;
  }
  if (text.length > 2000) {
    alert("Input is too long. Please use a shorter text or URL.");
    return;
  }
  if (text.includes('http') && !/^(https?:\/\/)/.test(text)) {
    alert("Invalid URL. Please include 'http://' or 'https://'.");
    return;
  }
  generateQRCode();
}

function generateQRCode() {
  qrContainer.innerHTML = "";
  try {
    new QRCode(qrContainer, {
      text: qrText.value.trim(),
      height: parseInt(size),
      width: parseInt(size),
      colorLight: "#fff",
      colorDark: "#000",
    });
    downloadBtn.classList.add("show");
  } catch (error) {
    alert("Failed to generate QR code. Please check your input.");
    console.error("QR Code Error:", error);
  }
}