/* ═════════════════════════════════════════════════════════════════════
   محرك المصحف الشريف برواية ورش عن نافع — مجمع الملك فهد (v10)
   يشمل الفهرس الكامل (114 سورة • 604 صفحات • 6214 آية)، البحث الذكي،
   العلامات المرجعية الملونة (مارك بايج)، ملاحظات الصفحات، وتظليل الآيات.
   ═════════════════════════════════════════════════════════════════════ */

const WARSH_DATA_CACHE_NAME = 'joussour-warsh-data-v1';
const WARSH_DATA_URLS = [
  'https://cdn.jsdelivr.net/gh/thetruetruth/quran-data-kfgqpc@main/warsh/data/warshData_v10.json',
  'https://raw.githubusercontent.com/thetruetruth/quran-data-kfgqpc/main/warsh/data/warshData_v10.json'
];

const MUSHAF_LAST_PAGE_KEY = 'joussour_warsh_last_page_v1';
const MUSHAF_BOOKMARKS_KEY = 'joussour_warsh_bookmarks_v1';
const MUSHAF_NOTES_KEY = 'joussour_warsh_notes_v1';
const MUSHAF_HIGHLIGHTS_KEY = 'joussour_warsh_highlights_v1';
const MUSHAF_PREFS_KEY = 'joussour_warsh_prefs_v1';
const MUSHAF_TOTAL_PAGES = 604;
const MUSHAF_BASMALAH = 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ';

const MUSHAF_BOOKMARK_BLUE = '#0f7b96';

let mushafAllAyahs = [];
let mushafPagesMap = {};
let mushafSurahs = [];
let mushafCurrentPage = 1;
let mushafIsLoaded = false;
let mushafLoadingPromise = null;
let mushafActiveDrawer = null;
let mushafHighlightMode = false;
let mushafSelectedHighlightColor = '#fef08a';
let mushafHighlightedSearchAyahId = null;

let mushafBookmarks = {};
let mushafNotes = {};
let mushafHighlights = {};
let mushafPrefs = { fontSize: 1.48, nightMode: false };

function escapeMushafHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function normalizeWarshArabic(text, keepDaggerAlefAsAlef = false) {
  let s = String(text || '').trim();
  if (keepDaggerAlefAsAlef) {
    s = s.replace(/\u0670/g, 'ا');
  } else {
    s = s.replace(/\u0670/g, '');
  }
  s = s
    .replace(/[\u064b-\u065f\u06d6-\u06ed\u0640\u200f\xa0]/g, '')
    .replace(/[\u0660-\u0669]/g, '')
    .replace(/[أإآٱ]/g, 'ا')
    .replace(/[ىےی]/g, 'ي')
    .replace(/ة/g, 'ه')
    .replace(/\s+/g, ' ')
    .trim();
  return s;
}

function loadMushafStateFromStorage() {
  try {
    const savedPage = parseInt(localStorage.getItem(MUSHAF_LAST_PAGE_KEY), 10);
    if (savedPage >= 1 && savedPage <= MUSHAF_TOTAL_PAGES) {
      mushafCurrentPage = savedPage;
    }
  } catch (e) {}

  try {
    const rawBm = localStorage.getItem(MUSHAF_BOOKMARKS_KEY);
    if (rawBm) {
      const parsed = JSON.parse(rawBm);
      if (parsed && typeof parsed === 'object') mushafBookmarks = parsed;
    }
  } catch (e) {}

  try {
    const rawNotes = localStorage.getItem(MUSHAF_NOTES_KEY);
    if (rawNotes) {
      const parsed = JSON.parse(rawNotes);
      if (parsed && typeof parsed === 'object') mushafNotes = parsed;
    }
  } catch (e) {}

  try {
    const rawHl = localStorage.getItem(MUSHAF_HIGHLIGHTS_KEY);
    if (rawHl) {
      const parsed = JSON.parse(rawHl);
      if (parsed && typeof parsed === 'object') mushafHighlights = parsed;
    }
  } catch (e) {}

  try {
    const rawPrefs = localStorage.getItem(MUSHAF_PREFS_KEY);
    if (rawPrefs) {
      const parsed = JSON.parse(rawPrefs);
      if (parsed && typeof parsed === 'object') {
        if (typeof parsed.fontSize === 'number') {
          mushafPrefs.fontSize = Math.min(2.1, Math.max(1.1, parsed.fontSize));
        }
        mushafPrefs.nightMode = Boolean(parsed.nightMode);
      }
    }
  } catch (e) {}
}

