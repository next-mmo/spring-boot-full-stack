import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {access} from 'node:fs/promises';
import path from 'node:path';

const root = new URL('.', import.meta.url);
const curriculum = JSON.parse(await readFile(new URL('./curriculum.json', root), 'utf8'));

async function exists(relativePath) {
  try {
    await access(new URL(relativePath, root));
    return true;
  } catch {
    return false;
  }
}

test('curriculum has unique lessons with resolvable, complete content', async () => {
  const ids = curriculum.lessons.map((lesson) => lesson.id);
  assert.equal(new Set(ids).size, ids.length);
  for (const lesson of curriculum.lessons) {
    assert.match(lesson.id, /^[a-z0-9-]+$/);
    assert.equal(Number.isInteger(lesson.version), true);
    assert.equal(typeof lesson.title, 'string');
    assert.equal(await exists(lesson.source), true, `${lesson.id} source is missing`);
    const content = JSON.parse(await readFile(new URL(lesson.source, root), 'utf8'));
    assert.equal(content.id, lesson.id);
    assert.equal(content.version, lesson.version);
    assert.match(content.level, /^(beginner|some-coding|experienced)$/);
    assert.ok(content.outcome);
    assert.ok(content.concept);
    assert.ok(Array.isArray(content.terms) && content.terms.length > 0);
    assert.ok(content.prompt);
    assert.ok(content.hint);
    assert.ok(content.example);
    assert.ok(content.transfer);
  }
});

test('curriculum prerequisites refer only to known lessons and contain no self-reference', () => {
  const ids = new Set(curriculum.lessons.map((lesson) => lesson.id));
  for (const lesson of curriculum.lessons) {
    for (const prerequisite of lesson.prerequisites) {
      assert.equal(ids.has(prerequisite), true, `${lesson.id} references an unknown prerequisite`);
      assert.notEqual(prerequisite, lesson.id, `${lesson.id} cannot require itself`);
    }
  }
});
