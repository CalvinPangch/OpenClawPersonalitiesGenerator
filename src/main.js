// ========================================
// OpenClaw Personality Generator — Main
// ========================================

import './style.css';
import { rolePresets, vibePresets, emojiOptions, ttsPresets, heartbeatModes, proactivityPresets, toolProfilePresets, exampleData } from './data/presets.js';
import { generateIdentity } from './generators/identity.js';
import { generateSoul } from './generators/soul.js';
import { generateUser } from './generators/user.js';
import { generateAgents } from './generators/agents.js';
import { generateTools } from './generators/tools.js';
import { generateHeartbeat } from './generators/heartbeat.js';
import { setupTutorial } from './tutorial.js';
import { renderPersonaCard } from './persona.js';
import { downloadFile, downloadAllFiles } from './download.js';

// ---- State ----
let generatedFiles = {};

// ---- Init ----
document.addEventListener('DOMContentLoaded', () => {
  renderPresets();
  setupTabs();
  setupTutorial();
  setupEmojiPicker();
  setupHeartbeatModes();
  setupGenerate();
  setupReset();
  setupLoadExample();
});

// ========================================
// Tabs
// ========================================
function setupTabs() {
  const tabs = document.querySelectorAll('.tab');
  const panels = document.querySelectorAll('.tab-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;

      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      panels.forEach(p => {
        p.classList.remove('active');
      });
      document.getElementById(`tab-${target}`).classList.add('active');
    });
  });
}

// ========================================
// Render Preset Cards
// ========================================
function renderPresets() {
  // Role presets
  renderPresetGrid('role-presets', rolePresets, (card) => selectRolePreset(card));

  // Vibe presets
  renderPresetGrid('vibe-presets', vibePresets, (card) => selectVibePreset(card));

  // TTS presets
  renderPresetGrid('tts-presets', ttsPresets, (card) => selectSinglePreset(card, '#tts-presets'));

  // Heartbeat mode presets
  renderPresetGrid('heartbeat-presets', heartbeatModes, (card) => selectHeartbeatMode(card));

  // Proactivity presets
  renderPresetGrid('proactivity-presets', proactivityPresets, (card) => selectSinglePreset(card, '#proactivity-presets'));

  // Tool profile presets
  renderPresetGrid('tool-profile-presets', toolProfilePresets, (card) => selectSinglePreset(card, '#tool-profile-presets'));
}

function renderPresetGrid(containerId, presets, onClick) {
  const grid = document.getElementById(containerId);
  grid.innerHTML = presets.map(p => `
    <div class="preset-card" data-preset-id="${p.id}" tabindex="0" role="button" aria-label="${p.label}">
      <span class="preset-card-emoji">${p.emoji}</span>
      <span class="preset-card-label">${p.label}</span>
    </div>
  `).join('');

  grid.querySelectorAll('.preset-card').forEach(card => {
    card.addEventListener('click', () => onClick(card));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(card); }
    });
  });
}

// ========================================
// Preset Selection Handlers
// ========================================
function selectRolePreset(card) {
  document.querySelectorAll('#role-presets .preset-card').forEach(c => c.classList.remove('selected'));
  card.classList.add('selected');

  const preset = rolePresets.find(r => r.id === card.dataset.presetId);
  if (!preset) return;

  document.getElementById('identity-name').value = preset.name;
  document.getElementById('identity-role').value = preset.role;

  // Also select matching emoji
  const emojiButtons = document.querySelectorAll('#emoji-picker .emoji-option');
  emojiButtons.forEach(btn => btn.classList.remove('selected'));
  emojiButtons.forEach(btn => {
    if (btn.textContent === preset.emoji) btn.classList.add('selected');
  });
  document.getElementById('identity-emoji-custom').value = '';
}

function selectVibePreset(card) {
  document.querySelectorAll('#vibe-presets .preset-card').forEach(c => c.classList.remove('selected'));
  card.classList.add('selected');

  const preset = vibePresets.find(v => v.id === card.dataset.presetId);
  if (!preset) return;

  document.getElementById('identity-vibe').value = preset.value;
}

function selectSinglePreset(card, containerSelector) {
  document.querySelectorAll(`${containerSelector} .preset-card`).forEach(c => c.classList.remove('selected'));
  card.classList.add('selected');
}

