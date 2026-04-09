// ═══════════════════════════════════════════════════
//  MAC ACADEMY — script.js  v4
// ═══════════════════════════════════════════════════

// ── PRO UNLOCK SECRET KEY ─────────────────────────
// Must match SECRET_KEY in ProContext.tsx and code-generator.html.
// Change this to invalidate all old codes. Keep it private.
const SECRET_KEY = 'X8K2';

// ── VIDEO PLACEHOLDER ─────────────────────────────
// Replace with your real YouTube URL — applies to all lessons
const VIDEO = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';

// ── CONTACT ───────────────────────────────────────
const WHATSAPP_URL = 'https://wa.me/256745414641';
const EMAIL        = 'alexkasaba2006@gmail.com';
const TIKTOK_URL   = 'https://www.tiktok.com/@mac_toonzug';

// ── ADMIN ──────────────────────────────────────────
const ADMIN_PASSWORD = 'macadmin123';
const KEY_ADMIN_HIST = 'mac_admin_code_hist';

// ── STORAGE KEYS ──────────────────────────────────
const KEY_SESSION   = 'mac_academy_session';
const KEY_ACCOUNTS  = 'mac_academy_accounts';
const KEY_PROGRESS  = 'mac_academy_progress_v4';
const KEY_PRO       = 'mac_academy_pro_v4';
const KEY_THEME     = 'mac_academy_theme';
const KEY_ONBOARDED = 'mac_academy_onboarded';
const KEY_NOTIFY    = 'mac_academy_notify_';

// ── COMING SOON ────────────────────────────────────
const COMING_SOON = [
  { id:'toonboom',    title:'ToonBoom Harmony',       color:'#6C5CE7', desc:'Professional studio-grade animation with ToonBoom Harmony — rigging, cut-out animation, and more.' },
  { id:'blender',     title:'Blender Animation',       color:'#E67E22', desc:'3D animation fundamentals using Blender — modelling, rigging, and rendering your first 3D scenes.' },
  { id:'photoshop',   title:'Photoshop for Animators', color:'#31A8FF', desc:'Frame-by-frame animation and digital painting in Photoshop — from sketch to finished frames.' },
  { id:'illustrator', title:'Adobe Illustrator',       color:'#FF9A00', desc:'Design vector characters and assets in Illustrator to use across your animation projects.' },
  { id:'aftereffects',title:'After Effects',           color:'#9999FF', desc:'Bring your animations to life with motion graphics, visual effects, and compositing in After Effects.' },
];

// ── ONBOARDING ─────────────────────────────────────
const ONBOARD_SLIDES = [
  { color:'#FF6B1A', title:'Welcome to Mac Academy', body:'Learn FlipaClip animation from scratch — beginner basics to advanced lip sync techniques, all in one place.',
    icon:`<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#FF6B1A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>` },
  { color:'#22c55e', title:'Track Your Progress', body:"Tap 'Mark as Complete' after each lesson. Your progress is saved and you can undo it anytime.",
    icon:`<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>` },
  { color:'#6C5CE7', title:'Unlock Pro Lessons', body:'Pro lessons cost 25,000 UGX. Pay via Mobile Money → send screenshot → get your unlock code. Simple!',
    icon:`<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#6C5CE7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></svg>` },
];

