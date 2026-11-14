/**
 * Territory Painter - 2 Player Browser Battle
 * Box size: 20x20
 * Player 1: Light Blue (Top-Right, WASD)
 * Player 2: Light Purple (Bottom-Left, Arrow Keys)
 * Continuous smooth movement while keys are held
 */

class SoundController {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggle() {
    this.enabled = !this.enabled;
    return this.enabled;
  }

  // Paint splat sound
  playPaint(player) {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    const baseFreq = player === 1 ? 520 : 380;
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, now + 0.08);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.08);
  }

  // Traversal of own path
  playStep() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(140, now + 0.04);

    gain.gain.setValueAtTime(0.04, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.04);
  }

  // Blocked / invalid move sound
  playBlocked() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(110, now);
    osc.frequency.linearRampToValueAtTime(70, now + 0.1);

    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.1);
  }

  // Countdown beep sound (low beep for 3, 2, 1; high chime for GO)
  playBeep(isGo = false) {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    osc.type = 'sine';
    const freq = isGo ? 880 : 440;
    const duration = isGo ? 0.32 : 0.18;

    osc.frequency.setValueAtTime(freq, now);
    if (isGo) {
      osc.frequency.exponentialRampToValueAtTime(1100, now + duration);
    }

    gain.gain.setValueAtTime(isGo ? 0.25 : 0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + duration);
  }

  // Victory fanfare
  playVictory() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const notes = [440, 554.37, 659.25, 880];
    notes.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const time = this.ctx.currentTime + i * 0.12;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, time);

      gain.gain.setValueAtTime(0.2, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.28);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(time);
      osc.stop(time + 0.3);
    });
  }

  // Speed buff pickup sound
  playBuff() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    [520, 780, 1040].forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const t = now + i * 0.055;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, t);

      gain.gain.setValueAtTime(0.12, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.12);
    });
  }

  // Speed debuff (heavy food) sound
  playDebuff() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(260, now);
    osc.frequency.exponentialRampToValueAtTime(110, now + 0.22);

    gain.gain.setValueAtTime(0.14, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.22);
  }

  // Rare Golden Apple celestial sound
  playGoldenApple() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    [587.33, 739.99, 880, 1174.66, 1479.98].forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const t = now + i * 0.065;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t);

      gain.gain.setValueAtTime(0.18, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.22);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.22);
    });
  }

  // Territory breach crash / conquer sound
  playBreach() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(450, now);
    osc.frequency.exponentialRampToValueAtTime(850, now + 0.09);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.09);
  }
}

