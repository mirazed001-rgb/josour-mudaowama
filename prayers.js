/* ═════════════════════════════════════════════════════════════════════
   محرك مواقيت الصلاة وإشعاراتها — وفق حساب وزارة الشؤون الدينية (الجزائر)
   زاوية الفجر 18° • زاوية العشاء 17° • العصر على المذهب المالكي والجمهور (1×)
   ═════════════════════════════════════════════════════════════════════ */

const PRAYER_LOC_KEY = 'joussour_prayer_loc_v1';
const PRAYER_NOTIF_KEY = 'joussour_prayer_notif_v1';
const PRAYER_SENT_PREFIX = 'joussour_prayer_sent_';

const ALGERIA_WILAYAS = [
  { code: '01', name: 'أدرار', lat: 27.8742, lng: -0.2939 },
  { code: '02', name: 'الشلف', lat: 36.1653, lng: 1.3345 },
  { code: '03', name: 'الأغواط', lat: 33.8000, lng: 2.8651 },
  { code: '04', name: 'أم البواقي', lat: 35.8754, lng: 7.1135 },
  { code: '05', name: 'باتنة', lat: 35.5560, lng: 6.1741 },
  { code: '06', name: 'بجاية', lat: 36.7525, lng: 5.0556 },
  { code: '07', name: 'بسكرة', lat: 34.8504, lng: 5.7280 },
  { code: '08', name: 'بشار', lat: 31.6167, lng: -2.2167 },
  { code: '09', name: 'البليدة', lat: 36.4700, lng: 2.8277 },
  { code: '10', name: 'البويرة', lat: 36.3749, lng: 3.9020 },
  { code: '11', name: 'تمنراست', lat: 22.7850, lng: 5.5228 },
  { code: '12', name: 'تبسة', lat: 35.4042, lng: 8.1242 },
  { code: '13', name: 'تلمسان', lat: 34.8783, lng: -1.3150 },
  { code: '14', name: 'تيارت', lat: 35.3710, lng: 1.3170 },
  { code: '15', name: 'تيزي وزو', lat: 36.7118, lng: 4.0459 },
  { code: '16', name: 'الجزائر العاصمة — الخروبة', lat: 36.7372, lng: 3.1030 },
  { code: '17', name: 'الجلفة', lat: 34.6728, lng: 3.2630 },
  { code: '18', name: 'جيجل', lat: 36.8206, lng: 5.7667 },
  { code: '19', name: 'سطيف', lat: 36.1911, lng: 5.4137 },
  { code: '20', name: 'سعيدة', lat: 34.8303, lng: 0.1517 },
  { code: '21', name: 'سكيكدة', lat: 36.8762, lng: 6.9092 },
  { code: '22', name: 'سيدي بلعباس', lat: 35.1899, lng: -0.6309 },
  { code: '23', name: 'عنابة', lat: 36.9000, lng: 7.7667 },
  { code: '24', name: 'قالمة', lat: 36.4621, lng: 7.4261 },
  { code: '25', name: 'قسنطينة', lat: 36.3650, lng: 6.6147 },
  { code: '26', name: 'المدية', lat: 36.2642, lng: 2.7539 },
  { code: '27', name: 'مستغانم', lat: 35.9312, lng: 0.0892 },
  { code: '28', name: 'المسيلة', lat: 35.7058, lng: 4.5419 },
  { code: '29', name: 'معسكر', lat: 35.3966, lng: 0.1403 },
  { code: '30', name: 'ورقلة', lat: 31.9493, lng: 5.3250 },
  { code: '31', name: 'وهران', lat: 35.6971, lng: -0.6308 },
  { code: '32', name: 'البيض', lat: 33.6832, lng: 1.0193 },
  { code: '33', name: 'إليزي', lat: 26.4833, lng: 8.4667 },
  { code: '34', name: 'برج بوعريريج', lat: 36.0732, lng: 4.7611 },
  { code: '35', name: 'بومرداس', lat: 36.7664, lng: 3.4772 },
  { code: '36', name: 'الطارف', lat: 36.7672, lng: 8.3138 },
  { code: '37', name: 'تندوف', lat: 27.6711, lng: -8.1474 },
  { code: '38', name: 'تيسمسيلت', lat: 35.6072, lng: 1.8108 },
  { code: '39', name: 'الوادي', lat: 33.3561, lng: 6.8632 },
  { code: '40', name: 'خنشلة', lat: 35.4358, lng: 7.1433 },
  { code: '41', name: 'سوق أهراس', lat: 36.2864, lng: 7.9511 },
  { code: '42', name: 'تيبازة', lat: 36.5897, lng: 2.4475 },
  { code: '43', name: 'ميلة', lat: 36.4503, lng: 6.2644 },
  { code: '44', name: 'عين الدفلى', lat: 36.2640, lng: 1.9679 },
  { code: '45', name: 'النعامة', lat: 33.2667, lng: -0.3167 },
  { code: '46', name: 'عين تموشنت', lat: 35.2975, lng: -1.1404 },
  { code: '47', name: 'غرداية', lat: 32.4909, lng: 3.6735 },
  { code: '48', name: 'غليزان', lat: 35.7373, lng: 0.5560 },
  { code: '49', name: 'تيميمون', lat: 29.2639, lng: 0.2310 },
  { code: '50', name: 'برج باجي مختار', lat: 21.3278, lng: 0.9553 },
  { code: '51', name: 'أولاد جلال', lat: 34.4333, lng: 5.0667 },
  { code: '52', name: 'بني عباس', lat: 30.1322, lng: -2.1667 },
  { code: '53', name: 'عين صالح', lat: 27.1935, lng: 2.4607 },
  { code: '54', name: 'عين قزام', lat: 19.5667, lng: 5.7667 },
  { code: '55', name: 'تقرت', lat: 33.1053, lng: 6.0580 },
  { code: '56', name: 'جانت', lat: 24.5542, lng: 9.4840 },
  { code: '57', name: 'المغير', lat: 33.9506, lng: 5.9242 },
  { code: '58', name: 'المنيعة', lat: 30.5792, lng: 2.8792 }
];