// ═══════════════════════════════════════════════════
//  COURSE DATA
// ═══════════════════════════════════════════════════
const COURSES = [
  {
    id: 'basics', title: 'Basics of FlipaClip', level: 'Beginner',
    description: 'Master the essential tools and techniques to start creating your first animations in FlipaClip from scratch.',
    totalLessons: 3, estimatedHours: '30 min', color: '#22c55e',
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
    lessons: [
      { id:'basics-1', order:1, isPro:false, title:'Getting Started with FlipaClip', duration:'10:00',
        videos:[
          { title:'Part 1 – Interface Overview', url:'https://www.youtube.com/watch?v=j8yrA_VqIx4' },
          { title:'Part 2 – Brushes & Tools', url:VIDEO },
          { title:'Part 3 – Timeline & Layers', url:VIDEO },
        ],
        description:"A complete walkthrough of FlipaClip's interface — brushes, the timeline, layers, and playback controls. By the end you'll know exactly where everything lives and be ready to start animating." },
      { id:'basics-2', order:2, isPro:false, title:'Bouncing Ball Animation', duration:'15:00',
        videos:[
          { title:'Part 1 – Timing & Spacing', url:VIDEO },
          { title:'Part 2 – Squash & Stretch', url:VIDEO },
        ],
        description:'Animate a bouncing ball to understand timing, spacing, squash, and stretch — the core principles every animator must master. The best hands-on exercise to build your animation instincts.' },
      { id:'basics-3', order:3, isPro:true,  title:'Exporting Your Animation', duration:'5:00',
        videos:[
          { title:'Part 1 – Export Settings', url:VIDEO },
          { title:'Part 2 – Best Quality for Social Media', url:VIDEO },
        ],
        description:'Export your finished animation as a video or GIF. Learn the best settings for TikTok, Instagram, and YouTube so your work looks great wherever you share it.' },
    ],
  },
  {
    id: 'character', title: 'Character Animation', level: 'Intermediate',
    description: "Bring characters to life with walk cycles, run cycles, and expressive movement using FlipaClip's animation tools.",
    totalLessons: 3, estimatedHours: '40 min', color: '#3B82F6',
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
    lessons: [
      { id:'character-1', order:1, isPro:false, title:'Drawing the Background', duration:'10:00',
        videos:[
          { title:'Part 1 – Perspective Basics', url:VIDEO },
          { title:'Part 2 – Layering & Depth', url:VIDEO },
        ],
        description:'Design and draw a complete scene background — perspective basics, layering elements, and creating depth that makes your character pop against the environment.' },
      { id:'character-2', order:2, isPro:true,  title:'Animating the Character', duration:'20:00',
        videos:[
          { title:'Part 1 – Walk Cycle', url:VIDEO },
          { title:'Part 2 – Weight & Expression', url:VIDEO },
          { title:'Part 3 – Fluid Movement', url:VIDEO },
        ],
        description:'Animate your character moving through the scene. Cover walk cycles, weight shifts, and expressive actions — bringing your character to life with fluid, believable movement.' },
      { id:'character-3', order:3, isPro:true,  title:'Finalizing Your Scene', duration:'10:00',
        videos:[
          { title:'Part 1 – Timing Cleanup', url:VIDEO },
          { title:'Part 2 – Export & Share', url:VIDEO },
        ],
        description:'Polish and finalize your animated scene — adjust timing, clean up rough lines, add finishing touches, and export a complete short animation ready to share.' },
    ],
  },
  {
    id: 'lipsync', title: 'Lip Sync', level: 'Advanced',
    description: "Match your character's mouth movements perfectly to audio dialogue using FlipaClip's frame-by-frame lip sync techniques.",
    totalLessons: 3, estimatedHours: '30 min', color: '#FF6B1A',
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>`,
    lessons: [
      { id:'lipsync-1', order:1, isPro:false, title:'Understanding Mouth Shapes', duration:'10:00',
        videos:[
          { title:'Part 1 – The 8 Mouth Shapes', url:VIDEO },
          { title:'Part 2 – Mapping Sounds', url:VIDEO },
        ],
        description:'Learn the standard Preston Blair mouth chart — the 8 essential shapes (A/I, E, O, U, F/V, L/TH, M/B/P, rest) and how they map to sounds in spoken dialogue.' },
      { id:'lipsync-2', order:2, isPro:true,  title:'Breaking Down Audio', duration:'10:00',
        videos:[
          { title:'Part 1 – Import Audio', url:VIDEO },
          { title:'Part 2 – Reading the Waveform', url:VIDEO },
          { title:'Part 3 – Frame by Frame Mapping', url:VIDEO },
        ],
        description:'Import audio into FlipaClip, read the waveform, break a line of dialogue into individual sounds, and map each sound to the correct mouth shape frame by frame.' },
      { id:'lipsync-3', order:3, isPro:true,  title:'Full Lip Sync Scene', duration:'10:00',
        videos:[
          { title:'Part 1 – Full Scene Setup', url:VIDEO },
          { title:'Part 2 – Eye Blinks & Head Movement', url:VIDEO },
          { title:'Part 3 – Final Polish', url:VIDEO },
        ],
        description:'Animate a complete talking character scene with synced mouth shapes, eye blinks, and subtle head movement — a polished, convincing performance from start to finish.' },
    ],
  },
];

// ═══════════════════════════════════════════════════
//  ACCOUNTS & SESSION
// ═══════════════════════════════════════════════════
function getAccounts() { try { return JSON.parse(localStorage.getItem(KEY_ACCOUNTS) || '[]'); } catch { return []; } }
function saveAccounts(arr) { localStorage.setItem(KEY_ACCOUNTS, JSON.stringify(arr)); }

function getSession()    { try { return JSON.parse(localStorage.getItem(KEY_SESSION) || 'null'); } catch { return null; } }
function saveSession(s)  { localStorage.setItem(KEY_SESSION, JSON.stringify(s)); }
function clearSession()  { localStorage.removeItem(KEY_SESSION); }

function signup(username, email, password) {
  const accounts = getAccounts();
  if (accounts.find(a => a.email.toLowerCase() === email.toLowerCase())) return { ok:false, msg:'An account with this email already exists.' };
  if (username.trim().length < 2) return { ok:false, msg:'Username must be at least 2 characters.' };
  if (password.length < 6) return { ok:false, msg:'Password must be at least 6 characters.' };
  const account = { username: username.trim(), email: email.trim().toLowerCase(), password };
  accounts.push(account);
  saveAccounts(accounts);
  saveSession({ username: account.username, email: account.email });
  return { ok:true };
}

function login(email, password) {
  const accounts = getAccounts();
  const account = accounts.find(a => a.email.toLowerCase() === email.trim().toLowerCase() && a.password === password);
  if (!account) return { ok:false, msg:'Incorrect email or password.' };
  saveSession({ username: account.username, email: account.email });
  return { ok:true };
}

// ═══════════════════════════════════════════════════
//  PROGRESS
// ═══════════════════════════════════════════════════
function getProgress()   { try { return JSON.parse(localStorage.getItem(KEY_PROGRESS) || '{}'); } catch { return {}; } }
function saveProgress(p) { localStorage.setItem(KEY_PROGRESS, JSON.stringify(p)); }
function isComplete(id)  { return !!getProgress()[id]; }

function toggleComplete(id) {
  const p = getProgress();
  p[id] = !p[id];
  saveProgress(p);
}

function getCourseProgress(course) {
  const p = getProgress();
  const done = course.lessons.filter(l => p[l.id]).length;
  return course.totalLessons > 0 ? Math.round((done / course.totalLessons) * 100) : 0;
}

function getTotalProgress() {
  const total = COURSES.reduce((s, c) => s + c.totalLessons, 0);
  const done  = Object.values(getProgress()).filter(Boolean).length;
  return { total, done, pct: total > 0 ? Math.round((done / total) * 100) : 0 };
}

// ═══════════════════════════════════════════════════
//  PRO UNLOCK
// ═══════════════════════════════════════════════════
function isProUnlocked() { return localStorage.getItem(KEY_PRO) === 'true'; }
function unlockPro()     { localStorage.setItem(KEY_PRO, 'true'); }
function revokePro()     { localStorage.removeItem(KEY_PRO); }

function isValidCode(raw) {
  const code = raw.trim().toUpperCase();
  // Format: MAC-{4 chars}-{SECRET_KEY}  e.g. MAC-AB3X-X8K2
  const expected = ('MAC-XXXX-' + SECRET_KEY).length;
  if (code.length !== expected) return false;
  if (!code.startsWith('MAC-')) return false;
  if (code[8] !== '-') return false;
  return code.slice(9) === SECRET_KEY.toUpperCase();
}

function tryUnlockCode(code) {
  if (isValidCode(code)) {
    unlockPro();
    return { ok: true };
  }
  return { ok: false, msg: 'Invalid code. Please check and try again.' };
}

// ═══════════════════════════════════════════════════
//  THEME
// ═══════════════════════════════════════════════════
function isDark()       { return localStorage.getItem(KEY_THEME) !== 'light'; }
function applyTheme()   {
  document.body.classList.toggle('light', !isDark());
  const icon = document.getElementById('theme-icon');
  if (icon) icon.innerHTML = isDark() ? IC.sun : IC.moon;
}
function toggleTheme()  {
  localStorage.setItem(KEY_THEME, isDark() ? 'light' : 'dark');
  applyTheme();
}

// ═══════════════════════════════════════════════════
//  NAVIGATION
// ═══════════════════════════════════════════════════
let currentTab    = 'courses';
let screenStack   = [];
let currentCourse = null;

function showMainApp() {
  document.getElementById('auth-wrapper').style.display  = 'none';
  document.getElementById('main-app').style.display      = 'flex';
}

function showAuthScreen(which) {
  document.getElementById('main-app').style.display      = 'none';
  document.getElementById('auth-wrapper').style.display  = 'flex';
  document.getElementById('auth-login').classList.toggle('active', which === 'login');
  document.getElementById('auth-signup').classList.toggle('active', which === 'signup');
  clearAuthErrors();
}

function showTab(tab) {
  currentTab = tab;
  screenStack = [];
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById('screen-' + tab).classList.add('active');
  document.getElementById('bottom-nav').style.display = 'flex';
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
  document.getElementById('nav-' + tab).classList.add('active');
  if (tab === 'progress') renderProgress();
  if (tab === 'support')  renderSupport();
  if (tab === 'account')  renderAccount();
  if (tab === 'courses')  { renderCoursesList(); renderComingSoon(); updateHomeProgress(); }
}

function pushScreen(id) {
  screenStack.push(document.querySelector('#main-app .screen.active').id);
  document.querySelectorAll('#main-app .screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  document.getElementById('bottom-nav').style.display = 'none';
}

function goBack() {
  if (!screenStack.length) return;
  const prev = screenStack.pop();
  document.querySelectorAll('#main-app .screen').forEach(s => s.classList.remove('active'));
  document.getElementById(prev).classList.add('active');
  if (!screenStack.length) {
    document.getElementById('bottom-nav').style.display = 'flex';
    updateHomeProgress();
    if (currentTab === 'progress') renderProgress();
    if (currentTab === 'account')  renderAccount();
    if (currentCourse) renderCourseDetail(currentCourse);
  }
}

// ── AUTH HANDLERS ─────────────────────────────────
function clearAuthErrors() {
  document.querySelectorAll('.auth-err').forEach(e => { e.classList.remove('show'); e.textContent = ''; });
  document.querySelectorAll('.auth-input').forEach(i => i.value = '');
}

function showAuthError(id, msg) {
  const el = document.getElementById(id);
  if (el) { el.textContent = msg; el.classList.add('show'); }
}

function doLogin() {
  const email    = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  if (!email || !password) { showAuthError('login-err', 'Please fill in all fields.'); return; }
  const result = login(email, password);
  if (!result.ok) { showAuthError('login-err', result.msg); return; }
  bootApp();
}

function doSignup() {
  const username = document.getElementById('signup-username').value;
  const email    = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;
  const confirm  = document.getElementById('signup-confirm').value;
  if (!username || !email || !password || !confirm) { showAuthError('signup-err', 'Please fill in all fields.'); return; }
  if (password !== confirm) { showAuthError('signup-err', 'Passwords do not match.'); return; }
  const result = signup(username, email, password);
  if (!result.ok) { showAuthError('signup-err', result.msg); return; }
  bootApp(true);
}

function doLogout() {
  clearSession();
  revokePro();
  showAuthScreen('login');
}

// ── PRO MODAL ─────────────────────────────────────
function openProModal() {
  document.getElementById('code-input').value = '';
  document.getElementById('code-msg').className = 'code-msg';
  document.getElementById('code-msg').textContent = '';
  document.getElementById('modal-overlay').classList.add('open');
}

function closeProModal() {
  document.getElementById('modal-overlay').classList.remove('open');
}

function handleOverlayClick(e) {
  if (e.target === document.getElementById('modal-overlay')) closeProModal();
}

function submitCode() {
  const code = document.getElementById('code-input').value;
  if (!code.trim()) {
    showCodeMsg('Please enter your unlock code.', false);
    return;
  }
  const result = tryUnlockCode(code);
  if (result.ok) {
    showCodeMsg('🎉 Pro unlocked! All lessons are now available.', true);
    setTimeout(() => {
      closeProModal();
      updateHomeProgress();
      if (currentCourse) renderCourseDetail(currentCourse);
      renderAccount();
    }, 1800);
  } else {
    showCodeMsg(result.msg, false);
  }
}

function showCodeMsg(msg, ok) {
  const el = document.getElementById('code-msg');
  el.textContent = msg;
  el.className = 'code-msg ' + (ok ? 'ok' : 'err');
}

// ═══════════════════════════════════════════════════
//  SVG ICONS
// ═══════════════════════════════════════════════════
const IC = {
  check:  `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
  check2: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
  circle: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/></svg>`,
  lock:   `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
  unlock: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></svg>`,
  play:   `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="margin-left:3px"><polygon points="5 3 19 12 5 21 5 3"/></svg>`,
  clock:  `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  plays:  `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>`,
  hash:   `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/><line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/></svg>`,
  chev:   `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`,
  chevD:  `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>`,
  chevU:  `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>`,
  award:  `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>`,
  arrow:  `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`,
  wa:     `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>`,
  mail:   `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
  vid:    `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>`,
  head:   `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z"/><path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>`,
  user:   `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  logout: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>`,
  phone2: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>`,
  key:    `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="7.5" cy="15.5" r="5.5"/><path d="M21 2 10.94 12.06"/><path d="M14.5 2.5 17 5"/><path d="M10 7l2.5 2.5"/></svg>`,
  info:   `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
  sun:    `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`,
  moon:   `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`,
};

// ═══════════════════════════════════════════════════
//  COURSES SCREEN
// ═══════════════════════════════════════════════════
function updateHomeProgress() {
  const { total, done, pct } = getTotalProgress();
  const pctEl = document.getElementById('home-prog-pct');
  const subEl = document.getElementById('home-prog-sub');
  const barEl = document.getElementById('home-bar-fill');
  if (pctEl) pctEl.textContent = pct + '%';
  if (subEl) subEl.textContent = done + ' of ' + total + ' lessons completed';
  if (barEl) barEl.style.width = pct + '%';
  COURSES.forEach(c => {
    const p  = getCourseProgress(c);
    const el = document.getElementById('card-prog-' + c.id);
    if (!el) return;
    el.querySelector('.mini-bar-fill').style.width  = p + '%';
    el.querySelector('.mini-prog-pct').textContent  = p + '%';
    el.style.display = p > 0 ? 'block' : 'none';
  });
  const proBtn = document.getElementById('home-pro-btn');
  if (proBtn) proBtn.style.display = isProUnlocked() ? 'none' : 'flex';
}

let currentSearch = '';

function handleSearch(val) {
  currentSearch = val.trim().toLowerCase();
  const clearBtn = document.getElementById('search-clear');
  if (clearBtn) clearBtn.style.display = currentSearch ? 'inline' : 'none';
  const progCard = document.getElementById('home-progress-card');
  if (progCard) progCard.style.display = currentSearch ? 'none' : 'block';
  const titleEl = document.getElementById('courses-section-title');
  if (titleEl) titleEl.textContent = currentSearch ? 'Results' : 'FlipaClip Courses';
  renderCoursesList();
  renderComingSoon();
}

function clearSearch() {
  const inp = document.getElementById('search-input');
  if (inp) inp.value = '';
  handleSearch('');
}

function renderCoursesList() {
  const list = document.getElementById('courses-list');
  if (!list) return;
  const filtered = currentSearch
    ? COURSES.filter(c =>
        c.title.toLowerCase().includes(currentSearch) ||
        c.description.toLowerCase().includes(currentSearch) ||
        c.lessons.some(l => l.title.toLowerCase().includes(currentSearch))
      )
    : COURSES;

  if (filtered.length === 0 && currentSearch) {
    list.innerHTML = `<div style="color:var(--muted);font-size:14px;text-align:center;padding:12px 0">No courses match "${currentSearch}"</div>`;
    return;
  }

  list.innerHTML = filtered.map(c => {
    const freeCount = c.lessons.filter(l => !l.isPro).length;
    const p = getCourseProgress(c);
    return `
    <div class="course-card" onclick="openCourse('${c.id}')">
      <div class="accent-bar" style="background:${c.color}"></div>
      <div class="course-body">
        <div class="course-top">
          <div class="course-icon-wrap" style="background:${c.color}22">${c.icon}</div>
          <div class="level-badge" style="background:${c.color}20;color:${c.color}">${c.level}</div>
          <div class="free-chip">${freeCount} free</div>
        </div>
        <div class="course-title-text">${c.title}</div>
        <div class="course-desc">${c.description}</div>
        <div class="meta-row">
          <div class="meta-item">${IC.plays} ${c.totalLessons} lessons</div>
          <div class="meta-item">${IC.clock} ${c.estimatedHours}</div>
          <div class="chevron-right">${IC.chev}</div>
        </div>
        <div id="card-prog-${c.id}" style="display:${p > 0 ? 'block' : 'none'}">
          <div class="mini-prog-header">
            <span style="color:var(--muted);font-size:11px">Progress</span>
            <span class="mini-prog-pct" style="color:${c.color};font-size:11px;font-weight:600">${p}%</span>
          </div>
          <div class="mini-bar-track"><div class="mini-bar-fill" style="width:${p}%;background:${c.color}"></div></div>
        </div>
      </div>
    </div>`;
  }).join('');
}

function renderComingSoon() {
  const el = document.getElementById('coming-soon-section');
  if (!el) return;
  const filtered = currentSearch
    ? COMING_SOON.filter(c => c.title.toLowerCase().includes(currentSearch) || c.desc.toLowerCase().includes(currentSearch))
    : COMING_SOON;
  if (filtered.length === 0 && currentSearch) { el.innerHTML = ''; return; }
  el.innerHTML = `
    <div class="coming-soon-section">
      <div class="coming-soon-header">
        <div class="section-title" style="margin-bottom:0">Coming Soon</div>
        <div class="coming-soon-pill">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          In development
        </div>
      </div>
      ${filtered.map(c => {
        const notified = localStorage.getItem(KEY_NOTIFY + c.id) === 'true';
        return `
        <div class="cs-card">
          <div class="accent-bar" style="background:${c.color}"></div>
          <div class="cs-body">
            <div class="cs-top">
              <div class="cs-icon" style="background:${c.color}22">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="${c.color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="4" height="18" rx="1"/><rect x="9" y="3" width="4" height="18" rx="1"/><rect x="16" y="3" width="6" height="18" rx="1"/></svg>
              </div>
              <div class="cs-badge">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                COMING SOON
              </div>
            </div>
            <div class="cs-title">${c.title}</div>
            <div class="cs-desc">${c.desc}</div>
            <div class="cs-bottom">
              <div class="cs-locked">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                Not available yet
              </div>
              <button class="cs-notify-btn" id="notify-${c.id}"
                onclick="toggleNotify('${c.id}')"
                style="${notified ? `background:${c.color}18;border-color:${c.color}50;color:${c.color}` : ''}">
                ${notified
                  ? `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg> Notified`
                  : `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/><line x1="1" y1="1" x2="23" y2="23"/></svg> Notify Me`}
              </button>
            </div>
          </div>
        </div>`;
      }).join('')}
    </div>`;
}

function toggleNotify(id) {
  const cur = localStorage.getItem(KEY_NOTIFY + id) === 'true';
  localStorage.setItem(KEY_NOTIFY + id, cur ? 'false' : 'true');
  renderComingSoon();
}

function openCourse(courseId) {
  currentCourse = COURSES.find(c => c.id === courseId);
  renderCourseDetail(currentCourse);
  pushScreen('screen-detail');
}

// ═══════════════════════════════════════════════════
//  COURSE DETAIL
// ═══════════════════════════════════════════════════
function renderCourseDetail(c) {
  const prog      = getCourseProgress(c);
  const done      = c.lessons.filter(l => isComplete(l.id)).length;
  const proCount  = c.lessons.filter(l => l.isPro).length;
  const freeCount = c.lessons.filter(l => !l.isPro).length;
  const pro       = isProUnlocked();
  document.getElementById('detail-screen-title').textContent = '';
  document.getElementById('detail-body').innerHTML = `
    <div class="detail-hero" style="background:${c.color}15;border-color:${c.color}30">
      <div class="hero-icon" style="background:${c.color}">${c.icon.replace('width="18" height="18"','width="26" height="26"').replace('stroke="currentColor"','stroke="#fff"')}</div>
      <div class="level-badge" style="background:${c.color}25;color:${c.color};align-self:flex-start">${c.level}</div>
      <div style="font-size:21px;font-weight:700;color:var(--fg)">${c.title}</div>
      <div style="font-size:14px;color:var(--muted);line-height:1.6">${c.description}</div>
      <div class="hero-meta">
        <div class="meta-item">${IC.plays} ${c.totalLessons} lessons</div>
        <div class="meta-item">${IC.clock} ${c.estimatedHours}</div>
        <div class="meta-item" style="color:var(--green)">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></svg>
          ${freeCount} free
        </div>
      </div>
    </div>
    ${prog > 0 ? `
    <div class="card" style="margin-bottom:14px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
        <span style="font-size:14px;font-weight:600;color:var(--fg)">Your Progress</span>
        <span style="font-size:18px;font-weight:700;color:${c.color}">${prog}%</span>
      </div>
      <div class="bar-track"><div class="bar-fill" style="width:${prog}%;background:${c.color}"></div></div>
      <div style="font-size:12px;color:var(--muted);margin-top:6px">${done} of ${c.totalLessons} lessons completed</div>
    </div>` : ''}
    ${proCount > 0 && !pro ? `
    <button class="pro-btn" style="margin-bottom:20px" onclick="openProModal()">
      <div class="pro-btn-inner">${IC.unlock}<span class="pro-btn-text">Unlock ${proCount} Pro Lesson${proCount > 1 ? 's' : ''}</span></div>
      <span class="pro-badge">PRO</span>
    </button>` : ''}
    ${pro ? `<div style="background:rgba(34,197,94,.12);border:1px solid rgba(34,197,94,.3);border-radius:12px;padding:12px 16px;display:flex;align-items:center;gap:10px;margin-bottom:16px;font-size:13px;font-weight:600;color:var(--green)">${IC.check} Pro Unlocked — All lessons available</div>` : ''}
    <div class="section-title">Lessons</div>
    ${c.lessons.map(l => renderLessonItem(l, c)).join('')}
  `;
}

function renderLessonItem(l, c) {
  const done   = isComplete(l.id);
  const locked = l.isPro && !isProUnlocked();
  let numWrap;
  if (done)        numWrap = `<div class="lesson-num" style="background:rgba(34,197,94,.18);color:var(--green)">${IC.check}</div>`;
  else if (locked) numWrap = `<div class="lesson-num" style="background:var(--card2);color:var(--muted)">${IC.lock}</div>`;
  else             numWrap = `<div class="lesson-num" style="background:${c.color}18;color:${c.color}">${l.order}</div>`;
  const border = done ? 'rgba(34,197,94,.4)' : 'var(--border)';
  const cls    = locked ? 'lesson-item locked' : done ? 'lesson-item completed' : 'lesson-item';
  const click  = locked ? '' : `onclick="openLesson('${l.id}','${c.id}')"`;
  return `
  <div class="${cls}" style="border-color:${border}" ${click}>
    ${numWrap}
    <div class="lesson-body">
      <div class="lesson-title-row">
        <div class="lesson-name">${l.title}</div>
        ${l.isPro && !isProUnlocked() ? `<div class="pro-tag" style="background:${c.color}20;color:${c.color}">PRO</div>` : ''}
      </div>
      <div class="lesson-desc-preview">${l.description}</div>
    </div>
    <div class="lesson-right">
      <span>${l.duration}</span>
      ${!locked ? IC.chev : ''}
    </div>
  </div>`;
}

// ═══════════════════════════════════════════════════
//  LESSON PLAYER
// ═══════════════════════════════════════════════════
function openLesson(lessonId, courseId) {
  const course = COURSES.find(c => c.id === courseId);
  const lesson = course.lessons.find(l => l.id === lessonId);
  if (lesson.isPro && !isProUnlocked()) { renderProLock(lesson, course); pushScreen('screen-lesson'); return; }
  renderLessonPlayer(lesson, course);
  pushScreen('screen-lesson');
}

function renderLessonPlayer(lesson, course) {
  const done = isComplete(lesson.id);
  const next = course.lessons.find(l => l.order === lesson.order + 1);
  const nextFree = next && (!next.isPro || isProUnlocked());
  document.getElementById('lesson-back-header').style.display = 'flex';
  document.getElementById('lesson-body').innerHTML = `
    <div class="course-tag" style="background:${course.color}20;color:${course.color}">${course.icon.replace('width="18" height="18"','width="12" height="12"')} ${course.title}</div>
    <div class="lesson-title-big">${lesson.title}</div>
    <div class="lesson-meta-row">
      <div class="meta-item">${IC.clock} ${lesson.duration}</div>
      <div class="meta-item">${IC.hash} Lesson ${lesson.order} of ${course.totalLessons}</div>
      ${done ? `<div class="done-badge">${IC.check} Complete</div>` : ''}
    </div>
    <div class="videos-section">
      <div class="videos-label">Videos in this lesson</div>
      ${(lesson.videos || [{ title:'Watch Lesson', url: lesson.videoUrl }]).map((v, i) => `
      <div class="video-item" onclick="window.open('${v.url}','_blank')" style="border-color:${course.color}40">
        <div class="video-item-num" style="background:${course.color}">${i + 1}</div>
        <div class="video-item-info">
          <div class="video-item-title">${v.title}</div>
          <div class="video-item-sub">Tap to open in YouTube</div>
        </div>
        <div class="video-item-play" style="color:${course.color}">${IC.play}</div>
      </div>`).join('')}
    </div>
    <div class="card desc-card">
      <div class="desc-label">Lesson Description</div>
      <div class="desc-text">${lesson.description}</div>
    </div>
    <button id="toggle-btn"
      class="complete-btn ${done ? 'done' : ''}"
      style="background:${done ? 'var(--green)' : course.color}"
      onclick="doToggle('${lesson.id}','${course.id}')">
      ${done ? IC.check2 : IC.circle}
      <span>${done ? 'Completed — Tap to Undo' : 'Mark as Complete'}</span>
    </button>
    ${nextFree ? `
    <div class="next-btn" onclick="openLesson('${next.id}','${course.id}')">
      <div>
        <div class="next-label">Up next</div>
        <div class="next-title">${next.title}</div>
      </div>
      <div class="next-arrow" style="color:${course.color}">${IC.arrow}</div>
    </div>` : ''}
  `;
}

function renderProLock(lesson, course) {
  document.getElementById('lesson-back-header').style.display = 'none';
  document.getElementById('lesson-body').innerHTML = `
    <div style="padding-top:52px;padding-left:18px;padding-right:18px">
      <button class="back-btn" onclick="goBack()">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
    </div>
    <div class="pro-lock">
      <div class="lock-icon-wrap">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
      </div>
      <div class="lock-title">Pro Lesson</div>
      <div class="lock-desc">"${lesson.title}" is a Pro lesson. Unlock all Pro content by entering your code below.</div>
      <button class="lock-btn" onclick="openProModal()">${IC.unlock} Enter Unlock Code</button>
      <div class="back-link" onclick="goBack()">← Back to course</div>
    </div>
  `;
}

function doToggle(lessonId, courseId) {
  toggleComplete(lessonId);
  const course = COURSES.find(c => c.id === courseId);
  const done   = isComplete(lessonId);
  const btn    = document.getElementById('toggle-btn');
  if (!btn) return;
  btn.className       = 'complete-btn' + (done ? ' done' : '');
  btn.style.background = done ? 'var(--green)' : course.color;
  btn.innerHTML       = (done ? IC.check2 : IC.circle) + `<span>${done ? 'Completed — Tap to Undo' : 'Mark as Complete'}</span>`;
  const metaRow = document.querySelector('.lesson-meta-row');
  if (metaRow) {
    const existing = metaRow.querySelector('.done-badge');
    if (done && !existing) {
      const b = document.createElement('div');
      b.className = 'done-badge';
      b.innerHTML = IC.check + ' Complete';
      metaRow.appendChild(b);
    } else if (!done && existing) {
      existing.remove();
    }
  }
}

// ═══════════════════════════════════════════════════
//  PROGRESS TAB
// ═══════════════════════════════════════════════════
function renderProgress() {
  const { total, done, pct } = getTotalProgress();
  const finished = COURSES.filter(c => getCourseProgress(c) === 100).length;
  document.getElementById('progress-body').innerHTML = `
    <div class="overall-card">
      <div class="overall-row">
        <span class="overall-label">Overall Completion</span>
        <span class="overall-pct">${pct}%</span>
      </div>
      <div class="big-track"><div class="big-fill" style="width:${pct}%"></div></div>
      <div class="overall-sub">${done} of ${total} lessons completed</div>
    </div>
    <div class="stats-row">
      <div class="stat-card">
        <div class="stat-icon" style="background:rgba(34,197,94,.18)">${IC.check2}</div>
        <div class="stat-value">${done}</div>
        <div class="stat-label">Lessons Done</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon" style="background:rgba(251,191,36,.18)">${IC.award}</div>
        <div class="stat-value">${finished}</div>
        <div class="stat-label">Courses Finished</div>
      </div>
    </div>
    <div class="section-title">Course Breakdown</div>
    ${COURSES.map(c => {
      const p = getCourseProgress(c);
      const d = c.lessons.filter(l => isComplete(l.id)).length;
      return `
      <div class="course-prog-row">
        <div class="course-prog-accent" style="background:${c.color}"></div>
        <div class="course-prog-body">
          <div class="course-prog-top">
            <div class="course-prog-icon" style="background:${c.color}20">${c.icon}</div>
            <div style="flex:1;min-width:0">
              <div class="course-prog-name">${c.title}</div>
              <div class="course-prog-meta">${d} / ${c.totalLessons} lessons</div>
            </div>
            <div class="course-prog-pct" style="color:${c.color}">${p}%</div>
          </div>
          <div class="mini-bar-track"><div class="mini-bar-fill" style="width:${p}%;background:${c.color}"></div></div>
        </div>
      </div>`;
    }).join('')}
    ${done === 0 ? `
    <div class="empty-state">
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>
      <div class="empty-title">No progress yet</div>
      <div class="empty-desc">Complete your first lesson to start tracking progress here.</div>
    </div>` : ''}
  `;
}

// ═══════════════════════════════════════════════════
//  ACCOUNT TAB
// ═══════════════════════════════════════════════════
function renderAccount() {
  const session = getSession();
  if (!session) return;
  const pro    = isProUnlocked();
  const dark   = isDark();
  const initials = session.username.charAt(0).toUpperCase();

  document.getElementById('account-body').innerHTML = `
    <div class="account-hero">
      <div class="account-avatar">${initials}</div>
      <div class="account-name">${session.username}</div>
      <div class="account-email">${session.email}</div>
      <div class="account-pro-badge">${pro ? '✦ Pro Member' : 'Free Plan'}</div>
    </div>

    <div class="account-section">
      <div class="section-title">Appearance</div>
      <div class="account-row">
        <div class="account-row-icon" style="background:rgba(251,191,36,.18)">
          ${dark ? IC.moon : IC.sun}
        </div>
        <div>
          <div class="account-row-label">Dark Mode</div>
          <div class="account-row-sub">${dark ? 'Currently enabled' : 'Currently disabled'}</div>
        </div>
        <div class="account-row-action">
          <div class="toggle-track ${dark ? 'on' : ''}" onclick="toggleTheme();renderAccount()">
            <div class="toggle-thumb"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="account-section">
      <div class="section-title">Pro Access</div>
      ${pro ? `
      <div class="account-row">
        <div class="account-row-icon" style="background:rgba(34,197,94,.18)">
          ${IC.check2}
        </div>
        <div>
          <div class="account-row-label" style="color:var(--green)">Pro Unlocked</div>
          <div class="account-row-sub">All lessons are available</div>
        </div>
      </div>` : `
      <div class="account-row clickable" onclick="openProModal()">
        <div class="account-row-icon" style="background:rgba(255,107,26,.18)">
          ${IC.key}
        </div>
        <div>
          <div class="account-row-label">Unlock Pro</div>
          <div class="account-row-sub">Enter your code to unlock all lessons</div>
        </div>
        <div class="account-row-action" style="color:var(--muted)">${IC.chev}</div>
      </div>`}
    </div>

    <div class="account-section">
      <div class="section-title">Use on Multiple Devices</div>
      <div class="info-box">
        <div class="info-box-title">How to access on another phone</div>
        <div class="info-box-text">
          1. Open Mac Academy on the other device.<br>
          2. Tap <strong>Sign In</strong> on the login screen.<br>
          3. Enter your email <strong>${session.email}</strong> and your password.<br>
          4. If you have Pro, enter your unlock code again to re-activate it.
        </div>
      </div>
    </div>

    <div class="account-section">
      <div class="section-title">Account</div>
      <button class="logout-btn" onclick="doLogout()">
        ${IC.logout} Sign Out
      </button>
    </div>

    <div class="version-card" onclick="handleVersionTap()" style="cursor:pointer;user-select:none">Mac Academy v4.0 · Made with creativity</div>
    <div style="text-align:center;font-size:11px;color:var(--muted);margin-top:4px;margin-bottom:8px">Tap 3× for admin</div>
  `;
}

// ═══════════════════════════════════════════════════
//  SUPPORT TAB
// ═══════════════════════════════════════════════════
const FAQS = [
  { q:'How do I watch a video lesson?',
    a:'Tap a course, then tap any unlocked lesson. The video opens in YouTube so you can follow along at your own pace.' },
  { q:'How does progress saving work?',
    a:"Progress is saved to your browser when you tap 'Mark as Complete'. If you tapped by mistake, tap the button again — it toggles back and forth." },
  { q:'How much does the FlipaClip course cost?',
    a:'The FlipaClip Pro course costs 25,000 UGX. Pay via MTN or Airtel Mobile Money, send us your screenshot, and we will give you an unlock code.' },
  { q:'How do I unlock Pro lessons?',
    a:'After paying via Mobile Money, send a screenshot to our WhatsApp or email. Once confirmed, you will receive a code. Enter the code in the Unlock screen to activate Pro on any device.' },
  { q:'Which payment methods are accepted?',
    a:'MTN Uganda Mobile Money and Airtel Uganda Mobile Money. Send your screenshot to WhatsApp 0745414641 or email alexkasaba2006@gmail.com.' },
  { q:'Can I use my account on multiple phones?',
    a:'Yes! Sign in with the same email and password on any device. If you have Pro, enter your unlock code again on the new device to re-activate it.' },
  { q:'I tapped Mark as Complete by mistake. Can I undo it?',
    a:'Yes — just tap the button again. It toggles green (complete) and orange (not complete) back and forth.' },
];

function renderSupport() {
  document.getElementById('support-body').innerHTML = `
    <div class="hero-banner">
      <div class="hero-icon-big">${IC.head}</div>
      <div class="hero-title">Get in Touch</div>
      <div class="hero-desc">Reach out via WhatsApp, email, or TikTok. We typically respond within 24 hours.</div>
    </div>
    <div class="section-title">Contact & Socials</div>
    <a class="contact-card" href="${WHATSAPP_URL}" target="_blank">
      <div class="contact-icon" style="background:rgba(37,211,102,.15);color:#25D366">${IC.wa}</div>
      <div><div class="contact-label">WhatsApp</div><div class="contact-sub">0745414641</div></div>
      <div style="margin-left:auto;color:var(--muted)">${IC.chev}</div>
    </a>
    <a class="contact-card" href="mailto:${EMAIL}">
      <div class="contact-icon" style="background:rgba(255,107,26,.15);color:var(--primary)">${IC.mail}</div>
      <div><div class="contact-label">Email Support</div><div class="contact-sub">${EMAIL}</div></div>
      <div style="margin-left:auto;color:var(--muted)">${IC.chev}</div>
    </a>
    <a class="contact-card" href="${TIKTOK_URL}" target="_blank">
      <div class="contact-icon" style="background:rgba(240,240,240,.08);color:var(--fg)">${IC.vid}</div>
      <div><div class="contact-label">TikTok</div><div class="contact-sub">@mac_toonzug</div></div>
      <div style="margin-left:auto;color:var(--muted)">${IC.chev}</div>
    </a>
    <div class="section-title" style="margin-top:16px">Frequently Asked Questions</div>
    ${FAQS.map((f, i) => `
    <div class="faq-item" id="faq-${i}" onclick="toggleFaq(${i})">
      <div class="faq-row">
        <div class="faq-q">${f.q}</div>
        <span id="faq-chev-${i}">${IC.chevD}</span>
      </div>
      <div class="faq-a">${f.a}</div>
    </div>`).join('')}
    <div class="version-card">Mac Academy v4.0 · Made with creativity</div>
  `;
}

function toggleFaq(i) {
  const el   = document.getElementById('faq-' + i);
  const ch   = document.getElementById('faq-chev-' + i);
  const open = el.classList.toggle('open');
  ch.innerHTML = open ? IC.chevU : IC.chevD;
}

// ═══════════════════════════════════════════════════
//  ONBOARDING
// ═══════════════════════════════════════════════════
let onboardSlide = 0;

function showOnboarding() {
  onboardSlide = 0;
  renderOnboardSlide();
  document.getElementById('onboard-overlay').classList.add('open');
}

function renderOnboardSlide() {
  const s = ONBOARD_SLIDES[onboardSlide];
  const iconEl  = document.getElementById('onboard-icon');
  const titleEl = document.getElementById('onboard-title');
  const bodyEl  = document.getElementById('onboard-body');
  const dotsEl  = document.getElementById('onboard-dots');
  const btnsEl  = document.getElementById('onboard-btns');

  if (iconEl)  { iconEl.style.background = s.color + '22'; iconEl.innerHTML = s.icon; }
  if (titleEl) titleEl.textContent = s.title;
  if (bodyEl)  bodyEl.textContent  = s.body;
  if (dotsEl)  dotsEl.innerHTML    = ONBOARD_SLIDES.map((_, i) =>
    `<div class="onboard-dot${i === onboardSlide ? ' active' : ''}"></div>`).join('');
  const isLast = onboardSlide === ONBOARD_SLIDES.length - 1;
  if (btnsEl) {
    btnsEl.innerHTML = isLast
      ? `<button class="onboard-next full" onclick="finishOnboarding()">Get Started</button>`
      : `<span class="onboard-skip" onclick="finishOnboarding()">Skip</span>
         <button class="onboard-next" onclick="nextOnboard()">Next
           <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
         </button>`;
  }
}

function nextOnboard() {
  if (onboardSlide < ONBOARD_SLIDES.length - 1) { onboardSlide++; renderOnboardSlide(); }
}

function finishOnboarding() {
  localStorage.setItem(KEY_ONBOARDED, 'true');
  document.getElementById('onboard-overlay').classList.remove('open');
}

// ═══════════════════════════════════════════════════
//  ADMIN CODE GENERATOR
// ═══════════════════════════════════════════════════
let adminCurrentCode = '';
let adminHistVisible = false;

function openAdminModal() {
  document.getElementById('admin-pw-input').value = '';
  document.getElementById('admin-pw-err').style.display = 'none';
  document.getElementById('admin-login-panel').style.display = 'block';
  document.getElementById('admin-gen-panel').style.display = 'none';
  document.getElementById('admin-overlay').classList.add('open');
}

function closeAdminModal() {
  document.getElementById('admin-overlay').classList.remove('open');
  adminHistVisible = false;
}

function handleAdminOverlayClick(e) {
  if (e.target === document.getElementById('admin-overlay')) closeAdminModal();
}

function adminLogin() {
  const pw = document.getElementById('admin-pw-input').value;
  if (pw !== ADMIN_PASSWORD) {
    document.getElementById('admin-pw-err').style.display = 'block';
    return;
  }
  document.getElementById('admin-login-panel').style.display = 'none';
  document.getElementById('admin-gen-panel').style.display   = 'block';
  adminCurrentCode = '';
  adminHistVisible = false;
  renderAdminHist();
}

function adminRandomChars(n) {
  const pool = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let out = '';
  for (let i = 0; i < n; i++) out += pool[Math.floor(Math.random() * pool.length)];
  return out;
}

function adminGenerate() {
  adminCurrentCode = 'MAC-' + adminRandomChars(4) + '-' + SECRET_KEY.toUpperCase();
  const box = document.getElementById('admin-code-box');
  if (box) {
    box.className = 'code-display-box has-code';
    box.innerHTML = `<div class="admin-big-code">${adminCurrentCode}</div>`;
  }
  document.getElementById('admin-action-row').style.display = 'flex';

  // Save to history
  try {
    const hist = JSON.parse(localStorage.getItem(KEY_ADMIN_HIST) || '[]');
    hist.unshift({ code: adminCurrentCode, date: new Date().toLocaleString() });
    localStorage.setItem(KEY_ADMIN_HIST, JSON.stringify(hist.slice(0, 100)));
  } catch {}
  renderAdminHist();
}

function adminCopy() {
  if (!adminCurrentCode) return;
  if (navigator.clipboard) {
    navigator.clipboard.writeText(adminCurrentCode).then(() => showAdminToast('Copied!'));
  } else {
    prompt('Copy this code:', adminCurrentCode);
  }
}

function adminWhatsApp() {
  if (!adminCurrentCode) return;
  const msg = encodeURIComponent(
    `Hi! Here is your Mac Academy Pro unlock code:\n\n${adminCurrentCode}\n\nOpen the app → Courses → tap "Unlock Pro Lessons" → enter the code. Enjoy! 🎬`
  );
  window.open('https://wa.me/?text=' + msg, '_blank');
}

function renderAdminHist() {
  const countEl = document.getElementById('admin-hist-count');
  const listEl  = document.getElementById('admin-hist-list');
  try {
    const hist = JSON.parse(localStorage.getItem(KEY_ADMIN_HIST) || '[]');
    if (countEl) countEl.textContent = hist.length;
    if (listEl) {
      listEl.style.display = adminHistVisible ? 'flex' : 'none';
      listEl.innerHTML = hist.length === 0
        ? `<div style="color:var(--muted);font-size:13px;text-align:center;padding:10px">No codes generated yet.</div>`
        : hist.map(item => `
          <div class="admin-hist-item">
            <div style="flex:1">
              <div class="admin-hist-code">${item.code}</div>
              <div class="admin-hist-date">${item.date}</div>
            </div>
            <button class="admin-share-btn" onclick="adminShareCode('${item.code}')">📋</button>
          </div>`).join('');
    }
  } catch {}
}

function adminShareCode(code) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(code).then(() => showAdminToast('Copied!'));
  } else {
    prompt('Copy this code:', code);
  }
}