function saveMushafPrefs() {
  try {
    localStorage.setItem(MUSHAF_PREFS_KEY, JSON.stringify(mushafPrefs));
  } catch (e) {}
}

function saveMushafBookmarks() {
  try {
    localStorage.setItem(MUSHAF_BOOKMARKS_KEY, JSON.stringify(mushafBookmarks));
  } catch (e) {}
}

function saveMushafNotes() {
  try {
    localStorage.setItem(MUSHAF_NOTES_KEY, JSON.stringify(mushafNotes));
  } catch (e) {}
}

function saveMushafHighlights() {
  try {
    localStorage.setItem(MUSHAF_HIGHLIGHTS_KEY, JSON.stringify(mushafHighlights));
  } catch (e) {}
}

async function fetchWarshJsonData() {
  if ('caches' in window) {
    try {
      const cache = await caches.open(WARSH_DATA_CACHE_NAME);
      for (const url of WARSH_DATA_URLS) {
        const cached = await cache.match(url);
        if (cached && cached.ok) {
          return await cached.json();
        }
      }
    } catch (e) {}
  }

  for (const url of WARSH_DATA_URLS) {
    try {
      const res = await fetch(url);
      if (!res || !res.ok) continue;
      if ('caches' in window) {
        try {
          const cache = await caches.open(WARSH_DATA_CACHE_NAME);
          await cache.put(url, res.clone());
        } catch (e) {}
      }
      return await res.json();
    } catch (e) {}
  }

  throw new Error('Failed to download Warsh Quran dataset');
}

function indexWarshDataset(rawList) {
  mushafAllAyahs = [];
  mushafPagesMap = {};
  const surahMap = {};

  for (let i = 0; i < rawList.length; i++) {
    const item = rawList[i];
    const pageNum = parseInt(String(item.page).split('-')[0], 10);
    if (!pageNum || pageNum < 1 || pageNum > MUSHAF_TOTAL_PAGES) continue;

    const suraNo = Number(item.sura_no);
    const ayaNo = Number(item.aya_no);
    const suraNameAr = String(item.sura_name_ar || '').trim();
    const ayaText = String(item.aya_text || '');

    const entry = {
      id: Number(item.id),
      jozz: Number(item.jozz) || 1,
      page: pageNum,
      suraNo: suraNo,
      suraNameAr: suraNameAr,
      ayaNo: ayaNo,
      ayaText: ayaText,
      normA: normalizeWarshArabic(ayaText, false),
      normB: normalizeWarshArabic(ayaText, true)
    };

    mushafAllAyahs.push(entry);
    if (!mushafPagesMap[pageNum]) {
      mushafPagesMap[pageNum] = [];
    }
    mushafPagesMap[pageNum].push(entry);

    if (!surahMap[suraNo]) {
      surahMap[suraNo] = {
        no: suraNo,
        nameAr: suraNameAr,
        startPage: pageNum,
        ayahCount: 0
      };
    }
    surahMap[suraNo].ayahCount += 1;
    if (pageNum < surahMap[suraNo].startPage) {
      surahMap[suraNo].startPage = pageNum;
    }
  }

  mushafSurahs = Object.values(surahMap).sort((a, b) => a.no - b.no);
}

function populateMushafSurahSelect() {
  const sel = document.getElementById('mushafSurahSelect');
  if (!sel) return;
  sel.innerHTML = mushafSurahs
    .map((s) => `<option value="${s.no}">${s.no}. سورة ${escapeMushafHtml(s.nameAr)} (ص ${s.startPage})</option>`)
    .join('');
}

function applyMushafFrameVisualPrefs() {
  const frame = document.getElementById('mushafPageFrame');
  const content = document.getElementById('mushafPageContent');
  const nightBtn = document.getElementById('mushafBtnNight');
  if (frame) {
    frame.classList.toggle('is-night', Boolean(mushafPrefs.nightMode));
    frame.classList.toggle('is-highlight-mode', Boolean(mushafHighlightMode));
  }
  if (content) {
    content.style.fontSize = `${mushafPrefs.fontSize.toFixed(2)}rem`;
  }
  if (nightBtn) {
    nightBtn.textContent = mushafPrefs.nightMode ? '☀️' : '🌙';
    nightBtn.classList.toggle('active', Boolean(mushafPrefs.nightMode));
  }
}

