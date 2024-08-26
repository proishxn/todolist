let score = 0;
let totalTasks = 0;
let completedTasks = 0;

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskValue = taskInput.value.trim();
    
    if (taskValue === '') {
        alert('Please enter a task.');
        return;
    }
    
    const taskList = document.getElementById('taskList');
    
    const listItem = document.createElement('li');
    
    listItem.innerHTML = `
        <span>${taskValue}</span>
        <input type="checkbox" onclick="toggleCompletion(this)">
        <button class="remove-btn" onclick="removeTask(this)">Remove</button>
    `;
    
    taskList.appendChild(listItem);
    
    taskInput.value = '';
    taskInput.focus();
    
    totalTasks++;
    updateProgressBar();
}

function removeTask(button) {
    const taskList = document.getElementById('taskList');
    const listItem = button.parentElement;
    if (listItem.querySelector('input[type="checkbox"]').checked) {
        completedTasks--;
        updateScore(-10); // Decrease score if task is removed
    }
    totalTasks--;
    taskList.removeChild(listItem);
    updateProgressBar();
}

function toggleCompletion(checkbox) {
    const listItem = checkbox.parentElement;
    if (checkbox.checked) {
        listItem.classList.add('completed');
        updateScore(10); // Increase score by 10 when a task is completed
        completedTasks++;
    } else {
        listItem.classList.remove('completed');
        updateScore(-10); // Decrease score by 10 if unchecked (optional)
        completedTasks--;
    }
    updateProgressBar();
}

function updateScore(amount) {
    score += amount;
    document.getElementById('score').textContent = `Score: ${score}`;
}

function updateProgressBar() {
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    
    if (totalTasks === 0) {
        progressBar.style.width = '0%';
        progressText.textContent = '0%';
        return;
    }
    
    const percentage = Math.round((completedTasks / totalTasks) * 100);
    progressBar.style.width = `${percentage}%`;
    progressBar.style.setProperty('--progress', `${percentage}%`); // Custom property for animation
    progressText.textContent = `${percentage}%`;
}
