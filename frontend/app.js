const status = document.querySelector('#status');
const form = document.querySelector('#todo-form');
const titleInput = document.querySelector('#title');
const submitButton = form.querySelector('button');
const createdTodo = document.querySelector('#created-todo');
const createdTitle = document.querySelector('#created-title');
const createdId = document.querySelector('#created-id');

const apiBaseUrl = window.TODO_API_URL ?? 'http://localhost:8080';

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  submitButton.disabled = true;
  status.textContent = 'Saving…';

  try {
    const response = await fetch(`${apiBaseUrl}/api/todos`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({title: titleInput.value})
    });
    const body = await response.json();

    if (!response.ok) {
      throw new Error(body.message ?? 'Could not save the Todo.');
    }

    createdTitle.textContent = body.title;
    createdId.textContent = `ID: ${body.id}`;
    createdTodo.hidden = false;
    status.textContent = 'Todo saved.';
    form.reset();
    titleInput.focus();
  } catch (error) {
    status.textContent = error.message;
  } finally {
    submitButton.disabled = false;
  }
});

console.info('Todo frontend ready');
status.dataset.ready = 'true';