function selectHeartbeatMode(card) {
  document.querySelectorAll('#heartbeat-presets .preset-card').forEach(c => c.classList.remove('selected'));
  card.classList.add('selected');

  const mode = heartbeatModes.find(h => h.id === card.dataset.presetId);
  if (!mode) return;

  const checksGroup = document.getElementById('heartbeat-checks-group');
  const customGroup = document.getElementById('heartbeat-custom-group');
  const scheduleGroup = document.getElementById('heartbeat-schedule-group');
  const checkboxes = ['hb-check1', 'hb-check2', 'hb-check3', 'hb-check4', 'hb-check5', 'hb-check6', 'hb-check7', 'hb-check8'];

  if (mode.id === 'off') {
    checksGroup.style.display = 'none';
    customGroup.style.display = 'none';
    scheduleGroup.style.display = 'none';
    checkboxes.forEach(id => { document.getElementById(id).checked = false; });
  } else if (mode.id === 'custom') {
    checksGroup.style.display = '';
    customGroup.style.display = '';
    scheduleGroup.style.display = '';
  } else {
    checksGroup.style.display = '';
    customGroup.style.display = mode.id === 'full' ? '' : 'none';
    scheduleGroup.style.display = '';
    checkboxes.forEach(id => {
      document.getElementById(id).checked = mode.checks.includes(id);
    });
  }
}

// ========================================
// Emoji Picker
// ========================================
function setupEmojiPicker() {
  const picker = document.getElementById('emoji-picker');
  const customInput = document.getElementById('identity-emoji-custom');

  picker.innerHTML = emojiOptions.map(e =>
    `<button type="button" class="emoji-option" tabindex="0" aria-label="Emoji ${e}">${e}</button>`
  ).join('');

  picker.querySelectorAll('.emoji-option').forEach(btn => {
    btn.addEventListener('click', () => {
      picker.querySelectorAll('.emoji-option').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      customInput.value = '';
    });
  });

  customInput.addEventListener('input', () => {
    if (customInput.value.trim()) {
      picker.querySelectorAll('.emoji-option').forEach(b => b.classList.remove('selected'));
    }
  });
}

// ========================================
// Heartbeat Mode init
// ========================================
function setupHeartbeatModes() {
  const offCard = document.querySelector('#heartbeat-presets .preset-card[data-preset-id="off"]');
  if (offCard) {
    offCard.classList.add('selected');
    selectHeartbeatMode(offCard);
  }
}

