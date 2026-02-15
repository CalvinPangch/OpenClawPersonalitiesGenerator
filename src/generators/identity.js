export function generateIdentity() {
  const name = document.getElementById('identity-name').value.trim() || 'Assistant';
  const role = document.getElementById('identity-role').value.trim() || 'Personal AI assistant';
  const vibe = document.getElementById('identity-vibe').value.trim() || 'Friendly and helpful';
  const greeting = document.getElementById('identity-greeting').value.trim();
  const responseLength = document.getElementById('identity-response-length').value;

  // Get selected emoji
  const selectedEmoji = document.querySelector('#emoji-picker .emoji-option.selected');
  const customEmoji = document.getElementById('identity-emoji-custom').value.trim();
  const emoji = customEmoji || (selectedEmoji ? selectedEmoji.textContent : '🦞');

  let md = `# Identity\n\n`;
  md += `## Name\n${name}\n\n`;
  md += `## Role\n${role}\n\n`;
  md += `## Communication Vibe\n${vibe}\n\n`;
  md += `## Signature Emoji\n${emoji}\n\n`;

  if (greeting) {
    md += `## Greeting\n${greeting}\n\n`;
  }

  if (responseLength) {
    const labels = { concise: 'Concise — short and to the point', balanced: 'Balanced — adapts to the question', thorough: 'Thorough — detailed explanations' };
    md += `## Response Length\n${labels[responseLength] || responseLength}\n\n`;
  }

  md += `## Avatar\n<!-- Add your avatar image path here if desired -->\n<!-- avatar: ./assets/avatar.png -->\n`;

  return md;
}
