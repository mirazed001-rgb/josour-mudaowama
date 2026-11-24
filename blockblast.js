/* ═════════════════════════════════════════════════════════════════════
   لعبة «بلوك بلاست» (8×8) — مدمجة بالهوية الأندلسية ومتزامنة الصدارة
   ═════════════════════════════════════════════════════════════════════ */

const BB_SIZE = 8;
const BB_STATE_KEY = 'joussour_blockblast_state_v1';
const BB_BEST_KEY = 'joussour_blockblast_best_v1';
const BB_CLOUD_BEST_KEY = 'joussour_blockblast_cloud_best_v1';
const BB_CLOUD_DOC_KEY = 'joussour_blockblast_doc_id_v1';
const BB_SOUND_KEY = 'joussour_blockblast_sound_v1';

const BB_COLORS = ['teal', 'gold', 'emerald', 'coral', 'sapphire', 'plum'];

const BB_SHAPES = [
  { cells: [[0, 0]], weight: 3 },
  { cells: [[0, 0], [0, 1]], weight: 5 },
  { cells: [[0, 0], [1, 0]], weight: 5 },
  { cells: [[0, 0], [0, 1], [0, 2]], weight: 6 },
  { cells: [[0, 0], [1, 0], [2, 0]], weight: 6 },
  { cells: [[0, 0], [0, 1], [0, 2], [0, 3]], weight: 4 },
  { cells: [[0, 0], [1, 0], [2, 0], [3, 0]], weight: 4 },
  { cells: [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4]], weight: 3 },
  { cells: [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0]], weight: 3 },
  { cells: [[0, 0], [0, 1], [1, 0], [1, 1]], weight: 7 },
  { cells: [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2], [2, 0], [2, 1], [2, 2]], weight: 3 },
  { cells: [[0, 0], [1, 0], [1, 1]], weight: 5 },
  { cells: [[0, 0], [0, 1], [1, 0]], weight: 5 },
  { cells: [[0, 0], [1, 0], [2, 0], [2, 1], [2, 2]], weight: 4 },
  { cells: [[0, 0], [0, 1], [0, 2], [1, 2], [2, 2]], weight: 4 },
  { cells: [[0, 0], [0, 1], [0, 2], [1, 1]], weight: 5 },
  { cells: [[0, 1], [1, 0], [1, 1], [1, 2]], weight: 5 },
  { cells: [[0, 0], [0, 1], [1, 1], [1, 2]], weight: 4 },
  { cells: [[0, 1], [0, 2], [1, 0], [1, 1]], weight: 4 }
];

const BB_TOTAL_WEIGHT = BB_SHAPES.reduce((acc, s) => acc + s.weight, 0);

let bbState = {
  board: [],
  tray: [null, null, null],
  score: 0,
  best: 0,
  comboStreak: 0,
  gameOver: false
};

let bbSoundEnabled = localStorage.getItem(BB_SOUND_KEY) !== '0';
let bbInitialized = false;
let bbAnimating = false;
let bbTurnToken = 0;
let bbSelectedTrayIdx = null;
let bbDrag = null;
let bbAudioCtx = null;
let bbLeaderboardUnsub = null;
let bbLeaderboardEntries = [];

function createEmptyBbBoard() {
  return Array.from({ length: BB_SIZE }, () => Array(BB_SIZE).fill(null));
}

function getBbAudioCtx() {
  if (!bbAudioCtx) {
    const AudioCtor = window.AudioContext || window.webkitAudioContext;
    if (AudioCtor) {
      bbAudioCtx = new AudioCtor();
    }
  }
  if (bbAudioCtx && bbAudioCtx.state === 'suspended') {
    bbAudioCtx.resume().catch(() => {});
  }
  return bbAudioCtx;
}

function playBbTone(freq, duration, type = 'sine', vol = 0.08, delay = 0) {
  if (!bbSoundEnabled) return;
  const ctx = getBbAudioCtx();
  if (!ctx) return;
  const now = ctx.currentTime + delay;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, now);
  gain.gain.setValueAtTime(0.001, now);
  gain.gain.exponentialRampToValueAtTime(vol, now + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + duration + 0.02);
}

