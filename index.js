const todosElement = document.getElementById('todos');
const buttonElement = document.querySelector('button');
const titleElement = document.querySelector('input[name="title"]');
const descriptionElement = document.querySelector('input[name="description"]');

let todoList = JSON.parse(localStorage.getItem('todoList')) || [
    {
        title: 'Café da manhã',
        description: 'Ovos mexidos com bacon'
    },
    {
        title: 'Almoço',
        description: 'Arroz, feijão, file de frango, alface e tomate'
    },
    {
        title: 'janta',
        description: 'Lamen japones'
    }
]; 

function renderTodos() {
    todos.innerHTML = '';

    for (todo of todoList) {
        let br = document.createElement('br');
        let strong = document.createElement('strong');
        let divElement = document.createElement('div');
        let titleText = document.createTextNode(todo.title);
        let titleSpanElement = document.createElement('span');
        let descriptionSpanElement = document.createElement('span');
        let descriptionText = document.createTextNode(todo.description);
        let linkElement = document.createElement('a');
        let textLink = document.createTextNode('exluir');

        linkElement.appendChild(textLink);

        let position = todoList.indexOf(todo);

        linkElement.setAttribute('onclick', `removeTodo(${position})`);
        
        strong.appendChild(titleText);

        titleSpanElement.appendChild(strong);
        descriptionSpanElement.appendChild(descriptionText);

        divElement.setAttribute('class', 'todo');
        divElement.appendChild(titleSpanElement);
        divElement.appendChild(linkElement);
        divElement.appendChild(br);
        divElement.appendChild(descriptionSpanElement);

        todosElement.appendChild(divElement);
    }

}

function receiveTodo() {
    let title = titleElement.value;
    let description = descriptionElement.value;

    titleElement.value = '';
    descriptionElement.value = '';
    return {
        title,
        description
    }
}

function addTodo() {
    let todo = receiveTodo();

    todoList.push(todo);
    saveToStorage(todo);
    renderTodos();
}

function saveToStorage() {
    localStorage.setItem('todoList', JSON.stringify(todoList));
    renderTodos();
}

function removeTodo(position) {
    todoList.splice(position, 1);
    renderTodos();
    saveToStorage()
}

renderTodos();
document.querySelector('button').onclick = addTodo;