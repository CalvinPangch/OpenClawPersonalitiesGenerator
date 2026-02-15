export function generateTools() {
  const toolProfileCard = document.querySelector('#tool-profile-presets .preset-card.selected');
  const toolProfile = toolProfileCard ? toolProfileCard.querySelector('.preset-card-label').textContent : '';

  const selectedTTS = document.querySelector('#tts-presets .preset-card.selected');
  const ttsLabel = selectedTTS ? selectedTTS.querySelector('.preset-card-label').textContent : '';

  const modelPref = document.getElementById('tools-model-pref').value;
  const outputFormat = document.getElementById('tools-output-format').value;
  const envNotes = document.getElementById('tools-env').value.trim();

  // Connected platforms
  const platforms = [
    { id: 'tools-platform-github', label: 'GitHub' },
    { id: 'tools-platform-jira', label: 'Jira' },
    { id: 'tools-platform-notion', label: 'Notion' },
    { id: 'tools-platform-obsidian', label: 'Obsidian' },
    { id: 'tools-platform-google', label: 'Google Workspace' },
    { id: 'tools-platform-slack', label: 'Slack' },
  ];
  const activePlatforms = platforms.filter(p => document.getElementById(p.id).checked);

  let md = `# Tools\n\n`;

  if (toolProfile) {
    md += `## Tool Profile\n${toolProfile}\n\n`;
  }

  if (activePlatforms.length > 0) {
    md += `## Connected Platforms\n\n`;
    activePlatforms.forEach(p => {
      md += `- ${p.label}\n`;
    });
    md += `\n`;
  }

  if (modelPref) {
    const labels = { fast: 'Fast — prioritize speed and cost', balanced: 'Balanced — good quality, reasonable speed', best: 'Best quality — use the most capable model' };
    md += `## Model Preference\n${labels[modelPref] || modelPref}\n\n`;
  }

  if (outputFormat) {
    md += `## Output Format\n${outputFormat.charAt(0).toUpperCase() + outputFormat.slice(1)}\n\n`;
  }

  if (ttsLabel) {
    md += `## TTS Voice Preference\n${ttsLabel}\n\n`;
  }

  if (envNotes) {
    md += `## Environment Notes\n${envNotes}\n\n`;
  }

  return md;
}
