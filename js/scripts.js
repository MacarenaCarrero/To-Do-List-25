const containerElement = document.getElementById('container');
const allButtomElement = document.getElementById('all');
const activeButtomElement = document.getElementById('active');
const completedButtomElement = document.getElementById('completed');
const taskElement = document.getElementById('task');
const containerTasksElement = document.getElementById('containerTasks');
const formTask = document.getElementById('formTask');
const containerInfoElement = document.getElementById('containerInfo');

const tasks = [
  {
    id: Date.now(),
    name: 'Make a todo app',
    completed: false
  }
];

const pressButtomFilters = e => {
  let filterTasks = [...tasks];
  if (e.target.id === 'all') {
    allButtomElement.classList.add('select');
    activeButtomElement.classList.remove('select');
    completedButtomElement.classList.remove('select');
  }
  if (e.target.id === 'active') {
    activeButtomElement.classList.add('select');
    allButtomElement.classList.remove('select');
    completedButtomElement.classList.remove('select');
    filterTasks = filterTasks.filter(filterTask => {
      return !filterTask.completed;
    });
  }
  if (e.target.id === 'completed') {
    completedButtomElement.classList.add('select');
    allButtomElement.classList.remove('select');
    activeButtomElement.classList.remove('select');
    filterTasks = filterTasks.filter(filterTask => {
      return filterTask.completed;
    });
  }
  updateTasks(filterTasks);
};

const publishTask = e => {
  e.preventDefault();
  tasks.push({
    id: Date.now(),
    name: taskElement.value,
    completed: false
  });

  taskElement.value = '';
  updateTasks(tasks);
};

const updateTasks = arrayTasks => {
  const fragment = document.createDocumentFragment();
  containerInfoElement.textContent = '';

  arrayTasks.map(task => {
    const containerTasks = document.createElement('div');
    containerTasks.classList.add('containerTasks');

    const flexCheckText = document.createElement('div');
    flexCheckText.classList.add('flexCheckText');

    const inputTasks = document.createElement('input');
    inputTasks.setAttribute('type', 'checkbox'); //para agregar cualquier atributo (hacer checkbox)
    inputTasks.setAttribute('data-id', `${task.id}`);
    inputTasks.classList.add('checkbox');
    if (task.completed) {
      inputTasks.checked = true;
    } else {
      inputTasks.checked = false;
    }

    const textTasks = document.createElement('h2');
    textTasks.classList.add('h2');
    if (task.completed) {
      textTasks.classList.add('line-through');
    } else {
      textTasks.classList.remove('line-through');
    }
    textTasks.textContent = task.name;

    const imgTasks = document.createElement('img');
    imgTasks.classList.add('cross');
    imgTasks.textContent = task.id;

    flexCheckText.append(containerTasks, inputTasks, textTasks);

    fragment.append(flexCheckText, imgTasks);
  });
  containerInfoElement.prepend(fragment);
};

const activeCheck = event => {
  const id = event.target.dataset.id;

  if (!id) {
    return;
  }

  const findTask = tasks.find(task => {
    return task.id === Number(id);
  });

  if (!findTask.completed) {
    findTask.completed = true;
  } else {
    findTask.completed = false;
  }

  updateTasks(tasks);
  console.log(findTask);
};
updateTasks(tasks);

formTask.addEventListener('submit', publishTask);
allButtomElement.addEventListener('click', pressButtomFilters);
activeButtomElement.addEventListener('click', pressButtomFilters);
completedButtomElement.addEventListener('click', pressButtomFilters);
containerElement.addEventListener('click', activeCheck);
