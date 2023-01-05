// My Tasks Basic

// HTML Elements
let taskinputE1 = document.getElementById("task-input");
let menuEl = document.getElementById("menu");
let tasksEl = document.getElementById("tasks");

//GVar
let tasks = loadtask();
displayall();
// Go Btn - Menu Listener
taskinputE1.addEventListener("keydown", tasksubmitHandler);

function tasksubmitHandler(e) {
  console.log(e.code);
  if (e.code === "Enter") {
    //TASK
    let description = taskinputE1.value;
    tasks.push(newtask(description));
    saveTasks();
    displayall();
    taskinputE1.value = "";
  }
}
// MENU FUNCTIONS
function addTask() {
  let description = prompt("enter task description ");
  tasks.push(newtask(description));
  saveTasks();
  displayall();
  tasksEl.innerHTML = `task added: ${description}`;
}

function toggleTask() {
  let index = +prompt("enter # of task:");
  let task = tasks[index];
  if (task.completed === "") {
    task.completed = "completed";
  } else {
    task.completed = "";
  }
  displayall();
}

function removeTask() {
  let index = +prompt("enter # of task");
  if (index >= 0 && index < tasks.length) {
    tasks.splice(index, 1);
    saveTasks();
    displayall();
  } else {
    alert("invalid task");
  }
}

function clearAll() {
  localStorage.clear();
  tasks = [];
  displayall();
}

//help functions
function newtask(taskdesc) {
  return {
    description: taskdesc,
    completed: false,
  };
}
function displayall() {
  tasksEl.innerHTML = "";
  for (let i = 0; i < tasks.length; i++) {
    tasksEl.appendChild(gettaskhtml(tasks[i], i));
  }
}
function gettaskhtml(task, index) {
  let divE1 = document.createElement("div");

  let checkboxE1 = document.createElement("input");
  checkboxE1.type = "Checkbox";
  checkboxE1.dataset.index = index;
  checkboxE1.addEventListener("input", checkboxchecker);
  checkboxE1.checked = task.completed;
 
  let textspanE1 = document.createElement("span");
  textspanE1.innerHTML = task.description;
  if (task.completed) {
    textspanE1.className = "completed";
  }

  let buttonE1 = document.createElement("button");
  buttonE1.innerHTML = "Remove";
  buttonE1.dataset.index = index;
  buttonE1.addEventListener("click", removebtnhandler);
  

  divE1.appendChild(checkboxE1);
  divE1.appendChild(textspanE1);
  divE1.appendChild(buttonE1);
  return divE1;
}
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
function loadtask() {
  let taskstr = localStorage.getItem("tasks");
  return JSON.parse(taskstr) ?? [];
}

function checkboxchecker(e) {
  let index = +e.target.dataset.index;
  let task = tasks[index];
  task.completed = !task.completed;
  saveTasks();
  displayall();
  console.log(e.target);
}

function removebtnhandler(e) {
  let index = +e.target.dataset.index;
  console.log(e.target);
  tasks.splice(index, 1);
  saveTasks();
  displayall();
}
