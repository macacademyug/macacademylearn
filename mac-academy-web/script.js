// ═══════════════════════════════════════════════════
//  MAC ACADEMY — script.js
//  To swap videos: replace the YouTube URL in VIDEO
//  with your own YouTube link. It applies everywhere.
// ═══════════════════════════════════════════════════

const VIDEO = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';

// ── COURSE DATA ──────────────────────────────────────
const COURSES = [
  {
    id: 'basics',
    title: 'Basics of FlipaClip',
    level: 'Beginner',
    description: 'Master the essential tools and techniques to start creating your first animations in FlipaClip from scratch.',
    totalLessons: 3,
    estimatedHours: '30 min',
    color: '#22c55e',
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
    lessons: [
      {
        id: 'basics-1', order: 1, isPro: false,
        title: 'Getting Started with FlipaClip',
        duration: '10:00', videoUrl: VIDEO,
        description: "A complete walkthrough of FlipaClip's interface — brushes, the timeline, layers, and playback controls. By the end you'll know exactly where everything lives and be ready to start animating.",
      },
      {
        id: 'basics-2', order: 2, isPro: false,
        title: 'Bouncing Ball Animation',
        duration: '15:00', videoUrl: VIDEO,
        description: 'Animate a bouncing ball to understand timing, spacing, squash, and stretch — the core principles every animator must master. The best hands-on exercise to build your animation instincts.',
      },
      {
        id: 'basics-3', order: 3, isPro: true,
        title: 'Exporting Your Animation',
        duration: '5:00', videoUrl: VIDEO,
        description: 'Export your finished animation as a video or GIF. Learn the best settings for TikTok, Instagram, and YouTube so your work looks great wherever you share it.',
      },
    ],
  },
  {
    id: 'character',
    title: 'Character Animation',
    level: 'Intermediate',
    description: "Bring characters to life with walk cycles, run cycles, and expressive movement using FlipaClip's animation tools.",
    totalLessons: 3,
    estimatedHours: '40 min',
    color: '#3B82F6',
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
    lessons: [
      {
        id: 'character-1', order: 1, isPro: false,
        title: 'Drawing the Background',
        duration: '10:00', videoUrl: VIDEO,
        description: 'Design and draw a complete scene background — perspective basics, layering elements, and creating depth that makes your character pop against the environment.',
      },
      {
        id: 'character-2', order: 2, isPro: true,
        title: 'Animating the Character',
        duration: '20:00', videoUrl: VIDEO,
        description: 'Animate your character moving through the scene. Cover walk cycles, weight shifts, and expressive actions — bringing your character to life with fluid, believable movement.',
      },
      {
        id: 'character-3', order: 3, isPro: true,
        title: 'Finalizing Your Scene',
        duration: '10:00', videoUrl: VIDEO,
        description: 'Polish and finalize your animated scene — adjust timing, clean up rough lines, add finishing touches, and export a complete short animation ready to share.',
      },
    ],
  },
  {
    id: 'lipsync',
    title: 'Lip Sync',
    level: 'Advanced',
    description: "Match your character's mouth movements perfectly to audio dialogue using FlipaClip's frame-by-frame lip sync techniques.",
    totalLessons: 3,
    estimatedHours: '30 min',
    color: '#FF6B1A',
    icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>`,
    lessons: [
      {
        id: 'lipsync-1', order: 1, isPro: false,
        title: 'Understanding Mouth Shapes',
        duration: '10:00', videoUrl: VIDEO,
        description: 'Learn the standard Preston Blair mouth chart — the 8 essential shapes (A/I, E, O, U, F/V, L/TH, M/B/P, rest) and how they map to sounds in spoken dialogue.',
      },
      {
        id: 'lipsync-2', order: 2, isPro: true,
        title: 'Breaking Down Audio',
        duration: '10:00', videoUrl: VIDEO,
        description: 'Import audio into FlipaClip, read the waveform, break a line of dialogue into individual sounds, and map each sound to the correct mouth shape frame by frame.',
      },
      {
        id: 'lipsync-3', order: 3, isPro: true,
        title: 'Full Lip Sync Scene',
        duration: '10:00', videoUrl: VIDEO,
        description: 'Animate a complete talking character scene with synced mouth shapes, eye blinks, and subtle head movement — a polished, convincing performance from start to finish.',
      },
    ],
  },
];

const FLUTTERWAVE_LINK = 'https://flutterwave.com/pay/mac-academy-pro';
const STORAGE_KEY      = 'mac_academy_progress_v3';

// ── PROGRESS ─────────────────────────────────────────
function getProgress()    { try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); } catch { return {}; } }
function saveProgress(p)  { localStorage.setItem(STORAGE_KEY, JSON.stringify(p)); }
function isComplete(id)   { return !!getProgress()[id]; }

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

// ── NAVIGATION ───────────────────────────────────────
let currentTab    = 'courses';
let screenStack   = [];
let currentCourse = null;

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
  if (tab === 'courses')  updateHomeProgress();
}

function pushScreen(id) {
  screenStack.push(document.querySelector('.screen.active').id);
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  document.getElementById('bottom-nav').style.display = 'none';
}

function goBack() {
  if (!screenStack.length) return;
  const prev = screenStack.pop();
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(prev).classList.add('active');
  if (!screenStack.length) {
    document.getElementById('bottom-nav').style.display = 'flex';
    updateHomeProgress();
    if (currentTab === 'progress') renderProgress();
    if (currentCourse) renderCourseDetail(currentCourse);
  }
}

function openFlutterwave() { window.open(FLUTTERWAVE_LINK, '_blank'); }

// ── SVG ICONS ────────────────────────────────────────
const IC = {
  check:  `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
  check2: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
  circle: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/></svg>`,
  lock:   `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
  play:   `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="margin-left:3px"><polygon points="5 3 19 12 5 21 5 3"/></svg>`,
  clock:  `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  plays:  `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>`,
  hash:   `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/><line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/></svg>`,
  chev:   `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`,
  chevD:  `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>`,
  chevU:  `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>`,
  award:  `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>`,
  unlock: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></svg>`,
  arrow:  `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`,
  wa:     `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>`,
  mail:   `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
  vid:    `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>`,
  head:   `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z"/><path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>`,
};

// ── COURSES SCREEN ───────────────────────────────────
function updateHomeProgress() {
  const { total, done, pct } = getTotalProgress();
  document.getElementById('home-prog-pct').textContent  = pct + '%';
  document.getElementById('home-prog-sub').textContent  = done + ' of ' + total + ' lessons completed';
  document.getElementById('home-bar-fill').style.width  = pct + '%';
  COURSES.forEach(c => {
    const p  = getCourseProgress(c);
    const el = document.getElementById('card-prog-' + c.id);
    if (!el) return;
    el.querySelector('.mini-bar-fill').style.width       = p + '%';
    el.querySelector('.mini-prog-pct').textContent       = p + '%';
    el.style.display = p > 0 ? 'block' : 'none';
  });
}

function renderCoursesList() {
  document.getElementById('courses-list').innerHTML = COURSES.map(c => {
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

function openCourse(courseId) {
  currentCourse = COURSES.find(c => c.id === courseId);
  renderCourseDetail(currentCourse);
  pushScreen('screen-detail');
}

// ── COURSE DETAIL ────────────────────────────────────
function renderCourseDetail(c) {
  const prog      = getCourseProgress(c);
  const done      = c.lessons.filter(l => isComplete(l.id)).length;
  const proCount  = c.lessons.filter(l => l.isPro).length;
  const freeCount = c.lessons.filter(l => !l.isPro).length;
  document.getElementById('detail-screen-title').textContent = '';
  document.getElementById('detail-body').innerHTML = `
    <div class="detail-hero" style="background:${c.color}15;border-color:${c.color}30">
      <div class="hero-icon" style="background:${c.color}">${c.icon.replace('width="18" height="18"', 'width="26" height="26"').replace('stroke="currentColor"', 'stroke="#fff"')}</div>
      <div class="level-badge" style="background:${c.color}25;color:${c.color};align-self:flex-start">${c.level}</div>
      <div style="font-size:21px;font-weight:700">${c.title}</div>
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
        <span style="font-size:14px;font-weight:600">Your Progress</span>
        <span style="font-size:18px;font-weight:700;color:${c.color}">${prog}%</span>
      </div>
      <div class="bar-track"><div class="bar-fill" style="width:${prog}%;background:${c.color}"></div></div>
      <div style="font-size:12px;color:var(--muted);margin-top:6px">${done} of ${c.totalLessons} lessons completed</div>
    </div>` : ''}
    ${proCount > 0 ? `
    <button class="pro-btn" style="margin-bottom:20px" onclick="openFlutterwave()">
      ${IC.unlock} Unlock ${proCount} Pro Lessons
    </button>` : ''}
    <div class="section-title">Lessons</div>
    ${c.lessons.map(l => renderLessonItem(l, c)).join('')}
  `;
}

function renderLessonItem(l, c) {
  const done   = isComplete(l.id);
  const locked = l.isPro;
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
        ${l.isPro ? `<div class="pro-tag" style="background:${c.color}20;color:${c.color}">PRO</div>` : ''}
      </div>
      <div class="lesson-desc-preview">${l.description}</div>
    </div>
    <div class="lesson-right">
      <span>${l.duration}</span>
      ${!locked ? IC.chev : ''}
    </div>
  </div>`;
}

// ── LESSON PLAYER ────────────────────────────────────
function openLesson(lessonId, courseId) {
  const course = COURSES.find(c => c.id === courseId);
  const lesson = course.lessons.find(l => l.id === lessonId);
  if (lesson.isPro) { renderProLock(lesson, course); pushScreen('screen-lesson'); return; }
  renderLessonPlayer(lesson, course);
  pushScreen('screen-lesson');
}

function renderLessonPlayer(lesson, course) {
  const done = isComplete(lesson.id);
  const next = course.lessons.find(l => l.order === lesson.order + 1);
  document.getElementById('lesson-back-header').style.display = 'flex';
  document.getElementById('lesson-body').innerHTML = `
    <div class="course-tag" style="background:${course.color}20;color:${course.color}">${course.icon.replace('width="18" height="18"','width="12" height="12"')} ${course.title}</div>
    <div class="lesson-title-big">${lesson.title}</div>
    <div class="lesson-meta-row">
      <div class="meta-item">${IC.clock} ${lesson.duration}</div>
      <div class="meta-item">${IC.hash} Lesson ${lesson.order} of ${course.totalLessons}</div>
      ${done ? `<div class="done-badge">${IC.check} Complete</div>` : ''}
    </div>
    <div class="video-player" style="border-color:${course.color}60" onclick="openVideo('${lesson.videoUrl}')">
      <div class="play-circle" style="background:${course.color}">${IC.play}</div>
      <div class="video-hint">Tap to watch video</div>
      <div class="video-sub">Opens in YouTube · change the VIDEO variable at the top of script.js</div>
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
    ${next && !next.isPro ? `
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
    <div style="padding-top:52px;padding-left:18px">
      <button class="back-btn" onclick="goBack()">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
    </div>
    <div class="pro-lock">
      <div class="lock-icon-wrap">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
      </div>
      <div class="lock-title">Pro Lesson</div>
      <div class="lock-desc">"${lesson.title}" is a Pro lesson. Unlock all Pro content with a one-time payment via Flutterwave — MTN & Airtel Uganda Mobile Money supported.</div>
      <button class="lock-btn" onclick="openFlutterwave()">${IC.unlock} Unlock Pro Lessons</button>
      <div class="back-link" onclick="goBack()">← Back to course</div>
    </div>
  `;
}

function openVideo(url) { window.open(url, '_blank'); }

function doToggle(lessonId, courseId) {
  toggleComplete(lessonId);
  const course = COURSES.find(c => c.id === courseId);
  const done   = isComplete(lessonId);
  const btn    = document.getElementById('toggle-btn');
  if (!btn) return;
  btn.className          = 'complete-btn' + (done ? ' done' : '');
  btn.style.background   = done ? 'var(--green)' : course.color;
  btn.innerHTML          = (done ? IC.check2 : IC.circle) + `<span>${done ? 'Completed — Tap to Undo' : 'Mark as Complete'}</span>`;
  const metaRow = document.querySelector('.lesson-meta-row');
  if (metaRow) {
    const existing = metaRow.querySelector('.done-badge');
    if (done && !existing) {
      const badge = document.createElement('div');
      badge.className = 'done-badge';
      badge.innerHTML = IC.check + ' Complete';
      metaRow.appendChild(badge);
    } else if (!done && existing) {
      existing.remove();
    }
  }
}

// ── PROGRESS TAB ─────────────────────────────────────
function renderProgress() {
  const { total, done, pct } = getTotalProgress();
  const finishedCourses = COURSES.filter(c => getCourseProgress(c) === 100).length;
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
        <div class="stat-value">${finishedCourses}</div>
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

// ── SUPPORT TAB ──────────────────────────────────────
const FAQS = [
  { q: 'How do I watch a video lesson?',
    a: 'Tap a course, then tap any unlocked lesson. The video opens in YouTube so you can follow along at your own pace.' },
  { q: 'How does progress saving work?',
    a: "Progress is saved to your browser when you tap 'Mark as Complete'. If you tapped by mistake, tap the button again — it toggles back and forth." },
  { q: 'How do I unlock Pro lessons?',
    a: "Tap the orange 'Unlock Pro Lessons' button. You'll be taken to Flutterwave where you can pay via MTN or Airtel Uganda Mobile Money." },
  { q: 'Which payment methods are supported?',
    a: 'MTN Uganda Mobile Money and Airtel Uganda Mobile Money through Flutterwave.' },
  { q: 'What is FlipaClip?',
    a: 'FlipaClip is a mobile animation app for Android and iOS. This academy covers everything from beginner basics to advanced lip sync.' },
  { q: "I tapped 'Mark as Complete' by mistake. Can I undo it?",
    a: 'Yes! Just tap the button again. It toggles — green means complete, orange means incomplete.' },
];

function renderSupport() {
  document.getElementById('support-body').innerHTML = `
    <div class="hero-banner">
      <div class="hero-icon-big">${IC.head}</div>
      <div class="hero-title">Get in Touch</div>
      <div class="hero-desc">Reach out via WhatsApp, email, or TikTok. We typically respond within 24 hours.</div>
    </div>
    <div class="section-title">Contact & Socials</div>
    <a class="contact-card" href="https://wa.me/256745414641" target="_blank">
      <div class="contact-icon" style="background:rgba(37,211,102,.15);color:#25D366">${IC.wa}</div>
      <div><div class="contact-label">WhatsApp</div><div class="contact-sub">0745414641</div></div>
      <div style="margin-left:auto;color:var(--muted)">${IC.chev}</div>
    </a>
    <a class="contact-card" href="mailto:alexkasaba20006@gmail.com">
      <div class="contact-icon" style="background:rgba(255,107,26,.15);color:var(--primary)">${IC.mail}</div>
      <div><div class="contact-label">Email Support</div><div class="contact-sub">alexkasaba20006@gmail.com</div></div>
      <div style="margin-left:auto;color:var(--muted)">${IC.chev}</div>
    </a>
    <a class="contact-card" href="https://www.tiktok.com/@mac_toonzug" target="_blank">
      <div class="contact-icon" style="background:rgba(240,240,240,.1);color:var(--fg)">${IC.vid}</div>
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
    <div class="version-card">Mac Academy v3.0 · Made with creativity</div>
  `;
}

function toggleFaq(i) {
  const el   = document.getElementById('faq-' + i);
  const ch   = document.getElementById('faq-chev-' + i);
  const open = el.classList.toggle('open');
  ch.innerHTML = open ? IC.chevU : IC.chevD;
}

// ── BOOT ─────────────────────────────────────────────
renderCoursesList();
updateHomeProgress();
