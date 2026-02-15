export function renderTutorial() {
  return `
    <h2>How to Use the OpenClaw Personality Generator</h2>

    <h3>What is this?</h3>
    <p>
      This tool generates <strong>6 markdown configuration files</strong> that define your
      OpenClaw AI assistant's personality, behavior, and capabilities. These files are placed
      in your OpenClaw workspace directory and are injected into the system prompt.
    </p>

    <div class="info-box">
      OpenClaw is an open-source personal AI assistant that uses markdown files to define
      agent personality. Think of it as your AI's "soul configuration."
    </div>

    <h3>Quick Start</h3>
    <ol>
      <li><strong>Pick a role</strong> &mdash; click a preset card or type your own in the Identity tab</li>
      <li><strong>Customize each tab</strong> &mdash; adjust soul principles, user info, agent rules, tools, and heartbeat schedule</li>
      <li><strong>Generate</strong> &mdash; click "Generate All Files" to create your configuration</li>
      <li><strong>Download</strong> &mdash; grab individual files or download all at once</li>
      <li><strong>Place files</strong> &mdash; copy them into your OpenClaw workspace directory</li>
    </ol>

    <h3>The 6 Files</h3>
    <table>
      <thead>
        <tr><th>File</th><th>Purpose</th></tr>
      </thead>
      <tbody>
        <tr><td><code>IDENTITY.md</code></td><td>Name, role, communication vibe, signature emoji</td></tr>
        <tr><td><code>SOUL.md</code></td><td>Core behavioral principles, communication style, boundaries</td></tr>
        <tr><td><code>USER.md</code></td><td>Your name, pronouns, timezone, language, background</td></tr>
        <tr><td><code>AGENTS.md</code></td><td>Memory system, safety rules, group chat behavior, advanced features</td></tr>
        <tr><td><code>TOOLS.md</code></td><td>TTS voice preference, custom environment notes</td></tr>
        <tr><td><code>HEARTBEAT.md</code></td><td>Periodic check schedule (email, calendar, weather, etc.)</td></tr>
      </tbody>
    </table>

    <h3>Where to Place the Files</h3>
    <p>Copy the generated files into your OpenClaw workspace directory:</p>

    <table>
      <thead>
        <tr><th>OS</th><th>Default Path</th></tr>
      </thead>
      <tbody>
        <tr><td>macOS</td><td><code>~/.openclaw/workspace/</code></td></tr>
        <tr><td>Linux</td><td><code>~/.openclaw/workspace/</code></td></tr>
        <tr><td>Windows</td><td><code>%USERPROFILE%\\.openclaw\\workspace\\</code></td></tr>
      </tbody>
    </table>

    <p>Your workspace directory structure should look like:</p>
    <pre>.openclaw/workspace/
├── IDENTITY.md
├── SOUL.md
├── USER.md
├── AGENTS.md
├── TOOLS.md
└── HEARTBEAT.md</pre>

    <div class="warning-box">
      <strong>Note:</strong> If the workspace directory doesn't exist yet, create it manually.
      Make sure the file names match exactly (all uppercase with .md extension).
    </div>

    <h3>Tips</h3>
    <ul>
      <li>Use <strong>Load Example</strong> to see a fully configured personality</li>
      <li>You can edit the downloaded .md files directly &mdash; they're just plain text</li>
      <li>Not all sections are required. OpenClaw will use sensible defaults for missing fields</li>
      <li>The heartbeat feature requires the heartbeat module to be enabled in your OpenClaw installation</li>
    </ul>
  `;
}

export function setupTutorial() {
  const overlay = document.getElementById('tutorial-overlay');
  const body = document.getElementById('tutorial-body');
  const closeBtn = document.getElementById('tutorial-close');
  const openBtn = document.getElementById('btn-tutorial');

  body.innerHTML = renderTutorial();

  openBtn.addEventListener('click', () => {
    overlay.hidden = false;
    closeBtn.focus();
  });

  closeBtn.addEventListener('click', () => {
    overlay.hidden = true;
    openBtn.focus();
  });

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      overlay.hidden = true;
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !overlay.hidden) {
      overlay.hidden = true;
    }
  });
}
