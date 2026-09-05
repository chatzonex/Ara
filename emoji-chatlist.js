/* ===================================================
   EMOJI-CHATLIST.JS
   ملف مستقل تمامًا — بنفس مبدأ emoji-feature.js — مش بيلمس
   main.js ولا أي كود موجود. بيحول توكنز الإيموجي المخصصة
   [[czemoji:g0_5]] لصور حقيقية في أي مكان بيظهر فيه نص آخر
   رسالة كمعاينة: شاشة الشاتات الرئيسية، الجروبات، والشاتات
   المخفية (أي عنصر بكلاس "chats-list").

   ليه ملف منفصل ومش جزء من emoji-feature.js؟
   عشان emoji-feature.js مبني حوالين صفحة الشات (convTextarea/
   convMessages) اللي مش موجودة في صفحة قايمة الشاتات. الملف ده
   بيدور بدل كده على أي عنصر نصي جوه ".chats-list" فيه توكن،
   من غير ما يعرف حاجة عن تفاصيل main.js الداخلية (اللي هو ملف
   مبني/مشفّر) — فيفضل شغال حتى لو شكل القايمة اتغيّر جوه main.js.

   المشكلة اللي بيحلها: كانت آخر رسالة في القايمة (لو فيها
   إيموجي مخصص) بتتعرض كنص خام زي [[czemoji:g0_13]] بدل الأيقونة،
   لأن main.js بيحط النص الخام من فايرستور من غير ما يعرف أصلًا
   إن التوكن ده لازم يتحول لصورة.

   طريقة الشغل: بندور جوه أي عنصر بكلاس "chats-list" على أي
   Text Node فيها التوكن، ونستبدلها بـ <span> (اسمه slot) بيحتفظ
   بالنص الأصلي في data-cz-raw-text، وبيعرض:
   - لو المانيفست لسه مجهزش: النص من غير أي توكن خام (مش بنعرض
     الترميز الخام أبدًا حتى مؤقتًا)
   - لو المانيفست جاهز: نفس النص لكن بصور الإيموجي مكان التوكنز
   وبنراقب القايمة بـ MutationObserver عشان أي رسالة جديدة أو
   تحديث في آخر رسالة (حتى لو بس تغيير نص) يترندر تلقائي.
=================================================== */

(function () {
    'use strict';

    var SPRITE_URL = 'emoji-sprite.webp';
    var MANIFEST_URL = 'emoji-manifest.json';
    var TOKEN_PREFIX = '[[czemoji:';
    var TOKEN_RE = /\[\[czemoji:([a-zA-Z0-9_]+)\]\]/g;
    var ICON_SIZE = 18; // مقاس مناسب لسطر معاينة آخر رسالة في القايمة

    var manifestData = null;
    var manifestById = {};

    injectStyle();

    function injectStyle() {
        var style = document.createElement('style');
        style.textContent =
            '.cz-emoji-slot{unicode-bidi:isolate;}' +
            '.cz-emoji-img{display:inline-block;vertical-align:-3px;unicode-bidi:isolate;}';
        document.head.appendChild(style);
    }

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
                console.error('فشل تحميل manifest الإيموجي (قايمة الشاتات):', e);
                return null;
            });
    }

    function buildEmojiSpanHTML(emojiId, sizePx) {
        var it = manifestById[emojiId];
        if (!it || !manifestData) return '';
        var size = manifestData.size;
        var scale = sizePx / size;
        var bgW = Math.round(manifestData.cols * size * scale);
        var bgH = Math.round(manifestData.rows * size * scale);
        var bgX = Math.round(it.x * scale);
        var bgY = Math.round(it.y * scale);
        return '<span class="cz-emoji-img" data-emoji-id="' + emojiId + '" ' +
            'style="width:' + sizePx + 'px;height:' + sizePx + 'px;' +
            'background-image:url(\'' + SPRITE_URL + '\');' +
            'background-repeat:no-repeat;' +
            'background-position:-' + bgX + 'px -' + bgY + 'px;' +
            'background-size:' + bgW + 'px ' + bgH + 'px;"></span>';
    }

    function escapeHTML(s) {
        var div = document.createElement('div');
        div.textContent = s;
        return div.innerHTML;
    }

    function stripTokens(text) {
        TOKEN_RE.lastIndex = 0;
        return text.replace(TOKEN_RE, '');
    }

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

    /* ============ استبدال التكست نود بـ slot ============ */
    function fillSlot(span) {
        var raw = span.dataset.czRawText || '';
        if (!manifestData) {
            span.textContent = stripTokens(raw);
        } else {
            span.innerHTML = renderTextWithEmoji(raw, ICON_SIZE);
            span.dataset.czEmojiDone = '1';
        }
    }

    function replaceTextNode(textNode) {
        var span = document.createElement('span');
        span.className = 'cz-emoji-slot';
        span.dataset.czRawText = textNode.nodeValue;
        fillSlot(span);
        if (textNode.parentNode) {
            textNode.parentNode.replaceChild(span, textNode);
        }
    }

    /* بندور على أي Text Node فيها توكن جوه الروت المعطى، من غير
       ما نلمس أي حاجة تانية (أيقونة الفرد، الوقت، اسم المرسل...) */
    function scanContainer(root) {
        if (!root) return;
        var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null, false);
        var matches = [];
        var n;
        while ((n = walker.nextNode())) {
            if (n.nodeValue && n.nodeValue.indexOf(TOKEN_PREFIX) !== -1) matches.push(n);
        }
        matches.forEach(replaceTextNode);
    }

    function scanAllLists() {
        var lists = document.querySelectorAll('.chats-list');
        lists.forEach(scanContainer);
    }

    /* لما المانيفست يجهز، أي slot اتعمله إخفاء مؤقت (مالوش
       czEmojiDone) يترندر تاني بالصور الحقيقية */
    function reprocessPendingSlots() {
        var slots = document.querySelectorAll('.cz-emoji-slot');
        slots.forEach(function (span) {
            if (span.dataset.czEmojiDone !== '1') fillSlot(span);
        });
    }

    function watchLists() {
        var observer = new MutationObserver(function (mutations) {
            var needsScan = false;
            for (var i = 0; i < mutations.length; i++) {
                var m = mutations[i];
                if (m.type === 'characterData') { needsScan = true; break; }
                if (m.addedNodes && m.addedNodes.length) { needsScan = true; break; }
            }
            if (needsScan) scanAllLists();
        });
        observer.observe(document.body, { childList: true, subtree: true, characterData: true });
    }

    function init() {
        scanAllLists();
        loadManifest().then(function () {
            reprocessPendingSlots();
        });
        watchLists();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
