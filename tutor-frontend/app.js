import {
  createInitialState,
  evaluateTodoTitle,
  exportState,
  importState,
  loadState,
  markLessonComplete,
  recordAssistance,
  resetState,
  saveState,
  updateProfile
} from './state.js';

const elements = {
  onboardingCard: document.querySelector('#onboarding-card'),
  onboardingForm: document.querySelector('#onboarding-form'),
  learningArea: document.querySelector('#learning-area'),
  exerciseArea: document.querySelector('#exercise-area'),
  lessonList: document.querySelector('#lesson-list'),
  progressCount: document.querySelector('#progress-count'),
  lessonLevel: document.querySelector('#lesson-level'),
  lessonVersion: document.querySelector('#lesson-version'),
  lessonTitle: document.querySelector('#lesson-title'),
  lessonOutcome: document.querySelector('#lesson-outcome'),
  lessonConcept: document.querySelector('#lesson-concept'),
  lessonTerms: document.querySelector('#lesson-terms'),
  lessonPrompt: document.querySelector('#lesson-prompt'),
  learnerAnswer: document.querySelector('#learner-answer'),
  lessonFeedback: document.querySelector('#lesson-feedback'),
  lessonTransfer: document.querySelector('#lesson-transfer'),
  hintButton: document.querySelector('#hint-button'),
  exampleButton: document.querySelector('#example-button'),
  completeLesson: document.querySelector('#complete-lesson'),
  chatLog: document.querySelector('#chat-log'),
  chatForm: document.querySelector('#chat-form'),
  chatInput: document.querySelector('#chat-input'),
  exportProgress: document.querySelector('#export-progress'),
  importProgress: document.querySelector('#import-progress'),
  resetProgress: document.querySelector('#reset-progress'),
  todoTitle: document.querySelector('#todo-title'),
  checkTitle: document.querySelector('#check-title'),
  useExample: document.querySelector('#use-example'),
  exerciseFeedback: document.querySelector('#exercise-feedback'),
  preview: document.querySelector('#todo-preview')
};

let state = loadState();
let lessons = [];

function text(element, value) {
  element.textContent = value;
}

function setState(next) {
  state = saveState(next);
  render();
}

function currentLesson() {
  return lessons.find((lesson) => lesson.id === state.currentLessonId) || lessons[0];
}

function renderTerms(terms) {
  elements.lessonTerms.replaceChildren();
  terms.forEach(({term, meaning}) => {
    const item = document.createElement('details');
    const summary = document.createElement('summary');
    text(summary, term);
    const description = document.createElement('p');
    text(description, meaning);
    item.append(summary, description);
    elements.lessonTerms.append(item);
  });
}

function renderLessonList() {
  elements.lessonList.replaceChildren();
  lessons.forEach((lesson, index) => {
    const item = document.createElement('li');
    const button = document.createElement('button');
    button.type = 'button';
    button.className = lesson.id === state.currentLessonId ? 'lesson-link current' : 'lesson-link';
    button.disabled = index > 0 && !state.completedLessonIds.includes(lessons[index - 1].id);
    text(button, `${index + 1}. ${lesson.title}`);
    button.addEventListener('click', () => {
      state = saveState({...state, currentLessonId: lesson.id});
      render();
    });
    item.append(button);
    elements.lessonList.append(item);
  });
  text(elements.progressCount, `${state.completedLessonIds.length} / ${lessons.length}`);
}

function renderChat() {
  if (elements.chatLog.childElementCount > 0) return;
  addChatMessage('tutor', 'Hi! I can give a small clue about the current lesson. Try predicting first, then ask me if you get stuck.');
}

function addChatMessage(role, message) {
  const item = document.createElement('p');
  item.className = `chat-message ${role}`;
  const label = document.createElement('strong');
  text(label, role === 'tutor' ? 'Tutor' : 'You');
  const content = document.createElement('span');
  text(content, message);
  item.append(label, content);
  elements.chatLog.append(item);
}

function renderPreview(title = state.exercise.title) {
  const result = evaluateTodoTitle(title);
  const escaped = result.normalizedTitle
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
  elements.preview.srcdoc = `<!doctype html><meta charset="utf-8"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'"><style>body{font:16px system-ui;margin:1rem;color:#172033}small{color:#596780}</style><p><strong>${escaped || 'Untitled'}</strong></p><small>${result.valid ? 'Ready to save' : 'Needs a meaningful title'}</small>`;
}

