/* ═════════════════════════════════════════════════════════════════════
   لعبة «كاندي كراش» (8×8) — مطابقة الحلوى والسلاسل المتتابعة
   ═════════════════════════════════════════════════════════════════════ */

const CANDY_SIZE = 8;
const CANDY_START_MOVES = 25;
const CANDY_BEST_KEY = 'joussour_candy_best_v1';
const CANDY_CLOUD_BEST_KEY = 'joussour_candy_cloud_best_v1';
const CANDY_CLOUD_DOC_KEY = 'joussour_candy_doc_id_v1';

const CANDY_TYPES = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];
const CANDY_ICONS = {
  red: '🍓',
  orange: '🍊',
  yellow: '🍋',
  green: '🍏',
  blue: '🫐',
  purple: '🍇'
};

let candyInitialized = false;
let candyBusy = false;
let candySelected = null;
let candyDrag = null;
let candyHintTimer = null;
let candyRoundToken = 0;
let candyLeaderboardUnsub = null;
let candyLeaderboardEntries = [];

const candyState = {
  board: [],
  score: 0,
  best: 0,
  movesLeft: CANDY_START_MOVES,
  gameOver: false
};

function playCandyTone(freq, duration, type = 'sine', vol = 0.08, delay = 0) {
  const soundOn = typeof bbSoundEnabled !== 'undefined'
    ? bbSoundEnabled
    : localStorage.getItem('joussour_blockblast_sound_v1') !== '0';
  if (!soundOn) return;
  if (typeof playBbTone === 'function') {
    playBbTone(freq, duration, type, vol, delay);
  }
}

function playCandyCascadeSound(combo) {
  const base = 460 + Math.min(combo - 1, 6) * 55;
  playCandyTone(base, 0.11, 'sine', 0.09, 0);
  playCandyTone(base * 1.25, 0.13, 'triangle', 0.09, 0.06);
}

function randomCandyColor(excludeColors = []) {
  const pool = CANDY_TYPES.filter(c => !excludeColors.includes(c));
  const list = pool.length > 0 ? pool : CANDY_TYPES;
  return list[Math.floor(Math.random() * list.length)];
}

function makeCandy(color, special = null) {
  return { color: color, special: special };
}

function loadCandyBest() {
  const saved = parseInt(localStorage.getItem(CANDY_BEST_KEY) || '0', 10);
  candyState.best = Number.isFinite(saved) ? saved : 0;
}

function saveCandyBest() {
  try {
    localStorage.setItem(CANDY_BEST_KEY, String(candyState.best || 0));
  } catch (e) {}
}

function hasQuickMatchAt(board, r, c) {
  const tile = board[r] && board[r][c];
  if (!tile || tile.special === 'bomb') return false;
  const color = tile.color;

  let hCount = 1;
  for (let cc = c - 1; cc >= 0 && board[r][cc] && board[r][cc].special !== 'bomb' && board[r][cc].color === color; cc--) hCount++;
  for (let cc = c + 1; cc < CANDY_SIZE && board[r][cc] && board[r][cc].special !== 'bomb' && board[r][cc].color === color; cc++) hCount++;
  if (hCount >= 3) return true;

  let vCount = 1;
  for (let rr = r - 1; rr >= 0 && board[rr][c] && board[rr][c].special !== 'bomb' && board[rr][c].color === color; rr--) vCount++;
  for (let rr = r + 1; rr < CANDY_SIZE && board[rr][c] && board[rr][c].special !== 'bomb' && board[rr][c].color === color; rr++) vCount++;
  return vCount >= 3;
}