function toggleAdminHist() {
  adminHistVisible = !adminHistVisible;
  const chevEl = document.getElementById('admin-hist-chev');
  if (chevEl) chevEl.textContent = adminHistVisible ? '▴' : '▾';
  renderAdminHist();
}

function showAdminToast(msg) {
  let t = document.getElementById('admin-toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'admin-toast';
    t.style.cssText = 'position:fixed;bottom:30px;left:50%;transform:translateX(-50%);background:#22c55e;color:#fff;font-weight:700;font-size:14px;padding:10px 22px;border-radius:30px;z-index:9999;pointer-events:none;transition:opacity .2s';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.style.opacity = '1';
  setTimeout(() => { t.style.opacity = '0'; }, 1800);
}

// ── Version card tap-to-admin ─────────────────────
let versionTapCount = 0;
let versionTapTimer = null;
function handleVersionTap() {
  versionTapCount++;
  if (versionTapTimer) clearTimeout(versionTapTimer);
  versionTapTimer = setTimeout(() => { versionTapCount = 0; }, 2500);
  if (versionTapCount >= 3) {
    versionTapCount = 0;
    openAdminModal();
  }
}

// ═══════════════════════════════════════════════════
//  KEYBOARD SHORTCUTS
// ═══════════════════════════════════════════════════
document.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    const overlay = document.getElementById('modal-overlay');
    if (overlay && overlay.classList.contains('open')) { submitCode(); return; }
    const loginScreen = document.getElementById('auth-login');
    if (loginScreen && loginScreen.classList.contains('active')) { doLogin(); return; }
    const signupScreen = document.getElementById('auth-signup');
    if (signupScreen && signupScreen.classList.contains('active')) { doSignup(); return; }
  }
});

// ═══════════════════════════════════════════════════
//  BOOT
// ═══════════════════════════════════════════════════
function bootApp(freshSignup = false) {
  const session = getSession();
  if (!session) {
    showAuthScreen('login');
    return;
  }
  showMainApp();
  applyTheme();
  renderCoursesList();
  renderComingSoon();
  updateHomeProgress();
  renderSupport();
  if (freshSignup || !localStorage.getItem(KEY_ONBOARDED)) {
    setTimeout(showOnboarding, 400);
  }
}

bootApp();

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  });
}
