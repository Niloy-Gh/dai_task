// Tasks Module - Frontend Logic

window.initTasks = function() {
    const taskContainer = document.querySelector('.task-groups');
    const addTaskBtn = document.querySelector('.action-row .btn-primary');
    
    // Filters State
    let activeTabFilter = 'All'; // 'All', 'Daily', 'Weekly', 'Monthly', 'Yearly'
    let activePriorityFilter = 'All';
    let activeStatusFilter = 'All';

    // Edit State
    let editingTaskId = null;

    // Modal Elements (Global in dashboard.html)
    const modal = document.getElementById('addTaskModal');
    const modalForm = document.getElementById('addTaskForm');
    const btnCancel = document.getElementById('modal-cancel-btn');
    const btnClose = document.getElementById('modal-close-icon');
    const btnSave = document.getElementById('modal-save-btn');
    const titleInput = document.getElementById('task-title');
    const modalHeaderTitle = modal ? modal.querySelector('.modal-header h2') : null;

    // Only run if we are on the tasks view
    if (!taskContainer) return;

    // ==========================================
    // FILTERING LOGIC
    // ==========================================

    function setupFilters() {
        // Tab Filters
        const tabs = document.querySelectorAll('.filter-tabs .tab-btn');
        tabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                tabs.forEach(t => t.classList.remove('active'));
                e.target.classList.add('active');
                activeTabFilter = e.target.textContent.trim();
                triggerRender();
            });
        });
    }

    // ==========================================
    // RENDERING & GROUPING LOGIC
    // ==========================================

    function triggerRender() {
        if (window.taskManager) renderTasks(window.taskManager.tasks);
    }

    function renderTasks(tasks) {
        if (!taskContainer) return;
        taskContainer.innerHTML = ''; // Clear groups

        // Apply Filters
        let filteredTasks = tasks.filter(task => {
            if (activeTabFilter === 'All') return true;
            
            // Filter strictly by the repeatType property
            return task.repeatType && task.repeatType.toLowerCase() === activeTabFilter.toLowerCase();
        });

        if (filteredTasks.length === 0) {
            taskContainer.innerHTML = `<div style="text-align:center; padding: 40px; color: var(--text-secondary);">No tasks match your filters.</div>`;
            return;
        }

        // Grouping
        const todayStr = window.Utils ? window.Utils.formatDate(new Date()) : new Date().toDateString();
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrowStr = window.Utils ? window.Utils.formatDate(tomorrow) : tomorrow.toDateString();

        const groups = {
            'Overdue': [],
            'Today': [],
            'Tomorrow': [],
            'Upcoming': [],
            'No Date': []
        };

        const todayObj = new Date();
        todayObj.setHours(0,0,0,0);

        filteredTasks.forEach(task => {
            if (!task.dueDate) {
                groups['No Date'].push(task);
                return;
            }

            const taskDate = new Date(task.dueDate);
            taskDate.setHours(0,0,0,0);

            if (taskDate < todayObj && task.status !== 'completed') {
                groups['Overdue'].push(task);
            } else if (taskDate.getTime() === todayObj.getTime()) {
                groups['Today'].push(task);
            } else if (taskDate.getTime() === todayObj.getTime() + 86400000) {
                groups['Tomorrow'].push(task);
            } else {
                groups['Upcoming'].push(task);
            }
        });

        // Render Groups
        for (const [groupName, groupTasks] of Object.entries(groups)) {
            if (groupTasks.length === 0) continue;

            let dateLabel = '';
            if (groupName === 'Today') dateLabel = ` - ${todayStr}`;
            if (groupName === 'Tomorrow') dateLabel = ` - ${tomorrowStr}`;
            
            // Only collapse "Upcoming" by default
            const isExpanded = groupName !== 'Upcoming'; 
            const expClass = isExpanded ? 'expanded' : 'collapsed';

            const groupDiv = document.createElement('div');
            groupDiv.className = `task-group ${expClass}`;
            
            // Render Header
            const headerHTML = `
                <div class="group-header">
                    <h2>${groupName}${dateLabel} <span style="font-size:0.8rem; opacity:0.7">(${groupTasks.length})</span></h2>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="transition: transform 0.3s; transform: ${isExpanded ? 'rotate(0deg)' : 'rotate(-90deg)'}">
                        <polyline points="18 15 12 9 6 15"></polyline>
                    </svg>
                </div>
                <div class="group-content" style="display: ${isExpanded ? 'block' : 'none'}"></div>
            `;
            groupDiv.innerHTML = headerHTML;

            // Header toggle logic
            const headerEl = groupDiv.querySelector('.group-header');
            const contentEl = groupDiv.querySelector('.group-content');
            const svgEl = groupDiv.querySelector('svg');
            
            headerEl.style.cursor = 'pointer';
            headerEl.addEventListener('click', () => {
                const expanding = contentEl.style.display === 'none';
                contentEl.style.display = expanding ? 'block' : 'none';
                svgEl.style.transform = expanding ? 'rotate(0deg)' : 'rotate(-90deg)';
                groupDiv.className = `task-group ${expanding ? 'expanded' : 'collapsed'}`;
            });

            // Render Rows
            groupTasks.sort((a,b) => {
                if (a.status === 'completed' && b.status !== 'completed') return 1;
                if (a.status !== 'completed' && b.status === 'completed') return -1;
                return (a.dueTime || '23:59').localeCompare(b.dueTime || '23:59');
            }).forEach(task => {
                contentEl.appendChild(createTaskRow(task));
            });

            taskContainer.appendChild(groupDiv);
        }
    }

    function createTaskRow(task) {
        const row = document.createElement('div');
        row.className = 'task-row';
        
        const isCompleted = task.status === 'completed';
        const isHighPending = task.priority === 'High' && !isCompleted;
        
        let checkboxHTML = '';
        if (isCompleted) {
            checkboxHTML = `
                <div class="custom-check checked" data-id="${task.id}" style="cursor:pointer">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                </div>`;
        } else if (isHighPending) {
            checkboxHTML = `<div class="custom-check empty-red" data-id="${task.id}" style="cursor:pointer"></div>`;
        } else {
            checkboxHTML = `<div class="custom-check empty" data-id="${task.id}" style="cursor:pointer"></div>`;
        }

        const catColor = getCategoryColor(task.category);
        const priColor = getPriorityColor(task.priority);
        const statColor = getStatusColor(task.status);
        const displayTime = task.dueTime ? task.dueTime : (task.dueDate || 'No Date');

        row.innerHTML = `
            <div class="col-checkbox">${checkboxHTML}</div>
            <div class="col-name" style="${isCompleted ? 'text-decoration: line-through; color: var(--text-secondary);' : ''}">${task.title}</div>
            <div class="col-category"><span class="badge-cat ${catColor}">${task.category}</span></div>
            <div class="col-time">${displayTime}</div>
            <div class="col-priority"><span class="badge-pri ${priColor}">${task.priority}</span></div>
            <div class="col-status"><span class="badge-stat ${statColor}">${isCompleted ? 'Completed' : 'Pending'}</span></div>
            <div class="col-menu" data-id="${task.id}" style="cursor:pointer; position:relative;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle>
                </svg>
            </div>
        `;

        // 1. Toggle Status Listener
        const checkEl = row.querySelector('.col-checkbox .custom-check');
        checkEl.addEventListener('click', () => {
            if (window.taskManager) {
                const newStatus = isCompleted ? 'pending' : 'completed';
                window.taskManager.updateTask(task.id, { status: newStatus });
                // Note: updateTask saves and emits tasksUpdated, which re-renders
            }
        });

        // 2. Context Menu Listener (Edit / Delete)
        const menuEl = row.querySelector('.col-menu');
        menuEl.addEventListener('click', (e) => {
            e.stopPropagation();
            
            // Remove existing context menus
            document.querySelectorAll('.task-context-menu').forEach(m => m.remove());

            const contextMenu = document.createElement('div');
            contextMenu.className = 'task-context-menu glass-effect';
            contextMenu.style.position = 'absolute';
            contextMenu.style.right = '0';
            contextMenu.style.top = '100%';
            contextMenu.style.zIndex = '10';
            contextMenu.style.background = 'rgba(40,40,60,0.95)';
            contextMenu.style.border = '1px solid rgba(255,255,255,0.1)';
            contextMenu.style.borderRadius = '8px';
            contextMenu.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
            contextMenu.style.padding = '4px 0';
            contextMenu.style.minWidth = '120px';

            const editBtn = document.createElement('div');
            editBtn.textContent = 'Edit Task';
            editBtn.style.padding = '8px 16px';
            editBtn.style.fontSize = '0.9rem';
            editBtn.style.transition = 'background 0.2s';
            editBtn.addEventListener('mouseover', () => editBtn.style.background = 'rgba(255,255,255,0.1)');
            editBtn.addEventListener('mouseout', () => editBtn.style.background = 'transparent');
            editBtn.addEventListener('click', (ev) => {
                ev.stopPropagation();
                openEditModal(task);
                contextMenu.remove();
            });

            const delBtn = document.createElement('div');
            delBtn.textContent = 'Delete Task';
            delBtn.style.padding = '8px 16px';
            delBtn.style.fontSize = '0.9rem';
            delBtn.style.color = 'var(--color-red)';
            delBtn.style.transition = 'background 0.2s';
            delBtn.addEventListener('mouseover', () => delBtn.style.background = 'rgba(244,63,94,0.1)');
            delBtn.addEventListener('mouseout', () => delBtn.style.background = 'transparent');
            delBtn.addEventListener('click', (ev) => {
                ev.stopPropagation();
                if (confirm('Are you sure you want to delete this task?')) {
                    if (window.taskManager) window.taskManager.deleteTask(task.id);
                }
                contextMenu.remove();
            });

            contextMenu.appendChild(editBtn);
            contextMenu.appendChild(delBtn);
            menuEl.appendChild(contextMenu);

            // Click outside to close context menu
            const closeCtx = () => {
                contextMenu.remove();
                document.removeEventListener('click', closeCtx);
            };
            setTimeout(() => document.addEventListener('click', closeCtx), 10);
        });

        return row;
    }

    // Subscribe to EventBus
    if (!window.tasksSubscribedToEventBus && window.EventBus) {
        window.EventBus.on('tasksUpdated', (tasks) => {
            if (document.querySelector('.task-groups')) {
                // If tasks updated, re-filter and group
                triggerRender();
            }
        });
        window.tasksSubscribedToEventBus = true;
    }

    // ==========================================
    // MODAL LOGIC (ADD & EDIT)
    // ==========================================

    if (addTaskBtn && modal) {
        // Open Modal for ADD
        addTaskBtn.addEventListener('click', () => {
            editingTaskId = null; // Reset edit state
            if (modalHeaderTitle) modalHeaderTitle.textContent = 'Add New Task';
            if (btnSave) btnSave.innerHTML = 'Save Task';
            
            resetTaskForm();

            // Auto-select repeat type based on active tab
            if (activeTabFilter !== 'All') {
                const repeatSelect = document.getElementById('task-repeat');
                if (repeatSelect) {
                    const optionExists = Array.from(repeatSelect.options).some(opt => opt.value === activeTabFilter);
                    if (optionExists) {
                        repeatSelect.value = activeTabFilter;
                    }
                }
            }

            modal.classList.remove('hidden');
            setTimeout(() => { if (titleInput) titleInput.focus(); }, 50);
        });

        // Close Modal Functions
        const closeModal = () => {
            modal.classList.add('hidden');
            editingTaskId = null;
        };

        if (!modal.dataset.initializedModal) {
            modal.dataset.initializedModal = 'true';
            btnCancel.addEventListener('click', closeModal);
            btnClose.addEventListener('click', closeModal);
            modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal();
            });
        }
    }

    function openEditModal(task) {
        editingTaskId = task.id;
        
        if (modalHeaderTitle) modalHeaderTitle.textContent = 'Edit Task';
        if (btnSave) btnSave.innerHTML = 'Update Task';
        
        resetValidation();
        
        document.getElementById('task-title').value = task.title || '';
        document.getElementById('task-desc').value = task.description || '';
        document.getElementById('task-category').value = task.category || 'Study';
        document.getElementById('task-repeat').value = task.repeatType || 'none';
        document.getElementById('task-priority').value = task.priority || 'Medium';
        document.getElementById('task-date').value = task.dueDate || '';
        document.getElementById('task-time').value = task.dueTime || '';
        document.getElementById('task-tags').value = (task.tags || []).join(', ');
        document.getElementById('task-notes').value = task.notes || '';

        modal.classList.remove('hidden');
    }

    // ==========================================
    // VALIDATION & SAVE LOGIC
    // ==========================================

    if (modalForm && !modalForm.dataset.initialized) {
        modalForm.dataset.initialized = 'true';
        modalForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const title = document.getElementById('task-title').value.trim();
            const desc = document.getElementById('task-desc').value.trim();
            const category = document.getElementById('task-category').value;
            const repeat = document.getElementById('task-repeat').value;
            const priority = document.getElementById('task-priority').value;
            const date = document.getElementById('task-date').value;
            const time = document.getElementById('task-time').value;
            const tags = document.getElementById('task-tags').value.split(',').map(t => t.trim()).filter(t => t);
            const notes = document.getElementById('task-notes').value.trim();

            let isValid = true;
            resetValidation();

            if (!title) { showError('task-title', 'err-title'); isValid = false; }
            if (!priority) { showError('task-priority', 'err-pri'); isValid = false; }
            if (!date) { showError('task-date', 'err-date'); isValid = false; }

            if (!isValid) return;

            // Duplicate Prevention (only when ADDING new task)
            if (window.taskManager && !editingTaskId) {
                const isDuplicate = window.taskManager.tasks.some(t => 
                    t.title.toLowerCase() === title.toLowerCase() && 
                    t.dueDate === date && 
                    t.repeatType === repeat
                );

                if (isDuplicate) {
                    alert("Warning: A task with the exact same Title, Date, and Repeat type already exists.");
                    return;
                }
            }

            btnSave.disabled = true;
            btnSave.innerHTML = editingTaskId ? 'Updating...' : 'Saving...';

            setTimeout(() => {
                if (window.taskManager) {
                    const updates = {
                        title, description: desc, category, repeatType: repeat,
                        priority, dueDate: date, dueTime: time, tags, notes
                    };

                    if (editingTaskId) {
                        window.taskManager.updateTask(editingTaskId, updates);
                    } else {
                        updates.status = 'pending';
                        const newTaskObj = window.taskManager.createTaskObject(updates);
                        window.taskManager.tasks.push(newTaskObj);
                        window.taskManager.saveTasks(); 
                    }
                }

                btnSave.disabled = false;
                btnSave.innerHTML = 'Save Task';
                modal.classList.add('hidden');
                editingTaskId = null;
            }, 300);
        });
    }

    // ==========================================
    // HELPERS
    // ==========================================

    function showError(inputId, errId) {
        const input = document.getElementById(inputId);
        const err = document.getElementById(errId);
        if (input) input.classList.add('has-error');
        if (err) err.classList.remove('hidden');
    }

    function resetValidation() {
        document.querySelectorAll('.has-error').forEach(el => el.classList.remove('has-error'));
        document.querySelectorAll('.error-msg').forEach(el => el.classList.add('hidden'));
    }

    function resetTaskForm() {
        if (modalForm) modalForm.reset();
        resetValidation();
        if (btnSave) {
            btnSave.disabled = false;
            btnSave.innerHTML = 'Save Task';
        }
    }

    function getCategoryColor(cat) {
        cat = cat.toLowerCase();
        if (cat === 'study') return 'purple';
        if (cat === 'personal') return 'blue';
        if (cat === 'work') return 'orange';
        if (cat === 'health') return 'green';
        return 'purple';
    }

    function getPriorityColor(pri) {
        pri = pri.toLowerCase();
        if (pri === 'high') return 'red';
        if (pri === 'medium') return 'orange';
        if (pri === 'low') return 'green';
        return 'green';
    }

    function getStatusColor(stat) {
        stat = stat.toLowerCase();
        if (stat === 'completed') return 'green';
        if (stat === 'pending') return 'red';
        return 'red';
    }

    // Initialize logic
    setupFilters();
    triggerRender();
};

// Listen for router loaded event to init tasks
document.addEventListener('DOMContentLoaded', window.initTasks);