function getPagePrimarySurahName(pageNum) {
  const ayahs = mushafPagesMap[pageNum];
  if (!ayahs || !ayahs.length) return '';
  return ayahs[0].suraNameAr;
}

function renderMushafInlineBookmarkUi() {
  const bmBtn = document.getElementById('mushafPageBmBtn');
  const toggleBtn = document.getElementById('mushafSavedBmsToggle');
  const popEl = document.getElementById('mushafSavedBmsPop');
  const existing = Boolean(mushafBookmarks[String(mushafCurrentPage)]);

  if (bmBtn) {
    bmBtn.classList.toggle('is-bookmarked', existing);
  }

  const entries = Object.values(mushafBookmarks).sort((a, b) => a.page - b.page);
  if (toggleBtn) {
    if (entries.length > 0) {
      toggleBtn.style.display = 'inline-flex';
      toggleBtn.textContent = `🔖 ${entries.length}`;
    } else {
      toggleBtn.style.display = 'none';
      if (popEl) popEl.style.display = 'none';
    }
  }

  if (popEl) {
    popEl.innerHTML = entries.map((bm) => `
      <span class="page-bm-chip ${bm.page === mushafCurrentPage ? 'active' : ''}">
        <button type="button" class="page-bm-chip-go tap-glow" onclick="goToMushafPage(${bm.page}); toggleMushafSavedBmsPop(false);">ص ${bm.page}</button>
        <button type="button" class="page-bm-chip-del" onclick="removeMushafBookmark(${bm.page})" title="حذف">×</button>
      </span>
    `).join('');
  }
}

function toggleMushafSavedBmsPop(forceState) {
  const popEl = document.getElementById('mushafSavedBmsPop');
  const noteBox = document.getElementById('mushafInlineNoteBox');
  if (!popEl) return;
  const isOpen = popEl.style.display === 'flex' || popEl.style.display === 'block';
  const show = typeof forceState === 'boolean' ? forceState : !isOpen;
  if (show && noteBox) noteBox.style.display = 'none';
  popEl.style.display = show && Object.keys(mushafBookmarks).length > 0 ? 'flex' : 'none';
  updateMushafToolBadges();
}

function renderMushafInlineNoteUi() {
  const noteBtn = document.getElementById('mushafPageNoteBtn');
  const dotEl = document.getElementById('mushafPageNoteDot');
  const inputEl = document.getElementById('mushafPageNoteInput');
  const chipsEl = document.getElementById('mushafAllNotesList');
  const noteBox = document.getElementById('mushafInlineNoteBox');
  const noteObj = mushafNotes[String(mushafCurrentPage)];
  const isOpen = noteBox && noteBox.style.display === 'block';

  if (dotEl) {
    dotEl.style.display = noteObj ? 'block' : 'none';
  }
  if (noteBtn) {
    noteBtn.classList.toggle('active', Boolean(isOpen || noteObj));
  }
  if (inputEl) {
    inputEl.value = noteObj ? noteObj.text : '';
  }

  if (chipsEl) {
    const entries = Object.values(mushafNotes).sort((a, b) => a.page - b.page);
    if (!entries.length) {
      chipsEl.style.display = 'none';
      chipsEl.innerHTML = '';
    } else {
      chipsEl.style.display = 'flex';
      chipsEl.innerHTML = entries.map((n) => `
        <button type="button" class="page-mini-chip tap-glow ${n.page === mushafCurrentPage ? 'active' : ''}" onclick="goToMushafPage(${n.page})">📝 ص ${n.page}</button>
      `).join('');
    }
  }
}

