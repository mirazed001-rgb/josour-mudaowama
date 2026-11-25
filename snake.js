/* ═════════════════════════════════════════════════════════════════════
   لعبة «الدودة» الكلاسيكية — مدمجة في تطبيق مداومة جسور
   ═════════════════════════════════════════════════════════════════════ */

const SNAKE_GRID = 16;
const SNAKE_BEST_KEY = 'joussour_snake_best_v1';
const SNAKE_CLOUD_BEST_KEY = 'joussour_snake_cloud_best_v1';
const SNAKE_CLOUD_DOC_KEY = 'joussour_snake_doc_id_v1';
const SNAKE_MODE_KEY = 'joussour_snake_mode_v1';

let snakeActiveGameTab = 'blockblast';
let snakeInitialized = false;
let snakeRafId = null;
let snakeLastTick = 0;
let snakeLeaderboardUnsub = null;
let snakeLeaderboardEntries = [];
let snakeTouchStart = null;
let snakeListenersBound = false;

const snakeState = {
  body: [],
  dir: { dr: 0, dc: 1 },
  dirQueue: [],
  food: { r: 8, c: 11 },
  bonusStar: null,
  particles: [],
  foodsEaten: 0,
  score: 0,
  best: 0,
  mode: localStorage.getItem(SNAKE_MODE_KEY) === 'walls' ? 'walls' : 'wrap',
  tickMs: 155,
  running: false,
  paused: false,
  gameOver: false
};

function loadSnakeBest() {
  const saved = parseInt(localStorage.getItem(SNAKE_BEST_KEY) || '0', 10);
  snakeState.best = Number.isFinite(saved) ? saved : 0;
}

function saveSnakeBest() {
  try {
    localStorage.setItem(SNAKE_BEST_KEY, String(snakeState.best || 0));
  } catch (e) {}
}

function playSnakeTone(freq, duration, type = 'sine', vol = 0.08, delay = 0) {
  const soundOn = typeof bbSoundEnabled !== 'undefined'
    ? bbSoundEnabled
    : localStorage.getItem('joussour_blockblast_sound_v1') !== '0';
  if (!soundOn) return;
  if (typeof playBbTone === 'function') {
    playBbTone(freq, duration, type, vol, delay);
  }
}

function getRandomFreeCell() {
  const occupied = new Set(snakeState.body.map(seg => `${seg.r},${seg.c}`));
  if (snakeState.food) occupied.add(`${snakeState.food.r},${snakeState.food.c}`);
  if (snakeState.bonusStar) occupied.add(`${snakeState.bonusStar.r},${snakeState.bonusStar.c}`);

  const free = [];
  for (let r = 0; r < SNAKE_GRID; r++) {
    for (let c = 0; c < SNAKE_GRID; c++) {
      if (!occupied.has(`${r},${c}`)) free.push({ r, c });
    }
  }
  if (free.length === 0) return null;
  return free[Math.floor(Math.random() * free.length)];
}

function resetSnakeBoardOnly() {
  snakeState.body = [
    { r: 8, c: 6 },
    { r: 8, c: 5 },
    { r: 8, c: 4 }
  ];
  snakeState.dir = { dr: 0, dc: 1 };
  snakeState.dirQueue = [];
  snakeState.foodsEaten = 0;
  snakeState.score = 0;
  snakeState.tickMs = 155;
  snakeState.bonusStar = null;
  snakeState.particles = [];
  snakeState.running = false;
  snakeState.paused = false;
  snakeState.gameOver = false;
  snakeState.food = { r: 8, c: 12 };
}

function spawnParticles(r, c, color, count) {
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.4;
    const speed = 0.04 + Math.random() * 0.08;
    snakeState.particles.push({
      x: c + 0.5,
      y: r + 0.5,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 1.0,
      color: color,
      radius: 2.2 + Math.random() * 2.5
    });
  }
}

function showSnakeFloatingText(msg) {
  const el = document.getElementById('snakeFloatText');
  if (!el) return;
  el.textContent = msg;
  el.classList.remove('bb-float-show');
  void el.offsetWidth;
  el.classList.add('bb-float-show');
}

