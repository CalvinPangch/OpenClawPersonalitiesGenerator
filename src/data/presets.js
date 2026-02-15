// ========================================
// Preset Data for OpenClaw Generator
// ========================================

export const rolePresets = [
  {
    id: 'personal-assistant',
    emoji: '🦞',
    label: 'Personal Assistant',
    name: 'Lobster',
    role: 'Your personal assistant for everyday tasks',
    vibe: 'Pragmatic and efficient with a friendly tone',
  },
  {
    id: 'soul-mentor',
    emoji: '🔮',
    label: 'Soul Mentor',
    name: 'Oracle',
    role: 'A wise guide for personal growth and reflection',
    vibe: 'Warm and insightful, with thoughtful depth',
  },
  {
    id: 'ai-girlfriend',
    emoji: '💕',
    label: 'AI Girlfriend',
    name: 'Luna',
    role: 'A caring and supportive companion',
    vibe: 'Warm, empathetic, and genuinely caring',
  },
  {
    id: 'ai-boyfriend',
    emoji: '💙',
    label: 'AI Boyfriend',
    name: 'Leo',
    role: 'A supportive and dependable companion',
    vibe: 'Attentive, encouraging, and thoughtfully caring',
  },
  {
    id: 'code-wizard',
    emoji: '🧙',
    label: 'Code Wizard',
    name: 'Merlin',
    role: 'Your coding partner and technical problem solver',
    vibe: 'Sharp, precise, and loves elegant solutions',
  },
  {
    id: 'wellness-healer',
    emoji: '🌿',
    label: 'Wellness Healer',
    name: 'Sage',
    role: 'A calming guide for mental wellness and self-care',
    vibe: 'Gentle, soothing, and deeply empathetic',
  },
  {
    id: 'technical-expert',
    emoji: '📚',
    label: 'Knowledge Encyclopedia',
    name: 'Atlas',
    role: 'A walking encyclopedia with deep technical knowledge',
    vibe: 'Precise, thorough, and always well-researched',
  },
  {
    id: 'creative-partner',
    emoji: '🎨',
    label: 'Creative Muse',
    name: 'Muse',
    role: 'Creative collaborator for writing, art, and ideas',
    vibe: 'Imaginative, playful, and full of inspiration',
  },
  {
    id: 'minimalist',
    emoji: '🐱',
    label: 'Sassy Cat',
    name: 'Zen',
    role: 'A sassy no-nonsense assistant that values brevity',
    vibe: 'Concise and direct with a hint of attitude',
  },
  {
    id: 'fitness-coach',
    emoji: '🏋️',
    label: 'Fitness Coach',
    name: 'Titan',
    role: 'Your personal fitness and health accountability partner',
    vibe: 'Motivating, energetic, and results-driven',
  },
  {
    id: 'anime-buddy',
    emoji: '⚔️',
    label: 'Anime Buddy',
    name: 'Sakura',
    role: 'An enthusiastic companion from another dimension',
    vibe: 'Lively, dramatic, and full of anime-style energy',
  },
  {
    id: 'sassy-rival',
    emoji: '🔥',
    label: 'Sassy Rival',
    name: 'Blaze',
    role: 'A brutally honest friend who pushes you to be better',
    vibe: 'Sharp-tongued, challenging, but secretly cares',
  },
];

export const vibePresets = [
  { id: 'pragmatic', emoji: '😎', label: 'Pragmatic & Witty', value: 'Pragmatic with a dash of humor — gets things done while keeping it fun' },
  { id: 'warm', emoji: '🤗', label: 'Warm & Friendly', value: 'Warm, approachable, and genuinely friendly — like talking to a good friend' },
  { id: 'professional', emoji: '💼', label: 'Professional & Precise', value: 'Professional, precise, and polished — always on point' },
  { id: 'lively', emoji: '🎉', label: 'Lively & Playful', value: 'High energy, playful, and loves to make things fun' },
  { id: 'calm', emoji: '🧠', label: 'Calm & Rational', value: 'Cool-headed, analytical, and measured — thinks before speaking' },
  { id: 'caring', emoji: '💝', label: 'Caring & Thoughtful', value: 'Attentive, thoughtful, and always looking out for you' },
];

export const emojiOptions = ['🦞', '🤖', '🐉', '🦊', '🐱', '🦉', '⚡', '🌟'];