function playBbPlaceSound() {
  playBbTone(320, 0.09, 'triangle', 0.09, 0);
}

function playBbClearSound(linesCleared, combo) {
  const base = 440 + Math.min(combo, 5) * 45;
  playBbTone(base, 0.14, 'sine', 0.1, 0);
  playBbTone(base * 1.25, 0.16, 'sine', 0.1, 0.07);
  if (linesCleared >= 2) {
    playBbTone(base * 1.5, 0.22, 'triangle', 0.11, 0.14);
  }
}

function playBbGameOverSound() {
  playBbTone(300, 0.18, 'sine', 0.08, 0);
  playBbTone(230, 0.25, 'sine', 0.07, 0.14);
}

function toggleBlockBlastSound() {
  bbSoundEnabled = !bbSoundEnabled;
  localStorage.setItem(BB_SOUND_KEY, bbSoundEnabled ? '1' : '0');
  updateBbSoundButton();
  if (bbSoundEnabled) {
    playBbTone(520, 0.08, 'sine', 0.07, 0);
  }
}

function updateBbSoundButton() {
  const btn = document.getElementById('bbSoundToggleBtn');
  if (!btn) return;
  btn.textContent = bbSoundEnabled ? '🔊' : '🔇';
  btn.title = bbSoundEnabled ? 'كتم مؤثرات اللعبة' : 'تشغيل مؤثرات اللعبة';
}

function pickWeightedShape() {
  let roll = Math.random() * BB_TOTAL_WEIGHT;
  for (let i = 0; i < BB_SHAPES.length; i++) {
    roll -= BB_SHAPES[i].weight;
    if (roll <= 0) {
      return BB_SHAPES[i].cells.map(([r, c]) => [r, c]);
    }
  }
  return BB_SHAPES[0].cells.map(([r, c]) => [r, c]);
}

function pickRandomColor(usedColors) {
  const available = BB_COLORS.filter(c => !usedColors.includes(c));
  const pool = available.length > 0 ? available : BB_COLORS;
  return pool[Math.floor(Math.random() * pool.length)];
}

function getPieceDimensions(cells) {
  let maxR = 0;
  let maxC = 0;
  for (let i = 0; i < cells.length; i++) {
    if (cells[i][0] > maxR) maxR = cells[i][0];
    if (cells[i][1] > maxC) maxC = cells[i][1];
  }
  return { rows: maxR + 1, cols: maxC + 1 };
}

function canPlacePiece(board, cells, baseR, baseC) {
  for (let i = 0; i < cells.length; i++) {
    const r = baseR + cells[i][0];
    const c = baseC + cells[i][1];
    if (r < 0 || r >= BB_SIZE || c < 0 || c >= BB_SIZE) return false;
    if (board[r][c] !== null) return false;
  }
  return true;
}

function canPlaceAnywhere(board, cells) {
  for (let r = 0; r < BB_SIZE; r++) {
    for (let c = 0; c < BB_SIZE; c++) {
      if (canPlacePiece(board, cells, r, c)) return true;
    }
  }
  return false;
}

function spawnTrayPieces(board) {
  const pieces = [];
  const usedColors = [];
  for (let i = 0; i < 3; i++) {
    const color = pickRandomColor(usedColors);
    usedColors.push(color);
    pieces.push({
      cells: pickWeightedShape(),
      color: color
    });
  }

  // ضمان إمكانية وضع قطعة واحدة على الأقل في كل دفعة جديدة متى سمحت اللوحة
  const anyFits = pieces.some(p => canPlaceAnywhere(board, p.cells));
  if (!anyFits) {
    const fittingShapes = BB_SHAPES.filter(s => canPlaceAnywhere(board, s.cells));
    if (fittingShapes.length > 0) {
      const chosen = fittingShapes[Math.floor(Math.random() * fittingShapes.length)];
      pieces[0].cells = chosen.cells.map(([r, c]) => [r, c]);
    }
  }
  return pieces;
}