class Particle {
  constructor(x, y, color, isGolden = false) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.isGolden = isGolden;
    this.radius = isGolden ? Math.random() * 4 + 2 : Math.random() * 3 + 1.5;
    const angle = Math.random() * Math.PI * 2;
    const speed = isGolden ? Math.random() * 3.5 + 1 : Math.random() * 2 + 0.5;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.life = 1.0;
    this.decay = Math.random() * 0.04 + 0.025;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.life -= this.decay;
  }

  draw(ctx) {
    if (this.life <= 0) return;
    ctx.save();
    ctx.globalAlpha = Math.max(0, this.life);
    ctx.fillStyle = this.color;
    if (this.isGolden) {
      ctx.shadowColor = '#facc15';
      ctx.shadowBlur = 8;
    }
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

// Power-ups and Drop Items Configuration
const ITEM_TYPES = [
  {
    id: 'fries', icon: '🍟', name: 'Loaded Fries', effectType: 'slow', multiplier: 1.35,
    duration: 5000, lifespan: 9000, weight: 12, sound: 'debuff', color: '#f97316'
  },
  {
    id: 'burger', icon: '🍔', name: 'Double Burger', effectType: 'slow', multiplier: 1.55,
    duration: 10000, lifespan: 9000, weight: 10, sound: 'debuff', color: '#ef4444'
  },
  {
    id: 'donut', icon: '🍩', name: 'Mega Donut', effectType: 'slow', multiplier: 1.8,
    duration: 15000, lifespan: 9000, weight: 8, sound: 'debuff', color: '#db2777'
  },
  {
    id: 'apple', icon: '🍎', name: 'Fresh Apple', effectType: 'speed', multiplier: 0.82,
    duration: 5000, lifespan: 9000, weight: 13, sound: 'buff', color: '#22c55e'
  },
  {
    id: 'berries', icon: '🫐', name: 'Power Berries', effectType: 'speed', multiplier: 0.68,
    duration: 10000, lifespan: 9000, weight: 11, sound: 'buff', color: '#6366f1'
  },
  {
    id: 'salad', icon: '🥗', name: 'Turbo Salad', effectType: 'speed', multiplier: 0.55,
    duration: 15000, lifespan: 9000, weight: 9, sound: 'buff', color: '#84cc16'
  },
  {
    id: 'shoes', icon: '👟', name: 'Rocket Shoes', effectType: 'speed', multiplier: 0.48,
    duration: 8000, lifespan: 9000, weight: 9, sound: 'buff', color: '#38bdf8'
  },
  {
    id: 'skateboard', icon: '🛹', name: 'Turbo Skateboard', effectType: 'speed', multiplier: 0.38,
    duration: 15000, lifespan: 9000, weight: 6, sound: 'buff', color: '#a855f7'
  },
  {
    id: 'golden_apple', icon: '🍏', name: 'Golden Apple', effectType: 'apple', isGoldenApple: true,
    duration: 15000, lifespan: 10000, weight: 5, sound: 'apple', color: '#facc15'
  },
  {
    id: 'snow', icon: '❄', name: 'Snow Freeze', effectType: 'freeze',
    duration: 5000, lifespan: 9000, weight: 7, sound: 'debuff', color: '#67e8f9'
  }
];

// Direction mapping constants
const P1_KEY_MAP = {
  'KeyW': { dx: 0, dy: -1 },
  'KeyS': { dx: 0, dy: 1 },
  'KeyA': { dx: -1, dy: 0 },
  'KeyD': { dx: 1, dy: 0 }
};

const P2_KEY_MAP = {
  'ArrowUp': { dx: 0, dy: -1 },
  'ArrowDown': { dx: 0, dy: 1 },
  'ArrowLeft': { dx: -1, dy: 0 },
  'ArrowRight': { dx: 1, dy: 0 }
};

class TerritoryGame {
  constructor() {
    this.canvas = document.getElementById('gameCanvas');
    this.ctx = this.canvas.getContext('2d');

    // UI elements
    this.scoreP1El = document.getElementById('scoreP1');
    this.tilesP1El = document.getElementById('tilesP1');
    this.coverageP1El = document.getElementById('coverageP1');

    this.scoreP2El = document.getElementById('scoreP2');
    this.tilesP2El = document.getElementById('tilesP2');
    this.coverageP2El = document.getElementById('coverageP2');

    this.barP1 = document.getElementById('barP1');
    this.barP2 = document.getElementById('barP2');
    this.unclaimedText = document.getElementById('unclaimedText');
    this.gameStatusText = document.getElementById('gameStatusText');

    this.gameOverModal = document.getElementById('gameOverModal');
    this.winnerTitle = document.getElementById('winnerTitle');
    this.winnerSubtitle = document.getElementById('winnerSubtitle');
    this.finalScoreP1 = document.getElementById('finalScoreP1');
    this.finalCoverageP1 = document.getElementById('finalCoverageP1');
    this.finalScoreP2 = document.getElementById('finalScoreP2');
    this.finalCoverageP2 = document.getElementById('finalCoverageP2');

    this.soundToggleBtn = document.getElementById('soundToggleBtn');
    this.soundIcon = document.getElementById('soundIcon');
    this.gridSizeSelect = document.getElementById('gridSizeSelect');
    this.speedSelect = document.getElementById('speedSelect');

    this.arenaOverlay = document.getElementById('arenaOverlay');
    this.countdownText = document.getElementById('countdownText');

    this.effectsP1El = document.getElementById('effectsP1');
    this.effectsP2El = document.getElementById('effectsP2');

    this.sound = new SoundController();

    // Constant box size in pixels
    this.boxSize = 20;

    // Grid dimension
    this.gridSize = parseInt(this.gridSizeSelect.value, 10) || 25;

    // Movement speed settings
    this.initialKeyDelay = 140; // ms before continuous auto-repeat begins
    this.moveInterval = parseInt(this.speedSelect?.value, 10) || 90; // ms between continuous steps

    // Continuous input tracking
    this.p1HeldKeys = [];
    this.p2HeldKeys = [];
    this.p1DpadDir = null;
    this.p2DpadDir = null;
    this.gamepadState = {};
    this.gamepadActionState = {};
    this.itemIcons = new Map();
    this.nextMoveTime = { 1: 0, 2: 0 };
    this.lastBlockedSoundTime = { 1: 0, 2: 0 };

    this.isCountingDown = false;
    this.countdownTimerId = null;

    // Dynamic dropped items on the board
    this.items = [];
    this.nextItemSpawnTime = 0;

    // Color definitions
    this.COLORS = {
      EMPTY: '#10162d',
      EMPTY_BORDER: '#1e2a49',
      P1_TRAIL: '#08cdd0',
      P1_HEAD: '#05e7df',
      P1_HEAD_BORDER: '#00aebc',
      P1_EYES: '#09213b',
      P2_TRAIL: '#d52cc5',
      P2_HEAD: '#fa4dd4',
      P2_HEAD_BORDER: '#ac18af',
      P2_EYES: '#381144'
    };

    this.particles = [];
    this.paintTimes = [];
    this.playerMotion = {};
    this.isGameOver = false;

    this.initGame();
    this.setupListeners();
    this.startRenderLoop();
  }

  initGame() {
    this.isGameOver = false;
    this.particles = [];
    this.gameOverModal.classList.add('hidden');

    if (this.countdownTimerId) {
      clearTimeout(this.countdownTimerId);
      this.countdownTimerId = null;
    }

    // Reset continuous input states
    this.p1HeldKeys = [];
    this.p2HeldKeys = [];
    this.p1DpadDir = null;
    this.p2DpadDir = null;
    this.nextMoveTime = { 1: 0, 2: 0 };

    const isAuto = !this.gridSizeSelect || this.gridSizeSelect.value === 'auto';
    if (isAuto) {
      // Use maximum available screen area!
      const availW = window.innerWidth;
      const availH = window.innerHeight;
      this.cols = Math.max(15, Math.floor(availW / this.boxSize));
      this.rows = Math.max(15, Math.floor(availH / this.boxSize));
    } else {
      this.gridSize = parseInt(this.gridSizeSelect.value, 10) || 25;
      this.cols = this.gridSize;
      this.rows = this.gridSize;
    }

    // Reset items and effects
    this.items = [];
    this.nextItemSpawnTime = performance.now() + 2500;
    if (this.effectsP1El) this.effectsP1El.innerHTML = '';
    if (this.effectsP2El) this.effectsP2El.innerHTML = '';

    // Resize canvas
    this.canvas.width = this.cols * this.boxSize;
    this.canvas.height = this.rows * this.boxSize;

    // 0: Unpainted, 1: Player 1 (Blue), 2: Player 2 (Purple)
    this.grid = Array.from({ length: this.rows }, () => new Array(this.cols).fill(0));
    this.paintTimes = Array.from({ length: this.rows }, () => new Array(this.cols).fill(0));

    // Player 1: Top Right corner
    this.p1 = {
      x: this.cols - 1,
      y: 0,
      score: 10,
      tiles: 1,
      name: 'Player 1 (Blue)',
      color: this.COLORS.P1_TRAIL,
      headColor: this.COLORS.P1_HEAD,
      borderColor: this.COLORS.P1_HEAD_BORDER,
      eyeColor: this.COLORS.P1_EYES,
      effects: {
        speedMultiplier: 1.0,
        speedEndTime: 0,
        speedName: '',
        speedIcon: '',
        speedType: '',
        goldenAppleEndTime: 0,
        freezeEndTime: 0
      }
    };

    // Player 2: Bottom Left corner
    this.p2 = {
      x: 0,
      y: this.rows - 1,
      score: 10,
      tiles: 1,
      name: 'Player 2 (Purple)',
      color: this.COLORS.P2_TRAIL,
      headColor: this.COLORS.P2_HEAD,
      borderColor: this.COLORS.P2_HEAD_BORDER,
      eyeColor: this.COLORS.P2_EYES,
      effects: {
        speedMultiplier: 1.0,
        speedEndTime: 0,
        speedName: '',
        speedIcon: '',
        speedType: '',
        goldenAppleEndTime: 0,
        freezeEndTime: 0
      }
    };

    // Paint initial starting boxes
    this.grid[this.p1.y][this.p1.x] = 1;
    this.grid[this.p2.y][this.p2.x] = 2;
    this.paintTimes[this.p1.y][this.p1.x] = performance.now();
    this.paintTimes[this.p2.y][this.p2.x] = performance.now();
    this.playerMotion = {
      1: { dx: -1, dy: 0, movedAt: performance.now() },
      2: { dx: 1, dy: 0, movedAt: performance.now() }
    };

    this.updateStatsUI();
    this.startCountdown();
  }

  /**
   * 3-2-1-GO! Countdown sequence before players get control
   */
  startCountdown() {
    this.isCountingDown = true;
    this.p1HeldKeys = [];
    this.p2HeldKeys = [];
    this.p1DpadDir = null;
    this.p2DpadDir = null;

    this.arenaOverlay.classList.remove('hidden');

    const steps = [
      { text: '3', isGo: false, status: 'Starting in 3...' },
      { text: '2', isGo: false, status: 'Starting in 2...' },
      { text: '1', isGo: false, status: 'Starting in 1...' },
      { text: 'GO!', isGo: true, status: 'Battle In Progress!' }
    ];

    let currentStep = 0;

    const runStep = () => {
      if (this.isGameOver) return;

      const step = steps[currentStep];
      this.countdownText.textContent = step.text;
      this.countdownText.classList.remove('pop', 'go');
      // Trigger reflow to restart CSS pop animation
      void this.countdownText.offsetWidth;
      this.countdownText.classList.add('pop');
      if (step.isGo) {
        this.countdownText.classList.add('go');
      }

      this.gameStatusText.textContent = step.status;
      this.sound.playBeep(step.isGo);

      if (currentStep < steps.length - 1) {
        currentStep++;
        this.countdownTimerId = setTimeout(runStep, 850);
      } else {
        // "GO!" finishes and control is granted
        this.countdownTimerId = setTimeout(() => {
          this.arenaOverlay.classList.add('hidden');
          this.isCountingDown = false;
          this.countdownTimerId = null;
          this.gameStatusText.textContent = 'Battle In Progress';
          const now = performance.now();
          this.nextMoveTime[1] = now;
          this.nextMoveTime[2] = now;
        }, 500);
      }
    };

    runStep();
  }

  setupListeners() {
    window.addEventListener('gamepadconnected', () => {
      this.gameStatusText.textContent = 'Controller Connected';
    });
    window.addEventListener('gamepaddisconnected', () => {
      this.gamepadState = {};
    });
    // Keyboard controls with continuous hold detection
    window.addEventListener('keydown', (e) => {
      // Sound / Restart hotkeys
      if (e.key === 'r' || e.key === 'R') {
        this.initGame();
        return;
      }
      if (e.key === 'm' || e.key === 'M') {
        const on = this.sound.toggle();
        this.soundIcon.textContent = on ? '🔊' : '🔇';
        return;
      }

      if (this.isGameOver || this.isCountingDown) return;

      const now = performance.now();

      // Player 1: WASD
      if (P1_KEY_MAP[e.code]) {
        if (!this.p1HeldKeys.includes(e.code)) {
          this.p1HeldKeys.push(e.code);
          const dir = P1_KEY_MAP[e.code];
          this.tryMovePlayer(1, dir.dx, dir.dy);
          this.nextMoveTime[1] = now + this.initialKeyDelay;
        }
      }

      // Player 2: Arrow Keys
      if (P2_KEY_MAP[e.code]) {
        e.preventDefault(); // Prevent scrolling
        if (!this.p2HeldKeys.includes(e.code)) {
          this.p2HeldKeys.push(e.code);
          const dir = P2_KEY_MAP[e.code];
          this.tryMovePlayer(2, dir.dx, dir.dy);
          this.nextMoveTime[2] = now + this.initialKeyDelay;
        }
      }
    });

    window.addEventListener('keyup', (e) => {
      // Player 1 release
      if (P1_KEY_MAP[e.code]) {
        this.p1HeldKeys = this.p1HeldKeys.filter(k => k !== e.code);
      }
      // Player 2 release
      if (P2_KEY_MAP[e.code]) {
        this.p2HeldKeys = this.p2HeldKeys.filter(k => k !== e.code);
      }
    });

    // Clear held keys if window loses focus
    window.addEventListener('blur', () => {
      this.p1HeldKeys = [];
      this.p2HeldKeys = [];
      this.p1DpadDir = null;
      this.p2DpadDir = null;
    });
    window.addEventListener('keydown', (e) => {
      if (e.code === 'ArrowUp' || e.code === 'ArrowDown' || e.code === 'ArrowLeft' || e.code === 'ArrowRight' || e.code.startsWith('Numpad')) {
        e.preventDefault();
      }
    }, { passive: false });

    // On-screen D-pads with pointer hold support
    document.querySelectorAll('.dpad-btn').forEach(btn => {
      const getDir = (dir) => {
        if (dir === 'up') return { dx: 0, dy: -1 };
        if (dir === 'down') return { dx: 0, dy: 1 };
        if (dir === 'left') return { dx: -1, dy: 0 };
        if (dir === 'right') return { dx: 1, dy: 0 };
        return null;
      };

      const startHold = (e) => {
        e.preventDefault();
        if (this.isGameOver || this.isCountingDown) return;
        const player = parseInt(btn.dataset.player, 10);
        const dir = getDir(btn.dataset.dir);
        if (!dir) return;

        const now = performance.now();
        if (player === 1) {
          this.p1DpadDir = dir;
          this.tryMovePlayer(1, dir.dx, dir.dy);
          this.nextMoveTime[1] = now + this.initialKeyDelay;
        } else {
          this.p2DpadDir = dir;
          this.tryMovePlayer(2, dir.dx, dir.dy);
          this.nextMoveTime[2] = now + this.initialKeyDelay;
        }
      };

      const stopHold = (e) => {
        e.preventDefault();
        const player = parseInt(btn.dataset.player, 10);
        if (player === 1) {
          this.p1DpadDir = null;
        } else {
          this.p2DpadDir = null;
        }
      };

      btn.addEventListener('pointerdown', startHold);
      btn.addEventListener('pointerup', stopHold);
      btn.addEventListener('pointerleave', stopHold);
      btn.addEventListener('pointercancel', stopHold);
    });

    // Reset buttons
    document.getElementById('resetGameBtn').addEventListener('click', () => this.initGame());
    document.getElementById('modalRestartBtn').addEventListener('click', () => this.initGame());

    // Grid size selector
    this.gridSizeSelect.addEventListener('change', () => this.initGame());

    // Speed selector
    if (this.speedSelect) {
      this.speedSelect.addEventListener('change', () => {
        this.moveInterval = parseInt(this.speedSelect.value, 10) || 90;
      });
    }

    // Sound toggle button
    this.soundToggleBtn.addEventListener('click', () => {
      const on = this.sound.toggle();
      this.soundIcon.textContent = on ? '🔊' : '🔇';
    });

    // Rules modal
    const rulesModal = document.getElementById('rulesModal');
    document.getElementById('howToPlayBtn').addEventListener('click', () => {
      rulesModal.classList.remove('hidden');
    });
    document.getElementById('closeRulesBtn').addEventListener('click', () => {
      rulesModal.classList.add('hidden');
    });
    rulesModal.addEventListener('click', (e) => {
      if (e.target === rulesModal) rulesModal.classList.add('hidden');
    });

    // Settings modal
    const settingsModal = document.getElementById('settingsModal');
    const settingsBtn = document.getElementById('settingsBtn');
    const closeSettingsBtn = document.getElementById('closeSettingsBtn');
    const touchSelect = document.getElementById('touchToggleSelect');

    if (settingsBtn && settingsModal) {
      settingsBtn.addEventListener('click', () => {
        settingsModal.classList.remove('hidden');
      });
      if (closeSettingsBtn) {
        closeSettingsBtn.addEventListener('click', () => {
          settingsModal.classList.add('hidden');
        });
      }
      settingsModal.addEventListener('click', (e) => {
        if (e.target === settingsModal) settingsModal.classList.add('hidden');
      });
    }

    if (touchSelect) {
      touchSelect.addEventListener('change', () => {
        const dpads = document.querySelectorAll('.floating-dpad');
        dpads.forEach(d => {
          d.classList.remove('hidden-touch', 'always-show');
          if (touchSelect.value === 'hide') d.classList.add('hidden-touch');
          if (touchSelect.value === 'show') d.classList.add('always-show');
        });
      });
    }

    // Auto resize when window size changes
    window.addEventListener('resize', () => {
      if (this.gridSizeSelect && this.gridSizeSelect.value === 'auto' && !this.isGameOver) {
        // Debounce resize
        clearTimeout(this._resizeTimer);
        this._resizeTimer = setTimeout(() => {
          this.initGame();
        }, 300);
      }
    });
  }

  /**
   * Attempt to move player by (dx, dy)
   * Enforces rules:
   * - Cannot exit boundaries
   * - Cannot step on rival player's painted line
   * - Cannot step on rival player's current position
   * - Moving onto unpainted cell: paints it & awards +10 points
   * - Moving onto own cell: allowed, no extra points
   */
  tryMovePlayer(playerId, dx, dy) {
    if (this.isGameOver || this.isCountingDown) return false;

    const current = playerId === 1 ? this.p1 : this.p2;
    const opponent = playerId === 1 ? this.p2 : this.p1;
    const opponentId = playerId === 1 ? 2 : 1;

    const targetX = current.x + dx;
    const targetY = current.y + dy;
    const now = performance.now();

    // Helper to throttle blocked sound so holding against a wall doesn't sound harsh
    const handleBlocked = () => {
      if (now - this.lastBlockedSoundTime[playerId] > 240) {
        this.sound.playBlocked();
        this.lastBlockedSoundTime[playerId] = now;
      }
      this.createBlockedSparks(current.x, current.y, dx, dy);
    };

    // 1. Boundary check
    if (targetX < 0 || targetX >= this.cols || targetY < 0 || targetY >= this.rows) {
      handleBlocked();
      return false;
    }

    // 2. Cannot step onto rival player's current head position
    if (targetX === opponent.x && targetY === opponent.y) {
      handleBlocked();
      return false;
    }

    // 3. RULE: "one user can't go over the painted line of second user."
    // EXCEPTION: Golden Apple grants a timed territory breach.
    const targetOwner = this.grid[targetY][targetX];
    const hasGoldenApple = now < current.effects.goldenAppleEndTime;

    if (targetOwner === opponentId) {
      if (!hasGoldenApple) {
        handleBlocked();
        return false;
      }
      // GOLDEN APPLE BREACH: Conquer and steal rival territory!
      this.grid[targetY][targetX] = playerId;
      this.paintTimes[targetY][targetX] = now;
      current.tiles += 1;
      current.score += 10;
      opponent.tiles = Math.max(0, opponent.tiles - 1);
      opponent.score = Math.max(0, opponent.score - 10);

      this.sound.playBreach();
      this.createGoldenBreachBurst(targetX, targetY);
    }

    // Move is valid!
    current.x = targetX;
    current.y = targetY;
    this.playerMotion[playerId] = { dx, dy, movedAt: now };
    this.createInkTrail(current.x, current.y, current.color, dx, dy);

    // Check if new unpainted tile
    if (targetOwner === 0) {
      this.grid[targetY][targetX] = playerId;
      this.paintTimes[targetY][targetX] = now;
      current.tiles += 1;
      current.score += 10; // +10 points per painted move

      this.sound.playPaint(playerId);
      this.createPaintBurst(targetX, targetY, current.color);
    } else if (targetOwner === playerId) {
      // Re-traversing own painted trail
      this.sound.playStep();
    }

    // Check item pickup at target location
    const itemIndex = this.items.findIndex(it => it.x === targetX && it.y === targetY);
    if (itemIndex !== -1) {
      const item = this.items[itemIndex];
      this.items.splice(itemIndex, 1);
      this.applyItemEffect(playerId, item.type, now);
    }

    this.updateStatsUI();
    this.checkGameStatus();
    return true;
  }

  /**
   * Apply consumable buff/debuff
   */
  applyItemEffect(playerId, itemType, now) {
    const current = playerId === 1 ? this.p1 : this.p2;
    const opponent = playerId === 1 ? this.p2 : this.p1;

    if (itemType.effectType === 'freeze') {
      opponent.effects.freezeEndTime = now + itemType.duration;
      this.sound.playDebuff();
      this.createItemCollectBurst(opponent.x, opponent.y, itemType.color, false);
    } else if (itemType.isGoldenApple) {
      current.effects.goldenAppleEndTime = now + itemType.duration;
      this.sound.playGoldenApple();
      this.createItemCollectBurst(current.x, current.y, '#facc15', true);
    } else if (itemType.effectType === 'speed' || itemType.effectType === 'slow') {
      current.effects.speedMultiplier = itemType.multiplier;
      current.effects.speedEndTime = now + itemType.duration;
      current.effects.speedName = itemType.name;
      current.effects.speedIcon = itemType.icon;
      current.effects.speedType = itemType.effectType;

      if (itemType.effectType === 'speed') {
        this.sound.playBuff();
        this.createItemCollectBurst(current.x, current.y, '#10b981', false);
      } else {
        this.sound.playDebuff();
        this.createItemCollectBurst(current.x, current.y, '#ef4444', false);
      }
    }

    this.updateEffectsUI(now);
  }

  /**
   * Spawn a random item in an available grid cell
   */
  spawnRandomItem(now) {
    const candidates = [];
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        // Not on player heads
        if (c === this.p1.x && r === this.p1.y) continue;
        if (c === this.p2.x && r === this.p2.y) continue;
        // Not already having an item
        if (this.items.some(it => it.x === c && it.y === r)) continue;

        candidates.push({ x: c, y: r });
      }
    }

    if (candidates.length === 0) return;

    // Pick random location
    const loc = candidates[Math.floor(Math.random() * candidates.length)];

    // Pick item type by weight
    const totalWeight = ITEM_TYPES.reduce((sum, it) => sum + it.weight, 0);
    let rand = Math.random() * totalWeight;
    let chosenType = ITEM_TYPES[0];
    for (const it of ITEM_TYPES) {
      if (rand < it.weight) {
        chosenType = it;
        break;
      }
      rand -= it.weight;
    }

    const areaFactor = Math.sqrt((this.cols * this.rows) / (25 * 25));
    const lifespan = Math.min(30000, Math.round(chosenType.lifespan * Math.max(1, areaFactor)));
    this.items.push({
      x: loc.x,
      y: loc.y,
      type: { ...chosenType, lifespan },
      spawnTime: now
    });
  }

  /**
   * Updates HUD active buff/debuff timers
   */
  updateEffectsUI(now) {
    const renderBadges = (player, container) => {
      if (!container) return;
      let html = '';

      // Golden apple active
      if (now < player.effects.goldenAppleEndTime) {
        const left = ((player.effects.goldenAppleEndTime - now) / 1000).toFixed(1);
        html += `<span class="effect-pill effect-apple" title="Territory Breach Active!">✦ Breach ${left}s</span>`;
      }

      // Speed / Slow active
      if (now < player.effects.speedEndTime) {
        const left = ((player.effects.speedEndTime - now) / 1000).toFixed(1);
        const cls = player.effects.speedType === 'speed' ? 'effect-speed' : 'effect-slow';
        html += `<span class="effect-pill ${cls}">${player.effects.speedIcon} ${left}s</span>`;
      }

      if (now < player.effects.freezeEndTime) {
        const left = ((player.effects.freezeEndTime - now) / 1000).toFixed(1);
        html += `<span class="effect-pill effect-slow">❄ Frozen ${left}s</span>`;
      }

      container.innerHTML = html;
    };

    renderBadges(this.p1, this.effectsP1El);
    renderBadges(this.p2, this.effectsP2El);
  }

  createGoldenBreachBurst(gridX, gridY) {
    const pixelX = gridX * this.boxSize + this.boxSize / 2;
    const pixelY = gridY * this.boxSize + this.boxSize / 2;
    for (let i = 0; i < 10; i++) {
      this.particles.push(new Particle(pixelX, pixelY, '#facc15', true));
    }
  }

  createItemCollectBurst(gridX, gridY, color, isGolden) {
    const pixelX = gridX * this.boxSize + this.boxSize / 2;
    const pixelY = gridY * this.boxSize + this.boxSize / 2;
    for (let i = 0; i < 8; i++) {
      this.particles.push(new Particle(pixelX, pixelY, color, isGolden));
    }
  }

  createPaintBurst(gridX, gridY, color) {
    const pixelX = gridX * this.boxSize + this.boxSize / 2;
    const pixelY = gridY * this.boxSize + this.boxSize / 2;
    for (let i = 0; i < 6; i++) {
      this.particles.push(new Particle(pixelX, pixelY, color));
    }
  }

  createInkTrail(gridX, gridY, color, dx, dy) {
    const x = gridX * this.boxSize + this.boxSize / 2 - dx * 7;
    const y = gridY * this.boxSize + this.boxSize / 2 - dy * 7;
    for (let i = 0; i < 2; i++) {
      const droplet = new Particle(x + (Math.random() - 0.5) * 8, y + (Math.random() - 0.5) * 8, color);
      droplet.radius = Math.random() * 3 + 2;
      droplet.vx = -dx * (Math.random() * 0.9 + 0.3) + (Math.random() - 0.5) * 0.8;
      droplet.vy = -dy * (Math.random() * 0.9 + 0.3) + (Math.random() - 0.5) * 0.8;
      droplet.decay = 0.045 + Math.random() * 0.025;
      this.particles.push(droplet);
    }
  }

  createBlockedSparks(gridX, gridY, dx, dy) {
    const pixelX = (gridX + dx * 0.5) * this.boxSize + this.boxSize / 2;
    const pixelY = (gridY + dy * 0.5) * this.boxSize + this.boxSize / 2;
    for (let i = 0; i < 4; i++) {
      this.particles.push(new Particle(pixelX, pixelY, '#ef4444'));
    }
  }

  updateStatsUI() {
    const totalCells = this.cols * this.rows;
    const totalPainted = this.p1.tiles + this.p2.tiles;

    const cov1 = ((this.p1.tiles / totalCells) * 100).toFixed(1);
    const cov2 = ((this.p2.tiles / totalCells) * 100).toFixed(1);

    this.scoreP1El.textContent = this.p1.score;
    this.tilesP1El.textContent = this.p1.tiles;
    this.coverageP1El.textContent = `${cov1}%`;

    this.scoreP2El.textContent = this.p2.score;
    this.tilesP2El.textContent = this.p2.tiles;
    this.coverageP2El.textContent = `${cov2}%`;

    // Progress bar ratios
    const p1Pct = (this.p1.tiles / totalCells) * 100;
    const p2Pct = (this.p2.tiles / totalCells) * 100;

    this.barP1.style.width = `${p1Pct}%`;
    this.barP2.style.width = `${p2Pct}%`;

    const totalPct = ((totalPainted / totalCells) * 100).toFixed(1);
    this.unclaimedText.textContent = `Painted: ${totalPainted} / ${totalCells} (${totalPct}%)`;
  }

  hasLegalMoves(playerId) {
    const player = playerId === 1 ? this.p1 : this.p2;
    const opponent = playerId === 1 ? this.p2 : this.p1;
    const opponentId = playerId === 1 ? 2 : 1;

    const directions = [
      { dx: 0, dy: -1 },
      { dx: 0, dy: 1 },
      { dx: -1, dy: 0 },
      { dx: 1, dy: 0 }
    ];

    for (const d of directions) {
      const nx = player.x + d.dx;
      const ny = player.y + d.dy;

      // Inside boundaries?
      if (nx >= 0 && nx < this.cols && ny >= 0 && ny < this.rows) {
        // Not on opponent head?
        if (nx !== opponent.x || ny !== opponent.y) {
          // Not on opponent paint?
          if (this.grid[ny][nx] !== opponentId) {
            return true;
          }
        }
      }
    }
    return false;
  }

  checkGameStatus() {
    const totalCells = this.cols * this.rows;
    const totalPainted = this.p1.tiles + this.p2.tiles;

    // 1. "Once all area is painted, game will be stopped"
    if (totalPainted >= totalCells) {
      this.endGame('Board Fully Painted!');
      return;
    }

    // 2. Check if both players are trapped or no legal moves
    const p1CanMove = this.hasLegalMoves(1);
    const p2CanMove = this.hasLegalMoves(2);

    if (!p1CanMove && !p2CanMove) {
      this.endGame('Both Players Blocked!');
      return;
    }
  }

  endGame(reason) {
    this.isGameOver = true;
    if (this.countdownTimerId) {
      clearTimeout(this.countdownTimerId);
      this.countdownTimerId = null;
    }
    this.isCountingDown = false;
    this.arenaOverlay.classList.add('hidden');

    this.p1HeldKeys = [];
    this.p2HeldKeys = [];
    this.p1DpadDir = null;
    this.p2DpadDir = null;

    this.sound.playVictory();
    this.gameStatusText.textContent = 'Game Over';

    const totalCells = this.cols * this.rows;
    const p1Cov = ((this.p1.tiles / totalCells) * 100).toFixed(1);
    const p2Cov = ((this.p2.tiles / totalCells) * 100).toFixed(1);

    this.finalScoreP1.textContent = `${this.p1.score} pts`;
    this.finalCoverageP1.textContent = `(${this.p1.tiles} tiles / ${p1Cov}%)`;

    this.finalScoreP2.textContent = `${this.p2.score} pts`;
    this.finalCoverageP2.textContent = `(${this.p2.tiles} tiles / ${p2Cov}%)`;

    if (this.p1.score > this.p2.score) {
      this.winnerTitle.textContent = 'PLAYER 1 WINS!';
      this.winnerTitle.style.color = 'var(--p1-light)';
      this.winnerSubtitle.textContent = `Player 1 dominated the board with ${this.p1.score} points! (${reason})`;
    } else if (this.p2.score > this.p1.score) {
      this.winnerTitle.textContent = 'PLAYER 2 WINS!';
      this.winnerTitle.style.color = 'var(--p2-light)';
      this.winnerSubtitle.textContent = `Player 2 dominated the board with ${this.p2.score} points! (${reason})`;
    } else {
      this.winnerTitle.textContent = "IT'S A DRAW!";
      this.winnerTitle.style.color = 'var(--accent-gold)';
      this.winnerSubtitle.textContent = `Both players tied with ${this.p1.score} points! (${reason})`;
    }

    // Celebratory confetti particles
    for (let i = 0; i < 60; i++) {
      const rx = Math.random() * this.canvas.width;
      const ry = Math.random() * this.canvas.height;
      const col = i % 2 === 0 ? this.COLORS.P1_HEAD : this.COLORS.P2_HEAD;
      this.particles.push(new Particle(rx, ry, col));
    }

    setTimeout(() => {
      this.gameOverModal.classList.remove('hidden');
    }, 400);
  }

  /**
   * Game tick: updates continuous movement while keys are held
   */
  update(timestamp) {
    if (this.isGameOver || this.isCountingDown) return;

    this.pollGamepads(timestamp);

    // 1. Spawning dynamic items
    if (timestamp >= this.nextItemSpawnTime && this.items.length < 4) {
      this.spawnRandomItem(timestamp);
      this.nextItemSpawnTime = timestamp + Math.random() * 4500 + 3500;
    }

    // 2. Remove expired items that were not collected in time
    this.items = this.items.filter(item => (timestamp - item.spawnTime) < item.type.lifespan);

    const now = timestamp;

    // 3. Player 1 continuous movement with active speed multiplier
    const p1SpeedActive = now < this.p1.effects.speedEndTime;
    const p1Interval = this.moveInterval * (p1SpeedActive ? this.p1.effects.speedMultiplier : 1.0);

    let p1Dir = this.p1DpadDir;
    if (!p1Dir && this.p1HeldKeys.length > 0) {
      const latestKey = this.p1HeldKeys[this.p1HeldKeys.length - 1];
      p1Dir = P1_KEY_MAP[latestKey];
    }
    if (p1Dir && now >= this.p1.effects.freezeEndTime && timestamp >= this.nextMoveTime[1]) {
      this.tryMovePlayer(1, p1Dir.dx, p1Dir.dy);
      this.nextMoveTime[1] = timestamp + p1Interval;
    }

    // 4. Player 2 continuous movement with active speed multiplier
    const p2SpeedActive = now < this.p2.effects.speedEndTime;
    const p2Interval = this.moveInterval * (p2SpeedActive ? this.p2.effects.speedMultiplier : 1.0);

    let p2Dir = this.p2DpadDir;
    if (!p2Dir && this.p2HeldKeys.length > 0) {
      const latestKey = this.p2HeldKeys[this.p2HeldKeys.length - 1];
      p2Dir = P2_KEY_MAP[latestKey];
    }
    if (p2Dir && now >= this.p2.effects.freezeEndTime && timestamp >= this.nextMoveTime[2]) {
      this.tryMovePlayer(2, p2Dir.dx, p2Dir.dy);
      this.nextMoveTime[2] = timestamp + p2Interval;
    }

    // 5. Update HUD timers
    this.updateEffectsUI(timestamp);
  }

  pollGamepads(now) {
    const pads = navigator.getGamepads ? navigator.getGamepads() : [];
    const directions = [
      [{ dx: 0, dy: -1 }, { dx: 0, dy: 1 }, { dx: -1, dy: 0 }, { dx: 1, dy: 0 }],
      [{ dx: 0, dy: -1 }, { dx: 0, dy: 1 }, { dx: -1, dy: 0 }, { dx: 1, dy: 0 }]
    ];
    const connectedPads = Array.from(pads || []).filter(Boolean);
    for (let p = 0; p < 2; p++) {
      const pad = connectedPads[p];
      if (!pad) {
        if (p === 0) {
          this.p1DpadDir = null;
          this.gamepadState[1] = null;
        }
        if (p === 1) {
          this.p2DpadDir = null;
          this.gamepadState[2] = null;
        }
        continue;
      }
      const playerId = p + 1;
      const axisX = pad.axes?.[0] || 0;
      const axisY = pad.axes?.[1] || 0;
      const buttonUp = pad.buttons?.[12]?.pressed || pad.buttons?.[3]?.pressed;
      const buttonDown = pad.buttons?.[13]?.pressed || pad.buttons?.[0]?.pressed;
      const buttonLeft = pad.buttons?.[14]?.pressed || pad.buttons?.[2]?.pressed;
      const buttonRight = pad.buttons?.[15]?.pressed || pad.buttons?.[1]?.pressed;
      let dir = null;
      if (buttonUp || axisY < -0.45) dir = directions[p][0];
      else if (buttonDown || axisY > 0.45) dir = directions[p][1];
      else if (buttonLeft || axisX < -0.45) dir = directions[p][2];
      else if (buttonRight || axisX > 0.45) dir = directions[p][3];
      const previous = this.gamepadState[playerId];
      if (dir) {
        if (!previous || dir.dx !== previous.dx || dir.dy !== previous.dy) {
          this.tryMovePlayer(playerId, dir.dx, dir.dy);
          this.nextMoveTime[playerId] = now + this.initialKeyDelay;
        }
        this.gamepadState[playerId] = dir;
        if (playerId === 1) this.p1DpadDir = dir;
        else this.p2DpadDir = dir;
      } else {
        this.gamepadState[playerId] = null;
        if (playerId === 1) this.p1DpadDir = null;
        else this.p2DpadDir = null;
      }

    }
    const primaryPad = connectedPads[0];
    if (!primaryPad) {
      this.gamepadActionState.restart = false;
      this.gamepadActionState.menu = false;
    }
    const restart = !!primaryPad?.buttons?.[8]?.pressed; // View / Back
    const menu = !!primaryPad?.buttons?.[9]?.pressed; // Menu / Start
    if (restart && !this.gamepadActionState.restart) this.initGame();
    if (menu && !this.gamepadActionState.menu) document.getElementById('settingsModal').classList.toggle('hidden');
    this.gamepadActionState.restart = restart;
    this.gamepadActionState.menu = menu;
  }

  getItemIcon(type) {
    if (this.itemIcons.has(type.id)) return this.itemIcons.get(type.id);
    const icon = document.createElement('canvas');
    icon.width = 64;
    icon.height = 64;
    const ctx = icon.getContext('2d');
    const color = type.color || '#f8fafc';
    ctx.save();
    ctx.translate(32, 32);
    ctx.fillStyle = 'rgba(8, 15, 35, 0.96)';
    ctx.strokeStyle = color;
    ctx.lineWidth = 4;
    ctx.beginPath();
    this.roundRectPath(ctx, -25, -25, 50, 50, 15);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    const line = (...pts) => {
      ctx.beginPath();
      ctx.moveTo(pts[0][0], pts[0][1]);
      for (const point of pts.slice(1)) ctx.lineTo(point[0], point[1]);
      ctx.stroke();
    };
    switch (type.id) {
      case 'fries':
        ctx.fillStyle = '#fbbf24';
        for (const x of [-12, 0, 12]) ctx.fillRect(x - 4, -17, 8, 23);
        ctx.fillStyle = color;
        ctx.beginPath(); this.roundRectPath(ctx, -17, 1, 34, 17, 5); ctx.fill();
        break;
      case 'burger':
        ctx.fillStyle = '#fbbf24'; ctx.beginPath(); this.roundRectPath(ctx, -18, -14, 36, 14, 9); ctx.fill();
        ctx.fillStyle = '#84cc16'; ctx.fillRect(-18, 1, 36, 5);
        ctx.fillStyle = '#b45309'; ctx.fillRect(-17, 7, 34, 5);
        ctx.fillStyle = '#fbbf24'; ctx.beginPath(); this.roundRectPath(ctx, -18, 13, 36, 6, 4); ctx.fill();
        break;
      case 'donut':
        ctx.fillStyle = color; ctx.beginPath(); ctx.arc(0, 0, 19, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#0b1224'; ctx.beginPath(); ctx.arc(0, 0, 8, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = '#f9a8d4'; ctx.lineWidth = 3; line([-10, -12], [0, -17], [10, -13]);
        break;
      case 'apple':
      case 'golden_apple':
        ctx.fillStyle = color; ctx.beginPath(); ctx.ellipse(-3, 2, 16, 18, -0.3, 0, Math.PI * 2); ctx.fill();
        line([0, -15], [3, -23]); ctx.fillStyle = '#4ade80'; ctx.beginPath(); ctx.ellipse(11, -17, 8, 4, -0.5, 0, Math.PI * 2); ctx.fill();
        break;
      case 'berries':
        for (const [x, y] of [[-9, -5], [7, -8], [-3, 9], [12, 7]]) { ctx.beginPath(); ctx.arc(x, y, 9, 0, Math.PI * 2); ctx.fill(); }
        ctx.fillStyle = '#a3e635'; ctx.beginPath(); ctx.ellipse(0, -16, 8, 4, -0.6, 0, Math.PI * 2); ctx.fill();
        break;
      case 'salad':
        ctx.fillStyle = '#84cc16'; ctx.beginPath(); ctx.ellipse(0, 8, 19, 10, 0, 0, Math.PI * 2); ctx.fill();
        line([-10, 6], [-4, -8], [3, 5], [10, -10]);
        break;
      case 'shoes':
        ctx.fillStyle = color; ctx.beginPath(); this.roundRectPath(ctx, -18, -7, 30, 18, 7); ctx.fill();
        line([-6, -7], [-2, 2], [4, -5]); ctx.fillStyle = '#f8fafc'; ctx.beginPath(); this.roundRectPath(ctx, -19, 11, 39, 6, 3); ctx.fill();
        break;
      case 'skateboard':
        ctx.fillStyle = color; ctx.beginPath(); this.roundRectPath(ctx, -22, -7, 44, 13, 7); ctx.fill();
        ctx.fillStyle = '#f8fafc'; ctx.beginPath(); ctx.arc(-13, 12, 4, 0, Math.PI * 2); ctx.arc(13, 12, 4, 0, Math.PI * 2); ctx.fill();
        break;
      case 'snow':
        for (let a = 0; a < 3; a++) {
          const angle = (Math.PI * a) / 3;
          line([Math.cos(angle) * -19, Math.sin(angle) * -19], [Math.cos(angle) * 19, Math.sin(angle) * 19]);
          for (const sign of [-1, 1]) {
            const x = Math.cos(angle) * 12 * sign, y = Math.sin(angle) * 12 * sign;
            line([x, y], [x - Math.cos(angle - 0.8) * 6 * sign, y - Math.sin(angle - 0.8) * 6 * sign]);
            line([x, y], [x - Math.cos(angle + 0.8) * 6 * sign, y - Math.sin(angle + 0.8) * 6 * sign]);
          }
        }
        break;
      default:
        ctx.beginPath(); ctx.arc(0, 0, 14, 0, Math.PI * 2); ctx.fill();
    }
    ctx.restore();
    this.itemIcons.set(type.id, icon);
    return icon;
  }

  roundRectPath(ctx, x, y, width, height, radius) {
    if (ctx.roundRect) {
      ctx.roundRect(x, y, width, height, radius);
      return;
    }
    const r = Math.min(radius, width / 2, height / 2);
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + width, y, x + width, y + height, r);
    ctx.arcTo(x + width, y + height, x, y + height, r);
    ctx.arcTo(x, y + height, x, y, r);
    ctx.arcTo(x, y, x + width, y, r);
    ctx.closePath();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    const now = performance.now();

    // 1. Draw Grid Tiles
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        const x = c * this.boxSize;
        const y = r * this.boxSize;
        const cell = this.grid[r][c];

        if (cell) {
          this.drawInkTile(x, y, cell, this.paintTimes[r][c], now, r, c);
        } else {
          // Empty tile
          this.ctx.fillStyle = this.COLORS.EMPTY;
          this.ctx.fillRect(x, y, this.boxSize, this.boxSize);

          this.ctx.strokeStyle = this.COLORS.EMPTY_BORDER;
          this.ctx.lineWidth = 1;
          this.ctx.strokeRect(x + 0.5, y + 0.5, this.boxSize - 1, this.boxSize - 1);
        }
      }
    }

    // 2. Draw Dropped Items
    for (const item of this.items) {
      const remaining = item.type.lifespan - (now - item.spawnTime);
      // Warn when this tile is about to expire.
      if (remaining < 1400 && Math.floor(remaining / 110) % 2 === 0) {
        continue;
      }

      const ix = item.x * this.boxSize;
      const iy = item.y * this.boxSize;
      const size = this.boxSize;
      const bob = Math.sin((now - item.spawnTime) / 180) * 2;

      this.ctx.save();

      this.ctx.shadowColor = item.type.color;
      this.ctx.shadowBlur = item.type.isGoldenApple ? 14 : 8;
      this.ctx.fillStyle = `${item.type.color}44`;
      this.ctx.beginPath();
      this.ctx.arc(ix + size / 2, iy + size / 2 + bob, size * 0.57, 0, Math.PI * 2);
      this.ctx.fill();

      if (item.type.isGoldenApple) {
        // Occasional golden sparkle
        if (Math.random() < 0.1) {
          this.particles.push(new Particle(ix + size / 2, iy + size / 2, '#facc15', true));
        }
      }
      const icon = this.getItemIcon(item.type);
      const iconSize = size * 1.8;
      this.ctx.drawImage(icon, ix + (size - iconSize) / 2, iy + (size - iconSize) / 2 + bob, iconSize, iconSize);

      this.ctx.restore();
    }

    // 3. Draw Particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.update();
      p.draw(this.ctx);
      if (p.life <= 0) {
        this.particles.splice(i, 1);
      }
    }

    // 4. Draw Player 1 Character Box (Light Blue)
    this.drawInkling(this.p1, 1, now);

    // 5. Draw Player 2 Character Box (Light Purple)
    this.drawInkling(this.p2, 2, now);
  }

  drawInkTile(x, y, owner, paintedAt, now, row, col) {
    const ctx = this.ctx;
    const color = owner === 1 ? this.COLORS.P1_TRAIL : this.COLORS.P2_TRAIL;
    const [r, g, b] = color.match(/[\da-f]{2}/gi).map(v => parseInt(v, 16));
    const wet = Math.max(0, 1 - (now - paintedAt) / 2800);
    const inset = 1.5;
    const w = this.boxSize - inset * 2;
    const h = this.boxSize - inset * 2;
    const seed = ((row * 37 + col * 19) % 5) * 0.5;
    const darken = 0.73 + wet * 0.27;
    ctx.save();
    if (wet > 0.05) {
      ctx.shadowColor = color;
      ctx.shadowBlur = 2 + wet * 8;
    }
    const gradient = ctx.createLinearGradient(x, y, x + w * 0.3, y + h);
    gradient.addColorStop(0, `rgb(${Math.min(255,r+Math.round(50*wet))},${Math.min(255,g+Math.round(50*wet))},${Math.min(255,b+Math.round(50*wet))})`);
    gradient.addColorStop(0.48, `rgb(${Math.round(r*darken)},${Math.round(g*darken)},${Math.round(b*darken)})`);
    gradient.addColorStop(1, `rgb(${Math.max(0,Math.round(r*(darken-0.08)))},${Math.max(0,Math.round(g*(darken-0.08)))},${Math.max(0,Math.round(b*(darken-0.08)))})`);
    ctx.fillStyle = gradient;
    const radius = 4 + seed;
    ctx.beginPath();
    this.roundRectPath(ctx, x + inset, y + inset, w, h, radius);
    // Rounded micro-splats soften the square grid into overlapping ink marks.
    ctx.fill();
    ctx.globalAlpha = wet * 0.82;
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.ellipse(x + this.boxSize * 0.43, y + 4.2, this.boxSize * 0.24, 1.15 + wet, -0.08, 0, Math.PI * 2);
    ctx.fill();
    if (wet > 0) {
      ctx.globalAlpha = wet * 0.32;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(x + 5, y + 7, 1.3, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  drawInkling(player, playerId, now) {
    const ctx = this.ctx;
    const size = this.boxSize;
    const cx = player.x * size + size / 2;
    const cy = player.y * size + size / 2;
    const motion = this.playerMotion[playerId] || { dx: 0, dy: 0, movedAt: now };
    const elapsed = now - motion.movedAt;
    const squish = elapsed < 180 ? Math.sin((elapsed / 180) * Math.PI) : 0;
    const stretch = 1 + squish * 0.28;
    const sx = motion.dx ? 0.86 / stretch : 1.05 * stretch;
    const sy = motion.dy ? 0.86 / stretch : 1.05 * stretch;
    const radius = size * 0.66;
    const isFrozen = now < player.effects.freezeEndTime;
    const inkColor = isFrozen ? '#72efff' : player.headColor;

    ctx.save();
    ctx.translate(cx, cy + Math.sin(now / 120 + playerId) * (isFrozen ? 0 : 1.2));
    ctx.scale(sx, sy);

    if (now < player.effects.goldenAppleEndTime || now < player.effects.speedEndTime) {
      const aura = now < player.effects.goldenAppleEndTime ? '#ffd84d' : player.color;
      ctx.strokeStyle = aura;
      ctx.lineWidth = 2.2;
      ctx.shadowColor = aura;
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.arc(0, 0, radius + 3, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Two tapered tentacles and rounded tips create an original squid-like silhouette.
    const facingX = motion.dx || (playerId === 1 ? -1 : 1);
    const facingY = motion.dy;
    const hairDirection = Math.atan2(facingY || -1, facingX);
    ctx.fillStyle = inkColor;
    ctx.strokeStyle = player.borderColor;
    ctx.lineWidth = 1.8;
    for (let i = -1; i <= 1; i++) {
      const angle = hairDirection + i * 0.48;
      const tipX = Math.cos(angle) * radius * 0.95;
      const tipY = Math.sin(angle) * radius * 0.95;
      ctx.beginPath();
      ctx.moveTo(-radius * 0.62, -radius * 0.15 + i * 1.7);
      ctx.quadraticCurveTo(tipX * 0.65, tipY * 0.65, tipX, tipY);
      ctx.quadraticCurveTo(tipX * 0.72 + 2, tipY * 0.72, radius * 0.5, radius * 0.35 + i * 1.5);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }

    const body = ctx.createRadialGradient(-radius * 0.34, -radius * 0.42, 1, 0, 0, radius * 1.18);
    body.addColorStop(0, '#ffffff');
    body.addColorStop(0.17, inkColor);
    body.addColorStop(1, player.borderColor);
    ctx.fillStyle = body;
    ctx.strokeStyle = '#f6ffff';
    ctx.lineWidth = 2.3;
    ctx.shadowColor = inkColor;
    ctx.shadowBlur = 11;
    ctx.beginPath();
    ctx.ellipse(0, 0, radius * 0.76, radius * 0.92, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Big glossy eyes with ink-dark pupils.
    for (const eyeX of [-radius * 0.27, radius * 0.27]) {
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.ellipse(eyeX, -radius * 0.05, radius * 0.19, radius * 0.26, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = player.eyeColor;
      ctx.beginPath();
      ctx.arc(eyeX + facingX * 1.3, -radius * 0.01, radius * 0.095, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(eyeX + facingX * 1.5 - 1, -radius * 0.09, 1.3, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.fillStyle = player.eyeColor;
    ctx.beginPath();
    ctx.ellipse(0, radius * 0.43, 2.2, 1.2, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  startRenderLoop() {
    const loop = (timestamp) => {
      this.update(timestamp);
      this.draw();
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }
}

// Bootstrap when DOM is loaded
window.addEventListener('DOMContentLoaded', () => {
  window.gameInstance = new TerritoryGame();
});
