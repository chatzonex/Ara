/* ===================================================
   EMOJI-FEATURE.JS
   ملف مستقل تمامًا — مش بيلمس أي كود موجود في main.js /
   conversation.js / conv-group.js / groups.js / settings.js
   (زي enhancements.js بالظبط، بنفس المبدأ).

   بيضيف:
   1) زرار إيموجي جنب خانة الكتابة (شكل زي واتساب)
   2) بيكر شبكة إيموجي أفقي بستايل iOS (صور مش رموز
      يونيكود) — 4 صفوف ثابتة، يتحرك بالسحب يمين/شمال
      بدل ما ينزل لتحت، وبيفضل الكيبورد مقفول لما يفتح
   3) عند الاختيار: التوكن بيتحط في التكستاريا الحقيقية
      (عشان كود الإرسال الأصلي يشتغل من غير أي تعديل)،
      وفوقها طبقة عرض حي (overlay) بتحول التوكن لصورة
      إيموجي فورًا وانت لسه بتكتب / بعد ما تقفل الشات
      وترجعله تاني
   4) العرض في فقاعات الرسائل يشتغل عند المرسل والمستقبل
      عن طريق مراقبة الرسائل اللي conversation.js بيبنيها
      في الـ DOM (MutationObserver) بدون التعديل في كود
      الإرسال/الاستقبال نفسه

   طريقة الترميز: كل رسالة فيها إيموجي مخصص بتتبعت كنص عادي
   فيه توكن مخفي بالشكل: [[czemoji:g0_5]]
   وقت العرض، الكود ده بيتحول لصورة <img> بدل النص.
=================================================== */

