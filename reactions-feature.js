/* ===================================================
   REACTIONS-FEATURE.JS
   ملف مستقل تمامًا — بنفس مبدأ emoji-feature.js وenhancements.js:
   مش بيلمس أو يعدّل في conversation.js / conversation.html أي كود
   موجود، بس بيضيف عليه من برّه (باستثناء سطرين HTML بسيطين لازم
   تضيفهم إنت يدويًا — شوف تعليمات التركيب تحت).

   بيضيف:
   1) لما تعمل ضغطة مطولة على رسالة (بيفتح قايمة رد/نسخ/توجيه...
      الموجودة أصلاً)، بيتحط فوقها صف صغير فيه 6 إيموجيهات جاهزة
      + زرار "+" يفتح بيكر كامل لأي إيموجي من الـ 3593 المتاحين.
   2) بالضغط على إيموجي: بيتسجل كـ"رياكت" بتاعك على الرسالة دي في
      Firestore، وبيتقفل القايمة تلقائي.
   3) رياكت واحد بس لكل شخص على كل رسالة: لو ضغطت نفس الإيموجي
      اللي رياكتك عليه حاليًا بيتشال (toggle)، ولو ضغطت إيموجي
      تاني بيستبدل القديم — مستحيل يبقى عندك رياكتين على نفس
      الرسالة في نفس الوقت.
   4) الرياكت بيبان فورًا لحظة اللحظة عند الطرفين (Realtime عن
      طريق onSnapshot مستقل) كشارة صغيرة على حافة الفقاعة.

   بيستخدم نفس sprite / manifest بتوع emoji-feature.js (نفس الـ
   3593 إيموجي)، لكن بكود عرض مستقل تمامًا عشان الملفين يفضلوا
   شغالين لوحدهم من غير أي ترابط.
=================================================== */

