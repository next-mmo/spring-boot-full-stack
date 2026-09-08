import test from 'node:test';
import assert from 'node:assert/strict';
import {
  createInitialState,
  evaluateTodoTitle,
  exportState,
  importState,
  normalizeState,
  saveState,
  STORAGE_KEY
} from './state.js';

function memoryStorage() {
  const values = new Map();
  return {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
    removeItem: (key) => values.delete(key)
  };
}

test('initial progress is offline and contains no provider secret field', () => {
  const state = createInitialState();
  assert.equal(state.mode, 'offline-practice');
  assert.equal(Object.hasOwn(state, 'apiKey'), false);
  assert.equal(Object.hasOwn(state.profile, 'apiKey'), false);
});

test('title exercise trims whitespace and rejects a blank title', () => {
  assert.deepEqual(evaluateTodoTitle('  Buy milk  '), {
    normalizedTitle: 'Buy milk',
    valid: true,
    message: 'Valid Todo title: “Buy milk”'
  });
  assert.equal(evaluateTodoTitle('  ').valid, false);
});

test('state round trip preserves progress and excludes injected credentials', () => {
  const state = saveState({
    ...createInitialState(),
    currentLessonId: 'todo-title-validation',
    completedLessonIds: ['orientation'],
    exercise: {title: 'Buy milk', checked: true, passed: true},
    apiKey: 'should-not-survive',
    profile: {experience: 'experienced', goal: 'build-todo', language: 'English', sessionMinutes: '15'}
  }, memoryStorage());
  const serialized = exportState(state);
  assert.equal(serialized.includes('should-not-survive'), false);
  assert.deepEqual(importState(serialized).exercise, state.exercise);
  assert.equal(importState(serialized).currentLessonId, 'todo-title-validation');
});

test('local storage saves only the normalized state under the tutor key', () => {
  const storage = memoryStorage();
  const state = saveState({profile: {experience: 'unknown'}, profileKey: 'ignored'}, storage);
  assert.equal(JSON.parse(storage.getItem(STORAGE_KEY)).profile.experience, '');
  assert.equal(state.profile.experience, '');
});

test('import rejects non-object progress data', () => {
  assert.throws(() => importState(JSON.stringify('not progress')), /progress object/i);
});

test('normalization removes unknown lesson and assistance values', () => {
  const state = normalizeState({currentLessonId: 'secret-lesson', completedLessonIds: ['orientation', 'secret'], assistance: ['hint:orientation', 42]});
  assert.equal(state.currentLessonId, 'orientation');
  assert.deepEqual(state.completedLessonIds, ['orientation']);
  assert.deepEqual(state.assistance, ['hint:orientation']);
});
