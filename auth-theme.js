(function () {
  function _0x346542(_0x3f6a44) {
    document.body.classList.toggle("theme-white", _0x3f6a44 === "white");
  }
  const _0x2cb26f = localStorage.getItem("cz_theme") || "dark";
  _0x346542(_0x2cb26f);
  document.addEventListener("DOMContentLoaded", () => {
    const _0xf87bca = document.getElementById("authThemeToggle");
    if (!_0xf87bca) {
      return;
    }
    _0xf87bca.addEventListener("click", () => {
      const _0xc7fd68 = localStorage.getItem("cz_theme") || "dark";
      const _0x14d9d4 = _0xc7fd68 === "white" ? "dark" : "white";
      localStorage.setItem("cz_theme", _0x14d9d4);
      _0x346542(_0x14d9d4);
    });
  });
})();
