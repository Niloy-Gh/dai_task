// Goals Module - Frontend Logic

window.initGoals = function() {
    const goalsContainer = document.querySelector('.goals-list');
    const addGoalBtn = document.querySelector('.goals-controls .btn-primary');
    
    // Filters State
    let activeFilter = 'All Goals'; // 'All Goals', 'Active', 'Completed', 'Archived'

    // Edit State
    let editingGoalId = null;

    // Modal Elements (Global in dashboard.html)
    const modal = document.getElementById('addGoalModal');
    const modalForm = document.getElementById('addGoalForm');
    const btnCancel = document.getElementById('goal-cancel-btn');
    const btnClose = document.getElementById('goal-close-icon');
    const btnSave = document.getElementById('goal-save-btn');
    const titleInput = document.getElementById('goal-title');
    const modalHeaderTitle = modal ? modal.querySelector('.modal-header h2') : null;
    const progressSlider = document.getElementById('goal-progress-slider');
    const progressVal = document.getElementById('goal-progress-val');

    // Only run if we are on the goals view
    if (!goalsContainer) return;

    // ==========================================
    // FILTERING LOGIC
    // ==========================================

    function setupFilters() {
        const pills = document.querySelectorAll('.filter-pills .filter-pill');
        pills.forEach(pill => {
            pill.addEventListener('click', (e) => {
                pills.forEach(p => p.classList.remove('active'));
                e.target.classList.add('active');
                activeFilter = e.target.textContent.trim();
                triggerRender();
            });
        });
    }

    // ==========================================
    // RENDERING LOGIC
    // ==========================================

    function triggerRender() {
        if (window.goalManager) renderGoals(window.goalManager.goals);
    }

    function renderGoals(goals) {
        if (!goalsContainer) return;
        goalsContainer.innerHTML = ''; // Clear existing goals

        // Apply Filters
        let filteredGoals = goals.filter(goal => {
            if (activeFilter === 'All Goals') return true;
            return goal.status && goal.status.toLowerCase() === activeFilter.toLowerCase();
        });

        if (filteredGoals.length === 0) {
            goalsContainer.innerHTML = `
                <div class="empty-state" style="text-align: center; padding: 40px; color: var(--text-secondary);">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin-bottom:16px; opacity:0.5;">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    <h3>No goals found</h3>
                    <p>You don't have any ${activeFilter.toLowerCase()} right now.</p>
                </div>`;
            return;
        }

        filteredGoals.forEach(goal => {
            const card = createGoalCard(goal);
            goalsContainer.appendChild(card);
        });
    }

    function getIconSVG(color) {
        switch(color) {
            case 'green':
                return '<path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path>';
            case 'orange':
                return '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>';
            case 'purple-2':
                return '<circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle>';
            case 'blue':
                return '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line>';
            case 'red':
                return '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>';
            default: // purple
                return '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>';
        }
    }

    function createGoalCard(goal) {
        const card = document.createElement('div');
        card.className = 'goal-card';
        
        let statusBadgeClass = 'status-active';
        if (goal.status === 'Completed') statusBadgeClass = 'status-active-green';
        if (goal.status === 'Archived') statusBadgeClass = 'status-active-gray';
        // Note: The original CSS didn't have 'status-active-green' or 'status-active-gray' but we can map it to what's available or fallback
        if (goal.color === 'red') statusBadgeClass = 'status-active-red';

        const startDateStr = window.Utils ? window.Utils.formatDate(new Date(goal.startDate)) : goal.startDate;
        const endDateStr = window.Utils ? window.Utils.formatDate(new Date(goal.endDate)) : goal.endDate;

        card.innerHTML = `
            <div class="goal-header">
                <div class="goal-icon icon-${goal.color}">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        ${getIconSVG(goal.color)}
                    </svg>
                </div>
                <div class="goal-info">
                    <h3>${goal.title}</h3>
                    <p>${goal.description}</p>
                </div>
                <div class="goal-actions">
                    <span class="status-badge ${statusBadgeClass}">${goal.status}</span>
                    <button class="menu-btn">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
                    </button>
                </div>
            </div>
            
            <div class="goal-progress">
                <div class="progress-track" style="display:flex; align-items:center; gap:10px;">
                    <div style="flex:1; background: rgba(255,255,255,0.05); height: 8px; border-radius: 4px; overflow: hidden;">
                        <div class="progress-fill fill-${goal.color}" style="width: ${goal.progress}%; height: 100%; border-radius: 4px; transition: width 0.3s ease;"></div>
                    </div>
                    <span style="font-size:0.8rem; color:var(--text-secondary); width:35px; text-align:right;">${goal.progress}%</span>
                </div>
            </div>
            
            <div class="goal-footer">
                <div class="goal-date">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                    ${startDateStr} - ${endDateStr}
                </div>
                <span class="category-badge">${goal.category}</span>
            </div>
        `;

        // Context Menu Logic
        const menuBtn = card.querySelector('.menu-btn');
        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            document.querySelectorAll('.custom-context-menu').forEach(m => m.remove());

            const contextMenu = document.createElement('div');
            contextMenu.className = 'custom-context-menu glass-effect';
            contextMenu.style.position = 'absolute';
            contextMenu.style.right = '0';
            contextMenu.style.top = '100%';
            contextMenu.style.marginTop = '8px';
            contextMenu.style.padding = '8px';
            contextMenu.style.borderRadius = '10px';
            contextMenu.style.zIndex = '100';
            contextMenu.style.minWidth = '150px';
            contextMenu.style.background = 'rgba(30,30,45,0.95)';
            contextMenu.style.border = '1px solid rgba(255,255,255,0.1)';
            contextMenu.style.boxShadow = '0 10px 25px rgba(0,0,0,0.5)';

            const menuWrapper = card.querySelector('.goal-actions');
            menuWrapper.style.position = 'relative';

            // Edit Option
            const editBtn = document.createElement('div');
            editBtn.textContent = 'Edit Goal';
            editBtn.style.padding = '8px 12px';
            editBtn.style.borderRadius = '6px';
            editBtn.style.fontSize = '0.9rem';
            editBtn.style.cursor = 'pointer';
            editBtn.addEventListener('mouseover', () => editBtn.style.background = 'rgba(255,255,255,0.1)');
            editBtn.addEventListener('mouseout', () => editBtn.style.background = 'transparent');
            editBtn.addEventListener('click', (ev) => {
                ev.stopPropagation();
                openEditModal(goal);
                contextMenu.remove();
            });

            // Delete Option
            const delBtn = document.createElement('div');
            delBtn.textContent = 'Delete';
            delBtn.style.padding = '8px 12px';
            delBtn.style.borderRadius = '6px';
            delBtn.style.fontSize = '0.9rem';
            delBtn.style.color = '#ff6b6b';
            delBtn.style.cursor = 'pointer';
            delBtn.addEventListener('mouseover', () => delBtn.style.background = 'rgba(255,107,107,0.1)');
            delBtn.addEventListener('mouseout', () => delBtn.style.background = 'transparent');
            delBtn.addEventListener('click', (ev) => {
                ev.stopPropagation();
                if (confirm('Are you sure you want to delete this goal?')) {
                    if (window.goalManager) window.goalManager.deleteGoal(goal.id);
                }
                contextMenu.remove();
            });

            contextMenu.appendChild(editBtn);
            contextMenu.appendChild(delBtn);
            menuWrapper.appendChild(contextMenu);

            const closeCtx = () => {
                contextMenu.remove();
                document.removeEventListener('click', closeCtx);
            };
            setTimeout(() => document.addEventListener('click', closeCtx), 10);
        });

        return card;
    }

    // Subscribe to EventBus
    if (!window.goalsSubscribedToEventBus && window.EventBus) {
        window.EventBus.on('goalsUpdated', () => {
            if (document.querySelector('.goals-list')) {
                triggerRender();
            }
        });
        window.goalsSubscribedToEventBus = true;
    }

    // ==========================================
    // MODAL LOGIC (ADD & EDIT)
    // ==========================================

    // Handle Progress Slider interaction
    if (progressSlider && progressVal) {
        progressSlider.addEventListener('input', (e) => {
            progressVal.textContent = e.target.value + '%';
        });
    }

    if (addGoalBtn && modal) {
        addGoalBtn.addEventListener('click', () => {
            editingGoalId = null; 
            if (modalHeaderTitle) modalHeaderTitle.textContent = 'Add New Goal';
            if (btnSave) btnSave.innerHTML = 'Save Goal';
            
            resetGoalForm();
            modal.classList.remove('hidden');
            setTimeout(() => { if (titleInput) titleInput.focus(); }, 50);
        });

        const closeModal = () => modal.classList.add('hidden');

        if (!modal.dataset.initialized) {
            modal.dataset.initialized = 'true';
            btnCancel.addEventListener('click', closeModal);
            btnClose.addEventListener('click', closeModal);
            modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal();
            });
        }
    }

    function openEditModal(goal) {
        editingGoalId = goal.id;
        if (modalHeaderTitle) modalHeaderTitle.textContent = 'Edit Goal';
        if (btnSave) btnSave.innerHTML = 'Update Goal';
        
        document.getElementById('goal-title').value = goal.title;
        document.getElementById('goal-desc').value = goal.description;
        document.getElementById('goal-start-date').value = goal.startDate;
        document.getElementById('goal-end-date').value = goal.endDate;
        document.getElementById('goal-category').value = goal.category;
        document.getElementById('goal-color').value = goal.color;
        
        if (progressSlider && progressVal) {
            progressSlider.value = goal.progress;
            progressVal.textContent = goal.progress + '%';
        }

        document.querySelectorAll('#addGoalForm .has-error').forEach(el => el.classList.remove('has-error'));
        document.querySelectorAll('#addGoalForm .error-msg').forEach(el => el.classList.add('hidden'));

        modal.classList.remove('hidden');
        setTimeout(() => { if (titleInput) titleInput.focus(); }, 50);
    }

    if (modalForm && !modalForm.dataset.initialized) {
        modalForm.dataset.initialized = 'true';
        modalForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const title = document.getElementById('goal-title').value.trim();
            const desc = document.getElementById('goal-desc').value.trim();
            const startDate = document.getElementById('goal-start-date').value;
            const endDate = document.getElementById('goal-end-date').value;
            const category = document.getElementById('goal-category').value;
            const color = document.getElementById('goal-color').value;
            const progress = document.getElementById('goal-progress-slider') ? document.getElementById('goal-progress-slider').value : 0;

            let isValid = true;
            document.querySelectorAll('#addGoalForm .has-error').forEach(el => el.classList.remove('has-error'));
            document.querySelectorAll('#addGoalForm .error-msg').forEach(el => el.classList.add('hidden'));

            if (!title) {
                document.getElementById('goal-title').classList.add('has-error');
                document.getElementById('err-goal-title').classList.remove('hidden');
                isValid = false;
            }
            if (!startDate) {
                document.getElementById('goal-start-date').classList.add('has-error');
                document.getElementById('err-goal-start').classList.remove('hidden');
                isValid = false;
            }
            if (!endDate) {
                document.getElementById('goal-end-date').classList.add('has-error');
                document.getElementById('err-goal-end').classList.remove('hidden');
                isValid = false;
            }

            if (!isValid) return;

            btnSave.disabled = true;
            btnSave.innerHTML = 'Saving...';

            setTimeout(() => {
                if (window.goalManager) {
                    if (editingGoalId) {
                        window.goalManager.updateGoal(editingGoalId, {
                            title, description: desc, startDate, endDate, category, color, progress
                        });
                    } else {
                        const newGoal = window.goalManager.createGoalObject({
                            title, description: desc, startDate, endDate, category, color, progress
                        });
                        window.goalManager.goals.push(newGoal);
                        window.goalManager.saveGoals();
                    }
                }
                
                btnSave.disabled = false;
                modal.classList.add('hidden');
            }, 300);
        });
    }

    function resetGoalForm() {
        if (modalForm) modalForm.reset();
        document.querySelectorAll('#addGoalForm .has-error').forEach(el => el.classList.remove('has-error'));
        document.querySelectorAll('#addGoalForm .error-msg').forEach(el => el.classList.add('hidden'));
        if (progressSlider && progressVal) {
            progressSlider.value = 0;
            progressVal.textContent = '0%';
        }
    }

    // Initialization
    setupFilters();
    triggerRender();
};

document.addEventListener('DOMContentLoaded', window.initGoals);
