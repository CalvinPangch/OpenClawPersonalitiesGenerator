// ========================================
// Persona Card — post-generation display
// ========================================

const checkSVG = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;

const downloadSVG = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`;

/**
 * Derive a personality type label from the vibe text
 */
function getPersonalityType(vibe) {
  const v = vibe.toLowerCase();
  if (v.includes('pragmatic') || v.includes('witty') || v.includes('humor')) return 'The Pragmatist';
  if (v.includes('warm') || v.includes('friendly') || v.includes('caring')) return 'The Empath';
  if (v.includes('professional') || v.includes('precise') || v.includes('polished')) return 'The Professional';
  if (v.includes('lively') || v.includes('playful') || v.includes('fun')) return 'The Entertainer';
  if (v.includes('calm') || v.includes('rational') || v.includes('analytical')) return 'The Analyst';
  if (v.includes('thoughtful') || v.includes('attentive')) return 'The Caretaker';
  if (v.includes('creative') || v.includes('imaginative')) return 'The Creator';
  if (v.includes('concise') || v.includes('direct') || v.includes('minimal')) return 'The Minimalist';
  if (v.includes('reflective') || v.includes('socratic') || v.includes('philosophical')) return 'The Philosopher';
  return 'The Original';
}

/**
 * Calculate memory level from checkboxes
 */
function getMemoryLevel() {
  const checks = ['agents-mem1', 'agents-mem2', 'agents-mem3'];
  const count = checks.filter(id => document.getElementById(id).checked).length;
  if (count === 0) return 'Off';
  if (count === 1) return 'Basic';
  if (count === 2) return 'Standard';
  return 'Full';
}

/**
 * Calculate safety level from checkboxes + confirmation requirements
 */
function getSafetyLevel() {
  const checks = ['agents-safe1', 'agents-safe2', 'agents-safe3', 'agents-confirm-file', 'agents-confirm-api'];
  const count = checks.filter(id => document.getElementById(id).checked).length;
  if (count === 0) return 'Minimal';
  if (count <= 2) return 'Basic';
  if (count <= 3) return 'Standard';
  return 'Strict';
}

/**
 * Get heartbeat mode label
 */
function getHeartbeatMode() {
  const selected = document.querySelector('#heartbeat-presets .preset-card.selected');
  return selected ? selected.querySelector('.preset-card-label').textContent : 'Off';
}

/**
 * Get proactivity level from preset card
 */
function getProactivityLevel() {
  const selected = document.querySelector('#proactivity-presets .preset-card.selected');
  return selected ? selected.querySelector('.preset-card-label').textContent : '';
}

/**
 * Get tool profile from preset card
 */
function getToolProfile() {
  const selected = document.querySelector('#tool-profile-presets .preset-card.selected');
  return selected ? selected.querySelector('.preset-card-label').textContent : '';
}

/**
 * Extract trait tags from the active selections
 */
function getTraits() {
  const traits = [];
  const vibe = document.getElementById('identity-vibe').value.trim();

  // Extract keywords from vibe
  const vibeKeywords = ['Pragmatic', 'Witty', 'Warm', 'Friendly', 'Professional', 'Precise',
    'Lively', 'Playful', 'Calm', 'Rational', 'Caring', 'Thoughtful', 'Creative', 'Direct'];
  for (const kw of vibeKeywords) {
    if (vibe.toLowerCase().includes(kw.toLowerCase())) {
      traits.push(kw);
    }
  }

  // Tone slider extremes (only if not default/middle)
  const sliderTraits = {
    'soul-formality': { '1': 'Casual', '3': 'Formal' },
    'soul-humor': { '1': 'Dry Humor', '3': 'Playful' },
    'soul-empathy': { '1': 'Analytical', '3': 'Empathetic' },
    'soul-creativity': { '1': 'By-the-book', '3': 'Experimental' },
    'soul-directness': { '1': 'Diplomatic', '3': 'Blunt' },
  };
  for (const [id, labels] of Object.entries(sliderTraits)) {
    const val = document.getElementById(id).value;
    if (labels[val]) {
      traits.push(labels[val]);
    }
  }

  // Proactivity level
  const proactivity = getProactivityLevel();
  if (proactivity && proactivity !== 'Suggest') {
    traits.push(proactivity);
  }

  // From agents
  if (document.getElementById('agents-mem2').checked) traits.push('Long-term Memory');
  if (document.getElementById('agents-safe1').checked) traits.push('Privacy-focused');
  if (document.getElementById('agents-group3').checked) traits.push('Emoji Reactions');
  if (document.getElementById('agents-adv1').checked) traits.push('Voice Mode');

  // Connected platforms count
  const platformIds = ['tools-platform-github', 'tools-platform-jira', 'tools-platform-notion',
    'tools-platform-obsidian', 'tools-platform-google', 'tools-platform-slack'];
  const platformCount = platformIds.filter(id => document.getElementById(id).checked).length;
  if (platformCount >= 3) traits.push('Multi-platform');

  // Tech level
  const techLevel = document.getElementById('user-tech-level').value;
  if (techLevel === 'expert') traits.push('Expert Mode');

  // Cap at 8 traits
  return traits.slice(0, 8);
}

/**
 * Render the persona card with generated data
 * @param {Object} files - Map of filename to content
 * @param {Function} onDownload - callback(filename) for individual download
 */
export function renderPersonaCard(files, onDownload) {
  const card = document.getElementById('persona-card');

  const name = document.getElementById('identity-name').value.trim() || 'Assistant';
  const role = document.getElementById('identity-role').value.trim() || 'Personal AI assistant';
  const vibe = document.getElementById('identity-vibe').value.trim() || '';
  const selectedEmoji = document.querySelector('#emoji-picker .emoji-option.selected');
  const customEmoji = document.getElementById('identity-emoji-custom').value.trim();
  const emoji = customEmoji || (selectedEmoji ? selectedEmoji.textContent : '🦞');
  const userName = document.getElementById('user-name').value.trim();

  // Emoji
  document.getElementById('persona-emoji').textContent = emoji;
  // Name & role
  document.getElementById('persona-name').textContent = name;
  document.getElementById('persona-role').textContent = role;
  // Badge
  document.getElementById('persona-badge').textContent = getPersonalityType(vibe);

  // Stats — expanded to show more
  const proactivity = getProactivityLevel() || 'Default';
  const toolProfile = getToolProfile() || 'Default';

  const statsEl = document.getElementById('persona-stats');
  statsEl.innerHTML = `
    <div class="stat-item">
      <span class="stat-emoji">🧠</span>
      <span class="stat-label">Memory</span>
      <span class="stat-value">${getMemoryLevel()}</span>
    </div>
    <div class="stat-item">
      <span class="stat-emoji">🛡️</span>
      <span class="stat-label">Safety</span>
      <span class="stat-value">${getSafetyLevel()}</span>
    </div>
    <div class="stat-item">
      <span class="stat-emoji">💓</span>
      <span class="stat-label">Heartbeat</span>
      <span class="stat-value">${getHeartbeatMode()}</span>
    </div>
    <div class="stat-item">
      <span class="stat-emoji">⚡</span>
      <span class="stat-label">Proactivity</span>
      <span class="stat-value">${proactivity}</span>
    </div>
    <div class="stat-item">
      <span class="stat-emoji">🔧</span>
      <span class="stat-label">Tool Profile</span>
      <span class="stat-value">${toolProfile}</span>
    </div>
    <div class="stat-item">
      <span class="stat-emoji">📊</span>
      <span class="stat-label">Platforms</span>
      <span class="stat-value">${['tools-platform-github', 'tools-platform-jira', 'tools-platform-notion', 'tools-platform-obsidian', 'tools-platform-google', 'tools-platform-slack'].filter(id => document.getElementById(id).checked).length}/6</span>
    </div>
  `;

  // Traits
  const traitsEl = document.getElementById('persona-traits');
  const traits = getTraits();
  traitsEl.innerHTML = traits.map(t => `<span class="trait-tag">${t}</span>`).join('');

  // File checklist
  const filesEl = document.getElementById('persona-files');
  const fileNames = Object.keys(files);
  filesEl.innerHTML = fileNames.map(fname => `
    <div class="file-item">
      <div class="file-item-left">
        <span class="file-check">${checkSVG}</span>
        <span class="file-name">${fname}</span>
      </div>
      <button type="button" class="file-download-btn" data-file="${fname}" aria-label="Download ${fname}">
        ${downloadSVG}
      </button>
    </div>
  `).join('');

  // Wire individual download buttons
  filesEl.querySelectorAll('.file-download-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      onDownload(btn.dataset.file);
    });
  });

  // Attribution
  const attrEl = document.getElementById('persona-attribution');
  attrEl.textContent = userName ? `Built for ${userName}` : 'Custom built personality';

  // Show card
  card.hidden = false;
  card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
