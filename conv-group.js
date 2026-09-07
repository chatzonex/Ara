import {
  db,
  doc,
  setDoc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  deleteField,
  arrayUnion,
  collection,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  writeBatch,
  ensureAuthenticated,
} from "./firebase-init.js";
(function () {
  const _0x4a7454 = localStorage.getItem("cz_lang") || "ar";
  const _0x5a127d = localStorage.getItem("cz_theme") || "dark";
  const _0xcdfef = _0x4a7454 === "ar";
  document.documentElement.lang = _0x4a7454;
  document.documentElement.dir = _0xcdfef ? "rtl" : "ltr";
  if (_0x5a127d === "white") {
    document.body.classList.add("theme-white");
  }
  if (_0x5a127d === "custom") {
    document.body.classList.add("theme-custom");
    const _0x42af21 = localStorage.getItem("cz_theme_color");
    if (_0x42af21) {
      document.documentElement.style.setProperty("--accent", _0x42af21);
    }
  }
  if (localStorage.getItem("cz_lg_chat") === "on") {
    document.body.classList.add("lg-chat-on");
  }
  const _0x4c8287 = {
    ar: {
      type_message: "اكتب رسالة...",
      unknown_group: "جروب",
      bubbles_mine_title: "لون فقاعتي",
      bubbles_tick_title: "لون الصح الزرقاء",
      choose_color_title: "اختر لون",
      ctx_reply: "رد",
      ctx_copy: "نسخ",
      ctx_select: "تحديد",
      ctx_delete_msg: "حذف الرسالة",
      deleted_msg_text: "تم حذف هذه الرسالة",
      reply_you: "أنت",
      msg_deleted_toast: "اتحذفت الرسالة",
      copied_toast: "اتنسخت الرسالة",
      typing_status_one: "{name} بيكتب الآن...",
      typing_status_many: "كذا شخص بيكتبوا الآن...",
      weak_connection: "نتك ضعيف",
      group_you_created: "أنشأ الجروب",
      group_members_count: "عضو",
      group_owner_badge: "صاحب الجروب",
    },
    en: {
      type_message: "Type a message...",
      unknown_group: "Group",
      bubbles_mine_title: "My bubble color",
      bubbles_tick_title: "Blue checkmark color",
      choose_color_title: "Choose a color",
      ctx_reply: "Reply",
      ctx_copy: "Copy",
      ctx_select: "Select",
      ctx_delete_msg: "Delete message",
      deleted_msg_text: "This message was deleted",
      reply_you: "You",
      msg_deleted_toast: "Message deleted",
      copied_toast: "Message copied",
      typing_status_one: "{name} is typing...",
      typing_status_many: "Several people are typing...",
      weak_connection: "Weak connection",
      group_you_created: "created the group",
      group_members_count: "members",
      group_owner_badge: "Owner",
    },
  };
  const _0x338d14 = _0x4c8287[_0xcdfef ? "ar" : "en"];
  document.querySelectorAll("[data-i18n]").forEach((_0x1b5510) => {
    const _0x4a5a17 = _0x1b5510.getAttribute("data-i18n");
    if (_0x338d14[_0x4a5a17] !== undefined) {
      _0x1b5510.textContent = _0x338d14[_0x4a5a17];
    }
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((_0x205236) => {
    const _0x118378 = _0x205236.getAttribute("data-i18n-placeholder");
    if (_0x338d14[_0x118378]) {
      _0x205236.setAttribute("placeholder", _0x338d14[_0x118378]);
    }
  });
  const _0x38d3e1 = localStorage.getItem("cz_verified_email");
  const _0x30d4c6 = localStorage.getItem("cz_active_group_id") || "";
  if (!_0x38d3e1 || !_0x30d4c6) {
    window.location.href = "MainActivity.html";
    return;
  }
  const _0x3712b6 = _0x38d3e1.toLowerCase();
  const _0x38f0e9 = document.getElementById("convName");
  const _0xb86b4d = document.getElementById("convStatus");
  const _0xce91ed = document.getElementById("convAvatar");
  const _0x3f2690 = document.getElementById("groupAvatarInitial");
  const _0x5c2528 = document.getElementById("convMessages");
  function _0x442862(_0x3a4add) {
    const _0x4cb671 = (_0x3a4add || _0x338d14.unknown_group).trim();
    if (_0x4cb671) {
      return _0x4cb671.charAt(0).toUpperCase();
    } else {
      return "؟";
    }
  }
  let _0x41489a = null;
  function _0x1981df(_0x1df86a) {
    let _0x55f3d7 = document.getElementById("czToast");
    if (!_0x55f3d7) {
      _0x55f3d7 = document.createElement("div");
      _0x55f3d7.id = "czToast";
      _0x55f3d7.className = "cz-toast";
      document.body.appendChild(_0x55f3d7);
    }
    _0x55f3d7.textContent = _0x1df86a;
    _0x55f3d7.classList.add("show");
    if (_0x41489a) {
      clearTimeout(_0x41489a);
    }
    _0x41489a = setTimeout(() => _0x55f3d7.classList.remove("show"), 2200);
  }
  const _0x2e8660 = document.getElementById("convBackBtn");
  if (_0x2e8660) {
    _0x2e8660.addEventListener("click", () => {
      window.location.href = "MainActivity.html";
    });
  }
  const _0x35cf7f = doc(db, "groups", _0x30d4c6);
  let _0xba59c4 = {
    name: "",
    photoURL: "",
    members: [],
    memberEmails: [],
    ownerUid: "",
  };
  let _0x5bf423 = new Map();
  function _0x2789a4() {
    if (_0x38f0e9) {
      _0x38f0e9.textContent = _0xba59c4.name || _0x338d14.unknown_group;
    }
    if (_0xce91ed) {
      let _0x9a8839 = _0xce91ed.querySelector(".conv-avatar-img");
      if (_0xba59c4.photoURL) {
        if (!_0x9a8839) {
          _0x9a8839 = document.createElement("img");
          _0x9a8839.className = "conv-avatar-img";
          _0x9a8839.alt = "";
          _0xce91ed.appendChild(_0x9a8839);
        }
        _0x9a8839.src = _0xba59c4.photoURL;
        if (_0x3f2690) {
          _0x3f2690.style.display = "none";
        }
      } else {
        if (_0x9a8839) {
          _0x9a8839.remove();
        }
        if (_0x3f2690) {
          _0x3f2690.style.display = "";
          _0x3f2690.textContent = _0x442862(_0xba59c4.name);
        }
      }
    }
    _0xb95387();
  }
  const _0x3cff02 = document.getElementById("convMenuBtn");
  const _0x11826e = document.getElementById("convSidebarMenu");
  const _0x2ff326 = document.getElementById("convSidebarOverlay");
  function _0x3289e9() {
    if (!_0x11826e || !_0x2ff326 || !_0x3cff02) {
      return;
    }
    const _0x11b745 = document.documentElement.dir === "rtl";
    const _0x313e53 = _0x3cff02.getBoundingClientRect();
    _0x11826e.style.top = _0x313e53.bottom + 8 + "px";
    if (_0x11b745) {
      _0x11826e.style.right = window.innerWidth - _0x313e53.right + "px";
      _0x11826e.style.left = "auto";
    } else {
      _0x11826e.style.left = _0x313e53.left + "px";
      _0x11826e.style.right = "auto";
    }
    _0x11826e.classList.add("open");
    _0x2ff326.classList.add("open");
  }
  function _0x1a8aa6() {
    if (!_0x11826e || !_0x2ff326) {
      return;
    }
    _0x11826e.classList.remove("open");
    _0x2ff326.classList.remove("open");
  }
  if (_0x3cff02) {
    _0x3cff02.addEventListener("click", () => {
      if (_0x11826e && _0x11826e.classList.contains("open")) {
        _0x1a8aa6();
      } else {
        _0x3289e9();
      }
    });
  }
  if (_0x2ff326) {
    _0x2ff326.addEventListener("click", _0x1a8aa6);
  }
  function _0x1fdf01(_0x591ae6) {
    const _0xe0b168 = document.getElementById(_0x591ae6);
    if (_0xe0b168) {
      _0xe0b168.classList.add("open");
    }
  }
  function _0x3a0830(_0x326477) {
    const _0x21eeff = document.getElementById(_0x326477);
    if (_0x21eeff) {
      _0x21eeff.classList.remove("open");
    }
  }
  document.querySelectorAll("[data-close-sheet]").forEach((_0x4f601b) => {
    _0x4f601b.addEventListener("click", () =>
      _0x3a0830(_0x4f601b.dataset.closeSheet),
    );
  });
  document.querySelectorAll(".sheet-overlay").forEach((_0x4020f0) => {
    _0x4020f0.addEventListener("click", (_0x4f4e7d) => {
      if (_0x4f4e7d.target === _0x4020f0) {
        _0x3a0830(_0x4020f0.id);
      }
    });
  });
  const _0xab8211 = document.getElementById("convOpenBubbleColors");
  const _0x17c67c = document.getElementById("convOpenFont");
  const _0x566fd8 = document.getElementById("convOpenInfo");
  if (_0xab8211) {
    _0xab8211.addEventListener("click", () => {
      _0x1a8aa6();
      _0x1fdf01("sheet-bubble-colors");
    });
  }
  if (_0x17c67c) {
    _0x17c67c.addEventListener("click", () => {
      _0x1a8aa6();
      _0x1fdf01("sheet-font");
    });
  }
  if (_0x566fd8) {
    _0x566fd8.addEventListener("click", () => {
      _0x1a8aa6();
      _0x1fdf01("sheet-account-info");
    });
  }
  const _0x3c93fa = document.getElementById("convIdentity");
  if (_0x3c93fa) {
    _0x3c93fa.addEventListener("click", () => _0x1fdf01("sheet-account-info"));
  }
  const _0x295d27 = document.getElementById("photoViewerOverlay");
  const _0x445999 = document.getElementById("photoViewerImg");
  const _0x5c34b7 = document.getElementById("photoViewerClose");
  function _0x76c0d1(_0x1845d8) {
    if (!_0x295d27 || !_0x445999 || !_0x1845d8) {
      return;
    }
    _0x445999.src = _0x1845d8;
    _0x295d27.classList.add("open");
  }
  function _0x3ea82d() {
    if (!_0x295d27) {
      return;
    }
    _0x295d27.classList.remove("open");
  }
  if (_0x5c34b7) {
    _0x5c34b7.addEventListener("click", _0x3ea82d);
  }
  if (_0x295d27) {
    _0x295d27.addEventListener("click", (_0x1451d7) => {
      if (_0x1451d7.target === _0x295d27) {
        _0x3ea82d();
      }
    });
  }
  function _0x5b1554(_0x5e2ee0, _0x1816e7) {
    if (!_0x5e2ee0) {
      return;
    }
    const _0x1f6bfe = 450;
    let _0x30c502 = null;
    let _0x4e4532 = 0;
    let _0xeb8022 = 0;
    function _0x41680e() {
      if (_0x30c502) {
        clearTimeout(_0x30c502);
      }
      _0x30c502 = null;
    }
    function _0x2773ef(_0x15e349, _0x33ee87) {
      _0x4e4532 = _0x15e349;
      _0xeb8022 = _0x33ee87;
      _0x41680e();
      _0x30c502 = setTimeout(() => {
        const _0x441125 = _0x1816e7();
        if (_0x441125) {
          if (navigator.vibrate) {
            try {
              navigator.vibrate(15);
            } catch (_0x3d284f) {}
          }
          _0x76c0d1(_0x441125);
        }
      }, _0x1f6bfe);
    }
    _0x5e2ee0.addEventListener(
      "touchstart",
      (_0x1fa749) => {
        const _0x1246dd = _0x1fa749.touches[0];
        _0x2773ef(_0x1246dd.clientX, _0x1246dd.clientY);
      },
      {
        passive: true,
      },
    );
    _0x5e2ee0.addEventListener(
      "touchmove",
      (_0x2ddda9) => {
        const _0x142b8e = _0x2ddda9.touches[0];
        if (
          Math.abs(_0x142b8e.clientX - _0x4e4532) > 10 ||
          Math.abs(_0x142b8e.clientY - _0xeb8022) > 10
        ) {
          _0x41680e();
        }
      },
      {
        passive: true,
      },
    );
    _0x5e2ee0.addEventListener("touchend", _0x41680e);
    _0x5e2ee0.addEventListener("mousedown", (_0xa67d88) =>
      _0x2773ef(_0xa67d88.clientX, _0xa67d88.clientY),
    );
    _0x5e2ee0.addEventListener("mouseup", _0x41680e);
    _0x5e2ee0.addEventListener("mouseleave", _0x41680e);
    _0x5e2ee0.addEventListener("contextmenu", (_0x5867d7) =>
      _0x5867d7.preventDefault(),
    );
  }
  _0x5b1554(_0xce91ed, () => _0xba59c4.photoURL);
  _0x5b1554(
    document.getElementById("accountInfoAvatar"),
    () => _0xba59c4.photoURL,
  );
  const _0x2152de = document.getElementById("accountInfoAvatar");
  const _0x576ae9 = document.getElementById("groupInfoAvatarInitial");
  const _0x479d4e = document.getElementById("accountInfoName");
  const _0x17a437 = document.getElementById("groupInfoMemberCount");
  const _0x50195a = document.getElementById("groupMembersScroll");
  function _0xb95387() {
    if (_0x479d4e) {
      _0x479d4e.textContent = _0xba59c4.name || _0x338d14.unknown_group;
    }
    if (_0x17a437) {
      const _0x52aab9 = (_0xba59c4.members || []).length;
      _0x17a437.textContent = _0x52aab9 + " " + _0x338d14.group_members_count;
    }
    if (_0x2152de) {
      let _0x4e8cfa = _0x2152de.querySelector(".account-info-avatar-img");
      if (_0xba59c4.photoURL) {
        if (!_0x4e8cfa) {
          _0x4e8cfa = document.createElement("img");
          _0x4e8cfa.className = "account-info-avatar-img";
          _0x4e8cfa.alt = "";
          _0x2152de.appendChild(_0x4e8cfa);
        }
        _0x4e8cfa.src = _0xba59c4.photoURL;
        if (_0x576ae9) {
          _0x576ae9.style.display = "none";
        }
      } else {
        if (_0x4e8cfa) {
          _0x4e8cfa.remove();
        }
        if (_0x576ae9) {
          _0x576ae9.style.display = "";
          _0x576ae9.textContent = _0x442862(_0xba59c4.name);
        }
      }
    }
    _0x2e68df();
  }
  function _0x2e68df() {
    if (!_0x50195a) {
      return;
    }
    _0x50195a.innerHTML = "";
    const _0x36d732 = _0xba59c4.members || [];
    _0x36d732.forEach((_0x529d29) => {
      const _0x5a24fc = _0x5bf423.get(_0x529d29) || {
        email: "",
        name: _0x338d14.unknown_group,
        photoURL: "",
      };
      const _0x2a6512 = document.createElement("div");
      _0x2a6512.className = "group-member-row";
      const _0x441b94 = _0x442862(_0x5a24fc.name);
      const _0x4cfe73 = _0x5a24fc.photoURL
        ? '<img src="' + _0x5a24fc.photoURL + '" alt="">'
        : _0x441b94;
      const _0x509e07 = _0x529d29 === _0xba59c4.ownerUid;
      _0x2a6512.innerHTML =
        '\n                <div class="group-member-avatar">' +
        _0x4cfe73 +
        '</div>\n                <div class="group-member-text">\n                    <div class="group-member-name">' +
        (_0x5a24fc.name || "").replace(/</g, "&lt;") +
        '</div>\n                    <div class="group-member-email">' +
        (_0x5a24fc.email || "").replace(/</g, "&lt;") +
        "</div>\n                </div>\n                " +
        (_0x509e07
          ? '<span class="group-member-owner-badge">' +
            _0x338d14.group_owner_badge +
            "</span>"
          : "") +
        "\n            ";
      _0x50195a.appendChild(_0x2a6512);
    });
  }
  const _0x101821 = document.querySelector(".conv-shell");
  const _0xd991de = "cz_bubble_tick_group_" + _0x30d4c6;
  function _0x55f132() {
    return document.body.classList.contains("theme-white");
  }
  function _0x245692() {
    if (_0x55f132()) {
      return "#DCF8C6";
    } else {
      return "#005C4B";
    }
  }
  function _0x42009e() {
    if (_0x55f132()) {
      return "#E9EAEB";
    } else {
      return "#202C33";
    }
  }
  const _0x5086db = "#4FA3FF";
  let _0x259348 = null;
  let _0x84a7bc = "1";
  function _0x518729(_0x2126a5) {
    if (_0x2126a5 === "1") {
      return "#10161A";
    } else {
      return "#FFFFFF";
    }
  }
  function _0xa1cc09(_0x34c19b) {
    if (_0x34c19b === "1") {
      return "rgba(16, 22, 26, 0.55)";
    } else {
      return "rgba(255, 255, 255, 0.7)";
    }
  }
  function _0x1fc005(_0x4643ec) {
    if (_0x4643ec === "1") {
      return "rgba(16, 22, 26, 0.45)";
    } else {
      return "rgba(255, 255, 255, 0.6)";
    }
  }
  function _0x469b7f(_0x20a070) {
    const _0x321168 = _0x20a070.replace("#", "");
    const _0x1b7e28 = parseInt(_0x321168.substring(0, 2), 16);
    const _0x1e52a2 = parseInt(_0x321168.substring(2, 4), 16);
    const _0x41e342 = parseInt(_0x321168.substring(4, 6), 16);
    const _0xc33e3e =
      (_0x1b7e28 * 299 + _0x1e52a2 * 587 + _0x41e342 * 114) / 1000;
    if (_0xc33e3e > 150) {
      return "1";
    } else {
      return "0";
    }
  }
  function _0xdf0743() {
    const _0x22152c = localStorage.getItem(_0xd991de);
    const _0x208af7 = _0x84a7bc || "1";
    if (!_0x101821) {
      return;
    }
    if (_0x259348) {
      _0x101821.style.setProperty("--bubble-mine-bg", _0x259348);
      _0x101821.style.setProperty("--bubble-mine-text", _0x518729(_0x208af7));
      _0x101821.style.setProperty("--bubble-mine-time", _0xa1cc09(_0x208af7));
      _0x101821.style.setProperty("--bubble-mine-tick", _0x1fc005(_0x208af7));
    } else {
      _0x101821.style.removeProperty("--bubble-mine-bg");
      _0x101821.style.removeProperty("--bubble-mine-text");
      _0x101821.style.removeProperty("--bubble-mine-time");
      _0x101821.style.removeProperty("--bubble-mine-tick");
    }
    _0x101821.style.removeProperty("--bubble-theirs-bg");
    _0x101821.style.removeProperty("--bubble-theirs-text");
    _0x101821.style.removeProperty("--bubble-theirs-time");
    if (_0x22152c) {
      _0x101821.style.setProperty("--bubble-tick-read", _0x22152c);
    } else {
      _0x101821.style.removeProperty("--bubble-tick-read");
    }
  }
  const _0x366a7b = document.getElementById("bubblePreviewMine");
  const _0x27ee78 = document.getElementById("bubblePreviewTheirs");
  const _0x2189d7 = document.getElementById("bubblePreviewTick");
  const _0x52b282 = document.getElementById("bubbleOptionMineSwatch");
  const _0x1fd289 = document.getElementById("bubbleOptionTickSwatch");
  function _0x366b9a() {
    const _0x5bc02e = _0x259348 || _0x245692();
    const _0x4725a6 = _0x42009e();
    const _0x1e6b06 = localStorage.getItem(_0xd991de) || _0x5086db;
    const _0x35780d = _0x84a7bc || "1";
    if (_0x366a7b) {
      _0x366a7b.style.background = _0x5bc02e;
      _0x366a7b.style.color = _0x518729(_0x35780d);
    }
    if (_0x27ee78) {
      _0x27ee78.style.background = _0x4725a6;
      _0x27ee78.style.color = _0x518729("1");
    }
    if (_0x2189d7) {
      _0x2189d7.style.backgroundColor = _0x1e6b06;
    }
    if (_0x52b282) {
      _0x52b282.style.background = _0x5bc02e;
    }
    if (_0x1fd289) {
      _0x1fd289.style.background = _0x1e6b06;
    }
  }
  const _0x27ff72 = {
    mine: "bubbles_mine_title",
    tick: "bubbles_tick_title",
  };
  function _0x35e6df(_0x520dcb) {
    if (_0x520dcb === "mine") {
      return _0x245692();
    } else {
      return _0x5086db;
    }
  }
  function _0x4f1ab4(_0x18fdef) {
    if (_0x18fdef === "mine") {
      return _0x259348;
    } else {
      return localStorage.getItem(_0xd991de);
    }
  }
  let _0x4c0c6f = null;
  let _0x11da61 = null;
  let _0x3e62a9 = "1";
  const _0x1c1338 = document.getElementById("chooseColorTitle");
  const _0x18c01a = document.getElementById("openColorEditorBtn");
  const _0x392295 = document.getElementById("openColorPresetsBtn");
  const _0x4b0fe0 = document.getElementById("bubbleColorNativePicker");
  const _0x395298 = document.getElementById("colorEditorPreviewSwatch");
  const _0x4d9c5a = document.getElementById("editorSaveBtn");
  const _0x1613e5 = document.getElementById("editorCancelBtn");
  const _0x389098 = document.getElementById("presetSquareGrid");
  const _0x44d532 = document.getElementById("presetsSaveBtn");
  const _0x33824c = document.getElementById("presetsCancelBtn");
  const _0x14bc69 = document.getElementById("unsavedSaveBtn");
  const _0x25b606 = document.getElementById("unsavedDiscardBtn");
  let _0x538ff6 = null;
  function _0x22ae10(_0x4f67f2) {
    _0x4c0c6f = _0x4f67f2;
    if (_0x1c1338) {
      _0x1c1338.textContent = _0x338d14[_0x27ff72[_0x4f67f2]] || "";
    }
    _0x1fdf01("sheet-choose-color");
  }
  if (document.getElementById("bubbleOptionMine")) {
    document
      .getElementById("bubbleOptionMine")
      .addEventListener("click", () => _0x22ae10("mine"));
  }
  if (document.getElementById("bubbleOptionTick")) {
    document
      .getElementById("bubbleOptionTick")
      .addEventListener("click", () => _0x22ae10("tick"));
  }
  if (_0x18c01a && _0x4b0fe0) {
    _0x18c01a.addEventListener("click", () => {
      const _0x356fd5 = _0x4f1ab4(_0x4c0c6f) || _0x35e6df(_0x4c0c6f);
      _0x4b0fe0.value = _0x356fd5;
      _0x4b0fe0.click();
    });
    _0x4b0fe0.addEventListener("input", (_0x1deca5) => {
      _0x11da61 = _0x1deca5.target.value;
      _0x3e62a9 = _0x469b7f(_0x11da61);
      if (_0x395298) {
        _0x395298.style.background = _0x11da61;
      }
      _0x3a0830("sheet-choose-color");
      _0x1fdf01("sheet-color-editor-confirm");
    });
  }
  async function _0x4c886d(_0x273303, _0xd4e83a, _0x362155) {
    const _0x196a58 = doc(db, "users", _0x3712b6);
    await updateDoc(_0x196a58, {
      bubbleColor: _0x362155 ? deleteField() : _0x273303,
      bubbleColorDark: _0x362155 ? deleteField() : _0xd4e83a,
      bubbleColorUpdatedAt: serverTimestamp(),
      bubbleColorViaChatId: _0x30d4c6,
    });
  }
  async function _0x5e3f23(_0x1127dc, _0x2dac83, _0xf562b8) {
    if (_0x1127dc === "tick") {
      if (_0x2dac83 === _0x35e6df("tick")) {
        localStorage.removeItem(_0xd991de);
      } else {
        localStorage.setItem(_0xd991de, _0x2dac83);
      }
      _0xdf0743();
      _0x366b9a();
      if (navigator.vibrate) {
        try {
          navigator.vibrate([6, 30, 6]);
        } catch (_0x3b0089) {}
      }
      return;
    }
    const _0x5c4049 = _0x259348;
    const _0x479672 = _0x84a7bc;
    const _0x2dbdac = _0x2dac83 === _0x35e6df("mine");
    _0x259348 = _0x2dbdac ? null : _0x2dac83;
    _0x84a7bc = _0xf562b8;
    _0xdf0743();
    _0x366b9a();
    if (navigator.vibrate) {
      try {
        navigator.vibrate([6, 30, 6]);
      } catch (_0x183714) {}
    }
    try {
      await _0x4c886d(_0x2dac83, _0xf562b8, _0x2dbdac);
    } catch (_0x2362d4) {
      console.error("فشل حفظ لون الفقاعة:", _0x2362d4);
      _0x259348 = _0x5c4049;
      _0x84a7bc = _0x479672;
      _0xdf0743();
      _0x366b9a();
    }
  }
  if (_0x4d9c5a) {
    _0x4d9c5a.addEventListener("click", () => {
      if (_0x4c0c6f && _0x11da61) {
        _0x5e3f23(_0x4c0c6f, _0x11da61, _0x3e62a9);
      }
      _0x11da61 = null;
      _0x3a0830("sheet-color-editor-confirm");
    });
  }
  if (_0x1613e5) {
    _0x1613e5.addEventListener("click", () => {
      _0x11da61 = null;
      _0x3a0830("sheet-color-editor-confirm");
    });
  }
  function _0x42bead(_0x4dde21) {
    if (!_0x389098) {
      return;
    }
    _0x389098.querySelectorAll(".preset-square-option").forEach((_0x1086a2) => {
      _0x1086a2.classList.toggle(
        "selected",
        _0x1086a2.dataset.color === _0x4dde21,
      );
    });
  }
  if (_0x392295) {
    _0x392295.addEventListener("click", () => {
      const _0x325353 = _0x4f1ab4(_0x4c0c6f) || _0x35e6df(_0x4c0c6f);
      _0x538ff6 = null;
      _0x42bead(_0x325353);
      _0x3a0830("sheet-choose-color");
      _0x1fdf01("sheet-color-presets");
    });
  }
  if (_0x389098) {
    _0x389098.querySelectorAll(".preset-square-option").forEach((_0x4816b7) => {
      _0x4816b7.addEventListener("click", () => {
        _0x538ff6 = {
          color: _0x4816b7.dataset.color,
          isDark: _0x4816b7.dataset.textDark,
        };
        _0x42bead(_0x4816b7.dataset.color);
      });
    });
  }
  if (_0x44d532) {
    _0x44d532.addEventListener("click", () => {
      if (_0x4c0c6f && _0x538ff6) {
        _0x5e3f23(_0x4c0c6f, _0x538ff6.color, _0x538ff6.isDark);
      }
      _0x538ff6 = null;
      _0x3a0830("sheet-color-presets");
    });
  }
  if (_0x33824c) {
    _0x33824c.addEventListener("click", () => {
      _0x538ff6 = null;
      _0x3a0830("sheet-color-presets");
    });
  }
  if (_0x25b606) {
    _0x25b606.addEventListener("click", () => _0x3a0830("sheet-unsaved-guard"));
  }
  if (_0x14bc69) {
    _0x14bc69.addEventListener("click", () => {
      if (_0x4c0c6f && _0x11da61) {
        _0x5e3f23(_0x4c0c6f, _0x11da61, _0x3e62a9);
      }
      _0x11da61 = null;
      _0x3a0830("sheet-unsaved-guard");
    });
  }
  const _0x6c8a92 = document.getElementById("bubbleResetBtn");
  if (_0x6c8a92) {
    _0x6c8a92.addEventListener("click", () => {
      _0x5e3f23("mine", _0x245692(), "1");
      localStorage.removeItem(_0xd991de);
      _0xdf0743();
      _0x366b9a();
    });
  }
  const _0x100298 = "cz_chat_font";
  function _0x25ea5d(_0x47d168) {
    if (!_0x101821) {
      return;
    }
    _0x101821.className = _0x101821.className.replace(/font-\S+/g, "").trim();
    if (_0x47d168 && _0x47d168 !== "default") {
      _0x101821.classList.add("font-" + _0x47d168);
    }
  }
  function _0x14cea1(_0x3da2ea) {
    document.querySelectorAll(".font-option").forEach((_0x3e0595) => {
      _0x3e0595.classList.toggle(
        "selected",
        _0x3e0595.dataset.font === _0x3da2ea,
      );
    });
  }
  const _0x50711e = localStorage.getItem(_0x100298) || "default";
  _0x25ea5d(_0x50711e);
  _0x14cea1(_0x50711e);
  document.querySelectorAll(".font-option").forEach((_0x224969) => {
    _0x224969.addEventListener("click", () => {
      const _0x5454d2 = _0x224969.dataset.font;
      localStorage.setItem(_0x100298, _0x5454d2);
      _0x25ea5d(_0x5454d2);
      _0x14cea1(_0x5454d2);
      if (navigator.vibrate) {
        try {
          navigator.vibrate(8);
        } catch (_0x3b07a6) {}
      }
    });
  });
  let _0x4fe457 = new Map();
  const _0x3fef68 = {
    unsent: "tick-unsent",
    offline: "tick-offline",
    unread: "tick-unread",
    read: "tick-read",
  };
  function _0x72c2c7(_0x2fb1ce) {
    let _0x548a69 = _0x2fb1ce.getHours();
    const _0x37796f = _0x2fb1ce.getMinutes();
    const _0x2faf3f = _0x548a69 >= 12 ? "م" : "ص";
    const _0x40ed01 = _0x548a69 >= 12 ? "PM" : "AM";
    _0x548a69 = _0x548a69 % 12;
    if (_0x548a69 === 0) {
      _0x548a69 = 12;
    }
    const _0x4896c7 = _0x37796f < 10 ? "0" + _0x37796f : _0x37796f;
    if (_0xcdfef) {
      return _0x548a69 + ":" + _0x4896c7 + " " + _0x2faf3f;
    } else {
      return _0x548a69 + ":" + _0x4896c7 + " " + _0x40ed01;
    }
  }
  function _0x2a7864(_0x10b7e8) {
    if (_0x10b7e8.deleted) {
      return _0x338d14.deleted_msg_text;
    }
    if ((_0x10b7e8.text || "").length > 80) {
      return _0x10b7e8.text.slice(0, 80) + "…";
    } else {
      return _0x10b7e8.text || "";
    }
  }
  function _0x533763(_0xd3786d, _0x3a2b4e) {
    const _0x159876 = document.createElement("div");
    _0x159876.className = "msg-row-system";
    _0x159876.dataset.msgId = _0xd3786d;
    const _0x177616 = document.createElement("span");
    _0x177616.className = "msg-row-system-badge";
    _0x177616.textContent = _0x3a2b4e.text || "";
    _0x159876.appendChild(_0x177616);
    _0x5c2528.appendChild(_0x159876);
  }
  function _0x473826(_0x25b08c, _0x316152, _0x4a96da) {
    const _0x39ca9e = (_0x316152.senderEmail || "").toLowerCase() === _0x4a96da;
    const _0x4ac1c3 = document.createElement("div");
    _0x4ac1c3.className = "msg-row " + (_0x39ca9e ? "from-me" : "from-them");
    _0x4ac1c3.dataset.msgId = _0x25b08c;
    const _0x543ab9 = document.createElement("div");
    _0x543ab9.className = "msg-row-inner";
    const _0x8133f4 = document.createElement("div");
    _0x8133f4.className = "msg-row-select-dot";
    _0x8133f4.innerHTML =
      '<svg viewBox="0 0 24 24" fill="none" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
    _0x543ab9.appendChild(_0x8133f4);
    const _0x2044a7 = document.createElement("div");
    _0x2044a7.className = "msg-row-reply-icon";
    _0x2044a7.innerHTML =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 17 4 12 9 7"></polyline><path d="M20 18v-2a4 4 0 0 0-4-4H4"></path></svg>';
    _0x4ac1c3.appendChild(_0x2044a7);
    const _0x5c4184 = document.createElement("div");
    _0x5c4184.className =
      "bubble " + (_0x39ca9e ? "bubble-right" : "bubble-left");
    if (!_0x39ca9e) {
      const _0x2078b9 = _0x5bf423.get(_0x316152.senderUid) || {};
      if (_0x2078b9.bubbleColor) {
        const _0x1c7ede = _0x2078b9.bubbleColorDark || "1";
        _0x5c4184.style.background = _0x2078b9.bubbleColor;
        _0x5c4184.style.color = _0x518729(_0x1c7ede);
      }
    }
    if (!_0x39ca9e) {
      const _0x49a4b8 = _0x5bf423.get(_0x316152.senderUid);
      const _0x1bb00f = _0x49a4b8
        ? _0x49a4b8.name
        : _0x267a6a(_0x316152.senderEmail);
      const _0x4faabb = document.createElement("div");
      _0x4faabb.className = "bubble-sender-name";
      _0x4faabb.textContent = _0x1bb00f;
      _0x5c4184.appendChild(_0x4faabb);
    }
    if (_0x316152.replyTo && _0x316152.replyTo.text) {
      const _0x268ce5 = document.createElement("div");
      _0x268ce5.className = "bubble-reply-quote";
      const _0x34e3fa = document.createElement("span");
      _0x34e3fa.className = "bubble-reply-quote-name";
      _0x34e3fa.textContent = _0x316152.replyTo.senderName || "";
      const _0x194e31 = document.createElement("span");
      _0x194e31.className = "bubble-reply-quote-text";
      _0x194e31.textContent = _0x316152.replyTo.deleted
        ? _0x338d14.deleted_msg_text
        : _0x316152.replyTo.text;
      if (_0x316152.replyTo.senderName) {
        _0x268ce5.appendChild(_0x34e3fa);
      }
      _0x268ce5.appendChild(_0x194e31);
      _0x5c4184.appendChild(_0x268ce5);
    }
    const _0x160779 = document.createElement("p");
    _0x160779.className = "bubble-text" + (_0x316152.deleted ? " deleted" : "");
    _0x160779.textContent = _0x316152.deleted
      ? _0x338d14.deleted_msg_text
      : _0x316152.text;
    _0x5c4184.appendChild(_0x160779);
    const _0x1b39d6 = document.createElement("div");
    _0x1b39d6.className = "bubble-meta";
    const _0x4bb59d = document.createElement("span");
    _0x4bb59d.className = "bubble-time";
    const _0x163211 =
      _0x316152.createdAt && _0x316152.createdAt.toDate
        ? _0x316152.createdAt.toDate()
        : new Date();
    _0x4bb59d.textContent = _0x72c2c7(_0x163211);
    _0x1b39d6.appendChild(_0x4bb59d);
    if (_0x39ca9e) {
      const _0x54ba3c = document.createElement("span");
      const _0xd96d62 = _0x316152.status || "unread";
      _0x54ba3c.className =
        "bubble-tick " + (_0x3fef68[_0xd96d62] || _0x3fef68.unread);
      _0x1b39d6.appendChild(_0x54ba3c);
    }
    _0x5c4184.appendChild(_0x1b39d6);
    _0x543ab9.appendChild(_0x5c4184);
    _0x4ac1c3.appendChild(_0x543ab9);
    _0x5c2528.appendChild(_0x4ac1c3);
    if (!_0x316152.deleted) {
      _0x2dc0fa(_0x4ac1c3, _0x25b08c, _0x316152, _0x39ca9e);
    }
  }
  function _0x267a6a(_0x31e747) {
    if (!_0x31e747) {
      return _0x338d14.unknown_group;
    }
    const _0x4b3ee8 = _0x31e747.split("@")[0];
    return _0x4b3ee8.charAt(0).toUpperCase() + _0x4b3ee8.slice(1);
  }
  function _0x315e96(_0x344293) {
    _0x5c2528.scrollTo({
      top: _0x5c2528.scrollHeight,
      behavior: _0x344293 ? "smooth" : "auto",
    });
  }
  function _0x3e5458() {
    _0x5c2528.innerHTML = "";
    const _0x5c7ad7 = document.createElement("div");
    _0x5c7ad7.className = "conv-empty";
    _0x5c7ad7.textContent = _0xcdfef
      ? "مفيش رسائل لسه، ابدأ المحادثة 👋"
      : "No messages yet, say hi 👋";
    _0x5c2528.appendChild(_0x5c7ad7);
  }
  let _0x558ea1 = false;
  const _0x552d68 = new Map();
  const _0x1732c1 = document.getElementById("convTopbarSelect");
  const _0x365ce6 = document.getElementById("convSelectCancelBtn");
  const _0x3a86e8 = document.getElementById("convSelectCount");
  const _0x409a54 = document.getElementById("convSelectDeleteBtn");
  function _0x37e3fe() {
    const _0x61161b = _0x552d68.size;
    if (_0x3a86e8) {
      _0x3a86e8.textContent = String(_0x61161b);
    }
    if (_0x409a54) {
      _0x409a54.disabled = _0x61161b === 0;
    }
  }
  function _0x483301(_0x206bf3, _0xb9949a) {
    _0x558ea1 = true;
    _0x552d68.clear();
    document.body.classList.add("select-mode-on");
    if (_0x206bf3) {
      _0x552d68.set(_0x206bf3, {
        isMine: _0xb9949a,
      });
      const _0x3989bf = _0x5c2528.querySelector(
        '.msg-row[data-msg-id="' + _0x206bf3 + '"]',
      );
      if (_0x3989bf) {
        _0x3989bf.classList.add("multi-selected");
      }
    }
    _0x37e3fe();
  }
  function _0x13532e() {
    _0x558ea1 = false;
    _0x552d68.clear();
    document.body.classList.remove("select-mode-on");
    _0x5c2528
      .querySelectorAll(".msg-row.multi-selected")
      .forEach((_0x9d936c) => _0x9d936c.classList.remove("multi-selected"));
  }
  function _0x3c0cd1(_0x471ab2, _0x4b0a19, _0x1397ef) {
    if (_0x552d68.has(_0x4b0a19)) {
      _0x552d68.delete(_0x4b0a19);
      _0x471ab2.classList.remove("multi-selected");
    } else {
      _0x552d68.set(_0x4b0a19, {
        isMine: _0x1397ef,
      });
      _0x471ab2.classList.add("multi-selected");
    }
    _0x37e3fe();
  }
  if (_0x365ce6) {
    _0x365ce6.addEventListener("click", _0x13532e);
  }
  async function _0x1cfbfc() {
    const _0x39d81e = [];
    const _0x307fea = [];
    _0x552d68.forEach((_0x4bd0a7, _0x30e099) => {
      if (_0x4bd0a7.isMine) {
        _0x39d81e.push(_0x30e099);
      } else {
        _0x307fea.push(_0x30e099);
      }
    });
    try {
      if (_0x39d81e.length) {
        for (
          let _0x387706 = 0;
          _0x387706 < _0x39d81e.length;
          _0x387706 += 500
        ) {
          const _0x452ab5 = writeBatch(db);
          _0x39d81e.slice(_0x387706, _0x387706 + 500).forEach((_0x16e13c) => {
            _0x452ab5.delete(
              doc(db, "groups", _0x30d4c6, "messages", _0x16e13c),
            );
          });
          await _0x452ab5.commit();
        }
      }
      if (_0x307fea.length && _0xab4df4) {
        for (const _0x5c8148 of _0x307fea) {
          await updateDoc(doc(db, "groups", _0x30d4c6, "messages", _0x5c8148), {
            deletedFor: arrayUnion(_0xab4df4),
          });
        }
      }
      _0x1981df(_0x338d14.msg_deleted_toast);
    } catch (_0x3024b4) {
      console.error("فشل حذف الرسايل المحددة:", _0x3024b4);
    } finally {
      _0x13532e();
    }
  }
  const _0x24fa65 = document.getElementById("deleteSelectedConfirmBtn");
  if (_0x409a54) {
    _0x409a54.addEventListener("click", () => {
      if (_0x552d68.size === 0) {
        return;
      }
      _0x1fdf01("sheet-delete-selected");
    });
  }
  if (_0x24fa65) {
    _0x24fa65.addEventListener("click", () => {
      _0x3a0830("sheet-delete-selected");
      _0x1cfbfc();
    });
  }
  const _0x16dd73 = 46;
  const _0x9f9f9 = 420;
  function _0x2dc0fa(_0x19df8f, _0x11090f, _0x540a54, _0x2eba58) {
    const _0x3b1b1e = _0x19df8f.querySelector(".msg-row-inner");
    _0x19df8f.addEventListener("click", (_0x1e493b) => {
      if (!_0x558ea1) {
        return;
      }
      _0x1e493b.preventDefault();
      _0x1e493b.stopPropagation();
      _0x3c0cd1(_0x19df8f, _0x11090f, _0x2eba58);
    });
    let _0x5edf04 = 0;
    let _0x74c29d = 0;
    let _0x18d56d = false;
    let _0x298405 = 0;
    _0x19df8f.addEventListener(
      "touchstart",
      (_0x311e1a) => {
        if (_0x558ea1) {
          return;
        }
        const _0x4acb71 = _0x311e1a.touches[0];
        _0x5edf04 = _0x4acb71.clientX;
        _0x74c29d = _0x4acb71.clientY;
        _0x18d56d = false;
        _0x298405 = 0;
      },
      {
        passive: true,
      },
    );
    _0x19df8f.addEventListener(
      "touchmove",
      (_0x4d8fa8) => {
        const _0x42e17d = _0x4d8fa8.touches[0];
        const _0x877a84 = _0x42e17d.clientX - _0x5edf04;
        const _0x5d41a2 = _0x42e17d.clientY - _0x74c29d;
        if (
          !_0x18d56d &&
          Math.abs(_0x877a84) > 12 &&
          Math.abs(_0x877a84) > Math.abs(_0x5d41a2)
        ) {
          _0x18d56d = true;
        }
        if (_0x18d56d) {
          const _0x3604af = Math.max(-70, Math.min(70, _0x877a84));
          _0x298405 = _0x3604af;
          _0x3b1b1e.style.transform = "translateX(" + _0x3604af + "px)";
          _0x19df8f.classList.toggle("swiping", Math.abs(_0x3604af) > 14);
          if (Math.abs(_0x3604af) > 10) {
            _0x4d8fa8.preventDefault();
          }
        }
      },
      {
        passive: false,
      },
    );
    _0x19df8f.addEventListener("touchend", () => {
      if (!_0x558ea1 && _0x18d56d && Math.abs(_0x298405) >= _0x16dd73) {
        if (navigator.vibrate) {
          try {
            navigator.vibrate(10);
          } catch (_0x494d6c) {}
        }
        _0x50eed2(_0x11090f, _0x540a54, _0x2eba58);
      }
      _0x3b1b1e.style.transform = "";
      _0x19df8f.classList.remove("swiping");
      _0x18d56d = false;
      _0x298405 = 0;
    });
    _0x19df8f.addEventListener("touchcancel", () => {
      _0x3b1b1e.style.transform = "";
      _0x19df8f.classList.remove("swiping");
      _0x18d56d = false;
      _0x298405 = 0;
    });
    let _0x10b9bc = null;
    function _0x262bc3() {
      if (_0x10b9bc) {
        clearTimeout(_0x10b9bc);
      }
      _0x10b9bc = null;
    }
    _0x19df8f.addEventListener(
      "touchstart",
      () => {
        if (_0x558ea1) {
          return;
        }
        _0x10b9bc = setTimeout(() => {
          if (navigator.vibrate) {
            try {
              navigator.vibrate(15);
            } catch (_0x4de995) {}
          }
          _0x3b554e(_0x19df8f, _0x11090f, _0x540a54, _0x2eba58);
        }, _0x9f9f9);
      },
      {
        passive: true,
      },
    );
    _0x19df8f.addEventListener("touchmove", _0x262bc3, {
      passive: true,
    });
    _0x19df8f.addEventListener("touchend", _0x262bc3);
    _0x19df8f.addEventListener("touchcancel", _0x262bc3);
    _0x19df8f.addEventListener("contextmenu", (_0x384991) => {
      if (_0x558ea1) {
        _0x384991.preventDefault();
        return;
      }
      _0x384991.preventDefault();
      _0x3b554e(_0x19df8f, _0x11090f, _0x540a54, _0x2eba58);
    });
    let _0x1221d0 = null;
    _0x19df8f.addEventListener("mousedown", () => {
      if (_0x558ea1) {
        return;
      }
      _0x1221d0 = setTimeout(
        () => _0x3b554e(_0x19df8f, _0x11090f, _0x540a54, _0x2eba58),
        _0x9f9f9,
      );
    });
    _0x19df8f.addEventListener("mouseup", () => {
      if (_0x1221d0) {
        clearTimeout(_0x1221d0);
      }
    });
    _0x19df8f.addEventListener("mouseleave", () => {
      if (_0x1221d0) {
        clearTimeout(_0x1221d0);
      }
    });
  }
  const _0x1cdb34 = document.getElementById("msgCtxOverlay");
  const _0x46b908 = document.getElementById("msgCtxMenu");
  const _0x497c66 = document.getElementById("msgCtxReply");
  const _0x3c1d12 = document.getElementById("msgCtxCopy");
  const _0x735145 = document.getElementById("msgCtxSelect");
  const _0x3304ad = document.getElementById("msgCtxDelete");
  let _0x297347 = null;
  let _0x28558f = null;
  let _0x5a589d = false;
  function _0x3b554e(_0x22a082, _0x132b4c, _0x3f23e4, _0xa325d2) {
    _0x297347 = _0x132b4c;
    _0x28558f = _0x3f23e4;
    _0x5a589d = _0xa325d2;
    document
      .querySelectorAll(".msg-row.selected")
      .forEach((_0x26269f) => _0x26269f.classList.remove("selected"));
    _0x22a082.classList.add("selected");
    if (!_0x46b908 || !_0x1cdb34) {
      return;
    }
    const _0x529064 = _0x22a082.querySelector(".bubble") || _0x22a082;
    const _0x1b12eb = _0x529064.getBoundingClientRect();
    const _0x720e95 = document.documentElement.dir === "rtl";
    _0x46b908.style.visibility = "hidden";
    _0x46b908.style.top = "0px";
    _0x46b908.style.left = "0px";
    _0x46b908.style.right = "auto";
    _0x46b908.classList.add("open");
    const _0xa5017d = _0x46b908.getBoundingClientRect();
    const _0x56022c = _0xa5017d.width || 230;
    const _0x562d54 = _0xa5017d.height || 180;
    _0x46b908.classList.remove("open");
    _0x46b908.style.visibility = "";
    const _0x198c23 = 10;
    let _0x3a4bd3 = _0x1b12eb.bottom + 6;
    if (_0x3a4bd3 + _0x562d54 > window.innerHeight - _0x198c23) {
      _0x3a4bd3 = _0x1b12eb.top - _0x562d54 - 6;
    }
    _0x3a4bd3 = Math.min(
      Math.max(_0x198c23, _0x3a4bd3),
      window.innerHeight - _0x562d54 - _0x198c23,
    );
    _0x46b908.style.top = _0x3a4bd3 + "px";
    const _0x58a7dd = _0x1b12eb.left + _0x1b12eb.width / 2;
    let _0x1331c9 = Math.min(
      Math.max(_0x198c23, _0x58a7dd - _0x56022c / 2),
      window.innerWidth - _0x56022c - _0x198c23,
    );
    if (_0x720e95) {
      _0x46b908.style.right = window.innerWidth - _0x1331c9 - _0x56022c + "px";
      _0x46b908.style.left = "auto";
    } else {
      _0x46b908.style.left = _0x1331c9 + "px";
      _0x46b908.style.right = "auto";
    }
    _0x46b908.classList.add("open");
    _0x1cdb34.classList.add("open");
  }
  function _0x109e6d() {
    if (_0x46b908) {
      _0x46b908.classList.remove("open");
    }
    if (_0x1cdb34) {
      _0x1cdb34.classList.remove("open");
    }
    document
      .querySelectorAll(".msg-row.selected")
      .forEach((_0x4c1668) => _0x4c1668.classList.remove("selected"));
  }
  if (_0x1cdb34) {
    _0x1cdb34.addEventListener("click", _0x109e6d);
  }
  if (_0x497c66) {
    _0x497c66.addEventListener("click", () => {
      const _0x3c50dd = _0x297347;
      const _0x281f6f = _0x28558f;
      const _0x28a73a = _0x5a589d;
      _0x109e6d();
      if (_0x3c50dd && _0x281f6f) {
        _0x50eed2(_0x3c50dd, _0x281f6f, _0x28a73a);
      }
    });
  }
  if (_0x3c1d12) {
    _0x3c1d12.addEventListener("click", () => {
      const _0x356714 = _0x28558f;
      _0x109e6d();
      if (!_0x356714 || _0x356714.deleted) {
        return;
      }
      _0x3c1ef2(_0x356714.text || "");
    });
  }
  if (_0x735145) {
    _0x735145.addEventListener("click", () => {
      const _0x2d8bb1 = _0x297347;
      const _0x3c2528 = _0x5a589d;
      _0x109e6d();
      _0x483301(_0x2d8bb1, _0x3c2528);
    });
  }
  if (_0x3304ad) {
    _0x3304ad.addEventListener("click", () => {
      _0x109e6d();
      _0x2d4ced(_0x297347, _0x28558f, _0x5a589d);
    });
  }
  function _0x3c1ef2(_0x292069) {
    if (!_0x292069) {
      return;
    }
    const _0x40f97a = () => _0x1981df(_0x338d14.copied_toast);
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(_0x292069)
        .then(_0x40f97a)
        .catch(() => _0x4e2cd4(_0x292069, _0x40f97a));
    } else {
      _0x4e2cd4(_0x292069, _0x40f97a);
    }
  }
  function _0x4e2cd4(_0x292159, _0x298594) {
    try {
      const _0x5841f0 = document.createElement("textarea");
      _0x5841f0.value = _0x292159;
      _0x5841f0.style.position = "fixed";
      _0x5841f0.style.opacity = "0";
      _0x5841f0.style.pointerEvents = "none";
      document.body.appendChild(_0x5841f0);
      _0x5841f0.focus();
      _0x5841f0.select();
      document.execCommand("copy");
      document.body.removeChild(_0x5841f0);
      _0x298594();
    } catch (_0x163f7b) {
      console.error("فشل نسخ الرسالة:", _0x163f7b);
    }
  }
  const _0x3ccde1 = document.getElementById("convReplyBar");
  const _0x12e7b3 = document.getElementById("convReplyBarName");
  const _0x2ec380 = document.getElementById("convReplyBarPreview");
  const _0x312322 = document.getElementById("convReplyBarClose");
  let _0x2b0318 = null;
  function _0x50eed2(_0x4dd435, _0x2d66fc, _0x20ec7e) {
    if (_0x2d66fc.deleted) {
      return;
    }
    const _0x5f5885 = !_0x20ec7e ? _0x5bf423.get(_0x2d66fc.senderUid) : null;
    _0x2b0318 = {
      id: _0x4dd435,
      text: _0x2d66fc.text || "",
      senderName: _0x20ec7e
        ? _0x338d14.reply_you
        : _0x5f5885
          ? _0x5f5885.name
          : _0x267a6a(_0x2d66fc.senderEmail),
      isMine: _0x20ec7e,
    };
    if (_0x12e7b3) {
      _0x12e7b3.textContent = _0x2b0318.senderName;
    }
    if (_0x2ec380) {
      _0x2ec380.textContent = _0x2a7864(_0x2d66fc);
    }
    if (_0x3ccde1) {
      _0x3ccde1.classList.add("open");
    }
    _0xce0fee.focus();
  }
  function _0x211039() {
    _0x2b0318 = null;
    if (_0x3ccde1) {
      _0x3ccde1.classList.remove("open");
    }
  }
  if (_0x312322) {
    _0x312322.addEventListener("click", _0x211039);
  }
  const _0x276549 = document.getElementById("deleteMsgSheetBody");
  const _0x40a88c = document.getElementById("deleteMsgForEveryoneBtn");
  const _0x10a3df = document.getElementById("deleteMsgForMeBtn");
  let _0x38ecfb = null;
  function _0x2d4ced(_0x21aa34, _0x1f84f3, _0x10f127) {
    _0x38ecfb = _0x21aa34;
    if (_0x40a88c) {
      _0x40a88c.style.display = _0x10f127 ? "" : "none";
    }
    _0x1fdf01("sheet-delete-msg");
  }
  async function _0x5a30e7() {
    const _0x5557fc = _0x38ecfb;
    _0x3a0830("sheet-delete-msg");
    _0x109e6d();
    if (!_0x5557fc || !_0xab4df4) {
      return;
    }
    try {
      await updateDoc(doc(db, "groups", _0x30d4c6, "messages", _0x5557fc), {
        deletedFor: arrayUnion(_0xab4df4),
      });
      _0x1981df(_0x338d14.msg_deleted_toast);
    } catch (_0x52e18c) {
      console.error("فشل حذف الرسالة من عندي:", _0x52e18c);
    }
  }
  async function _0x1025b5() {
    const _0x1b1ab3 = _0x38ecfb;
    _0x3a0830("sheet-delete-msg");
    _0x109e6d();
    if (!_0x1b1ab3) {
      return;
    }
    try {
      await updateDoc(doc(db, "groups", _0x30d4c6, "messages", _0x1b1ab3), {
        deleted: true,
        text: "",
      });
      _0x1981df(_0x338d14.msg_deleted_toast);
    } catch (_0x1069e9) {
      console.error("فشل حذف الرسالة من عند الجميع:", _0x1069e9);
    }
  }
  if (_0x10a3df) {
    _0x10a3df.addEventListener("click", _0x5a30e7);
  }
  if (_0x40a88c) {
    _0x40a88c.addEventListener("click", _0x1025b5);
  }
  const _0xce0fee = document.getElementById("convTextarea");
  const _0x288463 = document.getElementById("convInputBar");
  const _0x46b1e2 = document.getElementById("convSendBtn");
  function _0x476654() {
    _0xce0fee.style.height = "auto";
    _0xce0fee.style.height = Math.min(_0xce0fee.scrollHeight, 120) + "px";
  }
  function _0x3ef4b9() {
    const _0x38ddc2 = _0xce0fee.value.trim().length > 0;
    _0x288463.classList.toggle("has-text", _0x38ddc2);
  }
  const _0x342d39 = 2500;
  let _0x1d79ab = null;
  let _0x2c6d0a = false;
  function _0x341f0d(_0x4d0ffa) {
    if (!_0xab4df4) {
      return;
    }
    if (_0x4d0ffa === _0x2c6d0a) {
      return;
    }
    _0x2c6d0a = _0x4d0ffa;
    updateDoc(_0x35cf7f, {
      ["typing." + _0xab4df4]: _0x4d0ffa,
    }).catch(() => {
      if (_0x4d0ffa) {
        _0x2c6d0a = false;
      }
    });
  }
  function _0x5c7bf1() {
    _0x341f0d(true);
    if (_0x1d79ab) {
      clearTimeout(_0x1d79ab);
    }
    _0x1d79ab = setTimeout(() => _0x341f0d(false), _0x342d39);
  }
  _0xce0fee.addEventListener("input", () => {
    _0x476654();
    _0x3ef4b9();
    if (_0xce0fee.value.trim().length > 0) {
      _0x5c7bf1();
    } else {
      if (_0x1d79ab) {
        clearTimeout(_0x1d79ab);
      }
      _0x341f0d(false);
    }
  });
  _0xce0fee.addEventListener("keydown", (_0x57ab33) => {
    if (_0x57ab33.key === "Enter" && !_0x57ab33.shiftKey) {
      _0x57ab33.preventDefault();
      _0x58be4d();
    }
  });
  _0x3ef4b9();
  function _0x3d5977(_0x4368fa) {
    const _0x1cf03a = Object.keys(_0x4368fa || {}).filter(
      (_0x2a25f4) => _0x2a25f4 !== _0xab4df4 && _0x4368fa[_0x2a25f4],
    );
    if (!_0x1cf03a.length) {
      _0xb86b4d.textContent = "";
      _0xb86b4d.classList.remove("conv-status-typing");
      return;
    }
    _0xb86b4d.classList.add("conv-status-typing");
    if (_0x1cf03a.length === 1) {
      const _0x488942 = _0x5bf423.get(_0x1cf03a[0]);
      const _0x3e968e = _0x488942 ? _0x488942.name : _0x338d14.unknown_group;
      _0xb86b4d.textContent = _0x338d14.typing_status_one.replace(
        "{name}",
        _0x3e968e,
      );
    } else {
      _0xb86b4d.textContent = _0x338d14.typing_status_many;
    }
  }
  let _0xab4df4 = null;
  let _0x44d006 = null;
  async function _0x25092d(_0x3f8785, _0x5cbd24) {
    const _0x332ad8 = await Promise.all(
      _0x5cbd24.map(async (_0x3ee524) => {
        try {
          const _0x45422f = await getDoc(
            doc(db, "users", _0x3ee524.toLowerCase()),
          );
          if (_0x45422f.exists()) {
            const _0x3db051 = _0x45422f.data();
            return {
              uid: _0x3db051.uid,
              email: _0x3ee524.toLowerCase(),
              name: _0x3db051.name || _0x267a6a(_0x3ee524),
              photoURL:
                _0x3db051.hidePhotoFromOthers !== true && _0x3db051.photoURL
                  ? _0x3db051.photoURL
                  : "",
              bubbleColor: _0x3db051.bubbleColor || null,
              bubbleColorDark: _0x3db051.bubbleColorDark || "1",
            };
          }
        } catch (_0x3d9586) {
          console.error("فشل جلب بيانات عضو:", _0x3ee524, _0x3d9586);
        }
        return {
          uid: null,
          email: _0x3ee524.toLowerCase(),
          name: _0x267a6a(_0x3ee524),
          photoURL: "",
          bubbleColor: null,
          bubbleColorDark: "1",
        };
      }),
    );
    _0x5bf423 = new Map();
    _0x332ad8.forEach((_0x3cd3cc) => {
      if (_0x3cd3cc.uid) {
        _0x5bf423.set(_0x3cd3cc.uid, _0x3cd3cc);
      }
    });
    const _0x2663b6 = _0x5bf423.get(_0xab4df4);
    if (_0x2663b6) {
      _0x259348 = _0x2663b6.bubbleColor;
      _0x84a7bc = _0x2663b6.bubbleColorDark;
      _0xdf0743();
      _0x366b9a();
    }
  }
  async function _0x303f67(_0xa0f58a) {
    _0xa0f58a = _0xa0f58a || 10;
    for (let _0xa75228 = 0; _0xa75228 < _0xa0f58a; _0xa75228++) {
      try {
        const _0x1b0b18 = await getDoc(_0x35cf7f);
        if (_0x1b0b18.exists()) {
          const _0x5e9f0a = _0x1b0b18.data();
          if (_0x5e9f0a.members && _0x5e9f0a.members.includes(_0xab4df4)) {
            return true;
          }
        }
      } catch (_0x110921) {}
      await new Promise((_0x3dc32e) => setTimeout(_0x3dc32e, 300));
    }
    console.error("لم يتم التأكد من عضويتي في الجروب بعد عدة محاولات.");
    return false;
  }
  function _0x2bfdd0(_0x36ca91, _0x18b736) {
    _0x18b736 = _0x18b736 || 0;
    updateDoc(_0x36ca91, {
      status: "read",
    }).catch((_0x515785) => {
      if (_0x18b736 < 3) {
        setTimeout(() => _0x2bfdd0(_0x36ca91, _0x18b736 + 1), 400);
      } else {
        console.error(
          "فشل تحديث حالة الرسالة إلى read بعد عدة محاولات:",
          _0x515785,
        );
      }
    });
  }
  function _0x36ffe1(_0x130dad) {
    const _0x16dae9 =
      window.CZPrivacy && window.CZPrivacy.areReadReceiptsHidden
        ? window.CZPrivacy.areReadReceiptsHidden()
        : false;
    if (_0x16dae9) {
      return;
    }
    _0x130dad.forEach((_0x2de1c6) => {
      const _0x4c6b7e = _0x2de1c6.data();
      const _0x2c971c =
        (_0x4c6b7e.senderEmail || "").toLowerCase() !== _0x3712b6;
      const _0x41c077 = _0x4c6b7e.status === "unread";
      if (_0x2c971c && _0x41c077) {
        _0x2bfdd0(_0x2de1c6.ref);
      }
    });
  }
  async function _0x5873d2() {
    const _0x5a032b = await ensureAuthenticated();
    _0xab4df4 = _0x5a032b.uid;
    const _0x1dcc32 = await getDoc(_0x35cf7f);
    if (!_0x1dcc32.exists()) {
      _0x1981df(_0xcdfef ? "الجروب ده مش موجود" : "This group doesn't exist");
      setTimeout(() => {
        window.location.href = "MainActivity.html";
      }, 1200);
      return;
    }
    const _0xb55702 = _0x1dcc32.data();
    if (!_0xb55702.members || !_0xb55702.members.includes(_0xab4df4)) {
      _0x1981df(
        _0xcdfef
          ? "انت مش عضو في الجروب ده"
          : "You're not a member of this group",
      );
      setTimeout(() => {
        window.location.href = "MainActivity.html";
      }, 1200);
      return;
    }
    _0xba59c4 = {
      name: _0xb55702.name || "",
      photoURL: _0xb55702.photoURL || "",
      members: _0xb55702.members || [],
      memberEmails: _0xb55702.memberEmails || [],
      ownerUid: _0xb55702.ownerUid || "",
    };
    _0x2789a4();
    await _0x25092d(_0xba59c4.members, _0xba59c4.memberEmails);
    _0x2789a4();
    onSnapshot(
      _0x35cf7f,
      (_0x315ba5) => {
        if (!_0x315ba5.exists()) {
          return;
        }
        const _0x22c9b1 = _0x315ba5.data();
        _0xba59c4 = {
          name: _0x22c9b1.name || "",
          photoURL: _0x22c9b1.photoURL || "",
          members: _0x22c9b1.members || [],
          memberEmails: _0x22c9b1.memberEmails || [],
          ownerUid: _0x22c9b1.ownerUid || "",
        };
        _0x2789a4();
        _0x3d5977(_0x22c9b1.typing || {});
        const _0x412b37 = _0xba59c4.memberEmails.find(
          (_0x1a1078, _0xde2039) => {
            const _0x2e587c = _0xba59c4.members[_0xde2039];
            return _0x2e587c && !_0x5bf423.has(_0x2e587c);
          },
        );
        if (_0x412b37) {
          _0x25092d(_0xba59c4.members, _0xba59c4.memberEmails).then(_0x2789a4);
        }
      },
      (_0x15d536) => {
        console.error("فشل الاستماع لمستند الجروب:", _0x15d536);
      },
    );
    const _0x573c9b = collection(db, "groups", _0x30d4c6, "messages");
    const _0x52e16f = query(_0x573c9b, orderBy("createdAt", "asc"));
    _0x44d006 = onSnapshot(
      _0x52e16f,
      (_0x19a378) => {
        const _0x5d0203 = _0x19a378.docs;
        const _0x51dcdd = _0x5d0203.filter((_0x5dc899) => {
          const _0x42f8dc = _0x5dc899.data();
          const _0x4ec3a5 = _0x42f8dc.deletedFor || [];
          return !_0x4ec3a5.includes(_0xab4df4);
        });
        _0x4fe457 = new Map(
          _0x51dcdd.map((_0x4aef74) => [_0x4aef74.id, _0x4aef74.data()]),
        );
        if (!_0x51dcdd.length) {
          _0x3e5458();
          return;
        }
        _0x5c2528.innerHTML = "";
        _0x51dcdd.forEach((_0x420b6d) => {
          const _0x430329 = _0x420b6d.data();
          if (_0x430329.type === "system") {
            _0x533763(_0x420b6d.id, _0x430329);
            return;
          }
          if (_0x430329.replyTo && _0x430329.replyTo.id) {
            const _0x35f605 = _0x4fe457.get(_0x430329.replyTo.id);
            if (_0x35f605) {
              const _0x3a5aa8 =
                (_0x35f605.senderEmail || "").toLowerCase() === _0x3712b6;
              const _0x1f5e2a = !_0x3a5aa8
                ? _0x5bf423.get(_0x35f605.senderUid)
                : null;
              _0x430329.replyTo.senderName = _0x3a5aa8
                ? _0x338d14.reply_you
                : _0x1f5e2a
                  ? _0x1f5e2a.name
                  : _0x267a6a(_0x35f605.senderEmail);
              _0x430329.replyTo.deleted = !!_0x35f605.deleted;
            }
          }
          _0x473826(_0x420b6d.id, _0x430329, _0x3712b6);
        });
        _0x315e96(false);
        if (_0x558ea1) {
          const _0x2156d1 = new Set(_0x51dcdd.map((_0x3bf204) => _0x3bf204.id));
          [..._0x552d68.keys()].forEach((_0x3f15d8) => {
            if (!_0x2156d1.has(_0x3f15d8)) {
              _0x552d68.delete(_0x3f15d8);
              return;
            }
            const _0x512b76 = _0x5c2528.querySelector(
              '.msg-row[data-msg-id="' + _0x3f15d8 + '"]',
            );
            if (_0x512b76) {
              _0x512b76.classList.add("multi-selected");
            }
          });
          _0x37e3fe();
        }
        _0x36ffe1(_0x51dcdd);
      },
      (_0x40dd4e) => {
        console.error("فشل الاستماع لرسايل الجروب:", _0x40dd4e);
      },
    );
  }
  function _0x58be4d() {
    const _0x432c95 = _0xce0fee.value.trim();
    if (!_0x432c95 || !_0xab4df4) {
      return;
    }
    _0xce0fee.value = "";
    _0x476654();
    _0x3ef4b9();
    if (_0x1d79ab) {
      clearTimeout(_0x1d79ab);
    }
    _0x341f0d(false);
    const _0x9e7214 = {
      senderUid: _0xab4df4,
      senderEmail: _0x38d3e1,
      text: _0x432c95,
      createdAt: serverTimestamp(),
      status: "unread",
    };
    if (_0x2b0318) {
      _0x9e7214.replyTo = {
        id: _0x2b0318.id,
        text:
          _0x2b0318.text.length > 120
            ? _0x2b0318.text.slice(0, 120)
            : _0x2b0318.text,
      };
    }
    const _0x308edd = collection(db, "groups", _0x30d4c6, "messages");
    addDoc(_0x308edd, _0x9e7214)
      .then(() => {
        if (navigator.vibrate) {
          try {
            navigator.vibrate(6);
          } catch (_0x3b4bdd) {}
        }
      })
      .catch((_0x32a9bd) => {
        console.error("فشل إرسال الرسالة:", _0x32a9bd);
      });
    _0x211039();
  }
  _0x46b1e2.addEventListener("click", _0x58be4d);
  _0x5873d2().catch((_0x435eb0) => {
    console.error(
      "فشل تهيئة الجروب. الكود:",
      _0x435eb0 && _0x435eb0.code,
      "— الرسالة:",
      _0x435eb0 && _0x435eb0.message,
      _0x435eb0,
    );
  });
  window.addEventListener("unload", () => {
    if (_0x44d006) {
      _0x44d006();
    }
    _0x341f0d(false);
  });
})();