function toggleMushafPageNote(forceState) {
  const noteBox = document.getElementById('mushafInlineNoteBox');
  const popEl = document.getElementById('mushafSavedBmsPop');
  if (!noteBox) return;
  const isOpen = noteBox.style.display === 'block';
  const show = typeof forceState === 'boolean' ? forceState : !isOpen;
  if (show && popEl) popEl.style.display = 'none';
  noteBox.style.display = show ? 'block' : 'none';
  renderMushafInlineNoteUi();
  if (show) {
    const inp = document.getElementById('mushafPageNoteInput');
    if (inp) setTimeout(() => inp.focus(), 50);
  }
  updateMushafToolBadges();
}

function updateMushafToolBadges() {
  const hlBtn = document.getElementById('mushafBtnHighlight');
  const searchBtn = document.getElementById('mushafBtnSearch');
  const bmsToggle = document.getElementById('mushafSavedBmsToggle');
  const popEl = document.getElementById('mushafSavedBmsPop');
  const noteBtn = document.getElementById('mushafPageNoteBtn');
  const noteBox = document.getElementById('mushafInlineNoteBox');

  if (searchBtn) {
    searchBtn.classList.toggle('active', mushafActiveDrawer === 'search');
  }
  if (hlBtn) {
    hlBtn.classList.toggle('active', mushafHighlightMode);
  }
  if (bmsToggle && popEl) {
    bmsToggle.classList.toggle('active', popEl.style.display === 'flex');
  }
  if (noteBtn && noteBox) {
    const hasNote = Boolean(mushafNotes[String(mushafCurrentPage)]);
    noteBtn.classList.toggle('active', noteBox.style.display === 'block' || hasNote);
  }
}

function renderMushafPage(pageNum) {
  if (!mushafIsLoaded) return;
  const target = Math.min(MUSHAF_TOTAL_PAGES, Math.max(1, parseInt(pageNum, 10) || 1));
  mushafCurrentPage = target;

  try {
    localStorage.setItem(MUSHAF_LAST_PAGE_KEY, String(target));
  } catch (e) {}

  const ayahs = mushafPagesMap[target] || [];
  const loadingEl = document.getElementById('mushafLoadingState');
  const contentEl = document.getElementById('mushafPageContent');
  if (loadingEl) loadingEl.style.display = 'none';
  if (contentEl) contentEl.style.display = 'block';

  const firstAyah = ayahs[0];
  const jozz = firstAyah ? firstAyah.jozz : 1;
  const suraNo = firstAyah ? firstAyah.suraNo : 1;

  const metaBadge = document.getElementById('mushafMetaBadge');
  if (metaBadge) {
    metaBadge.textContent = `ص ${target} / ${MUSHAF_TOTAL_PAGES} • الجزء ${jozz}`;
  }
  const pageInput = document.getElementById('mushafPageInput');
  if (pageInput) pageInput.value = String(target);
  const footerLabel = document.getElementById('mushafPageFooterLabel');
  if (footerLabel) footerLabel.textContent = `صفحة ${target} من ${MUSHAF_TOTAL_PAGES}`;

  const surahSelect = document.getElementById('mushafSurahSelect');
  if (surahSelect && suraNo) {
    surahSelect.value = String(suraNo);
  }

  const prevBtn = document.getElementById('mushafPrevBtn');
  const nextBtn = document.getElementById('mushafNextBtn');
  if (prevBtn) prevBtn.disabled = target <= 1;
  if (nextBtn) nextBtn.disabled = target >= MUSHAF_TOTAL_PAGES;

  if (contentEl) {
    let htmlParts = [];
    let flowOpen = false;

    for (let i = 0; i < ayahs.length; i++) {
      const a = ayahs[i];
      if (a.ayaNo === 1) {
        if (flowOpen) {
          htmlParts.push('</div>');
          flowOpen = false;
        }
        htmlParts.push(`
          <div class="mushaf-surah-banner">
            <span>سورة ${escapeMushafHtml(a.suraNameAr)}</span>
          </div>
        `);
        if (a.suraNo !== 9) {
          htmlParts.push(`<div class="mushaf-basmalah">${MUSHAF_BASMALAH}</div>`);
        }
      }
      if (!flowOpen) {
        htmlParts.push('<div class="mushaf-ayahs-flow">');
        flowOpen = true;
      }

      const hlColor = mushafHighlights[String(a.id)];
      const isSearchHit = mushafHighlightedSearchAyahId === a.id;
      const inlineStyle = hlColor ? ` style="background-color: ${escapeMushafHtml(hlColor)};"` : '';
      const extraCls = isSearchHit ? ' is-search-hit' : '';

      htmlParts.push(
        `<span class="mushaf-ayah${extraCls}" data-ayah-id="${a.id}"${inlineStyle} onclick="onMushafAyahClick(${a.id})">${escapeMushafHtml(a.ayaText)}</span> `
      );
    }

    if (flowOpen) {
      htmlParts.push('</div>');
    }
    contentEl.innerHTML = htmlParts.join('');
  }

  applyMushafFrameVisualPrefs();
  renderMushafInlineBookmarkUi();
  renderMushafInlineNoteUi();
  updateMushafToolBadges();
}

