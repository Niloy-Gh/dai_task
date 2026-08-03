// Dashboard Module

window.initDashboard = function() {
    // Only run if we are on the dashboard
    if (!document.querySelector('.stats-grid')) return;

    // Subscribe to EventBus changes to update dashboard stats
    if (!window.dashboardSubscribed && window.EventBus) {
        window.EventBus.on('tasksUpdated', (tasks) => {
            if (document.querySelector('.stats-grid')) {
                updateDashboardStats(tasks);
                updateRecentTasks(tasks);
            }
        });
        window.dashboardSubscribed = true;
    }

    // Initial update
    if (window.taskManager) {
        updateDashboardStats(window.taskManager.tasks);
        updateRecentTasks(window.taskManager.tasks);
    } else {
        // Fallback empty data if manager isn't loaded for some reason
        updateDashboardStats([]);
        updateRecentTasks([]);
    }

    function updateDashboardStats(tasks) {
        const total = tasks.length;
        const completed = tasks.filter(t => t.status === 'completed').length;
        const pending = total - completed;
        
        // Calculate progress percentage
        const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

        document.querySelectorAll('.stat-info').forEach(info => {
            const title = info.querySelector('h3').textContent;
            const valueElement = info.querySelector('h2');
            
            if (title === 'Total Tasks') valueElement.textContent = total;
            if (title === 'Pending Tasks') valueElement.textContent = pending;
            if (title === 'Completed Tasks') valueElement.textContent = completed;
            if (title === 'Today\'s Progress') valueElement.textContent = `${progress}%`;
        });

        const circle = document.querySelector('.circular-chart .circle');
        if (circle) {
            circle.setAttribute('stroke-dasharray', `${progress}, 100`);
        }
    }

    function updateRecentTasks(tasks) {
        const recentListContainer = document.querySelector('.tasks-card .task-list');
        if (!recentListContainer) return;

        // Get 4 most recent tasks (assuming newest are at the end)
        const recent = [...tasks].slice(-4).reverse();
        
        recentListContainer.innerHTML = '';
        
        if (recent.length === 0) {
            recentListContainer.innerHTML = '<li style="color:var(--text-secondary); padding: 10px;">No recent tasks.</li>';
            return;
        }

        recent.forEach(task => {
            const isCompleted = task.status === 'completed';
            const catColor = getCategoryColor(task.category);
            const priClass = getPriorityClass(task.priority);
            
            const li = document.createElement('li');
            li.className = `task-item ${isCompleted ? 'completed' : ''}`;
            
            li.innerHTML = `
                <label class="custom-checkbox">
                    <input type="checkbox" ${isCompleted ? 'checked' : ''} disabled>
                    <span class="checkmark"></span>
                </label>
                <span class="task-name" style="${isCompleted ? 'text-decoration:line-through; opacity:0.6;' : ''}">${task.title}</span>
                <span class="tag tag-${catColor}">${task.category}</span>
                <span class="task-date">${task.dueDate ? task.dueDate : 'No Date'}</span>
                <span class="task-priority priority-${priClass}">${task.priority}</span>
            `;
            recentListContainer.appendChild(li);
        });
    }

    function getCategoryColor(cat) {
        if (!cat) return 'purple';
        cat = cat.toLowerCase();
        if (cat === 'study') return 'purple';
        if (cat === 'personal') return 'blue';
        if (cat === 'work') return 'orange';
        if (cat === 'health') return 'green';
        return 'purple';
    }

    function getPriorityClass(pri) {
        if (!pri) return 'low';
        pri = pri.toLowerCase();
        if (pri === 'high') return 'high';
        if (pri === 'medium') return 'medium';
        return 'low';
    }
};

document.addEventListener('DOMContentLoaded', window.initDashboard);