function findValidCandySwap(board = candyState.board) {
  for (let r = 0; r < CANDY_SIZE; r++) {
    for (let c = 0; c < CANDY_SIZE; c++) {
      const cur = board[r][c];
      if (!cur) continue;

      if (c + 1 < CANDY_SIZE && board[r][c + 1]) {
        const right = board[r][c + 1];
        if (cur.special === 'bomb' || right.special === 'bomb') {
          return [[r, c], [r, c + 1]];
        }
        board[r][c] = right;
        board[r][c + 1] = cur;
        const ok = hasQuickMatchAt(board, r, c) || hasQuickMatchAt(board, r, c + 1);
        board[r][c] = cur;
        board[r][c + 1] = right;
        if (ok) return [[r, c], [r, c + 1]];
      }

      if (r + 1 < CANDY_SIZE && board[r + 1][c]) {
        const down = board[r + 1][c];
        if (cur.special === 'bomb' || down.special === 'bomb') {
          return [[r, c], [r + 1, c]];
        }
        board[r][c] = down;
        board[r + 1][c] = cur;
        const ok = hasQuickMatchAt(board, r, c) || hasQuickMatchAt(board, r + 1, c);
        board[r][c] = cur;
        board[r + 1][c] = down;
        if (ok) return [[r, c], [r + 1, c]];
      }
    }
  }
  return null;
}

function generateInitialCandyBoard() {
  for (let attempt = 0; attempt < 25; attempt++) {
    const board = Array.from({ length: CANDY_SIZE }, () => Array(CANDY_SIZE).fill(null));
    for (let r = 0; r < CANDY_SIZE; r++) {
      for (let c = 0; c < CANDY_SIZE; c++) {
        const avoid = [];
        if (c >= 2 && board[r][c - 1].color === board[r][c - 2].color) {
          avoid.push(board[r][c - 1].color);
        }
        if (r >= 2 && board[r - 1][c].color === board[r - 2][c].color) {
          avoid.push(board[r - 1][c].color);
        }
        board[r][c] = makeCandy(randomCandyColor(avoid));
      }
    }
    if (findValidCandySwap(board)) {
      return board;
    }
  }
  return Array.from({ length: CANDY_SIZE }, () => Array.from({ length: CANDY_SIZE }, () => makeCandy(randomCandyColor())));
}

function findMatchClusters(board) {
  const hSegs = [];
  const vSegs = [];

  for (let r = 0; r < CANDY_SIZE; r++) {
    let c = 0;
    while (c < CANDY_SIZE) {
      const tile = board[r][c];
      if (!tile || tile.special === 'bomb') {
        c++;
        continue;
      }
      let end = c + 1;
      while (end < CANDY_SIZE && board[r][end] && board[r][end].special !== 'bomb' && board[r][end].color === tile.color) {
        end++;
      }
      if (end - c >= 3) {
        const cells = [];
        for (let k = c; k < end; k++) cells.push([r, k]);
        hSegs.push({ color: tile.color, dir: 'h', cells });
      }
      c = end;
    }
  }

  for (let c = 0; c < CANDY_SIZE; c++) {
    let r = 0;
    while (r < CANDY_SIZE) {
      const tile = board[r][c];
      if (!tile || tile.special === 'bomb') {
        r++;
        continue;
      }
      let end = r + 1;
      while (end < CANDY_SIZE && board[end][c] && board[end][c].special !== 'bomb' && board[end][c].color === tile.color) {
        end++;
      }
      if (end - r >= 3) {
        const cells = [];
        for (let k = r; k < end; k++) cells.push([k, c]);
        vSegs.push({ color: tile.color, dir: 'v', cells });
      }
      r = end;
    }
  }

  const allSegs = hSegs.concat(vSegs);
  if (allSegs.length === 0) return [];

  const visited = Array(allSegs.length).fill(false);
  const clusters = [];

  for (let i = 0; i < allSegs.length; i++) {
    if (visited[i]) continue;
    visited[i] = true;
    const queue = [allSegs[i]];
    const segGroup = [allSegs[i]];
    const cellMap = new Map();
    allSegs[i].cells.forEach(([r, c]) => cellMap.set(`${r},${c}`, [r, c]));

    while (queue.length > 0) {
      const cur = queue.shift();
      for (let j = 0; j < allSegs.length; j++) {
        if (visited[j] || allSegs[j].color !== cur.color) continue;
        const overlaps = allSegs[j].cells.some(([r, c]) => cellMap.has(`${r},${c}`));
        if (overlaps) {
          visited[j] = true;
          queue.push(allSegs[j]);
          segGroup.push(allSegs[j]);
          allSegs[j].cells.forEach(([r, c]) => cellMap.set(`${r},${c}`, [r, c]));
        }
      }
    }

    const hasH = segGroup.some(s => s.dir === 'h');
    const hasV = segGroup.some(s => s.dir === 'v');
    const maxLen = Math.max(...segGroup.map(s => s.cells.length));
    const uniqueCells = Array.from(cellMap.values());

    let spawnSpecial = null;
    if (maxLen >= 5 || (hasH && hasV && uniqueCells.length >= 5)) {
      spawnSpecial = 'bomb';
    } else if (maxLen === 4) {
      spawnSpecial = segGroup[0].dir === 'h' ? 'striped-v' : 'striped-h';
    }

    clusters.push({
      color: segGroup[0].color,
      cells: uniqueCells,
      spawnSpecial: spawnSpecial
    });
  }

  return clusters;
}