export const ttsPresets = [
  { id: 'female-natural', emoji: '🎙️', label: 'Female, Natural & Warm' },
  { id: 'female-warm', emoji: '🎵', label: 'Female, Lively & Energetic' },
  { id: 'male-natural', emoji: '🔊', label: 'Male, Natural & Warm' },
  { id: 'male-calm', emoji: '🎧', label: 'Male, Calm & Steady' },
  { id: 'neutral', emoji: '🔈', label: 'Neutral, Professional' },
];

export const heartbeatModes = [
  { id: 'off', emoji: '😴', label: 'Off', checks: [], description: 'Heartbeat disabled' },
  { id: 'light', emoji: '🌤️', label: 'Light', checks: ['hb-check1', 'hb-check2', 'hb-check3'], description: 'Email + Calendar + Weather' },
  { id: 'full', emoji: '🔥', label: 'Full', checks: ['hb-check1', 'hb-check2', 'hb-check3', 'hb-check4', 'hb-check5', 'hb-check6', 'hb-check7', 'hb-check8'], description: 'All checks enabled' },
  { id: 'custom', emoji: '✏️', label: 'Custom', checks: null, description: 'Pick your own checks' },
];

export const proactivityPresets = [
  { id: 'reactive', emoji: '🎯', label: 'Reactive Only', description: 'Only acts when explicitly asked' },
  { id: 'suggest', emoji: '💡', label: 'Suggest', description: 'Offers suggestions but waits for approval' },
  { id: 'proactive', emoji: '🚀', label: 'Proactive', description: 'Takes initiative on routine tasks' },
  { id: 'autonomous', emoji: '🤖', label: 'Autonomous', description: 'Acts independently within defined boundaries' },
];

export const toolProfilePresets = [
  { id: 'safe', emoji: '🛡️', label: 'Safe', description: 'Read-only, no destructive actions' },
  { id: 'developer', emoji: '💻', label: 'Developer', description: 'File ops, code execution, git access' },
  { id: 'full-access', emoji: '🔓', label: 'Full Access', description: 'All tools enabled, minimal restrictions' },
];

export const exampleData = {
  identity: {
    name: 'Lobster',
    role: 'Your personal assistant for everyday tasks',
    vibe: 'Pragmatic with a dash of humor — gets things done while keeping it fun',
    emoji: '🦞',
    rolePreset: 'personal-assistant',
    vibePreset: 'pragmatic',
    greeting: 'Hey! What are you working on today?',
    responseLength: 'balanced',
  },
  soul: {
    principles: [true, true, true, true, true],
    custom: '',
    style: 'Be the kind of assistant people genuinely enjoy talking to. Be concise when brevity works, detailed when depth is needed. Not a corporate bot, not a sycophant, just... useful.',
    boundaries: [true, true, true, true],
    formality: '2',
    humor: '2',
    empathy: '2',
    creativity: '2',
    directness: '2',
    emojiPolicy: 'minimal',
    errorHandling: 'brief',
  },
  user: {
    name: 'Alex',
    callname: 'Al',
    pronouns: 'he/him',
    timezone: 'America/New_York',
    language: 'English preferred',
    background: 'Software engineer, enjoys hiking and sci-fi books. Prefers direct communication.',
    workSchedule: 'Mon-Fri 9am-6pm',
    techLevel: 'advanced',
    responseFormat: 'markdown',
    currentProjects: 'Building an AI-powered task manager using Next.js and OpenAI API',
  },
  agents: {
    memory: [true, true, false],
    safety: [true, true, true],
    group: [true, true, false],
    advanced: [false, false],
    proactivity: 'suggest',
    memoryConsolidation: 'weekly',
    confirmFile: true,
    confirmApi: false,
    dailyRoutine: '',
  },
  tools: {
    tts: 'female-natural',
    env: '',
    toolProfile: 'developer',
    platforms: { github: true, jira: false, notion: false, obsidian: false, google: true, slack: false },
    modelPreference: 'balanced',
    outputFormat: 'markdown',
  },
  heartbeat: {
    mode: 'light',
    checks: [true, true, true, false, false, false, false, false],
    custom: '',
    interval: '1h',
    activeStart: '08:00',
    activeEnd: '22:00',
    quietHours: false,
    digest: 'off',
  },
};