function render() {
  const lesson = currentLesson();
  if (!lesson) return;
  elements.onboardingCard.hidden = Boolean(state.profile.experience);
  elements.learningArea.hidden = !state.profile.experience;
  elements.exerciseArea.hidden = !state.completedLessonIds.includes('todo-title-validation');
  renderLessonList();
  text(elements.lessonLevel, `${lesson.level.toUpperCase()} · ${lesson.id === 'orientation' ? 'FOUNDATION' : 'TODO SAMPLE'}`);
  text(elements.lessonVersion, `LESSON ${lessons.indexOf(lesson) + 1} · V${lesson.version}`);
  text(elements.lessonTitle, lesson.title);
  text(elements.lessonOutcome, lesson.outcome);
  text(elements.lessonConcept, lesson.concept);
  text(elements.lessonPrompt, lesson.prompt);
  text(elements.lessonTransfer, lesson.transfer);
  renderTerms(lesson.terms);
  elements.learnerAnswer.value = lesson.id === 'orientation' ? state.orientationAnswer : '';
  elements.completeLesson.textContent = state.completedLessonIds.includes(lesson.id) ? 'Lesson completed' : 'I can explain it';
  elements.completeLesson.disabled = state.completedLessonIds.includes(lesson.id);
  text(elements.exerciseFeedback, state.exercise.checked ? state.exercise.passed ? 'Nice — the local rule accepts this title.' : 'Try again with at least one non-space character.' : '');
  elements.todoTitle.value = state.exercise.title;
  renderPreview();
  renderChat();
}

async function loadLessons() {
  const curriculum = await fetch('../learning/curriculum.json').then((response) => {
    if (!response.ok) throw new Error('Curriculum could not be loaded.');
    return response.json();
  });
  lessons = await Promise.all(curriculum.lessons.map((entry) => fetch(`../learning/${entry.source}`).then((response) => response.json())));
  render();
}

elements.onboardingForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const form = new FormData(elements.onboardingForm);
  setState(updateProfile(state, Object.fromEntries(form.entries())));
  addChatMessage('tutor', 'Great. Make a prediction before reading the example. That small pause helps you learn, not just follow instructions.');
});

elements.hintButton.addEventListener('click', () => {
  const lesson = currentLesson();
  text(elements.lessonFeedback, lesson.hint);
  setState(recordAssistance(state, `hint:${lesson.id}`));
});

elements.exampleButton.addEventListener('click', () => {
  const lesson = currentLesson();
  text(elements.lessonFeedback, lesson.example);
  setState(recordAssistance(state, `example:${lesson.id}`));
});

elements.completeLesson.addEventListener('click', () => {
  const lesson = currentLesson();
  if (lesson.id === 'orientation' && !elements.learnerAnswer.value.trim()) {
    text(elements.lessonFeedback, 'Write a prediction first. It can be short and imperfect.');
    elements.learnerAnswer.focus();
    return;
  }
  const next = markLessonComplete({...state, orientationAnswer: elements.learnerAnswer.value}, lesson.id);
  setState(next);
  text(elements.lessonFeedback, lesson.id === 'orientation' ? 'Good prediction. The Todo rule lesson is now available.' : 'You completed the pilot practice. Your progress is saved locally.');
});

elements.learnerAnswer.addEventListener('input', () => {
  if (currentLesson()?.id === 'orientation') setState({...state, orientationAnswer: elements.learnerAnswer.value});
});

elements.chatForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const question = elements.chatInput.value.trim();
  if (!question) return;
  addChatMessage('learner', question);
  const lesson = currentLesson();
  addChatMessage('tutor', question.toLowerCase().includes('hint') ? lesson.hint : `Start with your own prediction. For this lesson, focus on: ${lesson.outcome}`);
  elements.chatInput.value = '';
});

elements.checkTitle.addEventListener('click', () => {
  const result = evaluateTodoTitle(elements.todoTitle.value);
  setState({...state, exercise: {title: elements.todoTitle.value, checked: true, passed: result.valid}});
  text(elements.exerciseFeedback, result.message);
});

elements.useExample.addEventListener('click', () => {
  elements.todoTitle.value = '  Buy milk  ';
  elements.todoTitle.focus();
});

elements.exportProgress.addEventListener('click', () => {
  const blob = new Blob([exportState(state)], {type: 'application/json'});
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'full-stack-tutor-progress.json';
  link.click();
  URL.revokeObjectURL(link.href);
});

elements.importProgress.addEventListener('change', async () => {
  const [file] = elements.importProgress.files || [];
  if (!file) return;
  try {
    setState(importState(await file.text()));
    text(elements.lessonFeedback, 'Progress imported. No provider credentials are part of this file.');
  } catch (error) {
    text(elements.lessonFeedback, error.message || 'That progress file could not be imported.');
  } finally {
    elements.importProgress.value = '';
  }
});

elements.resetProgress.addEventListener('click', () => {
  if (!window.confirm('Reset local tutor progress?')) return;
  state = resetState();
  elements.chatLog.replaceChildren();
  render();
});

loadLessons().catch((error) => {
  text(elements.lessonFeedback, error.message || 'The lesson content could not be loaded.');
});
