export const STORAGE_KEY = 'full-stack-tutor:pilot:v1';
export const STATE_VERSION = 1;

const EXPERIENCE_LEVELS = new Set(['beginner', 'some-coding', 'experienced']);
const GOALS = new Set(['build-todo', 'understand-architecture', 'practice-javascript']);
const LANGUAGES = new Set(['English']);
const SESSION_MINUTES = new Set(['15', '20', '30']);

export function createInitialState() {
  return {
    schemaVersion: STATE_VERSION,
    mode: 'offline-practice',
    profile: {
      experience: '',
      goal: 'build-todo',
      language: 'English',
      sessionMinutes: '20'
    },
    currentLessonId: 'orientation',
    completedLessonIds: [],
    orientationAnswer: '',
    exercise: {
      title: '',
      checked: false,
      passed: false
    },
    assistance: [],
    lastUpdated: null
  };
}

function choose(value, allowed, fallback) {
  return allowed.has(value) ? value : fallback;
}

export function normalizeState(candidate) {
  const initial = createInitialState();
  const source = candidate && typeof candidate === 'object' ? candidate : {};
  const profile = source.profile && typeof source.profile === 'object' ? source.profile : {};
  const exercise = source.exercise && typeof source.exercise === 'object' ? source.exercise : {};
  const completed = Array.isArray(source.completedLessonIds)
    ? source.completedLessonIds.filter((id) => typeof id === 'string')
    : [];
  const assistance = Array.isArray(source.assistance)
    ? source.assistance.filter((item) => typeof item === 'string').slice(-20)
    : [];

  return {
    ...initial,
    schemaVersion: STATE_VERSION,
    mode: 'offline-practice',
    profile: {
      experience: choose(profile.experience, EXPERIENCE_LEVELS, initial.profile.experience),
      goal: choose(profile.goal, GOALS, initial.profile.goal),
      language: choose(profile.language, LANGUAGES, initial.profile.language),
      sessionMinutes: choose(String(profile.sessionMinutes), SESSION_MINUTES, initial.profile.sessionMinutes)
    },
    currentLessonId: source.currentLessonId === 'todo-title-validation'
      ? 'todo-title-validation'
      : initial.currentLessonId,
    completedLessonIds: [...new Set(completed)].filter((id) =>
      id === 'orientation' || id === 'todo-title-validation'
    ),
    orientationAnswer: typeof source.orientationAnswer === 'string'
      ? source.orientationAnswer.slice(0, 1000)
      : '',
    exercise: {
      title: typeof exercise.title === 'string' ? exercise.title.slice(0, 200) : '',
      checked: Boolean(exercise.checked),
      passed: Boolean(exercise.passed)
    },
    assistance,
    lastUpdated: typeof source.lastUpdated === 'string' ? source.lastUpdated : null
  };
}

export function loadState(storage = globalThis.localStorage) {
  if (!storage) return createInitialState();
  try {
    return normalizeState(JSON.parse(storage.getItem(STORAGE_KEY) || 'null'));
  } catch {
    return createInitialState();
  }
}

export function saveState(state, storage = globalThis.localStorage) {
  const normalized = normalizeState({...state, lastUpdated: new Date().toISOString()});
  if (storage) storage.setItem(STORAGE_KEY, JSON.stringify(normalized));
  return normalized;
}

export function resetState(storage = globalThis.localStorage) {
  if (storage) storage.removeItem(STORAGE_KEY);
  return createInitialState();
}

export function exportState(state) {
  const safe = normalizeState(state);
  return JSON.stringify({
    exportType: 'full-stack-tutor-progress',
    schemaVersion: STATE_VERSION,
    exportedAt: new Date().toISOString(),
    state: safe
  }, null, 2);
}

export function importState(serialized) {
  const parsed = JSON.parse(serialized);
  const candidate = parsed?.exportType === 'full-stack-tutor-progress' ? parsed.state : parsed;
  if (!candidate || typeof candidate !== 'object') throw new Error('Progress file must contain a progress object.');
  return normalizeState(candidate);
}

export function updateProfile(state, profile) {
  return normalizeState({...state, profile: {...state.profile, ...profile}});
}

export function markLessonComplete(state, lessonId) {
  return normalizeState({
    ...state,
    completedLessonIds: [...state.completedLessonIds, lessonId],
    currentLessonId: lessonId === 'orientation' ? 'todo-title-validation' : lessonId
  });
}

export function recordAssistance(state, kind) {
  return normalizeState({...state, assistance: [...state.assistance, kind]});
}

export function evaluateTodoTitle(rawTitle) {
  const title = String(rawTitle ?? '').trim();
  return {
    normalizedTitle: title,
    valid: title.length > 0,
    message: title.length > 0
      ? `Valid Todo title: “${title}”`
      : 'A Todo title needs at least one non-space character.'
  };
}