function saveBbState() {
  try {
    localStorage.setItem(BB_BEST_KEY, String(bbState.best || 0));
    localStorage.setItem(BB_STATE_KEY, JSON.stringify({
      board: bbState.board,
      tray: bbState.tray,
      score: bbState.score,
      comboStreak: bbState.comboStreak,
      gameOver: bbState.gameOver
    }));
  } catch (e) {
    console.error('Block Blast save error:', e);
  }
}

function loadBbState() {
  const savedBest = parseInt(localStorage.getItem(BB_BEST_KEY) || '0', 10);
  bbState.best = Number.isFinite(savedBest) ? savedBest : 0;

  const raw = localStorage.getItem(BB_STATE_KEY);
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      if (
        parsed &&
        Array.isArray(parsed.board) &&
        parsed.board.length === BB_SIZE &&
        Array.isArray(parsed.tray) &&
        parsed.tray.length === 3
      ) {
        bbState.board = parsed.board;
        bbState.tray = parsed.tray;
        bbState.score = Number(parsed.score) || 0;
        bbState.comboStreak = Number(parsed.comboStreak) || 0;
        bbState.gameOver = Boolean(parsed.gameOver);
        return;
      }
    } catch (e) {
      console.error('Block Blast load error:', e);
    }
  }

  bbState.board = createEmptyBbBoard();
  bbState.tray = spawnTrayPieces(bbState.board);
  bbState.score = 0;
  bbState.comboStreak = 0;
  bbState.gameOver = false;
}

function buildBbBoardGrid() {
  const boardEl = document.getElementById('bbBoard');
  if (!boardEl || boardEl.children.length === BB_SIZE * BB_SIZE) return;
  boardEl.innerHTML = '';
  for (let r = 0; r < BB_SIZE; r++) {
    for (let c = 0; c < BB_SIZE; c++) {
      const cell = document.createElement('div');
      cell.className = 'bb-cell';
      cell.dataset.r = String(r);
      cell.dataset.c = String(c);
      cell.addEventListener('click', () => handleBoardCellTap(r, c));
      boardEl.appendChild(cell);
    }
  }
}

function getBbCellEl(r, c) {
  const boardEl = document.getElementById('bbBoard');
  if (!boardEl) return null;
  return boardEl.children[r * BB_SIZE + c] || null;
}

function renderBbBoard() {
  const boardEl = document.getElementById('bbBoard');
  if (!boardEl) return;
  buildBbBoardGrid();

  for (let r = 0; r < BB_SIZE; r++) {
    for (let c = 0; c < BB_SIZE; c++) {
      const cellEl = boardEl.children[r * BB_SIZE + c];
      if (!cellEl) continue;
      const val = bbState.board[r][c];
      cellEl.className = 'bb-cell';
      if (val) {
        cellEl.classList.add('bb-filled', `bb-color-${val}`);
      }
    }
  }
}

function renderBbHud() {
  const scoreEl = document.getElementById('bbScoreEl');
  const bestEl = document.getElementById('bbBestEl');
  const comboEl = document.getElementById('bbComboBadge');
  const overOverlay = document.getElementById('bbGameOverOverlay');
  const finalScoreEl = document.getElementById('bbFinalScoreEl');
  const finalBestEl = document.getElementById('bbFinalBestEl');

  if (scoreEl) scoreEl.textContent = String(bbState.score);
  if (bestEl) bestEl.textContent = String(bbState.best);
  if (comboEl) {
    if (bbState.comboStreak > 1) {
      comboEl.textContent = `🔥 مضاعف ×${bbState.comboStreak}`;
      comboEl.style.display = 'inline-flex';
    } else {
      comboEl.style.display = 'none';
    }
  }
  if (overOverlay) {
    overOverlay.style.display = bbState.gameOver ? 'flex' : 'none';
  }
  if (finalScoreEl) finalScoreEl.textContent = String(bbState.score);
  if (finalBestEl) finalBestEl.textContent = String(bbState.best);
}

