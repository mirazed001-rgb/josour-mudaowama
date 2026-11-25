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

const MUSHAF_BOOKMARK_COLOR_NAMES = {
  '#d97706': 'ذهبي',
  '#0f7b96': 'فيروزي',
  '#059669': 'أخضر',
  '#db2777': 'وردي',
  '#7c3aed': 'بنفسجي'
};

let mushafAllAyahs = [];
let mushafPagesMap = {};
let mushafSurahs = [];
let mushafCurrentPage = 1;
let mushafIsLoaded = false;
let mushafLoadingPromise = null;
let mushafActiveDrawer = null;
let mushafHighlightMode = false;
let mushafSelectedBookmarkColor = '#d97706';
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

function renderMushafBookmarkRibbon(pageNum) {
  const ribbon = document.getElementById('mushafPageBookmarkRibbon');
  if (!ribbon) return;
  const bm = mushafBookmarks[String(pageNum)];
  if (!bm) {
    ribbon.style.display = 'none';
    ribbon.innerHTML = '';
    return;
  }
  const colorName = MUSHAF_BOOKMARK_COLOR_NAMES[bm.color] || 'ملونة';
  ribbon.style.display = 'flex';
  ribbon.style.backgroundColor = bm.color;
  ribbon.innerHTML = `<span>🔖 علامة مرجعية (${colorName}) • ص ${bm.page}</span>`;
}

function renderMushafBookmarksDrawerState() {
  const toggleBtn = document.getElementById('mushafBookmarkToggleBtn');
  const listEl = document.getElementById('mushafBookmarksList');
  const existing = mushafBookmarks[String(mushafCurrentPage)];

  document.querySelectorAll('#mushafBookmarkSwatches .mushaf-swatch').forEach((btn) => {
    btn.classList.toggle('active', btn.getAttribute('data-bmcolor') === mushafSelectedBookmarkColor);
  });

  if (toggleBtn) {
    if (existing) {
      if (existing.color !== mushafSelectedBookmarkColor) {
        toggleBtn.textContent = `🎨 تحديث لون علامة صفحة ${mushafCurrentPage}`;
      } else {
        toggleBtn.textContent = `🗑️ إزالة العلامة عن صفحة ${mushafCurrentPage}`;
      }
    } else {
      toggleBtn.textContent = `🔖 حفظ علامة لصفحة ${mushafCurrentPage}`;
    }
  }

  if (listEl) {
    const entries = Object.values(mushafBookmarks).sort((a, b) => a.page - b.page);
    if (!entries.length) {
      listEl.innerHTML = '<div class="mushaf-empty-mini">لا توجد علامات مرجعية محفوظة بعد. اختر لوناً واضغط حفظ لوضع علامة على أي صفحة.</div>';
      return;
    }
    listEl.innerHTML = entries.map((bm) => `
      <div class="mushaf-saved-item">
        <button type="button" class="mushaf-saved-go tap-glow" onclick="goToMushafPage(${bm.page}); toggleMushafDrawer('bookmarks');">
          <span class="mushaf-dot" style="background: ${escapeMushafHtml(bm.color)};"></span>
          <span>ص ${bm.page} — سورة ${escapeMushafHtml(bm.surahName || '')}</span>
        </button>
        <button type="button" class="mushaf-saved-del" onclick="removeMushafBookmark(${bm.page})" title="حذف العلامة">✕</button>
      </div>
    `).join('');
  }
}

function renderMushafNotesDrawerState() {
  const titleEl = document.getElementById('mushafNoteDrawerTitle');
  const inputEl = document.getElementById('mushafPageNoteInput');
  const listEl = document.getElementById('mushafAllNotesList');
  const surahName = getPagePrimarySurahName(mushafCurrentPage);

  if (titleEl) {
    titleEl.textContent = `📝 ملاحظات الصفحة ${mushafCurrentPage}${surahName ? ` • سورة ${surahName}` : ''}`;
  }
  if (inputEl) {
    const noteObj = mushafNotes[String(mushafCurrentPage)];
    inputEl.value = noteObj ? noteObj.text : '';
  }

  if (listEl) {
    const entries = Object.values(mushafNotes).sort((a, b) => a.page - b.page);
    if (!entries.length) {
      listEl.innerHTML = '<div class="mushaf-empty-mini">لم تسجّل ملاحظات بعد على صفحات المصحف.</div>';
      return;
    }
    listEl.innerHTML = entries.map((n) => `
      <div class="mushaf-saved-item">
        <button type="button" class="mushaf-saved-go tap-glow" onclick="goToMushafPage(${n.page})">
          <strong>ص ${n.page} (${escapeMushafHtml(n.surahName || '')}):</strong>
          <span class="mushaf-note-snippet">${escapeMushafHtml(n.text)}</span>
        </button>
      </div>
    `).join('');
  }
}