function renderSnakeHud() {
  const scoreEl = document.getElementById('snakeScoreEl');
  const bestEl = document.getElementById('snakeBestEl');
  const modeBtn = document.getElementById('snakeModeBtn');
  const startOverlay = document.getElementById('snakeStartOverlay');
  const overOverlay = document.getElementById('snakeGameOverOverlay');
  const finalScoreEl = document.getElementById('snakeFinalScoreEl');
  const finalBestEl = document.getElementById('snakeFinalBestEl');
  const pauseBtn = document.getElementById('snakePauseBtn');

  if (scoreEl) scoreEl.textContent = String(snakeState.score);
  if (bestEl) bestEl.textContent = String(snakeState.best);
  if (modeBtn) {
    modeBtn.textContent = snakeState.mode === 'walls'
      ? '🧱 جدران (+50%)'
      : '🌀 حدود مفتوحة';
  }
  if (startOverlay) {
    startOverlay.style.display = (!snakeState.running && !snakeState.gameOver && !snakeState.paused) ? 'flex' : 'none';
  }
  if (overOverlay) {
    overOverlay.style.display = snakeState.gameOver ? 'flex' : 'none';
  }
  if (finalScoreEl) finalScoreEl.textContent = String(snakeState.score);
  if (finalBestEl) finalBestEl.textContent = String(snakeState.best);
  if (pauseBtn) {
    pauseBtn.textContent = snakeState.paused ? '▶️' : '⏸️';
    pauseBtn.title = snakeState.paused ? 'استئناف اللعب' : 'إيقاف مؤقت';
  }
}

function resizeSnakeCanvas() {
  const canvas = document.getElementById('snakeCanvas');
  const wrap = document.getElementById('snakeBoardWrap');
  if (!canvas || !wrap) return;
  const rect = wrap.getBoundingClientRect();
  const cssSize = Math.max(220, Math.round(rect.width || 276));
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = cssSize * dpr;
  canvas.height = cssSize * dpr;
  canvas.style.width = `${cssSize}px`;
  canvas.style.height = `${cssSize}px`;
  drawSnakeFrame(performance.now());
}

