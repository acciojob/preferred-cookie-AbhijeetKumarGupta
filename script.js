//your JS code here. If required.
const form = document.querySelector("form");
const fontSizeInput = document.getElementById("fontsize");
const fontColorInput = document.getElementById("fontcolor");

function applyPreferences(fontSize, fontColor) {
  document.documentElement.style.setProperty("--fontsize", `${fontSize}px`);
  document.documentElement.style.setProperty("--fontcolor", fontColor);
}

function getCookie(name) {
  const cookie = document.cookie
    .split("; ")
    .find((item) => item.startsWith(`${name}=`));

  return cookie ? decodeURIComponent(cookie.split("=").slice(1).join("=")) : null;
}

const savedFontSize = getCookie("fontsize");
const savedFontColor = getCookie("fontcolor");

if (savedFontSize && savedFontColor) {
  fontSizeInput.value = parseInt(savedFontSize, 10);
  fontColorInput.value = savedFontColor;
  applyPreferences(parseInt(savedFontSize, 10), savedFontColor);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const fontSize = Number(fontSizeInput.value);
  const fontColor = fontColorInput.value;

  if (fontSize < 8 || fontSize > 72 || !fontSize) {
    return;
  }

  document.cookie = `fontsize=${fontSize}; path=/; max-age=31536000; SameSite=Lax`;
  document.cookie = `fontcolor=${encodeURIComponent(fontColor)}; path=/; max-age=31536000; SameSite=Lax`;

  applyPreferences(fontSize, fontColor);
});