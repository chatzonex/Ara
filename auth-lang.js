(function () {
  function _0x5e0240(_0x50af88) {
    const _0x5a1eea = _0x50af88 === "en";
    document.documentElement.setAttribute("lang", _0x5a1eea ? "en" : "ar");
    document.documentElement.setAttribute("dir", _0x5a1eea ? "ltr" : "rtl");
    document.body.classList.toggle("lang-en", _0x5a1eea);
    document.querySelectorAll("[data-ar], [data-en]").forEach((_0x4016d2) => {
      const _0x4fd9aa = _0x5a1eea
        ? _0x4016d2.getAttribute("data-en")
        : _0x4016d2.getAttribute("data-ar");
      if (_0x4fd9aa === null) {
        return;
      }
      if (_0x4016d2.hasAttribute("placeholder")) {
        _0x4016d2.setAttribute("placeholder", _0x4fd9aa);
      } else {
        _0x4016d2.textContent = _0x4fd9aa;
      }
    });
    document
      .querySelectorAll("[data-ar-html], [data-en-html]")
      .forEach((_0x50a1f7) => {
        const _0x6ecdf6 = _0x5a1eea
          ? _0x50a1f7.getAttribute("data-en-html")
          : _0x50a1f7.getAttribute("data-ar-html");
        if (_0x6ecdf6 === null) {
          return;
        }
        _0x50a1f7.innerHTML = _0x6ecdf6;
      });
    document
      .querySelectorAll("[data-ar-aria], [data-en-aria]")
      .forEach((_0x1fc306) => {
        const _0x2db6b1 = _0x5a1eea
          ? _0x1fc306.getAttribute("data-en-aria")
          : _0x1fc306.getAttribute("data-ar-aria");
        if (_0x2db6b1 === null) {
          return;
        }
        _0x1fc306.setAttribute("aria-label", _0x2db6b1);
      });
    document.dispatchEvent(
      new CustomEvent("czlangchange", {
        detail: {
          lang: _0x5a1eea ? "en" : "ar",
        },
      }),
    );
  }
  function _0x5b5bf9() {
    return localStorage.getItem("cz_lang") || "ar";
  }
  _0x5e0240(_0x5b5bf9());
  document.addEventListener("DOMContentLoaded", () => {
    const _0x268887 = document.getElementById("authLangToggle");
    if (!_0x268887) {
      return;
    }
    _0x268887.addEventListener("click", () => {
      const _0x2d66eb = _0x5b5bf9() === "en" ? "ar" : "en";
      localStorage.setItem("cz_lang", _0x2d66eb);
      _0x5e0240(_0x2d66eb);
    });
  });
  window.czGetLang = _0x5b5bf9;
  window.czApplyLang = _0x5e0240;
})();