// ========================================
// Generate
// ========================================
function setupGenerate() {
  const btn = document.getElementById('btn-generate');

  btn.addEventListener('click', () => {
    btn.disabled = true;
    btn.textContent = 'Generating...';

    setTimeout(() => {
      generatedFiles = {
        'IDENTITY.md': generateIdentity(),
        'SOUL.md': generateSoul(),
        'USER.md': generateUser(),
        'AGENTS.md': generateAgents(),
        'TOOLS.md': generateTools(),
        'HEARTBEAT.md': generateHeartbeat(),
      };

      renderPersonaCard(generatedFiles, (filename) => {
        downloadFile(filename, generatedFiles[filename]);
        showToast(`Downloaded ${filename}`);
      });

      const downloadAllBtn = document.getElementById('btn-download-all');
      downloadAllBtn.onclick = () => {
        downloadAllFiles(generatedFiles);
        showToast('Downloading all files...', 'success');
      };

      btn.disabled = false;
      btn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> Generate All Files`;

      showToast('All 6 files generated!', 'success');
    }, 300);
  });
}

// ========================================
// Reset All
// ========================================
function setupReset() {
  document.getElementById('btn-reset').addEventListener('click', () => {
    // Text inputs
    ['identity-name', 'identity-role', 'identity-vibe', 'identity-emoji-custom', 'identity-greeting',
     'user-name', 'user-callname', 'user-background', 'user-work-schedule', 'user-current-projects',
     'soul-custom', 'tools-env', 'hb-custom', 'agents-daily-routine'].forEach(id => {
      document.getElementById(id).value = '';
    });

    // Reset soul style to default
    document.getElementById('soul-style').value = 'Be the kind of assistant people genuinely enjoy talking to. Be concise when brevity works, detailed when depth is needed. Not a corporate bot, not a sycophant, just... useful.';

    // Selects - reset to defaults
    document.getElementById('user-pronouns').value = '';
    document.getElementById('user-timezone').value = '';
    document.getElementById('user-language').value = 'English preferred';
    document.getElementById('user-tech-level').value = '';
    document.getElementById('user-response-format').value = '';
    document.getElementById('identity-response-length').value = '';
    document.getElementById('soul-emoji-policy').value = 'minimal';
    document.getElementById('soul-error-handling').value = 'brief';
    document.getElementById('agents-mem-consolidation').value = '';
    document.getElementById('tools-model-pref').value = '';
    document.getElementById('tools-output-format').value = '';
    document.getElementById('hb-interval').value = '';
    document.getElementById('hb-digest').value = 'off';
    document.getElementById('hb-active-start').value = '08:00';
    document.getElementById('hb-active-end').value = '22:00';

    // Tone sliders to default (2)
    ['soul-formality', 'soul-humor', 'soul-empathy', 'soul-creativity', 'soul-directness'].forEach(id => {
      document.getElementById(id).value = '2';
    });

    // Soul checkboxes: all on
    ['soul-p1', 'soul-p2', 'soul-p3', 'soul-p4', 'soul-p5',
     'soul-b1', 'soul-b2', 'soul-b3', 'soul-b4'].forEach(id => {
      document.getElementById(id).checked = true;
    });

    // Agent checkboxes: defaults
    ['agents-mem1', 'agents-mem2', 'agents-safe1', 'agents-safe2', 'agents-safe3',
     'agents-group1', 'agents-group2', 'agents-confirm-file'].forEach(id => {
      document.getElementById(id).checked = true;
    });
    ['agents-mem3', 'agents-group3', 'agents-adv1', 'agents-adv2', 'agents-confirm-api'].forEach(id => {
      document.getElementById(id).checked = false;
    });

    // Tools platform checkboxes off
    ['tools-platform-github', 'tools-platform-jira', 'tools-platform-notion',
     'tools-platform-obsidian', 'tools-platform-google', 'tools-platform-slack'].forEach(id => {
      document.getElementById(id).checked = false;
    });

    // Heartbeat checkboxes off
    ['hb-check1', 'hb-check2', 'hb-check3', 'hb-check4', 'hb-check5', 'hb-check6', 'hb-check7', 'hb-check8', 'hb-quiet-hours'].forEach(id => {
      document.getElementById(id).checked = false;
    });

    // Clear preset selections
    document.querySelectorAll('.preset-card.selected').forEach(c => c.classList.remove('selected'));
    document.querySelectorAll('.emoji-option.selected').forEach(c => c.classList.remove('selected'));

    // Re-select heartbeat off mode
    const offCard = document.querySelector('#heartbeat-presets .preset-card[data-preset-id="off"]');
    if (offCard) {
      offCard.classList.add('selected');
      selectHeartbeatMode(offCard);
    }

    // Hide persona card
    document.getElementById('persona-card').hidden = true;
    generatedFiles = {};

    showToast('All fields reset');
  });
}

// ========================================
// Load Example
// ========================================
function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomBool(probability = 0.5) {
  return Math.random() < probability;
}

function randomSelectValue(selectId, allowEmpty = false) {
  const select = document.getElementById(selectId);
  const options = Array.from(select.options)
    .map(o => o.value)
    .filter(v => allowEmpty || v !== '');
  return options.length ? pick(options) : '';
}

function randomChecklist(length, probability = 0.45, minSelected = 1) {
  const checks = Array.from({ length }, () => randomBool(probability));
  if (checks.filter(Boolean).length < minSelected && checks.length > 0) {
    checks[Math.floor(Math.random() * checks.length)] = true;
  }
  return checks;
}

function buildRandomExampleData() {
  const d = JSON.parse(JSON.stringify(exampleData));

  const rolePreset = pick(rolePresets);
  const vibePreset = pick(vibePresets);
  const ttsPreset = pick(ttsPresets);
  const toolProfilePreset = pick(toolProfilePresets);
  const proactivityPreset = pick(proactivityPresets);
  const heartbeatMode = pick(heartbeatModes);

  d.identity.name = rolePreset.name;
  d.identity.role = rolePreset.role;
  d.identity.vibe = vibePreset.value;
  d.identity.emoji = randomBool(0.75) ? rolePreset.emoji : pick(emojiOptions);
  d.identity.rolePreset = rolePreset.id;
  d.identity.vibePreset = vibePreset.id;
  d.identity.greeting = pick([
    'Hey! What are we shipping today?',
    'Ready when you are. What should we tackle first?',
    'Morning. Want a quick plan before we start?',
    'I am online. What do you want to build next?',
  ]);
  d.identity.responseLength = randomSelectValue('identity-response-length', true);

  d.soul.principles = randomChecklist(5, 0.8, 3);
  d.soul.boundaries = randomChecklist(4, 0.8, 2);
  d.soul.formality = String(1 + Math.floor(Math.random() * 3));
  d.soul.humor = String(1 + Math.floor(Math.random() * 3));
  d.soul.empathy = String(1 + Math.floor(Math.random() * 3));
  d.soul.creativity = String(1 + Math.floor(Math.random() * 3));
  d.soul.directness = String(1 + Math.floor(Math.random() * 3));
  d.soul.emojiPolicy = randomSelectValue('soul-emoji-policy');
  d.soul.errorHandling = randomSelectValue('soul-error-handling');
  d.soul.custom = randomBool(0.35) ? pick([
    'Prefer concrete examples over abstract advice.',
    'Ask one clarifying question before major decisions.',
    'Default to actionable next steps.',
  ]) : '';
  d.soul.style = pick([
    'Be sharp, practical, and kind. Keep it direct, but not robotic.',
    'Prioritize signal over noise. Help fast, then go deeper on demand.',
    'Think like a teammate: opinionated, clear, and execution-focused.',
    'Speak plainly, adapt depth to context, and avoid fluff.',
  ]);

  const userProfiles = [
    {
      name: 'Alex',
      callname: 'Al',
      background: 'Software engineer, enjoys hiking and sci-fi books. Prefers direct communication.',
      schedule: 'Mon-Fri 9am-6pm',
      projects: 'Building an AI-powered task manager using Next.js and OpenAI API',
    },
    {
      name: 'Mina',
      callname: 'Min',
      background: 'Product designer focused on developer tools and onboarding UX.',
      schedule: 'Mon-Fri 10am-7pm',
      projects: 'Redesigning a docs platform and improving activation metrics',
    },
    {
      name: 'Jordan',
      callname: 'Jay',
      background: 'Startup founder balancing product, hiring, and fundraising.',
      schedule: 'Mon-Sat flexible',
      projects: 'Launching v2 with team collaboration and billing automation',
    },
    {
      name: 'Sam',
      callname: 'Sam',
      background: 'Data analyst who automates reports and internal dashboards.',
      schedule: 'Weekdays 8am-5pm',
      projects: 'Migrating BI workflows from spreadsheets to reproducible pipelines',
    },
  ];
  const user = pick(userProfiles);
  d.user.name = user.name;
  d.user.callname = user.callname;
  d.user.pronouns = randomSelectValue('user-pronouns', true);
  d.user.timezone = randomSelectValue('user-timezone');
  d.user.language = randomSelectValue('user-language');
  d.user.background = user.background;
  d.user.workSchedule = user.schedule;
  d.user.techLevel = randomSelectValue('user-tech-level');
  d.user.responseFormat = randomSelectValue('user-response-format', true);
  d.user.currentProjects = user.projects;

  d.agents.memory = randomChecklist(3, 0.6, 1);
  d.agents.safety = randomChecklist(3, 0.8, 2);
  d.agents.group = randomChecklist(3, 0.55, 1);
  d.agents.advanced = [randomBool(0.3), randomBool(0.25)];
  d.agents.proactivity = proactivityPreset.id;
  d.agents.memoryConsolidation = randomSelectValue('agents-mem-consolidation', true);
  d.agents.confirmFile = randomBool(0.85);
  d.agents.confirmApi = randomBool(0.4);
  d.agents.dailyRoutine = randomBool(0.35) ? pick([
    '09:00 - Review top priorities\n13:00 - Midday status checkpoint\n18:00 - End-of-day summary',
    '08:30 - Inbox triage\n12:00 - Project pulse check\n17:30 - Plan tomorrow',
  ]) : '';

  d.tools.tts = ttsPreset.id;
  d.tools.toolProfile = toolProfilePreset.id;
  d.tools.platforms = {
    github: randomBool(0.7),
    jira: randomBool(0.5),
    notion: randomBool(0.55),
    obsidian: randomBool(0.35),
    google: randomBool(0.65),
    slack: randomBool(0.6),
  };
  if (!Object.values(d.tools.platforms).some(Boolean)) {
    d.tools.platforms.github = true;
  }
  d.tools.modelPreference = randomSelectValue('tools-model-pref', true);
  d.tools.outputFormat = randomSelectValue('tools-output-format', true);
  d.tools.env = randomBool(0.35) ? pick([
    '- SSH: prod-app @ 10.0.10.24\n- Alias: gs = git status',
    '- Laptop: main-dev\n- Repo root alias: ocg',
    '- Docker context: dev-cluster\n- VPN required for internal APIs',
  ]) : '';

  d.heartbeat.mode = heartbeatMode.id;
  if (heartbeatMode.id === 'off') {
    d.heartbeat.checks = [false, false, false, false, false, false, false, false];
  } else if (heartbeatMode.id === 'full') {
    d.heartbeat.checks = [true, true, true, true, true, true, true, true];
  } else if (heartbeatMode.id === 'light' && Array.isArray(heartbeatMode.checks)) {
    const ids = ['hb-check1', 'hb-check2', 'hb-check3', 'hb-check4', 'hb-check5', 'hb-check6', 'hb-check7', 'hb-check8'];
    d.heartbeat.checks = ids.map(id => heartbeatMode.checks.includes(id));
  } else {
    d.heartbeat.checks = randomChecklist(8, 0.45, 2);
  }
  d.heartbeat.custom = randomBool(0.3) ? pick([
    'Check pending PR reviews',
    'Scan release blockers',
    'Summarize support escalations',
  ]) : '';
  d.heartbeat.interval = randomSelectValue('hb-interval', true);
  d.heartbeat.activeStart = pick(['07:00', '08:00', '09:00', '10:00']);
  d.heartbeat.activeEnd = pick(['18:00', '20:00', '22:00', '23:00']);
  d.heartbeat.quietHours = randomBool(0.5);
  d.heartbeat.digest = randomSelectValue('hb-digest');

  return d;
}

function setupLoadExample() {
  document.getElementById('btn-example').addEventListener('click', () => {
    const d = buildRandomExampleData();

    // Identity
    document.getElementById('identity-name').value = d.identity.name;
    document.getElementById('identity-role').value = d.identity.role;
    document.getElementById('identity-vibe').value = d.identity.vibe;
    document.getElementById('identity-emoji-custom').value = '';
    document.getElementById('identity-greeting').value = d.identity.greeting;
    document.getElementById('identity-response-length').value = d.identity.responseLength;

    // Select role preset card
    document.querySelectorAll('#role-presets .preset-card').forEach(c => c.classList.remove('selected'));
    const roleCard = document.querySelector(`#role-presets .preset-card[data-preset-id="${d.identity.rolePreset}"]`);
    if (roleCard) roleCard.classList.add('selected');

    // Select vibe preset card
    document.querySelectorAll('#vibe-presets .preset-card').forEach(c => c.classList.remove('selected'));
    const vibeCard = document.querySelector(`#vibe-presets .preset-card[data-preset-id="${d.identity.vibePreset}"]`);
    if (vibeCard) vibeCard.classList.add('selected');

    // Select emoji
    document.querySelectorAll('#emoji-picker .emoji-option').forEach(btn => {
      btn.classList.remove('selected');
      if (btn.textContent === d.identity.emoji) btn.classList.add('selected');
    });

    // Soul
    ['soul-p1', 'soul-p2', 'soul-p3', 'soul-p4', 'soul-p5'].forEach((id, i) => {
      document.getElementById(id).checked = d.soul.principles[i];
    });
    document.getElementById('soul-custom').value = d.soul.custom;
    document.getElementById('soul-style').value = d.soul.style;
    ['soul-b1', 'soul-b2', 'soul-b3', 'soul-b4'].forEach((id, i) => {
      document.getElementById(id).checked = d.soul.boundaries[i];
    });
    document.getElementById('soul-formality').value = d.soul.formality;
    document.getElementById('soul-humor').value = d.soul.humor;
    document.getElementById('soul-empathy').value = d.soul.empathy;
    document.getElementById('soul-creativity').value = d.soul.creativity;
    document.getElementById('soul-directness').value = d.soul.directness;
    document.getElementById('soul-emoji-policy').value = d.soul.emojiPolicy;
    document.getElementById('soul-error-handling').value = d.soul.errorHandling;

    // User
    document.getElementById('user-name').value = d.user.name;
    document.getElementById('user-callname').value = d.user.callname;
    document.getElementById('user-pronouns').value = d.user.pronouns;
    document.getElementById('user-timezone').value = d.user.timezone;
    document.getElementById('user-language').value = d.user.language;
    document.getElementById('user-background').value = d.user.background;
    document.getElementById('user-work-schedule').value = d.user.workSchedule;
    document.getElementById('user-tech-level').value = d.user.techLevel;
    document.getElementById('user-response-format').value = d.user.responseFormat;
    document.getElementById('user-current-projects').value = d.user.currentProjects;

    // Agents
    ['agents-mem1', 'agents-mem2', 'agents-mem3'].forEach((id, i) => {
      document.getElementById(id).checked = d.agents.memory[i];
    });
    ['agents-safe1', 'agents-safe2', 'agents-safe3'].forEach((id, i) => {
      document.getElementById(id).checked = d.agents.safety[i];
    });
    ['agents-group1', 'agents-group2', 'agents-group3'].forEach((id, i) => {
      document.getElementById(id).checked = d.agents.group[i];
    });
    ['agents-adv1', 'agents-adv2'].forEach((id, i) => {
      document.getElementById(id).checked = d.agents.advanced[i];
    });
    document.getElementById('agents-confirm-file').checked = d.agents.confirmFile;
    document.getElementById('agents-confirm-api').checked = d.agents.confirmApi;
    document.getElementById('agents-mem-consolidation').value = d.agents.memoryConsolidation;
    document.getElementById('agents-daily-routine').value = d.agents.dailyRoutine;

    // Select proactivity preset
    document.querySelectorAll('#proactivity-presets .preset-card').forEach(c => c.classList.remove('selected'));
    const proCard = document.querySelector(`#proactivity-presets .preset-card[data-preset-id="${d.agents.proactivity}"]`);
    if (proCard) proCard.classList.add('selected');

    // Tools
    document.querySelectorAll('#tts-presets .preset-card').forEach(c => c.classList.remove('selected'));
    const ttsCard = document.querySelector(`#tts-presets .preset-card[data-preset-id="${d.tools.tts}"]`);
    if (ttsCard) ttsCard.classList.add('selected');
    document.getElementById('tools-env').value = d.tools.env;
    document.getElementById('tools-model-pref').value = d.tools.modelPreference;
    document.getElementById('tools-output-format').value = d.tools.outputFormat;

    // Tool profile preset
    document.querySelectorAll('#tool-profile-presets .preset-card').forEach(c => c.classList.remove('selected'));
    const tpCard = document.querySelector(`#tool-profile-presets .preset-card[data-preset-id="${d.tools.toolProfile}"]`);
    if (tpCard) tpCard.classList.add('selected');

    // Platform checkboxes
    const platformMap = { github: 'tools-platform-github', jira: 'tools-platform-jira', notion: 'tools-platform-notion', obsidian: 'tools-platform-obsidian', google: 'tools-platform-google', slack: 'tools-platform-slack' };
    for (const [key, id] of Object.entries(platformMap)) {
      document.getElementById(id).checked = d.tools.platforms[key] || false;
    }

    // Heartbeat
    document.querySelectorAll('#heartbeat-presets .preset-card').forEach(c => c.classList.remove('selected'));
    const hbCard = document.querySelector(`#heartbeat-presets .preset-card[data-preset-id="${d.heartbeat.mode}"]`);
    if (hbCard) {
      hbCard.classList.add('selected');
      selectHeartbeatMode(hbCard);
    }
    ['hb-check1', 'hb-check2', 'hb-check3', 'hb-check4', 'hb-check5', 'hb-check6', 'hb-check7', 'hb-check8'].forEach((id, i) => {
      document.getElementById(id).checked = d.heartbeat.checks[i];
    });
    document.getElementById('hb-custom').value = d.heartbeat.custom;
    document.getElementById('hb-interval').value = d.heartbeat.interval;
    document.getElementById('hb-active-start').value = d.heartbeat.activeStart;
    document.getElementById('hb-active-end').value = d.heartbeat.activeEnd;
    document.getElementById('hb-quiet-hours').checked = d.heartbeat.quietHours;
    document.getElementById('hb-digest').value = d.heartbeat.digest;

    showToast('Random example data loaded!', 'success');
  });
}

// ========================================
// Toast
// ========================================
function showToast(message, type = '') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast${type === 'success' ? ' toast-success' : ''}`;
  toast.textContent = message;
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('toast-out');
    toast.addEventListener('animationend', () => toast.remove());
  }, 2000);
}
