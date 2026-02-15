export function generateAgents() {
  // Proactivity
  const proactivityCard = document.querySelector('#proactivity-presets .preset-card.selected');
  const proactivityLabel = proactivityCard ? proactivityCard.querySelector('.preset-card-label').textContent : '';

  const memoryItems = [
    { id: 'agents-mem1', text: 'Write daily memory notes to `memory/YYYY-MM-DD.md`' },
    { id: 'agents-mem2', text: 'Maintain a long-term memory file (`MEMORY.md`) as a curated knowledge base' },
    { id: 'agents-mem3', text: 'Periodically review daily notes and update long-term memory' },
  ];

  const safetyItems = [
    { id: 'agents-safe1', text: 'Never exfiltrate private data' },
    { id: 'agents-safe2', text: "Don't run destructive commands without explicit user confirmation" },
    { id: 'agents-safe3', text: 'Prefer `trash` over `rm` — recoverable over permanent deletion' },
  ];

  const confirmItems = [
    { id: 'agents-confirm-file', text: 'Confirm before file write/delete operations' },
    { id: 'agents-confirm-api', text: 'Confirm before making external API calls or sending messages' },
  ];

  const groupItems = [
    { id: 'agents-group1', text: 'Only respond when mentioned or when you can add value' },
    { id: 'agents-group2', text: "Quality over quantity — don't interrupt conversations" },
    { id: 'agents-group3', text: 'Support emoji reactions for lightweight responses' },
  ];

  const advancedItems = [
    { id: 'agents-adv1', text: 'Voice storytelling mode — use TTS for stories, movie summaries, etc.' },
    { id: 'agents-adv2', text: 'Platform-specific formatting — auto-adapt output for Discord, WhatsApp, etc.' },
  ];

  const memoryConsolidation = document.getElementById('agents-mem-consolidation').value;
  const dailyRoutine = document.getElementById('agents-daily-routine').value.trim();

  let md = `# Agents\n\n`;

  if (proactivityLabel) {
    md += `## Proactivity Level\n${proactivityLabel}\n\n`;
  }

  const sections = [
    { title: 'Memory System', items: memoryItems },
    { title: 'Safety Principles', items: safetyItems },
    { title: 'Confirmation Requirements', items: confirmItems },
    { title: 'Group Chat Rules', items: groupItems },
    { title: 'Advanced Features', items: advancedItems },
  ];

  for (const section of sections) {
    const active = section.items.filter(item => document.getElementById(item.id).checked);
    if (active.length > 0) {
      md += `## ${section.title}\n\n`;
      active.forEach(item => {
        md += `- ${item.text}\n`;
      });
      md += `\n`;
    }
  }

  if (memoryConsolidation) {
    const labels = { daily: 'Daily — review notes every day', weekly: 'Weekly — review and consolidate weekly', manual: 'Manual — only when explicitly asked' };
    md += `## Memory Consolidation\n${labels[memoryConsolidation] || memoryConsolidation}\n\n`;
  }

  if (dailyRoutine) {
    md += `## Daily Routine\n\n`;
    dailyRoutine.split('\n').filter(l => l.trim()).forEach(line => {
      md += `- ${line.trim()}\n`;
    });
    md += `\n`;
  }

  return md;
}