function createMiniPieceGrid(piece, cellPx) {
  const { rows, cols } = getPieceDimensions(piece.cells);
  const grid = document.createElement('div');
  grid.className = 'bb-piece-grid';
  grid.style.gridTemplateColumns = `repeat(${cols}, ${cellPx}px)`;
  grid.style.gridTemplateRows = `repeat(${rows}, ${cellPx}px)`;

  const lookup = new Set(piece.cells.map(([r, c]) => `${r},${c}`));
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const tile = document.createElement('div');
      if (lookup.has(`${r},${c}`)) {
        tile.className = `bb-mini-cell bb-color-${piece.color}`;
      } else {
        tile.className = 'bb-mini-empty';
      }
      grid.appendChild(tile);
    }
  }
  return grid;
}

function renderBbTray() {
  const trayEl = document.getElementById('bbTray');
  if (!trayEl) return;
  trayEl.innerHTML = '';

  for (let idx = 0; idx < 3; idx++) {
    const slot = document.createElement('div');
    slot.className = 'bb-tray-slot';
    slot.dataset.idx = String(idx);

    const piece = bbState.tray[idx];
    if (!piece) {
      slot.classList.add('bb-slot-empty');
      trayEl.appendChild(slot);
      continue;
    }

    const fits = canPlaceAnywhere(bbState.board, piece.cells);
    if (!fits) {
      slot.classList.add('bb-piece-stuck');
    }
    if (bbSelectedTrayIdx === idx) {
      slot.classList.add('bb-slot-selected');
    }
    if (bbDrag && bbDrag.trayIdx === idx) {
      slot.classList.add('bb-slot-dragging');
    }

    const { rows, cols } = getPieceDimensions(piece.cells);
    const maxDim = Math.max(rows, cols);
    const miniSize = maxDim >= 5 ? 14 : maxDim === 4 ? 17 : maxDim === 3 ? 20 : 23;
    slot.appendChild(createMiniPieceGrid(piece, miniSize));

    slot.addEventListener('pointerdown', (e) => handleTrayPointerDown(e, idx));
    trayEl.appendChild(slot);
  }
}

function clearBoardPreview() {
  const boardEl = document.getElementById('bbBoard');
  if (!boardEl) return;
  for (let i = 0; i < boardEl.children.length; i++) {
    boardEl.children[i].classList.remove('bb-preview-valid', 'bb-will-clear');
  }
}

function computeClearedLinesPreview(cells, baseR, baseC) {
  const added = new Set(cells.map(([dr, dc]) => `${baseR + dr},${baseC + dc}`));
  const fullRows = [];
  const fullCols = [];

  for (let r = 0; r < BB_SIZE; r++) {
    let ok = true;
    for (let c = 0; c < BB_SIZE; c++) {
      if (bbState.board[r][c] === null && !added.has(`${r},${c}`)) {
        ok = false;
        break;
      }
    }
    if (ok) fullRows.push(r);
  }

  for (let c = 0; c < BB_SIZE; c++) {
    let ok = true;
    for (let r = 0; r < BB_SIZE; r++) {
      if (bbState.board[r][c] === null && !added.has(`${r},${c}`)) {
        ok = false;
        break;
      }
    }
    if (ok) fullCols.push(c);
  }
  return { fullRows, fullCols };
}

function showBoardPreview(piece, baseR, baseC) {
  clearBoardPreview();
  if (!canPlacePiece(bbState.board, piece.cells, baseR, baseC)) return;

  for (let i = 0; i < piece.cells.length; i++) {
    const el = getBbCellEl(baseR + piece.cells[i][0], baseC + piece.cells[i][1]);
    if (el) el.classList.add('bb-preview-valid');
  }

  const { fullRows, fullCols } = computeClearedLinesPreview(piece.cells, baseR, baseC);
  fullRows.forEach((r) => {
    for (let c = 0; c < BB_SIZE; c++) {
      const el = getBbCellEl(r, c);
      if (el) el.classList.add('bb-will-clear');
    }
  });
  fullCols.forEach((c) => {
    for (let r = 0; r < BB_SIZE; r++) {
      const el = getBbCellEl(r, c);
      if (el) el.classList.add('bb-will-clear');
    }
  });
}

