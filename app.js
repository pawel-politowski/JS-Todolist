const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const trashButton = document.querySelector('.trash-btn');

todoButton.addEventListener('click', addTodo);


function addTodo(event) {
    event.preventDefault();
    //create div todo
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    //create li
    const newTodo = document.createElement('li');
    if (!todoInput.value) {
        alert("uzupełnij zadanie!");
        return;} 
    newTodo.innerHTML = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //create mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //create trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //append to list
    todoList.appendChild(todoDiv);
    //clear input value
    todoInput.value = '';
    //remove element
    trashButton.addEventListener('click', removeTodo);
    //check mark element
    completedButton.addEventListener('click', toggleTodo)

};

function removeTodo(event) {
    const item = event.target;
    const todo = item.parentElement;
    todo.classList.add('fall');
    todo.addEventListener('transitionend', function(){
        todo.remove();
    });   
};

function toggleTodo(event) {
    const item = event.target;
    const todo = item.parentElement;
    todo.classList.toggle('completed');
};