function goToMushafPage(pageInput) {
  const num = parseInt(pageInput, 10);
  if (Number.isNaN(num)) {
    if (typeof showToast === 'function') showToast('⚠️ أدخل رقم صفحة صحيحاً بين 1 و 604');
    return;
  }
  mushafHighlightedSearchAyahId = null;
  renderMushafPage(num);
}

function goToMushafSurah(surahNo) {
  const s = mushafSurahs.find((x) => x.no === Number(surahNo));
  if (!s) return;
  mushafHighlightedSearchAyahId = null;
  renderMushafPage(s.startPage);
}

function animatePageSwap(contentEl, dir, renderCallback) {
  if (!contentEl) {
    renderCallback();
    return;
  }
  if (contentEl.dataset.swapping === '1') return;
  contentEl.dataset.swapping = '1';

  const outX = dir === 'next' ? 36 : -36;
  const inX = -outX;
  const ease = 'cubic-bezier(0.22, 1, 0.36, 1)';

  contentEl.style.transition = `transform 140ms ${ease}, opacity 140ms ease`;
  contentEl.style.transform = `translateX(${outX}px)`;
  contentEl.style.opacity = '0.25';

  setTimeout(() => {
    renderCallback();
    contentEl.style.transition = 'none';
    contentEl.style.transform = `translateX(${inX}px)`;
    contentEl.style.opacity = '0.25';
    void contentEl.offsetWidth;

    contentEl.style.transition = `transform 220ms ${ease}, opacity 220ms ease`;
    contentEl.style.transform = 'translateX(0)';
    contentEl.style.opacity = '1';

    setTimeout(() => {
      contentEl.dataset.swapping = '';
    }, 230);
  }, 140);
}

function attachSmoothPageSwipe({ frameEl, contentEl, canNext, canPrev, onNext, onPrev }) {
  if (!frameEl || !contentEl || frameEl.dataset.swipeBound === '1') return;
  frameEl.dataset.swipeBound = '1';

  let tracking = false;
  let startX = 0;
  let startY = 0;
  let lastX = 0;
  let startTime = 0;
  let lockMode = null;

  frameEl.addEventListener('touchstart', (e) => {
    if (e.touches && e.touches.length > 1) {
      tracking = false;
      return;
    }
    if (e.target && e.target.closest('textarea, input, select, button')) {
      tracking = false;
      return;
    }
    if (contentEl.dataset.swapping === '1') {
      tracking = false;
      return;
    }
    const t = e.touches && e.touches[0];
    if (!t) return;
    startX = t.clientX;
    startY = t.clientY;
    lastX = startX;
    startTime = Date.now();
    lockMode = null;
    tracking = true;
    contentEl.style.transition = 'none';
  }, { passive: true });

  frameEl.addEventListener('touchmove', (e) => {
    if (!tracking) return;
    const t = e.touches && e.touches[0];
    if (!t) return;
    const dx = t.clientX - startX;
    const dy = t.clientY - startY;
    lastX = t.clientX;

    if (lockMode === null) {
      if (Math.abs(dy) > 10 && Math.abs(dy) >= Math.abs(dx)) {
        lockMode = 'v';
        tracking = false;
        contentEl.style.transition = '';
        contentEl.style.transform = '';
        contentEl.style.opacity = '';
        return;
      }
      if (Math.abs(dx) > 12 && Math.abs(dx) > Math.abs(dy) * 1.15) {
        lockMode = 'h';
      } else {
        return;
      }
    }

    if (lockMode === 'h') {
      if (e.cancelable) e.preventDefault();
      const allowed = dx > 0 ? canNext() : canPrev();
      const factor = allowed ? 0.55 : 0.18;
      const dragX = Math.max(-140, Math.min(140, dx * factor));
      const dragOp = allowed ? Math.max(0.45, 1 - Math.abs(dragX) / 220) : 0.92;
      contentEl.style.transform = `translateX(${dragX.toFixed(1)}px)`;
      contentEl.style.opacity = String(dragOp.toFixed(2));
    }
  }, { passive: false });

  const finishSwipe = (e) => {
    if (!tracking) return;
    tracking = false;
    if (lockMode !== 'h') {
      contentEl.style.transition = '';
      contentEl.style.transform = '';
      contentEl.style.opacity = '';
      return;
    }

    const t = e.changedTouches && e.changedTouches[0];
    const endX = t ? t.clientX : lastX;
    const dx = endX - startX;
    const elapsed = Date.now() - startTime;
    const isCommit = Math.abs(dx) >= 48 || (Math.abs(dx) >= 28 && elapsed <= 260);

    if (isCommit && dx > 0 && canNext()) {
      onNext();
      return;
    }
    if (isCommit && dx < 0 && canPrev()) {
      onPrev();
      return;
    }

    contentEl.style.transition = 'transform 220ms cubic-bezier(0.22, 1, 0.36, 1), opacity 220ms ease';
    contentEl.style.transform = 'translateX(0)';
    contentEl.style.opacity = '1';
  };

  frameEl.addEventListener('touchend', finishSwipe, { passive: true });
  frameEl.addEventListener('touchcancel', finishSwipe, { passive: true });
}

