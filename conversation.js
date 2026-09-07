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
  arrayRemove,
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
  writeBatch,
  ensureAuthenticated,
} from "./firebase-init.js";
async function verifyOwnership(_0x24d09d, _0x584fe4) {
  try {
    const _0x511f54 = doc(db, "users", _0x24d09d.toLowerCase());
    const _0x19cd4f = await getDoc(_0x511f54);
    if (!_0x19cd4f.exists()) {
      return false;
    }
    const _0x201543 = _0x19cd4f.data();
    return _0x201543.uid === _0x584fe4;
  } catch (_0x545a84) {
    console.error("فشل التحقق من ملكية الإيميل:", _0x545a84);
    return false;
  }
}
async function saveContact(_0x661dcc, _0x282a4d) {
  if (!_0x661dcc || !_0x282a4d) {
    return;
  }
  const _0x3b9d73 = doc(
    db,
    "users",
    _0x661dcc.toLowerCase(),
    "contacts",
    _0x282a4d.toLowerCase(),
  );
  await setDoc(
    _0x3b9d73,
    {
      email: _0x282a4d.toLowerCase(),
      lastContactAt: serverTimestamp(),
    },
    {
      merge: true,
    },
  );
}
(function () {
  const _0x2b6665 = localStorage.getItem("cz_lang") || "ar";
  const _0x1cc5ba = localStorage.getItem("cz_theme") || "dark";
  const _0x52615a = _0x2b6665 === "ar";
  document.documentElement.lang = _0x2b6665;
  document.documentElement.dir = _0x52615a ? "rtl" : "ltr";
  if (_0x1cc5ba === "white") {
    document.body.classList.add("theme-white");
  }
  if (_0x1cc5ba === "custom") {
    document.body.classList.add("theme-custom");
    const _0x25c35d = localStorage.getItem("cz_theme_color");
    if (_0x25c35d) {
      document.documentElement.style.setProperty("--accent", _0x25c35d);
    }
  }
  if (localStorage.getItem("cz_lg_chat") === "on") {
    document.body.classList.add("lg-chat-on");
  }
  const _0x20758e = {
    ar: {
      type_message: "اكتب رسالة...",
      back: "رجوع",
      unknown_contact: "مستخدم",
      conv_menu_bubbles: "تخصيص لون الفقاعات",
      conv_menu_bubbles_sub: "لون فقاعتك بيفضل معاك في كل شاتاتك",
      conv_menu_font: "تخصيص الخط",
      conv_menu_font_sub: "اختر خط الكتابة في الشات",
      conv_menu_info: "معلومات الحساب",
      conv_menu_info_sub: "اسم وإيميل الشخص اللي بتكلمه",
      bubbles_title: "تخصيص لون الفقاعات",
      bubbles_body:
        "لون فقاعتك بيفضل معاك في كل الشاتات اللي ليك. وتقدر كمان تغيّر لون فقاعة الطرف التاني، وهيتطبق عنده فورًا.",
      bubbles_mine_title: "لون فقاعتي",
      bubbles_theirs_title: "لون فقاعة {name}",
      bubbles_tick_title: "لون الصح الزرقاء",
      bubbles_preview_hi: "أهلا",
      bubbles_preview_hi_reply: "أهلا وسهلا",
      bubbles_default: "افتراضي",
      bubbles_silver: "فضي",
      bubbles_green: "أخضر",
      bubbles_blue: "أزرق",
      bubbles_pink: "وردي",
      bubbles_purple: "بنفسجي",
      bubbles_orange: "برتقالي",
      bubbles_cyan: "سماوي",
      bubbles_red: "أحمر",
      bubbles_dark: "داكن",
      bubbles_reset: "إرجاع الافتراضي",
      choose_color_title: "اختر لون",
      choose_color_custom: "محرر الألوان (اختر أي لون)",
      choose_color_presets: "ألوان الفقاعات الخاصة بالتطبيق",
      choose_color_presets_title: "ألوان الفقاعات الخاصة بالتطبيق",
      choose_color_editor_title: "اختر لون",
      choose_color_editor_sub:
        "دوس حفظ عشان اللون يتطبق، أو إلغاء عشان ترجع من غير أي تغيير.",
      color_save: "حفظ",
      color_cancel: "إلغاء",
      unsaved_guard_title: "تحفظ اللون الأول؟",
      unsaved_guard_sub: "عندك لون مختار لسه ما اتحفظش. لو خرجت دلوقتي هيتلغي.",
      unsaved_guard_discard: "إلغاء",
      font_title: "تخصيص الخط",
      font_body:
        "اختر خط الكتابة في الشات، وسيتم حفظه واستخدامه دايمًا في كل المحادثات.",
      font_default: "الافتراضي",
      font_deco_ar: "(خط زخرفي عربي)",
      font_deco_en: "(خط زخرفي إنجليزي)",
      info_name_label: "الاسم",
      info_email_label: "البريد الإلكتروني",
      info_rename_label: "تغيير الاسم",
      info_rename_placeholder: "اكتب اسم جديد",
      info_rename_save: "حفظ",
      info_rename_success: "اتغيّر الاسم",
      info_rename_empty: "اكتب اسم الأول",
      ctx_reply: "رد",
      ctx_copy: "نسخ",
      ctx_forward: "توجيه",
      ctx_select: "تحديد",
      ctx_delete_msg: "حذف الرسالة",
      ctx_delete_everyone: "حذف من عند الطرفين",
      ctx_delete_me: "حذف من عندي بس",
      delete_msg_title: "حذف الرسالة؟",
      delete_msg_body_mine: "تقدر تحذفها من عندك بس، أو من عند الطرفين.",
      delete_msg_body_theirs:
        "هتتحذف من عندك أنت بس، ولسه هتفضل ظاهرة عند الطرف التاني.",
      delete_selected_title: "حذف الرسائل المحددة؟",
      delete_selected_body:
        "رسائلك هتتحذف نهائيًا من عند الطرفين، ورسائل الطرف التاني هتتخفي من عندك بس.",
      btn_delete: "حذف",
      deleted_msg_text: "تم حذف هذه الرسالة",
      reply_you: "أنت",
      msg_deleted_toast: "اتحذفت الرسالة",
      copied_toast: "اتنسخت الرسالة",
      forwarded_label: "تم التوجيه",
      forward_title: "توجيه إلى",
      forward_pick_hint: "اختر لغاية 10 أشخاص",
      forward_search_placeholder: "بحث بالاسم أو الإيميل",
      forward_send: "توجيه",
      forward_limit_toast: "أقصى حاجة تقدر تختار 10 أشخاص",
      forward_empty: "لسه معملتش أي محادثة مع حد",
      forward_loading: "بيتحمّل...",
      forwarded_toast: "اتوجهت الرسالة",
      typing_status: "يكتب الآن...",
      weak_connection: "نتك ضعيف",
    },
    en: {
      type_message: "Type a message...",
      back: "Back",
      unknown_contact: "User",
      conv_menu_bubbles: "Customize bubble colors",
      conv_menu_bubbles_sub: "Your bubble color follows you across all chats",
      conv_menu_font: "Customize font",
      conv_menu_font_sub: "Choose the chat font",
      conv_menu_info: "Account info",
      conv_menu_info_sub: "Name and email of the person you're chatting with",
      bubbles_title: "Customize bubble colors",
      bubbles_body:
        "Your bubble color follows you across all your chats. You can also change the other person's bubble color, and it applies instantly for them.",
      bubbles_mine_title: "My bubble color",
      bubbles_theirs_title: "{name}'s bubble color",
      bubbles_tick_title: "Blue checkmark color",
      bubbles_preview_hi: "Hi",
      bubbles_preview_hi_reply: "Hi there",
      bubbles_default: "Default",
      bubbles_silver: "Silver",
      bubbles_green: "Green",
      bubbles_blue: "Blue",
      bubbles_pink: "Pink",
      bubbles_purple: "Purple",
      bubbles_orange: "Orange",
      bubbles_cyan: "Cyan",
      bubbles_red: "Red",
      bubbles_dark: "Dark",
      bubbles_reset: "Reset to default",
      choose_color_title: "Choose a color",
      choose_color_custom: "Color editor (pick any color)",
      choose_color_presets: "App bubble colors",
      choose_color_presets_title: "App bubble colors",
      choose_color_editor_title: "Choose a color",
      choose_color_editor_sub:
        "Tap Save to apply the color, or Cancel to go back without changes.",
      color_save: "Save",
      color_cancel: "Cancel",
      unsaved_guard_title: "Save this color?",
      unsaved_guard_sub:
        "You picked a color that hasn't been saved yet. Leaving now will discard it.",
      unsaved_guard_discard: "Discard",
      font_title: "Customize font",
      font_body:
        "Choose the chat font. It will be saved and used across all conversations.",
      font_default: "Default",
      font_deco_ar: "(Arabic decorative font)",
      font_deco_en: "(English decorative font)",
      info_name_label: "Name",
      info_email_label: "Email",
      info_rename_label: "Change name",
      info_rename_placeholder: "Type a new name",
      info_rename_save: "Save",
      info_rename_success: "Name updated",
      info_rename_empty: "Type a name first",
      ctx_reply: "Reply",
      ctx_copy: "Copy",
      ctx_forward: "Forward",
      ctx_select: "Select",
      ctx_delete_msg: "Delete message",
      ctx_delete_everyone: "Delete for everyone",
      ctx_delete_me: "Delete for me",
      delete_msg_title: "Delete this message?",
      delete_msg_body_mine: "You can delete it for you only, or for everyone.",
      delete_msg_body_theirs:
        "It will be deleted for you only. It will still show for the other person.",
      delete_selected_title: "Delete selected messages?",
      delete_selected_body:
        "Your messages will be permanently deleted for everyone, and their messages will be hidden for you only.",
      btn_delete: "Delete",
      deleted_msg_text: "This message was deleted",
      reply_you: "You",
      msg_deleted_toast: "Message deleted",
      copied_toast: "Message copied",
      forwarded_label: "Forwarded",
      forward_title: "Forward to",
      forward_pick_hint: "Choose up to 10 people",
      forward_search_placeholder: "Search by name or email",
      forward_send: "Forward",
      forward_limit_toast: "You can select up to 10 people only",
      forward_empty: "You haven't chatted with anyone yet",
      forward_loading: "Loading...",
      forwarded_toast: "Message forwarded",
      typing_status: "typing...",
      weak_connection: "Weak connection",
    },
  };
  const _0x45d1f8 = _0x20758e[_0x52615a ? "ar" : "en"];
  document.querySelectorAll("[data-i18n]").forEach((_0x6f439) => {
    const _0x70ffce = _0x6f439.getAttribute("data-i18n");
    if (_0x45d1f8[_0x70ffce] !== undefined) {
      _0x6f439.textContent = _0x45d1f8[_0x70ffce];
    }
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((_0x35f474) => {
    const _0x657d5c = _0x35f474.getAttribute("data-i18n-placeholder");
    if (_0x45d1f8[_0x657d5c]) {
      _0x35f474.setAttribute("placeholder", _0x45d1f8[_0x657d5c]);
    }
  });
  const _0x4c9e47 = localStorage.getItem("cz_verified_email");
  const _0x354bc8 = localStorage.getItem("cz_active_chat_email") || "";
  if (!_0x4c9e47 || !_0x354bc8) {
    window.location.href = "MainActivity.html";
    return;
  }
  const _0x461c9a = document.getElementById("convName");
  const _0x53e40c = document.getElementById("convStatus");
  const _0x1a08a1 = 600000;
  const _0x1db203 = 5000;
  let _0x4e2c40 = Date.now();
  let _0x101580 = null;
  let _0x9365d3 = null;
  function _0x582e04() {
    _0x4e2c40 = Date.now();
  }
  function _0x5aa9cc() {
    if (navigator.onLine === false) {
      return true;
    }
    return Date.now() - _0x4e2c40 > 120000;
  }
  function _0x243393() {
    if (_0x101580) {
      return;
    }
    _0x101580 = document.createElement("div");
    _0x101580.className = "cz-weak-conn-overlay";
    _0x101580.innerHTML =
      '\n            <div class="cz-weak-conn-box">\n                <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\n                    <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9z"></path>\n                    <path d="M5 13l2 2a8.5 8.5 0 0 1 10 0l2-2C14.5 8.5 9.5 8.5 5 13z"></path>\n                    <line x1="12" y1="20" x2="12.01" y2="20"></line>\n                </svg>\n                <span>' +
      _0x45d1f8.weak_connection +
      "</span>\n            </div>";
    document.body.appendChild(_0x101580);
    requestAnimationFrame(() => _0x101580.classList.add("show"));
    _0x9365d3 = setTimeout(_0x2aa94d, _0x1db203);
  }
  function _0x2aa94d() {
    if (!_0x101580) {
      return;
    }
    _0x101580.classList.remove("show");
    const _0x423527 = _0x101580;
    _0x101580 = null;
    setTimeout(() => _0x423527.remove(), 300);
  }
  function _0x3d62c8() {
    setTimeout(() => {
      if (_0x5aa9cc()) {
        _0x243393();
      }
      _0x3d62c8();
    }, _0x1a08a1);
  }
  window.addEventListener("offline", () => {
    _0x243393();
  });
  _0x3d62c8();
  function _0x4f19ae(_0x4eada1) {
    if (!_0x4eada1) {
      return _0x45d1f8.unknown_contact;
    }
    const _0xf0ca94 = _0x4eada1.split("@")[0];
    return _0xf0ca94.charAt(0).toUpperCase() + _0xf0ca94.slice(1);
  }
  _0x461c9a.textContent = _0x4f19ae(_0x354bc8);
  _0x53e40c.textContent = "";
  let _0x483f60 = _0x4f19ae(_0x354bc8);
  let _0x49e05a = "";
  let _0xdd465d = _0x4f19ae(_0x4c9e47);
  async function _0x3bb380() {
    try {
      const _0x5c01f8 = await getDoc(doc(db, "users", _0x4c9e47.toLowerCase()));
      if (_0x5c01f8.exists() && _0x5c01f8.data().name) {
        _0xdd465d = _0x5c01f8.data().name;
      }
    } catch (_0x6b4140) {
      console.error("فشل جلب اسمي الحقيقي:", _0x6b4140);
    }
  }
  _0x3bb380();
  function _0x74f363() {
    return _0x49e05a || _0x483f60;
  }
  function _0x143e4a() {
    _0x461c9a.textContent = _0x74f363();
  }
  const _0x2f8380 = document.getElementById("convAvatar");
  const _0x20dc82 = document.getElementById("convAvatarIcon");
  const _0x197291 = document.getElementById("convAboutToastAvatar");
  function _0x1ee4a9(_0x5c37f6) {
    _0x54009a = _0x5c37f6 || "";
    if (_0x2f8380) {
      let _0x5bb1a1 = _0x2f8380.querySelector(".conv-avatar-img");
      if (_0x5c37f6) {
        if (!_0x5bb1a1) {
          _0x5bb1a1 = document.createElement("img");
          _0x5bb1a1.className = "conv-avatar-img";
          _0x5bb1a1.alt = "";
          _0x2f8380.appendChild(_0x5bb1a1);
        }
        _0x5bb1a1.src = _0x5c37f6;
        if (_0x20dc82) {
          _0x20dc82.style.display = "none";
        }
      } else {
        if (_0x5bb1a1) {
          _0x5bb1a1.remove();
        }
        if (_0x20dc82) {
          _0x20dc82.style.display = "";
        }
      }
    }
    if (_0x197291) {
      let _0x41e7bd = _0x197291.querySelector("img");
      const _0x2f0cee = _0x197291.querySelector("svg");
      if (_0x5c37f6) {
        if (!_0x41e7bd) {
          _0x41e7bd = document.createElement("img");
          _0x41e7bd.alt = "";
          _0x197291.appendChild(_0x41e7bd);
        }
        _0x41e7bd.src = _0x5c37f6;
        if (_0x2f0cee) {
          _0x2f0cee.style.display = "none";
        }
      } else {
        if (_0x41e7bd) {
          _0x41e7bd.remove();
        }
        if (_0x2f0cee) {
          _0x2f0cee.style.display = "";
        }
      }
    }
  }
  function _0x3cec30(_0x52f229) {
    const _0x4cf424 = document.getElementById("convAboutToast");
    const _0xa0a42 = document.getElementById("convAboutToastName");
    const _0x244d1e = document.getElementById("convAboutToastBody");
    if (!_0x4cf424 || !_0x52f229) {
      return;
    }
    const _0x3168a7 =
      "cz_about_seen_" +
      _0x4c9e47.toLowerCase() +
      "_" +
      _0x354bc8.toLowerCase();
    if (localStorage.getItem(_0x3168a7)) {
      return;
    }
    if (_0xa0a42) {
      _0xa0a42.textContent = _0x74f363();
    }
    if (_0x244d1e) {
      _0x244d1e.textContent = _0x52f229;
    }
    requestAnimationFrame(() => {
      _0x4cf424.classList.add("show");
    });
    localStorage.setItem(_0x3168a7, "1");
    setTimeout(() => {
      _0x4cf424.classList.remove("show");
    }, 4500);
  }
  async function _0x3f2428() {
    try {
      const _0x435a27 = doc(db, "users", _0x354bc8.toLowerCase());
      const _0x3fc702 = await getDoc(_0x435a27);
      if (_0x3fc702.exists()) {
        const _0x2c09c8 = _0x3fc702.data();
        if (_0x2c09c8.name) {
          _0x483f60 = _0x2c09c8.name;
          _0x143e4a();
          if (typeof _0xa52ee3 === "function") {
            _0xa52ee3();
          }
        }
        if (_0x2c09c8.photoURL && _0x2c09c8.hidePhotoFromOthers !== true) {
          _0x1ee4a9(_0x2c09c8.photoURL);
        }
        if (_0x2c09c8.about) {
          _0x3cec30(_0x2c09c8.about);
        }
        _0x59282a = _0x2c09c8.hideReadReceipts === true;
      }
    } catch (_0x28796a) {
      console.error("فشل جلب الاسم الحقيقي للطرف التاني:", _0x28796a);
    } finally {
      _0xc17cb2();
    }
  }
  let _0x54009a = "";
  let _0x59282a = false;
  function _0xc17cb2() {
    const _0x59ff5d = document.getElementById("accountInfoAvatar");
    const _0x575965 = document.getElementById("accountInfoAvatarIcon");
    const _0x39a8af = document.getElementById("accountInfoName");
    const _0x42d9b8 = document.getElementById("accountInfoEmail");
    const _0x580a23 = document.getElementById("accountInfoNameValue");
    const _0x5301f5 = document.getElementById("accountInfoEmailValue");
    const _0x3c7192 = document.getElementById("accountInfoRenameInput");
    const _0x2ad509 = _0x74f363();
    if (_0x59ff5d) {
      let _0x34384d = _0x59ff5d.querySelector(".account-info-avatar-img");
      if (_0x54009a) {
        if (!_0x34384d) {
          _0x34384d = document.createElement("img");
          _0x34384d.className = "account-info-avatar-img";
          _0x34384d.alt = "";
          _0x59ff5d.appendChild(_0x34384d);
        }
        _0x34384d.src = _0x54009a;
        if (_0x575965) {
          _0x575965.style.display = "none";
        }
      } else {
        if (_0x34384d) {
          _0x34384d.remove();
        }
        if (_0x575965) {
          _0x575965.style.display = "";
        }
      }
    }
    if (_0x39a8af) {
      _0x39a8af.textContent = _0x2ad509;
    }
    if (_0x42d9b8) {
      _0x42d9b8.textContent = _0x354bc8;
    }
    if (_0x580a23) {
      _0x580a23.textContent = _0x2ad509;
    }
    if (_0x5301f5) {
      _0x5301f5.textContent = _0x354bc8;
    }
    if (_0x3c7192 && document.activeElement !== _0x3c7192) {
      _0x3c7192.value = _0x49e05a || "";
    }
  }
  _0xc17cb2();
  _0x3f2428();
  if (localStorage.getItem("cz_open_info_on_load") === "1") {
    localStorage.removeItem("cz_open_info_on_load");
    _0x2391c6("sheet-account-info");
  }
  const _0xfdd66b = document.getElementById("accountInfoRenameInput");
  const _0x242c76 = document.getElementById("accountInfoRenameSave");
  async function _0x57dcc0() {
    try {
      const _0x2794b3 = await getDoc(doc(db, "chats", _0x549509));
      if (_0x2794b3.exists()) {
        const _0xf6b8a1 = _0x2794b3.data();
        const _0x4bfcb = _0xf6b8a1.contactNames || {};
        if (_0x577059 && _0x4bfcb[_0x577059]) {
          _0x49e05a = _0x4bfcb[_0x577059];
          _0x143e4a();
          _0xc17cb2();
        }
      }
    } catch (_0x3d35ad) {
      console.error("فشل جلب الاسم المخصص لجهة الاتصال:", _0x3d35ad);
    }
  }
  async function _0x2c403f() {
    if (!_0xfdd66b || !_0x577059) {
      return;
    }
    const _0x49f1f9 = _0xfdd66b.value.trim();
    if (!_0x49f1f9) {
      _0x57d63b(_0x45d1f8.info_rename_empty);
      return;
    }
    _0x242c76.disabled = true;
    try {
      await updateDoc(doc(db, "chats", _0x549509), {
        ["contactNames." + _0x577059]: _0x49f1f9,
      });
      _0x49e05a = _0x49f1f9;
      _0x143e4a();
      _0xc17cb2();
      _0x57d63b(_0x45d1f8.info_rename_success);
      if (navigator.vibrate) {
        try {
          navigator.vibrate(8);
        } catch (_0x1281b6) {}
      }
    } catch (_0x263420) {
      console.error("فشل حفظ الاسم المخصص:", _0x263420);
    } finally {
      _0x242c76.disabled = false;
    }
  }
  if (_0x242c76) {
    _0x242c76.addEventListener("click", _0x2c403f);
  }
  if (_0xfdd66b) {
    _0xfdd66b.addEventListener("keydown", (_0x17688f) => {
      if (_0x17688f.key === "Enter") {
        _0x2c403f();
      }
    });
  }
  let _0x1d312f = null;
  function _0x57d63b(_0x114a6a) {
    let _0x6367f1 = document.getElementById("czToast");
    if (!_0x6367f1) {
      _0x6367f1 = document.createElement("div");
      _0x6367f1.id = "czToast";
      _0x6367f1.className = "cz-toast";
      document.body.appendChild(_0x6367f1);
    }
    _0x6367f1.textContent = _0x114a6a;
    _0x6367f1.classList.add("show");
    if (_0x1d312f) {
      clearTimeout(_0x1d312f);
    }
    _0x1d312f = setTimeout(() => _0x6367f1.classList.remove("show"), 2200);
  }
  const _0x376d2a = document.getElementById("convBackBtn");
  if (_0x376d2a) {
    _0x376d2a.addEventListener("click", () => {
      window.location.href = "MainActivity.html";
    });
  }
  function _0x3789f6(_0xa22c16, _0x4da462) {
    return [_0xa22c16.toLowerCase(), _0x4da462.toLowerCase()].sort().join("__");
  }
  const _0x549509 = _0x3789f6(_0x4c9e47, _0x354bc8);
  const _0x15ee86 = document.getElementById("convMenuBtn");
  const _0x51da82 = document.getElementById("convSidebarMenu");
  const _0x158b88 = document.getElementById("convSidebarOverlay");
  function _0x4f14ed() {
    if (!_0x51da82 || !_0x158b88 || !_0x15ee86) {
      return;
    }
    const _0x11a5b4 = document.documentElement.dir === "rtl";
    const _0x15cdf8 = _0x15ee86.getBoundingClientRect();
    _0x51da82.style.top = _0x15cdf8.bottom + 8 + "px";
    if (_0x11a5b4) {
      _0x51da82.style.right = window.innerWidth - _0x15cdf8.right + "px";
      _0x51da82.style.left = "auto";
    } else {
      _0x51da82.style.left = _0x15cdf8.left + "px";
      _0x51da82.style.right = "auto";
    }
    _0x51da82.classList.add("open");
    _0x158b88.classList.add("open");
  }
  function _0x285926() {
    if (!_0x51da82 || !_0x158b88) {
      return;
    }
    _0x51da82.classList.remove("open");
    _0x158b88.classList.remove("open");
  }
  if (_0x15ee86) {
    _0x15ee86.addEventListener("click", () => {
      if (_0x51da82 && _0x51da82.classList.contains("open")) {
        _0x285926();
      } else {
        _0x4f14ed();
      }
    });
  }
  if (_0x158b88) {
    _0x158b88.addEventListener("click", _0x285926);
  }
  function _0x2391c6(_0x16ab56) {
    const _0x403217 = document.getElementById(_0x16ab56);
    if (_0x403217) {
      _0x403217.classList.add("open");
    }
  }
  function _0x5a82b4(_0x3cee73) {
    const _0x52dca2 = document.getElementById(_0x3cee73);
    if (_0x52dca2) {
      _0x52dca2.classList.remove("open");
    }
  }
  document.querySelectorAll("[data-close-sheet]").forEach((_0x2cd7e6) => {
    _0x2cd7e6.addEventListener("click", () =>
      _0x5a82b4(_0x2cd7e6.dataset.closeSheet),
    );
  });
  document.querySelectorAll(".sheet-overlay").forEach((_0x328647) => {
    _0x328647.addEventListener("click", (_0x339899) => {
      if (_0x339899.target === _0x328647) {
        _0x5a82b4(_0x328647.id);
      }
    });
  });
  const _0x2a4be2 = document.getElementById("convOpenBubbleColors");
  const _0x20dee3 = document.getElementById("convOpenFont");
  const _0x58f58a = document.getElementById("convOpenInfo");
  if (_0x2a4be2) {
    _0x2a4be2.addEventListener("click", () => {
      _0x285926();
      _0x2391c6("sheet-bubble-colors");
    });
  }
  if (_0x20dee3) {
    _0x20dee3.addEventListener("click", () => {
      _0x285926();
      _0x2391c6("sheet-font");
    });
  }
  if (_0x58f58a) {
    _0x58f58a.addEventListener("click", () => {
      _0x285926();
      _0x2391c6("sheet-account-info");
    });
  }
  const _0x2866b4 = document.getElementById("convIdentity");
  if (_0x2866b4) {
    _0x2866b4.addEventListener("click", () => {
      _0x2391c6("sheet-account-info");
    });
  }
  const _0x326840 = document.getElementById("photoViewerOverlay");
  const _0x546236 = document.getElementById("photoViewerImg");
  const _0x3f4423 = document.getElementById("photoViewerClose");
  function _0x75d899(_0x3213dc) {
    if (!_0x326840 || !_0x546236 || !_0x3213dc) {
      return;
    }
    _0x546236.src = _0x3213dc;
    _0x326840.classList.add("open");
  }
  function _0x62d2fc() {
    if (!_0x326840) {
      return;
    }
    _0x326840.classList.remove("open");
  }
  if (_0x3f4423) {
    _0x3f4423.addEventListener("click", _0x62d2fc);
  }
  if (_0x326840) {
    _0x326840.addEventListener("click", (_0x170d7d) => {
      if (_0x170d7d.target === _0x326840) {
        _0x62d2fc();
      }
    });
  }
  function _0x187358(_0x11937a, _0x452db1) {
    if (!_0x11937a) {
      return;
    }
    const _0x90953d = 450;
    let _0x2a3b6f = null;
    let _0x18c179 = 0;
    let _0x3b65ed = 0;
    function _0x346f4e() {
      if (_0x2a3b6f) {
        clearTimeout(_0x2a3b6f);
      }
      _0x2a3b6f = null;
    }
    function _0x1bb3c0(_0x2e2324, _0x468e66) {
      _0x18c179 = _0x2e2324;
      _0x3b65ed = _0x468e66;
      _0x346f4e();
      _0x2a3b6f = setTimeout(() => {
        const _0x161c4e = _0x452db1();
        if (_0x161c4e) {
          if (navigator.vibrate) {
            try {
              navigator.vibrate(15);
            } catch (_0xeaf01d) {}
          }
          _0x75d899(_0x161c4e);
        }
      }, _0x90953d);
    }
    _0x11937a.addEventListener(
      "touchstart",
      (_0x2fe70a) => {
        const _0x58d67 = _0x2fe70a.touches[0];
        _0x1bb3c0(_0x58d67.clientX, _0x58d67.clientY);
      },
      {
        passive: true,
      },
    );
    _0x11937a.addEventListener(
      "touchmove",
      (_0x17f624) => {
        const _0x281a3a = _0x17f624.touches[0];
        if (
          Math.abs(_0x281a3a.clientX - _0x18c179) > 10 ||
          Math.abs(_0x281a3a.clientY - _0x3b65ed) > 10
        ) {
          _0x346f4e();
        }
      },
      {
        passive: true,
      },
    );
    _0x11937a.addEventListener("touchend", _0x346f4e);
    _0x11937a.addEventListener("mousedown", (_0x3d82ae) =>
      _0x1bb3c0(_0x3d82ae.clientX, _0x3d82ae.clientY),
    );
    _0x11937a.addEventListener("mouseup", _0x346f4e);
    _0x11937a.addEventListener("mouseleave", _0x346f4e);
    _0x11937a.addEventListener("contextmenu", (_0x2ff9a3) =>
      _0x2ff9a3.preventDefault(),
    );
  }
  _0x187358(document.getElementById("accountInfoAvatar"), () => _0x54009a);
  const _0x197e57 = document.querySelector(".conv-shell");
  const _0x3379ee = "cz_bubble_tick_" + _0x549509;
  function _0x5af421() {
    return document.body.classList.contains("theme-white");
  }
  function _0x131577() {
    if (_0x5af421()) {
      return "#DCF8C6";
    } else {
      return "#005C4B";
    }
  }
  function _0x423337() {
    if (_0x5af421()) {
      return "#E9EAEB";
    } else {
      return "#202C33";
    }
  }
  const _0x1e256c = "#4FA3FF";
  let _0x1547f6 = null;
  let _0x5170b7 = "1";
  let _0x72241 = null;
  let _0x12a6b0 = "1";
  function _0x2d3474(_0x90e7bb, _0x39ea7e) {
    if (_0x39ea7e === "1") {
      return "#10161A";
    }
    return "#FFFFFF";
  }
  function _0x3f07a8(_0x4b0beb, _0x17fe2b) {
    if (_0x17fe2b === "1") {
      return "rgba(16, 22, 26, 0.55)";
    } else {
      return "rgba(255, 255, 255, 0.7)";
    }
  }
  function _0x25290a(_0x455704) {
    if (_0x455704 === "1") {
      return "rgba(16, 22, 26, 0.45)";
    } else {
      return "rgba(255, 255, 255, 0.6)";
    }
  }
  function _0x3b2da9(_0xb2492c) {
    const _0x1c6b72 = _0xb2492c.replace("#", "");
    const _0x222777 = parseInt(_0x1c6b72.substring(0, 2), 16);
    const _0x577394 = parseInt(_0x1c6b72.substring(2, 4), 16);
    const _0x1ab162 = parseInt(_0x1c6b72.substring(4, 6), 16);
    const _0x48a70f =
      (_0x222777 * 299 + _0x577394 * 587 + _0x1ab162 * 114) / 1000;
    if (_0x48a70f > 150) {
      return "1";
    } else {
      return "0";
    }
  }
  function _0x3c95f4() {
    const _0xb02daa = _0x1547f6;
    const _0x186712 = _0x72241;
    const _0x270159 = localStorage.getItem(_0x3379ee);
    const _0x36e712 = _0x5170b7 || "1";
    const _0x525645 = _0x12a6b0 || "1";
    if (_0x197e57) {
      if (_0xb02daa) {
        _0x197e57.style.setProperty("--bubble-mine-bg", _0xb02daa);
        _0x197e57.style.setProperty(
          "--bubble-mine-text",
          _0x2d3474(_0xb02daa, _0x36e712),
        );
        _0x197e57.style.setProperty(
          "--bubble-mine-time",
          _0x3f07a8(_0xb02daa, _0x36e712),
        );
        _0x197e57.style.setProperty("--bubble-mine-tick", _0x25290a(_0x36e712));
      } else {
        _0x197e57.style.removeProperty("--bubble-mine-bg");
        _0x197e57.style.removeProperty("--bubble-mine-text");
        _0x197e57.style.removeProperty("--bubble-mine-time");
        _0x197e57.style.removeProperty("--bubble-mine-tick");
      }
      if (_0x186712) {
        _0x197e57.style.setProperty("--bubble-theirs-bg", _0x186712);
        _0x197e57.style.setProperty(
          "--bubble-theirs-text",
          _0x2d3474(_0x186712, _0x525645),
        );
        _0x197e57.style.setProperty(
          "--bubble-theirs-time",
          _0x3f07a8(_0x186712, _0x525645),
        );
      } else {
        _0x197e57.style.removeProperty("--bubble-theirs-bg");
        _0x197e57.style.removeProperty("--bubble-theirs-text");
        _0x197e57.style.removeProperty("--bubble-theirs-time");
      }
      if (_0x270159) {
        _0x197e57.style.setProperty("--bubble-tick-read", _0x270159);
      } else {
        _0x197e57.style.removeProperty("--bubble-tick-read");
      }
    }
  }
  const _0x5cb849 = document.getElementById("bubblePreviewMine");
  const _0x4aaa0a = document.getElementById("bubblePreviewTheirs");
  const _0x48eaaa = document.getElementById("bubblePreviewTick");
  const _0x4be2d5 = document.getElementById("bubbleOptionMineSwatch");
  const _0xbdd88e = document.getElementById("bubbleOptionTheirsSwatch");
  const _0x359b81 = document.getElementById("bubbleOptionTickSwatch");
  function _0x159b15() {
    const _0x430238 = _0x1547f6 || _0x131577();
    const _0x123b1e = _0x72241 || _0x423337();
    const _0x293e5e = localStorage.getItem(_0x3379ee) || _0x1e256c;
    const _0xa926c3 = _0x5170b7 || "1";
    const _0x31003a = _0x12a6b0 || "1";
    if (_0x5cb849) {
      _0x5cb849.style.background = _0x430238;
      _0x5cb849.style.color = _0x2d3474(_0x430238, _0xa926c3);
    }
    if (_0x4aaa0a) {
      _0x4aaa0a.style.background = _0x123b1e;
      _0x4aaa0a.style.color = _0x2d3474(_0x123b1e, _0x31003a);
    }
    if (_0x48eaaa) {
      _0x48eaaa.style.backgroundColor = _0x293e5e;
    }
    if (_0x4be2d5) {
      _0x4be2d5.style.background = _0x430238;
    }
    if (_0xbdd88e) {
      _0xbdd88e.style.background = _0x123b1e;
    }
    if (_0x359b81) {
      _0x359b81.style.background = _0x293e5e;
    }
  }
  const _0x3407f7 = {
    mine: "bubbles_mine_title",
    theirs: "bubbles_theirs_title",
    tick: "bubbles_tick_title",
  };
  function _0xf491d6(_0x2028aa) {
    if (_0x2028aa === "mine") {
      return _0x131577();
    }
    if (_0x2028aa === "theirs") {
      return _0x423337();
    }
    return _0x1e256c;
  }
  function _0x3e0344(_0x3f1e0e) {
    if (_0x3f1e0e === "mine") {
      return _0x1547f6;
    }
    if (_0x3f1e0e === "theirs") {
      return _0x72241;
    }
    return localStorage.getItem(_0x3379ee);
  }
  let _0x15a51e = null;
  let _0x1f9d20 = null;
  let _0x430534 = "1";
  const _0x55247a = document.getElementById("chooseColorTitle");
  const _0x66646d = document.getElementById("openColorEditorBtn");
  const _0x399760 = document.getElementById("openColorPresetsBtn");
  const _0x2e73e5 = document.getElementById("bubbleColorNativePicker");
  const _0x3d7197 = document.getElementById("colorEditorPreviewSwatch");
  const _0x5f442a = document.getElementById("editorSaveBtn");
  const _0x5e7fde = document.getElementById("editorCancelBtn");
  const _0x380c36 = document.getElementById("presetSquareGrid");
  const _0x21b873 = document.getElementById("presetsSaveBtn");
  const _0xf61f46 = document.getElementById("presetsCancelBtn");
  const _0x3ea079 = document.getElementById("unsavedSaveBtn");
  const _0x26dc2c = document.getElementById("unsavedDiscardBtn");
  let _0x3f3b9a = null;
  function _0x15cb2c(_0x2cbad2) {
    const _0xea2af3 = (_0x45d1f8 && _0x45d1f8[_0x2cbad2]) || _0x2cbad2;
    return _0xea2af3.replace("{name}", _0x483f60);
  }
  const _0x202e0e = document.querySelector(
    '#bubbleOptionTheirs span[data-i18n="bubbles_theirs_title"]',
  );
  function _0xa52ee3() {
    if (_0x202e0e) {
      _0x202e0e.textContent = _0x15cb2c("bubbles_theirs_title");
    }
  }
  _0xa52ee3();
  function _0x4106da(_0x38424a) {
    _0x15a51e = _0x38424a;
    if (_0x55247a) {
      _0x55247a.textContent = _0x15cb2c(_0x3407f7[_0x38424a]);
    }
    _0x2391c6("sheet-choose-color");
  }
  if (document.getElementById("bubbleOptionMine")) {
    document
      .getElementById("bubbleOptionMine")
      .addEventListener("click", () => _0x4106da("mine"));
  }
  if (document.getElementById("bubbleOptionTheirs")) {
    document
      .getElementById("bubbleOptionTheirs")
      .addEventListener("click", () => _0x4106da("theirs"));
  }
  if (document.getElementById("bubbleOptionTick")) {
    document
      .getElementById("bubbleOptionTick")
      .addEventListener("click", () => _0x4106da("tick"));
  }
  if (_0x66646d && _0x2e73e5) {
    _0x66646d.addEventListener("click", () => {
      const _0xbb66f4 = _0x3e0344(_0x15a51e) || _0xf491d6(_0x15a51e);
      _0x2e73e5.value = _0xbb66f4;
      _0x2e73e5.click();
    });
    _0x2e73e5.addEventListener("input", (_0x1abc5e) => {
      _0x1f9d20 = _0x1abc5e.target.value;
      _0x430534 = _0x3b2da9(_0x1f9d20);
      if (_0x3d7197) {
        _0x3d7197.style.background = _0x1f9d20;
      }
      _0x5a82b4("sheet-choose-color");
      _0x2391c6("sheet-color-editor-confirm");
    });
  }
  async function _0x176f73(_0x21998e, _0x4eb473, _0x4cfa4c, _0x457fe6) {
    const _0x2d0cab = doc(db, "users", _0x21998e.toLowerCase());
    await updateDoc(_0x2d0cab, {
      bubbleColor: _0x457fe6 ? deleteField() : _0x4eb473,
      bubbleColorDark: _0x457fe6 ? deleteField() : _0x4cfa4c,
      bubbleColorUpdatedAt: serverTimestamp(),
      bubbleColorViaChatId: _0x549509,
    });
  }
  async function _0x314fa6(_0x30923c, _0x3887c7, _0x670c10) {
    if (_0x30923c === "tick") {
      if (_0x3887c7 === _0xf491d6("tick")) {
        localStorage.removeItem(_0x3379ee);
      } else {
        localStorage.setItem(_0x3379ee, _0x3887c7);
      }
      _0x3c95f4();
      _0x159b15();
      if (navigator.vibrate) {
        try {
          navigator.vibrate([6, 30, 6]);
        } catch (_0x4eebf6) {}
      }
      return;
    }
    const _0x426eb3 = _0x30923c === "mine" ? _0x4c9e47 : _0x354bc8;
    const _0x5dad81 = _0x30923c === "mine" ? _0x1547f6 : _0x72241;
    const _0x416d5a = _0x30923c === "mine" ? _0x5170b7 : _0x12a6b0;
    const _0x267c57 = _0x3887c7 === _0xf491d6(_0x30923c);
    if (_0x30923c === "mine") {
      _0x1547f6 = _0x267c57 ? null : _0x3887c7;
      _0x5170b7 = _0x670c10;
    } else {
      _0x72241 = _0x267c57 ? null : _0x3887c7;
      _0x12a6b0 = _0x670c10;
    }
    _0x3c95f4();
    _0x159b15();
    if (navigator.vibrate) {
      try {
        navigator.vibrate([6, 30, 6]);
      } catch (_0x27904f) {}
    }
    try {
      await _0x176f73(_0x426eb3, _0x3887c7, _0x670c10, _0x267c57);
    } catch (_0x4a5977) {
      console.error("فشل حفظ لون الفقاعة:", _0x4a5977);
      if (_0x30923c === "mine") {
        _0x1547f6 = _0x5dad81;
        _0x5170b7 = _0x416d5a;
      } else {
        _0x72241 = _0x5dad81;
        _0x12a6b0 = _0x416d5a;
      }
      _0x3c95f4();
      _0x159b15();
    }
  }
  if (_0x5f442a) {
    _0x5f442a.addEventListener("click", () => {
      if (_0x15a51e && _0x1f9d20) {
        _0x314fa6(_0x15a51e, _0x1f9d20, _0x430534);
      }
      _0x1f9d20 = null;
      _0x5a82b4("sheet-color-editor-confirm");
    });
  }
  if (_0x5e7fde) {
    _0x5e7fde.addEventListener("click", () => {
      _0x1f9d20 = null;
      _0x5a82b4("sheet-color-editor-confirm");
    });
  }
  function _0x46a533(_0x5037d9) {
    if (!_0x380c36) {
      return;
    }
    _0x380c36.querySelectorAll(".preset-square-option").forEach((_0x5b50db) => {
      const _0x24e039 = _0x5b50db.dataset.color === "#FFFFFF" && !_0x5037d9;
      const _0x23b935 =
        _0x5037d9 &&
        _0x5b50db.dataset.color.toLowerCase() === _0x5037d9.toLowerCase();
      _0x5b50db.classList.toggle("selected", _0x24e039 || _0x23b935);
    });
  }
  if (_0x399760) {
    _0x399760.addEventListener("click", () => {
      _0x5a82b4("sheet-choose-color");
      _0x3f3b9a = null;
      _0x46a533(_0x3e0344(_0x15a51e));
      _0x2391c6("sheet-color-presets");
    });
  }
  if (_0x380c36) {
    _0x380c36.querySelectorAll(".preset-square-option").forEach((_0x159c25) => {
      _0x159c25.addEventListener("click", () => {
        _0x3f3b9a = {
          color: _0x159c25.dataset.color,
          isDark: _0x159c25.dataset.textDark,
        };
        _0x46a533(
          _0x159c25.dataset.color === "#FFFFFF"
            ? null
            : _0x159c25.dataset.color,
        );
        if (navigator.vibrate) {
          try {
            navigator.vibrate(6);
          } catch (_0x570e02) {}
        }
      });
    });
  }
  if (_0x21b873) {
    _0x21b873.addEventListener("click", () => {
      if (_0x15a51e && _0x3f3b9a) {
        _0x314fa6(_0x15a51e, _0x3f3b9a.color, _0x3f3b9a.isDark);
      }
      _0x3f3b9a = null;
      _0x5a82b4("sheet-color-presets");
    });
  }
  if (_0xf61f46) {
    _0xf61f46.addEventListener("click", () => {
      _0x3f3b9a = null;
      _0x5a82b4("sheet-color-presets");
    });
  }
  function _0x376dd7() {
    return !!_0x1f9d20 || !!_0x3f3b9a;
  }
  function _0x5ae0e8() {
    _0x1f9d20 = null;
    _0x3f3b9a = null;
  }
  if (_0x3ea079) {
    _0x3ea079.addEventListener("click", () => {
      if (_0x15a51e) {
        if (_0x1f9d20) {
          _0x314fa6(_0x15a51e, _0x1f9d20, _0x430534);
        } else if (_0x3f3b9a) {
          _0x314fa6(_0x15a51e, _0x3f3b9a.color, _0x3f3b9a.isDark);
        }
      }
      _0x5ae0e8();
      _0x5a82b4("sheet-unsaved-guard");
      _0x5a82b4("sheet-color-editor-confirm");
      _0x5a82b4("sheet-color-presets");
      _0x5a82b4("sheet-choose-color");
    });
  }
  if (_0x26dc2c) {
    _0x26dc2c.addEventListener("click", () => {
      _0x5ae0e8();
      _0x5a82b4("sheet-unsaved-guard");
      _0x5a82b4("sheet-color-editor-confirm");
      _0x5a82b4("sheet-color-presets");
      _0x5a82b4("sheet-choose-color");
    });
  }
  const _0x5f1ae6 = ["sheet-color-editor-confirm", "sheet-color-presets"];
  document.querySelectorAll("[data-close-sheet]").forEach((_0x36272d) => {
    const _0x343e4a = _0x36272d.dataset.closeSheet;
    if (!_0x5f1ae6.includes(_0x343e4a)) {
      return;
    }
    _0x36272d.addEventListener(
      "click",
      (_0xf5048f) => {
        if (_0x376dd7()) {
          _0xf5048f.stopImmediatePropagation();
          _0x2391c6("sheet-unsaved-guard");
        }
      },
      true,
    );
  });
  _0x5f1ae6.forEach((_0x48d6f0) => {
    const _0x23a731 = document.getElementById(_0x48d6f0);
    if (!_0x23a731) {
      return;
    }
    _0x23a731.addEventListener(
      "click",
      (_0x2ad538) => {
        if (_0x2ad538.target === _0x23a731 && _0x376dd7()) {
          _0x2ad538.stopImmediatePropagation();
          _0x2391c6("sheet-unsaved-guard");
        }
      },
      true,
    );
  });
  const _0x4738b6 = document.getElementById("bubbleResetBtn");
  if (_0x4738b6) {
    _0x4738b6.addEventListener("click", async () => {
      const _0x1afce8 = !!_0x1547f6;
      const _0x42be79 = !!_0x72241;
      localStorage.removeItem(_0x3379ee);
      if (_0x1afce8) {
        await _0x314fa6("mine", _0x131577(), "1");
      }
      if (_0x42be79) {
        await _0x314fa6("theirs", _0x423337(), "1");
      }
      _0x3c95f4();
      _0x159b15();
      if (navigator.vibrate) {
        try {
          navigator.vibrate([6, 30, 6]);
        } catch (_0x3eccbc) {}
      }
    });
  }
  _0x3c95f4();
  _0x159b15();
  const _0x1005fe = "cz_chat_font";
  const _0x42bb7c = "font-";
  const _0x2d6809 = [
    "default",
    "cairo",
    "tajawal",
    "amiri",
    "reem",
    "lobster",
    "pacifico",
    "dancing",
  ];
  function _0x33c578(_0x5ae9ab) {
    if (!_0x197e57) {
      return;
    }
    _0x2d6809.forEach((_0x4d22d7) =>
      _0x197e57.classList.remove(_0x42bb7c + _0x4d22d7),
    );
    if (_0x5ae9ab && _0x5ae9ab !== "default") {
      _0x197e57.classList.add(_0x42bb7c + _0x5ae9ab);
    }
  }
  function _0xf98460(_0x197366) {
    document.querySelectorAll(".font-option").forEach((_0x2685b5) => {
      _0x2685b5.classList.toggle(
        "selected",
        _0x2685b5.dataset.font === _0x197366,
      );
    });
  }
  const _0x43dd59 = localStorage.getItem(_0x1005fe) || "default";
  _0x33c578(_0x43dd59);
  _0xf98460(_0x43dd59);
  document.querySelectorAll(".font-option").forEach((_0x194584) => {
    _0x194584.addEventListener("click", () => {
      const _0x5366d4 = _0x194584.dataset.font;
      localStorage.setItem(_0x1005fe, _0x5366d4);
      _0x33c578(_0x5366d4);
      _0xf98460(_0x5366d4);
      if (navigator.vibrate) {
        try {
          navigator.vibrate(6);
        } catch (_0x582954) {}
      }
    });
  });
  const _0x2833ee = {
    unsent: "tick-unsent",
    unread: "tick-unread",
    read: "tick-read",
  };
  function _0x5a118a(_0x572425) {
    let _0x4666ab = _0x572425.getHours();
    const _0x17fed4 = _0x572425.getMinutes().toString().padStart(2, "0");
    const _0x5854ff = _0x4666ab < 12 ? "ص" : "م";
    const _0x2d0d97 = _0x4666ab < 12 ? "AM" : "PM";
    _0x4666ab = _0x4666ab % 12;
    if (_0x4666ab === 0) {
      _0x4666ab = 12;
    }
    if (_0x52615a) {
      return _0x4666ab + ":" + _0x17fed4 + " " + _0x5854ff;
    } else {
      return _0x4666ab + ":" + _0x17fed4 + " " + _0x2d0d97;
    }
  }
  const _0x4f8ac5 = document.getElementById("convMessages");
  let _0xcd2a21 = new Map();
  function _0xbf8b0(_0x3fde1f) {
    if (_0x3fde1f.deleted) {
      return _0x45d1f8.deleted_msg_text;
    }
    if ((_0x3fde1f.text || "").length > 60) {
      return _0x3fde1f.text.slice(0, 60) + "…";
    } else {
      return _0x3fde1f.text || "";
    }
  }
  function _0x30230b(_0x244d38, _0x41d8b4) {
    const _0x3985f7 = document.createElement("div");
    _0x3985f7.className = "msg-row-system";
    _0x3985f7.dataset.msgId = _0x244d38;
    const _0x581b58 = document.createElement("span");
    _0x581b58.className = "msg-row-system-badge";
    _0x581b58.textContent = _0x41d8b4.text || "";
    _0x3985f7.appendChild(_0x581b58);
    _0x4f8ac5.appendChild(_0x3985f7);
  }
  function _0x234742(_0x5f3aef, _0x328248, _0x525c87) {
    const _0x4b5e5d = (_0x328248.senderEmail || "").toLowerCase() === _0x525c87;
    const _0x5903a5 = document.createElement("div");
    _0x5903a5.className = "msg-row " + (_0x4b5e5d ? "from-me" : "from-them");
    _0x5903a5.dataset.msgId = _0x5f3aef;
    const _0x481a3a = document.createElement("div");
    _0x481a3a.className = "msg-row-inner";
    const _0x4a1e69 = document.createElement("div");
    _0x4a1e69.className = "msg-row-select-dot";
    _0x4a1e69.innerHTML =
      '<svg viewBox="0 0 24 24" fill="none" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
    _0x481a3a.appendChild(_0x4a1e69);
    const _0x407301 = document.createElement("div");
    _0x407301.className = "msg-row-reply-icon";
    _0x407301.innerHTML =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 17 4 12 9 7"></polyline><path d="M20 18v-2a4 4 0 0 0-4-4H4"></path></svg>';
    _0x5903a5.appendChild(_0x407301);
    const _0x43564d = document.createElement("div");
    _0x43564d.className =
      "bubble " + (_0x4b5e5d ? "bubble-right" : "bubble-left");
    if (_0x328248.forwarded) {
      const _0x46a72e = document.createElement("div");
      _0x46a72e.className = "bubble-forwarded-label";
      _0x46a72e.innerHTML =
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 17 20 12 15 7"></polyline><path d="M4 18v-2a4 4 0 0 1 4-4h12"></path></svg>';
      const _0x4f8f5a = document.createElement("span");
      _0x4f8f5a.textContent = _0x45d1f8.forwarded_label;
      _0x46a72e.appendChild(_0x4f8f5a);
      _0x43564d.appendChild(_0x46a72e);
    }
    if (_0x328248.replyTo && _0x328248.replyTo.text) {
      const _0x177490 = document.createElement("div");
      _0x177490.className = "bubble-reply-quote";
      const _0xf1c971 = document.createElement("span");
      _0xf1c971.className = "bubble-reply-quote-name";
      _0xf1c971.textContent =
        _0x328248.replyTo.isMineAuthor === undefined
          ? _0x328248.replyTo.senderName || ""
          : "";
      const _0x101ff1 = document.createElement("span");
      _0x101ff1.className = "bubble-reply-quote-text";
      _0x101ff1.textContent = _0x328248.replyTo.deleted
        ? _0x45d1f8.deleted_msg_text
        : _0x328248.replyTo.text;
      if (_0x328248.replyTo.senderName) {
        _0x177490.appendChild(_0xf1c971);
      }
      _0x177490.appendChild(_0x101ff1);
      _0x43564d.appendChild(_0x177490);
      if (_0x328248.replyTo.senderName) {
        _0xf1c971.textContent = _0x328248.replyTo.senderName;
      }
    }
    const _0x217c54 = document.createElement("p");
    _0x217c54.className = "bubble-text" + (_0x328248.deleted ? " deleted" : "");
    _0x217c54.textContent = _0x328248.deleted
      ? _0x45d1f8.deleted_msg_text
      : _0x328248.text;
    _0x43564d.appendChild(_0x217c54);
    const _0x24e024 = document.createElement("div");
    _0x24e024.className = "bubble-meta";
    const _0x594c44 = document.createElement("span");
    _0x594c44.className = "bubble-time";
    const _0x3a8737 =
      _0x328248.createdAt && _0x328248.createdAt.toDate
        ? _0x328248.createdAt.toDate()
        : new Date();
    _0x594c44.textContent = _0x5a118a(_0x3a8737);
    _0x24e024.appendChild(_0x594c44);
    if (_0x4b5e5d) {
      const _0x5e0a18 = document.createElement("span");
      const _0x4d7151 = _0x328248.status || "unread";
      _0x5e0a18.className =
        "bubble-tick " + (_0x2833ee[_0x4d7151] || _0x2833ee.unread);
      _0x24e024.appendChild(_0x5e0a18);
    }
    _0x43564d.appendChild(_0x24e024);
    _0x481a3a.appendChild(_0x43564d);
    _0x5903a5.appendChild(_0x481a3a);
    _0x4f8ac5.appendChild(_0x5903a5);
    if (!_0x328248.deleted) {
      _0x53c1bf(_0x5903a5, _0x5f3aef, _0x328248, _0x4b5e5d);
    }
  }
  function _0x9f10ba(_0x360197, _0x1eaf01) {
    const _0x3f2e11 = _0x1eaf01 ? _0x1eaf01.split("|") : [];
    const _0x1a2b3c = _0x3f2e11.length === _0x360197.length;
    const _0x9c7ee = _0x4f8ac5.querySelector(".conv-empty");
    if (_0x9c7ee) {
      _0x4f8ac5.innerHTML = "";
    }
    const _0x2d4f88 = _0x4f8ac5.querySelector(".typing-row");
    if (_0x2d4f88) {
      _0x2d4f88.remove();
    }
    _0x360197.forEach((_0x48921a, _0x7e2a01) => {
      const _0x446134 = _0x48921a.data();
      if (_0x446134.replyTo && _0x446134.replyTo.id) {
        const _0x2bc445 = _0xcd2a21.get(_0x446134.replyTo.id);
        if (_0x2bc445) {
          const _0x5d0a79 =
            (_0x2bc445.senderEmail || "").toLowerCase() ===
            _0x4c9e47.toLowerCase();
          _0x446134.replyTo.senderName = _0x5d0a79
            ? _0x45d1f8.reply_you
            : _0x74f363();
          _0x446134.replyTo.deleted = !!_0x2bc445.deleted;
        }
      }
      const _0x6b8e21 = _0x1a2b3c ? _0x3f2e11[_0x7e2a01] : null;
      const _0x7a9c02 = _0x6b8e21 ? _0x6b8e21.split(":")[0] : null;
      const _0x5c1e90 =
        !_0x9c7ee && _0x1a2b3c && _0x7a9c02 === _0x48921a.id
          ? _0x6b8e21
          : null;
      const _0x2ff890 =
        _0x48921a.id +
        ":" +
        (_0x446134.status || "") +
        ":" +
        (_0x446134.text ? _0x446134.text.length : 0) +
        ":" +
        (_0x446134.deleted ? 1 : 0) +
        ":" +
        (_0x446134.edited ? 1 : 0);
      const _0x4d9e33 = _0x4f8ac5.querySelector(
        '[data-msg-id="' + _0x48921a.id + '"]',
      );
      if (_0x4d9e33 && _0x5c1e90 === _0x2ff890) {
        return;
      }
      const _0x9a3f22 = document.createDocumentFragment();
      const _0x3e7a44 = document.createComment("");
      _0x9a3f22.appendChild(_0x3e7a44);
      _0x4f8ac5.appendChild(_0x9a3f22);
      if (_0x446134.type === "system") {
        _0x30230b(_0x48921a.id, _0x446134);
      } else {
        _0x234742(_0x48921a.id, _0x446134, _0x4c9e47.toLowerCase());
      }
      const _0x1c9d5f = _0x3e7a44.previousSibling;
      _0x3e7a44.remove();
      if (_0x4d9e33 && _0x1c9d5f) {
        _0x4d9e33.replaceWith(_0x1c9d5f);
      } else if (_0x4d9e33) {
        _0x4d9e33.remove();
      }
    });
    const _0x6d1f22 = new Set(_0x360197.map((_0x757995) => _0x757995.id));
    Array.from(_0x4f8ac5.querySelectorAll("[data-msg-id]")).forEach(
      (_0x2a1b9e) => {
        if (!_0x6d1f22.has(_0x2a1b9e.dataset.msgId)) {
          _0x2a1b9e.remove();
        }
      },
    );
    const _0x9e5d31 = _0x4f8ac5.children;
    for (let _0x4a1e02 = 0; _0x4a1e02 < _0x360197.length; _0x4a1e02++) {
      const _0x1f9a03 = _0x360197[_0x4a1e02].id;
      const _0x7c2e04 = _0x9e5d31[_0x4a1e02];
      if (!_0x7c2e04 || _0x7c2e04.dataset.msgId !== _0x1f9a03) {
        const _0x5e9c11 = _0x4f8ac5.querySelector(
          '[data-msg-id="' + _0x1f9a03 + '"]',
        );
        if (_0x5e9c11 && _0x5e9c11 !== _0x7c2e04) {
          _0x4f8ac5.insertBefore(_0x5e9c11, _0x7c2e04 || null);
        }
      }
    }
    _0xe4da7e();
    _0x5eced8(false);
  }
  let _0x1dc640 = false;
  function _0xe4da7e() {
    if (!_0x1dc640) {
      return;
    }
    const _0x14ccb8 = document.createElement("div");
    _0x14ccb8.className = "msg-row from-them typing-row";
    _0x14ccb8.innerHTML =
      '\n            <div class="msg-row-inner">\n                <div class="bubble bubble-left bubble-typing">\n                    <span class="typing-dot"></span>\n                    <span class="typing-dot"></span>\n                    <span class="typing-dot"></span>\n                </div>\n            </div>';
    _0x4f8ac5.appendChild(_0x14ccb8);
  }
  function _0x5516cf(_0x2e804f) {
    if (_0x1dc640 === _0x2e804f) {
      return;
    }
    _0x1dc640 = _0x2e804f;
    const _0x1600a9 = _0x4f8ac5.querySelector(".typing-row");
    if (_0x2e804f) {
      if (!_0x1600a9) {
        _0xe4da7e();
      }
      _0x5eced8(true);
    } else if (_0x1600a9) {
      _0x1600a9.remove();
    }
  }
  function _0x5eced8(_0x190675) {
    _0x4f8ac5.scrollTo({
      top: _0x4f8ac5.scrollHeight,
      behavior: _0x190675 ? "smooth" : "auto",
    });
  }
  function _0x43c778() {
    _0x4f8ac5.innerHTML = "";
    const _0x258d21 = document.createElement("div");
    _0x258d21.className = "conv-empty";
    _0x258d21.textContent = _0x52615a
      ? "مفيش رسائل لسه، ابدأ المحادثة 👋"
      : "No messages yet, say hi 👋";
    _0x4f8ac5.appendChild(_0x258d21);
    _0xe4da7e();
  }
  let _0x22c646 = false;
  const _0x5c0c12 = new Map();
  const _0x334ac2 = document.getElementById("convTopbarSelect");
  const _0x41a751 = document.getElementById("convSelectCancelBtn");
  const _0x1d823c = document.getElementById("convSelectCount");
  const _0x48c9ba = document.getElementById("convSelectDeleteBtn");
  function _0x3528bb() {
    const _0x23b640 = _0x5c0c12.size;
    if (_0x1d823c) {
      _0x1d823c.textContent = String(_0x23b640);
    }
    if (_0x48c9ba) {
      _0x48c9ba.disabled = _0x23b640 === 0;
    }
  }
  function _0x3e1cc9(_0x2ec059, _0x1cf592) {
    _0x22c646 = true;
    _0x5c0c12.clear();
    document.body.classList.add("select-mode-on");
    if (_0x2ec059) {
      _0x5c0c12.set(_0x2ec059, {
        isMine: _0x1cf592,
      });
      const _0x3b8ee8 = _0x4f8ac5.querySelector(
        '.msg-row[data-msg-id="' + _0x2ec059 + '"]',
      );
      if (_0x3b8ee8) {
        _0x3b8ee8.classList.add("multi-selected");
      }
    }
    _0x3528bb();
  }
  function _0x4a6c0f() {
    _0x22c646 = false;
    _0x5c0c12.clear();
    document.body.classList.remove("select-mode-on");
    _0x4f8ac5
      .querySelectorAll(".msg-row.multi-selected")
      .forEach((_0x56b0a) => _0x56b0a.classList.remove("multi-selected"));
  }
  function _0x23a244(_0x1fa626, _0x5b596f, _0x1a0559) {
    if (_0x5c0c12.has(_0x5b596f)) {
      _0x5c0c12.delete(_0x5b596f);
      _0x1fa626.classList.remove("multi-selected");
    } else {
      _0x5c0c12.set(_0x5b596f, {
        isMine: _0x1a0559,
      });
      _0x1fa626.classList.add("multi-selected");
    }
    _0x3528bb();
  }
  if (_0x41a751) {
    _0x41a751.addEventListener("click", _0x4a6c0f);
  }
  async function _0xbe0d64() {
    const _0x5c9628 = [];
    const _0x57ed6a = [];
    _0x5c0c12.forEach((_0x3db0f3, _0x369a90) => {
      if (_0x3db0f3.isMine) {
        _0x5c9628.push(_0x369a90);
      } else {
        _0x57ed6a.push(_0x369a90);
      }
    });
    try {
      if (_0x5c9628.length) {
        for (
          let _0x194fe6 = 0;
          _0x194fe6 < _0x5c9628.length;
          _0x194fe6 += 500
        ) {
          const _0x59c3c1 = writeBatch(db);
          _0x5c9628.slice(_0x194fe6, _0x194fe6 + 500).forEach((_0x2ab13f) => {
            _0x59c3c1.delete(
              doc(db, "chats", _0x549509, "messages", _0x2ab13f),
            );
          });
          await _0x59c3c1.commit();
        }
      }
      if (_0x57ed6a.length && _0x577059) {
        for (const _0x426480 of _0x57ed6a) {
          await updateDoc(doc(db, "chats", _0x549509, "messages", _0x426480), {
            deletedFor: arrayUnion(_0x577059),
          });
        }
      }
      _0x57d63b(_0x45d1f8.msg_deleted_toast);
    } catch (_0x57ffe4) {
      console.error("فشل حذف الرسايل المحددة:", _0x57ffe4);
    } finally {
      _0x4a6c0f();
    }
  }
  const _0x59d2ce = document.getElementById("deleteSelectedConfirmBtn");
  const _0x2ff9c0 = document.getElementById("deleteSelectedSheetBody");
  if (_0x48c9ba) {
    _0x48c9ba.addEventListener("click", () => {
      if (_0x5c0c12.size === 0) {
        return;
      }
      const _0x570749 = [..._0x5c0c12.values()].some(
        (_0x1faafb) => _0x1faafb.isMine,
      );
      const _0x2d937a = [..._0x5c0c12.values()].some(
        (_0x4959eb) => !_0x4959eb.isMine,
      );
      if (_0x2ff9c0) {
        if (_0x570749 && _0x2d937a) {
          _0x2ff9c0.textContent = _0x52615a
            ? "رسايلك المحددة هتتحذف نهائيًا من عند الطرفين، ورسايل الطرف التاني المحددة هتتخفي من عندك بس."
            : "Your selected messages will be permanently deleted for everyone, and their selected messages will be hidden for you only.";
        } else if (_0x570749) {
          _0x2ff9c0.textContent = _0x52615a
            ? "الرسايل المحددة هتتحذف نهائيًا من عند الطرفين."
            : "The selected messages will be permanently deleted for everyone.";
        } else {
          _0x2ff9c0.textContent = _0x52615a
            ? "الرسايل المحددة هتتخفي من عندك بس، وهتفضل ظاهرة عند الطرف التاني."
            : "The selected messages will be hidden for you only, and will still be visible to the other side.";
        }
      }
      _0x2391c6("sheet-delete-selected");
    });
  }
  if (_0x59d2ce) {
    _0x59d2ce.addEventListener("click", () => {
      _0x5a82b4("sheet-delete-selected");
      _0xbe0d64();
    });
  }
  const _0x4f2c3e = 46;
  const _0xcadf43 = 420;
  function _0x53c1bf(_0x2505bd, _0x207b4f, _0x1e18f3, _0x4cf08c) {
    const _0x143329 = _0x2505bd.querySelector(".msg-row-inner");
    _0x2505bd.addEventListener("click", (_0x5ab1a8) => {
      if (!_0x22c646) {
        return;
      }
      _0x5ab1a8.preventDefault();
      _0x5ab1a8.stopPropagation();
      _0x23a244(_0x2505bd, _0x207b4f, _0x4cf08c);
    });
    let _0x5b81a4 = 0;
    let _0x274dc5 = 0;
    let _0x15d0e5 = false;
    let _0x4b5b2f = 0;
    _0x2505bd.addEventListener(
      "touchstart",
      (_0x2e6443) => {
        if (_0x22c646) {
          return;
        }
        const _0x498444 = _0x2e6443.touches[0];
        _0x5b81a4 = _0x498444.clientX;
        _0x274dc5 = _0x498444.clientY;
        _0x15d0e5 = false;
        _0x4b5b2f = 0;
      },
      {
        passive: true,
      },
    );
    _0x2505bd.addEventListener(
      "touchmove",
      (_0x3864e6) => {
        const _0x544e66 = _0x3864e6.touches[0];
        const _0x204c9f = _0x544e66.clientX - _0x5b81a4;
        const _0xea0df2 = _0x544e66.clientY - _0x274dc5;
        if (
          !_0x15d0e5 &&
          Math.abs(_0x204c9f) > 12 &&
          Math.abs(_0x204c9f) > Math.abs(_0xea0df2)
        ) {
          _0x15d0e5 = true;
        }
        if (_0x15d0e5) {
          const _0x49a68e = Math.max(-70, Math.min(70, _0x204c9f));
          _0x4b5b2f = _0x49a68e;
          _0x143329.style.transform = "translateX(" + _0x49a68e + "px)";
          _0x2505bd.classList.toggle("swiping", Math.abs(_0x49a68e) > 14);
          if (Math.abs(_0x49a68e) > 10) {
            _0x3864e6.preventDefault();
          }
        }
      },
      {
        passive: false,
      },
    );
    _0x2505bd.addEventListener("touchend", () => {
      if (!_0x22c646 && _0x15d0e5 && Math.abs(_0x4b5b2f) >= _0x4f2c3e) {
        if (navigator.vibrate) {
          try {
            navigator.vibrate(10);
          } catch (_0x2e54e3) {}
        }
        _0x192e2f(_0x207b4f, _0x1e18f3, _0x4cf08c);
      }
      _0x143329.style.transform = "";
      _0x2505bd.classList.remove("swiping");
      _0x15d0e5 = false;
      _0x4b5b2f = 0;
    });
    _0x2505bd.addEventListener("touchcancel", () => {
      _0x143329.style.transform = "";
      _0x2505bd.classList.remove("swiping");
      _0x15d0e5 = false;
      _0x4b5b2f = 0;
    });
    let _0x59626f = null;
    function _0x556781() {
      if (_0x59626f) {
        clearTimeout(_0x59626f);
      }
      _0x59626f = null;
    }
    _0x2505bd.addEventListener(
      "touchstart",
      () => {
        if (_0x22c646) {
          return;
        }
        _0x59626f = setTimeout(() => {
          if (navigator.vibrate) {
            try {
              navigator.vibrate(15);
            } catch (_0x25f606) {}
          }
          _0x544d5b(_0x2505bd, _0x207b4f, _0x1e18f3, _0x4cf08c);
        }, _0xcadf43);
      },
      {
        passive: true,
      },
    );
    _0x2505bd.addEventListener("touchmove", _0x556781, {
      passive: true,
    });
    _0x2505bd.addEventListener("touchend", _0x556781);
    _0x2505bd.addEventListener("touchcancel", _0x556781);
    _0x2505bd.addEventListener("contextmenu", (_0x4e1569) => {
      if (_0x22c646) {
        _0x4e1569.preventDefault();
        return;
      }
      _0x4e1569.preventDefault();
      _0x544d5b(_0x2505bd, _0x207b4f, _0x1e18f3, _0x4cf08c);
    });
    let _0x50e0ef = null;
    _0x2505bd.addEventListener("mousedown", () => {
      if (_0x22c646) {
        return;
      }
      _0x50e0ef = setTimeout(
        () => _0x544d5b(_0x2505bd, _0x207b4f, _0x1e18f3, _0x4cf08c),
        _0xcadf43,
      );
    });
    _0x2505bd.addEventListener("mouseup", () => {
      if (_0x50e0ef) {
        clearTimeout(_0x50e0ef);
      }
    });
    _0x2505bd.addEventListener("mouseleave", () => {
      if (_0x50e0ef) {
        clearTimeout(_0x50e0ef);
      }
    });
  }
  const _0x5a4d50 = document.getElementById("msgCtxOverlay");
  const _0x42cf83 = document.getElementById("msgCtxMenu");
  const _0x5c8c34 = document.getElementById("msgCtxReply");
  const _0x2eafbd = document.getElementById("msgCtxCopy");
  const _0x240b9a = document.getElementById("msgCtxForward");
  const _0x59864c = document.getElementById("msgCtxSelect");
  const _0x5c2e56 = document.getElementById("msgCtxDelete");
  let _0x452273 = null;
  let _0x2cd465 = null;
  let _0x4af94e = false;
  function _0x544d5b(_0x5c59fb, _0xeba89d, _0x512678, _0x3b4d14) {
    _0x452273 = _0xeba89d;
    _0x2cd465 = _0x512678;
    _0x4af94e = _0x3b4d14;
    document
      .querySelectorAll(".msg-row.selected")
      .forEach((_0x2d4899) => _0x2d4899.classList.remove("selected"));
    _0x5c59fb.classList.add("selected");
    if (!_0x42cf83 || !_0x5a4d50) {
      return;
    }
    const _0x380532 = _0x5c59fb.querySelector(".bubble") || _0x5c59fb;
    _0x42cf83.style.visibility = "hidden";
    _0x42cf83.classList.add("open");
    const _0x5e0f87 = _0x380532.getBoundingClientRect();
    const _0x4925bd = _0x42cf83.getBoundingClientRect();
    const _0x5c0e21 = document.documentElement.dir === "rtl";
    const _0xa81ac1 = _0x4925bd.width || 230;
    const _0x31ae70 = _0x4925bd.height || 210;
    const _0x193999 = 10;
    let _0x5eeb9a = _0x5e0f87.bottom + 6;
    if (_0x5eeb9a + _0x31ae70 > window.innerHeight - _0x193999) {
      _0x5eeb9a = _0x5e0f87.top - _0x31ae70 - 6;
    }
    _0x5eeb9a = Math.min(
      Math.max(_0x193999, _0x5eeb9a),
      window.innerHeight - _0x31ae70 - _0x193999,
    );
    _0x42cf83.style.top = _0x5eeb9a + "px";
    const _0x4a07c4 = _0x5e0f87.left + _0x5e0f87.width / 2;
    let _0xe630e9 = Math.min(
      Math.max(_0x193999, _0x4a07c4 - _0xa81ac1 / 2),
      window.innerWidth - _0xa81ac1 - _0x193999,
    );
    if (_0x5c0e21) {
      _0x42cf83.style.right = window.innerWidth - _0xe630e9 - _0xa81ac1 + "px";
      _0x42cf83.style.left = "auto";
    } else {
      _0x42cf83.style.left = _0xe630e9 + "px";
      _0x42cf83.style.right = "auto";
    }
    _0x42cf83.style.visibility = "";
    _0x5a4d50.classList.add("open");
  }
  function _0x54897d() {
    if (_0x42cf83) {
      _0x42cf83.classList.remove("open");
    }
    if (_0x5a4d50) {
      _0x5a4d50.classList.remove("open");
    }
    document
      .querySelectorAll(".msg-row.selected")
      .forEach((_0x1f4d0f) => _0x1f4d0f.classList.remove("selected"));
  }
  if (_0x5a4d50) {
    _0x5a4d50.addEventListener("click", _0x54897d);
  }
  if (_0x5c8c34) {
    _0x5c8c34.addEventListener("click", () => {
      const _0x584711 = _0x452273;
      const _0x355ff6 = _0x2cd465;
      const _0x45e03a = _0x4af94e;
      _0x54897d();
      if (_0x584711 && _0x355ff6) {
        _0x192e2f(_0x584711, _0x355ff6, _0x45e03a);
      }
    });
  }
  if (_0x2eafbd) {
    _0x2eafbd.addEventListener("click", () => {
      const _0x2b71d2 = _0x2cd465;
      _0x54897d();
      if (!_0x2b71d2 || _0x2b71d2.deleted) {
        return;
      }
      _0x156b66(_0x2b71d2.text || "");
    });
  }
  if (_0x240b9a) {
    _0x240b9a.addEventListener("click", () => {
      const _0x3693b5 = _0x2cd465;
      _0x54897d();
      if (!_0x3693b5 || _0x3693b5.deleted) {
        return;
      }
      _0x232aa6(_0x3693b5);
    });
  }
  if (_0x59864c) {
    _0x59864c.addEventListener("click", () => {
      const _0x3f9715 = _0x452273;
      const _0x47ce62 = _0x4af94e;
      _0x54897d();
      _0x3e1cc9(_0x3f9715, _0x47ce62);
    });
  }
  if (_0x5c2e56) {
    _0x5c2e56.addEventListener("click", () => {
      _0x54897d();
      _0x2fc669(_0x452273, _0x2cd465, _0x4af94e);
    });
  }
  function _0x156b66(_0x593028) {
    if (!_0x593028) {
      return;
    }
    const _0x488d97 = () => _0x57d63b(_0x45d1f8.copied_toast);
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(_0x593028)
        .then(_0x488d97)
        .catch(() => _0x206b71(_0x593028, _0x488d97));
    } else {
      _0x206b71(_0x593028, _0x488d97);
    }
  }
  function _0x206b71(_0x42a467, _0x5bda4c) {
    try {
      const _0x215581 = document.createElement("textarea");
      _0x215581.value = _0x42a467;
      _0x215581.style.position = "fixed";
      _0x215581.style.opacity = "0";
      _0x215581.style.pointerEvents = "none";
      document.body.appendChild(_0x215581);
      _0x215581.focus();
      _0x215581.select();
      document.execCommand("copy");
      document.body.removeChild(_0x215581);
      _0x5bda4c();
    } catch (_0x4c7b3f) {
      console.error("فشل نسخ الرسالة:", _0x4c7b3f);
    }
  }
  const _0xa93f0f = 10;
  const _0x8939c = document.getElementById("forwardContactsList");
  const _0x51b317 = document.getElementById("forwardSearchInput");
  const _0xc0435f = document.getElementById("forwardSendBtn");
  const _0x33b0d5 = document.getElementById("forwardSendCount");
  let _0x1fb9e8 = null;
  let _0x1db8cf = null;
  let _0x4bd1f5 = new Map();
  function _0x24906b(_0x32ade5) {
    const _0x4af6c9 = (_0x32ade5 || "").trim();
    if (_0x4af6c9) {
      return _0x4af6c9.charAt(0).toUpperCase();
    } else {
      return "؟";
    }
  }
  async function _0x526fca() {
    if (_0x1db8cf) {
      return _0x1db8cf;
    }
    const _0xfebac7 = collection(db, "chats");
    const _0x25b8be = query(
      _0xfebac7,
      where("participants", "array-contains", _0x577059),
    );
    const _0x2a7f8a = await getDocs(_0x25b8be);
    const _0x57f1de = new Set();
    _0x2a7f8a.forEach((_0x31287d) => {
      const _0x5073bc = _0x31287d.data();
      const _0x387714 = _0x5073bc.participantsEmails || [];
      _0x387714.forEach((_0x4a2b37) => {
        const _0x4d5a46 = (_0x4a2b37 || "").toLowerCase();
        if (_0x4d5a46 && _0x4d5a46 !== _0x314967) {
          _0x57f1de.add(_0x4d5a46);
        }
      });
    });
    const _0x5b29f2 = [];
    for (const _0x5e8dbc of _0x57f1de) {
      let _0x3e2191 = _0x4f19ae(_0x5e8dbc);
      try {
        const _0x367699 = await getDoc(doc(db, "users", _0x5e8dbc));
        if (_0x367699.exists() && _0x367699.data().name) {
          _0x3e2191 = _0x367699.data().name;
        }
      } catch (_0x19dcc8) {}
      _0x5b29f2.push({
        email: _0x5e8dbc,
        name: _0x3e2191,
      });
    }
    _0x5b29f2.sort((_0x26885e, _0x58e993) =>
      _0x26885e.name.localeCompare(_0x58e993.name, _0x52615a ? "ar" : "en"),
    );
    _0x1db8cf = _0x5b29f2;
    return _0x5b29f2;
  }
  function _0x3a0e39(_0x2e9ebb) {
    if (!_0x8939c) {
      return;
    }
    _0x8939c.innerHTML = "";
    if (!_0x2e9ebb.length) {
      const _0x484925 = document.createElement("div");
      _0x484925.className = "forward-empty";
      _0x484925.textContent = _0x45d1f8.forward_empty;
      _0x8939c.appendChild(_0x484925);
      return;
    }
    _0x2e9ebb.forEach((_0x502609) => {
      const _0x4fcf2f = document.createElement("div");
      _0x4fcf2f.className = "forward-contact-row";
      _0x4fcf2f.dataset.email = _0x502609.email;
      const _0x7efa70 = document.createElement("div");
      _0x7efa70.className = "forward-contact-avatar";
      _0x7efa70.textContent = _0x24906b(_0x502609.name);
      const _0x2688d6 = document.createElement("div");
      _0x2688d6.className = "forward-contact-text";
      const _0xa56f2f = document.createElement("div");
      _0xa56f2f.className = "forward-contact-name";
      _0xa56f2f.textContent = _0x502609.name;
      const _0x372604 = document.createElement("div");
      _0x372604.className = "forward-contact-email";
      _0x372604.textContent = _0x502609.email;
      _0x2688d6.appendChild(_0xa56f2f);
      _0x2688d6.appendChild(_0x372604);
      const _0x2e5566 = document.createElement("div");
      _0x2e5566.className = "forward-contact-check";
      _0x2e5566.innerHTML =
        '<svg viewBox="0 0 24 24" fill="none" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
      _0x4fcf2f.appendChild(_0x7efa70);
      _0x4fcf2f.appendChild(_0x2688d6);
      _0x4fcf2f.appendChild(_0x2e5566);
      _0x4fcf2f.classList.toggle("checked", _0x4bd1f5.has(_0x502609.email));
      _0x4fcf2f.addEventListener("click", () =>
        _0x4aaa5d(_0x502609, _0x4fcf2f),
      );
      _0x8939c.appendChild(_0x4fcf2f);
    });
    _0x5d097b();
  }
  function _0x4aaa5d(_0x4f7064, _0x7b40b2) {
    if (_0x4bd1f5.has(_0x4f7064.email)) {
      _0x4bd1f5.delete(_0x4f7064.email);
      _0x7b40b2.classList.remove("checked");
    } else {
      if (_0x4bd1f5.size >= _0xa93f0f) {
        _0x57d63b(_0x45d1f8.forward_limit_toast);
        return;
      }
      _0x4bd1f5.set(_0x4f7064.email, _0x4f7064.name);
      _0x7b40b2.classList.add("checked");
    }
    _0x5d097b();
  }
  function _0x5d097b() {
    const _0x266a74 = _0x4bd1f5.size;
    if (_0xc0435f) {
      _0xc0435f.disabled = _0x266a74 === 0;
    }
    if (_0x33b0d5) {
      _0x33b0d5.textContent =
        _0x266a74 > 0 ? "(" + _0x266a74 + "/" + _0xa93f0f + ")" : "";
    }
    if (_0x8939c) {
      _0x8939c.querySelectorAll(".forward-contact-row").forEach((_0x2f3fb3) => {
        const _0x1d71c0 = _0x2f3fb3.classList.contains("checked");
        _0x2f3fb3.classList.toggle(
          "disabled",
          !_0x1d71c0 && _0x266a74 >= _0xa93f0f,
        );
      });
    }
  }
  async function _0x232aa6(_0x1218d1) {
    _0x1fb9e8 = _0x1218d1;
    _0x4bd1f5 = new Map();
    if (_0x51b317) {
      _0x51b317.value = "";
    }
    _0x5d097b();
    if (_0x8939c) {
      _0x8939c.innerHTML =
        '<div class="forward-loading">' + _0x45d1f8.forward_loading + "</div>";
    }
    _0x2391c6("sheet-forward");
    try {
      const _0x5c6f22 = await _0x526fca();
      _0x3a0e39(_0x5c6f22);
    } catch (_0x679393) {
      console.error("فشل تحميل قائمة جهات الاتصال للتوجيه:", _0x679393);
      _0x3a0e39([]);
    }
  }
  if (_0x51b317) {
    _0x51b317.addEventListener("input", () => {
      if (!_0x1db8cf) {
        return;
      }
      const _0x3320e3 = _0x51b317.value.trim().toLowerCase();
      const _0x7cd5c0 = !_0x3320e3
        ? _0x1db8cf
        : _0x1db8cf.filter(
            (_0x5acc47) =>
              _0x5acc47.name.toLowerCase().includes(_0x3320e3) ||
              _0x5acc47.email.toLowerCase().includes(_0x3320e3),
          );
      _0x3a0e39(_0x7cd5c0);
    });
  }
  if (_0xc0435f) {
    _0xc0435f.addEventListener("click", () => {
      if (!_0x1fb9e8 || _0x4bd1f5.size === 0 || !_0x577059) {
        return;
      }
      const _0x43016c = Array.from(_0x4bd1f5.keys());
      const _0x42f1fc = _0x1fb9e8.text || "";
      _0xc0435f.disabled = true;
      const _0xd64405 = _0x43016c.map((_0x3c3931) => {
        const _0x1d2b1d = _0x3789f6(_0x4c9e47, _0x3c3931);
        const _0x1443a6 = {
          senderUid: _0x577059,
          senderEmail: _0x4c9e47,
          text: _0x42f1fc,
          forwarded: true,
          createdAt: serverTimestamp(),
          status: "unread",
        };
        const _0x18a3f4 = collection(db, "chats", _0x1d2b1d, "messages");
        return addDoc(_0x18a3f4, _0x1443a6);
      });
      Promise.all(_0xd64405)
        .then(() => {
          if (navigator.vibrate) {
            try {
              navigator.vibrate(8);
            } catch (_0x33ae7f) {}
          }
          _0x5a82b4("sheet-forward");
          _0x57d63b(_0x45d1f8.forwarded_toast);
        })
        .catch((_0x4734e9) => {
          console.error("فشل توجيه الرسالة:", _0x4734e9);
          _0x5d097b();
        });
    });
  }
  const _0x5ef8d2 = document.getElementById("convReplyBar");
  const _0x86421 = document.getElementById("convReplyBarName");
  const _0x5190fa = document.getElementById("convReplyBarPreview");
  const _0x5e5248 = document.getElementById("convReplyBarClose");
  let _0x45b267 = null;
  function _0x192e2f(_0x21bd1b, _0x73793a, _0x2ac2a0) {
    if (_0x73793a.deleted) {
      return;
    }
    _0x45b267 = {
      id: _0x21bd1b,
      text: _0x73793a.text || "",
      senderName: _0x2ac2a0 ? _0x45d1f8.reply_you : _0x74f363(),
      isMine: _0x2ac2a0,
    };
    if (_0x86421) {
      _0x86421.textContent = _0x45b267.senderName;
    }
    if (_0x5190fa) {
      _0x5190fa.textContent = _0xbf8b0(_0x73793a);
    }
    if (_0x5ef8d2) {
      _0x5ef8d2.classList.add("open");
    }
    _0x1f8f26.focus();
  }
  function _0x45ccd7() {
    _0x45b267 = null;
    if (_0x5ef8d2) {
      _0x5ef8d2.classList.remove("open");
    }
  }
  if (_0x5e5248) {
    _0x5e5248.addEventListener("click", _0x45ccd7);
  }
  const _0x5221db = document.getElementById("deleteMsgSheetBody");
  const _0x43199b = document.getElementById("deleteMsgForEveryoneBtn");
  const _0x2fcd3b = document.getElementById("deleteMsgForMeBtn");
  let _0x39dd0b = null;
  let _0x254465 = false;
  function _0x2fc669(_0x29e76f, _0x40765b, _0x2e0a58) {
    _0x39dd0b = _0x29e76f;
    _0x254465 = _0x2e0a58;
    if (_0x5221db) {
      _0x5221db.textContent = _0x2e0a58
        ? _0x45d1f8.delete_msg_body_mine
        : _0x45d1f8.delete_msg_body_theirs;
    }
    if (_0x43199b) {
      _0x43199b.style.display = _0x2e0a58 ? "" : "none";
    }
    _0x2391c6("sheet-delete-msg");
  }
  async function _0x52a33a() {
    const _0x45855c = _0x39dd0b;
    _0x5a82b4("sheet-delete-msg");
    _0x54897d();
    if (!_0x45855c || !_0x577059) {
      return;
    }
    try {
      await updateDoc(doc(db, "chats", _0x549509, "messages", _0x45855c), {
        deletedFor: arrayUnion(_0x577059),
      });
      _0x57d63b(_0x45d1f8.msg_deleted_toast);
    } catch (_0x32d88a) {
      console.error("فشل حذف الرسالة من عندي:", _0x32d88a);
    }
  }
  async function _0x4824da() {
    const _0x295bf3 = _0x39dd0b;
    _0x5a82b4("sheet-delete-msg");
    _0x54897d();
    if (!_0x295bf3) {
      return;
    }
    try {
      await updateDoc(doc(db, "chats", _0x549509, "messages", _0x295bf3), {
        deleted: true,
        text: "",
      });
      _0x57d63b(_0x45d1f8.msg_deleted_toast);
    } catch (_0x233497) {
      console.error("فشل حذف الرسالة من عند الطرفين:", _0x233497);
    }
  }
  if (_0x2fcd3b) {
    _0x2fcd3b.addEventListener("click", _0x52a33a);
  }
  if (_0x43199b) {
    _0x43199b.addEventListener("click", _0x4824da);
  }
  const _0x1f8f26 = document.getElementById("convTextarea");
  const _0x22b699 = document.getElementById("convInputBar");
  const _0x5ebf0a = document.getElementById("convSendBtn");
  let _0x7b3e91 = false;
  function _0x2fea2b() {
    if (_0x7b3e91) {
      return;
    }
    _0x7b3e91 = true;
    requestAnimationFrame(() => {
      _0x7b3e91 = false;
      _0x1f8f26.style.height = "auto";
      _0x1f8f26.style.height = Math.min(_0x1f8f26.scrollHeight, 120) + "px";
    });
  }
  function _0x6b1658() {
    const _0x34e30f = _0x1f8f26.value.trim().length > 0;
    _0x22b699.classList.toggle("has-text", _0x34e30f);
  }
  const _0x9a134 = 2500;
  let _0x2da82 = null;
  let _0x368946 = false;
  function _0x38c24d(_0x4ac10f) {
    if (!_0x577059) {
      return;
    }
    if (_0x4ac10f === _0x368946) {
      return;
    }
    _0x368946 = _0x4ac10f;
    updateDoc(doc(db, "chats", _0x549509), {
      ["typing." + _0x577059]: _0x4ac10f,
    }).catch(() => {
      if (_0x4ac10f) {
        _0x368946 = false;
      }
    });
  }
  function _0x274ec0() {
    _0x38c24d(true);
    if (_0x2da82) {
      clearTimeout(_0x2da82);
    }
    _0x2da82 = setTimeout(() => _0x38c24d(false), _0x9a134);
  }
  _0x1f8f26.addEventListener("input", () => {
    _0x2fea2b();
    _0x6b1658();
    if (_0x1f8f26.value.trim().length > 0) {
      _0x274ec0();
    } else {
      if (_0x2da82) {
        clearTimeout(_0x2da82);
      }
      _0x38c24d(false);
    }
  });
  _0x1f8f26.addEventListener("keydown", (_0x23bc12) => {
    if (_0x23bc12.key === "Enter" && !_0x23bc12.shiftKey) {
      _0x23bc12.preventDefault();
      _0xfecab6();
    }
  });
  _0x6b1658();
  let _0x577059 = null;
  let _0x47ca9d = null;
  async function _0x1cb9c6(_0x2864c8, _0x1e41d7, _0x500d22) {
    _0x500d22 = _0x500d22 || 10;
    for (let _0x300a58 = 0; _0x300a58 < _0x500d22; _0x300a58++) {
      try {
        const _0x59054c = await getDoc(_0x2864c8);
        if (_0x59054c.exists()) {
          const _0x39b550 = _0x59054c.data();
          if (
            _0x39b550.participants &&
            _0x39b550.participants.includes(_0x1e41d7)
          ) {
            return true;
          }
        }
      } catch (_0x20040a) {}
      await new Promise((_0xca0f5d) => setTimeout(_0xca0f5d, 300));
    }
    console.error("لم يتم التأكد من انضمامي إلى participants بعد عدة محاولات.");
    return false;
  }
  function _0x4743fa(_0x9b7e97, _0x46e840) {
    _0x46e840 = _0x46e840 || 3;
    updateDoc(_0x9b7e97, {
      status: "read",
    }).catch((_0x9ad41d) => {
      if (_0x46e840 > 1) {
        setTimeout(() => _0x4743fa(_0x9b7e97, _0x46e840 - 1), 500);
      } else {
        console.error("فشل تحديث حالة الرسالة إلى مقروءة نهائيًا:", _0x9ad41d);
      }
    });
  }
  async function _0x2aaa88() {
    const _0x4361fe = await ensureAuthenticated();
    _0x577059 = _0x4361fe.uid;
    const _0x3a2f45 = await verifyOwnership(_0x4c9e47, _0x577059);
    if (!_0x3a2f45) {
      console.error("فشل التحقق من ملكية الإيميل — الجلسة الحالية غير مطابقة.");
      localStorage.removeItem("cz_verified_email");
      localStorage.removeItem("cz_active_chat_email");
      window.location.href = "MainActivity.html";
      return;
    }
    _0x57dcc0();
    onSnapshot(doc(db, "users", _0x4c9e47.toLowerCase()), (_0x424fef) => {
      if (!_0x424fef.exists()) {
        return;
      }
      const _0x5f0f09 = _0x424fef.data();
      _0x1547f6 = _0x5f0f09.bubbleColor || null;
      _0x5170b7 = _0x5f0f09.bubbleColorDark || "1";
      _0x3c95f4();
      _0x159b15();
    });
    onSnapshot(doc(db, "users", _0x354bc8.toLowerCase()), (_0x4d3d22) => {
      if (!_0x4d3d22.exists()) {
        return;
      }
      const _0x2fac4b = _0x4d3d22.data();
      _0x72241 = _0x2fac4b.bubbleColor || null;
      _0x12a6b0 = _0x2fac4b.bubbleColorDark || "1";
      _0x3c95f4();
      _0x159b15();
    });
    const _0x5cacb3 = doc(db, "chats", _0x549509);
    let _0x2a3b1f = null;
    try {
      const _0x451d53 = await getDoc(doc(db, "users", _0x354bc8.toLowerCase()));
      if (_0x451d53.exists() && _0x451d53.data().uid) {
        _0x2a3b1f = _0x451d53.data().uid;
      }
    } catch (_0x334cc4) {
      console.error(
        "تعذّر جلب uid الطرف التاني وقت إنشاء المحادثة:",
        _0x334cc4,
      );
    }
    let _0x4509f2 = false;
    const _0x47eca5 = _0x2a3b1f ? [_0x577059, _0x2a3b1f] : [_0x577059];
    try {
      await setDoc(_0x5cacb3, {
        participants: _0x47eca5,
        participantsEmails: [_0x4c9e47.toLowerCase(), _0x354bc8.toLowerCase()],
        createdAt: serverTimestamp(),
      });
      _0x4509f2 = true;
    } catch (_0x433a4f) {}
    if (!_0x4509f2) {
      try {
        await updateDoc(_0x5cacb3, {
          participants: arrayUnion(_0x577059),
        });
        _0x4509f2 = true;
      } catch (_0x1aa616) {
        console.error(
          "فشل الانضمام كـ participant للمحادثة. كود الخطأ:",
          _0x1aa616.code,
          _0x1aa616.message,
        );
        throw _0x1aa616;
      }
    }
    await _0x1cb9c6(_0x5cacb3, _0x577059);
    saveContact(_0x4c9e47, _0x354bc8).catch((_0x310fa6) => {
      console.error("فشل حفظ جهة الاتصال:", _0x310fa6);
    });
    onSnapshot(
      _0x5cacb3,
      (_0x4cc6e6) => {
        if (!_0x4cc6e6.exists()) {
          return;
        }
        if (!_0x4cc6e6.metadata.fromCache) {
          _0x582e04();
          _0x2aa94d();
        }
        const _0x633b3e = _0x4cc6e6.data();
        const _0x3afcc0 = _0x633b3e.typing || {};
        const _0x667ef2 = Object.keys(_0x3afcc0).some(
          (_0x38fda1) => _0x38fda1 !== _0x577059 && _0x3afcc0[_0x38fda1],
        );
        _0x53e40c.textContent = _0x667ef2 ? _0x45d1f8.typing_status : "";
        _0x53e40c.classList.toggle("conv-status-typing", _0x667ef2);
        _0x5516cf(_0x667ef2);
      },
      (_0x5d388d) => {
        console.error("فشل الاستماع لحالة الكتابة:", _0x5d388d);
      },
    );
    const _0x5ca36c = collection(db, "chats", _0x549509, "messages");
    const _0x2627e6 = query(_0x5ca36c, orderBy("createdAt", "asc"));
    _0x47ca9d = onSnapshot(
      _0x2627e6,
      (_0x1c1646) => {
        if (!_0x1c1646.metadata.fromCache) {
          _0x582e04();
          _0x2aa94d();
        }
        const _0x3ce716 = _0x1c1646.docs;
        const _0x360197 = _0x3ce716.filter((_0x484a81) => {
          const _0x14f93e = _0x484a81.data();
          const _0x10e39f = _0x14f93e.deletedFor || [];
          return !_0x10e39f.includes(_0x577059);
        });
        _0xcd2a21 = new Map(
          _0x360197.map((_0x3e1e14) => [_0x3e1e14.id, _0x3e1e14.data()]),
        );
        if (!_0x360197.length) {
          _0x43c778();
          window.__czLastMsgFp = null;
          return;
        }
        const __czFp = _0x360197
          .map(function (_d) {
            var __dd = _d.data();
            return (
              _d.id +
              ":" +
              (__dd.status || "") +
              ":" +
              (__dd.text ? __dd.text.length : 0) +
              ":" +
              (__dd.deleted ? 1 : 0) +
              ":" +
              (__dd.edited ? 1 : 0)
            );
          })
          .join("|");
        if (window.__czLastMsgFp === __czFp) {
          _0x8a6c36(_0x360197);
          return;
        }
        const _0x1eaf01 = window.__czLastMsgFp;
        window.__czLastMsgFp = __czFp;
        _0x9f10ba(_0x360197, _0x1eaf01);
        if (_0x22c646) {
          const _0x4acc31 = new Set(_0x360197.map((_0x757995) => _0x757995.id));
          [..._0x5c0c12.keys()].forEach((_0x39a600) => {
            if (!_0x4acc31.has(_0x39a600)) {
              _0x5c0c12.delete(_0x39a600);
              return;
            }
            const _0x3d25da = _0x4f8ac5.querySelector(
              '.msg-row[data-msg-id="' + _0x39a600 + '"]',
            );
            if (_0x3d25da) {
              _0x3d25da.classList.add("multi-selected");
            }
          });
          _0x3528bb();
        }
        _0x8a6c36(_0x360197);
      },
      (_0x3071f5) => {
        console.error("فشل الاستماع للرسايل:", _0x3071f5);
      },
    );
  }
  const _0x314967 = _0x4c9e47.toLowerCase();
  let _0x6f1a02 = false;
  function _0x8a6c36(_0x2563fc) {
    const _0x1fc652 =
      window.CZPrivacy && window.CZPrivacy.areReadReceiptsHidden
        ? window.CZPrivacy.areReadReceiptsHidden()
        : false;
    if (_0x1fc652 || _0x59282a) {
      return;
    }
    if (_0x6f1a02) {
      return;
    }
    const _0x7d3c19 = [];
    _0x2563fc.forEach((_0x75ff4) => {
      const _0x540283 = _0x75ff4.data();
      const _0x36c966 =
        (_0x540283.senderEmail || "").toLowerCase() !== _0x314967;
      const _0x373534 = _0x540283.status === "unread";
      if (_0x36c966 && _0x373534) {
        _0x7d3c19.push(_0x75ff4.ref);
      }
    });
    if (_0x7d3c19.length) {
      _0x6f1a02 = true;
      const _0x9b2e40 = writeBatch(db);
      _0x7d3c19.forEach((_0x3f4a91) => {
        _0x9b2e40.update(_0x3f4a91, {
          status: "read",
        });
      });
      _0x9b2e40
        .commit()
        .catch((_0x8c3d71) => {
          console.error("فشل تحديث حالة الرسايل إلى مقروءة:", _0x8c3d71);
        })
        .finally(() => {
          _0x6f1a02 = false;
        });
    }
  }
  function _0xfecab6() {
    const _0x2dfefc = _0x1f8f26.value.trim();
    if (!_0x2dfefc || !_0x577059) {
      return;
    }
    _0x1f8f26.value = "";
    _0x2fea2b();
    _0x6b1658();
    if (_0x2da82) {
      clearTimeout(_0x2da82);
    }
    _0x38c24d(false);
    const _0x1baf53 = {
      senderUid: _0x577059,
      senderEmail: _0x4c9e47,
      text: _0x2dfefc,
      createdAt: serverTimestamp(),
      status: "unread",
    };
    if (_0x45b267) {
      _0x1baf53.replyTo = {
        id: _0x45b267.id,
        text:
          _0x45b267.text.length > 120
            ? _0x45b267.text.slice(0, 120)
            : _0x45b267.text,
      };
    }
    const _0x438d90 = collection(db, "chats", _0x549509, "messages");
    addDoc(_0x438d90, _0x1baf53)
      .then(() => {
        if (navigator.vibrate) {
          try {
            navigator.vibrate(6);
          } catch (_0x107baa) {}
        }
      })
      .catch((_0x4b932f) => {
        console.error("فشل إرسال الرسالة:", _0x4b932f);
      });
    _0x45ccd7();
  }
  _0x5ebf0a.addEventListener("click", _0xfecab6);
  _0x2aaa88().catch((_0x4a7433) => {
    console.error(
      "فشل تهيئة المحادثة. الكود:",
      _0x4a7433 && _0x4a7433.code,
      "— الرسالة:",
      _0x4a7433 && _0x4a7433.message,
      _0x4a7433,
    );
  });
  window.addEventListener("unload", () => {
    if (_0x47ca9d) {
      _0x47ca9d();
    }
    _0x38c24d(false);
  });
})();