(function () {
    'use strict';

    /* ============ Config ============ */
    // عدّل المسار ده لو رفعت الملفات في مكان تاني غير جنب هذا الملف
    var SPRITE_URL = 'emoji-sprite.webp';
    var MANIFEST_URL = 'emoji-manifest.json';
    var TOKEN_PREFIX = '[[czemoji:';
    var TOKEN_SUFFIX = ']]';
    var TOKEN_RE = /\[\[czemoji:([a-zA-Z0-9_]+)\]\]/g;
    // علامات عزل اتجاه يونيكود (Unicode Bidi Isolate) بتتحط حوالين
    // كل توكن. المشكلة الأصلية: حروف التوكن الإنجليزية ("czemoji")
    // لما تتحط جوه جملة عربي (RTL)، المتصفح بيتعامل معاها كأنها
    // "كلمة إنجليزية" وسط الجملة العربي، فبيعيد ترتيبها بصريًا حسب
    // خوارزمية Bidi — وده اللي بيخلي إيموجي يظهر قبل الكلمة أو
    // يتلخبط الترتيب لو حطيت كذا إيموجي ورا بعض. بلفّ التوكن بعلامتي
    // العزل دول، بنقول للمتصفح "الجزء ده اتجاهه منعزل عن الجملة اللي
    // حواليه" فمبيأثرش في ترتيب أي حاجة تانية ولا بيتأثر بيها.
    var ISOLATE_START = '\u2066'; // LRI - Left-to-Right Isolate
    var ISOLATE_END = '\u2069';   // PDI - Pop Directional Isolate

    var manifestData = null; // { size, cols, rows, items: [{id,x,y}] }
    var manifestById = {};   // id -> {x,y}

    function $(id) { return document.getElementById(id); }

    /* ============ تحميل الـ manifest ============ */
    function loadManifest() {
        if (manifestData) return Promise.resolve(manifestData);
        return fetch(MANIFEST_URL)
            .then(function (r) { return r.json(); })
            .then(function (data) {
                manifestData = data;
                data.items.forEach(function (it) { manifestById[it.id] = it; });
                return data;
            })
            .catch(function (e) {
                console.error('فشل تحميل manifest الإيموجي:', e);
                return null;
            });
    }

    /* ============ بناء صورة إيموجي من الـ sprite ============ */
    function buildEmojiSpanHTML(emojiId, sizePx) {
        var it = manifestById[emojiId];
        if (!it || !manifestData) return '';
        var size = manifestData.size;
        var scale = (sizePx || 22) / size;
        var bgW = Math.round(manifestData.cols * size * scale);
        var bgH = Math.round(manifestData.rows * size * scale);
        var bgX = Math.round(it.x * scale);
        var bgY = Math.round(it.y * scale);
        var s = (sizePx || 22);
        return '<span class="cz-emoji-img" data-emoji-id="' + emojiId + '" ' +
            'style="display:inline-block;vertical-align:-4px;width:' + s + 'px;height:' + s + 'px;' +
            'background-image:url(\'' + SPRITE_URL + '\');' +
            'background-repeat:no-repeat;' +
            'background-position:-' + bgX + 'px -' + bgY + 'px;' +
            'background-size:' + bgW + 'px ' + bgH + 'px;"></span>';
    }

    /* ============ تحويل نص فيه توكنز لـ HTML فيه صور ============ */
    function renderTextWithEmoji(text, sizePx) {
        if (!text) return '';
        var out = '';
        var lastIndex = 0;
        var m;
        TOKEN_RE.lastIndex = 0;
        while ((m = TOKEN_RE.exec(text)) !== null) {
            var before = text.slice(lastIndex, m.index);
            if (before) out += escapeHTML(before);
            out += buildEmojiSpanHTML(m[1], sizePx);
            lastIndex = TOKEN_RE.lastIndex;
        }
        out += escapeHTML(text.slice(lastIndex));
        return out;
    }

    function escapeHTML(s) {
        var div = document.createElement('div');
        div.textContent = s;
        return div.innerHTML;
    }

    /* ============ [1] زرار الإيموجي جنب خانة الكتابة ============ */
    var emojiBtn = null;

    function injectEmojiButton() {
        var inputBar = $('convInputBar');
        var textarea = $('convTextarea');
        var sendBtn = $('convSendBtn');
        if (!inputBar || !textarea || !sendBtn) return null;
        if ($('czEmojiBtn')) return $('czEmojiBtn'); // موجود بالفعل

        var btn = document.createElement('button');
        btn.type = 'button';
        btn.id = 'czEmojiBtn';
        btn.className = 'cz-emoji-trigger-btn';
        btn.setAttribute('aria-label', 'إيموجي');
        btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' +
            '<circle cx="12" cy="12" r="9.3"></circle>' +
            '<path d="M8.3 14.2c1 1.3 2.2 2 3.7 2s2.7-.7 3.7-2"></path>' +
            '<circle cx="8.7" cy="9.7" r="1" fill="currentColor" stroke="none"></circle>' +
            '<circle cx="15.3" cy="9.7" r="1" fill="currentColor" stroke="none"></circle>' +
            '</svg>';

        // نحط الزرار قبل التكستاريا مباشرة (يمين التكستاريا في RTL)
        inputBar.insertBefore(btn, textarea);

        btn.addEventListener('click', function () {
            if (pickerEl && pickerEl.classList.contains('open')) {
                closeEmojiPicker();
            } else {
                openEmojiPicker();
            }
        });

        emojiBtn = btn;
        return btn;
    }

    /* ============ [1.5] طبقة العرض الحي فوق التكستاريا ============
       التكستاريا الحقيقية بتفضل تشتغل زي ما هي (كود الإرسال
       الأصلي بيقرا .value منها عادي)، بس نص التوكن بيتخفى
       بصريًا (color: transparent) وبنحط طبقة overlay فوقها
       بالظبط بتعرض نفس المحتوى بس بصورة إيموجي بدل التوكن.
       ================================================= */
    var overlayEl = null;
    var overlayTextarea = null;

    function ensureOverlay() {
        var textarea = $('convTextarea');
        if (!textarea) return null;
        if (overlayEl && overlayTextarea === textarea) return overlayEl;

        var wrap = textarea.parentElement;
        if (!wrap) return null;

        var overlay = document.createElement('div');
        overlay.className = 'cz-textarea-overlay';
        overlay.id = 'czTextareaOverlay';
        wrap.insertBefore(overlay, textarea.nextSibling);

        textarea.classList.add('cz-has-overlay');

        overlayEl = overlay;
        overlayTextarea = textarea;

        syncOverlayGeometry();
        loadManifest().then(syncOverlayContent);

        // نتابع أي تغيير في المحتوى أو التمرير جوه التكستاريا.
        // بنأجل القراءة لفريم واحد عشان أي كود تاني بيغيّر ارتفاع
        // التكستاريا على نفس الحدث يكون خلص شغله الأول.
        textarea.addEventListener('input', function () {
            syncOverlayContent();
            requestAnimationFrame(syncOverlayGeometry);
        });
        textarea.addEventListener('scroll', syncOverlayScroll);
        window.addEventListener('resize', syncOverlayGeometry);

        // بعد الإرسال (زرار أو Enter) التكستاريا بتتفضى غالبًا
        // من غير ما يتطلق حدث input؛ بنعمل مزامنة يدوية بعدها
        // بشوية فريمات عشان نلحق أي تغيير متأخر في القيمة/الحجم.
        var sendBtn = $('convSendBtn');
        function syncSoonAfterSend() {
            requestAnimationFrame(function () {
                syncOverlayContent();
                requestAnimationFrame(syncOverlayGeometry);
            });
        }
        if (sendBtn) sendBtn.addEventListener('click', syncSoonAfterSend);
        textarea.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' && !e.shiftKey) syncSoonAfterSend();
        });

        return overlay;
    }

    function syncOverlayGeometry() {
        var textarea = overlayTextarea;
        if (!textarea || !overlayEl) return;
        var cs = window.getComputedStyle(textarea);
        overlayEl.style.left = textarea.offsetLeft + 'px';
        overlayEl.style.top = textarea.offsetTop + 'px';
        overlayEl.style.width = textarea.offsetWidth + 'px';
        overlayEl.style.height = textarea.offsetHeight + 'px';
        overlayEl.style.paddingTop = cs.paddingTop;
        overlayEl.style.paddingRight = cs.paddingRight;
        overlayEl.style.paddingBottom = cs.paddingBottom;
        overlayEl.style.paddingLeft = cs.paddingLeft;
        overlayEl.style.borderTopWidth = cs.borderTopWidth;
        overlayEl.style.borderRightWidth = cs.borderRightWidth;
        overlayEl.style.borderBottomWidth = cs.borderBottomWidth;
        overlayEl.style.borderLeftWidth = cs.borderLeftWidth;
        overlayEl.style.borderStyle = 'solid';
        overlayEl.style.borderColor = 'transparent';
        overlayEl.style.fontSize = cs.fontSize;
        overlayEl.style.fontFamily = cs.fontFamily;
        overlayEl.style.fontWeight = cs.fontWeight;
        overlayEl.style.lineHeight = cs.lineHeight;
        overlayEl.style.textAlign = cs.textAlign;
    }

    function syncOverlayContent() {
        if (!overlayEl || !overlayTextarea) return;
        var raw = overlayTextarea.value || '';
        if (!manifestData) {
            // لسه الـ manifest ملحملش: منعرضش التوكن الخام أبدًا، نشيله
            // مؤقتًا لحد ما يجهز (هيترندر صورة فورًا أول ما يجهز، تحت)
            TOKEN_RE.lastIndex = 0;
            overlayEl.textContent = raw.replace(TOKEN_RE, '');
            return;
        }
        // مقاس الإيموجي في خانة الكتابة أكبر شوية من حجم الخط عشان يبان واضح
        var baseSize = parseFloat(window.getComputedStyle(overlayTextarea).fontSize) || 20;
        overlayEl.innerHTML = renderTextWithEmoji(raw, Math.round(baseSize * 1.25));
        syncOverlayScroll();
        syncOverlayGeometry();
    }

    function syncOverlayScroll() {
        if (!overlayEl || !overlayTextarea) return;
        overlayEl.scrollTop = overlayTextarea.scrollTop;
        overlayEl.scrollLeft = overlayTextarea.scrollLeft;
    }

    /* ============ [2] بيكر الإيموجي (أفقي، سحب باليد) ============ */
    var pickerEl = null;
    var scrollEl = null;

    function buildPicker() {
        if (pickerEl) return pickerEl;

        var overlay = document.createElement('div');
        overlay.id = 'czEmojiPickerOverlay';
        overlay.className = 'cz-emoji-picker-overlay';

        var sheet = document.createElement('div');
        sheet.className = 'cz-emoji-picker-sheet';

        var handle = document.createElement('div');
        handle.className = 'cz-emoji-picker-handle';
        sheet.appendChild(handle);

        var scroller = document.createElement('div');
        scroller.className = 'cz-emoji-picker-scroll';
        scroller.id = 'czEmojiPickerScroll';

        var grid = document.createElement('div');
        grid.className = 'cz-emoji-picker-grid';
        grid.id = 'czEmojiPickerGrid';
        scroller.appendChild(grid);
        sheet.appendChild(scroller);

        overlay.appendChild(sheet);
        document.body.appendChild(overlay);

        overlay.addEventListener('click', function (e) {
            if (e.target === overlay) closeEmojiPicker();
        });

        enableDragScroll(scroller);

        pickerEl = overlay;
        scrollEl = scroller;
        return overlay;
    }

    /* سحب أفقي باليد/بالماوس بدل السكرول العادي (بيمنع فتح
       الكيبورد لأنه مش بيلمس أي input، وبيدي إحساس سحب طبيعي) */
    function enableDragScroll(el) {
        var isDown = false;
        var startX = 0;
        var startScroll = 0;
        var moved = false;

        function pointerDown(e) {
            isDown = true;
            moved = false;
            el.classList.add('cz-dragging');
            startX = (e.touches ? e.touches[0].clientX : e.clientX);
            startScroll = el.scrollLeft;
        }

        function pointerMove(e) {
            if (!isDown) return;
            var x = (e.touches ? e.touches[0].clientX : e.clientX);
            var dx = x - startX;
            if (Math.abs(dx) > 3) moved = true;
            el.scrollLeft = startScroll - dx;
            if (e.cancelable && e.touches) e.preventDefault();
        }

        function pointerUp() {
            isDown = false;
            el.classList.remove('cz-dragging');
        }

        el.addEventListener('mousedown', pointerDown);
        window.addEventListener('mousemove', pointerMove);
        window.addEventListener('mouseup', pointerUp);

        el.addEventListener('touchstart', pointerDown, { passive: true });
        el.addEventListener('touchmove', pointerMove, { passive: false });
        el.addEventListener('touchend', pointerUp);

        // نمنع الكليك على إيموجي لو كان جزء من عملية سحب
        el.addEventListener('click', function (e) {
            if (moved) {
                e.stopPropagation();
                e.preventDefault();
            }
        }, true);
    }

    function populateGrid() {
        var grid = $('czEmojiPickerGrid');
        if (!grid || !manifestData) return;
        if (grid.childElementCount > 0) return; // اتبنى قبل كده

        var frag = document.createDocumentFragment();
        manifestData.items.forEach(function (it) {
            var cell = document.createElement('div');
            cell.className = 'cz-emoji-picker-cell';
            cell.innerHTML = buildEmojiSpanHTML(it.id, 34);
            cell.addEventListener('click', function () {
                insertEmojiToken(it.id);
            });
            frag.appendChild(cell);
        });
        grid.appendChild(frag);
    }

    function openEmojiPicker() {
        var overlay = buildPicker();
        // نتأكد إن التكستاريا مش عليها فوكس عشان الكيبورد يقفل/يفضل مقفول
        var textarea = $('convTextarea');
        if (textarea && document.activeElement === textarea) {
            textarea.blur();
        }
        loadManifest().then(function () {
            populateGrid();
            overlay.classList.add('open');
        });
        if (emojiBtn) emojiBtn.classList.add('cz-active');
    }

    function closeEmojiPicker() {
        if (pickerEl) pickerEl.classList.remove('open');
        if (emojiBtn) emojiBtn.classList.remove('cz-active');
    }

    /* ============ إدراج التوكن في خانة الكتابة ============
       القايمة بتفضل مفتوحة بعد الاختيار (زي واتساب) عشان
       المستخدم يقدر يحط أكتر من إيموجي ورا بعض من غير ما
       يفتح ويقفل كل مرة. بيقفلها هو لما يدوس برا الشيت أو
       على الزرار تاني. */
    function insertEmojiToken(emojiId) {
        var textarea = $('convTextarea');
        if (!textarea) return;
        var token = ISOLATE_START + TOKEN_PREFIX + emojiId + TOKEN_SUFFIX + ISOLATE_END;
        var start = textarea.selectionStart != null ? textarea.selectionStart : textarea.value.length;
        var end = textarea.selectionEnd != null ? textarea.selectionEnd : textarea.value.length;
        var val = textarea.value;
        textarea.value = val.slice(0, start) + token + val.slice(end);
        var newPos = start + token.length;
        textarea.setSelectionRange(newPos, newPos);
        // نطلق حدث input عشان أي listener موجود (زي تكبير التكستاريا) يشتغل
        // وعشان طبقة العرض الحي تتزامن فورًا
        textarea.dispatchEvent(new Event('input', { bubbles: true }));

        if (navigator.vibrate) {
            try { navigator.vibrate(6); } catch (e) {}
        }
    }

    /* ============ [3] تحويل الرسائل المعروضة لصور ============
       بيراقب convMessages وأي فقاعة جديدة تتضاف، يدور على
       .bubble-text جواها ولو لاقى توكن إيموجي يستبدله بصورة
       ================================================= */
    var BUBBLE_EMOJI_SIZE = 26; // كان 22 — كبرناه شوية عشان يبان أوضح

    function processMessageBubble(bubbleEl) {
        if (bubbleEl.dataset.czEmojiProcessed === '1') return;

        var textEl = bubbleEl.querySelector('.bubble-text');
        if (!textEl) return;

        // بنحتفظ بالنص الأصلي أول مرة نشوف فيها الفقاعة دي، عشان لو
        // المانيفست لسه مجهزش، نقدر نرجعله تاني بعد كده من غير ما
        // نفقد التوكن (بعد ما نكون شلناه من العرض مؤقتًا تحت)
        var raw = bubbleEl.dataset.czRawText;
        if (raw === undefined) {
            raw = textEl.textContent || '';
            if (raw.indexOf(TOKEN_PREFIX) === -1) {
                bubbleEl.dataset.czEmojiProcessed = '1';
                return; // مفيش توكن أصلًا، متلمسهاش
            }
            bubbleEl.dataset.czRawText = raw;
        }

        if (!manifestData) {
            // منعرضش التوكن الخام خالص حتى مؤقتًا: نشيله من العرض
            // لحد ما المانيفست يجهز، وقتها processAllVisibleMessages
            // هيرجع يرندرها صورة كاملة (شوف watchMessagesContainer)
            TOKEN_RE.lastIndex = 0;
            textEl.textContent = raw.replace(TOKEN_RE, '');
            return; // من غير ما نعلّم إنها اتعملها processed
        }

        textEl.innerHTML = renderTextWithEmoji(raw, BUBBLE_EMOJI_SIZE);
        bubbleEl.classList.add('cz-has-emoji');
        bubbleEl.dataset.czEmojiProcessed = '1';
    }

    function processAllVisibleMessages() {
        var container = $('convMessages');
        if (!container) return;
        var bubbles = container.querySelectorAll('.bubble');
        bubbles.forEach(processMessageBubble);
    }

    function watchMessagesContainer() {
        var container = $('convMessages');
        if (!container) return;

        loadManifest().then(function () {
            processAllVisibleMessages();
        });

        var observer = new MutationObserver(function (mutations) {
            // ملحوظة: مبنستناش المانيفست هنا عمدًا — processMessageBubble
            // بقى بيخفي التوكن الخام بنفسه فورًا لو المانيفست لسه مجهزش،
            // وبيترندر صورة كاملة لما يجهز (بدل ما نسيب التوكن الخام باين)
            var needsProcess = false;
            mutations.forEach(function (m) {
                if (m.addedNodes && m.addedNodes.length) needsProcess = true;
            });
            if (needsProcess) processAllVisibleMessages();
        });
        observer.observe(container, { childList: true, subtree: true });
    }

    /* ============ نقطة الدخول ============ */
    function init() {
        var btn = injectEmojiButton();
        ensureOverlay();
        if (btn) {
            loadManifest().then(function () {
                syncOverlayContent();
            });
        }
        watchMessagesContainer();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
