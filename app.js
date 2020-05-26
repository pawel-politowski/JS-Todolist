const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const trashButton = document.querySelector('.trash-btn');
const filterOption = document.querySelector('.filter-todo');
const searchBtn = document.querySelector('.search-button');
const searchInput = document.querySelector('.todo-search');

document.addEventListener('DOMContentLoaded', getTodos)
todoButton.addEventListener('click', addTodo);
filterOption.addEventListener('click', filterTodo);
searchBtn.addEventListener("click", searchTask);

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
    //add todo to local storage
    saveToLocalStorage(todoInput.value);
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
    removeLocalStorageTodos(todo);
    todo.addEventListener('transitionend', function(){
        todo.remove();
    });   
};

function toggleTodo(event) {
    const item = event.target;
    const todo = item.parentElement;
    todo.classList.toggle('completed');
};

function filterTodo(event) {
    const todos = todoList.childNodes;    
    todos.forEach(function(todo){
        switch(event.target.value){
            case "all":
                todo.style.display = "flex";
            break;
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display = "flex";
                }else {
                    todo.style.display = "none";
                }
            break;
            case "uncompleted":
                if(!todo.classList.contains("completed")){
                    todo.style.display = "flex";
                }else {
                    todo.style.display = "none"; 
            break;                  
        }
    }
    });
};


//function that searches todo from list
function searchTask(event){
    event.preventDefault();
    searchTxt = searchInput.value.toLowerCase();
    let listOfLi = [...document.querySelectorAll(".todo")];    
    listOfLi.forEach(element => {
        if (element.innerText.toLowerCase().indexOf(searchTxt) > -1){
            element.classList.remove('found') ;
        } else {
            element.classList.add('found');    
}}
)}

//removing class found(needed for searching todos)
function removeClassFound (){
    if (searchInput.value = ""){
        li.classList.remove('found')
    }
}

removeClassFound();


// save to local storage
function saveToLocalStorage(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
};


//get Todos from local storage
function getTodos() {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
         //create div todo
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    //create li
    const newTodo = document.createElement('li');    
    newTodo.innerHTML = todo;
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
    })
}

function removeLocalStorageTodos(todo){
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }    
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
};
   


