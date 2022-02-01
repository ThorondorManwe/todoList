// TODO Class: Represents a TODO
class Todo {
    constructor(title, description, duedate, priority, notes, checklist, group, id) {
        this.title = title;
        this.description = description;
        this.duedate = duedate;
        this.priority = priority;
        this.notes = notes;
        this.checklist = checklist;
        this.group = group;
        this.id = id;
    }
}


// UI Class: Handle UI Tasks
class UI {
    static displayTodos() {
        /* const StoreTodos = [
            {
                title: 'Estudiar JS',
                description: 'Ir a Odin Project y seguir la clase',
                duedate: 'Tengo hasta el viernes',
                priority: 'High',
                notes: 'Learning is awesome',
                checklist: 'Done',
                group: 'Today',
                id:  452
            },
            {
                title: 'Estudiar CSS',
                description: 'Ir a Odin Project y seguir la clase',
                duedate: 'Tengo hasta el jueves',
                priority: 'Medium',
                notes: 'Learning is awesome and some styles',
                checklist: 'Not Done',
                group: 'This Week',
                id: 456
            }

        ]; */

        const todos = Store.getTodos();
        UI.projectSections();                               //Antes de meter los todos  la lista recorre para ver cuántos proyectos hay

        todos.forEach((todo) => UI.addTodoToList(todo));
    }

    // Create project's sections
    static projectSections() {
        const todos = Store.getTodos();

        // Get all the projects
        todos.forEach((todo) => console.log(todo.group));
    }

    static addTodoToList(todo) {
        const list = document.querySelector('#todo-list');

        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${todo.title}</td>
            <td>${todo.description}</td>
            <td>${todo.duedate}</td>
            <td>${todo.priority}</td>
            <td>${todo.notes}</td>
            <td>${todo.checklist}</td>
            <td>${todo.group}</td>
            <td>${todo.id}</td>
            <td><a href="#" class="btn delete">X</a></td>
        `;

        list.appendChild(row);
        
    }

    static deleteTodo(el) {
        if(el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();    // usa parent dos veces porque entra del anchor al td y luego al row, quremos borrar todo el row
        }
    }

    static showAlert(message, className) {
        // Create a div 
        const div = document.createElement('div');
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#todo-form');
        container.insertBefore(div, form);
        // Vanish in 3 seconds
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }

    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#description').value = '';
        document.querySelector('#due_date').value = '';
        document.querySelector('#priority').value = '';
        document.querySelector('#notes').value = '';
        document.querySelector('#group').value = '';
        document.querySelector('#checklist').value = '';
    }

}


// Store Class: Handles Storage
// the methods are static so we can call them directly without having to instantiate the store class
class Store {
    static getTodos() {
        let todos;
        if(localStorage.getItem('todos') === null) {
            todos = [];
        } else {
            todos = JSON.parse(localStorage.getItem('todos'));
        }

        return todos;
    }

    static addTodo(todo) {
        const todos = Store.getTodos();

        todos.push(todo);

        localStorage.setItem('todos', JSON.stringify(todos));
    }

    static removeTodo(id) {
        const todos = Store.getTodos();

        todos.forEach((todo, index) => {
            if(todo.id === id) {
                todos.splice(index, 1);
            }
        });

        localStorage.setItem('todos', JSON.stringify(todos));
    }
}

// Events: Display Todos
document.addEventListener('DOMContentLoaded', UI.displayTodos  );

// Event: Add a todo
document.querySelector('#todo-form').addEventListener('submit', (e) => {
    // Prevent default (submit) in order to watch the object in console
    e.preventDefault();
    // Get form values
    const title = document.querySelector('#title').value;
    const description = document.querySelector('#description').value;
    const duedate = document.querySelector('#due_date').value;                   // Depués poner la fecha con formato no string
    const priority = document.querySelector('#priority').value;
    const notes = document.querySelector('#notes').value;
    const group = document.querySelector('#group').value;
    const checklist = document.querySelector('#checklist').value;
    const id = title + group;

    // Validate (también se puede hacer con CSS - required?)
    if(title === '' || description === '' || duedate === '' || priority === '' || notes === '' || group === '') {
        UI.showAlert('Please fill in all fields', 'danger');
    } else {
        // Instantiate todo
        const todo = new Todo(title, description, duedate, priority, notes, checklist, group, id);
        /* console.log(todo); */
    
        // Add todo to UI
        UI.addTodoToList(todo);

        // Add todo to store
        Store.addTodo(todo);

        // Show success message
        UI.showAlert('TODO added', 'success');
    
        // Clear fields
        UI.clearFields();
    }


});

// Event: Remove a todo
// Use event propagationto select all the X's
document.querySelector('#todo-list').addEventListener('click', (e) => {
    // Remove todo from UI
    UI.deleteTodo(e.target);

    // Remove todo from store
    Store.removeTodo(e.target.parentElement.previousElementSibling.textContent);

    // Show success message
    UI.showAlert('TODO removed', 'success');
});