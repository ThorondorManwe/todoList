// TODO Class: Represents a TODO
class Todo {
    constructor(title, description, duedate, priority, notes, checklist) {
        this.title = title;
        this.description = description;
        this.duedate = duedate;
        this.priority = priority;
        this.notes = notes;
        this.checklist = checklist;
    }
}

// UI Class: Handle UI Tasks
class UI {
    static displayTodos() {
        const StoreTodos = [
            {
                title: 'Estudiar JS',
                description: 'Ir a Odin Project y seguir la clase',
                duedate: 'Tengo hasta el viernes',
                priority: 'High',
                notes: 'Learning is awesome',
                checklist: 'Done'
            },
            {
                title: 'Estudiar CSS',
                description: 'Ir a Odin Project y seguir la clase',
                duedate: 'Tengo hasta el jueves',
                priority: 'Medium',
                notes: 'Learning is awesome and some styles',
                checklist: 'Not Done'
            }

        ];

        const todos = StoreTodos;

        todos.forEach((todo) => UI.addTodoToList(todo));
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
            <td><a href="#" class="btn delete">X</a></td>
        `;

        list.appendChild(row);
    } 

}


// Store Class: Hanldes Storage

// Events: Display Todos
document.addEventListener('DOMContentLoaded', UI.displayTodos);

// Event: Add a todo

// Event: Remove a todo