function drawSnakeFrame(now) {
  const canvas = document.getElementById('snakeCanvas');
  if (!canvas || !canvas.width) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const size = canvas.width;
  const cell = size / SNAKE_GRID;

  // 1. لوحة الميدان متناوبة المربعات
  for (let r = 0; r < SNAKE_GRID; r++) {
    for (let c = 0; c < SNAKE_GRID; c++) {
      ctx.fillStyle = (r + c) % 2 === 0 ? '#0b2c40' : '#0e354d';
      ctx.fillRect(c * cell, r * cell, cell + 0.5, cell + 0.5);
    }
  }

  // تمييز بصري لحدود الجدران عند تفعيل الوضع الكلاسيكي
  if (snakeState.mode === 'walls') {
    ctx.strokeStyle = 'rgba(225, 29, 72, 0.55)';
    ctx.lineWidth = Math.max(3, cell * 0.16);
    ctx.strokeRect(ctx.lineWidth / 2, ctx.lineWidth / 2, size - ctx.lineWidth, size - ctx.lineWidth);
  }

  // 2. رسم الثمرة الرئيسية بتوهج رماني/تفاحي
  if (snakeState.food) {
    const fx = (snakeState.food.c + 0.5) * cell;
    const fy = (snakeState.food.r + 0.5) * cell;
    const pulse = 1 + Math.sin(now * 0.007) * 0.08;
    const fr = cell * 0.36 * pulse;

    const glow = ctx.createRadialGradient(fx, fy, fr * 0.15, fx, fy, fr * 1.9);
    glow.addColorStop(0, 'rgba(251, 113, 133, 0.55)');
    glow.addColorStop(1, 'rgba(251, 113, 133, 0)');
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(fx, fy, fr * 1.9, 0, Math.PI * 2);
    ctx.fill();

    const fruitGrad = ctx.createRadialGradient(fx - fr * 0.28, fy - fr * 0.28, fr * 0.1, fx, fy, fr);
    fruitGrad.addColorStop(0, '#fda4af');
    fruitGrad.addColorStop(0.55, '#f43f5e');
    fruitGrad.addColorStop(1, '#be123c');
    ctx.fillStyle = fruitGrad;
    ctx.beginPath();
    ctx.arc(fx, fy, fr, 0, Math.PI * 2);
    ctx.fill();

    // ورقة خضراء أعلى الثمرة
    ctx.fillStyle = '#34d399';
    ctx.beginPath();
    ctx.ellipse(fx + fr * 0.25, fy - fr * 0.85, fr * 0.34, fr * 0.16, -0.5, 0, Math.PI * 2);
    ctx.fill();
  }

  // 3. النجمة الذهبية المؤقتة مع حلقة عداد متناقصة
  if (snakeState.bonusStar) {
    const remainingRatio = Math.max(0, (snakeState.bonusStar.expiresAt - now) / snakeState.bonusStar.durationMs);
    const sx = (snakeState.bonusStar.c + 0.5) * cell;
    const sy = (snakeState.bonusStar.r + 0.5) * cell;
    const sr = cell * 0.42;

    ctx.strokeStyle = '#fcd34d';
    ctx.lineWidth = Math.max(2, cell * 0.1);
    ctx.beginPath();
    ctx.arc(sx, sy, sr * 1.15, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * remainingRatio);
    ctx.stroke();

    ctx.save();
    ctx.translate(sx, sy);
    ctx.rotate(now * 0.0025);
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
      const aOuter = (i * 2 * Math.PI) / 5 - Math.PI / 2;
      const aInner = aOuter + Math.PI / 5;
      ctx.lineTo(Math.cos(aOuter) * sr * 0.88, Math.sin(aOuter) * sr * 0.88);
      ctx.lineTo(Math.cos(aInner) * sr * 0.4, Math.sin(aInner) * sr * 0.4);
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  // 4. رسم جسد الدودة متدرجاً من الذيل إلى الرأس
  const len = snakeState.body.length;
  for (let i = len - 1; i >= 0; i--) {
    const seg = snakeState.body[i];
    const cx = (seg.c + 0.5) * cell;
    const cy = (seg.r + 0.5) * cell;
    const t = len > 1 ? i / (len - 1) : 0;
    const radius = i === 0 ? cell * 0.46 : cell * (0.43 - t * 0.14);

    if (i === 0) {
      ctx.fillStyle = '#2dd4bf';
    } else if (i % 2 === 0) {
      ctx.fillStyle = '#0d9488';
    } else {
      ctx.fillStyle = '#14b8a6';
    }

    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fill();

    if (i === 0) {
      ctx.strokeStyle = '#fef3c7';
      ctx.lineWidth = Math.max(1.2, cell * 0.06);
      ctx.stroke();

      // عينا الدودة تتجهان حسب اتجاه الحركة
      const dx = snakeState.dir.dc;
      const dy = snakeState.dir.dr;
      const px = -dy;
      const py = dx;
      const eyeForward = radius * 0.34;
      const eyeSpread = radius * 0.42;
      const eyeR = Math.max(2, radius * 0.22);

      const e1x = cx + dx * eyeForward + px * eyeSpread;
      const e1y = cy + dy * eyeForward + py * eyeSpread;
      const e2x = cx + dx * eyeForward - px * eyeSpread;
      const e2y = cy + dy * eyeForward - py * eyeSpread;

      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(e1x, e1y, eyeR, 0, Math.PI * 2);
      ctx.arc(e2x, e2y, eyeR, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.arc(e1x + dx * eyeR * 0.28, e1y + dy * eyeR * 0.28, eyeR * 0.55, 0, Math.PI * 2);
      ctx.arc(e2x + dx * eyeR * 0.28, e2y + dy * eyeR * 0.28, eyeR * 0.55, 0, Math.PI * 2);
      ctx.fill();

      // لسان صغير يظهر عند الاقتراب من الثمرة
      const nearFood = snakeState.food && (Math.abs(seg.r - snakeState.food.r) + Math.abs(seg.c - snakeState.food.c) <= 2);
      if (nearFood && Math.sin(now * 0.025) > 0) {
        ctx.strokeStyle = '#fb7185';
        ctx.lineWidth = Math.max(1.5, cell * 0.08);
        ctx.beginPath();
        ctx.moveTo(cx + dx * radius, cy + dy * radius);
        ctx.lineTo(cx + dx * (radius + cell * 0.24), cy + dy * (radius + cell * 0.24));
        ctx.stroke();
      }
    }
  }

  // 5. جزيئات الاحتفال
  for (let i = snakeState.particles.length - 1; i >= 0; i--) {
    const p = snakeState.particles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.life -= 0.045;
    if (p.life <= 0) {
      snakeState.particles.splice(i, 1);
      continue;
    }
    ctx.globalAlpha = p.life;
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x * cell, p.y * cell, p.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }

  // 6. علامة الإيقاف المؤقت فوق القماش
  if (snakeState.paused && !snakeState.gameOver) {
    ctx.fillStyle = 'rgba(11, 44, 64, 0.62)';
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = '#fef3c7';
    ctx.font = `bold ${Math.round(size * 0.08)}px Cairo, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('إيقاف مؤقت ⏸️', size / 2, size / 2);
  }
}

function stepSnakeLogic(now) {
  if (snakeState.bonusStar && now >= snakeState.bonusStar.expiresAt) {
    snakeState.bonusStar = null;
  }

  if (snakeState.dirQueue.length > 0) {
    snakeState.dir = snakeState.dirQueue.shift();
  }

  const head = snakeState.body[0];
  let nextR = head.r + snakeState.dir.dr;
  let nextC = head.c + snakeState.dir.dc;

  if (snakeState.mode === 'walls') {
    if (nextR < 0 || nextR >= SNAKE_GRID || nextC < 0 || nextC >= SNAKE_GRID) {
      triggerSnakeGameOver();
      return;
    }
  } else {
    nextR = (nextR + SNAKE_GRID) % SNAKE_GRID;
    nextC = (nextC + SNAKE_GRID) % SNAKE_GRID;
  }

  const ateMainFood = snakeState.food && nextR === snakeState.food.r && nextC === snakeState.food.c;
  const ateStar = snakeState.bonusStar && nextR === snakeState.bonusStar.r && nextC === snakeState.bonusStar.c;

  // لا يُحسب الذيل الأخير تصادماً إذا لم تطُل الدودة في هذه الخطوة
  const limit = ateMainFood ? snakeState.body.length : snakeState.body.length - 1;
  for (let i = 0; i < limit; i++) {
    if (snakeState.body[i].r === nextR && snakeState.body[i].c === nextC) {
      triggerSnakeGameOver();
      return;
    }
  }

  snakeState.body.unshift({ r: nextR, c: nextC });
  if (!ateMainFood) {
    snakeState.body.pop();
  } else {
    const pts = snakeState.mode === 'walls' ? 15 : 10;
    snakeState.score += pts;
    snakeState.foodsEaten++;
    snakeState.tickMs = Math.max(78, 155 - snakeState.foodsEaten * 3);
    spawnParticles(nextR, nextC, '#fb7185', 10);
    playSnakeTone(560, 0.08, 'sine', 0.09, 0);
    playSnakeTone(740, 0.09, 'sine', 0.08, 0.04);

    if (snakeState.body.length >= SNAKE_GRID * SNAKE_GRID) {
      snakeState.score += 100;
      showSnakeFloatingText('🏆 ما شاء الله! لوحة كاملة +100');
      triggerSnakeGameOver();
      return;
    }

    snakeState.food = getRandomFreeCell();
    if (snakeState.foodsEaten % 5 === 0 && !snakeState.bonusStar) {
      const starCell = getRandomFreeCell();
      if (starCell) {
        snakeState.bonusStar = {
          r: starCell.r,
          c: starCell.c,
          expiresAt: now + 7000,
          durationMs: 7000
        };
      }
    }
  }

  if (ateStar) {
    snakeState.score += 30;
    spawnParticles(nextR, nextC, '#fcd34d', 14);
    snakeState.bonusStar = null;
    playSnakeTone(660, 0.1, 'triangle', 0.1, 0);
    playSnakeTone(880, 0.14, 'triangle', 0.1, 0.06);
    showSnakeFloatingText('✨ نجمة ذهبية! +30');
  }

  if (snakeState.score > snakeState.best) {
    snakeState.best = snakeState.score;
    saveSnakeBest();
  }
  renderSnakeHud();
}

function triggerSnakeGameOver() {
  snakeState.running = false;
  snakeState.paused = false;
  snakeState.gameOver = true;
  if (snakeState.score > snakeState.best) {
    snakeState.best = snakeState.score;
    saveSnakeBest();
  }
  playSnakeTone(280, 0.16, 'sine', 0.08, 0);
  playSnakeTone(200, 0.22, 'sine', 0.07, 0.12);
  renderSnakeHud();
  if (snakeState.score > 0) {
    submitSnakeScore(snakeState.score);
  }
}

function snakeLoop(now) {
  const screenEl = document.getElementById('screen-game');
  if (!screenEl || !screenEl.classList.contains('active') || snakeActiveGameTab !== 'snake' || document.hidden) {
    if (snakeState.running && !snakeState.paused && !snakeState.gameOver) {
      setSnakePaused(true);
    }
    snakeRafId = null;
    return;
  }

  if (snakeState.running && !snakeState.paused && !snakeState.gameOver) {
    if (now - snakeLastTick >= snakeState.tickMs) {
      snakeLastTick = now;
      stepSnakeLogic(now);
    }
  }

  drawSnakeFrame(now);

  if (snakeState.running || snakeState.particles.length > 0) {
    snakeRafId = requestAnimationFrame(snakeLoop);
  } else {
    snakeRafId = null;
  }
}

function ensureSnakeLoop() {
  if (!snakeRafId) {
    snakeLastTick = performance.now();
    snakeRafId = requestAnimationFrame(snakeLoop);
  }
}

function startSnakeGame() {
  if (snakeState.gameOver || snakeState.body.length === 0) {
    resetSnakeBoardOnly();
  }
  snakeState.running = true;
  snakeState.paused = false;
  renderSnakeHud();
  ensureSnakeLoop();
  playSnakeTone(480, 0.08, 'triangle', 0.08, 0);
}

function resetSnakeGame() {
  resetSnakeBoardOnly();
  snakeState.running = true;
  renderSnakeHud();
  ensureSnakeLoop();
  playSnakeTone(480, 0.08, 'triangle', 0.08, 0);
}

function setSnakePaused(flag) {
  if (snakeState.gameOver || !snakeState.running) return;
  snakeState.paused = Boolean(flag);
  renderSnakeHud();
  drawSnakeFrame(performance.now());
  if (!snakeState.paused) {
    ensureSnakeLoop();
  }
}

function toggleSnakePause() {
  if (snakeState.gameOver) return;
  if (!snakeState.running) {
    startSnakeGame();
    return;
  }
  setSnakePaused(!snakeState.paused);
}

function toggleSnakeMode() {
  snakeState.mode = snakeState.mode === 'wrap' ? 'walls' : 'wrap';
  try {
    localStorage.setItem(SNAKE_MODE_KEY, snakeState.mode);
  } catch (e) {}
  resetSnakeBoardOnly();
  renderSnakeHud();
  drawSnakeFrame(performance.now());
  if (typeof showToast === 'function') {
    showToast(snakeState.mode === 'walls'
      ? '🧱 تم تفعيل وضع الجدران الكلاسيكية (+50% نقاط)'
      : '🌀 تم تفعيل وضع الحدود المفتوحة');
  }
}

function snakeQueueDir(dr, dc) {
  if (snakeState.gameOver) return;
  if (!snakeState.running && !snakeState.paused) {
    startSnakeGame();
  }
  if (snakeState.paused) return;

  const refDir = snakeState.dirQueue.length > 0
    ? snakeState.dirQueue[snakeState.dirQueue.length - 1]
    : snakeState.dir;

  if (refDir.dr === dr && refDir.dc === dc) return;
  if (refDir.dr + dr === 0 && refDir.dc + dc === 0) return;

  if (snakeState.dirQueue.length < 2) {
    snakeState.dirQueue.push({ dr, dc });
  }
}

function bindSnakeInputsOnce() {
  if (snakeListenersBound) return;
  snakeListenersBound = true;

  const canvas = document.getElementById('snakeCanvas');
  if (canvas) {
    canvas.addEventListener('touchstart', (e) => {
      if (e.touches && e.touches.length > 0) {
        snakeTouchStart = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    }, { passive: true });

    canvas.addEventListener('touchmove', (e) => {
      if (!snakeTouchStart || !e.touches || e.touches.length === 0) return;
      const dx = e.touches[0].clientX - snakeTouchStart.x;
      const dy = e.touches[0].clientY - snakeTouchStart.y;
      if (Math.abs(dx) < 18 && Math.abs(dy) < 18) return;
      e.preventDefault();
      if (Math.abs(dx) > Math.abs(dy)) {
        snakeQueueDir(0, dx > 0 ? 1 : -1);
      } else {
        snakeQueueDir(dy > 0 ? 1 : -1, 0);
      }
      snakeTouchStart = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }, { passive: false });

    canvas.addEventListener('touchend', () => {
      snakeTouchStart = null;
    });
  }

  document.querySelectorAll('.snake-dir-btn').forEach((btn) => {
    btn.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      const dr = parseInt(btn.dataset.dr || '0', 10);
      const dc = parseInt(btn.dataset.dc || '0', 10);
      snakeQueueDir(dr, dc);
    });
  });

  window.addEventListener('keydown', (e) => {
    const screenEl = document.getElementById('screen-game');
    if (!screenEl || !screenEl.classList.contains('active') || snakeActiveGameTab !== 'snake') return;

    const tag = document.activeElement ? document.activeElement.tagName : '';
    if (tag === 'INPUT' || tag === 'TEXTAREA') return;

    if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
      e.preventDefault();
      snakeQueueDir(-1, 0);
    } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
      e.preventDefault();
      snakeQueueDir(1, 0);
    } else if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
      e.preventDefault();
      snakeQueueDir(0, -1);
    } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
      e.preventDefault();
      snakeQueueDir(0, 1);
    } else if (e.key === ' ') {
      e.preventDefault();
      toggleSnakePause();
    }
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden && snakeState.running && !snakeState.paused && !snakeState.gameOver) {
      setSnakePaused(true);
    }
  });

  window.addEventListener('resize', () => {
    if (snakeActiveGameTab === 'snake') {
      resizeSnakeCanvas();
    }
  });

  const openBtn = document.getElementById('openBlockBlastBtn');
  if (openBtn) {
    openBtn.addEventListener('click', () => {
      if (snakeActiveGameTab === 'snake') {
        requestAnimationFrame(() => initSnakeGame());
      }
    });
  }
}

function updateSnakeSyncBadge(state) {
  const badge = document.getElementById('snakeSyncBadge');
  if (!badge) return;
  badge.classList.remove('synced', 'offline');
  if (state === 'synced') {
    badge.classList.add('synced');
    badge.textContent = '☁️ متزامن مع الجميع ✅';
  } else if (state === 'offline') {
    badge.classList.add('offline');
    badge.textContent = '📴 وضع محلي مؤقت';
  } else {
    badge.textContent = '☁️ جاري الاتصال...';
  }
}

function renderSnakeLeaderboard() {
  const listEl = document.getElementById('snakeLeaderboardList');
  if (!listEl) return;

  if (!snakeLeaderboardEntries || snakeLeaderboardEntries.length === 0) {
    listEl.innerHTML = `
      <div class="bb-lb-empty">
        لا توجد أرقام مسجلة بعد — كن أول بطل في لعبة الدودة! 🐍
      </div>
    `;
    return;
  }

  const medals = ['🥇', '🥈', '🥉', '4️⃣', '5️⃣'];
  listEl.innerHTML = snakeLeaderboardEntries.map((entry, idx) => {
    const safeName = typeof escapeHtml === 'function' ? escapeHtml(entry.name || 'بطل جسور') : (entry.name || 'بطل جسور');
    const safeDate = typeof escapeHtml === 'function' ? escapeHtml(entry.date || '') : (entry.date || '');
    return `
      <div class="bb-lb-row">
        <div class="bb-lb-player">
          <span class="bb-lb-medal">${medals[idx] || '🏅'}</span>
          <span class="bb-lb-name">${safeName}</span>
          ${safeDate ? `<span class="bb-lb-date">${safeDate}</span>` : ''}
        </div>
        <span class="bb-lb-score">${Number(entry.score) || 0}</span>
      </div>
    `;
  }).join('');
}

function initSnakeLeaderboard() {
  const db = typeof getSharedFirestoreDb === 'function' ? getSharedFirestoreDb() : null;
  if (!db) {
    updateSnakeSyncBadge('offline');
    renderSnakeLeaderboard();
    return;
  }
  updateSnakeSyncBadge('syncing');
  if (snakeLeaderboardUnsub) snakeLeaderboardUnsub();
  snakeLeaderboardUnsub = db
    .collection('snake_scores')
    .orderBy('score', 'desc')
    .limit(5)
    .onSnapshot((snapshot) => {
      const entries = [];
      snapshot.forEach((doc) => {
        const d = doc.data() || {};
        entries.push({
          id: doc.id,
          name: d.name || 'بطل جسور',
          score: Number(d.score) || 0,
          date: d.date || ''
        });
      });
      snakeLeaderboardEntries = entries;
      renderSnakeLeaderboard();
      updateSnakeSyncBadge('synced');
    }, (err) => {
      console.error('Firestore snake leaderboard error:', err);
      updateSnakeSyncBadge('offline');
    });
}

async function submitSnakeScore(score) {
  const numericScore = Number(score) || 0;
  if (numericScore <= 0) return;

  const prevCloudBest = parseInt(localStorage.getItem(SNAKE_CLOUD_BEST_KEY) || '0', 10);
  if (numericScore <= prevCloudBest) return;

  const db = typeof getSharedFirestoreDb === 'function' ? getSharedFirestoreDb() : null;
  if (!db || typeof firebase === 'undefined') return;

  const playerName = (typeof DutyState !== 'undefined' && DutyState.userProfile && DutyState.userProfile.fullName && DutyState.userProfile.fullName.trim())
    ? DutyState.userProfile.fullName.trim()
    : 'أحد نشطاء جسور';

  const now = new Date();
  const dateStr = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}`;
  const payload = {
    name: playerName,
    score: numericScore,
    date: dateStr,
    updatedAtMs: now.getTime(),
    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
  };

  try {
    const docId = localStorage.getItem(SNAKE_CLOUD_DOC_KEY);
    if (docId) {
      await db.collection('snake_scores').doc(docId).set(payload, { merge: true });
    } else {
      const ref = await db.collection('snake_scores').add(payload);
      localStorage.setItem(SNAKE_CLOUD_DOC_KEY, ref.id);
    }
    localStorage.setItem(SNAKE_CLOUD_BEST_KEY, String(numericScore));
    updateSnakeSyncBadge('synced');
  } catch (err) {
    console.error('Firestore snake score submit error:', err);
  }
}

function initSnakeGame() {
  if (!snakeInitialized) {
    loadSnakeBest();
    resetSnakeBoardOnly();
    bindSnakeInputsOnce();
    initSnakeLeaderboard();
    snakeInitialized = true;
  }
  renderSnakeHud();
  renderSnakeLeaderboard();
  resizeSnakeCanvas();
}

function switchActiveGame(tabName) {
  if (tabName === 'snake' || tabName === 'candy') {
    snakeActiveGameTab = tabName;
  } else {
    snakeActiveGameTab = 'blockblast';
  }
  const bbPane = document.getElementById('gamePaneBlockBlast');
  const snakePane = document.getElementById('gamePaneSnake');
  const candyPane = document.getElementById('gamePaneCandy');

  document.querySelectorAll('.game-switch-pill').forEach((btn) => {
    if (btn.dataset.game === snakeActiveGameTab) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  if (snakeActiveGameTab !== 'snake' && snakeState.running && !snakeState.paused && !snakeState.gameOver) {
    setSnakePaused(true);
  }
  if (snakeActiveGameTab !== 'candy' && typeof clearCandyHint === 'function') {
    clearCandyHint();
  }

  if (bbPane) bbPane.style.display = snakeActiveGameTab === 'blockblast' ? 'block' : 'none';
  if (snakePane) snakePane.style.display = snakeActiveGameTab === 'snake' ? 'block' : 'none';
  if (candyPane) candyPane.style.display = snakeActiveGameTab === 'candy' ? 'block' : 'none';

  if (snakeActiveGameTab === 'snake') {
    initSnakeGame();
  } else if (snakeActiveGameTab === 'candy') {
    if (typeof initCandyGame === 'function') {
      initCandyGame();
    }
  } else if (typeof initBlockBlastGame === 'function') {
    initBlockBlastGame();
  }
}

function restartActiveGame() {
  if (snakeActiveGameTab === 'snake') {
    resetSnakeGame();
  } else if (snakeActiveGameTab === 'candy' && typeof resetCandyGame === 'function') {
    resetCandyGame();
  } else if (typeof resetBlockBlastGame === 'function') {
    resetBlockBlastGame();
  }
}

function leaveGamesScreen() {
  if (snakeState.running && !snakeState.paused && !snakeState.gameOver) {
    setSnakePaused(true);
  }
  if (typeof clearCandyHint === 'function') {
    clearCandyHint();
  }
  if (typeof switchScreen === 'function') {
    switchScreen('screen-cockpit');
  }
}
