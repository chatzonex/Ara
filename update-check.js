const CHATZONE_CURRENT_VERSION = "1.0.0";
const CHATZONE_VERSION_CHECK_URL = "https://chatzonex.github.io/ar/v.dat";
function compareVersions(_0x5308f4, _0x59b675) {
  const _0x1bc4cd = _0x5308f4.split(".").map(Number);
  const _0x4cf2d = _0x59b675.split(".").map(Number);
  for (
    let _0x18a6c8 = 0;
    _0x18a6c8 < Math.max(_0x1bc4cd.length, _0x4cf2d.length);
    _0x18a6c8++
  ) {
    const _0x5b16c0 = _0x1bc4cd[_0x18a6c8] || 0;
    const _0x451cef = _0x4cf2d[_0x18a6c8] || 0;
    if (_0x5b16c0 > _0x451cef) {
      return 1;
    }
    if (_0x5b16c0 < _0x451cef) {
      return -1;
    }
  }
  return 0;
}
function decodeVersionPayload(_0x2c4a3e) {
  try {
    const _0x4e48b2 = atob(_0x2c4a3e.trim());
    const _0x44e7e8 = _0x4e48b2
      .split("")
      .map(
        (_0x7db58d) =>
          "%" + _0x7db58d.charCodeAt(0).toString(16).padStart(2, "0"),
      )
      .join("");
    const _0x5710d3 = decodeURIComponent(_0x44e7e8);
    return JSON.parse(_0x5710d3);
  } catch (_0x58ee84) {
    console.log("ChatZone: failed to decode version payload", _0x58ee84);
    return null;
  }
}
function showChatZoneUpdatePopup(_0x585676, _0x3b52c9) {
  if (document.getElementById("cz-update-overlay")) {
    return;
  }
  const _0x2c98fc = document.createElement("div");
  _0x2c98fc.id = "cz-update-overlay";
  _0x2c98fc.style.cssText =
    "\n        position: fixed; inset: 0; background: rgba(0,0,0,0.6);\n        display: flex; align-items: center; justify-content: center;\n        z-index: 999999; font-family: inherit;\n    ";
  const _0x232061 = document.createElement("div");
  _0x232061.style.cssText =
    "\n        background: #fff; border-radius: 16px; padding: 24px;\n        max-width: 340px; width: 85%; text-align: center;\n        box-shadow: 0 10px 40px rgba(0,0,0,0.3);\n    ";
  _0x232061.innerHTML =
    '\n        <div style="font-size:40px; margin-bottom:12px;">🚀</div>\n        <h3 style="margin:0 0 10px; color:#111; font-size:18px;">تحديث جديد متاح</h3>\n        <p style="color:#555; font-size:14px; line-height:1.6; margin:0 0 20px;">' +
    _0x585676 +
    '</p>\n        <button id="cz-update-btn" style="\n            background:#1878f2; color:#fff; border:none; border-radius:10px;\n            padding:12px 24px; font-size:15px; font-weight:bold; width:100%;\n            cursor:pointer; margin-bottom:10px;\n        ">تحديث الآن</button>\n        <button id="cz-update-later-btn" style="\n            background:transparent; color:#888; border:none;\n            font-size:13px; cursor:pointer; padding:6px;\n        ">لاحقًا</button>\n    ';
  _0x2c98fc.appendChild(_0x232061);
  document.body.appendChild(_0x2c98fc);
  document.getElementById("cz-update-btn").onclick = () => {
    window.open(_0x3b52c9, "_blank");
  };
  document.getElementById("cz-update-later-btn").onclick = () => {
    _0x2c98fc.remove();
  };
}
function checkChatZoneUpdate() {
  fetch(CHATZONE_VERSION_CHECK_URL + "?t=" + Date.now())
    .then((_0x1ff732) => _0x1ff732.text())
    .then((_0x18caab) => {
      const _0x34b82c = decodeVersionPayload(_0x18caab);
      if (!_0x34b82c) {
        return;
      }
      if (
        compareVersions(_0x34b82c.latestVersion, CHATZONE_CURRENT_VERSION) > 0
      ) {
        showChatZoneUpdatePopup(
          _0x34b82c.message || "فيه نسخة جديدة من التطبيق متاحة الآن.",
          _0x34b82c.downloadUrl,
        );
      }
    })
    .catch((_0x39aaba) =>
      console.log("ChatZone update check failed:", _0x39aaba),
    );
}
document.addEventListener("DOMContentLoaded", checkChatZoneUpdate);
