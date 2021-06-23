'use strict';

class Todo {
    constructor(form, input, todoList, todoCompleted) {
        this.form = document.querySelector(form);
        this.input = document.querySelector(input);
        this.todoList = document.querySelector(todoList);
        this.todoCompleted = document.querySelector(todoCompleted);
        this.todoData = new Map(JSON.parse(localStorage.getItem('toDoList')));
    }

    addToStorage() {
        localStorage.setItem('toDoList', JSON.stringify([...this.todoData]))
    }

    render() {
        this.todoList.textContent = '';
        this.todoCompleted.textContent = '';
        this.todoData.forEach(this.createItem);
        this.addToStorage();
    }

    createItem = (todo) => {
        const li = document.createElement('li');
            li.classList.add('todo-item');
            li.key = todo.key;
            li.insertAdjacentHTML('beforeend', `
                <span class="text-todo">${todo.value}</span>
                <div class="todo-buttons">
                    <button class="todo-remove"></button>
                    <button class="todo-complete"></button>
                </div>
            `);
        if (todo.completed) {
            this.todoCompleted.append(li);
        } else {
            this.todoList.append(li);
        };
       
    }
    
    addTodo(e) {
        e.preventDefault();
            if (this.input.value.trim()) {
                const newTodo = {
                    value: this.input.value,
                    completed: false,
                    key: this.generateKey(),
                };
                this.todoData.set(newTodo.key, newTodo);
                this.input.value = '';
                this.render();
            } else {
                alert('Пустое дело добавить нельзя!');
            }
    }

    generateKey() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    deleteItem() {
        console.log('удалено');
        console.log(this.todoData);
        console.log(todo.key);
    }

    completedItem() {
        console.log('выполнено');
        console.log(todo.key);

    }

    handler() {
        const todoContainer = document.querySelector('.todo-container');
            todoContainer.onclick = function(event) {
                let target = event.target;
                    if(target.tagName !='BUTTON'){
                        return;
                    } else {
                        if(target.className === 'todo-remove') {
                            todo.deleteItem();
                        } else {
                            todo.completedItem();
                        }
                    };
            }
    }

    init() {
        this.form.addEventListener('submit', this.addTodo.bind(this));
        this.render();
    }
}

const todo = new Todo('.todo-control', '.header-input', '.todo-list', '.todo-completed');
todo.handler();
todo.init();
