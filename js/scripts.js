const formElement = document.getElementById('form');
const inputElement = document.getElementById('text-todolist');
const todoListElement = document.getElementById('list');
const taskCounterElement = document.getElementById('taskCounter');
const clearCompletedButton = document.getElementById('taskClear');
const filtersElement = document.getElementById('filters');
const modeChangeElement = document.querySelector('.moon');

let allTasks = [];
let darkMode = false;
let currentFilter = 'all';

const createTask = event => {
  event.preventDefault();
  if (inputElement.value === '') return;

  allTasks.push({
    id: Date.now(),
    name: inputElement.value,
    completed: false
  });

  insertTasks();
};

const insertTasks = () => {
  todoListElement.textContent = '';
  inputElement.value = '';

  let filteredTasks = allTasks;

  if (currentFilter === 'active') {
    filteredTasks = allTasks.filter(task => !task.completed);
  } else if (currentFilter === 'completed') {
    filteredTasks = allTasks.filter(task => task.completed);
  }

  filteredTasks.forEach(task => {
    const taskContainer = document.createElement('div');
    taskContainer.classList.add('task-container');
    taskContainer.dataset.id = task.id;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('input-checkBox');
    checkbox.checked = task.completed;
    checkbox.dataset.id = task.id;
    checkbox.id = task.id;
    checkbox.addEventListener('click', () => toggleTask(task.id));

    const label = document.createElement('label');
    label.classList.add('textLabel');
    label.htmlFor = task.id;
    label.textContent = task.name;

    const deleteButton = document.createElement('img');
    deleteButton.classList.add('cross');
    deleteButton.src = './images/icon-cross.svg';
    deleteButton.alt = 'Eliminar tarea';
    deleteButton.addEventListener('click', () => deleteTask(task.id));

    taskContainer.append(checkbox, label, deleteButton);
    todoListElement.append(taskContainer);
  });

  updateTaskCounter();
};

const toggleTask = id => {
  allTasks = allTasks.map(task => {
    if (task.id === id) {
      return { ...task, completed: !task.completed };
    }
    return task;
  });

  insertTasks();
};

const deleteTask = id => {
  allTasks = allTasks.filter(task => task.id !== id);
  insertTasks();
};

const clearCompleted = () => {
  allTasks = allTasks.filter(task => !task.completed);
  insertTasks();
};

const updateTaskCounter = () => {
  const activeCount = allTasks.filter(task => !task.completed).length;
  taskCounterElement.textContent =
    activeCount === 0 ? 'No hay tareas' : `${activeCount} tareas activas`;
};

const changeTheme = () => {
  darkMode = !darkMode;
  document.body.classList.toggle('dark');
  modeChangeElement.src = darkMode
    ? './images/icon-sun.svg'
    : './images/icon-moon.svg';
};

const setFilter = event => {
  // cambiar colores
  const filter = event.target.dataset.filter;
  if (!filter) return;

  filtersElement.querySelector('.buttonCheck').classList.remove('buttonCheck');
  event.target.classList.add('buttonCheck');

  insertTasks(filter);
};

formElement.addEventListener('submit', createTask);
clearCompletedButton.addEventListener('click', clearCompleted);
modeChangeElement.addEventListener('click', changeTheme);
filtersElement.addEventListener('click', setFilter);