function bindMushafSwipe() {
  attachSmoothPageSwipe({
    frameEl: document.getElementById('mushafPageFrame'),
    contentEl: document.getElementById('mushafPageContent'),
    canNext: () => mushafIsLoaded && mushafCurrentPage < MUSHAF_TOTAL_PAGES,
    canPrev: () => mushafIsLoaded && mushafCurrentPage > 1,
    onNext: () => nextMushafPage(),
    onPrev: () => prevMushafPage()
  });
}

function prevMushafPage() {
  if (mushafCurrentPage > 1) {
    const contentEl = document.getElementById('mushafPageContent');
    animatePageSwap(contentEl, 'prev', () => {
      mushafHighlightedSearchAyahId = null;
      renderMushafPage(mushafCurrentPage - 1);
    });
  }
}

function nextMushafPage() {
  if (mushafCurrentPage < MUSHAF_TOTAL_PAGES) {
    const contentEl = document.getElementById('mushafPageContent');
    animatePageSwap(contentEl, 'next', () => {
      mushafHighlightedSearchAyahId = null;
      renderMushafPage(mushafCurrentPage + 1);
    });
  }
}

function toggleMushafDrawer(drawerName) {
  const searchEl = document.getElementById('mushafSearchDrawer');
  if (drawerName !== 'search' || !searchEl) return;

  mushafActiveDrawer = mushafActiveDrawer === 'search' ? null : 'search';
  searchEl.style.display = mushafActiveDrawer === 'search' ? 'block' : 'none';
  if (mushafActiveDrawer === 'search') {
    const inp = document.getElementById('mushafSearchInput');
    if (inp) setTimeout(() => inp.focus(), 60);
  }
  updateMushafToolBadges();
}

function runMushafSearch(query) {
  const countEl = document.getElementById('mushafSearchCount');
  const resultsEl = document.getElementById('mushafSearchResults');
  if (!countEl || !resultsEl || !mushafIsLoaded) return;

  const clean = String(query || '').trim();
  const qA = normalizeWarshArabic(clean, false);
  const qB = normalizeWarshArabic(clean, true);

  if (qA.length < 2 && qB.length < 2) {
    countEl.textContent = 'اكتب حرفين فأكثر للبحث الفوري في 6214 آية';
    resultsEl.innerHTML = '';
    return;
  }

  const hits = [];
  for (let i = 0; i < mushafAllAyahs.length; i++) {
    const a = mushafAllAyahs[i];
    if ((qA.length >= 2 && a.normA.includes(qA)) || (qB.length >= 2 && a.normB.includes(qB))) {
      hits.push(a);
    }
  }

  if (!hits.length) {
    countEl.textContent = 'لم يتم العثور على آيات مطابقة.';
    resultsEl.innerHTML = '';
    return;
  }

  const shown = hits.slice(0, 40);
  countEl.textContent = hits.length > 40
    ? `تم العثور على ${hits.length} نتيجة (يُعرض أول 40 نتيجة):`
    : `تم العثور على ${hits.length} نتيجة:`;

  resultsEl.innerHTML = shown.map((a) => `
    <button type="button" class="mushaf-search-hit-btn tap-glow" onclick="jumpToMushafSearchHit(${a.page}, ${a.id})">
      <div class="mushaf-search-hit-meta">سورة ${escapeMushafHtml(a.suraNameAr)} • آية ${a.ayaNo} • ص ${a.page}</div>
      <div class="mushaf-search-hit-text">${escapeMushafHtml(a.ayaText)}</div>
    </button>
  `).join('');
}

