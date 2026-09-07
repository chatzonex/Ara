import {
  db,
  doc,
  getDoc,
  getDocs,
  addDoc,
  setDoc,
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
  ensureAuthenticated,
} from "./firebase-init.js";
(function () {
  if (!localStorage.getItem("cz_verified_email")) {
    window.location.href = "index.html";
    return;
  }
  const _0x565602 = localStorage.getItem("cz_verified_email");
  const _0x300541 = _0x565602.toLowerCase();
  function _0x4854f2(_0x50ed95, _0x524e75) {
    if ((localStorage.getItem("cz_lang") || "ar") === "en") {
      return _0x524e75;
    } else {
      return _0x50ed95;
    }
  }
  const _0x20f4fd = "rkeddyph";
  const _0x255f20 = "chatzone_upload_image";
  const _0x76d67d =
    "https://api.cloudinary.com/v1_1/" + _0x20f4fd + "/image/upload";
  const _0x4aefbf = document.getElementById("addGroupBtn");
  const _0x366b4f = document.getElementById("groupsList");
  const _0x1007ad = document.getElementById("groupSearch");
  const _0x39c79e = document.getElementById("groupMembersOverlay");
  const _0x5dfeea = document.getElementById("groupMembersList");
  const _0x146985 = document.getElementById("groupMembersEmpty");
  const _0x254135 = document.getElementById("cancelGroupMembers");
  const _0x18531b = document.getElementById("nextGroupMembers");
  const _0x2fa3c0 = document.getElementById("groupDetailsOverlay");
  const _0x4e8247 = document.getElementById("groupPhotoPicker");
  const _0x575b82 = document.getElementById("groupPhotoInput");
  const _0xbb0035 = document.getElementById("groupPhotoImg");
  const _0x37e8dd = document.getElementById("groupPhotoInitial");
  const _0x2dd2b6 = document.getElementById("groupNameInput");
  const _0x5b6d56 = document.getElementById("groupNameError");
  const _0x597642 = document.getElementById("backGroupDetails");
  const _0x35667d = document.getElementById("createGroupBtn");
  if (!_0x4aefbf || !_0x366b4f) {
    return;
  }
  let _0x413b6b = new Map();
  let _0x4c6eed = "";
  function _0x1dc252(_0x4a7e92) {
    if (!_0x4a7e92) {
      return _0x4854f2("مستخدم", "User");
    }
    const _0x4839c3 = _0x4a7e92.split("@")[0];
    return _0x4839c3.charAt(0).toUpperCase() + _0x4839c3.slice(1);
  }
  async function _0x15bffc(_0x4d0a74) {
    try {
      const _0x24b715 = await getDoc(doc(db, "users", _0x4d0a74.toLowerCase()));
      const _0x4c41e0 = _0x24b715.exists() ? _0x24b715.data() : null;
      const _0x5e1f02 = !!_0x4c41e0 && _0x4c41e0.hidePhotoFromOthers === true;
      return {
        uid: _0x4c41e0 ? _0x4c41e0.uid : null,
        name:
          _0x4c41e0 && _0x4c41e0.name ? _0x4c41e0.name : _0x1dc252(_0x4d0a74),
        photoURL:
          _0x4c41e0 && !_0x5e1f02 && _0x4c41e0.photoURL
            ? _0x4c41e0.photoURL
            : "",
      };
    } catch (_0xaf91bd) {
      return {
        uid: null,
        name: _0x1dc252(_0x4d0a74),
        photoURL: "",
      };
    }
  }
  function _0xad2aa0() {
    if (_0x18531b) {
      _0x18531b.disabled = _0x413b6b.size === 0;
    }
  }
  function _0x2a263f(_0x11f324) {
    if (!_0x5dfeea) {
      return;
    }
    _0x5dfeea.innerHTML = "";
    if (!_0x11f324.length) {
      if (_0x146985) {
        _0x146985.classList.remove("hidden");
      }
      return;
    }
    if (_0x146985) {
      _0x146985.classList.add("hidden");
    }
    _0x11f324.forEach(async (_0xa33701) => {
      const _0x1c4842 = _0xa33701.toLowerCase();
      const _0x5c869d = document.createElement("div");
      _0x5c869d.className = "contact-row";
      const _0x5f4d3c = _0xa33701.trim().charAt(0).toUpperCase();
      _0x5c869d.innerHTML =
        '\n                <div class="contact-row-avatar">' +
        _0x5f4d3c +
        '</div>\n                <div class="contact-row-text">\n                    <h4 class="contact-row-name">' +
        _0xa33701 +
        '</h4>\n                </div>\n                <div class="group-pick-check">\n                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>\n                </div>\n            ';
      _0x5c869d.addEventListener("click", () => {
        if (_0x413b6b.has(_0x1c4842)) {
          _0x413b6b.delete(_0x1c4842);
          _0x5c869d.classList.remove("picked");
        } else {
          const _0x264476 = _0x5c869d.querySelector(".contact-row-name");
          _0x413b6b.set(_0x1c4842, {
            email: _0x1c4842,
            name: (_0x264476 && _0x264476.textContent) || _0x1dc252(_0xa33701),
            photoURL: "",
          });
          _0x5c869d.classList.add("picked");
        }
        _0xad2aa0();
      });
      _0x5dfeea.appendChild(_0x5c869d);
      try {
        const _0x2f43c6 = await _0x15bffc(_0xa33701);
        const _0x2ea74b = _0x5c869d.querySelector(".contact-row-name");
        if (_0x2ea74b && _0x2f43c6.name) {
          _0x2ea74b.textContent = _0x2f43c6.name;
        }
        if (_0x413b6b.has(_0x1c4842)) {
          const _0x4f9dd8 = _0x413b6b.get(_0x1c4842);
          _0x4f9dd8.name = _0x2f43c6.name;
          _0x4f9dd8.photoURL = _0x2f43c6.photoURL;
        }
      } catch (_0x5db4be) {}
    });
  }
  async function _0x93c1db() {
    if (_0x5dfeea) {
      _0x5dfeea.innerHTML = "";
    }
    if (_0x146985) {
      _0x146985.classList.add("hidden");
    }
    try {
      await ensureAuthenticated();
      const _0x20bcff = collection(db, "users", _0x300541, "contacts");
      const _0x5ce26b = query(_0x20bcff, orderBy("lastContactAt", "desc"));
      const _0x175904 = await getDocs(_0x5ce26b);
      const _0x3d8b19 = [];
      _0x175904.forEach((_0x1e7605) => {
        const _0x37ebe5 = _0x1e7605.data();
        if (_0x37ebe5 && _0x37ebe5.email) {
          _0x3d8b19.push(_0x37ebe5.email);
        }
      });
      _0x2a263f(_0x3d8b19);
    } catch (_0xce7097) {
      console.error("فشل تحميل جهات الاتصال لاختيار أعضاء الجروب:", _0xce7097);
      _0x2a263f([]);
    }
  }
  function _0x8df67b() {
    _0x413b6b.clear();
    _0xad2aa0();
    if (_0x39c79e) {
      _0x39c79e.classList.remove("hidden");
    }
    _0x93c1db();
  }
  function _0x271948() {
    if (_0x39c79e) {
      _0x39c79e.classList.add("hidden");
    }
  }
  _0x4aefbf.addEventListener("click", _0x8df67b);
  if (_0x254135) {
    _0x254135.addEventListener("click", _0x271948);
  }
  if (_0x39c79e) {
    _0x39c79e.addEventListener("click", (_0x47d9c8) => {
      if (_0x47d9c8.target === _0x39c79e) {
        _0x271948();
      }
    });
  }
  function _0x142271() {
    _0x4c6eed = "";
    if (_0xbb0035) {
      _0xbb0035.src = "";
      _0xbb0035.classList.add("hidden");
    }
    if (_0x37e8dd) {
      _0x37e8dd.style.display = "";
      _0x37e8dd.textContent = "؟";
    }
    if (_0x2dd2b6) {
      _0x2dd2b6.value = "";
    }
    _0x5361a4();
  }
  function _0x368dca(_0x37910f) {
    if (_0x5b6d56) {
      _0x5b6d56.textContent = _0x37910f;
    }
    if (_0x2dd2b6) {
      _0x2dd2b6.classList.add("error");
    }
  }
  function _0x5361a4() {
    if (_0x5b6d56) {
      _0x5b6d56.textContent = "";
    }
    if (_0x2dd2b6) {
      _0x2dd2b6.classList.remove("error");
    }
  }
  if (_0x18531b) {
    _0x18531b.addEventListener("click", () => {
      if (_0x413b6b.size === 0) {
        return;
      }
      _0x271948();
      _0x142271();
      if (_0x2fa3c0) {
        _0x2fa3c0.classList.remove("hidden");
      }
      setTimeout(() => {
        if (_0x2dd2b6) {
          _0x2dd2b6.focus();
        }
      }, 50);
    });
  }
  if (_0x597642) {
    _0x597642.addEventListener("click", () => {
      if (_0x2fa3c0) {
        _0x2fa3c0.classList.add("hidden");
      }
      _0x8df67b();
    });
  }
  if (_0x2fa3c0) {
    _0x2fa3c0.addEventListener("click", (_0x4950ad) => {
      if (_0x4950ad.target === _0x2fa3c0) {
        _0x2fa3c0.classList.add("hidden");
      }
    });
  }
  if (_0x2dd2b6) {
    _0x2dd2b6.addEventListener("input", _0x5361a4);
  }
  if (_0x4e8247 && _0x575b82) {
    _0x4e8247.addEventListener("click", () => _0x575b82.click());
    _0x575b82.addEventListener("change", async () => {
      const _0x2954e9 = _0x575b82.files && _0x575b82.files[0];
      _0x575b82.value = "";
      if (!_0x2954e9) {
        return;
      }
      if (!_0x2954e9.type.startsWith("image/")) {
        _0x368dca(
          _0x4854f2(
            "من فضلك اختر ملف صورة صالح",
            "Please choose a valid image file",
          ),
        );
        return;
      }
      if (_0x2954e9.size > 5242880) {
        _0x368dca(
          _0x4854f2(
            "حجم الصورة كبير جدًا (الحد الأقصى 5 ميجا)",
            "Image is too large (max 5MB)",
          ),
        );
        return;
      }
      _0x4e8247.classList.add("uploading");
      try {
        const _0x1e7b07 = new FormData();
        _0x1e7b07.append("file", _0x2954e9);
        _0x1e7b07.append("upload_preset", _0x255f20);
        const _0xd837cb = await fetch(_0x76d67d, {
          method: "POST",
          body: _0x1e7b07,
        });
        if (!_0xd837cb.ok) {
          throw new Error("فشل الرفع إلى Cloudinary");
        }
        const _0x5be7f3 = await _0xd837cb.json();
        const _0x4a90d9 = _0x5be7f3.secure_url;
        if (!_0x4a90d9) {
          throw new Error("لم يتم استلام رابط الصورة");
        }
        _0x4c6eed = _0x4a90d9;
        if (_0xbb0035) {
          _0xbb0035.src = _0x4a90d9;
          _0xbb0035.classList.remove("hidden");
        }
        if (_0x37e8dd) {
          _0x37e8dd.style.display = "none";
        }
      } catch (_0x1609c9) {
        console.error("خطأ أثناء رفع صورة الجروب:", _0x1609c9);
        _0x368dca(
          _0x4854f2(
            "حصل خطأ أثناء رفع الصورة، حاول تاني",
            "Something went wrong uploading the image, please try again",
          ),
        );
      } finally {
        _0x4e8247.classList.remove("uploading");
      }
    });
  }
  if (_0x2dd2b6 && _0x37e8dd) {
    _0x2dd2b6.addEventListener("input", () => {
      if (_0x4c6eed) {
        return;
      }
      const _0x329871 = _0x2dd2b6.value.trim();
      _0x37e8dd.textContent = _0x329871
        ? _0x329871.charAt(0).toUpperCase()
        : "؟";
    });
  }
  async function _0x5223f2() {
    const _0x143570 = _0x2dd2b6 ? _0x2dd2b6.value.trim() : "";
    if (!_0x143570) {
      _0x368dca(
        _0x4854f2("من فضلك اكتب اسم الجروب", "Please enter a group name"),
      );
      return;
    }
    if (_0x143570.length > 60) {
      _0x368dca(_0x4854f2("اسم الجروب طويل أوي", "The group name is too long"));
      return;
    }
    if (_0x413b6b.size === 0) {
      _0x2fa3c0.classList.add("hidden");
      _0x8df67b();
      return;
    }
    _0x35667d.disabled = true;
    try {
      const _0x2d06e1 = await ensureAuthenticated();
      const _0x10e43e = [..._0x413b6b.values()];
      const _0x58e8c3 = [_0x2d06e1.uid];
      const _0x11a25a = [_0x300541];
      const _0x5a8795 = [];
      for (const _0x2facf5 of _0x10e43e) {
        let _0x278f07 = null;
        try {
          const _0x377d6f = await getDoc(doc(db, "users", _0x2facf5.email));
          _0x278f07 = _0x377d6f.exists() ? _0x377d6f.data().uid : null;
        } catch (_0x27318c) {}
        if (_0x278f07 && !_0x58e8c3.includes(_0x278f07)) {
          _0x58e8c3.push(_0x278f07);
          _0x11a25a.push(_0x2facf5.email);
        } else if (!_0x278f07) {
          _0x5a8795.push(_0x2facf5.email);
        }
      }
      if (_0x5a8795.length) {
        console.warn(
          "تم استبعاد بعض الأعضاء من الجروب لعدم توفر حسابهم:",
          _0x5a8795,
        );
      }
      if (_0x58e8c3.length < 2) {
        _0x368dca(
          _0x4854f2(
            "حصلت مشكلة في بيانات الأعضاء المختارين، حاول تاني",
            "There was a problem with the selected members, please try again",
          ),
        );
        _0x35667d.disabled = false;
        return;
      }
      const _0x1b66a8 = collection(db, "groups");
      const _0x1a132b = await addDoc(_0x1b66a8, {
        name: _0x143570,
        photoURL: _0x4c6eed || "",
        ownerUid: _0x2d06e1.uid,
        ownerEmail: _0x300541,
        members: _0x58e8c3,
        memberEmails: _0x11a25a,
        createdAt: serverTimestamp(),
      });
      try {
        const _0x922cda = (await _0x15bffc(_0x300541)).name;
        await addDoc(collection(db, "groups", _0x1a132b.id, "messages"), {
          type: "system",
          text: _0x4854f2(
            _0x922cda + " أنشأ الجروب",
            _0x922cda + " created the group",
          ),
          createdAt: serverTimestamp(),
        });
      } catch (_0x2d1eac) {}
      _0x2fa3c0.classList.add("hidden");
      _0x142271();
      _0x413b6b.clear();
      localStorage.setItem("cz_active_group_id", _0x1a132b.id);
      window.location.href = "conv-group.html";
    } catch (_0x1af7a7) {
      console.error("فشل إنشاء الجروب:", _0x1af7a7);
      _0x368dca(
        _0x4854f2(
          "حصل خطأ أثناء إنشاء الجروب، حاول تاني",
          "Something went wrong creating the group, please try again",
        ),
      );
    } finally {
      _0x35667d.disabled = false;
    }
  }
  if (_0x35667d) {
    _0x35667d.addEventListener("click", _0x5223f2);
  }
  if (_0x2dd2b6) {
    _0x2dd2b6.addEventListener("keydown", (_0x5dae1) => {
      if (_0x5dae1.key === "Enter") {
        _0x5223f2();
      }
    });
  }
  let _0x5e22c1 = [];
  function _0x2d95e7(_0x182a40) {
    if (!_0x182a40) {
      return "";
    }
    const _0x4227a0 = new Date();
    const _0x5dc0b7 = _0x4227a0 - _0x182a40;
    const _0x158ec9 = Math.floor(_0x5dc0b7 / 60000);
    if (_0x158ec9 < 1) {
      return _0x4854f2("الآن", "now");
    }
    if (_0x158ec9 < 60) {
      return _0x4854f2("منذ " + _0x158ec9 + " د", _0x158ec9 + "m");
    }
    const _0x1850d6 = Math.floor(_0x158ec9 / 60);
    if (_0x1850d6 < 24) {
      return _0x4854f2("منذ " + _0x1850d6 + " س", _0x1850d6 + "h");
    }
    const _0x3a19a6 = Math.floor(_0x1850d6 / 24);
    return _0x4854f2("منذ " + _0x3a19a6 + " ي", _0x3a19a6 + "d");
  }
  function _0xd23a99(_0x35f2d4) {
    if (!_0x366b4f) {
      return;
    }
    const _0x2dd24b = (_0x1007ad && _0x1007ad.value.trim().toLowerCase()) || "";
    const _0x1a1c34 = _0x2dd24b
      ? _0x35f2d4.filter((_0x2bcc2f) =>
          (_0x2bcc2f.name || "").toLowerCase().includes(_0x2dd24b),
        )
      : _0x35f2d4;
    _0x366b4f.innerHTML = "";
    if (!_0x1a1c34.length) {
      const _0x5e3d1c = document.createElement("div");
      _0x5e3d1c.className = "empty-state";
      _0x5e3d1c.innerHTML =
        '\n                <div class="empty-icon">👥</div>\n                <p class="empty-title">' +
        _0x4854f2("مفيش جروبات لسه", "No groups yet") +
        '</p>\n                <p class="empty-sub">' +
        _0x4854f2(
          "دوس على علامة + وابدأ أول جروب",
          "Tap + to start your first group",
        ) +
        "</p>\n            ";
      _0x366b4f.appendChild(_0x5e3d1c);
      return;
    }
    _0x1a1c34.forEach((_0x40e0d3) => {
      const _0x53b955 = document.createElement("div");
      _0x53b955.className = "chat-row";
      _0x53b955.dataset.groupId = _0x40e0d3.id;
      const _0x583be0 = (_0x40e0d3.name || "؟").trim().charAt(0).toUpperCase();
      const _0x3c9a6d = _0x40e0d3.photoURL
        ? '<img class="chat-row-avatar-img" src="' +
          _0x40e0d3.photoURL +
          '" alt="">'
        : '<span class="group-row-avatar-initial">' + _0x583be0 + "</span>";
      const _0x29f8cd = (_0x40e0d3.members && _0x40e0d3.members.length) || 0;
      const _0x218b8b = _0x4854f2(_0x29f8cd + " أعضاء", _0x29f8cd + " members");
      _0x53b955.innerHTML =
        '\n                <div class="chat-row-avatar">' +
        _0x3c9a6d +
        '</div>\n                <div class="chat-row-text">\n                    <h4 class="chat-row-name">' +
        (_0x40e0d3.name || "").replace(/</g, "&lt;").replace(/>/g, "&gt;") +
        '</h4>\n                    <p class="chat-row-preview">' +
        _0x218b8b +
        '</p>\n                </div>\n                <div class="chat-row-meta">\n                    <div class="chat-row-meta-top">\n                        <span class="chat-row-time">' +
        _0x2d95e7(_0x40e0d3.createdAtDate) +
        "</span>\n                    </div>\n                </div>\n            ";
      _0x53b955.addEventListener("click", () => {
        localStorage.setItem("cz_active_group_id", _0x40e0d3.id);
        window.location.href = "conv-group.html";
      });
      _0x366b4f.appendChild(_0x53b955);
    });
  }
  async function _0x10f891() {
    try {
      const _0x455a43 = await ensureAuthenticated();
      const _0x268620 = collection(db, "groups");
      const _0x131f1f = query(
        _0x268620,
        where("members", "array-contains", _0x455a43.uid),
      );
      onSnapshot(
        _0x131f1f,
        (_0x5f4ff2) => {
          const _0x240c99 = [];
          _0x5f4ff2.forEach((_0x42dc98) => {
            const _0x9fbab0 = _0x42dc98.data();
            _0x240c99.push({
              id: _0x42dc98.id,
              name: _0x9fbab0.name || "",
              photoURL: _0x9fbab0.photoURL || "",
              members: _0x9fbab0.members || [],
              createdAtDate:
                _0x9fbab0.createdAt && _0x9fbab0.createdAt.toDate
                  ? _0x9fbab0.createdAt.toDate()
                  : null,
            });
          });
          _0x240c99.sort(
            (_0x39f0f2, _0x107f39) =>
              (_0x107f39.createdAtDate || 0) - (_0x39f0f2.createdAtDate || 0),
          );
          _0x5e22c1 = _0x240c99;
          _0xd23a99(_0x240c99);
        },
        (_0x49a9ff) => {
          console.error("فشل الاستماع لقائمة الجروبات:", _0x49a9ff);
        },
      );
    } catch (_0x2bb34e) {
      console.error("فشل تهيئة قائمة الجروبات:", _0x2bb34e);
    }
  }
  if (_0x1007ad) {
    _0x1007ad.addEventListener("input", () => _0xd23a99(_0x5e22c1));
  }
  _0x10f891();
})();
