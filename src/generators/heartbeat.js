export function generateHeartbeat() {
  const selectedMode = document.querySelector('#heartbeat-presets .preset-card.selected');
  const modeLabel = selectedMode ? selectedMode.querySelector('.preset-card-label').textContent : 'Off';
  const modeId = selectedMode ? selectedMode.dataset.presetId : 'off';

  const checkItems = [
    { id: 'hb-check1', text: 'Check Email — any important unread messages?' },
    { id: 'hb-check2', text: 'Check Calendar — what\'s coming up in the next 24-48 hours?' },
    { id: 'hb-check3', text: 'Check Weather — do I need an umbrella today?' },
    { id: 'hb-check4', text: 'Check Social Notifications — any mentions on Twitter/social media?' },
    { id: 'hb-check5', text: 'Check Project Status — git status, CI/CD pipelines' },
    { id: 'hb-check6', text: 'Check System Health — disk space, CPU, memory, server uptime' },
    { id: 'hb-check7', text: 'Check News / RSS Feeds — scan relevant feeds for updates' },
    { id: 'hb-check8', text: 'Habit Tracking — water, breaks, exercise reminders' },
  ];

  const customTasks = document.getElementById('hb-custom').value.trim();
  const interval = document.getElementById('hb-interval').value;
  const activeStart = document.getElementById('hb-active-start').value;
  const activeEnd = document.getElementById('hb-active-end').value;
  const quietHours = document.getElementById('hb-quiet-hours').checked;
  const digest = document.getElementById('hb-digest').value;

  let md = `# Heartbeat\n\n`;

  md += `## Mode\n${modeLabel}\n\n`;

  if (modeId === 'off') {
    md += `Heartbeat is disabled. No periodic checks will run.\n`;
    return md;
  }

  // Schedule section
  const hasSchedule = interval || (activeStart && activeEnd) || quietHours;
  if (hasSchedule) {
    md += `## Schedule\n\n`;
    if (interval) {
      const labels = { '10m': 'Every 10 minutes', '15m': 'Every 15 minutes', '30m': 'Every 30 minutes', '1h': 'Every hour', '2h': 'Every 2 hours', '4h': 'Every 4 hours' };
      md += `- **Interval**: ${labels[interval] || interval}\n`;
    }
    if (activeStart && activeEnd) {
      md += `- **Active Hours**: ${activeStart} – ${activeEnd}\n`;
    }
    if (quietHours) {
      md += `- **Quiet Hours**: Enabled — suppress non-urgent notifications outside active hours\n`;
    }
    md += `\n`;
  }

  const activeChecks = checkItems.filter(item => document.getElementById(item.id).checked);
  if (activeChecks.length > 0) {
    md += `## Periodic Checks\n\n`;
    activeChecks.forEach(item => {
      md += `- ${item.text}\n`;
    });
    md += `\n`;
  }

  if (customTasks) {
    md += `## Custom Tasks\n\n`;
    customTasks.split('\n').filter(l => l.trim()).forEach(line => {
      md += `- ${line.trim()}\n`;
    });
    md += `\n`;
  }

  if (digest && digest !== 'off') {
    const labels = { daily: 'Daily summary digest', weekly: 'Weekly summary digest' };
    md += `## Digest\n${labels[digest]}\n\n`;
  }

  return md;
}