function jumpToMushafSearchHit(pageNum, ayahId) {
  mushafHighlightedSearchAyahId = Number(ayahId);
  mushafActiveDrawer = null;
  const searchDrawer = document.getElementById('mushafSearchDrawer');
  if (searchDrawer) searchDrawer.style.display = 'none';
  renderMushafPage(pageNum);
  const targetAyahEl = document.querySelector(`.mushaf-ayah[data-ayah-id="${ayahId}"]`);
  if (targetAyahEl) {
    targetAyahEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

function toggleCurrentPageBookmark() {
  const key = String(mushafCurrentPage);
  const existing = mushafBookmarks[key];

  if (existing) {
    delete mushafBookmarks[key];
    saveMushafBookmarks();
    renderMushafInlineBookmarkUi();
    updateMushafToolBadges();
    if (typeof showToast === 'function') {
      showToast(`🔖 أزيلت علامة صفحة ${mushafCurrentPage}`);
    }
    return;
  }

  const surahName = getPagePrimarySurahName(mushafCurrentPage);
  mushafBookmarks[key] = {
    page: mushafCurrentPage,
    color: MUSHAF_BOOKMARK_BLUE,
    label: `ص ${mushafCurrentPage}`,
    surahName: surahName,
    savedAt: Date.now()
  };
  saveMushafBookmarks();
  renderMushafInlineBookmarkUi();
  updateMushafToolBadges();
  if (typeof showToast === 'function') {
    showToast(`🔖 حُفظت علامة صفحة ${mushafCurrentPage}`);
  }
}

function removeMushafBookmark(pageNum) {
  const key = String(pageNum);
  if (!mushafBookmarks[key]) return;
  delete mushafBookmarks[key];
  saveMushafBookmarks();
  renderMushafInlineBookmarkUi();
  updateMushafToolBadges();
}

function saveCurrentPageNote() {
  const inputEl = document.getElementById('mushafPageNoteInput');
  if (!inputEl) return;
  const text = inputEl.value.trim();
  const key = String(mushafCurrentPage);

  if (!text) {
    if (mushafNotes[key]) {
      delete mushafNotes[key];
      saveMushafNotes();
      renderMushafInlineNoteUi();
      updateMushafToolBadges();
      if (typeof showToast === 'function') showToast('🗑️ تم مسح ملاحظة الصفحة');
    } else if (typeof showToast === 'function') {
      showToast('⚠️ اكتب ملاحظتك قبل الحفظ');
    }
    return;
  }

  mushafNotes[key] = {
    page: mushafCurrentPage,
    text: text,
    surahName: getPagePrimarySurahName(mushafCurrentPage),
    updatedAt: Date.now()
  };
  saveMushafNotes();
  renderMushafInlineNoteUi();
  updateMushafToolBadges();
  if (typeof showToast === 'function') {
    showToast(`📝 تم حفظ ملاحظة صفحة ${mushafCurrentPage}`);
  }
}

function deleteCurrentPageNote() {
  const key = String(mushafCurrentPage);
  const inputEl = document.getElementById('mushafPageNoteInput');
  if (inputEl) inputEl.value = '';
  if (mushafNotes[key]) {
    delete mushafNotes[key];
    saveMushafNotes();
    renderMushafInlineNoteUi();
    updateMushafToolBadges();
    if (typeof showToast === 'function') {
      showToast(`🗑️ مُسحت ملاحظة صفحة ${mushafCurrentPage}`);
    }
  }
}

function toggleMushafHighlightMode() {
  mushafHighlightMode = !mushafHighlightMode;
  const bar = document.getElementById('mushafHighlightBar');
  if (bar) {
    bar.style.display = mushafHighlightMode ? 'block' : 'none';
  }
  applyMushafFrameVisualPrefs();
  updateMushafToolBadges();
}

function selectMushafHighlightColor(colorHex) {
  mushafSelectedHighlightColor = colorHex;
  document.querySelectorAll('#mushafHighlightSwatches .mushaf-swatch').forEach((btn) => {
    btn.classList.toggle('active', btn.getAttribute('data-hlcolor') === colorHex);
  });
}

function onMushafAyahClick(ayahId) {
  if (!mushafHighlightMode) return;
  const key = String(ayahId);
  if (mushafHighlights[key] === mushafSelectedHighlightColor) {
    delete mushafHighlights[key];
  } else {
    mushafHighlights[key] = mushafSelectedHighlightColor;
  }
  saveMushafHighlights();

  const el = document.querySelector(`.mushaf-ayah[data-ayah-id="${ayahId}"]`);
  if (el) {
    if (mushafHighlights[key]) {
      el.style.backgroundColor = mushafHighlights[key];
    } else {
      el.style.backgroundColor = '';
    }
  }
}

function changeMushafFontSize(delta) {
  const step = delta > 0 ? 0.12 : -0.12;
  mushafPrefs.fontSize = Math.min(2.1, Math.max(1.1, Number((mushafPrefs.fontSize + step).toFixed(2))));
  saveMushafPrefs();
  applyMushafFrameVisualPrefs();
}

function toggleMushafNightMode() {
  mushafPrefs.nightMode = !mushafPrefs.nightMode;
  saveMushafPrefs();
  applyMushafFrameVisualPrefs();
}

function switchLibrarySubTab(tabId) {
  document.querySelectorAll('.lib-mode-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.getAttribute('data-libtab') === tabId);
  });
  document.querySelectorAll('.lib-subpanel').forEach((panel) => {
    panel.classList.toggle('active', panel.id === tabId);
  });
  if (tabId === 'lib-panel-mushaf') {
    initMushafWarsh();
  } else if (tabId === 'lib-panel-books' && typeof initJosourLibrary === 'function') {
    initJosourLibrary();
  }
}

async function initMushafWarsh(forceRetry = false) {
  bindMushafSwipe();
  if (mushafIsLoaded) {
    renderMushafPage(mushafCurrentPage);
    return;
  }
  if (mushafLoadingPromise && !forceRetry) {
    return mushafLoadingPromise;
  }

  loadMushafStateFromStorage();
  applyMushafFrameVisualPrefs();

  const loadingEl = document.getElementById('mushafLoadingState');
  const contentEl = document.getElementById('mushafPageContent');
  if (loadingEl) {
    loadingEl.style.display = 'block';
    loadingEl.innerHTML = `
      <div style="font-size: 1.6rem; margin-bottom: 6px;">📖</div>
      <div>جاري تحميل المصحف الشريف برواية ورش عن نافع...</div>
    `;
  }
  if (contentEl) contentEl.style.display = 'none';

  mushafLoadingPromise = (async () => {
    try {
      const rawData = await fetchWarshJsonData();
      indexWarshDataset(rawData);
      populateMushafSurahSelect();
      mushafIsLoaded = true;
      renderMushafPage(mushafCurrentPage);
    } catch (err) {
      console.error('Warsh Mushaf load error:', err);
      mushafLoadingPromise = null;
      if (loadingEl) {
        loadingEl.innerHTML = `
          <div style="font-size: 1.5rem; margin-bottom: 6px;">⚠️</div>
          <div style="margin-bottom: 10px;">تعذّر تحميل نص المصحف الآن؛ يرجى التحقق من الاتصال ثم إعادة المحاولة.</div>
          <button type="button" class="focus-btn focus-btn-primary tap-glow" onclick="initMushafWarsh(true)">
            🔄 إعادة المحاولة
          </button>
        `;
      }
    }
  })();

  return mushafLoadingPromise;
}