function showCandyFloatingText(text) {
  const el = document.getElementById('candyFloatText');
  if (!el) return;
  el.textContent = text;
  el.classList.remove('bb-float-show');
  void el.offsetWidth;
  el.classList.add('bb-float-show');
}

function clearCandyHint() {
  if (candyHintTimer) {
    clearTimeout(candyHintTimer);
    candyHintTimer = null;
  }
  const boardEl = document.getElementById('candyBoard');
  if (!boardEl) return;
  for (let i = 0; i < boardEl.children.length; i++) {
    boardEl.children[i].classList.remove('candy-hint');
  }
}

function scheduleCandyHint() {
  clearCandyHint();
  if (candyBusy || candyState.gameOver) return;
  const token = candyRoundToken;
  candyHintTimer = setTimeout(() => {
    if (token !== candyRoundToken || candyBusy || candyState.gameOver) return;
    const screenEl = document.getElementById('screen-game');
    if (!screenEl || !screenEl.classList.contains('active')) return;
    const pair = findValidCandySwap();
    if (!pair) return;
    const boardEl = document.getElementById('candyBoard');
    if (!boardEl) return;
    pair.forEach(([r, c]) => {
      const tile = boardEl.children[r * CANDY_SIZE + c];
      if (tile) tile.classList.add('candy-hint');
    });
  }, 5000);
}

function renderCandyBoard() {
  const boardEl = document.getElementById('candyBoard');
  if (!boardEl) return;

  if (boardEl.children.length !== CANDY_SIZE * CANDY_SIZE) {
    boardEl.innerHTML = '';
    for (let r = 0; r < CANDY_SIZE; r++) {
      for (let c = 0; c < CANDY_SIZE; c++) {
        const cell = document.createElement('div');
        cell.className = 'candy-cell';
        cell.dataset.r = String(r);
        cell.dataset.c = String(c);
        cell.addEventListener('pointerdown', (e) => handleCandyPointerDown(e, r, c));
        boardEl.appendChild(cell);
      }
    }
  }

  for (let r = 0; r < CANDY_SIZE; r++) {
    for (let c = 0; c < CANDY_SIZE; c++) {
      const cellEl = boardEl.children[r * CANDY_SIZE + c];
      if (!cellEl) continue;
      const item = candyState.board[r][c];
      cellEl.className = 'candy-cell';
      if (!item) {
        cellEl.innerHTML = '';
        continue;
      }

      if (item.special === 'bomb') {
        cellEl.classList.add('candy-tile', 'candy-bomb');
        cellEl.innerHTML = '<span class="candy-emoji">🌈</span>';
      } else {
        cellEl.classList.add('candy-tile', `candy-color-${item.color}`);
        if (item.special === 'striped-h') cellEl.classList.add('candy-striped-h');
        if (item.special === 'striped-v') cellEl.classList.add('candy-striped-v');
        const badge = item.special === 'striped-h'
          ? '<span class="candy-stripe-badge">↔</span>'
          : item.special === 'striped-v'
            ? '<span class="candy-stripe-badge">↕</span>'
            : '';
        cellEl.innerHTML = `<span class="candy-emoji">${CANDY_ICONS[item.color] || '🍬'}</span>${badge}`;
      }

      if (candySelected && candySelected.r === r && candySelected.c === c) {
        cellEl.classList.add('candy-selected');
      }
    }
  }
}

