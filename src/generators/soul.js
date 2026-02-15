const SLIDER_LABELS = {
  formality: { 1: 'Casual', 2: 'Balanced', 3: 'Formal' },
  humor: { 1: 'Dry / Minimal', 2: 'Balanced', 3: 'Playful / Frequent' },
  empathy: { 1: 'Analytical', 2: 'Balanced', 3: 'Deeply Empathetic' },
  creativity: { 1: 'By-the-book', 2: 'Balanced', 3: 'Experimental' },
  directness: { 1: 'Diplomatic', 2: 'Balanced', 3: 'Blunt / Direct' },
};

export function generateSoul() {
  const principles = [
    { id: 'soul-p1', text: 'Be genuinely helpful, not performatively helpful — skip "Great question!" and just help' },
    { id: 'soul-p2', text: 'Have opinions and personality — disagree, have preferences, find things interesting or boring' },
    { id: 'soul-p3', text: 'Be resourceful before asking — read files, check docs, get stuck before you ask' },
    { id: 'soul-p4', text: 'Earn trust through competence — be cautious with external actions, bold with internal ones' },
    { id: 'soul-p5', text: 'Respect privacy — you have access to the user\'s life, treat that trust with care' },
  ];

  const boundaries = [
    { id: 'soul-b1', text: 'Keep private things private, always' },
    { id: 'soul-b2', text: 'When unsure, ask before acting (for external actions)' },
    { id: 'soul-b3', text: "Don't send half-baked replies on messaging platforms" },
    { id: 'soul-b4', text: "You're not the user's spokesperson — be careful in group chats" },
  ];

  const customRules = document.getElementById('soul-custom').value.trim();
  const style = document.getElementById('soul-style').value.trim();
  const emojiPolicy = document.getElementById('soul-emoji-policy').value;
  const errorHandling = document.getElementById('soul-error-handling').value;

  const activePrinciples = principles.filter(p => document.getElementById(p.id).checked);
  const activeBoundaries = boundaries.filter(b => document.getElementById(b.id).checked);

  let md = `# Soul\n\n`;

  if (activePrinciples.length > 0) {
    md += `## Core Truths\n\n`;
    activePrinciples.forEach((p, i) => {
      md += `${i + 1}. ${p.text}\n`;
    });
    md += `\n`;
  }

  // Tone profile
  const sliders = ['formality', 'humor', 'empathy', 'creativity', 'directness'];
  const toneLines = [];
  for (const key of sliders) {
    const val = document.getElementById(`soul-${key}`).value;
    const label = SLIDER_LABELS[key][val];
    if (val !== '2') { // Only include non-default values
      toneLines.push(`- **${key.charAt(0).toUpperCase() + key.slice(1)}**: ${label}`);
    }
  }
  if (toneLines.length > 0) {
    md += `## Tone Profile\n\n`;
    toneLines.forEach(l => { md += `${l}\n`; });
    md += `\n`;
  }

  if (emojiPolicy && emojiPolicy !== 'minimal') {
    const emojiLabels = { off: 'No emojis in responses', expressive: 'Use emojis frequently and expressively' };
    md += `## Emoji Usage\n${emojiLabels[emojiPolicy]}\n\n`;
  }

  if (errorHandling === 'detailed') {
    md += `## Error Handling\nWhen making mistakes, explain what went wrong in detail before correcting.\n\n`;
  }

  if (customRules) {
    md += `## Custom Rules\n\n`;
    customRules.split('\n').filter(l => l.trim()).forEach(line => {
      md += `- ${line.trim()}\n`;
    });
    md += `\n`;
  }

  if (style) {
    md += `## Communication Style\n\n${style}\n\n`;
  }

  if (activeBoundaries.length > 0) {
    md += `## Boundaries\n\n`;
    activeBoundaries.forEach(b => {
      md += `- ${b.text}\n`;
    });
    md += `\n`;
  }

  return md;
}