import { db } from "./firebase-init.js";
import {
    doc,
    collection,
    query,
    orderBy,
    onSnapshot,
    updateDoc,
    deleteField,
    FieldPath,
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";

(function () {
    'use strict';

    /* ============ Config ============ */
    var SPRITE_URL = 'emoji-sprite.webp';
    var MANIFEST_URL = 'emoji-manifest.json';
    // الـ 6 إيموجيهات الجاهزة اللي بتظهر مباشرة في صف الرياكت،
    // بنفس الترتيب اللي اتحدد
    var QUICK_IDS = ['g0_160', 'g6_1', 'g0_7', 'g0_8', 'g0_18', 'g0_33'];

    function $(id) { return document.getElementById(id); }

    /* ============ تحديد المحادثة الحالية (نفس منطق conversation.js) ============ */
    var myEmail = localStorage.getItem('cz_verified_email') || '';
    var otherEmail = localStorage.getItem('cz_active_chat_email') || '';
    if (!myEmail || !otherEmail) {
        // مفيش محادثة محددة (مثلاً صفحة تانية) — مفيش داعي نكمل
        return;
    }
    var myEmailLower = myEmail.toLowerCase();
    var chatId = [myEmail.toLowerCase(), otherEmail.toLowerCase()].sort().join('__');
    var messagesColRef = collection(db, 'chats', chatId, 'messages');

    /* ============ تحميل الـ manifest (نفس ملف الإيموجي التاني) ============ */
    var manifestData = null;
    var manifestById = {};
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
                console.error('فشل تحميل manifest الإيموجي (رياكتس):', e);
                return null;
            });
    }

    function buildEmojiSpanHTML(emojiId, sizePx) {
        var it = manifestById[emojiId];
        if (!it || !manifestData) return '';
        var size = manifestData.size;
        var scale = (sizePx || 20) / size;
        var bgW = Math.round(manifestData.cols * size * scale);
        var bgH = Math.round(manifestData.rows * size * scale);
        var bgX = Math.round(it.x * scale);
        var bgY = Math.round(it.y * scale);
        var s = (sizePx || 20);
        return '<span class="cz-emoji-img" style="display:inline-block;width:' + s + 'px;height:' + s + 'px;' +
            'background-image:url(\'' + SPRITE_URL + '\');' +
            'background-repeat:no-repeat;' +
            'background-position:-' + bgX + 'px -' + bgY + 'px;' +
            'background-size:' + bgW + 'px ' + bgH + 'px;"></span>';
    }

    /* ============ تخزين آخر نسخة معروفة من رسائل المحادثة ============ */
    var messagesById = new Map(); // msgId -> { reactions: {emailLower:emojiId}, ... }

    /* ============ صف الرياكت الجاهز (يتحط مرة واحدة جوه msgCtxMenu) ============ */
    var reactBar = null;

    function buildReactBar() {
        var menu = $('msgCtxMenu');
        if (!menu) return null;
        if ($('czReactBar')) return $('czReactBar');

        var bar = document.createElement('div');
        bar.className = 'cz-react-bar';
        bar.id = 'czReactBar';

        QUICK_IDS.forEach(function (id) {
            var cell = document.createElement('button');
            cell.type = 'button';
            cell.className = 'cz-react-bar-cell';
            cell.dataset.emojiId = id;
            cell.addEventListener('click', function (e) {
                e.stopPropagation();
                onQuickReactionPick(id);
            });
            bar.appendChild(cell);
        });

        var more = document.createElement('button');
        more.type = 'button';
        more.className = 'cz-react-bar-more';
        more.id = 'czReactMoreBtn';
        more.setAttribute('aria-label', 'المزيد');
        more.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>';
        more.addEventListener('click', function (e) {
            e.stopPropagation();
            openMorePicker();
        });
        bar.appendChild(more);

        document.body.appendChild(bar);
        reactBar = bar;
        loadManifest().then(renderReactBarCells);
        return bar;
    }

    /* بنحط الصف عايم فوق فقاعة الرسالة بالظبط (مش جوه قايمة
       Reply/Copy/...)، بنفس منطق تحديد المكان اللي القايمة نفسها
       بتستخدمه (getBoundingClientRect + clamp جوه حدود الشاشة) */
    function positionReactBar(bubbleRect) {
        if (!reactBar) return;
        reactBar.style.visibility = 'hidden';
        reactBar.classList.add('open');
        var barRect = reactBar.getBoundingClientRect();
        var margin = 10;
        var gap = 10;
        var top = bubbleRect.top - barRect.height - gap;
        if (top < margin) {
            // مفيش مكان كفاية فوق (رسالة قريبة من أعلى الشاشة) —
            // نحطه تحت الفقاعة بدل ما يتقطع
            top = bubbleRect.bottom + gap;
        }
        top = Math.min(Math.max(margin, top), window.innerHeight - barRect.height - margin);
        var center = bubbleRect.left + bubbleRect.width / 2;
        var left = Math.min(
            Math.max(margin, center - barRect.width / 2),
            window.innerWidth - barRect.width - margin
        );
        reactBar.style.top = top + 'px';
        reactBar.style.left = left + 'px';
        reactBar.style.visibility = '';
    }

    function showReactBarFor(rowEl) {
        if (!reactBar) buildReactBar();
        if (!rowEl) return;
        var bubble = rowEl.querySelector('.bubble');
        if (!bubble) return;
        positionReactBar(bubble.getBoundingClientRect());
        syncReactBarActiveState();
    }

    function hideReactBar() {
        if (reactBar) reactBar.classList.remove('open');
    }

    function renderReactBarCells() {
        if (!reactBar || !manifestData) return;
        var cells = reactBar.querySelectorAll('.cz-react-bar-cell');
        cells.forEach(function (cell) {
            cell.innerHTML = buildEmojiSpanHTML(cell.dataset.emojiId, 26);
        });
    }

    /* لما القايمة تتفتح لرسالة معينة، بنحدث أي إيموجي فيهم "مفعّل"
       حاليًا عندي على الرسالة دي (لو موجود ضمن الـ 6 الجاهزين) */
    function syncReactBarActiveState() {
        if (!reactBar) return;
        var selectedRow = document.querySelector('.msg-row.selected');
        var msgId = selectedRow ? selectedRow.dataset.msgId : null;
        var data = msgId ? messagesById.get(msgId) : null;
        var myCurrent = data && data.reactions ? data.reactions[myEmailLower] : null;
        reactBar.querySelectorAll('.cz-react-bar-cell').forEach(function (cell) {
            cell.classList.toggle('cz-active', !!myCurrent && cell.dataset.emojiId === myCurrent);
        });
    }

    function closeCtxMenu() {
        var overlay = $('msgCtxOverlay');
        var menu = $('msgCtxMenu');
        if (menu) menu.classList.remove('open');
        if (overlay) overlay.classList.remove('open');
        document.querySelectorAll('.msg-row.selected').forEach(function (el) {
            el.classList.remove('selected');
        });
    }

    function currentSelectedMsgId() {
        var row = document.querySelector('.msg-row.selected');
        return row ? row.dataset.msgId : null;
    }

    /* ============ تسجيل / إلغاء / تغيير الرياكت في Firestore ============ */
    function applyReaction(msgId, emojiId) {
        if (!msgId) return;
        var data = messagesById.get(msgId);
        var current = data && data.reactions ? data.reactions[myEmailLower] : null;
        var msgRef = doc(db, 'chats', chatId, 'messages', msgId);
        var fieldPath = new FieldPath('reactions', myEmailLower);
        var value = (current === emojiId) ? deleteField() : emojiId;
        updateDoc(msgRef, fieldPath, value).catch(function (e) {
            console.error('فشل تسجيل الرياكت:', e);
        });
        if (navigator.vibrate) {
            try { navigator.vibrate(8); } catch (e) {}
        }
    }

    function onQuickReactionPick(emojiId) {
        var msgId = currentSelectedMsgId();
        closeCtxMenu();
        applyReaction(msgId, emojiId);
    }

    /* ============ بيكر كامل (زرار +) ============ */
    var moreOverlay = null;
    var moreGrid = null;

    function buildMorePicker() {
        if (moreOverlay) return moreOverlay;
        var overlay = document.createElement('div');
        overlay.className = 'cz-emoji-picker-overlay';
        overlay.id = 'czReactMorePickerOverlay';

        var sheet = document.createElement('div');
        sheet.className = 'cz-emoji-picker-sheet';

        var handle = document.createElement('div');
        handle.className = 'cz-emoji-picker-handle';
        sheet.appendChild(handle);

        var scroll = document.createElement('div');
        scroll.className = 'cz-emoji-picker-scroll';
        var grid = document.createElement('div');
        grid.className = 'cz-emoji-picker-grid';
        scroll.appendChild(grid);
        sheet.appendChild(scroll);

        overlay.appendChild(sheet);
        document.body.appendChild(overlay);

        overlay.addEventListener('click', function (e) {
            if (e.target === overlay) closeMorePicker();
        });

        // سحب بالماوس على الديسكتوب (نفس فكرة emoji-feature.js)
        var isDown = false, startX = 0, startScroll = 0, moved = false;
        scroll.addEventListener('mousedown', function (e) {
            isDown = true; moved = false;
            startX = e.clientX;
            startScroll = scroll.scrollLeft;
            scroll.classList.add('cz-dragging');
        });
        window.addEventListener('mousemove', function (e) {
            if (!isDown) return;
            var dx = e.clientX - startX;
            if (Math.abs(dx) > 4) moved = true;
            scroll.scrollLeft = startScroll - dx;
        });
        window.addEventListener('mouseup', function () {
            isDown = false;
            scroll.classList.remove('cz-dragging');
        });
        grid.addEventListener('click', function (e) {
            if (moved) { e.stopPropagation(); e.preventDefault(); moved = false; }
        }, true);

        moreOverlay = overlay;
        moreGrid = grid;
        return overlay;
    }

    function renderMoreGrid() {
        if (!moreGrid || !manifestData) return;
        moreGrid.innerHTML = '';
        var frag = document.createDocumentFragment();
        manifestData.items.forEach(function (it) {
            var cell = document.createElement('div');
            cell.className = 'cz-emoji-picker-cell';
            cell.innerHTML = buildEmojiSpanHTML(it.id, 34);
            cell.addEventListener('click', function () {
                var msgId = currentSelectedMsgId();
                closeMorePicker();
                closeCtxMenu();
                applyReaction(msgId, it.id);
            });
            frag.appendChild(cell);
        });
        moreGrid.appendChild(frag);
    }

    function openMorePicker() {
        var overlay = buildMorePicker();
        loadManifest().then(function () {
            renderMoreGrid();
            overlay.classList.add('open');
        });
    }

    function closeMorePicker() {
        if (moreOverlay) moreOverlay.classList.remove('open');
    }

    /* ============ مراقبة فتح/قفل قايمة الرسالة (Reply/Copy/...) ============
       الصف العايم بتاع الرياكت مش جوه القايمة دي خالص — بس بيتفتح
       ويتقفل معاها في نفس اللحظة (نفس الرسالة المحددة) */
    function watchCtxMenu() {
        var overlay = $('msgCtxOverlay');
        var menu = $('msgCtxMenu');
        if (!overlay || !menu) return;
        var mo = new MutationObserver(function () {
            if (menu.classList.contains('open')) {
                showReactBarFor(document.querySelector('.msg-row.selected'));
            } else {
                hideReactBar();
            }
        });
        mo.observe(menu, { attributes: true, attributeFilter: ['class'] });
        // لو المكان اتغيّر (تدوير الشاشة، سكرول...) وهو مفتوح، نظبطه تاني
        window.addEventListener('resize', function () {
            if (menu.classList.contains('open')) {
                showReactBarFor(document.querySelector('.msg-row.selected'));
            }
        });
    }

    /* ============ عرض شارة الرياكت على كل فقاعة ============ */
    function renderBadgeForRow(rowEl, msgId) {
        var bubble = rowEl.querySelector('.bubble');
        if (!bubble) return;
        var data = messagesById.get(msgId);
        var reactions = (data && data.reactions) || {};
        var entries = Object.keys(reactions).filter(function (k) { return reactions[k]; });

        // بصمة سريعة لمحتوى الرياكتس الحالي. لو نفس اللي كان موجود قبل
        // كده مبنعملش أي تعديل في الـ DOM خالص — ده أهم سطر في الملف:
        // من غيره، أي تعديل في DOM جوه #convMessages (حتى لو تافه) بيولّد
        // mutation جديدة، والـ MutationObserver اللي بيراقب الحاوية ده
        // بيعيد نداء renderAllBadges() تاني، اللي بيعدل الـ DOM تاني،
        // وهكذا في حلقة لا نهائية بتوقف الصفحة كلها (Not Responding).
        var fp = manifestData
            ? entries.map(function (k) { return k + ':' + reactions[k]; }).sort().join('|')
            : (bubble.dataset.czReactFp || '__pending__');
        if (bubble.dataset.czReactFp === fp) return;

        var badge = bubble.querySelector('.cz-reaction-badge');
        if (!entries.length) {
            if (badge) badge.remove();
            bubble.dataset.czReactFp = fp;
            return;
        }
        if (!manifestData) return; // هيترندر تاني لما المانيفست يجهز (fp هتفضل __pending__)

        // تجميع حسب نوع الإيموجي عشان لو الاتنين اختاروا نفس الرياكت
        var counts = {};
        var order = [];
        entries.forEach(function (email) {
            var id = reactions[email];
            if (!counts[id]) { counts[id] = 0; order.push(id); }
            counts[id]++;
        });

        if (!badge) {
            badge = document.createElement('div');
            badge.className = 'cz-reaction-badge';
            bubble.appendChild(badge);
        }
        badge.innerHTML = '';
        order.slice(0, 3).forEach(function (id) {
            var chip = document.createElement('span');
            chip.className = 'cz-reaction-chip';
            chip.innerHTML = buildEmojiSpanHTML(id, 15);
            if (counts[id] > 1) {
                var cnt = document.createElement('span');
                cnt.className = 'cz-reaction-count';
                cnt.textContent = counts[id];
                chip.appendChild(cnt);
            }
            badge.appendChild(chip);
        });
        bubble.dataset.czReactFp = fp;
    }

    function renderAllBadges() {
        var container = $('convMessages');
        if (!container) return;
        container.querySelectorAll('.msg-row[data-msg-id]').forEach(function (row) {
            renderBadgeForRow(row, row.dataset.msgId);
        });
    }

    function watchMessagesContainer() {
        var container = $('convMessages');
        if (!container) return;
        var mo = new MutationObserver(function (mutations) {
            var needsProcess = false;
            mutations.forEach(function (m) {
                if (m.addedNodes && m.addedNodes.length) needsProcess = true;
            });
            if (needsProcess) renderAllBadges();
        });
        mo.observe(container, { childList: true, subtree: true });
    }

    /* ============ الاستماع لتحديثات الرسائل (للرياكتس فقط) ============ */
    function watchMessagesData() {
        var q = query(messagesColRef, orderBy('createdAt', 'asc'));
        onSnapshot(q, function (snap) {
            messagesById = new Map(snap.docs.map(function (d) { return [d.id, d.data()]; }));
            renderAllBadges();
            // لو القايمة مفتوحة دلوقتي على رسالة اتغيّر الرياكت بتاعها
            syncReactBarActiveState();
        }, function (err) {
            console.error('فشل الاستماع لرياكتس الرسائل:', err);
        });
    }

    /* ============ نقطة الدخول ============ */
    function init() {
        loadManifest().then(function () {
            renderReactBarCells();
            renderAllBadges();
        });
        watchCtxMenu();
        watchMessagesContainer();
        watchMessagesData();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