function renderCandyHud() {
  const scoreEl = document.getElementById('candyScoreEl');
  const movesEl = document.getElementById('candyMovesEl');
  const bestEl = document.getElementById('candyBestEl');
  const overOverlay = document.getElementById('candyGameOverOverlay');
  const finalScoreEl = document.getElementById('candyFinalScoreEl');
  const finalBestEl = document.getElementById('candyFinalBestEl');

  if (scoreEl) scoreEl.textContent = String(candyState.score);
  if (movesEl) movesEl.textContent = String(candyState.movesLeft);
  if (bestEl) bestEl.textContent = String(candyState.best);
  if (overOverlay) overOverlay.style.display = candyState.gameOver ? 'flex' : 'none';
  if (finalScoreEl) finalScoreEl.textContent = String(candyState.score);
  if (finalBestEl) finalBestEl.textContent = String(candyState.best);
}

function delayMs(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function expandSpecialClearSet(board, initialCoords) {
  const toClear = new Map();
  const triggered = new Set();
  const queue = [];

  initialCoords.forEach(([r, c]) => {
    const key = `${r},${c}`;
    if (!toClear.has(key)) {
      toClear.set(key, [r, c]);
      queue.push([r, c]);
    }
  });

  while (queue.length > 0) {
    const [r, c] = queue.shift();
    const key = `${r},${c}`;
    const item = board[r] && board[r][c];
    if (!item || !item.special || triggered.has(key)) continue;
    triggered.add(key);

    if (item.special === 'striped-h') {
      for (let cc = 0; cc < CANDY_SIZE; cc++) {
        const k = `${r},${cc}`;
        if (!toClear.has(k)) {
          toClear.set(k, [r, cc]);
          queue.push([r, cc]);
        }
      }
    } else if (item.special === 'striped-v') {
      for (let rr = 0; rr < CANDY_SIZE; rr++) {
        const k = `${rr},${c}`;
        if (!toClear.has(k)) {
          toClear.set(k, [rr, c]);
          queue.push([rr, c]);
        }
      }
    } else if (item.special === 'bomb') {
      const targetColor = CANDY_TYPES[0];
      for (let rr = 0; rr < CANDY_SIZE; rr++) {
        for (let cc = 0; cc < CANDY_SIZE; cc++) {
          if (board[rr][cc] && board[rr][cc].color === targetColor) {
            const k = `${rr},${cc}`;
            if (!toClear.has(k)) {
              toClear.set(k, [rr, cc]);
              queue.push([rr, cc]);
            }
          }
        }
      }
    }
  }

  return Array.from(toClear.values());
}

function applyGravityAndRefill(board) {
  for (let c = 0; c < CANDY_SIZE; c++) {
    let writeR = CANDY_SIZE - 1;
    for (let r = CANDY_SIZE - 1; r >= 0; r--) {
      if (board[r][c] !== null) {
        board[writeR][c] = board[r][c];
        if (writeR !== r) board[r][c] = null;
        writeR--;
      }
    }
    while (writeR >= 0) {
      board[writeR][c] = makeCandy(randomCandyColor());
      writeR--;
    }
  }
}

async function clearAndCascade(initialCoords, specialSpawns, token, comboStart = 1) {
  let combo = comboStart;
  let pendingCoords = initialCoords;
  let pendingSpawns = specialSpawns || [];

  while (pendingCoords && pendingCoords.length > 0) {
    if (token !== candyRoundToken) return;
    const expanded = expandSpecialClearSet(candyState.board, pendingCoords);
    const spawnKeys = new Set(pendingSpawns.map(sp => `${sp.r},${sp.c}`));

    const boardEl = document.getElementById('candyBoard');
    if (boardEl) {
      expanded.forEach(([r, c]) => {
        if (!spawnKeys.has(`${r},${c}`)) {
          const el = boardEl.children[r * CANDY_SIZE + c];
          if (el) el.classList.add('candy-pop');
        }
      });
    }

    const basePerCell = pendingSpawns.length > 0 ? 14 : 10;
    const gained = expanded.length * basePerCell * combo;
    candyState.score += gained;
    if (candyState.score > candyState.best) {
      candyState.best = candyState.score;
      saveCandyBest();
    }

    playCandyCascadeSound(combo);
    if (combo >= 3) {
      showCandyFloatingText(`🔥 سلسلة ×${combo}! +${gained}`);
    } else if (combo === 2 || expanded.length >= 5) {
      showCandyFloatingText(`✨ لذيذ! +${gained}`);
    } else if (pendingSpawns.length > 0) {
      showCandyFloatingText(`⚡ حلوى خاصة! +${gained}`);
    }

    renderCandyHud();
    await delayMs(230);
    if (token !== candyRoundToken) return;

    expanded.forEach(([r, c]) => {
      candyState.board[r][c] = null;
    });
    pendingSpawns.forEach((sp) => {
      candyState.board[sp.r][sp.c] = makeCandy(sp.special === 'bomb' ? 'rainbow' : sp.color, sp.special);
    });

    applyGravityAndRefill(candyState.board);
    renderCandyBoard();
    await delayMs(190);
    if (token !== candyRoundToken) return;

    const nextClusters = findMatchClusters(candyState.board);
    if (nextClusters.length === 0) break;

    combo++;
    const nextCoords = [];
    const nextSpawns = [];
    nextClusters.forEach((cl) => {
      cl.cells.forEach(pt => nextCoords.push(pt));
      if (cl.spawnSpecial) {
        const anchor = cl.cells[Math.floor(cl.cells.length / 2)];
        nextSpawns.push({ r: anchor[0], c: anchor[1], color: cl.color, special: cl.spawnSpecial });
      }
    });
    pendingCoords = nextCoords;
    pendingSpawns = nextSpawns;
  }
}

async function performCandySwap(r1, c1, r2, c2) {
  if (candyBusy || candyState.gameOver) return false;
  if (Math.abs(r1 - r2) + Math.abs(c1 - c2) !== 1) return false;

  const tile1 = candyState.board[r1][c1];
  const tile2 = candyState.board[r2][c2];
  if (!tile1 || !tile2) return false;

  candyBusy = true;
  candySelected = null;
  clearCandyHint();
  const token = candyRoundToken;

  candyState.board[r1][c1] = tile2;
  candyState.board[r2][c2] = tile1;
  renderCandyBoard();
  playCandyTone(360, 0.06, 'sine', 0.06, 0);

  await delayMs(130);
  if (token !== candyRoundToken) return false;

  // التحقق من استخدام قنبلة الألوان (🌈)
  if (tile1.special === 'bomb' || tile2.special === 'bomb') {
    candyState.movesLeft = Math.max(0, candyState.movesLeft - 1);
    const clearList = [[r1, c1], [r2, c2]];
    if (tile1.special === 'bomb' && tile2.special === 'bomb') {
      for (let rr = 0; rr < CANDY_SIZE; rr++) {
        for (let cc = 0; cc < CANDY_SIZE; cc++) clearList.push([rr, cc]);
      }
      showCandyFloatingText('🌈 مسح شامل! 💥');
    } else {
      const targetColor = tile1.special === 'bomb' ? tile2.color : tile1.color;
      for (let rr = 0; rr < CANDY_SIZE; rr++) {
        for (let cc = 0; cc < CANDY_SIZE; cc++) {
          if (candyState.board[rr][cc] && candyState.board[rr][cc].color === targetColor) {
            clearList.push([rr, cc]);
          }
        }
      }
      showCandyFloatingText('🌈 قنبلة ألوان!');
    }
    candyState.board[r1][c1] = { ...candyState.board[r1][c1], special: null };
    candyState.board[r2][c2] = { ...candyState.board[r2][c2], special: null };
    await clearAndCascade(clearList, [], token, 1);
    finishCandyMove(token);
    return true;
  }

  const clusters = findMatchClusters(candyState.board);
  if (clusters.length === 0) {
    // ارتداد سريع عند عدم وجود مطابقة دون خصم حركة
    playCandyTone(220, 0.08, 'triangle', 0.06, 0);
    candyState.board[r1][c1] = tile1;
    candyState.board[r2][c2] = tile2;
    renderCandyBoard();
    candyBusy = false;
    scheduleCandyHint();
    return false;
  }

  candyState.movesLeft = Math.max(0, candyState.movesLeft - 1);
  const clearCoords = [];
  const specialSpawns = [];
  clusters.forEach((cl) => {
    cl.cells.forEach(pt => clearCoords.push(pt));
    if (cl.spawnSpecial) {
      const hitSwap1 = cl.cells.some(([rr, cc]) => rr === r1 && cc === c1);
      const hitSwap2 = cl.cells.some(([rr, cc]) => rr === r2 && cc === c2);
      const anchor = hitSwap1 ? [r1, c1] : hitSwap2 ? [r2, c2] : cl.cells[Math.floor(cl.cells.length / 2)];
      specialSpawns.push({ r: anchor[0], c: anchor[1], color: cl.color, special: cl.spawnSpecial });
    }
  });

  await clearAndCascade(clearCoords, specialSpawns, token, 1);
  finishCandyMove(token);
  return true;
}

function finishCandyMove(token) {
  if (token !== candyRoundToken) return;
  candyBusy = false;

  if (candyState.movesLeft <= 0) {
    candyState.gameOver = true;
    playCandyTone(330, 0.14, 'sine', 0.08, 0);
    playCandyTone(440, 0.2, 'triangle', 0.08, 0.1);
    renderCandyHud();
    if (candyState.score > 0) {
      submitCandyScore(candyState.score);
    }
    return;
  }

  if (!findValidCandySwap()) {
    candyState.board = generateInitialCandyBoard();
    renderCandyBoard();
    showCandyFloatingText('🔀 إعادة خلط اللوحة!');
  }

  renderCandyHud();
  scheduleCandyHint();
}

function handleCandyPointerDown(e, r, c) {
  if (candyBusy || candyState.gameOver) return;
  e.preventDefault();
  candyDrag = {
    r: r,
    c: c,
    pointerId: e.pointerId,
    startX: e.clientX,
    startY: e.clientY,
    swapped: false
  };
  window.addEventListener('pointermove', handleCandyPointerMove, { passive: false });
  window.addEventListener('pointerup', handleCandyPointerUp);
  window.addEventListener('pointercancel', handleCandyPointerCancel);
}

function handleCandyPointerMove(e) {
  if (!candyDrag || e.pointerId !== candyDrag.pointerId || candyDrag.swapped) return;
  const dx = e.clientX - candyDrag.startX;
  const dy = e.clientY - candyDrag.startY;
  if (Math.hypot(dx, dy) < 18) return;

  e.preventDefault();
  candyDrag.swapped = true;
  const { r, c } = candyDrag;
  let nr = r;
  let nc = c;
  if (Math.abs(dx) > Math.abs(dy)) {
    nc += dx > 0 ? 1 : -1;
  } else {
    nr += dy > 0 ? 1 : -1;
  }
  cleanupCandyDrag();
  if (nr >= 0 && nr < CANDY_SIZE && nc >= 0 && nc < CANDY_SIZE) {
    performCandySwap(r, c, nr, nc);
  }
}

function cleanupCandyDrag() {
  window.removeEventListener('pointermove', handleCandyPointerMove);
  window.removeEventListener('pointerup', handleCandyPointerUp);
  window.removeEventListener('pointercancel', handleCandyPointerCancel);
  candyDrag = null;
}

function handleCandyPointerUp(e) {
  if (!candyDrag || e.pointerId !== candyDrag.pointerId) return;
  const { r, c, swapped } = candyDrag;
  cleanupCandyDrag();
  if (swapped) return;

  if (!candySelected) {
    candySelected = { r, c };
    renderCandyBoard();
    scheduleCandyHint();
    return;
  }

  if (candySelected.r === r && candySelected.c === c) {
    candySelected = null;
    renderCandyBoard();
    return;
  }

  if (Math.abs(candySelected.r - r) + Math.abs(candySelected.c - c) === 1) {
    const prev = candySelected;
    performCandySwap(prev.r, prev.c, r, c);
  } else {
    candySelected = { r, c };
    renderCandyBoard();
    scheduleCandyHint();
  }
}

function handleCandyPointerCancel(e) {
  if (!candyDrag || e.pointerId !== candyDrag.pointerId) return;
  cleanupCandyDrag();
}

function resetCandyGame() {
  candyRoundToken++;
  candyBusy = false;
  candySelected = null;
  cleanupCandyDrag();
  clearCandyHint();

  candyState.board = generateInitialCandyBoard();
  candyState.score = 0;
  candyState.movesLeft = CANDY_START_MOVES;
  candyState.gameOver = false;

  renderCandyBoard();
  renderCandyHud();
  scheduleCandyHint();
  playCandyTone(480, 0.09, 'triangle', 0.08, 0);
}

function updateCandySyncBadge(state) {
  const badge = document.getElementById('candySyncBadge');
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

function renderCandyLeaderboard() {
  const listEl = document.getElementById('candyLeaderboardList');
  if (!listEl) return;

  if (!candyLeaderboardEntries || candyLeaderboardEntries.length === 0) {
    listEl.innerHTML = `
      <div class="bb-lb-empty">
        لا توجد أرقام مسجلة بعد — كن أول بطل في كاندي كراش! 🍬
      </div>
    `;
    return;
  }

  const medals = ['🥇', '🥈', '🥉', '4️⃣', '5️⃣'];
  listEl.innerHTML = candyLeaderboardEntries.map((entry, idx) => {
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

function initCandyLeaderboard() {
  const db = typeof getSharedFirestoreDb === 'function' ? getSharedFirestoreDb() : null;
  if (!db) {
    updateCandySyncBadge('offline');
    renderCandyLeaderboard();
    return;
  }
  updateCandySyncBadge('syncing');
  if (candyLeaderboardUnsub) candyLeaderboardUnsub();
  candyLeaderboardUnsub = db
    .collection('candy_scores')
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
      candyLeaderboardEntries = entries;
      renderCandyLeaderboard();
      updateCandySyncBadge('synced');
    }, (err) => {
      console.error('Firestore candy leaderboard error:', err);
      updateCandySyncBadge('offline');
    });
}

async function submitCandyScore(score) {
  const numericScore = Number(score) || 0;
  if (numericScore <= 0) return;

  const prevCloudBest = parseInt(localStorage.getItem(CANDY_CLOUD_BEST_KEY) || '0', 10);
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
    const docId = localStorage.getItem(CANDY_CLOUD_DOC_KEY);
    if (docId) {
      await db.collection('candy_scores').doc(docId).set(payload, { merge: true });
    } else {
      const ref = await db.collection('candy_scores').add(payload);
      localStorage.setItem(CANDY_CLOUD_DOC_KEY, ref.id);
    }
    localStorage.setItem(CANDY_CLOUD_BEST_KEY, String(numericScore));
    updateCandySyncBadge('synced');
  } catch (err) {
    console.error('Firestore candy score submit error:', err);
  }
}

function initCandyGame() {
  if (!candyInitialized) {
    loadCandyBest();
    candyState.board = generateInitialCandyBoard();
    candyState.score = 0;
    candyState.movesLeft = CANDY_START_MOVES;
    candyState.gameOver = false;
    initCandyLeaderboard();
    const openBtn = document.getElementById('openBlockBlastBtn');
    if (openBtn) {
      openBtn.addEventListener('click', () => {
        if (typeof snakeActiveGameTab !== 'undefined' && snakeActiveGameTab === 'candy') {
          requestAnimationFrame(() => initCandyGame());
        }
      });
    }
    candyInitialized = true;
  }
  renderCandyBoard();
  renderCandyHud();
  scheduleCandyHint();
}