const PRAYER_META = [
  { key: 'Fajr', label: 'الفجر', icon: '🌄', obligatory: true },
  { key: 'Sunrise', label: 'الشروق', icon: '☀️', obligatory: false },
  { key: 'Dhuhr', label: 'الظهر', icon: '🌤️', obligatory: true },
  { key: 'Asr', label: 'العصر', icon: '🌇', obligatory: true },
  { key: 'Maghrib', label: 'المغرب', icon: '🌆', obligatory: true },
  { key: 'Isha', label: 'العشاء', icon: '🌙', obligatory: true }
];

let prayerLocation = {
  code: '16',
  name: 'الجزائر العاصمة — الخروبة',
  lat: 36.7372,
  lng: 3.1030,
  isGps: false,
  exactResolved: false
};
let prayerNotifEnabled = localStorage.getItem(PRAYER_NOTIF_KEY) === '1';
let prayerTodayData = null;
let prayerTomorrowData = null;
let prayerCachedDateKey = '';
let prayerLastHighlightKey = '__init__';
let prayerTickInterval = null;
let prayerWatchId = null;
let prayerGpsState = 'idle';
let prayerGeocodeSeq = 0;

function pD2R(deg) { return (deg * Math.PI) / 180; }
function pR2D(rad) { return (rad * 180) / Math.PI; }
function pFixAngle(a) { return a - 360 * Math.floor(a / 360); }
function pFixHour(h) { return h - 24 * Math.floor(h / 24); }

function pJulian(year, month, day) {
  let y = year;
  let m = month;
  if (m <= 2) {
    y -= 1;
    m += 12;
  }
  const A = Math.floor(y / 100);
  const B = 2 - A + Math.floor(A / 4);
  return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + day + B - 1524.5;
}

