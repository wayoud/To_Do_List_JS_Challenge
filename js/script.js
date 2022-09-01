// get all elements in page html
let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");
let all = document.querySelector("#all");
let todo = document.querySelector("#todo");
let done = document.querySelector("#done");
let clear = document.querySelector("#clear");
// Empty Array To Store The Tasks
let arrayOfTasks = [];

// Check if Theres Tasks In Local Storage
if (localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}

// Trigger Get Data From Local Storage Function
getDataFromLocalStorage();

//add task if its click entre
input.addEventListener("keypress", function(event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
        if (input.value !== "") {
            addTaskToArray(input.value); // Add Task To Array Of Tasks
            input.value = ""; // Empty Input Field
          }
    }
});

// Click On Task Element
tasksDiv.addEventListener("click", (e) => {
    // Update Button
  if (e.target.classList.contains("update")) {
    // Update Task From Local Storage
    updateTaskWith(e.target.parentElement.getAttribute("data-id"));
    // Remove Element From Page
    e.target.parentElement.remove();
  }
  // Delete Button
  if (e.target.classList.contains("del")) {
    // Remove Task From Local Storage
    deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
    // Remove Element From Page
    e.target.parentElement.parentElement.remove();
  }
  // Task Element
  if (e.target.classList.contains("task")) {
    // Toggle Completed For The Task
    toggleStatusTaskWith(e.target.getAttribute("data-id"));
    // Toggle Done Class
    e.target.classList.toggle("done");
    doneTaskWith(taskId)
  }
});

// add tast to array of local storage
function addTaskToArray(taskText) {
  // Task Data
  const task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };
  // Push Task To Array Of Tasks
  arrayOfTasks.push(task);
  // Add Tasks To Page
  addElementsToPageFrom(arrayOfTasks);
  // Add Tasks To Local Storage
  addDataToLocalStorageFrom(arrayOfTasks);
}

// add elemnt to page html
function addElementsToPageFrom(arrayOfTasks) {
  // Empty Tasks Div
  tasksDiv.innerHTML = "";
  // Looping On Array Of Tasks
  arrayOfTasks.forEach((task) => {
    // Create Main Div
    let div = document.createElement("div");
    div.className = "task";
    // Check If Task is Done
    if (task.completed) {
      div.className = "task done";
    }
    div.setAttribute("data-id", task.id);
    div.appendChild(document.createTextNode(task.title));
    //create div for tow buttons
    let div_btns = document.createElement("div");
    // Create Update Button
    let span_update = document.createElement("span");
    span_update.className = "update material-icons";
    span_update.appendChild(document.createTextNode("create"));
    // Append Update Button To btns Div
    div_btns.appendChild(span_update);
    // Create Delete Button
    let span_delet = document.createElement("span");
    span_delet.className = "del material-icons";
    // span_delet.className = "material-icons";

    span_delet.appendChild(document.createTextNode("clear"));
    // Append Delete Button To btns Div
    div_btns.setAttribute("data-id", task.id);
    div_btns.appendChild(span_delet);
    // Append div btns to Main div
    div.appendChild(div_btns);
    // Add Task Div To Tasks Container
    tasksDiv.appendChild(div);
  });
}

// get all to do list tasks and add to the page
all.addEventListener("click", function() {
  if (localStorage.getItem("tasks")) {
    arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
    addElementsToPageFrom(arrayOfTasks)
  }
});

// get not task not do it yet and add to the page
todo.addEventListener("click", function() {
  if (localStorage.getItem("tasks")) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    arrayOfTasks = tasks.filter(e => e.completed === false)
    console.log((arrayOfTasks));
    addElementsToPageFrom(arrayOfTasks)
  }
});

// get not task do it yet and add to the page
done.addEventListener("click", function() {
  if (localStorage.getItem("tasks")) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    arrayOfTasks = tasks.filter(e => e.completed === true);
    addElementsToPageFrom(arrayOfTasks)
  }
});

// clear all items in local storage
clear.addEventListener("click", function() {
  if (localStorage.getItem("tasks")) {
    addDataToLocalStorageFrom([]);
  }
  arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
  addElementsToPageFrom(arrayOfTasks)
});

//add Data To Local Storage From array
function addDataToLocalStorageFrom(arrayOfTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

//get Data From Local Storage
function getDataFromLocalStorage() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    addElementsToPageFrom(tasks);
  }
}
// update Task With id of task
function updateTaskWith(taskId) {
  task_to_update = arrayOfTasks.filter((task) => task.id == taskId);
  input.value = task_to_update[0].title;
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  addDataToLocalStorageFrom(arrayOfTasks);
}

//delete Task With id of task
function deleteTaskWith(taskId) {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  addDataToLocalStorageFrom(arrayOfTasks);
}

//  toggle Status Task With id of task change the status
function toggleStatusTaskWith(taskId) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == taskId) {
      arrayOfTasks[i].completed == false ? (arrayOfTasks[i].completed = true) : (arrayOfTasks[i].completed = false);
    }
  }
  addDataToLocalStorageFrom(arrayOfTasks);
}

