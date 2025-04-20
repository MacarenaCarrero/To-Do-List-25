const tasks = [];
let currentFilter = 'all';

// Elementos del DOM
const form = document.getElementById('form');
const input = document.getElementById('text-todolist');
const listContainer = document.getElementById('list');
const taskCounter = document.getElementById('taskCounter');
const taskClear = document.getElementById('taskClear');
const filters = document.getElementById('filters');

// ------------------------------
// FUNCIONES
// ------------------------------

function addTask(taskText) {
  tasks.push({
    id: Date.now(),
    name: taskText,
    completed: false
  });
  renderTasks();
}

function toggleTask(id) {
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.completed = !task.completed;
    renderTasks();
  }
}

function deleteTask(id) {
  const index = tasks.findIndex(t => t.id === id);
  if (index !== -1) {
    tasks.splice(index, 1);
    renderTasks();
  }
}

function clearCompletedTasks() {
  for (let i = tasks.length - 1; i >= 0; i--) {
    if (tasks[i].completed) tasks.splice(i, 1);
  }
  renderTasks();
}

function setFilter(filter) {
  currentFilter = filter;
  renderTasks();
}

function updateCounter() {
  const activeCount = tasks.filter(t => !t.completed).length;
  taskCounter.textContent = activeCount === 0 ? 'No hay tareas' : `${activeCount} tareas activas`;
}

function renderTasks() {
  listContainer.textContent = '';

  const filteredTasks = tasks.filter(task => {
    if (currentFilter === 'active') return !task.completed;
    if (currentFilter === 'completed') return task.completed;
    return true;
  });

  filteredTasks.forEach(task => {
    const taskEl = document.createElement('div');
    taskEl.className = 'task-item';

    taskEl.innerHTML = `
      <input type="checkbox" id="${task.id}" ${task.completed ? 'checked' : ''} />
      <label for="${task.id}" class="${task.completed ? 'completed' : ''}">${task.name}</label>
      <img src="./images/icon-cross.svg" data-id="${task.id}" alt="Eliminar" class="cross" />
    `;

    listContainer.appendChild(taskEl);
  });

  updateCounter();
}

// ------------------------------
// EVENTOS
// ------------------------------

// Añadir tarea
form.addEventListener('submit', function (e) {
  e.preventDefault();
  const taskText = input.value.trim();
  if (taskText !== '') {
    addTask(taskText);
    input.value = '';
  }
});

// Marcar tarea como completada
listContainer.addEventListener('change', function (e) {
  const id = parseInt(e.target.id);
  toggleTask(id);
});

// Eliminar tarea
listContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('cross')) {
    const id = parseInt(e.target.dataset.id);
    deleteTask(id);
  }
});

// Limpiar completadas
taskClear.addEventListener('click', function () {
  clearCompletedTasks();
});

// Filtrar tareas
filters.addEventListener('click', function (e) {
  if (e.target.tagName === 'BUTTON') {
    setFilter(e.target.dataset.filter);
  }
});