function pSunPosition(jd) {
  const D = jd - 2451545.0;
  const g = pFixAngle(357.529 + 0.98560028 * D);
  const q = pFixAngle(280.459 + 0.98564736 * D);
  const L = pFixAngle(q + 1.915 * Math.sin(pD2R(g)) + 0.020 * Math.sin(pD2R(2 * g)));
  const e = 23.439 - 0.00000036 * D;
  const RA = pR2D(Math.atan2(Math.cos(pD2R(e)) * Math.sin(pD2R(L)), Math.cos(pD2R(L)))) / 15.0;
  const eqt = q / 15.0 - pFixHour(RA);
  const decl = pR2D(Math.asin(Math.sin(pD2R(e)) * Math.sin(pD2R(L))));
  return { decl, eqt };
}

function pMidDay(jd, t) {
  const { eqt } = pSunPosition(jd + t);
  return pFixHour(12.0 - eqt);
}

function pSunAngleTime(jd, angle, t, lat, ccw) {
  const { decl } = pSunPosition(jd + t);
  const noon = pMidDay(jd, t);
  const numerator = -Math.sin(pD2R(angle)) - Math.sin(pD2R(decl)) * Math.sin(pD2R(lat));
  const denominator = Math.cos(pD2R(decl)) * Math.cos(pD2R(lat));
  const cosVal = Math.max(-1, Math.min(1, numerator / denominator));
  const delta = pR2D(Math.acos(cosVal)) / 15.0;
  return ccw ? noon - delta : noon + delta;
}

function pAsrTime(jd, factor, t, lat) {
  const { decl } = pSunPosition(jd + t);
  const angle = -pR2D(Math.atan(1.0 / (factor + Math.tan(Math.abs(pD2R(lat - decl))))));
  return pSunAngleTime(jd, angle, t, lat, false);
}

function computePrayerTimesForDate(dateObj, lat, lng) {
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();
  const tz = -dateObj.getTimezoneOffset() / 60;
  const jdate = pJulian(year, month, day) - lng / (15.0 * 24.0);

  const times = {
    Fajr: 5 / 24,
    Sunrise: 6 / 24,
    Dhuhr: 12 / 24,
    Asr: 13 / 24,
    Maghrib: 18 / 24,
    Isha: 18 / 24
  };

  for (let i = 0; i < 2; i++) {
    times.Fajr = pSunAngleTime(jdate, 18.0, times.Fajr, lat, true) / 24.0;
    times.Sunrise = pSunAngleTime(jdate, 0.833, times.Sunrise, lat, true) / 24.0;
    times.Dhuhr = pMidDay(jdate, times.Dhuhr) / 24.0;
    times.Asr = pAsrTime(jdate, 1.0, times.Asr, lat) / 24.0;
    times.Maghrib = pSunAngleTime(jdate, 0.833, times.Maghrib, lat, false) / 24.0;
    times.Isha = pSunAngleTime(jdate, 17.0, times.Isha, lat, false) / 24.0;
  }

  const out = {};
  PRAYER_META.forEach((meta) => {
    const hoursFloat = pFixHour(times[meta.key] * 24.0 + tz - lng / 15.0);
    const totalMinutes = Math.round(hoursFloat * 60) % (24 * 60);
    const hh = String(Math.floor(totalMinutes / 60)).padStart(2, '0');
    const mm = String(totalMinutes % 60).padStart(2, '0');
    out[meta.key] = {
      key: meta.key,
      label: meta.label,
      icon: meta.icon,
      obligatory: meta.obligatory,
      minutes: totalMinutes,
      timeStr: `${hh}:${mm}`
    };
  });
  return out;
}

