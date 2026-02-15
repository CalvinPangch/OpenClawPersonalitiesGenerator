export function generateUser() {
  const name = document.getElementById('user-name').value.trim();
  const callname = document.getElementById('user-callname').value.trim();
  const pronouns = document.getElementById('user-pronouns').value;
  const timezone = document.getElementById('user-timezone').value;
  const language = document.getElementById('user-language').value;
  const techLevel = document.getElementById('user-tech-level').value;
  const workSchedule = document.getElementById('user-work-schedule').value.trim();
  const responseFormat = document.getElementById('user-response-format').value;
  const currentProjects = document.getElementById('user-current-projects').value.trim();
  const background = document.getElementById('user-background').value.trim();

  let md = `# User\n\n`;

  if (name) md += `## Name\n${name}\n\n`;
  if (callname) md += `## Call Me\n${callname}\n\n`;
  if (pronouns) md += `## Pronouns\n${pronouns}\n\n`;
  if (timezone) md += `## Timezone\n${timezone}\n\n`;
  if (language) md += `## Language\n${language}\n\n`;

  if (techLevel) {
    const labels = { beginner: 'Beginner — explain everything simply', intermediate: 'Intermediate — some technical language is OK', advanced: 'Advanced — skip the basics', expert: 'Expert — give me the raw details' };
    md += `## Tech Proficiency\n${labels[techLevel] || techLevel}\n\n`;
  }

  if (workSchedule) md += `## Work Schedule\n${workSchedule}\n\n`;

  if (responseFormat) {
    const labels = { markdown: 'Markdown (headers, lists, code blocks)', plain: 'Plain text', 'code-first': 'Code-first (show code, then explain)', bullets: 'Bullet points' };
    md += `## Response Format\n${labels[responseFormat] || responseFormat}\n\n`;
  }

  if (currentProjects) md += `## Current Projects\n${currentProjects}\n\n`;
  if (background) md += `## Background\n${background}\n\n`;

  return md;
}
