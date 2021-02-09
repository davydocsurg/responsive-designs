// selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOpts = document.querySelector(".filter-todo");

// event listeners
document.addEventListener("DOMContentLoaded", fetchMyTodos);
todoButton.addEventListener("click", addTodo);
// todoInput.addEventListener("keydown.enter", addTodo);
todoList.addEventListener("click", deleteTodo);
filterOpts.addEventListener("click", filterTodo);

// functions
function addTodo(e) {
  if (todoInput.value < 0) {
    todoButton.classList.add("btn-disp");
  }
  // prevent default
  e.preventDefault();
  // todo div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  // create list items
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value; //todoInput.value
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  // add todos to local storage
  saveMyTodos(todoInput.value);
  // check mark button
  const completedButton = document.createElement("button");
  completedButton.innerHTML =
    '<svg class="svg-inline--fa fa-check-square fa-w-14 text-900 fs-3" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check-square" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M400 480H48c-26.51 0-48-21.49-48-48V80c0-26.51 21.49-48 48-48h352c26.51 0 48 21.49 48 48v352c0 26.51-21.49 48-48 48zm-204.686-98.059l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.248-16.379-6.249-22.628 0L184 302.745l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.25 16.379 6.25 22.628.001z"></path></svg>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  // check trash button
  const trashButton = document.createElement("button");
  trashButton.innerHTML =
    '<svg class="svg-inline--fa fa-trash-alt fa-w-14 text-900 fs-3" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"></path></svg>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  // append todo list
  todoList.appendChild(todoDiv);

  // clear input
  todoInput.value = "";
}

function deleteTodo(e) {
  const item = e.target;

  // destroy todo
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    // delete after animation
    todo.classList.add("del");
    delMyTodos(todo);
    todo.addEventListener("transitionend", () => {
      todo.remove();
    });
  }

  // check svg
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

// filter todos
function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach((todo) => {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "incomplete":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveMyTodos(todo) {
  let todos;
  // check if todos exist
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function fetchMyTodos(todo) {
  let todos;
  // check if todos exist
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  // loop through todos
  todos.forEach((todo) => {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // create list items
    const newTodo = document.createElement("li");
    newTodo.innerText = todo; //from localStorage
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    // check mark button
    const completedButton = document.createElement("button");
    completedButton.innerHTML =
      '<svg class="svg-inline--fa fa-check-square fa-w-14 text-900 fs-3" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check-square" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M400 480H48c-26.51 0-48-21.49-48-48V80c0-26.51 21.49-48 48-48h352c26.51 0 48 21.49 48 48v352c0 26.51-21.49 48-48 48zm-204.686-98.059l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.248-16.379-6.249-22.628 0L184 302.745l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.25 16.379 6.25 22.628.001z"></path></svg>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    // check trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML =
      '<svg class="svg-inline--fa fa-trash-alt fa-w-14 text-900 fs-3" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"></path></svg>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    // append todo list
    todoList.appendChild(todoDiv);
  });
}

function delMyTodos(todo) {
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
