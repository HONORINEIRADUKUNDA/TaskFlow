// --- 1. DOM Element Selections ---
const themeToggleBtn = document.getElementById('theme-toggle');
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const boardWrapper = document.getElementById('board');
const searchInput = document.getElementById('search-input');

// --- 2. Theme Toggling ---
themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    
    if (document.body.classList.contains('dark-theme')) {
        themeToggleBtn.textContent = 'Toggle Light Mode';
    } else {
        themeToggleBtn.textContent = 'Toggle Dark Mode';
    }
});

// --- 3. The Creation Flow ---
// Handle form submission to create new tasks
taskForm.addEventListener('submit', function(e) {
    e.preventDefault(); 

    const taskText = taskInput.value.trim();
    if (taskText === '') return; 

    // Create a new task card and append it to the 'To Do' column
    createTaskCard(taskText, 'todo-column');
    
    // Clear input
    taskInput.value = '';
});

// Reusable function to build the DOM elements for a task
function createTaskCard(text, columnId) {
    const taskCard = document.createElement('div');
    taskCard.classList.add('task-card');
    
    // Injecting the title (editable) and the controls (dropdown & delete)
    taskCard.innerHTML = `
        <span class="task-title" contenteditable="true" title="Click to edit">${text}</span>
        <div class="card-controls">
            <select class="move-select">
                <option value="todo-column" ${columnId === 'todo-column' ? 'selected' : ''}>To Do</option>
                <option value="in-progress-column" ${columnId === 'in-progress-column' ? 'selected' : ''}>In Progress</option>
                <option value="done-column" ${columnId === 'done-column' ? 'selected' : ''}>Done</option>
            </select>
            <button class="delete-btn">X</button>
        </div>
    `;

    // Find the correct column list and add the card to it
    document.querySelector(`#${columnId} .task-list`).appendChild(taskCard);
}

// --- 4. Event Delegation (Delete & Move Tasks) ---
// Listen for clicks anywhere on the board
boardWrapper.addEventListener('click', function(e) {
    // If they clicked a delete button, remove the card
    if (e.target.matches('.delete-btn')) {
        const cardToRemove = e.target.closest('.task-card');
        if (cardToRemove) {
            cardToRemove.remove();
        }
    }
});

// Listen for dropdown changes anywhere on the board
boardWrapper.addEventListener('change', function(e) {
    // If they changed a select dropdown, move the card
    if (e.target.matches('.move-select')) {
        const cardToMove = e.target.closest('.task-card');
        const targetColumnId = e.target.value;
        const targetList = document.querySelector(`#${targetColumnId} .task-list`);
        
        if (targetList && cardToMove) {
            targetList.appendChild(cardToMove);
        }
    }
});

// --- 5. Real-Time Search Filter ---
searchInput.addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const allTasks = document.querySelectorAll('.task-card');

    allTasks.forEach(task => {
        const title = task.querySelector('.task-title').textContent.toLowerCase();
        
        if (title.includes(searchTerm)) {
            task.style.display = 'flex'; 
        } else {
            task.style.display = 'none'; 
        }
    });
});