function getBoardGeometry() {
  const boardEl = document.getElementById('bbBoard');
  if (!boardEl || boardEl.children.length < BB_SIZE * BB_SIZE) return null;
  const c0 = boardEl.children[0].getBoundingClientRect();
  const c7 = boardEl.children[7].getBoundingClientRect();
  const c56 = boardEl.children[56].getBoundingClientRect();
  if (c0.width <= 0) return null;

  return {
    originX: c0.left,
    originY: c0.top,
    cellSize: c0.width,
    pitchX: (c7.left - c0.left) / 7,
    pitchY: (c56.top - c0.top) / 7
  };
}

function handleTrayPointerDown(e, trayIdx) {
  if (bbAnimating || bbState.gameOver) return;
  const piece = bbState.tray[trayIdx];
  if (!piece) return;
  e.preventDefault();

  const geom = getBoardGeometry();
  const cellSize = geom ? geom.cellSize : 36;
  const { rows, cols } = getPieceDimensions(piece.cells);
  const ghostWidth = cols * cellSize;
  const ghostHeight = rows * cellSize;
  const touchLift = e.pointerType === 'touch' ? 64 : 0;

  const ghostEl = document.getElementById('bbDragGhost');
  if (ghostEl) {
    ghostEl.innerHTML = '';
    ghostEl.appendChild(createMiniPieceGrid(piece, cellSize));
    ghostEl.style.display = 'block';
    ghostEl.style.left = `${e.clientX - ghostWidth / 2}px`;
    ghostEl.style.top = `${e.clientY - touchLift - ghostHeight / 2}px`;
  }

  bbDrag = {
    trayIdx: trayIdx,
    pointerId: e.pointerId,
    startX: e.clientX,
    startY: e.clientY,
    moved: false,
    touchLift: touchLift,
    ghostWidth: ghostWidth,
    ghostHeight: ghostHeight,
    geom: geom,
    dropR: null,
    dropC: null
  };

  renderBbTray();
  window.addEventListener('pointermove', handleGlobalPointerMove, { passive: false });
  window.addEventListener('pointerup', handleGlobalPointerUp);
  window.addEventListener('pointercancel', handleGlobalPointerCancel);
}

function updateDragPosition(clientX, clientY) {
  if (!bbDrag) return;
  const piece = bbState.tray[bbDrag.trayIdx];
  if (!piece) return;

  if (Math.hypot(clientX - bbDrag.startX, clientY - bbDrag.startY) > 7) {
    bbDrag.moved = true;
  }

  const ghostLeft = clientX - bbDrag.ghostWidth / 2;
  const ghostTop = clientY - bbDrag.touchLift - bbDrag.ghostHeight / 2;

  const ghostEl = document.getElementById('bbDragGhost');
  if (ghostEl) {
    ghostEl.style.left = `${ghostLeft}px`;
    ghostEl.style.top = `${ghostTop}px`;
  }

  const g = bbDrag.geom || getBoardGeometry();
  bbDrag.geom = g;
  if (!g) return;

  const baseC = Math.round((ghostLeft - g.originX) / g.pitchX);
  const baseR = Math.round((ghostTop - g.originY) / g.pitchY);

  if (canPlacePiece(bbState.board, piece.cells, baseR, baseC)) {
    bbDrag.dropR = baseR;
    bbDrag.dropC = baseC;
    showBoardPreview(piece, baseR, baseC);
  } else {
    bbDrag.dropR = null;
    bbDrag.dropC = null;
    clearBoardPreview();
  }
}

function handleGlobalPointerMove(e) {
  if (!bbDrag || e.pointerId !== bbDrag.pointerId) return;
  e.preventDefault();
  updateDragPosition(e.clientX, e.clientY);
}

function cleanupDragListeners() {
  window.removeEventListener('pointermove', handleGlobalPointerMove);
  window.removeEventListener('pointerup', handleGlobalPointerUp);
  window.removeEventListener('pointercancel', handleGlobalPointerCancel);
  const ghostEl = document.getElementById('bbDragGhost');
  if (ghostEl) {
    ghostEl.style.display = 'none';
    ghostEl.innerHTML = '';
  }
  clearBoardPreview();
}

