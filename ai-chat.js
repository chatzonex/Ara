const AI_WORKER_URL = "https://chatzone-ai.m7ashr213.workers.dev/";
const AI_MODEL = "openai/gpt-oss-120b";
(function () {
  const _0x4c7b7b = localStorage.getItem("cz_lang") || "ar";
  const _0x150833 = localStorage.getItem("cz_theme") || "dark";
  const _0x1c5fe6 = _0x4c7b7b === "ar";
  document.documentElement.lang = _0x4c7b7b;
  document.documentElement.dir = _0x1c5fe6 ? "rtl" : "ltr";
  if (_0x150833 === "white") {
    document.body.classList.add("theme-white");
  }
  if (_0x150833 === "custom") {
    document.body.classList.add("theme-custom");
    const _0x3dfd30 = localStorage.getItem("cz_theme_color");
    if (_0x3dfd30) {
      document.documentElement.style.setProperty("--accent", _0x3dfd30);
    }
  }
  if (localStorage.getItem("cz_lg_chat") === "on") {
    document.body.classList.add("lg-chat-on");
  }
  const _0x5f1999 = {
    ar: {
      status_online: "متصل الآن",
      status_typing: "بيكتب الآن...",
      welcome_sub: "اسألني أي حاجة، هساعدك دلوقتي",
      first_greeting: "أهلاً! أنا ChatZone Ai، أقدر أساعدك في إيه النهارده؟",
      menu_bubbles_title: "تخصيص لون الفقاعات",
      menu_bubbles_sub: "غيّر لون فقاعات شات الـ AI بس",
      menu_clear_title: "مسح المحادثة",
      menu_clear_sub: "يمسح شات الـ AI بالكامل",
      bubbles_sheet_title: "تخصيص لون الفقاعات",
      bubbles_sheet_sub: "الألوان دي هتتطبق في شات الـ AI بس.",
      bubble_preview_theirs: "أهلا، أقدر أساعدك في إيه؟",
      bubble_preview_mine: "أهلا",
      bubble_option_mine: "لون فقاعتي",
      bubble_option_theirs: "لون فقاعة ChatZone Ai",
      bubble_reset: "إرجاع الافتراضي",
      choose_color_title_mine: "لون فقاعتي",
      choose_color_title_theirs: "لون فقاعة ChatZone Ai",
      color_editor: "محرر الألوان (اختر أي لون)",
      color_presets: "ألوان الفقاعات الخاصة بالتطبيق",
      presets_title: "ألوان الفقاعات الخاصة بالتطبيق",
      color_save: "حفظ",
      color_cancel: "إلغاء",
      editor_title: "اختر لون",
      editor_sub:
        "دوس حفظ عشان اللون يتطبق، أو إلغاء عشان ترجع من غير أي تغيير.",
      ctx_reply: "رد",
      ctx_copy: "نسخ",
      ctx_select: "تحديد",
      ctx_delete: "حذف الرسالة",
      delete_msg_title: "حذف الرسالة؟",
      delete_msg_sub: "هتتحذف من الشات ده بس عندك.",
      delete_selected_title: "حذف الرسائل المحددة؟",
      delete_selected_sub: "هتتحذف كل الرسايل المحددة من الشات ده.",
      btn_delete: "حذف",
      btn_cancel: "إلغاء",
      clear_confirm_title: "مسح المحادثة بالكامل؟",
      clear_confirm_sub: "هتتمسح كل الرسايل ولن تقدر تسترجعها تاني.",
      clear_confirm_btn: "مسح",
      deleted_msg_text: "تم حذف هذه الرسالة",
      reply_you: "أنت",
      reply_ai: "ChatZone Ai",
      copied_toast: "اتنسخت الرسالة",
      deleted_toast: "اتحذفت الرسالة",
      placeholder: "اكتب رسالة...",
      error_connection:
        "حصلت مشكلة في الاتصال بالذكاء الاصطناعي، حاول تاني. لو المشكلة استمرت كلّم الدعم على 01019569018.",
      error_network:
        "في مشكلة في الاتصال بالإنترنت، جرب تاني. لو المشكلة استمرت كلّم الدعم على 01019569018.",
      error_fallback:
        "معرفتش أرد دلوقتي، حاول تسأل بطريقة تانية. لو المشكلة استمرت كلّم الدعم على 01019569018.",
      default: "افتراضي",
      dark: "داكن",
      silver: "فضي",
      green: "أخضر",
      blue: "أزرق",
      pink: "وردي",
      purple: "بنفسجي",
      orange: "برتقالي",
      cyan: "سماوي",
      red: "أحمر",
    },
    en: {
      status_online: "Online",
      status_typing: "Typing...",
      welcome_sub: "Ask me anything, I'm here to help",
      first_greeting: "Hi! I'm ChatZone Ai, how can I help you today?",
      menu_bubbles_title: "Customize bubble colors",
      menu_bubbles_sub: "Changes only the AI chat bubble colors",
      menu_clear_title: "Clear chat",
      menu_clear_sub: "Clears the entire AI chat",
      bubbles_sheet_title: "Customize bubble colors",
      bubbles_sheet_sub: "These colors only apply to the AI chat.",
      bubble_preview_theirs: "Hi, how can I help?",
      bubble_preview_mine: "Hello",
      bubble_option_mine: "My bubble color",
      bubble_option_theirs: "ChatZone Ai bubble color",
      bubble_reset: "Reset to default",
      choose_color_title_mine: "My bubble color",
      choose_color_title_theirs: "ChatZone Ai bubble color",
      color_editor: "Color editor (pick any color)",
      color_presets: "App bubble color presets",
      presets_title: "App bubble color presets",
      color_save: "Save",
      color_cancel: "Cancel",
      editor_title: "Choose a color",
      editor_sub:
        "Tap save to apply the color, or cancel to go back without changes.",
      ctx_reply: "Reply",
      ctx_copy: "Copy",
      ctx_select: "Select",
      ctx_delete: "Delete message",
      delete_msg_title: "Delete message?",
      delete_msg_sub: "This will only delete it from this chat on your device.",
      delete_selected_title: "Delete selected messages?",
      delete_selected_sub:
        "All selected messages in this chat will be deleted.",
      btn_delete: "Delete",
      btn_cancel: "Cancel",
      clear_confirm_title: "Clear the entire chat?",
      clear_confirm_sub:
        "All messages will be deleted and cannot be recovered.",
      clear_confirm_btn: "Clear",
      deleted_msg_text: "This message was deleted",
      reply_you: "You",
      reply_ai: "ChatZone Ai",
      copied_toast: "Message copied",
      deleted_toast: "Message deleted",
      placeholder: "Type a message...",
      error_connection:
        "There was a problem reaching the AI, please try again. If it keeps happening, contact support at 01019569018.",
      error_network:
        "There's a connection problem, please try again. If it keeps happening, contact support at 01019569018.",
      error_fallback:
        "I couldn't answer that, try asking differently. If it keeps happening, contact support at 01019569018.",
      default: "Default",
      dark: "Dark",
      silver: "Silver",
      green: "Green",
      blue: "Blue",
      pink: "Pink",
      purple: "Purple",
      orange: "Orange",
      cyan: "Cyan",
      red: "Red",
    },
  };
  const _0x564c7b = _0x5f1999[_0x4c7b7b] || _0x5f1999.ar;
  function _0x283b18() {
    const _0xc8a613 = {
      aiStatusText: _0x564c7b.status_online,
      aiWelcomeSub: _0x564c7b.welcome_sub,
      aiMenuBubblesTitle: _0x564c7b.menu_bubbles_title,
      aiMenuBubblesSub: _0x564c7b.menu_bubbles_sub,
      aiMenuClearTitle: _0x564c7b.menu_clear_title,
      aiMenuClearSub: _0x564c7b.menu_clear_sub,
      aiBubblesSheetTitle: _0x564c7b.bubbles_sheet_title,
      aiBubblesSheetSub: _0x564c7b.bubbles_sheet_sub,
      aiBubblePreviewTheirsText: _0x564c7b.bubble_preview_theirs,
      aiBubblePreviewMineText: _0x564c7b.bubble_preview_mine,
      aiBubbleOptionMineLabel: _0x564c7b.bubble_option_mine,
      aiBubbleOptionTheirsLabel: _0x564c7b.bubble_option_theirs,
      bubbleResetBtn: _0x564c7b.bubble_reset,
      aiColorEditorLabel: _0x564c7b.color_editor,
      aiColorPresetsLabel: _0x564c7b.color_presets,
      aiPresetsTitle: _0x564c7b.presets_title,
      presetsCancelBtn: _0x564c7b.color_cancel,
      presetsSaveBtn: _0x564c7b.color_save,
      aiEditorTitle: _0x564c7b.editor_title,
      aiEditorSub: _0x564c7b.editor_sub,
      editorCancelBtn: _0x564c7b.color_cancel,
      editorSaveBtn: _0x564c7b.color_save,
      aiCtxReply: _0x564c7b.ctx_reply,
      aiCtxCopy: _0x564c7b.ctx_copy,
      aiCtxSelect: _0x564c7b.ctx_select,
      aiCtxDelete: _0x564c7b.ctx_delete,
      aiDeleteMsgTitle: _0x564c7b.delete_msg_title,
      aiDeleteMsgSub: _0x564c7b.delete_msg_sub,
      deleteMsgConfirmBtn: _0x564c7b.btn_delete,
      aiDeleteMsgCancel: _0x564c7b.btn_cancel,
      aiDeleteSelectedTitle: _0x564c7b.delete_selected_title,
      aiDeleteSelectedSub: _0x564c7b.delete_selected_sub,
      deleteSelectedConfirmBtn: _0x564c7b.btn_delete,
      aiDeleteSelectedCancel: _0x564c7b.btn_cancel,
      aiClearConfirmTitle: _0x564c7b.clear_confirm_title,
      aiClearConfirmSub: _0x564c7b.clear_confirm_sub,
      aiClearConfirmBtn: _0x564c7b.clear_confirm_btn,
      aiClearCancelBtn: _0x564c7b.btn_cancel,
    };
    Object.keys(_0xc8a613).forEach((_0x50ebaa) => {
      const _0x5ee710 = document.getElementById(_0x50ebaa);
      if (_0x5ee710) {
        _0x5ee710.textContent = _0xc8a613[_0x50ebaa];
      }
    });
    const _0x4c4630 = {
      "#FFFFFF": _0x564c7b.default,
      "#1B2027": _0x564c7b.dark,
      "#C9CDD3": _0x564c7b.silver,
      "#25D9A0": _0x564c7b.green,
      "#5B7FFF": _0x564c7b.blue,
      "#ec4899": _0x564c7b.pink,
      "#a78bfa": _0x564c7b.purple,
      "#f59e0b": _0x564c7b.orange,
      "#06b6d4": _0x564c7b.cyan,
      "#ef4444": _0x564c7b.red,
    };
    document.querySelectorAll(".preset-square-option").forEach((_0x44cdf3) => {
      const _0x84966e = _0x4c4630[_0x44cdf3.dataset.color];
      const _0xdaf52f = _0x44cdf3.querySelector("span");
      if (_0x84966e && _0xdaf52f) {
        _0xdaf52f.textContent = _0x84966e;
      }
    });
    const _0x1c5693 = document.getElementById("aiTextarea");
    if (_0x1c5693) {
      _0x1c5693.placeholder = _0x564c7b.placeholder;
    }
  }
  _0x283b18();
  const _0x5ebbbc = document.getElementById("convMessages");
  const _0x49cc7e = document.getElementById("aiWelcome");
  const _0x51a79e = document.getElementById("aiTextarea");
  const _0xf2ad07 = document.getElementById("aiSendBtn");
  const _0x326a78 = document.getElementById("convInputBar");
  const _0x54c312 = document.getElementById("convBackBtn");
  const _0x41d686 = document.getElementById("convMenuBtn");
  const _0x261894 = document.getElementById("convSidebarMenu");
  const _0x3c21dd = document.getElementById("convSidebarOverlay");
  const _0x374716 = document.getElementById("aiClearChatBtn");
  const _0x387507 = document.getElementById("aiStatusText");
  const _0x8739f9 = document.querySelector(".ai-chat-shell");
  const _0x3ca881 = _0x8739f9;
  const _0x367d47 = document.getElementById("convReplyBar");
  const _0x4d9372 = document.getElementById("convReplyBarName");
  const _0x242879 = document.getElementById("convReplyBarPreview");
  const _0x359a71 = document.getElementById("convReplyBarClose");
  const _0x82812e = document.getElementById("convTopbarNormal");
  const _0x4ca5ee = document.getElementById("convTopbarSelect");
  const _0x5a5beb = document.getElementById("convSelectCancelBtn");
  const _0x26c472 = document.getElementById("convSelectCount");
  const _0xff3d70 = document.getElementById("convSelectDeleteBtn");
  const _0x36941f = "cz_ai_chat_history";
  function _0x5e8283() {
    try {
      const _0x567f18 = localStorage.getItem(_0x36941f);
      if (_0x567f18) {
        return JSON.parse(_0x567f18);
      } else {
        return [];
      }
    } catch (_0x1ad336) {
      return [];
    }
  }
  function _0x853bf6(_0x42df74) {
    try {
      localStorage.setItem(_0x36941f, JSON.stringify(_0x42df74));
    } catch (_0x2c88b6) {}
  }
  let _0x3e1dee = _0x5e8283();
  let _0x2da705 = Date.now();
  function _0x45c27e() {
    _0x2da705 += 1;
    return "m" + _0x2da705;
  }
  _0x3e1dee.forEach((_0x5dd8f2) => {
    if (!_0x5dd8f2.id) {
      _0x5dd8f2.id = _0x45c27e();
    }
  });
  if (_0x54c312) {
    _0x54c312.addEventListener("click", () => {
      window.location.href = "MainActivity.html";
    });
  }
  function _0x104ede() {
    if (!_0x261894 || !_0x3c21dd || !_0x41d686) {
      return;
    }
    const _0x5ec309 = document.documentElement.dir === "rtl";
    const _0x272e1a = _0x41d686.getBoundingClientRect();
    _0x261894.style.top = _0x272e1a.bottom + 8 + "px";
    if (_0x5ec309) {
      _0x261894.style.right = window.innerWidth - _0x272e1a.right + "px";
      _0x261894.style.left = "auto";
    } else {
      _0x261894.style.left = _0x272e1a.left + "px";
      _0x261894.style.right = "auto";
    }
    _0x261894.classList.add("open");
    _0x3c21dd.classList.add("open");
  }
  function _0x3e81d1() {
    if (!_0x261894 || !_0x3c21dd) {
      return;
    }
    _0x261894.classList.remove("open");
    _0x3c21dd.classList.remove("open");
  }
  if (_0x41d686) {
    _0x41d686.addEventListener("click", () => {
      if (_0x261894 && _0x261894.classList.contains("open")) {
        _0x3e81d1();
      } else {
        _0x104ede();
      }
    });
  }
  if (_0x3c21dd) {
    _0x3c21dd.addEventListener("click", _0x3e81d1);
  }
  function _0x15f81a(_0x5e9b3d) {
    const _0x23f0c6 = document.getElementById(_0x5e9b3d);
    if (_0x23f0c6) {
      _0x23f0c6.classList.add("open");
    }
  }
  function _0x23fc19(_0x3ac1ef) {
    const _0x5d4eb0 = document.getElementById(_0x3ac1ef);
    if (_0x5d4eb0) {
      _0x5d4eb0.classList.remove("open");
    }
  }
  document.querySelectorAll("[data-close-sheet]").forEach((_0xe78108) => {
    _0xe78108.addEventListener("click", () =>
      _0x23fc19(_0xe78108.dataset.closeSheet),
    );
  });
  document.querySelectorAll(".sheet-overlay").forEach((_0x31a0d5) => {
    _0x31a0d5.addEventListener("click", (_0x209314) => {
      if (_0x209314.target === _0x31a0d5) {
        _0x23fc19(_0x31a0d5.id);
      }
    });
  });
  const _0x23f36a = document.getElementById("convOpenBubbleColors");
  if (_0x23f36a) {
    _0x23f36a.addEventListener("click", () => {
      _0x3e81d1();
      _0x15f81a("sheet-bubble-colors");
    });
  }
  let _0x3f376c = null;
  function _0x3ee2e3(_0x48b77b) {
    let _0x174a3f = document.getElementById("czToast");
    if (!_0x174a3f) {
      _0x174a3f = document.createElement("div");
      _0x174a3f.id = "czToast";
      _0x174a3f.className = "cz-toast";
      document.body.appendChild(_0x174a3f);
    }
    _0x174a3f.textContent = _0x48b77b;
    _0x174a3f.classList.add("show");
    if (_0x3f376c) {
      clearTimeout(_0x3f376c);
    }
    _0x3f376c = setTimeout(() => _0x174a3f.classList.remove("show"), 2200);
  }
  const _0x5b3d52 = "cz_ai_bubble_mine";
  const _0x48f52e = "cz_ai_bubble_mine_dark";
  const _0xdc075b = "cz_ai_bubble_theirs";
  const _0x4ee4bd = "cz_ai_bubble_theirs_dark";
  function _0x34e4da() {
    return document.body.classList.contains("theme-white");
  }
  function _0x1e43e9() {
    if (_0x34e4da()) {
      return "#DCF8C6";
    } else {
      return "#005C4B";
    }
  }
  function _0x37c914() {
    if (_0x34e4da()) {
      return "#F0F4F2";
    } else {
      return "#1B2027";
    }
  }
  function _0x1237de(_0x46e803) {
    if (_0x46e803 === "1") {
      return "#10161A";
    } else {
      return "#FFFFFF";
    }
  }
  function _0x1817b7(_0x2ac92f) {
    if (_0x2ac92f === "1") {
      return "rgba(16, 22, 26, 0.55)";
    } else {
      return "rgba(255, 255, 255, 0.7)";
    }
  }
  function _0x7d2281(_0x11db75) {
    const _0x507282 = _0x11db75.replace("#", "");
    const _0x36e11d = parseInt(_0x507282.substring(0, 2), 16);
    const _0x4cb589 = parseInt(_0x507282.substring(2, 4), 16);
    const _0x44fa51 = parseInt(_0x507282.substring(4, 6), 16);
    const _0x515cd5 =
      (_0x36e11d * 299 + _0x4cb589 * 587 + _0x44fa51 * 114) / 1000;
    if (_0x515cd5 > 150) {
      return "1";
    } else {
      return "0";
    }
  }
  function _0x5ed9c9() {
    return localStorage.getItem(_0x5b3d52);
  }
  function _0x2b75fb() {
    return localStorage.getItem(_0x48f52e) || "1";
  }
  function _0xee7f8e() {
    return localStorage.getItem(_0xdc075b);
  }
  function _0x471df4() {
    return localStorage.getItem(_0x4ee4bd) || "1";
  }
  function _0x9e7f6e() {
    if (!_0x3ca881) {
      return;
    }
    const _0x3ee2dc = _0x5ed9c9();
    const _0x3daa88 = _0xee7f8e();
    const _0x55a822 = _0x2b75fb();
    const _0x23a138 = _0x471df4();
    if (_0x3ee2dc) {
      _0x3ca881.style.setProperty("--bubble-mine-bg", _0x3ee2dc);
      _0x3ca881.style.setProperty("--bubble-mine-text", _0x1237de(_0x55a822));
      _0x3ca881.style.setProperty("--bubble-mine-time", _0x1817b7(_0x55a822));
    } else {
      _0x3ca881.style.removeProperty("--bubble-mine-bg");
      _0x3ca881.style.removeProperty("--bubble-mine-text");
      _0x3ca881.style.removeProperty("--bubble-mine-time");
    }
    if (_0x3daa88) {
      _0x3ca881.style.setProperty("--ai-bubble-bg", _0x3daa88);
      _0x3ca881.style.setProperty("--ai-bubble-text", _0x1237de(_0x23a138));
      _0x3ca881.style.setProperty("--ai-bubble-time", _0x1817b7(_0x23a138));
    } else {
      _0x3ca881.style.removeProperty("--ai-bubble-bg");
      _0x3ca881.style.removeProperty("--ai-bubble-text");
      _0x3ca881.style.removeProperty("--ai-bubble-time");
    }
  }
  const _0x15bcf0 = document.getElementById("bubblePreviewMine");
  const _0x2ca400 = document.getElementById("bubblePreviewTheirs");
  const _0x347aa0 = document.getElementById("bubbleOptionMineSwatch");
  const _0x49fc6c = document.getElementById("bubbleOptionTheirsSwatch");
  function _0x45956f() {
    const _0x3cffe3 = _0x5ed9c9() || _0x1e43e9();
    const _0x10f275 = _0xee7f8e() || _0x37c914();
    const _0x313176 = _0x2b75fb();
    const _0x589667 = _0x471df4();
    if (_0x15bcf0) {
      _0x15bcf0.style.background = _0x3cffe3;
      _0x15bcf0.style.color = _0x1237de(_0x313176);
    }
    if (_0x2ca400) {
      _0x2ca400.style.background = _0x10f275;
      _0x2ca400.style.color = _0x1237de(_0x589667);
    }
    if (_0x347aa0) {
      _0x347aa0.style.background = _0x3cffe3;
    }
    if (_0x49fc6c) {
      _0x49fc6c.style.background = _0x10f275;
    }
  }
  const _0x49c439 = document.getElementById("chooseColorTitle");
  const _0x23ecda = document.getElementById("openColorEditorBtn");
  const _0x4ee56d = document.getElementById("openColorPresetsBtn");
  const _0x4b45e0 = document.getElementById("bubbleColorNativePicker");
  const _0x569f82 = document.getElementById("colorEditorPreviewSwatch");
  const _0x5b8914 = document.getElementById("editorSaveBtn");
  const _0x1a2fb8 = document.getElementById("editorCancelBtn");
  const _0x1506be = document.getElementById("presetSquareGrid");
  const _0x185b0b = document.getElementById("presetsSaveBtn");
  const _0x2631fd = document.getElementById("presetsCancelBtn");
  let _0x178b2d = null;
  let _0x3014e5 = null;
  let _0xa9040d = "1";
  let _0x516285 = null;
  function _0x2a071f(_0x5ea6f4) {
    _0x178b2d = _0x5ea6f4;
    if (_0x49c439) {
      _0x49c439.textContent =
        _0x5ea6f4 === "mine"
          ? _0x564c7b.choose_color_title_mine
          : _0x564c7b.choose_color_title_theirs;
    }
    _0x15f81a("sheet-choose-color");
  }
  const _0x438439 = document.getElementById("bubbleOptionMine");
  const _0x51f458 = document.getElementById("bubbleOptionTheirs");
  if (_0x438439) {
    _0x438439.addEventListener("click", () => _0x2a071f("mine"));
  }
  if (_0x51f458) {
    _0x51f458.addEventListener("click", () => _0x2a071f("theirs"));
  }
  if (_0x23ecda && _0x4b45e0) {
    _0x23ecda.addEventListener("click", () => {
      const _0xce4eb5 =
        _0x178b2d === "mine"
          ? _0x5ed9c9() || _0x1e43e9()
          : _0xee7f8e() || _0x37c914();
      _0x4b45e0.value = _0xce4eb5;
      _0x4b45e0.click();
    });
    _0x4b45e0.addEventListener("input", () => {
      _0x3014e5 = _0x4b45e0.value;
      _0xa9040d = _0x7d2281(_0x3014e5);
      if (_0x569f82) {
        _0x569f82.style.background = _0x3014e5;
      }
      _0x23fc19("sheet-choose-color");
      _0x15f81a("sheet-color-editor-confirm");
    });
  }
  function _0x256831(_0x4bf538, _0x420bd4, _0x5e6316) {
    if (_0x4bf538 === "mine") {
      localStorage.setItem(_0x5b3d52, _0x420bd4);
      localStorage.setItem(_0x48f52e, _0x5e6316);
    } else {
      localStorage.setItem(_0xdc075b, _0x420bd4);
      localStorage.setItem(_0x4ee4bd, _0x5e6316);
    }
    _0x9e7f6e();
    _0x45956f();
  }
  if (_0x5b8914) {
    _0x5b8914.addEventListener("click", () => {
      if (_0x178b2d && _0x3014e5) {
        _0x256831(_0x178b2d, _0x3014e5, _0xa9040d);
      }
      _0x3014e5 = null;
      _0x23fc19("sheet-color-editor-confirm");
    });
  }
  if (_0x1a2fb8) {
    _0x1a2fb8.addEventListener("click", () => {
      _0x3014e5 = null;
      _0x23fc19("sheet-color-editor-confirm");
    });
  }
  if (_0x4ee56d) {
    _0x4ee56d.addEventListener("click", () => {
      _0x23fc19("sheet-choose-color");
      document
        .querySelectorAll(".preset-square-option")
        .forEach((_0x278fe6) => _0x278fe6.classList.remove("selected"));
      _0x516285 = null;
      _0x15f81a("sheet-color-presets");
    });
  }
  if (_0x1506be) {
    _0x1506be.querySelectorAll(".preset-square-option").forEach((_0x3f5130) => {
      _0x3f5130.addEventListener("click", () => {
        _0x1506be
          .querySelectorAll(".preset-square-option")
          .forEach((_0x758909) => _0x758909.classList.remove("selected"));
        _0x3f5130.classList.add("selected");
        _0x516285 = {
          color: _0x3f5130.dataset.color,
          isDark: _0x3f5130.dataset.textDark,
        };
      });
    });
  }
  if (_0x185b0b) {
    _0x185b0b.addEventListener("click", () => {
      if (_0x178b2d && _0x516285) {
        _0x256831(_0x178b2d, _0x516285.color, _0x516285.isDark);
      }
      _0x516285 = null;
      _0x23fc19("sheet-color-presets");
    });
  }
  if (_0x2631fd) {
    _0x2631fd.addEventListener("click", () => {
      _0x516285 = null;
      _0x23fc19("sheet-color-presets");
    });
  }
  const _0x5e2c64 = document.getElementById("bubbleResetBtn");
  if (_0x5e2c64) {
    _0x5e2c64.addEventListener("click", () => {
      localStorage.removeItem(_0x5b3d52);
      localStorage.removeItem(_0x48f52e);
      localStorage.removeItem(_0xdc075b);
      localStorage.removeItem(_0x4ee4bd);
      _0x9e7f6e();
      _0x45956f();
    });
  }
  _0x9e7f6e();
  _0x45956f();
  function _0x54ff81() {
    _0x49cc7e.classList.remove("ai-welcome-hidden");
  }
  function _0x1e1d9f() {
    _0x49cc7e.classList.add("ai-welcome-hidden");
  }
  function _0x36a48c(_0x5a6caa) {
    let _0x2929b6 = _0x5a6caa.getHours();
    const _0x57fa86 = _0x5a6caa.getMinutes().toString().padStart(2, "0");
    if (_0x1c5fe6) {
      const _0x1466f6 = _0x2929b6 < 12 ? "ص" : "م";
      _0x2929b6 = _0x2929b6 % 12 || 12;
      return _0x2929b6 + ":" + _0x57fa86 + " " + _0x1466f6;
    }
    const _0x33e7f3 = _0x2929b6 < 12 ? "AM" : "PM";
    _0x2929b6 = _0x2929b6 % 12 || 12;
    return _0x2929b6 + ":" + _0x57fa86 + " " + _0x33e7f3;
  }
  const _0x427a36 = 46;
  const _0x3dcf99 = 420;
  let _0xd735af = false;
  let _0x176025 = new Map();
  let _0x2f5ab8 = null;
  function _0x416d45(_0x2fd189) {
    if (_0x2fd189.deleted) {
      return _0x564c7b.deleted_msg_text;
    }
    return (_0x2fd189.content || "").slice(0, 120);
  }
  function _0x3ab030(_0x575f16) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(_0x575f16)
        .then(() => _0x3ee2e3(_0x564c7b.copied_toast))
        .catch(() => {});
    } else {
      const _0x408f5f = document.createElement("textarea");
      _0x408f5f.value = _0x575f16;
      document.body.appendChild(_0x408f5f);
      _0x408f5f.select();
      try {
        document.execCommand("copy");
        _0x3ee2e3(_0x564c7b.copied_toast);
      } catch (_0x288f99) {}
      document.body.removeChild(_0x408f5f);
    }
  }
  function _0x1941fd(_0x2ba3de) {
    return _0x3e1dee.find((_0xa33155) => _0xa33155.id === _0x2ba3de);
  }
  const _0x487ba7 = /(https?:\/\/[^\s<>"']+)/g;
  function _0x44ccd2(_0x202d29, _0x40e063) {
    _0x202d29.textContent = "";
    const _0x436d0c = String(_0x40e063 || "").split(_0x487ba7);
    _0x436d0c.forEach((_0x2a6815) => {
      if (!_0x2a6815) {
        return;
      }
      if (/^https?:\/\//.test(_0x2a6815)) {
        const _0x53aef1 = document.createElement("a");
        _0x53aef1.className = "bubble-inline-link";
        _0x53aef1.href = _0x2a6815;
        _0x53aef1.target = "_blank";
        _0x53aef1.rel = "noopener noreferrer";
        _0x53aef1.textContent = _0x2a6815;
        _0x202d29.appendChild(_0x53aef1);
      } else {
        _0x202d29.appendChild(document.createTextNode(_0x2a6815));
      }
    });
  }
  function _0x54931d(_0x47ee36) {
    const _0x4a35f0 = _0x47ee36.role === "user";
    const _0x4310a0 = document.createElement("div");
    _0x4310a0.className = "msg-row " + (_0x4a35f0 ? "from-me" : "from-them");
    _0x4310a0.dataset.msgId = _0x47ee36.id;
    const _0xb2dae4 = document.createElement("div");
    _0xb2dae4.className = "msg-row-inner";
    const _0x1f9a04 = document.createElement("div");
    _0x1f9a04.className = "msg-row-select-dot";
    _0x1f9a04.innerHTML =
      '<svg viewBox="0 0 24 24" fill="none" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
    _0xb2dae4.appendChild(_0x1f9a04);
    const _0x209656 = document.createElement("div");
    _0x209656.className = "msg-row-reply-icon";
    _0x209656.innerHTML =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 17 4 12 9 7"></polyline><path d="M20 18v-2a4 4 0 0 0-4-4H4"></path></svg>';
    _0x4310a0.appendChild(_0x209656);
    const _0x5bd433 = document.createElement("div");
    _0x5bd433.className =
      "bubble " + (_0x4a35f0 ? "bubble-right" : "bubble-left bubble-ai");
    if (_0x47ee36.replyTo && _0x47ee36.replyTo.text) {
      const _0x4ba4d5 = document.createElement("div");
      _0x4ba4d5.className = "bubble-reply-quote";
      const _0xa18a1e = document.createElement("span");
      _0xa18a1e.className = "bubble-reply-quote-name";
      _0xa18a1e.textContent = _0x47ee36.replyTo.senderName || "";
      const _0x8dbf4 = document.createElement("span");
      _0x8dbf4.className = "bubble-reply-quote-text";
      _0x8dbf4.textContent = _0x47ee36.replyTo.deleted
        ? _0x564c7b.deleted_msg_text
        : _0x47ee36.replyTo.text;
      _0x4ba4d5.appendChild(_0xa18a1e);
      _0x4ba4d5.appendChild(_0x8dbf4);
      _0x5bd433.appendChild(_0x4ba4d5);
    }
    const _0x17bca5 = document.createElement("p");
    _0x17bca5.className = "bubble-text" + (_0x47ee36.deleted ? " deleted" : "");
    if (_0x47ee36.deleted) {
      _0x17bca5.textContent = _0x564c7b.deleted_msg_text;
    } else {
      _0x44ccd2(_0x17bca5, _0x47ee36.content);
    }
    _0x5bd433.appendChild(_0x17bca5);
    if (
      !_0x47ee36.deleted &&
      Array.isArray(_0x47ee36.sources) &&
      _0x47ee36.sources.length > 0
    ) {
      const _0x3abcad = document.createElement("div");
      _0x3abcad.className = "bubble-sources";
      _0x47ee36.sources.forEach((_0x1ff5f6) => {
        if (!_0x1ff5f6 || !_0x1ff5f6.link) {
          return;
        }
        const _0x22aca4 = document.createElement("a");
        _0x22aca4.className = "bubble-source-link";
        _0x22aca4.href = _0x1ff5f6.link;
        _0x22aca4.target = "_blank";
        _0x22aca4.rel = "noopener noreferrer";
        _0x22aca4.textContent =
          _0x1ff5f6.title && _0x1ff5f6.title.trim()
            ? _0x1ff5f6.title
            : _0x1ff5f6.link;
        _0x3abcad.appendChild(_0x22aca4);
      });
      if (_0x3abcad.childElementCount > 0) {
        _0x5bd433.appendChild(_0x3abcad);
      }
    }
    const _0xf5f685 = document.createElement("div");
    _0xf5f685.className = "bubble-meta";
    const _0x4d3422 = document.createElement("span");
    _0x4d3422.className = "bubble-time";
    _0x4d3422.textContent = _0x36a48c(new Date(_0x47ee36.ts || Date.now()));
    _0xf5f685.appendChild(_0x4d3422);
    _0x5bd433.appendChild(_0xf5f685);
    _0xb2dae4.appendChild(_0x5bd433);
    _0x4310a0.appendChild(_0xb2dae4);
    _0x5ebbbc.appendChild(_0x4310a0);
    if (!_0x47ee36.deleted) {
      _0x5234c0(_0x4310a0, _0x47ee36, _0x4a35f0);
    }
    return _0x4310a0;
  }
  function _0x20e773() {
    if (_0x26c472) {
      _0x26c472.textContent = String(_0x176025.size);
    }
  }
  function _0x5be730(_0x1c14c9, _0xd631a9) {
    _0xd735af = true;
    document.body.classList.add("select-mode-on");
    _0x176025.clear();
    if (_0x1c14c9) {
      _0x176025.set(_0x1c14c9, _0xd631a9);
      const _0x201860 = _0x5ebbbc.querySelector(
        '.msg-row[data-msg-id="' + _0x1c14c9 + '"]',
      );
      if (_0x201860) {
        _0x201860.classList.add("multi-selected");
      }
    }
    _0x20e773();
  }
  function _0x38691e() {
    _0xd735af = false;
    document.body.classList.remove("select-mode-on");
    _0x176025.clear();
    _0x5ebbbc
      .querySelectorAll(".msg-row.multi-selected")
      .forEach((_0x4c78d0) => _0x4c78d0.classList.remove("multi-selected"));
  }
  function _0x249735(_0x156235, _0x188cfe, _0x133bd5) {
    if (_0x176025.has(_0x188cfe)) {
      _0x176025.delete(_0x188cfe);
      _0x156235.classList.remove("multi-selected");
    } else {
      _0x176025.set(_0x188cfe, _0x133bd5);
      _0x156235.classList.add("multi-selected");
    }
    if (_0x176025.size === 0) {
      _0x38691e();
    } else {
      _0x20e773();
    }
  }
  if (_0x5a5beb) {
    _0x5a5beb.addEventListener("click", _0x38691e);
  }
  if (_0xff3d70) {
    _0xff3d70.addEventListener("click", () => {
      if (_0x176025.size === 0) {
        return;
      }
      _0x15f81a("sheet-delete-selected");
    });
  }
  const _0x58fc7c = document.getElementById("deleteSelectedConfirmBtn");
  if (_0x58fc7c) {
    _0x58fc7c.addEventListener("click", () => {
      const _0x52c478 = new Set(_0x176025.keys());
      _0x3e1dee = _0x3e1dee.filter((_0xe697ec) => !_0x52c478.has(_0xe697ec.id));
      _0x853bf6(_0x3e1dee);
      _0x23fc19("sheet-delete-selected");
      _0x38691e();
      _0x4c1924();
      _0x3ee2e3(_0x564c7b.deleted_toast);
    });
  }
  function _0x5234c0(_0x599104, _0x5c280a, _0x2c0204) {
    const _0x2fc266 = _0x599104.querySelector(".msg-row-inner");
    const _0x277e04 = _0x5c280a.id;
    _0x599104.addEventListener("click", (_0x5bb0c4) => {
      if (!_0xd735af) {
        return;
      }
      _0x5bb0c4.preventDefault();
      _0x5bb0c4.stopPropagation();
      _0x249735(_0x599104, _0x277e04, _0x2c0204);
    });
    let _0x925d46 = 0;
    let _0x416ce3 = 0;
    let _0x2f7e43 = false;
    let _0x2c708d = 0;
    _0x599104.addEventListener(
      "touchstart",
      (_0x9ab34b) => {
        if (_0xd735af) {
          return;
        }
        const _0x49c613 = _0x9ab34b.touches[0];
        _0x925d46 = _0x49c613.clientX;
        _0x416ce3 = _0x49c613.clientY;
        _0x2f7e43 = false;
        _0x2c708d = 0;
      },
      {
        passive: true,
      },
    );
    _0x599104.addEventListener(
      "touchmove",
      (_0x411174) => {
        if (_0xd735af) {
          return;
        }
        const _0x84caa2 = _0x411174.touches[0];
        const _0x56fc70 = _0x84caa2.clientX - _0x925d46;
        const _0x1b4020 = _0x84caa2.clientY - _0x416ce3;
        if (
          !_0x2f7e43 &&
          Math.abs(_0x56fc70) > 12 &&
          Math.abs(_0x56fc70) > Math.abs(_0x1b4020)
        ) {
          _0x2f7e43 = true;
        }
        if (_0x2f7e43) {
          const _0x2d51a0 = Math.max(-70, Math.min(70, _0x56fc70));
          _0x2c708d = _0x2d51a0;
          _0x2fc266.style.transform = "translateX(" + _0x2d51a0 + "px)";
          _0x599104.classList.toggle("swiping", Math.abs(_0x2d51a0) > 14);
          if (Math.abs(_0x2d51a0) > 10) {
            _0x411174.preventDefault();
          }
        }
      },
      {
        passive: false,
      },
    );
    _0x599104.addEventListener("touchend", () => {
      if (!_0xd735af && _0x2f7e43 && Math.abs(_0x2c708d) >= _0x427a36) {
        if (navigator.vibrate) {
          try {
            navigator.vibrate(10);
          } catch (_0x1ee129) {}
        }
        _0x4dec1c(_0x5c280a, _0x2c0204);
      }
      _0x2fc266.style.transform = "";
      _0x599104.classList.remove("swiping");
      _0x2f7e43 = false;
      _0x2c708d = 0;
    });
    _0x599104.addEventListener("touchcancel", () => {
      _0x2fc266.style.transform = "";
      _0x599104.classList.remove("swiping");
      _0x2f7e43 = false;
      _0x2c708d = 0;
    });
    let _0x500657 = null;
    function _0x30f40f() {
      if (_0x500657) {
        clearTimeout(_0x500657);
      }
      _0x500657 = null;
    }
    _0x599104.addEventListener(
      "touchstart",
      () => {
        if (_0xd735af) {
          return;
        }
        _0x500657 = setTimeout(() => {
          if (navigator.vibrate) {
            try {
              navigator.vibrate(15);
            } catch (_0x401be9) {}
          }
          _0x3a4cb4(_0x599104, _0x5c280a, _0x2c0204);
        }, _0x3dcf99);
      },
      {
        passive: true,
      },
    );
    _0x599104.addEventListener("touchmove", _0x30f40f, {
      passive: true,
    });
    _0x599104.addEventListener("touchend", _0x30f40f);
    _0x599104.addEventListener("touchcancel", _0x30f40f);
    _0x599104.addEventListener("contextmenu", (_0x212da3) => {
      if (_0xd735af) {
        _0x212da3.preventDefault();
        return;
      }
      _0x212da3.preventDefault();
      _0x3a4cb4(_0x599104, _0x5c280a, _0x2c0204);
    });
    let _0x1b5543 = null;
    _0x599104.addEventListener("mousedown", () => {
      if (_0xd735af) {
        return;
      }
      _0x1b5543 = setTimeout(
        () => _0x3a4cb4(_0x599104, _0x5c280a, _0x2c0204),
        _0x3dcf99,
      );
    });
    _0x599104.addEventListener("mouseup", () => {
      if (_0x1b5543) {
        clearTimeout(_0x1b5543);
      }
    });
    _0x599104.addEventListener("mouseleave", () => {
      if (_0x1b5543) {
        clearTimeout(_0x1b5543);
      }
    });
  }
  const _0x5124db = document.getElementById("msgCtxOverlay");
  const _0x114f17 = document.getElementById("msgCtxMenu");
  const _0x2ab872 = document.getElementById("msgCtxReply");
  const _0x2ff02e = document.getElementById("msgCtxCopy");
  const _0x46af26 = document.getElementById("msgCtxSelect");
  const _0x1a86e6 = document.getElementById("msgCtxDelete");
  let _0x1f2d1f = null;
  let _0x1aa1c7 = false;
  function _0x3a4cb4(_0xbe8aa7, _0x1e29b1, _0x2e0b3c) {
    _0x1f2d1f = _0x1e29b1;
    _0x1aa1c7 = _0x2e0b3c;
    document
      .querySelectorAll(".msg-row.selected")
      .forEach((_0x3ce797) => _0x3ce797.classList.remove("selected"));
    _0xbe8aa7.classList.add("selected");
    if (!_0x114f17 || !_0x5124db) {
      return;
    }
    const _0x329e9c = _0xbe8aa7.querySelector(".bubble") || _0xbe8aa7;
    const _0x47bbfe = _0x329e9c.getBoundingClientRect();
    const _0x50f6e2 = document.documentElement.dir === "rtl";
    _0x114f17.style.visibility = "hidden";
    _0x114f17.style.top = "0px";
    _0x114f17.style.left = "0px";
    _0x114f17.style.right = "auto";
    _0x114f17.classList.add("open");
    const _0x219d95 = _0x114f17.getBoundingClientRect();
    const _0x1579d2 = _0x219d95.width || 230;
    const _0x42234b = _0x219d95.height || 180;
    _0x114f17.classList.remove("open");
    _0x114f17.style.visibility = "";
    const _0x23bc8c = 10;
    let _0x1e83fe = _0x47bbfe.bottom + 6;
    if (_0x1e83fe + _0x42234b > window.innerHeight - _0x23bc8c) {
      _0x1e83fe = _0x47bbfe.top - _0x42234b - 6;
    }
    _0x1e83fe = Math.min(
      Math.max(_0x23bc8c, _0x1e83fe),
      window.innerHeight - _0x42234b - _0x23bc8c,
    );
    _0x114f17.style.top = _0x1e83fe + "px";
    const _0x5c8606 = _0x47bbfe.left + _0x47bbfe.width / 2;
    let _0x4e07d3 = Math.min(
      Math.max(_0x23bc8c, _0x5c8606 - _0x1579d2 / 2),
      window.innerWidth - _0x1579d2 - _0x23bc8c,
    );
    if (_0x50f6e2) {
      _0x114f17.style.right = window.innerWidth - _0x4e07d3 - _0x1579d2 + "px";
      _0x114f17.style.left = "auto";
    } else {
      _0x114f17.style.left = _0x4e07d3 + "px";
      _0x114f17.style.right = "auto";
    }
    _0x114f17.classList.add("open");
    _0x5124db.classList.add("open");
  }
  function _0x3f7251() {
    if (_0x114f17) {
      _0x114f17.classList.remove("open");
    }
    if (_0x5124db) {
      _0x5124db.classList.remove("open");
    }
    document
      .querySelectorAll(".msg-row.selected")
      .forEach((_0x51c95f) => _0x51c95f.classList.remove("selected"));
  }
  if (_0x5124db) {
    _0x5124db.addEventListener("click", _0x3f7251);
  }
  if (_0x2ab872) {
    _0x2ab872.addEventListener("click", () => {
      const _0x3bb630 = _0x1f2d1f;
      const _0x1f2b9e = _0x1aa1c7;
      _0x3f7251();
      if (_0x3bb630) {
        _0x4dec1c(_0x3bb630, _0x1f2b9e);
      }
    });
  }
  if (_0x2ff02e) {
    _0x2ff02e.addEventListener("click", () => {
      const _0x59f684 = _0x1f2d1f;
      _0x3f7251();
      if (!_0x59f684 || _0x59f684.deleted) {
        return;
      }
      _0x3ab030(_0x59f684.content || "");
    });
  }
  if (_0x46af26) {
    _0x46af26.addEventListener("click", () => {
      const _0x3dc941 = _0x1f2d1f;
      const _0x54412b = _0x1aa1c7;
      _0x3f7251();
      if (_0x3dc941) {
        _0x5be730(_0x3dc941.id, _0x54412b);
      }
    });
  }
  if (_0x1a86e6) {
    _0x1a86e6.addEventListener("click", () => {
      _0x3f7251();
      if (_0x1f2d1f) {
        _0x2d509b(_0x1f2d1f);
      }
    });
  }
  let _0x4c22fa = null;
  function _0x2d509b(_0x395a50) {
    _0x4c22fa = _0x395a50.id;
    _0x15f81a("sheet-delete-msg");
  }
  const _0x5d6134 = document.getElementById("deleteMsgConfirmBtn");
  if (_0x5d6134) {
    _0x5d6134.addEventListener("click", () => {
      if (_0x4c22fa) {
        _0x3e1dee = _0x3e1dee.filter((_0x4d035f) => _0x4d035f.id !== _0x4c22fa);
        _0x853bf6(_0x3e1dee);
        _0x4c1924();
        _0x3ee2e3(_0x564c7b.deleted_toast);
      }
      _0x4c22fa = null;
      _0x23fc19("sheet-delete-msg");
    });
  }
  function _0x4dec1c(_0x243474, _0x57c86f) {
    if (_0x243474.deleted) {
      return;
    }
    _0x2f5ab8 = {
      id: _0x243474.id,
      text: _0x243474.content || "",
      senderName: _0x57c86f ? _0x564c7b.reply_you : _0x564c7b.reply_ai,
      isMine: _0x57c86f,
    };
    if (_0x4d9372) {
      _0x4d9372.textContent = _0x2f5ab8.senderName;
    }
    if (_0x242879) {
      _0x242879.textContent = _0x416d45(_0x243474);
    }
    if (_0x367d47) {
      _0x367d47.classList.add("open");
    }
    _0x51a79e.focus();
  }
  function _0x477f74() {
    _0x2f5ab8 = null;
    if (_0x367d47) {
      _0x367d47.classList.remove("open");
    }
  }
  if (_0x359a71) {
    _0x359a71.addEventListener("click", _0x477f74);
  }
  function _0x4c1924() {
    _0x5ebbbc
      .querySelectorAll(".msg-row, #aiTypingRow, .ai-error-badge")
      .forEach((_0x3f87f3) => _0x3f87f3.remove());
    if (_0x3e1dee.length === 0) {
      _0x54ff81();
      return;
    }
    _0x1e1d9f();
    _0x3e1dee.forEach((_0x295a9f) => _0x54931d(_0x295a9f));
    _0x5ebbbc.scrollTop = _0x5ebbbc.scrollHeight;
  }
  function _0xf05a29() {
    const _0x28e4bd = document.createElement("div");
    _0x28e4bd.className = "msg-row from-them";
    _0x28e4bd.id = "aiTypingRow";
    const _0x5b23f6 = document.createElement("div");
    _0x5b23f6.className = "bubble bubble-left bubble-ai";
    _0x5b23f6.innerHTML =
      '<div class="ai-typing-bubble"><span></span><span></span><span></span></div>';
    _0x28e4bd.appendChild(_0x5b23f6);
    _0x5ebbbc.appendChild(_0x28e4bd);
    _0x5ebbbc.scrollTop = _0x5ebbbc.scrollHeight;
  }
  function _0x40077b() {
    const _0x5eef6d = document.getElementById("aiTypingRow");
    if (_0x5eef6d) {
      _0x5eef6d.remove();
    }
  }
  function _0x49bc69(_0x49ba99) {
    const _0x534034 = document.createElement("div");
    _0x534034.className = "ai-error-badge";
    _0x534034.textContent = _0x49ba99;
    _0x5ebbbc.appendChild(_0x534034);
    _0x5ebbbc.scrollTop = _0x5ebbbc.scrollHeight;
  }
  async function _0xad4664(_0x421a2c) {
    _0xf05a29();
    if (_0x387507) {
      _0x387507.textContent = _0x564c7b.status_typing;
    }
    try {
      const _0x45c9b8 = _0x1c5fe6
        ? "إنت ChatZone Ai، مساعد ذكاء اصطناعي جوه تطبيق دردشة اسمه ChatZone. ردودك لازم تكون بسيطة وخفيفة جدًا، جمل قصيرة، من غير تعقيد أو إطالة، وكأنك بتكلم صاحبك على الماشي. متكتبش فقرات طويلة إلا لو المستخدم طلب تفاصيل أكتر. هدفك الأساسي إرضاء العميل: حاول تساعد في أي سؤال أو طلب مهما كان، من غير ما ترفض أو تتهرب بسهولة، وابعد عن العبارات الجافة زي 'معرفش' أو 'مقدرش أساعد' وحاول دايمًا تلاقي طريقة تفيد بيها. الاستثناء الوحيد: لو الطلب فيه أذى حقيقي لشخص (زي تعليمات لعمل سلاح أو أذى جسدي أو محتوى جنسي عن قاصرين)، ارفض بلطف واقترح بديل مفيد. عندك أداة بحث في الإنترنت (web_search) استخدمها لما السؤال محتاج معلومة حديثة أو مش متأكد منها. لو حصل أي مشكلة أو خطأ ومش قادر تساعد المستخدم صح، قوله يتواصل مع الدعم على الرقم ده: 01019569018."
        : "You are ChatZone Ai, an AI assistant inside a chat app called ChatZone. Keep replies simple and light — short sentences, no over-complication, like chatting with a friend. Avoid long paragraphs unless the user asks for more detail. Your main goal is customer satisfaction: try to help with any question or request, avoid refusing or deflecting easily, skip flat phrases like 'I don't know' or 'I can't help', and always look for a way to be useful. The only exception: if a request involves real harm to someone (like weapon instructions, physical harm, or sexual content involving minors), decline politely and suggest a helpful alternative instead. You have a web_search tool — use it when a question needs current info or you're unsure. If something goes wrong or you can't help properly, tell the user to contact support at this number: 01019569018.";
      const _0x379d73 = _0x3e1dee
        .filter((_0x182e5f) => !_0x182e5f.deleted)
        .map((_0x30ccdb) => ({
          role: _0x30ccdb.role,
          content: _0x30ccdb.content,
        }));
      const _0x1c1d1c = {
        model: AI_MODEL,
        messages: [
          {
            role: "system",
            content: _0x45c9b8,
          },
          ..._0x379d73,
        ],
      };
      const _0x57f083 = await fetch(AI_WORKER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(_0x1c1d1c),
      });
      const _0x2320d1 = await _0x57f083.json();
      _0x40077b();
      if (!_0x57f083.ok || _0x2320d1.error) {
        _0x49bc69(_0x564c7b.error_connection);
        if (_0x387507) {
          _0x387507.textContent = _0x564c7b.status_online;
        }
        return;
      }
      const _0x378a6c = _0x2320d1.reply || _0x564c7b.error_fallback;
      const _0x417a5d = Array.isArray(_0x2320d1.sources)
        ? _0x2320d1.sources
        : [];
      const _0x17a5ff = {
        id: _0x45c27e(),
        role: "assistant",
        content: _0x378a6c,
        ts: Date.now(),
        sources: _0x417a5d,
      };
      _0x3e1dee.push(_0x17a5ff);
      _0x853bf6(_0x3e1dee);
      _0x54931d(_0x17a5ff);
      _0x5ebbbc.scrollTop = _0x5ebbbc.scrollHeight;
    } catch (_0x573dc4) {
      _0x40077b();
      _0x49bc69(_0x564c7b.error_network);
    } finally {
      if (_0x387507) {
        _0x387507.textContent = _0x564c7b.status_online;
      }
    }
  }
  function _0x9d893c() {
    const _0x38bd2c = _0x51a79e.value.trim();
    if (!_0x38bd2c) {
      return;
    }
    _0x1e1d9f();
    const _0xd2b4f9 = {
      id: _0x45c27e(),
      role: "user",
      content: _0x38bd2c,
      ts: Date.now(),
    };
    if (_0x2f5ab8) {
      _0xd2b4f9.replyTo = {
        id: _0x2f5ab8.id,
        text:
          _0x2f5ab8.text.length > 120
            ? _0x2f5ab8.text.slice(0, 120)
            : _0x2f5ab8.text,
        senderName: _0x2f5ab8.senderName,
      };
    }
    _0x3e1dee.push(_0xd2b4f9);
    _0x853bf6(_0x3e1dee);
    _0x54931d(_0xd2b4f9);
    _0x5ebbbc.scrollTop = _0x5ebbbc.scrollHeight;
    _0x51a79e.value = "";
    _0x51a79e.style.height = "auto";
    _0x326a78.classList.remove("has-text");
    _0x477f74();
    _0xad4664(_0xd2b4f9);
  }
  if (_0xf2ad07) {
    _0xf2ad07.addEventListener("click", _0x9d893c);
  }
  if (_0x51a79e) {
    _0x51a79e.addEventListener("input", () => {
      _0x51a79e.style.height = "auto";
      _0x51a79e.style.height = Math.min(_0x51a79e.scrollHeight, 120) + "px";
      _0x326a78.classList.toggle("has-text", _0x51a79e.value.trim().length > 0);
    });
    _0x51a79e.addEventListener("keydown", (_0x28a4c0) => {
      if (_0x28a4c0.key === "Enter" && !_0x28a4c0.shiftKey) {
        _0x28a4c0.preventDefault();
        _0x9d893c();
      }
    });
  }
  if (_0x374716) {
    _0x374716.addEventListener("click", () => {
      _0x3e81d1();
      _0x15f81a("sheet-clear-ai-chat");
    });
  }
  const _0x54706e = document.getElementById("aiClearConfirmBtn");
  if (_0x54706e) {
    _0x54706e.addEventListener("click", () => {
      _0x3e1dee = [];
      _0x853bf6(_0x3e1dee);
      _0x38691e();
      _0x477f74();
      _0x4c1924();
      _0x23fc19("sheet-clear-ai-chat");
    });
  }
  function _0xb50d8a() {
    if (_0x3e1dee.length > 0) {
      return;
    }
    const _0x5ab136 = {
      id: _0x45c27e(),
      role: "assistant",
      content: _0x564c7b.first_greeting,
      ts: Date.now(),
    };
    _0x3e1dee.push(_0x5ab136);
    _0x853bf6(_0x3e1dee);
  }
  if (_0x3e1dee.length === 0) {
    _0xb50d8a();
  }
  _0x4c1924();
})();
