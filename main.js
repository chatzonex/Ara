import {
  db,
  auth,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  deleteField,
  collection,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  writeBatch,
  ensureAuthenticated,
  deleteUser,
} from "./firebase-init.js";
(function () {
  if (!localStorage.getItem("cz_verified_email")) {
    window.location.href = "index.html";
    return;
  }
  const _0x4cadfe = localStorage.getItem("cz_verified_email");
  const _0x62e2cb = _0x4cadfe.toLowerCase();
  const _0x531d85 = document.getElementById("addChatBtn");
  const _0x40491a = document.getElementById("newChatOverlay");
  const _0x2f7d5b = document.getElementById("newChatEmail");
  const _0x1b7e42 = document.getElementById("newChatError");
  const _0x4b78ff = document.getElementById("cancelNewChat");
  const _0x16d47b = document.getElementById("startNewChat");
  const _0x3b3e36 = document.getElementById("chatsList");
  const _0x240ff7 = document.getElementById("chatSearch");
  const _0x1e4af7 = document.getElementById("addChoiceOverlay");
  const _0x46c6a1 = document.getElementById("addChoiceExisting");
  const _0x4d85a5 = document.getElementById("addChoiceNew");
  const _0x1f2f94 = document.getElementById("cancelAddChoice");
  const _0x806b04 = document.getElementById("contactsOverlay");
  const _0x349b22 = document.getElementById("contactsList");
  const _0x33fe66 = document.getElementById("contactsEmpty");
  const _0x1fa563 = document.getElementById("cancelContacts");
  function _0x44086a(_0x4f8a67) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(_0x4f8a67);
  }
  function _0x4d44c3() {
    _0x40491a.classList.remove("hidden");
    _0x2f7d5b.value = "";
    _0x1a99e5();
    setTimeout(() => _0x2f7d5b.focus(), 50);
  }
  function _0x207e54() {
    _0x40491a.classList.add("hidden");
  }
  function _0x157b39(_0x1cfbf4) {
    _0x1b7e42.textContent = _0x1cfbf4;
    _0x2f7d5b.classList.add("error");
  }
  function _0x1a99e5() {
    _0x1b7e42.textContent = "";
    _0x2f7d5b.classList.remove("error");
  }
  function _0x50bf41(_0x547af0, _0x3f68d4) {
    if ((localStorage.getItem("cz_lang") || "ar") === "en") {
      return _0x3f68d4;
    } else {
      return _0x547af0;
    }
  }
  function _0x50946e(_0xcfb751) {
    localStorage.setItem("cz_active_chat_email", _0xcfb751);
    window.location.href = "conversation.html";
  }
  function _0x71469f() {
    const _0x523d14 = _0x2f7d5b.value.trim();
    if (!_0x523d14) {
      _0x157b39(_0x50bf41("من فضلك اكتب الإيميل", "Please enter an email"));
      return;
    }
    if (!_0x44086a(_0x523d14)) {
      _0x157b39(_0x50bf41("الإيميل ده مش صحيح", "This email is not valid"));
      return;
    }
    if (_0x4cadfe && _0x523d14.toLowerCase() === _0x4cadfe.toLowerCase()) {
      _0x157b39(
        _0x50bf41(
          "متقدرش تبدأ محادثة مع نفسك",
          "You can't start a chat with yourself",
        ),
      );
      return;
    }
    _0x1a99e5();
    _0x50946e(_0x523d14);
  }
  const _0x104c89 = document.getElementById("chatzoneAiFab");
  if (_0x104c89) {
    _0x104c89.addEventListener("click", () => {
      window.location.href = "ai-chat.html";
    });
  }
  function _0x3f3cff() {
    if (_0x1e4af7) {
      _0x1e4af7.classList.remove("hidden");
    }
  }
  function _0x392ec3() {
    if (_0x1e4af7) {
      _0x1e4af7.classList.add("hidden");
    }
  }
  if (_0x531d85) {
    _0x531d85.addEventListener("click", _0x3f3cff);
  }
  if (_0x1f2f94) {
    _0x1f2f94.addEventListener("click", _0x392ec3);
  }
  if (_0x1e4af7) {
    _0x1e4af7.addEventListener("click", (_0x6ea0c7) => {
      if (_0x6ea0c7.target === _0x1e4af7) {
        _0x392ec3();
      }
    });
  }
  if (_0x4d85a5) {
    _0x4d85a5.addEventListener("click", () => {
      _0x392ec3();
      _0x4d44c3();
    });
  }
  function _0x3e9067(_0xc8d076) {
    if (!_0x349b22) {
      return;
    }
    _0x349b22.innerHTML = "";
    if (!_0xc8d076.length) {
      if (_0x33fe66) {
        _0x33fe66.classList.remove("hidden");
      }
      return;
    }
    if (_0x33fe66) {
      _0x33fe66.classList.add("hidden");
    }
    _0xc8d076.forEach(async (_0x5b140b) => {
      const _0x2ccc91 = document.createElement("div");
      _0x2ccc91.className = "contact-row";
      const _0x4eb152 = _0x5b140b.trim().charAt(0).toUpperCase();
      _0x2ccc91.innerHTML =
        '\n                <div class="contact-row-avatar">' +
        _0x4eb152 +
        '</div>\n                <div class="contact-row-text">\n                    <h4 class="contact-row-name">' +
        _0x5b140b +
        "</h4>\n                </div>\n            ";
      _0x2ccc91.addEventListener("click", () => {
        _0x4a0d80();
        _0x50946e(_0x5b140b);
      });
      _0x349b22.appendChild(_0x2ccc91);
      try {
        const _0x4669b3 = await _0x424bd9(_0x5b140b);
        const _0x1b1476 = _0x2ccc91.querySelector(".contact-row-name");
        if (_0x1b1476 && _0x4669b3) {
          _0x1b1476.textContent = _0x4669b3;
        }
      } catch (_0x79b4ef) {}
    });
  }
  async function _0x255b4c() {
    if (_0x349b22) {
      _0x349b22.innerHTML = "";
    }
    if (_0x33fe66) {
      _0x33fe66.classList.add("hidden");
    }
    try {
      const _0xa3a49c = await ensureAuthenticated();
      const _0x522e32 = collection(db, "users", _0x62e2cb, "contacts");
      const _0x5e7d83 = query(_0x522e32, orderBy("lastContactAt", "desc"));
      const _0x1afa6c = await getDocs(_0x5e7d83);
      const _0x505bee = [];
      _0x1afa6c.forEach((_0x1db670) => {
        const _0x3c4336 = _0x1db670.data();
        if (_0x3c4336 && _0x3c4336.email) {
          _0x505bee.push(_0x3c4336.email);
        }
      });
      _0x3e9067(_0x505bee);
    } catch (_0x7aa7f9) {
      console.error("فشل جلب جهات الاتصال:", _0x7aa7f9);
      _0x3e9067([]);
    }
  }
  function _0x4c1423() {
    if (_0x806b04) {
      _0x806b04.classList.remove("hidden");
    }
    _0x255b4c();
  }
  function _0x4a0d80() {
    if (_0x806b04) {
      _0x806b04.classList.add("hidden");
    }
  }
  if (_0x46c6a1) {
    _0x46c6a1.addEventListener("click", () => {
      _0x392ec3();
      _0x4c1423();
    });
  }
  if (_0x1fa563) {
    _0x1fa563.addEventListener("click", _0x4a0d80);
  }
  if (_0x806b04) {
    _0x806b04.addEventListener("click", (_0x4b0254) => {
      if (_0x4b0254.target === _0x806b04) {
        _0x4a0d80();
      }
    });
  }
  _0x4b78ff.addEventListener("click", _0x207e54);
  _0x40491a.addEventListener("click", (_0x40d902) => {
    if (_0x40d902.target === _0x40491a) {
      _0x207e54();
    }
  });
  _0x2f7d5b.addEventListener("input", _0x1a99e5);
  _0x2f7d5b.addEventListener("keydown", (_0x3765c9) => {
    if (_0x3765c9.key === "Enter") {
      _0x71469f();
    }
  });
  _0x16d47b.addEventListener("click", _0x71469f);
  function _0x2301e8(_0x1e9bae) {
    if (!_0x1e9bae) {
      return _0x50bf41("مستخدم", "User");
    }
    const _0x36d7b9 = _0x1e9bae.split("@")[0];
    return _0x36d7b9.charAt(0).toUpperCase() + _0x36d7b9.slice(1);
  }
  const _0x3071be = new Map();
  async function _0x424bd9(_0x11c3f8) {
    const _0x36a958 = await _0xe23d5a(_0x11c3f8);
    return _0x36a958.name;
  }
  async function _0xe23d5a(_0x13810d) {
    const _0x8508b5 = _0x13810d.toLowerCase();
    if (_0x3071be.has(_0x8508b5)) {
      return _0x3071be.get(_0x8508b5);
    }
    try {
      const _0x53c029 = await getDoc(doc(db, "users", _0x8508b5));
      const _0x30394b = _0x53c029.exists() ? _0x53c029.data() : null;
      const _0x5a64e7 = !!_0x30394b && _0x30394b.hidePhotoFromOthers === true;
      const _0x1c82d8 = {
        name:
          _0x30394b && _0x30394b.name ? _0x30394b.name : _0x2301e8(_0x13810d),
        photoURL:
          _0x30394b && !_0x5a64e7 && _0x30394b.photoURL
            ? _0x30394b.photoURL
            : "",
      };
      _0x3071be.set(_0x8508b5, _0x1c82d8);
      return _0x1c82d8;
    } catch (_0xceb3c4) {
      return {
        name: _0x2301e8(_0x13810d),
        photoURL: "",
      };
    }
  }
  function _0x5d53c7(_0x511eb9) {
    return _0x511eb9.myContactName || _0x511eb9.realName || "";
  }
  function _0x32c68c() {
    _0x3b3e36.innerHTML =
      '\n            <div class="empty-state">\n                <div class="empty-icon">💬</div>\n                <p class="empty-title">' +
      _0x50bf41("مفيش شتات لسه", "No chats yet") +
      '</p>\n                <p class="empty-sub">' +
      _0x50bf41(
        "دوس على علامة + وابدأ أول محادثة",
        "Tap + to start your first chat",
      ) +
      "</p>\n            </div>";
  }
  function _0x3e3581(_0xef2d7d) {
    if (!_0xef2d7d) {
      return "";
    }
    const _0x4b0751 = new Date();
    const _0x11768a = _0xef2d7d.toDateString() === _0x4b0751.toDateString();
    if (_0x11768a) {
      let _0x3210f9 = _0xef2d7d.getHours();
      const _0x473b26 = _0xef2d7d.getMinutes().toString().padStart(2, "0");
      const _0x510781 =
        _0x3210f9 < 12 ? _0x50bf41("ص", "AM") : _0x50bf41("م", "PM");
      _0x3210f9 = _0x3210f9 % 12 || 12;
      return _0x3210f9 + ":" + _0x473b26 + " " + _0x510781;
    }
    return _0xef2d7d.toLocaleDateString(_0x50bf41("ar-EG", "en-US"), {
      day: "numeric",
      month: "short",
    });
  }
  const _0x4e032b = new Map();
  let _0xe95a93 = new Map();
  let _0x51d36c = new Map();
  let _0x287bc4 = new Map();
  let _0x24cfcc = null;
  const _0x55bb31 = {
    unsent: "tick-unsent",
    unread: "tick-unread",
    read: "tick-read",
  };
  function _0x342cfd() {
    let _0x579886 = 0;
    _0x4e032b.forEach((_0xb5430c) => {
      _0x579886 += _0xb5430c.unread || 0;
    });
    const _0x4738fa = document.getElementById("navChats");
    if (!_0x4738fa) {
      return;
    }
    let _0x557cf8 = _0x4738fa.querySelector(".nav-unread-badge");
    if (_0x579886 > 0) {
      if (!_0x557cf8) {
        _0x557cf8 = document.createElement("span");
        _0x557cf8.className = "nav-unread-badge";
        _0x4738fa.appendChild(_0x557cf8);
      }
      _0x557cf8.textContent = _0x579886 > 99 ? "99+" : String(_0x579886);
    } else if (_0x557cf8) {
      _0x557cf8.remove();
    }
    document.title =
      _0x579886 > 0
        ? "(" + (_0x579886 > 99 ? "99+" : _0x579886) + ") ChatZone"
        : "ChatZone";
  }
  async function _0x39a4b7() {
    let _0x42930f = Array.from(_0x4e032b.entries())
      .filter(
        ([, _0x1507f4]) =>
          !_0x1507f4.deletedAt || (_0x1507f4.lastAt || 0) > _0x1507f4.deletedAt,
      )
      .map(([_0x30fae6, _0x498cea]) => ({
        chatId: _0x30fae6,
        ..._0x498cea,
      }));
    const _0x245295 = (_0x240ff7 && _0x240ff7.value.trim().toLowerCase()) || "";
    if (_0x245295) {
      const _0x3dd08 = await Promise.all(
        _0x42930f.map(async (_0xcfcfef) => {
          const _0x343708 = await _0xe23d5a(_0xcfcfef.otherEmail);
          _0xcfcfef.realName = _0x343708.name;
          return _0xcfcfef;
        }),
      );
      _0x42930f = _0x3dd08.filter((_0x45f685) => {
        const _0x8c07c8 = (
          _0x5d53c7(_0x45f685) ||
          _0x45f685.realName ||
          ""
        ).toLowerCase();
        return _0x8c07c8.includes(_0x245295);
      });
    }
    if (!_0x42930f.length) {
      _0x32c68c();
      _0x342cfd();
      return;
    }
    _0x42930f.sort((_0x12288b, _0x2eb5be) => {
      const _0x409577 = _0x12288b.pinned ? 1 : 0;
      const _0x59548b = _0x2eb5be.pinned ? 1 : 0;
      if (_0x409577 !== _0x59548b) {
        return _0x59548b - _0x409577;
      }
      return (_0x2eb5be.lastAt || 0) - (_0x12288b.lastAt || 0);
    });
    const _0x1f5d97 =
      '<svg class="chat-row-pin-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="17" x2="12" y2="22"></line><path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a1 1 0 0 0 0-2H8a1 1 0 0 0 0 2h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z"></path></svg>';
    const _0x3f0739 = await Promise.all(
      _0x42930f.map(async (_0x4af4ae) => {
        const _0x51b896 = await _0xe23d5a(_0x4af4ae.otherEmail);
        _0x4af4ae.realName = _0x51b896.name;
        const _0x36d066 = _0x5d53c7(_0x4af4ae) || _0x51b896.name;
        const _0x48ff79 = _0x51b896.photoURL
          ? '<img class="chat-row-avatar-img" src="' +
            _0x51b896.photoURL +
            '" alt="">'
          : '<svg class="chat-row-avatar-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n                        <circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.8"/>\n                        <path d="M4 20c0-3.87 3.58-7 8-7s8 3.13 8 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>\n                   </svg>';
        const _0x3367d0 = _0x4af4ae.lastAt
          ? _0x3e3581(new Date(_0x4af4ae.lastAt))
          : "";
        const _0x30556a = _0x4af4ae.unread || 0;
        const _0x5bea51 =
          _0x30556a > 0
            ? '<span class="chat-row-unread-badge">' +
              (_0x30556a > 99 ? "99+" : _0x30556a) +
              "</span>"
            : "";
        const _0x41c834 =
          _0x4af4ae.lastMessageIsMine && _0x4af4ae.lastMessageStatus
            ? '<span class="chat-row-tick ' +
              (_0x55bb31[_0x4af4ae.lastMessageStatus] || _0x55bb31.unread) +
              '"></span>'
            : "";
        const _0x25cf9b = _0x4af4ae.isOtherTyping
          ? '<p class="chat-row-preview chat-row-preview-typing"><span class="chat-row-typing-dot"></span>' +
            _0x50bf41("يكتب الآن...", "typing...") +
            "</p>"
          : '<p class="chat-row-preview">' +
            _0x41c834 +
            (_0x4af4ae.lastMessage
              ? _0x4af4ae.lastMessage
                  .replace(/</g, "&lt;")
                  .replace(/>/g, "&gt;")
              : _0x50bf41("ابدأ المحادثة", "Start the conversation")) +
            "</p>";
        return (
          '\n                <div class="chat-row' +
          (_0x30556a > 0 ? " chat-row-unread" : "") +
          (_0x4af4ae.pinned ? " chat-row-pinned" : "") +
          '" data-email="' +
          _0x4af4ae.otherEmail +
          '" data-chat-id="' +
          _0x4af4ae.chatId +
          '" data-pinned="' +
          (_0x4af4ae.pinned ? "1" : "0") +
          '">\n                    <div class="chat-row-avatar">' +
          _0x48ff79 +
          '</div>\n                    <div class="chat-row-text">\n                        <h4 class="chat-row-name">' +
          _0x36d066 +
          "</h4>\n                        " +
          _0x25cf9b +
          '\n                    </div>\n                    <div class="chat-row-meta">\n                        <div class="chat-row-meta-top">\n                            ' +
          (_0x4af4ae.pinned ? _0x1f5d97 : "") +
          '\n                            <span class="chat-row-time">' +
          _0x3367d0 +
          "</span>\n                        </div>\n                        " +
          _0x5bea51 +
          "\n                    </div>\n                </div>"
        );
      }),
    );
    _0x3b3e36.innerHTML = _0x3f0739.join("");
    _0x3b3e36.querySelectorAll(".chat-row").forEach((_0x5958b5) => {
      _0x428578(_0x5958b5);
    });
    _0x342cfd();
  }
  const _0x3db982 = 450;
  function _0x428578(_0x2e5ac1) {
    _0x2e5ac1.addEventListener("click", () => {
      _0x50946e(_0x2e5ac1.getAttribute("data-email"));
    });
    let _0x4ae6c0 = null;
    let _0x131666 = false;
    let _0x38152e = 0;
    let _0xd096c7 = 0;
    function _0x17988f() {
      if (_0x4ae6c0) {
        clearTimeout(_0x4ae6c0);
      }
      _0x4ae6c0 = null;
    }
    function _0x3ec9b3(_0x2d292a, _0x4999f3) {
      _0x131666 = false;
      _0x38152e = _0x2d292a;
      _0xd096c7 = _0x4999f3;
      _0x4ae6c0 = setTimeout(() => {
        _0x131666 = true;
        if (navigator.vibrate) {
          try {
            navigator.vibrate(15);
          } catch (_0x85fc1d) {}
        }
        _0x588989(_0x2e5ac1);
      }, _0x3db982);
    }
    _0x2e5ac1.addEventListener(
      "touchstart",
      (_0x29c23f) => {
        const _0xd1f740 = _0x29c23f.touches[0];
        _0x3ec9b3(_0xd1f740.clientX, _0xd1f740.clientY);
      },
      {
        passive: true,
      },
    );
    _0x2e5ac1.addEventListener(
      "touchmove",
      (_0x4de4dd) => {
        const _0x4ad435 = _0x4de4dd.touches[0];
        if (
          Math.abs(_0x4ad435.clientX - _0x38152e) > 10 ||
          Math.abs(_0x4ad435.clientY - _0xd096c7) > 10
        ) {
          _0x17988f();
        }
      },
      {
        passive: true,
      },
    );
    _0x2e5ac1.addEventListener("touchend", () => {
      _0x17988f();
    });
    _0x2e5ac1.addEventListener("mousedown", (_0x595794) => {
      _0x3ec9b3(_0x595794.clientX, _0x595794.clientY);
    });
    _0x2e5ac1.addEventListener("mouseup", _0x17988f);
    _0x2e5ac1.addEventListener("mouseleave", _0x17988f);
    _0x2e5ac1.addEventListener("contextmenu", (_0x56a14b) => {
      _0x56a14b.preventDefault();
      _0x588989(_0x2e5ac1);
    });
    _0x2e5ac1.addEventListener(
      "click",
      (_0x3e73b7) => {
        if (_0x131666) {
          _0x3e73b7.stopImmediatePropagation();
          _0x3e73b7.preventDefault();
          _0x131666 = false;
        }
      },
      true,
    );
  }
  const _0x42d2a5 = document.getElementById("avatarPanelOverlay");
  const _0x72815 = document.getElementById("avatarPanelPhoto");
  const _0x3a17b1 = document.getElementById("avatarPanelPhotoIcon");
  let _0x55398c = null;
  function _0x588989(_0xb18fbb) {
    if (!_0x42d2a5) {
      return;
    }
    _0x55398c = _0xb18fbb;
    const _0x1d24a2 = _0xb18fbb.querySelector(".chat-row-avatar");
    const _0x5eb82e = _0x1d24a2
      ? _0x1d24a2.querySelector(".chat-row-avatar-img")
      : null;
    let _0x4c3ca0 = _0x72815.querySelector(".avatar-panel-photo-img");
    if (_0x5eb82e) {
      if (!_0x4c3ca0) {
        _0x4c3ca0 = document.createElement("img");
        _0x4c3ca0.className = "avatar-panel-photo-img";
        _0x4c3ca0.alt = "";
        _0x72815.appendChild(_0x4c3ca0);
      }
      _0x4c3ca0.src = _0x5eb82e.src;
      if (_0x3a17b1) {
        _0x3a17b1.style.display = "none";
      }
    } else {
      if (_0x4c3ca0) {
        _0x4c3ca0.remove();
      }
      if (_0x3a17b1) {
        _0x3a17b1.style.display = "";
      }
    }
    const _0x11a8e0 = _0xb18fbb.getAttribute("data-pinned") === "1";
    const _0x31e67d = document.getElementById("avatarPanelPin");
    if (_0x31e67d) {
      _0x31e67d.setAttribute(
        "aria-label",
        _0x11a8e0
          ? _0x50bf41("إلغاء تثبيت المحادثة", "Unpin chat")
          : _0x50bf41("تثبيت المحادثة", "Pin chat"),
      );
    }
    _0x42d2a5.classList.add("open");
  }
  function _0x431696() {
    if (!_0x42d2a5) {
      return;
    }
    _0x42d2a5.classList.remove("open");
  }
  if (_0x42d2a5) {
    _0x42d2a5.addEventListener("click", (_0x211078) => {
      if (_0x211078.target === _0x42d2a5) {
        _0x431696();
      }
    });
  }
  const _0x1bba77 = document.getElementById("avatarPanelOpenChat");
  if (_0x1bba77) {
    _0x1bba77.addEventListener("click", () => {
      if (!_0x55398c) {
        return;
      }
      const _0x1e374b = _0x55398c.getAttribute("data-email");
      _0x431696();
      _0x50946e(_0x1e374b);
    });
  }
  const _0x470bdc = document.getElementById("avatarPanelViewPhoto");
  if (_0x470bdc) {
    _0x470bdc.addEventListener("click", () => {
      const _0x1907b9 = _0x72815.querySelector(".avatar-panel-photo-img");
      if (_0x1907b9) {
        _0x473f9a(_0x1907b9.src);
      }
    });
  }
  const _0x2d6c3d = document.getElementById("avatarPanelInfo");
  if (_0x2d6c3d) {
    _0x2d6c3d.addEventListener("click", () => {
      if (!_0x55398c) {
        return;
      }
      const _0x567793 = _0x55398c.getAttribute("data-email");
      _0x431696();
      localStorage.setItem("cz_open_info_on_load", "1");
      _0x50946e(_0x567793);
    });
  }
  const _0xd756f1 = document.getElementById("avatarPanelDelete");
  if (_0xd756f1) {
    _0xd756f1.addEventListener("click", () => {
      if (!_0x55398c) {
        return;
      }
      _0x5431ae = _0x55398c.getAttribute("data-chat-id");
      _0xf093ee = _0x55398c.getAttribute("data-email");
      _0x431696();
      _0x319dfa("sheet-delete-chat");
    });
  }
  const _0x1d45c9 = document.getElementById("avatarPanelPin");
  if (_0x1d45c9) {
    _0x1d45c9.addEventListener("click", async () => {
      if (!_0x55398c || !_0x24cfcc) {
        return;
      }
      const _0x5b3667 = _0x55398c.getAttribute("data-chat-id");
      _0x431696();
      const _0x5b18e3 = _0x4e032b.get(_0x5b3667);
      const _0x351a7e = !_0x5b18e3 || !_0x5b18e3.pinned;
      try {
        await updateDoc(doc(db, "chats", _0x5b3667), {
          ["pinnedFor." + _0x24cfcc]: _0x351a7e ? true : deleteField(),
        });
        if (_0x5b18e3) {
          _0x5b18e3.pinned = _0x351a7e;
          _0x4e032b.set(_0x5b3667, _0x5b18e3);
          _0x39a4b7();
        }
      } catch (_0x466b94) {
        console.error("فشل تحديث تثبيت المحادثة:", _0x466b94);
      }
    });
  }
  const _0x2015ec = document.getElementById("photoViewerOverlay");
  const _0x35b773 = document.getElementById("photoViewerImg");
  const _0x225ee1 = document.getElementById("photoViewerClose");
  function _0x473f9a(_0x170a51) {
    if (!_0x2015ec || !_0x35b773 || !_0x170a51) {
      return;
    }
    _0x35b773.src = _0x170a51;
    _0x2015ec.classList.add("open");
  }
  function _0x1e260e() {
    if (!_0x2015ec) {
      return;
    }
    _0x2015ec.classList.remove("open");
  }
  if (_0x225ee1) {
    _0x225ee1.addEventListener("click", _0x1e260e);
  }
  if (_0x2015ec) {
    _0x2015ec.addEventListener("click", (_0x86d1c5) => {
      if (_0x86d1c5.target === _0x2015ec) {
        _0x1e260e();
      }
    });
  }
  let _0x5431ae = null;
  let _0xf093ee = null;
  async function _0xe84e26(_0x1877f6) {
    const _0x39d327 = collection(db, "chats", _0x1877f6, "messages");
    let _0xe855f2 = await getDocs(_0x39d327);
    while (!_0xe855f2.empty) {
      const _0xd71b04 = writeBatch(db);
      _0xe855f2.docs
        .slice(0, 500)
        .forEach((_0x275051) => _0xd71b04.delete(_0x275051.ref));
      await _0xd71b04.commit();
      if (_0xe855f2.size <= 500) {
        break;
      }
      _0xe855f2 = await getDocs(_0x39d327);
    }
    await deleteDoc(doc(db, "chats", _0x1877f6));
  }
  const _0x50cfd1 = document.getElementById("deleteChatConfirmBtn");
  if (_0x50cfd1) {
    _0x50cfd1.addEventListener("click", async () => {
      const _0xc9d86f = _0x5431ae;
      _0x4b39d4("sheet-delete-chat");
      if (!_0xc9d86f || !_0x24cfcc) {
        return;
      }
      try {
        await _0xe84e26(_0xc9d86f);
        _0x4e032b.delete(_0xc9d86f);
        _0x39a4b7();
      } catch (_0x37c1c7) {
        console.error("فشل حذف المحادثة نهائيًا:", _0x37c1c7);
      }
    });
  }
  const _0xa49662 = document.getElementById("logoutBtn");
  const _0x9b9fed = document.getElementById("logoutConfirmBtn");
  const _0x19ab49 = document.getElementById("logoutCancelBtn");
  const _0x445b98 = document.getElementById("logoutStatus");
  if (_0xa49662) {
    _0xa49662.addEventListener("click", () => {
      _0x319dfa("sheet-logout");
    });
  }
  if (_0x19ab49) {
    _0x19ab49.addEventListener("click", () => {
      _0x4b39d4("sheet-logout");
    });
  }
  async function _0x20eb05(_0x5b9657) {
    const _0x1f5bf6 = collection(db, "users", _0x62e2cb, "contacts");
    let _0x2c1fb0 = await getDocs(_0x1f5bf6);
    while (!_0x2c1fb0.empty) {
      const _0x537114 = writeBatch(db);
      _0x2c1fb0.docs
        .slice(0, 500)
        .forEach((_0x34be79) => _0x537114.delete(_0x34be79.ref));
      await _0x537114.commit();
      if (_0x2c1fb0.size <= 500) {
        break;
      }
      _0x2c1fb0 = await getDocs(_0x1f5bf6);
    }
  }
  async function _0x5676cb(_0x10d928) {
    const _0x4af4bf = collection(db, "chats");
    const _0x2e3842 = query(
      _0x4af4bf,
      where("participants", "array-contains", _0x10d928),
    );
    const _0x277513 = await getDocs(_0x2e3842);
    for (const _0x2713ca of _0x277513.docs) {
      await _0xe84e26(_0x2713ca.id);
    }
  }
  async function _0x5de3fb() {
    const _0x549233 = await ensureAuthenticated();
    const _0x415746 = _0x549233.uid;
    await _0x5676cb(_0x415746);
    await _0x20eb05(_0x415746);
    await deleteDoc(doc(db, "users", _0x62e2cb));
    await deleteUser(_0x549233);
  }
  if (_0x9b9fed) {
    _0x9b9fed.addEventListener("click", async () => {
      _0x9b9fed.disabled = true;
      if (_0x19ab49) {
        _0x19ab49.disabled = true;
      }
      if (_0x445b98) {
        _0x445b98.textContent = _0x50bf41(
          "جاري حذف الحساب...",
          "Deleting your account...",
        );
        _0x445b98.classList.remove("hidden");
      }
      try {
        await _0x5de3fb();
      } catch (_0x16928a) {
        console.error("فشل حذف الحساب نهائيًا أثناء تسجيل الخروج:", _0x16928a);
      } finally {
        _0x4b39d4("sheet-logout");
        if (_0x445b98) {
          _0x445b98.classList.add("hidden");
        }
        localStorage.removeItem("cz_verified_email");
        localStorage.removeItem("cz_active_chat_email");
        localStorage.removeItem("cz_user_name");
        window.location.href = "index.html";
      }
    });
  }
  function _0x319dfa(_0x2f93d2) {
    const _0x24428a = document.getElementById(_0x2f93d2);
    if (_0x24428a) {
      _0x24428a.classList.add("open");
    }
  }
  function _0x4b39d4(_0x110ffd) {
    const _0x2e6e4b = document.getElementById(_0x110ffd);
    if (_0x2e6e4b) {
      _0x2e6e4b.classList.remove("open");
    }
  }
  document.querySelectorAll("[data-close-sheet]").forEach((_0x4237f0) => {
    _0x4237f0.addEventListener("click", () =>
      _0x4b39d4(_0x4237f0.dataset.closeSheet),
    );
  });
  document.querySelectorAll(".sheet-overlay").forEach((_0x175e94) => {
    _0x175e94.addEventListener("click", (_0x15ed4c) => {
      if (_0x15ed4c.target === _0x175e94) {
        _0x4b39d4(_0x175e94.id);
      }
    });
  });
  function _0x555a51(_0x55bde7, _0x2b9c45, _0x209e6d) {
    if (_0xe95a93.has(_0x55bde7)) {
      return;
    }
    const _0x129523 = collection(db, "chats", _0x55bde7, "messages");
    const _0x5f4023 = query(_0x129523, orderBy("createdAt", "desc"), limit(1));
    const _0x385af2 = onSnapshot(
      _0x5f4023,
      (_0x2470de) => {
        const _0xeabc04 = _0x4e032b.get(_0x55bde7) || {
          otherEmail: _0x2b9c45,
        };
        if (!_0x2470de.empty) {
          const _0x3f9d65 = _0x2470de.docs[0].data();
          _0xeabc04.lastMessage = _0x3f9d65.deleted
            ? _0x50bf41("تم حذف هذه الرسالة", "This message was deleted")
            : _0x3f9d65.text || "";
          _0xeabc04.lastAt =
            _0x3f9d65.createdAt && _0x3f9d65.createdAt.toDate
              ? _0x3f9d65.createdAt.toDate().getTime()
              : Date.now();
          _0xeabc04.lastMessageIsMine = _0x3f9d65.senderUid === _0x209e6d;
          _0xeabc04.lastMessageStatus = _0x3f9d65.status || "unread";
        }
        _0x4e032b.set(_0x55bde7, _0xeabc04);
        _0x39a4b7();
      },
      (_0x5651a8) => {
        console.error("فشل الاستماع لآخر رسالة في المحادثة:", _0x5651a8);
      },
    );
    _0xe95a93.set(_0x55bde7, _0x385af2);
  }
  function _0x2d2028(_0x454339, _0x34d58d, _0x45b7d3) {
    if (_0x287bc4.has(_0x454339)) {
      return;
    }
    const _0x55d5b3 = doc(db, "chats", _0x454339);
    const _0x23a158 = onSnapshot(
      _0x55d5b3,
      (_0x4c9a55) => {
        if (!_0x4c9a55.exists()) {
          return;
        }
        const _0x43342c = _0x4c9a55.data();
        const _0x2db8f9 = _0x43342c.typing || {};
        const _0x5040d3 = Object.keys(_0x2db8f9).some(
          (_0x38a6e5) => _0x38a6e5 !== _0x45b7d3 && _0x2db8f9[_0x38a6e5],
        );
        const _0x16dfa1 = _0x4e032b.get(_0x454339) || {
          otherEmail: _0x34d58d,
        };
        _0x16dfa1.isOtherTyping = _0x5040d3;
        _0x4e032b.set(_0x454339, _0x16dfa1);
        _0x39a4b7();
      },
      (_0x143db3) => {
        console.error("فشل الاستماع لحالة الكتابة في المحادثة:", _0x143db3);
      },
    );
    _0x287bc4.set(_0x454339, _0x23a158);
  }
  function _0xcaf562(_0x35baf4, _0x6d5b9, _0x6d7da) {
    if (_0x51d36c.has(_0x35baf4)) {
      return;
    }
    const _0x29d56c = collection(db, "chats", _0x35baf4, "messages");
    const _0x5bf0b1 = query(_0x29d56c, where("status", "==", "unread"));
    const _0x779f98 = onSnapshot(
      _0x5bf0b1,
      (_0x44141f) => {
        let _0x470bee = 0;
        _0x44141f.forEach((_0x2a567b) => {
          const _0x5c9509 = _0x2a567b.data();
          if (_0x5c9509.senderUid !== _0x6d7da) {
            _0x470bee++;
          }
        });
        const _0x9330d7 = _0x4e032b.get(_0x35baf4) || {
          otherEmail: _0x6d5b9,
        };
        _0x9330d7.unread = _0x470bee;
        _0x4e032b.set(_0x35baf4, _0x9330d7);
        _0x39a4b7();
      },
      (_0x2bfedf) => {
        console.error("فشل الاستماع لعدد الرسائل غير المقروءة:", _0x2bfedf);
      },
    );
    _0x51d36c.set(_0x35baf4, _0x779f98);
  }
  const _0xd5b224 = document.getElementById("sidebarRestart");
  function _0x50bf41(_0x25ca33, _0x1b787a) {
    if ((localStorage.getItem("cz_lang") || "ar") === "en") {
      return _0x1b787a;
    } else {
      return _0x25ca33;
    }
  }
  if (_0xd5b224) {
    _0xd5b224.addEventListener("click", () => {
      _0x4f20c3();
      window.location.reload();
    });
  }
  function _0x4f20c3() {
    const _0x347468 = document.getElementById("sidebarMenu");
    const _0x53c5ee = document.getElementById("sidebarOverlay");
    if (_0x347468) {
      _0x347468.classList.remove("open");
    }
    if (_0x53c5ee) {
      _0x53c5ee.classList.remove("open");
    }
  }
  async function _0x4063b8() {
    let _0x2c9c4e = null;
    try {
      const _0x457a54 = await ensureAuthenticated();
      _0x2c9c4e = _0x457a54.uid;
      _0x24cfcc = _0x457a54.uid;
    } catch (_0x4162e5) {
      console.error("فشل تسجيل الدخول في Firebase Auth:", _0x4162e5);
      return;
    }
    const _0x46d636 = collection(db, "chats");
    const _0x3f2c4a = query(
      _0x46d636,
      where("participants", "array-contains", _0x2c9c4e),
    );
    onSnapshot(
      _0x3f2c4a,
      (_0x57c600) => {
        _0x57c600.forEach((_0x54a492) => {
          const _0x5b67ce = _0x54a492.data();
          const _0x4e95d8 = _0x5b67ce.participantsEmails || [];
          const _0x13ea17 =
            _0x4e95d8.find(
              (_0x3f5464) => _0x3f5464.toLowerCase() !== _0x62e2cb,
            ) || "";
          if (!_0x13ea17) {
            return;
          }
          const _0xa88db4 = _0x5b67ce.pinnedFor || {};
          const _0x53e923 = _0x5b67ce.deletedFor || {};
          const _0x500da9 = _0x5b67ce.contactNames || {};
          const _0x382324 = !!_0xa88db4[_0x2c9c4e];
          const _0x224aaf =
            typeof _0x53e923[_0x2c9c4e] === "number"
              ? _0x53e923[_0x2c9c4e]
              : null;
          const _0x1bd7bb = _0x4e032b.get(_0x54a492.id) || {
            otherEmail: _0x13ea17,
            lastMessage: "",
            lastAt: 0,
            unread: 0,
          };
          _0x1bd7bb.pinned = _0x382324;
          _0x1bd7bb.deletedAt = _0x224aaf;
          _0x1bd7bb.myContactName = _0x500da9[_0x2c9c4e] || "";
          _0x4e032b.set(_0x54a492.id, _0x1bd7bb);
          _0x555a51(_0x54a492.id, _0x13ea17, _0x2c9c4e);
          _0xcaf562(_0x54a492.id, _0x13ea17, _0x2c9c4e);
          _0x2d2028(_0x54a492.id, _0x13ea17, _0x2c9c4e);
        });
        if (!_0x57c600.size) {
          _0x32c68c();
        } else {
          _0x39a4b7();
        }
      },
      (_0xec16a8) => {
        console.error("فشل جلب قائمة المحادثات:", _0xec16a8);
      },
    );
  }
  _0x4063b8();
  if (_0x240ff7) {
    _0x240ff7.addEventListener("input", () => _0x39a4b7());
  }
  window.addEventListener("pagehide", () => {
    _0xe95a93.forEach((_0x2dc27c) => _0x2dc27c());
    _0x51d36c.forEach((_0xca7917) => _0xca7917());
    _0x287bc4.forEach((_0x169a22) => _0x169a22());
  });
})();