function handleGlobalPointerUp(e) {
  if (!bbDrag || e.pointerId !== bbDrag.pointerId) return;
  updateDragPosition(e.clientX, e.clientY);
  const dragSnapshot = bbDrag;
  bbDrag = null;
  cleanupDragListeners();

  if (dragSnapshot.dropR !== null && dragSnapshot.dropC !== null) {
    bbSelectedTrayIdx = null;
    placePiece(dragSnapshot.trayIdx, dragSnapshot.dropR, dragSnapshot.dropC);
    return;
  }

  if (!dragSnapshot.moved) {
    bbSelectedTrayIdx = bbSelectedTrayIdx === dragSnapshot.trayIdx ? null : dragSnapshot.trayIdx;
  }
  renderBbTray();
}

function handleGlobalPointerCancel(e) {
  if (!bbDrag || e.pointerId !== bbDrag.pointerId) return;
  bbDrag = null;
  cleanupDragListeners();
  renderBbTray();
}

function handleBoardCellTap(r, c) {
  if (bbAnimating || bbState.gameOver || bbSelectedTrayIdx === null) return;
  const piece = bbState.tray[bbSelectedTrayIdx];
  if (!piece) return;

  if (canPlacePiece(bbState.board, piece.cells, r, c)) {
    const idx = bbSelectedTrayIdx;
    bbSelectedTrayIdx = null;
    placePiece(idx, r, c);
  } else if (typeof showToast === 'function') {
    showToast('⚠️ هذا الموضع لا يتسع للقطعة المختارة');
  }
}

function showBbFloatingText(message) {
  const el = document.getElementById('bbFloatText');
  if (!el) return;
  el.textContent = message;
  el.classList.remove('bb-float-show');
  void el.offsetWidth;
  el.classList.add('bb-float-show');
}

function placePiece(trayIdx, baseR, baseC) {
  if (bbAnimating || bbState.gameOver) return false;
  const piece = bbState.tray[trayIdx];
  if (!piece || !canPlacePiece(bbState.board, piece.cells, baseR, baseC)) return false;

  for (let i = 0; i < piece.cells.length; i++) {
    const r = baseR + piece.cells[i][0];
    const c = baseC + piece.cells[i][1];
    bbState.board[r][c] = piece.color;
  }
  bbState.tray[trayIdx] = null;
  bbSelectedTrayIdx = null;
  bbState.score += piece.cells.length;

  const { fullRows, fullCols } = computeClearedLinesPreview([], 0, 0);
  const linesCleared = fullRows.length + fullCols.length;

  renderBbBoard();

  if (linesCleared > 0) {
    bbAnimating = true;
    bbState.comboStreak = (bbState.comboStreak || 0) + 1;
    const baseLineScore = linesCleared === 1 ? 10 : linesCleared === 2 ? 25 : 45 * linesCleared;
    const linePoints = baseLineScore * bbState.comboStreak;

    const toClear = [];
    fullRows.forEach((r) => {
      for (let c = 0; c < BB_SIZE; c++) toClear.push([r, c]);
    });
    fullCols.forEach((c) => {
      for (let r = 0; r < BB_SIZE; r++) toClear.push([r, c]);
    });

    toClear.forEach(([r, c]) => {
      const cellEl = getBbCellEl(r, c);
      if (cellEl) cellEl.classList.add('bb-clearing');
    });

    playBbClearSound(linesCleared, bbState.comboStreak);

    const token = bbTurnToken;
    setTimeout(() => {
      if (token !== bbTurnToken) return;
      toClear.forEach(([r, c]) => {
        bbState.board[r][c] = null;
      });

      const isAllClear = bbState.board.every(row => row.every(v => v === null));
      const allClearBonus = isAllClear ? 150 : 0;
      const gained = linePoints + allClearBonus;
      bbState.score += gained;

      if (isAllClear) {
        showBbFloatingText(`✨ تصفية كاملة! +${gained}`);
      } else if (bbState.comboStreak > 1) {
        showBbFloatingText(`🔥 مضاعف ×${bbState.comboStreak}! +${gained}`);
      } else {
        showBbFloatingText(`🌟 مسح رائع! +${gained}`);
      }

      bbAnimating = false;
      finishTurnChecks();
    }, 260);
  } else {
    bbState.comboStreak = 0;
    playBbPlaceSound();
    finishTurnChecks();
  }

  return true;
}