function updateMushafToolBadges() {
  const bmBtn = document.getElementById('mushafBtnBookmarks');
  const notesBtn = document.getElementById('mushafBtnNotes');
  const hlBtn = document.getElementById('mushafBtnHighlight');
  const searchBtn = document.getElementById('mushafBtnSearch');

  if (bmBtn) {
    const hasBm = Boolean(mushafBookmarks[String(mushafCurrentPage)]);
    bmBtn.classList.toggle('active', mushafActiveDrawer === 'bookmarks' || hasBm);
  }
  if (notesBtn) {
    const hasNote = Boolean(mushafNotes[String(mushafCurrentPage)]);
    const totalNotes = Object.keys(mushafNotes).length;
    notesBtn.textContent = totalNotes > 0 ? `📝 ملاحظات (${totalNotes})` : '📝 ملاحظات';
    notesBtn.classList.toggle('active', mushafActiveDrawer === 'notes' || hasNote);
  }
  if (searchBtn) {
    searchBtn.classList.toggle('active', mushafActiveDrawer === 'search');
  }
  if (hlBtn) {
    hlBtn.classList.toggle('active', mushafHighlightMode);
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
  renderMushafBookmarkRibbon(target);
  renderMushafBookmarksDrawerState();
  renderMushafNotesDrawerState();
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

function prevMushafPage() {
  if (mushafCurrentPage > 1) {
    mushafHighlightedSearchAyahId = null;
    renderMushafPage(mushafCurrentPage - 1);
    const frame = document.getElementById('mushafPageFrame');
    if (frame) frame.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function nextMushafPage() {
  if (mushafCurrentPage < MUSHAF_TOTAL_PAGES) {
    mushafHighlightedSearchAyahId = null;
    renderMushafPage(mushafCurrentPage + 1);
    const frame = document.getElementById('mushafPageFrame');
    if (frame) frame.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function toggleMushafDrawer(drawerName) {
  const map = {
    search: document.getElementById('mushafSearchDrawer'),
    bookmarks: document.getElementById('mushafBookmarksDrawer'),
    notes: document.getElementById('mushafNotesDrawer')
  };

  if (mushafActiveDrawer === drawerName) {
    mushafActiveDrawer = null;
  } else {
    mushafActiveDrawer = drawerName;
  }

  Object.keys(map).forEach((key) => {
    if (map[key]) {
      map[key].style.display = mushafActiveDrawer === key ? 'block' : 'none';
    }
  });

  if (mushafActiveDrawer === 'bookmarks') renderMushafBookmarksDrawerState();
  if (mushafActiveDrawer === 'notes') renderMushafNotesDrawerState();
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

function selectMushafBookmarkColor(colorHex) {
  mushafSelectedBookmarkColor = colorHex;
  renderMushafBookmarksDrawerState();
}

function toggleCurrentPageBookmark() {
  const key = String(mushafCurrentPage);
  const existing = mushafBookmarks[key];

  if (existing && existing.color === mushafSelectedBookmarkColor) {
    delete mushafBookmarks[key];
    saveMushafBookmarks();
    renderMushafBookmarkRibbon(mushafCurrentPage);
    renderMushafBookmarksDrawerState();
    updateMushafToolBadges();
    if (typeof showToast === 'function') {
      showToast(`🔖 أزيلت العلامة المرجعية عن الصفحة ${mushafCurrentPage}`);
    }
    return;
  }

  const surahName = getPagePrimarySurahName(mushafCurrentPage);
  mushafBookmarks[key] = {
    page: mushafCurrentPage,
    color: mushafSelectedBookmarkColor,
    label: `ص ${mushafCurrentPage}`,
    surahName: surahName,
    savedAt: Date.now()
  };
  saveMushafBookmarks();
  renderMushafBookmarkRibbon(mushafCurrentPage);
  renderMushafBookmarksDrawerState();
  updateMushafToolBadges();
  if (typeof showToast === 'function') {
    showToast(`🔖 حُفظت علامة مرجعية لصفحة ${mushafCurrentPage} (${surahName})`);
  }
}

function removeMushafBookmark(pageNum) {
  const key = String(pageNum);
  if (!mushafBookmarks[key]) return;
  delete mushafBookmarks[key];
  saveMushafBookmarks();
  renderMushafBookmarkRibbon(mushafCurrentPage);
  renderMushafBookmarksDrawerState();
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
      renderMushafNotesDrawerState();
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
  renderMushafNotesDrawerState();
  updateMushafToolBadges();
  if (typeof showToast === 'function') {
    showToast(`📝 تم حفظ ملاحظتك لصفحة ${mushafCurrentPage}`);
  }
}

function deleteCurrentPageNote() {
  const key = String(mushafCurrentPage);
  const inputEl = document.getElementById('mushafPageNoteInput');
  if (inputEl) inputEl.value = '';
  if (mushafNotes[key]) {
    delete mushafNotes[key];
    saveMushafNotes();
    renderMushafNotesDrawerState();
    updateMushafToolBadges();
    if (typeof showToast === 'function') {
      showToast(`🗑️ مُسحت ملاحظة الصفحة ${mushafCurrentPage}`);
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
  }
}

async function initMushafWarsh(forceRetry = false) {
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
