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
    // علامات عزل اتجاه يونيكود (Unicode Bidi Isolate) بتتحط حوالين
    // كل توكن. المشكلة الأصلية: حروف التوكن الإنجليزية ("czemoji")
    // لما تتحط جوه جملة عربي (RTL)، المتصفح بيتعامل معاها كأنها
    // "كلمة إنجليزية" وسط الجملة العربي، فبيعيد ترتيبها بصريًا حسب
    // خوارزمية Bidi.
    //
    // ملحوظة مهمة (سبب مشكلة "الإيموجي التاني وما بعده بييجي قبل
    // الكلام"): كنا مستخدمين LRI (U+2066) اللي بيعزل الكتلة لكن
    // بيفرض عليها اتجاه LTR إجباريًا. المشكلة إن لما يبقى عندك أكتر
    // من توكن معزول ورا بعض جوه سطر RTL، كل الكتل دي بتبقى متجهة
    // LTR بالإجبار، فخوارزمية Bidi بترتب الكتل المتتالية دي بالنسبة
    // لبعضها بمنطق LTR (كأنها "جملة إنجليزية" فيها كذا كلمة) بدل ما
    // تحترم ترتيب ظهورها الأصلي في السطر العربي — فده اللي كان بيخلي
    // الإيموجي التاني والتالت يظهروا *قبل* الأول بدل بعده.
    //
    // الحل: FSI (U+2068 - First Strong Isolate) بدل LRI. الفرق إن
    // FSI بيعزل الكتلة برضو (تمنع أي تسرب اتجاهي منها/ليها) لكن من
    // غير ما تفرض عليها اتجاه معين — الاتجاه بيتحدد تلقائيًا من أول
    // حرف "قوي" جوه الكتلة نفسها (هنا هيبقى LTR برضو لأن "czemoji"
    // إنجليزي، بس من غير الإجبار اللي كان بيسرب على ترتيب الكتل
    // المتجاورة). ده بالظبط الاستخدام الموصى بيه في مواصفة يونيكود
    // للرموز/الرموز التعبيرية جوه نص بلغة باتجاه مختلف.
    var ISOLATE_START = '\u2068'; // FSI - First Strong Isolate
    var ISOLATE_END = '\u2069';   // PDI - Pop Directional Isolate
    // مهم جدًا: الـ regex لازم ياخد علامتي العزل دول *جوه* حدود المطابقة
    // نفسها (مش بس [[czemoji:...]])، وإلا وقت الاستبدال بالصورة أو وقت
    // الحذف هيفضل فيه \u2066/\u2068 و/أو \u2069 عالقين كنص خفي غريب في
    // العرض أو في محتوى التكستاريا — وده كان بالظبط سبب ظهور "الرموز
    // الغريبة" حوالين الإيموجي وسبب إن الحذف كان مش بيمسح التوكن
    // بالكامل كوحدة.
    // بنتقبل في القراءة (الـ regex) كل من \u2066 (LRI، القيمة القديمة
    // اللي كانت متخزنة في رسايل اتبعتت قبل هذا التعديل) و\u2068 (FSI،
    // القيمة الجديدة) عشان الرسايل القديمة تفضل تتفك وتتعرض صح برضو،
    // حتى لو الإدراج الجديد (insertEmojiToken) بيستخدم FSI بس من هنا
    // وطالع.
    var ISOLATE_START_ESC = '[\\u2066\\u2068]';
    var ISOLATE_END_ESC = '\\u2069';
    var TOKEN_RE = new RegExp(
        ISOLATE_START_ESC + '?' + '\\[\\[czemoji:([a-zA-Z0-9_]+)\\]\\]' + ISOLATE_END_ESC + '?',
        'g'
    );

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
    var fakeCaretEl = null;

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

        // بما إن التكستاريا الحقيقية بقت opacity:0 (مش ظاهرة خالص)،
        // أي كليك/لمسة المستخدم بيعملها على مكانها المفروض توصل
        // للتكستاريا نفسها عشان الكيبورد يفتح ويتحط فيها فوكس. الـ
        // overlay فوقها بصريًا بس pointer-events:none في الـ CSS
        // الأصلي، فده أصلاً بيحصل تلقائيًا (اللمسة بتعدي للي تحتها).
        // كاريت وهمي مرسوم فوق كل ده يوضح للمستخدم مكان الكتابة.
        var caret = document.createElement('div');
        caret.className = 'cz-fake-caret';
        overlay.appendChild(caret);
        fakeCaretEl = caret;

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
            requestAnimationFrame(syncFakeCaret);
        });
        textarea.addEventListener('scroll', syncOverlayScroll);
        textarea.addEventListener('click', syncFakeCaret);
        textarea.addEventListener('keyup', syncFakeCaret);
        textarea.addEventListener('focus', syncFakeCaret);
        textarea.addEventListener('blur', hideFakeCaret);
        window.addEventListener('resize', syncOverlayGeometry);

        // بعد الإرسال (زرار أو Enter) التكستاريا بتتفضى غالبًا
        // من غير ما يتطلق حدث input؛ بنعمل مزامنة يدوية بعدها
        // بشوية فريمات عشان نلحق أي تغيير متأخر في القيمة/الحجم.
        var sendBtn = $('convSendBtn');
        function syncSoonAfterSend() {
            requestAnimationFrame(function () {
                syncOverlayContent();
                requestAnimationFrame(syncOverlayGeometry);
                requestAnimationFrame(syncFakeCaret);
            });
        }
        if (sendBtn) sendBtn.addEventListener('click', syncSoonAfterSend);
        textarea.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' && !e.shiftKey) syncSoonAfterSend();
            else handleEmojiTokenDeletion(e, textarea);
        });

        return overlay;
    }

    /* ============ حذف التوكن كوحدة واحدة بضغطة Backspace/Delete ============
       من غير المعالجة دي، Backspace كان بيمسح حرف واحد بس من التوكن في كل
       ضغطة (وأول حاجة بتتمسح هي علامة العزل \u2069 نفسها، مش جزء من
       [[czemoji:...]])، فكان المستخدم لازم يدوس مرات كتير عشان يمسح
       إيموجي واحد، وكان بيشوف بقايا حروف التوكن الخام أثناء كده.
       هنا: لو الحذف هيلمس توكن إيموجي كامل (بعلامات العزل حواليه)،
       بنمنع السلوك الافتراضي ونمسح التوكن بالكامل بضغطة واحدة، زي أي
       تطبيق شات بيتعامل مع الإيموجي كوحدة واحدة غير قابلة للتقسيم. */
    function handleEmojiTokenDeletion(e, textarea) {
        if (e.key !== 'Backspace' && e.key !== 'Delete') return;

        var val = textarea.value;
        var start = textarea.selectionStart;
        var end = textarea.selectionEnd;

        // لو فيه تحديد نص (مش مجرد مؤشر)، سيب المتصفح يتعامل عادي
        if (start !== end) return;

        // نبني نسخة من الـ regex بدون علم /g عشان نقدر نستخدمها في exec
        // بأمان من غير مشاكل lastIndex بين استدعاءات مختلفة
        var re = new RegExp(TOKEN_RE.source, 'g');
        var m;
        var target = null;

        while ((m = re.exec(val)) !== null) {
            if (e.key === 'Backspace' && m.index < start && (m.index + m[0].length) >= start) {
                target = m;
                break;
            }
            if (e.key === 'Delete' && m.index <= start && (m.index + m[0].length) > start) {
                target = m;
                break;
            }
        }

        if (!target) return; // مفيش توكن ملامس للمؤشر، سيب السلوك الافتراضي

        e.preventDefault();
        var newVal = val.slice(0, target.index) + val.slice(target.index + target[0].length);
        textarea.value = newVal;
        var newPos = target.index;
        textarea.setSelectionRange(newPos, newPos);
        textarea.dispatchEvent(new Event('input', { bubbles: true }));
        requestAnimationFrame(syncFakeCaret);

        if (navigator.vibrate) {
            try { navigator.vibrate(4); } catch (e2) {}
        }
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

    /* ============ حساب وتحريك الكاريت الوهمي ============
       بما إن التكستاريا الحقيقية opacity:0، الكاريت الأصلي بتاعها
       مبيبانش. عشان نعرف إحداثيات مكان الكتابة بالظبط (بعد أي
       صور إيموجي قبله)، بنستخدم "مرآة" مخفية: div بنفس فونت/عرض/
       padding التكستاريا بالظبط، بنحط فيه نفس النص لحد موضع
       المؤشر بس (متحول لصور برضو عشان نحسب عرض الصورة صح مش
       عرض التوكن النصي)، وبعد آخر حرف بنحط span فاضي ونقرا
       مكانه (offsetLeft/offsetTop) — ده مكان الكاريت بالظبط. */
    var mirrorEl = null;

    function ensureMirror() {
        if (mirrorEl) return mirrorEl;
        var m = document.createElement('div');
        m.style.position = 'absolute';
        m.style.visibility = 'hidden';
        m.style.pointerEvents = 'none';
        m.style.whiteSpace = 'pre-wrap';
        m.style.wordBreak = 'break-word';
        m.style.boxSizing = 'border-box';
        m.style.top = '0';
        m.style.left = '-9999px';
        document.body.appendChild(m);
        mirrorEl = m;
        return m;
    }

    function hideFakeCaret() {
        if (fakeCaretEl) fakeCaretEl.style.opacity = '0';
    }

    function syncFakeCaret() {
        if (!fakeCaretEl || !overlayTextarea || !overlayEl) return;
        if (document.activeElement !== overlayTextarea) {
            hideFakeCaret();
            return;
        }
        fakeCaretEl.style.opacity = '';

        var textarea = overlayTextarea;
        var pos = textarea.selectionStart != null ? textarea.selectionStart : textarea.value.length;
        var raw = textarea.value || '';
        var before = raw.slice(0, pos);

        var mirror = ensureMirror();
        var cs = window.getComputedStyle(textarea);
        ['fontSize', 'fontFamily', 'fontWeight', 'lineHeight', 'letterSpacing',
            'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft',
            'borderTopWidth', 'borderRightWidth', 'borderBottomWidth', 'borderLeftWidth',
            'textAlign', 'direction'].forEach(function (prop) {
            mirror.style[prop] = cs[prop];
        });
        mirror.style.width = textarea.clientWidth + 'px';

        // بنحول النص لحد موضع المؤشر لصور (زي renderTextWithEmoji)
        // عشان الحساب يبقى دقيق حتى لو فيه إيموجي قبل المؤشر.
        var baseSize = parseFloat(cs.fontSize) || 20;
        mirror.innerHTML = renderTextWithEmoji(before, Math.round(baseSize * 1.25));
        var marker = document.createElement('span');
        marker.textContent = '\u200b'; // zero-width، بس عشان نقدر ناخد إحداثياته
        mirror.appendChild(marker);

        var caretLeft = marker.offsetLeft;
        var caretTop = marker.offsetTop;
        var lineHeight = parseFloat(cs.lineHeight) || (baseSize * 1.3);

        fakeCaretEl.style.left = caretLeft + 'px';
        fakeCaretEl.style.top = (caretTop + 1) + 'px';
        fakeCaretEl.style.height = Math.max(lineHeight * 0.72, baseSize) + 'px';

        // نراعي سكرول التكستاريا (لو النص أطول من ارتفاعها)
        fakeCaretEl.style.transform = 'translate(0, -' + textarea.scrollTop + 'px)';
    }

    /* ============ [2] بيكر الإيموجي (أفقي، سحب باليد) ============ */
    var pickerEl = null;
    var scrollEl = null;
    var gridEl = null;
    var activeTab = 'all'; // 'all' | 'recent'

    /* ============ عداد استخدام الإيموجي (محفوظ على الجهاز) ============ */
    var USAGE_KEY = 'cz_emoji_usage_v1';

    function loadUsage() {
        try {
            var raw = localStorage.getItem(USAGE_KEY);
            return raw ? JSON.parse(raw) : {};
        } catch (e) { return {}; }
    }

    function bumpUsage(emojiId) {
        try {
            var usage = loadUsage();
            usage[emojiId] = (usage[emojiId] || 0) + 1;
            localStorage.setItem(USAGE_KEY, JSON.stringify(usage));
        } catch (e) { /* لو التخزين مقفول، منعملش حاجة، البيكر لسه شغال عادي */ }
    }

    // بيرجع IDs الإيموجي اللي اتستخدمت قبل كده، مرتبة من الأكتر استخدامًا للأقل
    function getMostUsedIds() {
        var usage = loadUsage();
        return Object.keys(usage)
            .filter(function (id) { return usage[id] > 0 && manifestById[id]; })
            .sort(function (a, b) { return usage[b] - usage[a]; });
    }

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

        /* بار التبويبات: لازم يتحط قبل شبكة الإيموجي في الـ DOM
           عشان الـ flex column يرتبهم فوق (البار) وتحت (الشبكة)
           تلقائيًا من غير أي تداخل بينهم */
        var tabs = document.createElement('div');
        tabs.className = 'cz-emoji-tabs';

        var tabAll = document.createElement('button');
        tabAll.type = 'button';
        tabAll.className = 'cz-emoji-tab cz-active';
        tabAll.textContent = 'الكل';
        tabAll.dataset.tab = 'all';
        tabAll.addEventListener('click', function () { switchTab('all'); });

        var tabRecent = document.createElement('button');
        tabRecent.type = 'button';
        tabRecent.className = 'cz-emoji-tab';
        tabRecent.textContent = 'الأكثر استخدامًا';
        tabRecent.dataset.tab = 'recent';
        tabRecent.addEventListener('click', function () { switchTab('recent'); });

        tabs.appendChild(tabAll);
        tabs.appendChild(tabRecent);
        sheet.appendChild(tabs);

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
        gridEl = grid;
        return overlay;
    }

    function switchTab(tab) {
        if (activeTab === tab) return;
        activeTab = tab;
        var tabEls = pickerEl ? pickerEl.querySelectorAll('.cz-emoji-tab') : [];
        tabEls.forEach(function (t) {
            t.classList.toggle('cz-active', t.dataset.tab === tab);
        });
        if (scrollEl) scrollEl.scrollLeft = 0; // رجّع للبداية كل ما تغيّر تبويب
        renderGrid();
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

    function renderGrid() {
        var grid = gridEl || $('czEmojiPickerGrid');
        if (!grid || !manifestData) return;
        grid.innerHTML = '';

        var ids = (activeTab === 'recent')
            ? getMostUsedIds()
            : manifestData.items.map(function (it) { return it.id; });

        if (activeTab === 'recent' && ids.length === 0) {
            grid.style.display = 'flex';
            grid.style.minWidth = '100%';
            var empty = document.createElement('div');
            empty.className = 'cz-emoji-empty';
            empty.textContent = 'لسه مفيش إيموجي استخدمته قبل كده';
            grid.appendChild(empty);
            return;
        }
        grid.style.display = '';
        grid.style.minWidth = '';

        var frag = document.createDocumentFragment();
        ids.forEach(function (id) {
            var cell = document.createElement('div');
            cell.className = 'cz-emoji-picker-cell';
            cell.innerHTML = buildEmojiSpanHTML(id, 34);
            cell.addEventListener('click', function () {
                insertEmojiToken(id);
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
            renderGrid();
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
        bumpUsage(emojiId);
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
        requestAnimationFrame(syncFakeCaret);

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

        // selectionchange بيتفعل مع أي تحريك للمؤشر حتى من غير كتابة
        // (زي الأسهم، أو لمس/سحب المؤشر على الموبايل) — بنستخدمه
        // عشان الكاريت الوهمي يفضل متزامن مع مكان الكتابة الحقيقي
        // في كل الحالات دي، مش بس وقت input.
        document.addEventListener('selectionchange', function () {
            if (overlayTextarea && document.activeElement === overlayTextarea) {
                syncFakeCaret();
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
