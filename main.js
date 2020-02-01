const todolistElement = document.getElementById('todolist');
const buttonElement = document.querySelector('#newtodo-container button');
const inputElement = document.querySelector('#newtodo-container input');

let todos =  JSON.parse(localStorage.getItem('todo_list')) || ['fazer café', 'estudar JavaScript', 'dormir'];

function addTodo() {
    let inputValue = inputElement.value;

    todos.push(inputValue);

    renderTodos();

    inputElement.value = '';

    saveToStorage();
}

function renderTodos() {
    todolistElement.innerHTML = '';

    for(todo of todos) {
        let textElement = document.createTextNode(todo);
        let listItem = document.createElement('li');
        let textDeleteElement = document.createTextNode('Exlcluir');
        let linkElement = document.createElement('a');
        let checkboxElement = document.createElement('input');
        
        checkboxElement.setAttribute('type', 'checkbox');
        
        let position = todos.indexOf(todo);

        linkElement.setAttribute('onclick', 'deleteTodo(' + position + ')');
        linkElement.appendChild(textDeleteElement);
        linkElement.setAttribute('href', '#');
        linkElement.style.float = 'right';
        linkElement.style.marginRight = '10px';
        linkElement.style.textDecoration = 'none';

        listItem.appendChild(checkboxElement);
        listItem.appendChild(textElement);
        listItem.appendChild(linkElement);
        todolistElement.appendChild(listItem);
    }
}

function deleteTodo(position) {
    todos.splice(position, 1);
    saveToStorage();
    renderTodos();
}

function saveToStorage() {
    localStorage.setItem('todo_list', JSON.stringify(todos));
}

renderTodos();
buttonElement.onclick = addTodo;