function getDateKey(dateObj) {
  const y = dateObj.getFullYear();
  const m = String(dateObj.getMonth() + 1).padStart(2, '0');
  const d = String(dateObj.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function haversineKm(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = pD2R(lat2 - lat1);
  const dLng = pD2R(lng2 - lng1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(pD2R(lat1)) * Math.cos(pD2R(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function findNearestWilaya(lat, lng) {
  let best = ALGERIA_WILAYAS[15];
  let bestDist = Infinity;
  for (let i = 0; i < ALGERIA_WILAYAS.length; i++) {
    const w = ALGERIA_WILAYAS[i];
    const dist = haversineKm(lat, lng, w.lat, w.lng);
    if (dist < bestDist) {
      bestDist = dist;
      best = w;
    }
  }
  return { wilaya: best, distKm: bestDist };
}

function loadPrayerLocation() {
  const raw = localStorage.getItem(PRAYER_LOC_KEY);
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed.lat === 'number' && typeof parsed.lng === 'number' && parsed.name) {
        prayerLocation = {
          code: parsed.code || '16',
          name: parsed.name,
          lat: parsed.lat,
          lng: parsed.lng,
          isGps: Boolean(parsed.isGps),
          exactResolved: Boolean(parsed.exactResolved)
        };
      }
    } catch (e) {}
  }
}

function savePrayerLocation() {
  try {
    localStorage.setItem(PRAYER_LOC_KEY, JSON.stringify(prayerLocation));
  } catch (e) {}
}

function updatePrayerGpsStatusUi() {
  const pillEl = document.getElementById('prayerGpsStatusPill');
  const gpsBtn = document.getElementById('prayerGpsBtn');

  if (pillEl) {
    pillEl.classList.remove('is-locked', 'is-warn');
    if (prayerGpsState === 'locked') {
      pillEl.textContent = '🟢 GPS تلقائي';
      pillEl.classList.add('is-locked');
    } else if (prayerGpsState === 'searching') {
      pillEl.textContent = '⏳ تحديد الموقع...';
    } else if (prayerGpsState === 'denied') {
      pillEl.textContent = '⚠️ فعّل GPS';
      pillEl.classList.add('is-warn');
    } else if (prayerGpsState === 'unsupported') {
      pillEl.textContent = '📍 افتراضي';
    } else {
      pillEl.textContent = '📡 GPS تلقائي';
    }
  }

  if (gpsBtn) {
    gpsBtn.classList.remove('prayer-gps-active');
    if (prayerGpsState === 'searching') {
      gpsBtn.disabled = true;
      gpsBtn.textContent = '⏳ تحديد...';
    } else if (prayerGpsState === 'denied') {
      gpsBtn.disabled = false;
      gpsBtn.textContent = '📍 تفعيل GPS';
    } else if (prayerGpsState === 'locked') {
      gpsBtn.disabled = false;
      gpsBtn.classList.add('prayer-gps-active');
      gpsBtn.textContent = '📍 تحديث GPS';
    } else {
      gpsBtn.disabled = false;
      gpsBtn.textContent = '📍 تحديث GPS';
    }
  }
}

async function reverseGeocodeExactPlace(lat, lng) {
  const controller = typeof AbortController === 'function' ? new AbortController() : null;
  const timer = controller ? setTimeout(() => controller.abort(), 6000) : null;
  try {
    const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${encodeURIComponent(lat)}&longitude=${encodeURIComponent(lng)}&localityLanguage=ar`;
    const res = await fetch(url, controller ? { signal: controller.signal } : undefined);
    if (!res || !res.ok) return null;
    const d = await res.json();
    if (!d) return null;

    const locality = (d.locality || '').trim();
    const city = (d.city || '').trim();
    const sub = (d.principalSubdivision || '').trim();
    const secondary = city || sub;

    if (locality && secondary && locality !== secondary && !secondary.includes(locality) && !locality.includes(secondary)) {
      return `${locality}، ${secondary}`;
    }
    return locality || secondary || null;
  } catch (e) {
    return null;
  } finally {
    if (timer) clearTimeout(timer);
  }
}

async function applyGpsCoordinates(lat, lng, forceAnnounce = false) {
  const distMoved = haversineKm(prayerLocation.lat, prayerLocation.lng, lat, lng);
  const wasGps = Boolean(prayerLocation.isGps);

  if (!forceAnnounce && wasGps && distMoved < 1.5 && prayerLocation.exactResolved) {
    prayerGpsState = 'locked';
    updatePrayerGpsStatusUi();
    return false;
  }

  const { wilaya, distKm } = findNearestWilaya(lat, lng);
  const fallbackPlace = distKm <= 120
    ? wilaya.name
    : `${lat.toFixed(2)}°, ${lng.toFixed(2)}°`;
  const keepCurrentName = wasGps && distMoved < 1.5 && Boolean(prayerLocation.name);

  prayerLocation = {
    code: distKm <= 120 ? wilaya.code : prayerLocation.code,
    name: keepCurrentName ? prayerLocation.name : `📍 ${fallbackPlace}`,
    lat: lat,
    lng: lng,
    isGps: true,
    exactResolved: keepCurrentName ? Boolean(prayerLocation.exactResolved) : false
  };
  prayerGpsState = 'locked';
  savePrayerLocation();
  updatePrayerGpsStatusUi();
  recalculateAndRenderPrayers(true);

  const reqId = ++prayerGeocodeSeq;
  const exactPlace = await reverseGeocodeExactPlace(lat, lng);
  if (exactPlace && reqId === prayerGeocodeSeq) {
    prayerLocation.name = `📍 ${exactPlace}`;
    prayerLocation.exactResolved = true;
    savePrayerLocation();
    const locEl = document.getElementById('prayerLocationLabel');
    if (locEl) {
      locEl.textContent = prayerLocation.name;
    }
  }

  if (forceAnnounce) {
    if (typeof showToast === 'function') {
      showToast(`✅ تم ضبط المواقيت حسب موقعك الدقيق: ${prayerLocation.name}`);
    }
  } else if (wasGps && distMoved >= 1.5) {
    if (typeof showToast === 'function') {
      showToast(`📍 تم تحديث مواقيت الصلاة تلقائياً لموقعك الجديد: ${prayerLocation.name}`);
    }
  }
  return true;
}

function stopPrayerAutoTracking() {
  if (prayerWatchId !== null && navigator.geolocation) {
    navigator.geolocation.clearWatch(prayerWatchId);
    prayerWatchId = null;
  }
}

function startPrayerAutoTracking() {
  if (!navigator.geolocation || prayerWatchId !== null) return;
  try {
    prayerWatchId = navigator.geolocation.watchPosition(
      (pos) => {
        applyGpsCoordinates(pos.coords.latitude, pos.coords.longitude, false);
      },
      (err) => {
        if (err && err.code === 1) {
          prayerGpsState = 'denied';
          updatePrayerGpsStatusUi();
        }
      },
      { enableHighAccuracy: true, maximumAge: 60000, timeout: 15000 }
    );
  } catch (e) {}
}

function requestAutoPrayerGps(forceAnnounce = false) {
  if (!navigator.geolocation) {
    prayerGpsState = 'unsupported';
    updatePrayerGpsStatusUi();
    if (forceAnnounce && typeof showToast === 'function') {
      showToast('⚠️ تحديد الموقع الجغرافي (GPS) غير مدعوم في متصفحك');
    }
    return;
  }

  prayerGpsState = 'searching';
  updatePrayerGpsStatusUi();

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      startPrayerAutoTracking();
      applyGpsCoordinates(pos.coords.latitude, pos.coords.longitude, forceAnnounce);
    },
    (err) => {
      if ((err && err.code === 1) || !prayerLocation.isGps) {
        prayerGpsState = 'denied';
      } else {
        prayerGpsState = 'locked';
      }
      updatePrayerGpsStatusUi();
      if (forceAnnounce && typeof showToast === 'function') {
        showToast('⚠️ يرجى السماح بصلاحية الموقع الجغرافي (GPS) في المتصفح لتحديد مكانك تلقائياً');
      }
    },
    { enableHighAccuracy: true, timeout: 12000, maximumAge: 60000 }
  );
}

function detectPrayerLocation() {
  requestAutoPrayerGps(true);
}

function updatePrayerNotifButton() {
  const btn = document.getElementById('prayerNotifBtn');
  if (!btn) return;
  const granted = ('Notification' in window) && Notification.permission === 'granted';
  const active = prayerNotifEnabled && granted;
  btn.classList.toggle('active', active);
  btn.textContent = active ? '🔔 تنبيه مفعّل' : '🔕 فعّل التنبيه';
}

function playPrayerChime() {
  try {
    const AudioCtor = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtor) return;
    const ctx = new AudioCtor();
    const notes = [523.25, 659.25, 783.99];
    notes.forEach((freq, i) => {
      const t = ctx.currentTime + i * 0.16;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t);
      gain.gain.setValueAtTime(0.001, t);
      gain.gain.exponentialRampToValueAtTime(0.08, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.45);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.46);
    });
  } catch (e) {}
}

function dispatchSystemNotification(title, bodyText) {
  if (!('Notification' in window) || Notification.permission !== 'granted') return;
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then((reg) => reg.showNotification(title, {
        body: bodyText,
        icon: './logo.png',
        badge: './logo.png',
        tag: 'joussour-prayer-alert'
      }))
      .catch(() => {
        try { new Notification(title, { body: bodyText, icon: './logo.png' }); } catch (e) {}
      });
  } else {
    try { new Notification(title, { body: bodyText, icon: './logo.png' }); } catch (e) {}
  }
}

async function togglePrayerNotifications() {
  if (!('Notification' in window)) {
    if (typeof showToast === 'function') {
      showToast('⚠️ هذا المتصفح لا يدعم إشعارات النظام');
    }
    return;
  }

  if (prayerNotifEnabled && Notification.permission === 'granted') {
    prayerNotifEnabled = false;
    localStorage.setItem(PRAYER_NOTIF_KEY, '0');
    updatePrayerNotifButton();
    if (typeof showToast === 'function') {
      showToast('🔕 تم إيقاف إشعارات أوقات الصلاة');
    }
    return;
  }

  try {
    const perm = await Notification.requestPermission();
    if (perm === 'granted') {
      prayerNotifEnabled = true;
      localStorage.setItem(PRAYER_NOTIF_KEY, '1');
      updatePrayerNotifButton();
      playPrayerChime();
      dispatchSystemNotification(
        '🕌 تم تفعيل تنبيهات مواقيت الصلاة',
        `سيصلك إشعار عند حلول كل صلاة لمنطقة: ${prayerLocation.name}`
      );
      if (typeof showToast === 'function') {
        showToast('🔔 تم تفعيل تنبيهات أوقات الصلاة بنجاح!');
      }
    } else {
      prayerNotifEnabled = false;
      localStorage.setItem(PRAYER_NOTIF_KEY, '0');
      updatePrayerNotifButton();
      if (typeof showToast === 'function') {
        showToast('⚠️ يرجى السماح بالإشعارات في إعدادات المتصفح لتصلك تنبيهات الصلاة');
      }
    }
  } catch (err) {
    console.error('Notification permission error:', err);
  }
}

function formatPrayerCountdown(diffSec) {
  const s = Math.max(0, Math.floor(diffSec));
  const h = String(Math.floor(s / 3600)).padStart(2, '0');
  const m = String(Math.floor((s % 3600) / 60)).padStart(2, '0');
  const sec = String(s % 60).padStart(2, '0');
  return `${h}:${m}:${sec}`;
}

function getNextPrayerInfo(now) {
  const curSec = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
  for (let i = 0; i < PRAYER_META.length; i++) {
    const meta = PRAYER_META[i];
    const p = prayerTodayData[meta.key];
    const targetSec = p.minutes * 60;
    if (targetSec > curSec) {
      return { key: p.key, label: p.label, timeStr: p.timeStr, diffSec: targetSec - curSec, isTomorrow: false };
    }
  }
  const fajrTomorrow = prayerTomorrowData.Fajr;
  const targetSec = 24 * 3600 + fajrTomorrow.minutes * 60;
  return {
    key: 'Fajr',
    label: 'فجر الغد',
    timeStr: fajrTomorrow.timeStr,
    diffSec: targetSec - curSec,
    isTomorrow: true
  };
}

function checkPrayerNotificationTrigger(now) {
  if (!prayerNotifEnabled || !prayerTodayData) return;
  if (!('Notification' in window) || Notification.permission !== 'granted') return;

  const curMinutes = now.getHours() * 60 + now.getMinutes();
  const dateKey = getDateKey(now);

  for (let i = 0; i < PRAYER_META.length; i++) {
    const meta = PRAYER_META[i];
    if (!meta.obligatory) continue;
    const p = prayerTodayData[meta.key];
    if (!p) continue;
    if (curMinutes === p.minutes) {
      const sentKey = `${PRAYER_SENT_PREFIX}${dateKey}_${p.key}`;
      if (localStorage.getItem(sentKey)) continue;
      localStorage.setItem(sentKey, '1');
      playPrayerChime();
      if (typeof showToast === 'function') {
        showToast(`🕌 حان الآن وقت صلاة ${p.label} (${p.timeStr})`);
      }
      dispatchSystemNotification(
        `🕌 حان الآن وقت صلاة ${p.label}`,
        `التوقيت: ${p.timeStr} • ${prayerLocation.name} — «أقم الصلاة لدلوك الشمس...»`
      );
    }
  }
}

function renderPrayerGrid(nextKey) {
  const grid = document.getElementById('prayerTimesGrid');
  if (!grid || !prayerTodayData) return;

  grid.innerHTML = PRAYER_META.map((meta) => {
    const p = prayerTodayData[meta.key];
    const isNext = meta.key === nextKey;
    return `
      <div class="prayer-slot ${isNext ? 'prayer-slot-next' : ''}" data-prayer="${meta.key}">
        <span class="prayer-slot-name">${meta.icon} ${meta.label}</span>
        <span class="prayer-slot-time">${p.timeStr}</span>
      </div>
    `;
  }).join('');
}

function recalculateAndRenderPrayers(forceRender = false) {
  const now = new Date();
  const dateKey = getDateKey(now);
  let gridNeedsRender = forceRender;

  if (forceRender || dateKey !== prayerCachedDateKey || !prayerTodayData) {
    prayerCachedDateKey = dateKey;
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    prayerTodayData = computePrayerTimesForDate(now, prayerLocation.lat, prayerLocation.lng);
    prayerTomorrowData = computePrayerTimesForDate(tomorrow, prayerLocation.lat, prayerLocation.lng);
    gridNeedsRender = true;
  }

  const locEl = document.getElementById('prayerLocationLabel');
  if (locEl && locEl.textContent !== prayerLocation.name) {
    locEl.textContent = prayerLocation.name;
  }

  const next = getNextPrayerInfo(now);
  const nextLabelEl = document.getElementById('prayerNextLabel');
  const countdownEl = document.getElementById('prayerCountdownEl');
  const nextText = `الصلاة القادمة: ${next.label} (${next.timeStr})`;
  if (nextLabelEl && nextLabelEl.textContent !== nextText) {
    nextLabelEl.textContent = nextText;
  }
  if (countdownEl) countdownEl.textContent = formatPrayerCountdown(next.diffSec);

  const highlightKey = next.isTomorrow ? '' : next.key;
  if (gridNeedsRender || highlightKey !== prayerLastHighlightKey) {
    prayerLastHighlightKey = highlightKey;
    renderPrayerGrid(highlightKey);
  }
  checkPrayerNotificationTrigger(now);
}

function initPrayerTimes() {
  loadPrayerLocation();

  if (('Notification' in window) && Notification.permission === 'granted' && localStorage.getItem(PRAYER_NOTIF_KEY) !== '0') {
    prayerNotifEnabled = true;
    try {
      localStorage.setItem(PRAYER_NOTIF_KEY, '1');
    } catch (e) {}
  }

  updatePrayerNotifButton();
  updatePrayerGpsStatusUi();
  recalculateAndRenderPrayers(true);

  if (prayerTickInterval) clearInterval(prayerTickInterval);
  prayerTickInterval = setInterval(() => {
    recalculateAndRenderPrayers(false);
  }, 1000);

  requestAutoPrayerGps(false);

  document.addEventListener('visibilitychange', () => {
    if (!document.hidden && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => applyGpsCoordinates(pos.coords.latitude, pos.coords.longitude, false),
        () => {},
        { enableHighAccuracy: true, maximumAge: 60000, timeout: 8000 }
      );
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initPrayerTimes();
});
