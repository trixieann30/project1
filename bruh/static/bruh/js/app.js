const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

let tasks = [];

// Function to render the tasks from the array
function renderTasks() {
    taskList.innerHTML = '';
    if (tasks.length === 0) {
        taskList.innerHTML = '<p class="text-center text-gray-500">No tasks yet. Add one above!</p>';
    } else {
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.classList.add('flex', 'items-center', 'justify-between', 'p-4', 'rounded-lg', 'shadow-sm', 'transition-all', 'duration-300');
            
            const taskContent = document.createElement('span');
            taskContent.classList.add('task-text');
            taskContent.textContent = task.text;
            
            if (task.completed) {
                li.classList.add('completed');
            }
            
            const actions = document.createElement('div');
            actions.classList.add('actions');

            const toggleButton = document.createElement('button');
            toggleButton.classList.add('toggle-btn');
            toggleButton.textContent = task.completed ? 'Uncheck' : 'Done';
            toggleButton.onclick = () => {
                task.completed = !task.completed;
                renderTasks();
            };
            
            const deleteButton = document.createElement('button');
            deleteButton.classList.add('remove-btn');
            deleteButton.textContent = 'Remove';
            deleteButton.onclick = () => {
                tasks.splice(index, 1);
                renderTasks();
            };
            
            actions.appendChild(toggleButton);
            actions.appendChild(deleteButton);
            li.appendChild(taskContent);
            li.appendChild(actions);
            taskList.appendChild(li);
        });
    }
}

// Handle form submission to add a new task
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = taskInput.value.trim();
    if (text === '') return;
    
    tasks.push({ text, completed: false });
    taskInput.value = '';
    renderTasks();
});

// Initial render
renderTasks();