function finishTurnChecks() {
  if (bbState.tray.every(p => p === null)) {
    bbState.tray = spawnTrayPieces(bbState.board);
  }

  if (bbState.score > bbState.best) {
    bbState.best = bbState.score;
  }

  const remaining = bbState.tray.filter(Boolean);
  const canMove = remaining.some(p => canPlaceAnywhere(bbState.board, p.cells));
  if (!canMove) {
    bbState.gameOver = true;
    playBbGameOverSound();
    if (bbState.score > 0) {
      submitBlockBlastScore(bbState.score);
    }
  }

  saveBbState();
  renderBbBoard();
  renderBbTray();
  renderBbHud();
}

function resetBlockBlastGame() {
  if (bbState.score > 0 && !bbState.gameOver) {
    submitBlockBlastScore(bbState.score);
  }
  bbTurnToken++;
  bbAnimating = false;
  bbDrag = null;
  bbSelectedTrayIdx = null;
  cleanupDragListeners();

  bbState.board = createEmptyBbBoard();
  bbState.tray = spawnTrayPieces(bbState.board);
  bbState.score = 0;
  bbState.comboStreak = 0;
  bbState.gameOver = false;

  saveBbState();
  renderBbBoard();
  renderBbTray();
  renderBbHud();
  playBbTone(480, 0.1, 'triangle', 0.08, 0);
}

function updateBbSyncBadge(state) {
  const badge = document.getElementById('bbSyncBadge');
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

function renderBbLeaderboard() {
  const listEl = document.getElementById('bbLeaderboardList');
  if (!listEl) return;

  if (!bbLeaderboardEntries || bbLeaderboardEntries.length === 0) {
    listEl.innerHTML = `
      <div class="bb-lb-empty">
        لا توجد أرقام مسجلة بعد — كن أول بطل في لوحة صدارة جسور! 🏆
      </div>
    `;
    return;
  }

  const medals = ['🥇', '🥈', '🥉', '4️⃣', '5️⃣'];
  listEl.innerHTML = bbLeaderboardEntries.map((entry, idx) => {
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

function initBlockBlastLeaderboard() {
  const db = typeof getSharedFirestoreDb === 'function' ? getSharedFirestoreDb() : null;
  if (!db) {
    updateBbSyncBadge('offline');
    renderBbLeaderboard();
    return;
  }
  updateBbSyncBadge('syncing');
  if (bbLeaderboardUnsub) bbLeaderboardUnsub();
  bbLeaderboardUnsub = db
    .collection('blockblast_scores')
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
      bbLeaderboardEntries = entries;
      renderBbLeaderboard();
      updateBbSyncBadge('synced');
    }, (err) => {
      console.error('Firestore blockblast leaderboard error:', err);
      updateBbSyncBadge('offline');
    });
}

async function submitBlockBlastScore(score) {
  const numericScore = Number(score) || 0;
  if (numericScore <= 0) return;

  const prevCloudBest = parseInt(localStorage.getItem(BB_CLOUD_BEST_KEY) || '0', 10);
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
    let docId = localStorage.getItem(BB_CLOUD_DOC_KEY);
    if (docId) {
      await db.collection('blockblast_scores').doc(docId).set(payload, { merge: true });
    } else {
      const ref = await db.collection('blockblast_scores').add(payload);
      localStorage.setItem(BB_CLOUD_DOC_KEY, ref.id);
    }
    localStorage.setItem(BB_CLOUD_BEST_KEY, String(numericScore));
    updateBbSyncBadge('synced');
  } catch (err) {
    console.error('Firestore blockblast score submit error:', err);
  }
}

function initBlockBlastGame() {
  if (!bbInitialized) {
    loadBbState();
    bbInitialized = true;
    initBlockBlastLeaderboard();
  }
  updateBbSoundButton();
  renderBbBoard();
  renderBbTray();
  renderBbHud();
  renderBbLeaderboard();
}

function openBlockBlastScreen() {
  if (typeof switchScreen === 'function') {
    switchScreen('screen-game');
  }
  initBlockBlastGame();
}
