import {
  db,
  doc,
  getDoc,
  updateDoc,
  ensureAuthenticated,
} from "./firebase-init.js";
(function () {
  function _0x301116(_0x5f189f) {
    const _0x4ac068 = document.getElementById(_0x5f189f);
    if (_0x4ac068) {
      _0x4ac068.classList.add("open");
    }
  }
  function _0x1a25a1(_0x159fc6) {
    const _0x5202ba = document.getElementById(_0x159fc6);
    if (_0x5202ba) {
      _0x5202ba.classList.remove("open");
    }
  }
  const _0xbefd4e = {
    openThemes: "sheet-themes",
    openLanguage: "sheet-language",
    openPrivacy: "sheet-privacy",
    openVersion: "sheet-version",
    openAbout: "sheet-about",
    navHomeShortcut: "sheet-lg-home",
    openChatRow: "sheet-lg-chat",
  };
  Object.keys(_0xbefd4e).forEach((_0xd887e4) => {
    const _0x3f56ed = document.getElementById(_0xd887e4);
    if (_0x3f56ed) {
      _0x3f56ed.addEventListener("click", () =>
        _0x301116(_0xbefd4e[_0xd887e4]),
      );
    }
  });
  document.querySelectorAll("[data-close-sheet]").forEach((_0x21779d) => {
    _0x21779d.addEventListener("click", () =>
      _0x1a25a1(_0x21779d.dataset.closeSheet),
    );
  });
  document.querySelectorAll(".sheet-overlay").forEach((_0x21478b) => {
    _0x21478b.addEventListener("click", (_0x4088e0) => {
      if (_0x4088e0.target === _0x21478b) {
        _0x1a25a1(_0x21478b.id);
      }
    });
  });
  const _0x163285 = ["bottombar", "icons", "chat"];
  const _0xc5be1e = {
    bottombar: "lg-bottombar-on",
    icons: "lg-icons-on",
    chat: "lg-chat-on",
  };
  const _0x1a41a3 = {
    bottombar: "lgSwitch-bottombar",
    icons: "lgSwitch-icons",
    chat: "lgSwitch-bottombar-chat",
  };
  const _0x39f30a = {};
  _0x163285.forEach((_0x38fa5c) => {
    _0x39f30a[_0x38fa5c] = localStorage.getItem("cz_lg_" + _0x38fa5c) === "on";
  });
  function _0x590740() {
    _0x163285.forEach((_0x3e3882) => {
      document.body.classList.toggle(
        _0xc5be1e[_0x3e3882],
        !!_0x39f30a[_0x3e3882],
      );
    });
  }
  _0x163285.forEach((_0x3e2b27) => {
    const _0xa7640e = document.getElementById(_0x1a41a3[_0x3e2b27]);
    if (!_0xa7640e) {
      return;
    }
    _0xa7640e.checked = !!_0x39f30a[_0x3e2b27];
    _0xa7640e.addEventListener("change", () => {
      _0x39f30a[_0x3e2b27] = _0xa7640e.checked;
      localStorage.setItem(
        "cz_lg_" + _0x3e2b27,
        _0xa7640e.checked ? "on" : "off",
      );
      _0x590740();
      if (navigator.vibrate) {
        try {
          navigator.vibrate(6);
        } catch (_0x312873) {}
      }
    });
  });
  _0x590740();
  const _0x243534 = {
    hideReadReceipts: "cz_privacy_hide_read_receipts",
  };
  const _0x3aaa26 = {};
  Object.keys(_0x243534).forEach((_0x4ac26) => {
    _0x3aaa26[_0x4ac26] = localStorage.getItem(_0x243534[_0x4ac26]) === "on";
  });
  window.CZPrivacy = {
    areReadReceiptsHidden: () => !!_0x3aaa26.hideReadReceipts,
  };
  function _0x59c6da() {
    document.body.classList.toggle(
      "privacy-hide-read-receipts",
      !!_0x3aaa26.hideReadReceipts,
    );
  }
  Object.keys(_0x243534).forEach((_0x362c3e) => {
    const _0x408c06 = document.getElementById("privacySwitch-" + _0x362c3e);
    if (!_0x408c06) {
      return;
    }
    _0x408c06.checked = !!_0x3aaa26[_0x362c3e];
    _0x408c06.addEventListener("change", () => {
      _0x3aaa26[_0x362c3e] = _0x408c06.checked;
      localStorage.setItem(
        _0x243534[_0x362c3e],
        _0x408c06.checked ? "on" : "off",
      );
      _0x59c6da();
      if (_0x362c3e === "hideReadReceipts" && _0x43979c) {
        updateDoc(doc(db, "users", _0x43979c), {
          hideReadReceipts: _0x408c06.checked,
        }).catch((_0x48abda) =>
          console.warn("تعذّر مزامنة إعداد منع الصح الزرقاء:", _0x48abda),
        );
      }
      if (navigator.vibrate) {
        try {
          navigator.vibrate(6);
        } catch (_0x2e0b1f) {}
      }
    });
  });
  _0x59c6da();
  function _0x43631e(_0x5ebc69) {
    _0x5ebc69 = _0x5ebc69.replace("#", "");
    if (_0x5ebc69.length === 3) {
      _0x5ebc69 = _0x5ebc69
        .split("")
        .map((_0x3e0e81) => _0x3e0e81 + _0x3e0e81)
        .join("");
    }
    const _0x18fe36 = parseInt(_0x5ebc69, 16);
    return {
      r: (_0x18fe36 >> 16) & 255,
      g: (_0x18fe36 >> 8) & 255,
      b: _0x18fe36 & 255,
    };
  }
  function _0xd63804(_0x54b212, _0x34ece9, _0x419e11) {
    return (
      "#" +
      [_0x54b212, _0x34ece9, _0x419e11]
        .map((_0x4aef5f) =>
          Math.max(0, Math.min(255, Math.round(_0x4aef5f)))
            .toString(16)
            .padStart(2, "0"),
        )
        .join("")
    );
  }
  function _0x32defa(_0x156d32, _0x3cec8e) {
    const { r: _0xddea2e, g: _0x449233, b: _0x5a97df } = _0x43631e(_0x156d32);
    const _0xd9bae6 = Math.round(_0x3cec8e * 2.55);
    return _0xd63804(
      _0xddea2e + _0xd9bae6,
      _0x449233 + _0xd9bae6,
      _0x5a97df + _0xd9bae6,
    );
  }
  let _0x1b6dc3 = localStorage.getItem("cz_theme") || "dark";
  let _0x3e371b = localStorage.getItem("cz_theme_color") || "#25D9A0";
  function _0x4418d1(_0x32888b) {
    const _0x5a045e = document.getElementById("themeColorSwatch");
    const _0xb029cb = document.getElementById("themeColorHex");
    const _0x437003 = document.getElementById("themeColorPicker");
    if (_0x5a045e) {
      _0x5a045e.classList.add("has-color");
      _0x5a045e.style.setProperty("--picked-color", _0x32888b);
    }
    if (_0xb029cb) {
      _0xb029cb.textContent = _0x32888b.toUpperCase();
    }
    if (_0x437003) {
      _0x437003.value = _0x32888b;
    }
  }
  function _0x4d3aed(_0x236c50) {
    const _0x4d2a49 = _0x32defa(_0x236c50, -25);
    const { r: _0x520c0c, g: _0x2b1490, b: _0x370353 } = _0x43631e(_0x236c50);
    document.documentElement.style.setProperty("--accent", _0x236c50);
    document.documentElement.style.setProperty(
      "--accent-dim",
      "rgba(" + _0x520c0c + "," + _0x2b1490 + "," + _0x370353 + ",0.35)",
    );
    document.documentElement.style.setProperty(
      "--grad",
      "linear-gradient(120deg, " + _0x236c50 + ", var(--violet))",
    );
  }
  function _0x194a66(_0x55c305) {
    _0x1b6dc3 = _0x55c305;
    localStorage.setItem("cz_theme", _0x55c305);
    document.body.classList.remove("theme-white", "theme-custom");
    if (_0x55c305 === "white") {
      document.body.classList.add("theme-white");
    }
    if (_0x55c305 === "custom") {
      document.body.classList.add("theme-custom");
    }
    if (_0x55c305 === "custom") {
      _0x4d3aed(_0x3e371b);
    } else {
      document.documentElement.style.removeProperty("--accent");
      document.documentElement.style.removeProperty("--accent-dim");
      document.documentElement.style.removeProperty("--grad");
    }
    const _0x40a52b = document.getElementById("theme-opt-dark");
    const _0x265d33 = document.getElementById("theme-opt-white");
    const _0x9202c8 = document.getElementById("themeColorRow");
    if (_0x40a52b) {
      _0x40a52b.classList.toggle("selected", _0x55c305 === "dark");
    }
    if (_0x265d33) {
      _0x265d33.classList.toggle("selected", _0x55c305 === "white");
    }
    if (_0x9202c8) {
      _0x9202c8.classList.toggle("selected", _0x55c305 === "custom");
    }
  }
  function _0x49979b(_0x298979) {
    _0x3e371b = _0x298979;
    localStorage.setItem("cz_theme_color", _0x298979);
    _0x4418d1(_0x298979);
    _0x194a66("custom");
    if (navigator.vibrate) {
      try {
        navigator.vibrate([6, 30, 6]);
      } catch (_0x51e80c) {}
    }
  }
  const _0xc3216 = document.getElementById("theme-opt-dark");
  const _0x50ba44 = document.getElementById("theme-opt-white");
  if (_0xc3216) {
    _0xc3216.addEventListener("click", () => _0x194a66("dark"));
  }
  if (_0x50ba44) {
    _0x50ba44.addEventListener("click", () => _0x194a66("white"));
  }
  const _0x5b2e0d = document.getElementById("themeColorPicker");
  const _0x2d6f7b = document.getElementById("themeColorRow");
  if (_0x2d6f7b && _0x5b2e0d) {
    _0x2d6f7b.addEventListener("click", () => _0x5b2e0d.click());
    _0x5b2e0d.addEventListener("input", (_0x50441c) =>
      _0x49979b(_0x50441c.target.value),
    );
  }
  _0x4418d1(_0x3e371b);
  _0x194a66(_0x1b6dc3);
  const _0x3c56e1 = {
    settings: "الإعدادات",
    chats_title: "الدردشات",
    search_placeholder: "ابحث عن الشتات",
    empty_title: "مفيش شتات لسه",
    empty_sub: "دوس على علامة + وابدأ أول محادثة",
    nav_chats: "الدردشات",
    nav_settings: "الإعدادات",
    sidebar_airplane: "وضع الطيران",
    sidebar_ghost: "وضع الشبح",
    sidebar_restart: "إعادة تشغيل التطبيق",
    mode_conflict_title: "لازم تلغي وضع تاني الأول",
    mode_conflict_sub:
      "مينفعش تشغّل وضع الطيران ووضع الشبح مع بعض في نفس الوقت",
    btn_ok: "تمام",
    vip_required_title: "الخاصية دي لمشتركي VIP بس",
    vip_required_sub:
      "وضع الطيران ووضع الشبح متاحين لمشتركي VIP مقابل 30 جنيه بس في الشهر",
    vip_required_cta: "اشترك دلوقتي",
    airplane_confirm_on_title: "تفعيل وضع الطيران؟",
    airplane_confirm_on_sub:
      "هتتقطع عن الإنترنت جوه التطبيق تمامًا، ومش هتوصلك أي رسايل جديدة لحد ما تلغيه",
    airplane_confirm_off_title: "إلغاء وضع الطيران؟",
    airplane_confirm_off_sub:
      "هترجع تتصل بالإنترنت جوه التطبيق عادي وهتوصلك الرسايل تاني",
    ghost_confirm_on_title: "تفعيل وضع الشبح؟",
    ghost_confirm_on_sub:
      "ردودك هتوصل عادي، لكن هتفضل ظاهر عند الطرف التاني تيك واحد بس لحد ما تلغي الوضع",
    ghost_confirm_off_title: "إلغاء وضع الشبح؟",
    ghost_confirm_off_sub:
      "هتفضل الرسايل تظهر تيكين زرقاء عادي زي ما هي في الأصل",
    btn_confirm: "تأكيد",
    modal_new_chat_sub: "اكتب الإيميل اللي هتكلمه",
    btn_cancel: "إلغاء",
    btn_start_chat: "ابدأ المحادثة",
    lg_title: "الزجاج السائل",
    lg_sub: "فعّل تأثير Liquid Glass في الأبب",
    lg_body:
      "فعّل أو ألغِ كل تأثير Liquid Glass على حدة. كل شيء متوقف افتراضياً.",
    lg_warning:
      "مُوصى به فقط للأجهزة القوية. قد يحدث بطء بسيط على الأجهزة الأضعف.",
    lg_bottombar_title: "تفعيل الزجاج السائل",
    lg_bottombar_sub: "شريط تنقل زجاجي شفاف",
    lg_icons_title: "الزجاج السائل من الأيقونات",
    lg_icons_sub: "طبّق خامة الزجاج على الأزرار الدائرية",
    lg_home_title: "الزجاج السائل في الرئيسية",
    lg_home_toggle_title: "الزجاج السائل في الرئيسية",
    lg_icons_home_title: "الزجاج السائل في الأيقونة",
    lg_chat_title: "الزجاج السائل في الدردشة",
    lg_chat_body:
      "فعّل الزجاج السائل على بار الاسم وزرار الرجوع وبار الكتابة في شاشة الدردشة.",
    lg_chat_toggle_title: "الزجاج السائل في الدردشة",
    lg_chat_sub: "بار الاسم، زرار الرجوع، وبار الكتابة",
    lg_icons_chat_title: "الزجاج السائل في الأيقونة",
    lg_chat_soon_body: "هذه الميزة قيد التطوير حالياً وستكون متاحة قريباً.",
    lg_soon_sub: "قريباً",
    themes_title: "ثيمات التطبيق",
    themes_sub: "خصّص مظهر ألوان التطبيق",
    themes_body: "اختر ثيم ألوان للتطبيق، وسيتم حفظ اختيارك تلقائياً.",
    theme_dark: "داكن",
    theme_white: "أبيض",
    theme_pick: "اختر لون الثيم",
    lang_title: "لغة التطبيق",
    lang_sub: "التبديل بين العربية والإنجليزية",
    lang_body: "اختر لغتك المفضلة، وسيتم تحديث الأبب فوراً.",
    version_title: "إصدار التطبيق",
    version_sub: "معرفة الإصدار الحالي",
    version_body:
      "أنت تستخدم أحدث إصدار من ChatZone. يتم تحديث الأبب بانتظام لضمان أفضل تجربة.",
    version_badge: "الإصدار الحالي: 1.0",
    about_title: "معلومات عنا",
    about_sub: "تعرّف على فريق ChatZone",
    about_body:
      "أهلاً بيك في ChatZone، تطبيق دردشة بسيط وسريع، بيهدف يديك تجربة تواصل مريحة وآمنة مع أي حد بس بإيميله. نتمنى نكون دايماً عند حسن ظنك 💚",
    nav_chats_row: "الصفحة الرئيسية",
    chat_row: "الدردشة",
    privacy_row: "الخصوصية",
    privacy_title: "الخصوصية",
    privacy_body:
      "بنحترم خصوصيتك، وبيانات محادثاتك متشفّرة ومتخزنة بأمان. مش بنشارك بياناتك مع أي طرف تالت.",
    privacy_hide_photo_title: "إخفاء صورة البروفايل عن الآخرين",
    privacy_hide_photo_sub:
      "اللي بتتكلم معاهم مش هيشوفوا صورة البروفايل بتاعتك",
    privacy_hide_readreceipts_title: "منع الصح الزرقاء",
    privacy_hide_readreceipts_sub:
      "علامات القراءة الزرقاء مش هتظهر عندك ولا عند الطرف التاني",
    ctx_pin: "تثبيت المحادثة",
    ctx_delete_chat: "حذف المحادثة",
    delete_chat_title: "حذف المحادثة؟",
    delete_chat_body:
      "هتتحذف من عندك أنت بس، ولو الطرف التاني بعت رسالة جديدة هتظهر تاني.",
    logout_row: "تسجيل خروج",
    logout_title: "تسجيل خروج؟",
    logout_body:
      "عند تسجيل الخروج سيتم حذف اكونتك نهائيًا (شاتاتك ورسايلك كلها) وستقوم بتسجيل الدخول مرة أخرى.",
    add_choice_sub: "مين عاوز تتكلم معاه؟",
    add_choice_existing_title: "تحدث مع اكونت تحدثت معه من قبل",
    add_choice_existing_sub: "اختر من قائمة جهات اتصالك",
    add_choice_new_title: "تحدث مع شخص جديد",
    add_choice_new_sub: "ابدأ محادثة بإيميل جديد",
    contacts_sub: "جهات الاتصال اللي اتكلمت معاها قبل كده",
    contacts_empty: "لسه مفيش جهات اتصال سابقة",
    nav_groups: "الجروبات",
    groups_title: "الجروبات",
    groups_search_placeholder: "ابحث عن جروب",
    groups_empty_title: "مفيش جروبات لسه",
    groups_empty_sub: "دوس على علامة + وابدأ أول جروب",
    group_pick_members_sub: "اختار الناس اللي عايز تعمل معاهم الجروب",
    group_pick_members_empty: "لازم تتكلم مع حد الأول عشان تضيفه لجروب",
    group_details_sub: "اختار اسم وصورة للجروب",
    group_name_placeholder: "اسم الجروب",
    btn_next: "التالي",
    btn_back: "رجوع",
    btn_create_group: "إنشاء",
    conv_menu_group_members: "أعضاء الجروب",
    conv_menu_group_members_sub: "شوف كل الأعضاء في الجروب ده",
    group_info_title: "معلومات الجروب",
    group_members_count: "الأعضاء",
    bubbles_body_group:
      "لون فقاعتك بيفضل معاك في كل الشاتات والجروبات اللي ليك.",
    ctx_delete_everyone_group: "حذف من عند الجميع",
    delete_selected_body_group:
      "رسائلك هتتحذف نهائيًا من عند الجميع، ورسائل الأعضاء التانيين هتتخفي من عندك بس.",
  };
  const _0x472dc3 = {
    settings: "Settings",
    chats_title: "Chats",
    search_placeholder: "Search chats",
    empty_title: "No chats yet",
    empty_sub: "Tap the + button to start your first chat",
    nav_chats: "Chats",
    nav_settings: "Settings",
    sidebar_airplane: "Airplane Mode",
    sidebar_ghost: "Ghost Mode",
    sidebar_restart: "Restart app",
    mode_conflict_title: "Turn off the other mode first",
    mode_conflict_sub:
      "You can't run Airplane Mode and Ghost Mode at the same time",
    btn_ok: "OK",
    vip_required_title: "This feature is for VIP members only",
    vip_required_sub:
      "Airplane Mode and Ghost Mode are available for VIP members for just 30 EGP a month",
    vip_required_cta: "Subscribe now",
    airplane_confirm_on_title: "Turn on Airplane Mode?",
    airplane_confirm_on_sub:
      "You'll be disconnected from the internet in-app entirely, and won't receive any new messages until you turn it off",
    airplane_confirm_off_title: "Turn off Airplane Mode?",
    airplane_confirm_off_sub:
      "You'll reconnect to the internet in-app normally and start receiving messages again",
    ghost_confirm_on_title: "Turn on Ghost Mode?",
    ghost_confirm_on_sub:
      "Your replies will go through normally, but the other side will only see a single check mark until you turn this off",
    ghost_confirm_off_title: "Turn off Ghost Mode?",
    ghost_confirm_off_sub:
      "Messages will go back to showing normal blue double checks",
    btn_confirm: "Confirm",
    modal_new_chat_sub: "Type the email you want to chat with",
    btn_cancel: "Cancel",
    btn_start_chat: "Start Chat",
    lg_title: "Liquid Glass",
    lg_sub: "Enable the Liquid Glass effect across the app",
    lg_body:
      "Turn each Liquid Glass effect on or off individually. Everything is off by default.",
    lg_warning:
      "Recommended for powerful devices only. Slight lag may occur on weaker devices.",
    lg_bottombar_title: "Enable Liquid Glass",
    lg_bottombar_sub: "A translucent glass navigation bar",
    lg_icons_title: "Liquid Glass from icons",
    lg_icons_sub: "Apply glass material to circular buttons",
    lg_home_title: "Liquid Glass in Home",
    lg_home_toggle_title: "Liquid Glass in Home",
    lg_icons_home_title: "Liquid Glass in icon",
    lg_chat_title: "Liquid Glass in Chat",
    lg_chat_body:
      "Enable Liquid Glass on the name bar, the back button, and the input bar in the chat screen.",
    lg_chat_toggle_title: "Liquid Glass in Chat",
    lg_chat_sub: "Name bar, back button, and input bar",
    lg_icons_chat_title: "Liquid Glass in icon",
    lg_chat_soon_body:
      "This feature is currently in development and will be available soon.",
    lg_soon_sub: "Coming soon",
    themes_title: "App Themes",
    themes_sub: "Customize your color scheme",
    themes_body:
      "Choose a color theme for the app. Your choice is saved automatically.",
    theme_dark: "Dark",
    theme_white: "White",
    theme_pick: "Choose your theme color",
    lang_title: "App Language",
    lang_sub: "Switch between Arabic and English",
    lang_body: "Choose your preferred language. The app will update instantly.",
    version_title: "App Version",
    version_sub: "Check the current version",
    version_body:
      "You are using the latest version of ChatZone. The app is updated regularly to ensure the best experience.",
    version_badge: "Current version: 1.0",
    about_title: "Info",
    about_sub: "Meet the ChatZone team",
    about_body:
      "Welcome to ChatZone, a simple and fast chat app that aims to give you a comfortable and secure way to connect with anyone using just their email. We hope to always be worthy of your trust 💚",
    nav_chats_row: "Home",
    chat_row: "Chat",
    privacy_row: "Privacy",
    privacy_title: "Privacy",
    privacy_body:
      "We respect your privacy. Your chat data is encrypted and stored securely. We never share your data with third parties.",
    privacy_hide_photo_title: "Hide profile photo from others",
    privacy_hide_photo_sub: "People you chat with won't see your profile photo",
    privacy_hide_readreceipts_title: "Hide read receipts",
    privacy_hide_readreceipts_sub:
      "Blue read receipts won't appear for you or the other person",
    ctx_pin: "Pin chat",
    ctx_delete_chat: "Delete chat",
    delete_chat_title: "Delete this chat?",
    delete_chat_body:
      "It will be deleted for you only. If the other person sends a new message, it will reappear.",
    logout_row: "Log out",
    logout_title: "Log out?",
    logout_body:
      "Logging out will permanently delete your account (all your chats and messages), and you will need to sign in again.",
    add_choice_sub: "Who do you want to talk to?",
    add_choice_existing_title: "Chat with someone you talked to before",
    add_choice_existing_sub: "Pick from your contacts list",
    add_choice_new_title: "Chat with someone new",
    add_choice_new_sub: "Start a chat with a new email",
    contacts_sub: "People you have previously chatted with",
    contacts_empty: "No previous contacts yet",
    nav_groups: "Groups",
    groups_title: "Groups",
    groups_search_placeholder: "Search groups",
    groups_empty_title: "No groups yet",
    groups_empty_sub: "Tap the + button to start your first group",
    group_pick_members_sub: "Pick the people you want in the group",
    group_pick_members_empty:
      "You need to chat with someone first before adding them to a group",
    group_details_sub: "Choose a name and photo for the group",
    group_name_placeholder: "Group name",
    btn_next: "Next",
    btn_back: "Back",
    btn_create_group: "Create",
    conv_menu_group_members: "Group members",
    conv_menu_group_members_sub: "See everyone in this group",
    group_info_title: "Group info",
    group_members_count: "Members",
    bubbles_body_group:
      "Your bubble color follows you across all your chats and groups.",
    ctx_delete_everyone_group: "Delete for everyone",
    delete_selected_body_group:
      "Your selected messages will be permanently deleted for everyone, and other members' selected messages will be hidden for you only.",
  };
  let _0x770873 = localStorage.getItem("cz_lang") || "ar";
  const _0xITDICT = {
    settings: "Impostazioni",
    chats_title: "Chat",
    search_placeholder: "Cerca nelle chat",
    empty_title: "Ancora nessuna chat",
    empty_sub: "Tocca il pulsante + e inizia la tua prima conversazione",
    nav_chats: "Chat",
    nav_settings: "Impostazioni",
    sidebar_airplane: "Modalità aereo",
    sidebar_ghost: "Modalità fantasma",
    sidebar_restart: "Riavvia l'app",
    mode_conflict_title: "Disattiva prima l'altra modalità",
    mode_conflict_sub:
      "Non puoi attivare la Modalità aereo e la Modalità fantasma insieme",
    btn_ok: "OK",
    vip_required_title: "Funzione riservata agli utenti VIP",
    vip_required_sub:
      "Modalità aereo e Modalità fantasma sono disponibili per gli utenti VIP a soli 30 EGP al mese",
    vip_required_cta: "Abbonati ora",
    airplane_confirm_on_title: "Attivare la Modalità aereo?",
    airplane_confirm_on_sub:
      "Sarai completamente disconnesso da internet all'interno dell'app e non riceverai nuovi messaggi finché non la disattivi",
    airplane_confirm_off_title: "Disattivare la Modalità aereo?",
    airplane_confirm_off_sub:
      "Tornerai a connetterti normalmente a internet nell'app e riceverai di nuovo i messaggi",
    ghost_confirm_on_title: "Attivare la Modalità fantasma?",
    ghost_confirm_on_sub:
      "Le tue risposte arriveranno normalmente, ma l'altra persona vedrà solo una singola spunta finché non disattivi questa modalità",
    ghost_confirm_off_title: "Disattivare la Modalità fantasma?",
    ghost_confirm_off_sub:
      "I messaggi torneranno a mostrare normalmente le doppie spunte blu",
    btn_confirm: "Conferma",
    modal_new_chat_sub: "Scrivi l'email della persona con cui vuoi chattare",
    btn_cancel: "Annulla",
    btn_start_chat: "Inizia chat",
    lg_title: "Liquid Glass",
    lg_sub: "Attiva l'effetto Liquid Glass nell'app",
    lg_body:
      "Attiva o disattiva ogni effetto Liquid Glass singolarmente. Tutto è disattivato per impostazione predefinita.",
    lg_warning:
      "Consigliato solo per dispositivi potenti. Potrebbe causare qualche rallentamento sui dispositivi meno performanti.",
    lg_bottombar_title: "Attiva il Liquid Glass",
    lg_bottombar_sub: "Barra di navigazione in vetro trasparente",
    lg_icons_title: "Liquid Glass sulle icone",
    lg_icons_sub: "Applica l'effetto vetro ai pulsanti circolari",
    lg_home_title: "Liquid Glass nella home",
    lg_home_toggle_title: "Liquid Glass nella home",
    lg_icons_home_title: "Liquid Glass sull'icona",
    lg_chat_title: "Liquid Glass in chat",
    lg_chat_body:
      "Attiva il Liquid Glass sulla barra del nome, il pulsante indietro e la barra di scrittura nella schermata della chat.",
    lg_chat_toggle_title: "Liquid Glass in chat",
    lg_chat_sub: "Barra del nome, pulsante indietro e barra di scrittura",
    lg_icons_chat_title: "Liquid Glass sull'icona",
    lg_chat_soon_body:
      "Questa funzione è attualmente in sviluppo e sarà disponibile a breve.",
    lg_soon_sub: "Prossimamente",
    themes_title: "Temi dell'app",
    themes_sub: "Personalizza l'aspetto dei colori dell'app",
    themes_body:
      "Scegli un tema di colori per l'app: la tua scelta verrà salvata automaticamente.",
    theme_dark: "Scuro",
    theme_white: "Chiaro",
    theme_pick: "Scegli il colore del tema",
    lang_title: "Lingua dell'app",
    lang_sub: "Passa tra arabo, inglese e italiano",
    lang_body:
      "Scegli la tua lingua preferita: l'app si aggiornerà immediatamente.",
    version_title: "Versione dell'app",
    version_sub: "Controlla la versione attuale",
    version_body:
      "Stai usando l'ultima versione di ChatZone. L'app viene aggiornata regolarmente per garantire la migliore esperienza.",
    version_badge: "Versione attuale: 1.0",
    about_title: "Informazioni",
    about_sub: "Scopri il team di ChatZone",
    about_body:
      "Benvenuto su ChatZone, un'app di chat semplice e veloce, pensata per offrirti un'esperienza di comunicazione comoda e sicura con chiunque, usando solo la sua email. Speriamo di essere sempre all'altezza della tua fiducia 💚",
    nav_chats_row: "Home",
    chat_row: "Chat",
    privacy_row: "Privacy",
    privacy_title: "Privacy",
    privacy_body:
      "Rispettiamo la tua privacy: i dati delle tue chat sono criptati e conservati in modo sicuro. Non condividiamo mai i tuoi dati con terze parti.",
    privacy_hide_photo_title: "Nascondi la foto del profilo agli altri",
    privacy_hide_photo_sub:
      "Le persone con cui chatti non vedranno la tua foto del profilo",
    privacy_hide_readreceipts_title: "Nascondi le conferme di lettura",
    privacy_hide_readreceipts_sub:
      "Le spunte blu di lettura non appariranno né a te né all'altra persona",
    ctx_pin: "Fissa la chat",
    ctx_delete_chat: "Elimina chat",
    delete_chat_title: "Eliminare questa chat?",
    delete_chat_body:
      "Verrà eliminata solo per te. Se l'altra persona invia un nuovo messaggio, riapparirà.",
    logout_row: "Esci",
    logout_title: "Uscire?",
    logout_body:
      "Uscendo, il tuo account verrà eliminato definitivamente (tutte le tue chat e i tuoi messaggi) e dovrai accedere di nuovo.",
    add_choice_sub: "Con chi vuoi parlare?",
    add_choice_existing_title: "Parla con un account con cui hai già chattato",
    add_choice_existing_sub: "Scegli dalla tua lista contatti",
    add_choice_new_title: "Parla con una persona nuova",
    add_choice_new_sub: "Inizia una chat con una nuova email",
    contacts_sub: "Persone con cui hai già chattato in precedenza",
    contacts_empty: "Ancora nessun contatto precedente",
    nav_groups: "Gruppi",
    groups_title: "Gruppi",
    groups_search_placeholder: "Cerca un gruppo",
    groups_empty_title: "Ancora nessun gruppo",
    groups_empty_sub: "Tocca il pulsante + e crea il tuo primo gruppo",
    group_pick_members_sub: "Scegli le persone con cui vuoi creare il gruppo",
    group_pick_members_empty:
      "Devi prima parlare con qualcuno per poterlo aggiungere a un gruppo",
    group_details_sub: "Scegli un nome e una foto per il gruppo",
    group_name_placeholder: "Nome del gruppo",
    btn_next: "Avanti",
    btn_back: "Indietro",
    btn_create_group: "Crea",
    conv_menu_group_members: "Membri del gruppo",
    conv_menu_group_members_sub: "Vedi tutti i membri di questo gruppo",
    group_info_title: "Informazioni sul gruppo",
    group_members_count: "Membri",
    bubbles_body_group:
      "Il colore del tuo fumetto ti segue in tutte le tue chat e gruppi.",
    ctx_delete_everyone_group: "Elimina per tutti",
    delete_selected_body_group:
      "I tuoi messaggi verranno eliminati definitivamente per tutti, mentre i messaggi degli altri membri verranno nascosti solo per te.",
  };
  function _0x482360(_0x318d36) {
    _0x770873 = _0x318d36;
    localStorage.setItem("cz_lang", _0x318d36);
    const _0x35b943 = _0x318d36 === "ar";
    document.documentElement.lang = _0x318d36;
    document.documentElement.dir = _0x35b943 ? "rtl" : "ltr";
    const _0x1e1e6a = _0x35b943
      ? _0x3c56e1
      : _0x318d36 === "it"
        ? _0xITDICT
        : _0x472dc3;
    document.querySelectorAll("[data-i18n]").forEach((_0x403aef) => {
      const _0x40ffcf = _0x403aef.getAttribute("data-i18n");
      if (_0x1e1e6a[_0x40ffcf] !== undefined) {
        _0x403aef.textContent = _0x1e1e6a[_0x40ffcf];
      }
    });
    document
      .querySelectorAll("[data-i18n-placeholder]")
      .forEach((_0x175380) => {
        const _0x1ff21d = _0x175380.getAttribute("data-i18n-placeholder");
        if (_0x1e1e6a[_0x1ff21d] !== undefined) {
          _0x175380.setAttribute("placeholder", _0x1e1e6a[_0x1ff21d]);
        }
      });
    const _0x3a6d91 = document.getElementById("lang-opt-ar");
    const _0x30553c = document.getElementById("lang-opt-en");
    if (_0x3a6d91) {
      _0x3a6d91.classList.toggle("selected", _0x318d36 === "ar");
    }
    if (_0x30553c) {
      _0x30553c.classList.toggle("selected", _0x318d36 === "en");
    }
    const _0x30553cIT = document.getElementById("lang-opt-it");
    if (_0x30553cIT) {
      _0x30553cIT.classList.toggle("selected", _0x318d36 === "it");
    }
  }
  const _0x3b938f = document.getElementById("lang-opt-ar");
  const _0x288612 = document.getElementById("lang-opt-en");
  if (_0x3b938f) {
    _0x3b938f.addEventListener("click", () => _0x482360("ar"));
  }
  if (_0x288612) {
    _0x288612.addEventListener("click", () => _0x482360("en"));
  }
  _0x482360(_0x770873);
  const _0x5f29bf = document.querySelectorAll(".screen");
  const _0x128927 = document.querySelectorAll(".nav-btn");
  const _0x9b6897 = document.getElementById("tabPill");
  const _0xacb187 = document.getElementById("bottomNav");
  const _0x21f6ac = 0.82;
  function _0x5f49ee(_0x2a6a13, _0x313fed) {
    if (!_0x9b6897 || !_0xacb187 || !_0x2a6a13) {
      return;
    }
    const _0x513677 = _0xacb187.getBoundingClientRect();
    const _0x1393c9 = _0x2a6a13.getBoundingClientRect();
    const _0x24afa9 = _0x1393c9.width;
    const _0x5531e7 = _0x24afa9 * _0x21f6ac;
    const _0x5a6974 =
      _0x1393c9.left - _0x513677.left + (_0x24afa9 - _0x5531e7) / 2;
    if (!_0x313fed) {
      _0x9b6897.style.transition = "none";
    }
    _0x9b6897.style.width = _0x5531e7 + "px";
    _0x9b6897.style.transform = "translateX(" + _0x5a6974 + "px)";
    if (!_0x313fed) {
      _0x9b6897.offsetHeight;
      _0x9b6897.style.transition = "";
    }
  }
  function _0x4ce86a(_0x117f5f) {
    _0x5f29bf.forEach((_0x4a63a0) => {
      _0x4a63a0.classList.toggle("hidden", _0x4a63a0.id !== _0x117f5f);
    });
    let _0x37a161 = null;
    _0x128927.forEach((_0x5137ca) => {
      const _0x274a55 = _0x5137ca.dataset.target === _0x117f5f;
      _0x5137ca.classList.toggle("active", _0x274a55);
      if (_0x274a55) {
        _0x37a161 = _0x5137ca;
      }
    });
    if (_0x37a161) {
      _0x5f49ee(_0x37a161, true);
    }
    _0x1ec963();
  }
  _0x128927.forEach((_0x14a44d) => {
    _0x14a44d.addEventListener("click", () =>
      _0x4ce86a(_0x14a44d.dataset.target),
    );
  });
  window.addEventListener("load", () => {
    const _0x584adf = document.querySelector(".nav-btn.active");
    _0x5f49ee(_0x584adf, false);
  });
  window.addEventListener("resize", () => {
    const _0x556d99 = document.querySelector(".nav-btn.active");
    _0x5f49ee(_0x556d99, false);
  });
  requestAnimationFrame(() => {
    const _0x5bbff5 = document.querySelector(".nav-btn.active");
    _0x5f49ee(_0x5bbff5, false);
  });
  const _0x2ae658 = document.getElementById("profileName");
  const _0x2ddc0c = document.getElementById("profileEmail");
  const _0x48f206 = document.getElementById("profileAvatar");
  const _0x12a8de = localStorage.getItem("cz_user_name");
  const _0x554a7e = localStorage.getItem("cz_verified_email");
  if (_0x12a8de && _0x2ae658) {
    _0x2ae658.textContent = _0x12a8de;
  }
  if (_0x554a7e && _0x2ddc0c) {
    _0x2ddc0c.textContent = _0x554a7e;
  }
  function _0x3fce26(_0x28dbe4, _0x27b2f3) {
    if ((localStorage.getItem("cz_lang") || "ar") === "en") {
      return _0x27b2f3;
    } else {
      return _0x28dbe4;
    }
  }
  const _0x14fd31 = document.getElementById("profileAvatarIcon");
  const _0x43979c = _0x554a7e ? _0x554a7e.toLowerCase() : "";
  (async function _0x36c312() {
    const _0x31e4c5 = document.getElementById(
      "privacySwitch-hidePhotoFromOthers",
    );
    if (!_0x31e4c5 || !_0x43979c) {
      return;
    }
    try {
      const _0xac5607 = await getDoc(doc(db, "users", _0x43979c));
      _0x31e4c5.checked =
        _0xac5607.exists() && _0xac5607.data().hidePhotoFromOthers === true;
    } catch (_0x16c296) {
      console.warn("تعذّر تحميل حالة إخفاء صورة البروفايل:", _0x16c296);
    }
    _0x31e4c5.addEventListener("change", async () => {
      const _0x51748f = _0x31e4c5.checked;
      _0x31e4c5.disabled = true;
      try {
        await updateDoc(doc(db, "users", _0x43979c), {
          hidePhotoFromOthers: _0x51748f,
        });
        if (navigator.vibrate) {
          try {
            navigator.vibrate(6);
          } catch (_0x40cc8d) {}
        }
      } catch (_0x475f06) {
        console.error("فشل تحديث إخفاء صورة البروفايل:", _0x475f06);
        _0x31e4c5.checked = !_0x51748f;
      } finally {
        _0x31e4c5.disabled = false;
      }
    });
  })();
  function _0x5d1123(_0x2b1300) {
    if (!_0x48f206) {
      return;
    }
    let _0x4626c1 = _0x48f206.querySelector(".profile-avatar-img");
    if (_0x2b1300) {
      if (!_0x4626c1) {
        _0x4626c1 = document.createElement("img");
        _0x4626c1.className = "profile-avatar-img";
        _0x4626c1.alt = "";
        _0x48f206.appendChild(_0x4626c1);
      }
      _0x4626c1.src = _0x2b1300;
      if (_0x14fd31) {
        _0x14fd31.style.display = "none";
      }
    } else {
      if (_0x4626c1) {
        _0x4626c1.remove();
      }
      if (_0x14fd31) {
        _0x14fd31.style.display = "";
      }
    }
  }
  (async function _0x502918() {
    if (!_0x43979c) {
      return;
    }
    try {
      const _0x247461 = await getDoc(doc(db, "users", _0x43979c));
      const _0x4812c2 =
        _0x247461.exists() && _0x247461.data().photoURL
          ? _0x247461.data().photoURL
          : "";
      if (_0x4812c2) {
        _0x5d1123(_0x4812c2);
      }
    } catch (_0x87686d) {
      console.warn("تعذّر تحميل صورة البروفايل:", _0x87686d);
    }
  })();
  const _0xd54120 = document.getElementById("openYourProfile");
  if (_0xd54120) {
    _0xd54120.addEventListener("click", () => {
      window.location.href = "your-profile.html";
    });
  }
  const _0x53665f = document.getElementById("menuBtn");
  const _0x4118e4 = document.getElementById("sidebarMenu");
  const _0xa6759e = document.getElementById("sidebarOverlay");
  function _0x5dc471() {
    if (!_0x4118e4 || !_0xa6759e || !_0x53665f) {
      return;
    }
    const _0x2e30ef = document.documentElement.dir === "rtl";
    const _0x1d1289 = _0x53665f.getBoundingClientRect();
    _0x4118e4.style.top = _0x1d1289.bottom + 8 + "px";
    if (_0x2e30ef) {
      _0x4118e4.style.right = window.innerWidth - _0x1d1289.right + "px";
      _0x4118e4.style.left = "auto";
    } else {
      _0x4118e4.style.left = _0x1d1289.left + "px";
      _0x4118e4.style.right = "auto";
    }
    _0x4118e4.classList.add("open");
    _0xa6759e.classList.add("open");
  }
  function _0x1ec963() {
    if (!_0x4118e4 || !_0xa6759e) {
      return;
    }
    _0x4118e4.classList.remove("open");
    _0xa6759e.classList.remove("open");
  }
  if (_0x53665f) {
    _0x53665f.addEventListener("click", () => {
      if (_0x4118e4 && _0x4118e4.classList.contains("open")) {
        _0x1ec963();
      } else {
        _0x5dc471();
      }
    });
  }
  if (_0xa6759e) {
    _0xa6759e.addEventListener("click", _0x1ec963);
  }
})();
