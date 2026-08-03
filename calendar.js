// Calendar Module - Frontend Logic

window.initCalendar = function() {
    const calendarMain = document.querySelector('.calendar-main');
    if (!calendarMain) return; // Only run on Calendar page

    const gridContainer = document.querySelector('.calendar-grid');
    const monthTitle = document.querySelector('.month-title');
    const addEventBtn = document.querySelector('.calendar-controls .btn-primary');
    
    // Modal Elements
    const modal = document.getElementById('addEventModal');
    const modalForm = document.getElementById('addEventForm');
    const btnCancel = document.getElementById('event-cancel-btn');
    const btnClose = document.getElementById('event-close-icon');
    const btnSave = document.getElementById('event-save-btn');
    const titleInput = document.getElementById('event-title');

    // Calendar State
    let currentDate = new Date();
    
    // ==========================================
    // CALENDAR GRID RENDERING
    // ==========================================

    function renderCalendar() {
        if (!gridContainer || !monthTitle) return;

        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        // Update Title
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        monthTitle.textContent = `${monthNames[month]} ${year}`;

        // Keep headers, clear days
        const headersHTML = `
            <div class="day-header">Mon</div>
            <div class="day-header">Tue</div>
            <div class="day-header">Wed</div>
            <div class="day-header">Thu</div>
            <div class="day-header">Fri</div>
            <div class="day-header">Sat</div>
            <div class="day-header">Sun</div>
        `;
        gridContainer.innerHTML = headersHTML;

        // Date calculations
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        
        let startDayIndex = firstDay.getDay() - 1; // 0 = Mon, -1 = Sun
        if (startDayIndex === -1) startDayIndex = 6;

        const prevMonthLastDay = new Date(year, month, 0).getDate();
        
        // Render previous month days
        for (let i = startDayIndex - 1; i >= 0; i--) {
            const dayNum = prevMonthLastDay - i;
            gridContainer.appendChild(createCell(dayNum, true));
        }

        // Render current month days
        const today = new Date();
        for (let i = 1; i <= lastDay.getDate(); i++) {
            const isToday = (i === today.getDate() && month === today.getMonth() && year === today.getFullYear());
            gridContainer.appendChild(createCell(i, false, isToday, year, month));
        }

        // Render next month days to fill grid (usually 42 cells total for 6 rows, minus what we added)
        const totalCellsAdded = startDayIndex + lastDay.getDate();
        const remainingCells = 42 - totalCellsAdded;
        for (let i = 1; i <= remainingCells; i++) {
            gridContainer.appendChild(createCell(i, true));
        }

        renderMiniCalendar();
        updateStats();
        updateUpcoming();
    }

    function createCell(dayNum, isOutside, isToday = false, year = null, month = null) {
        const cell = document.createElement('div');
        cell.className = `cal-cell ${isOutside ? 'outside' : ''}`;
        
        let dateHtml = `<span class="date">${dayNum}</span>`;
        if (isToday) {
            dateHtml = `<span class="date active-date" style="background:var(--color-purple); color:white; border-radius:50%; width:24px; height:24px; display:inline-flex; align-items:center; justify-content:center;">${dayNum}</span>`;
        }

        cell.innerHTML = dateHtml;

        // Inject Events
        if (!isOutside && year !== null && month !== null && window.calendarManager) {
            const targetDateStr = `${year}-${String(month+1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
            const dayEvents = window.calendarManager.events.filter(e => e.date === targetDateStr);
            
            // Sort by time
            dayEvents.sort((a,b) => (a.time || '23:59').localeCompare(b.time || '23:59'));

            const maxVisible = 2;
            dayEvents.slice(0, maxVisible).forEach(e => {
                const evDiv = document.createElement('div');
                evDiv.className = `event e-${e.color}`;
                evDiv.innerHTML = `<span class="dot"></span>${e.title}`;
                cell.appendChild(evDiv);
            });

            if (dayEvents.length > maxVisible) {
                const moreDiv = document.createElement('div');
                moreDiv.className = 'more-events';
                moreDiv.textContent = `+${dayEvents.length - maxVisible} more`;
                cell.appendChild(moreDiv);
            }
        }

        return cell;
    }

    // Navigation Listeners
    const prevBtn = document.querySelectorAll('.date-nav .nav-btn.icon-only')[0];
    const nextBtn = document.querySelectorAll('.date-nav .nav-btn.icon-only')[1];
    const todayBtn = document.querySelector('.date-nav .today-btn');

    if (prevBtn) prevBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });
    if (nextBtn) nextBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });
    if (todayBtn) todayBtn.addEventListener('click', () => {
        currentDate = new Date();
        renderCalendar();
    });

    // Mini Calendar Navigation Listeners
    const miniArrows = document.querySelectorAll('.mini-nav .arrows svg');
    if (miniArrows.length >= 2) {
        miniArrows[0].addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() - 1);
            renderCalendar();
        });
        miniArrows[1].addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() + 1);
            renderCalendar();
        });
        // Add cursor pointer for better UX
        miniArrows.forEach(arrow => arrow.style.cursor = 'pointer');
    }

    // ==========================================
    // STATS & SIDEBAR
    // ==========================================
    
    function updateStats() {
        if (!window.calendarManager || !window.taskManager) return;
        const statsPanel = document.querySelector('.summary-stats');
        if (!statsPanel) return;

        const todayStr = window.Utils ? window.Utils.formatDate(new Date()) : new Date().toDateString();
        const dateHeader = document.querySelector('.summary-panel .panel-header p');
        if (dateHeader) dateHeader.textContent = todayStr;

        const isoToday = new Date().toISOString().split('T')[0];
        const todaysEvents = window.calendarManager.events.filter(e => e.date === isoToday).length;
        const todaysTasks = window.taskManager.tasks.filter(t => t.dueDate === isoToday && t.status === 'completed').length;

        const eventStat = statsPanel.querySelector('.s-stat.bg-purple h2');
        if (eventStat) eventStat.textContent = todaysEvents;

        const taskStat = statsPanel.querySelector('.s-stat.bg-green h2');
        if (taskStat) taskStat.textContent = todaysTasks;
    }

    function updateUpcoming() {
        if (!window.calendarManager) return;
        const uList = document.querySelector('.u-list');
        if (!uList) return;

        const today = new Date();
        today.setHours(0,0,0,0);
        const nextWeek = new Date(today.getTime() + 7 * 86400000);

        const upcoming = window.calendarManager.events.filter(e => {
            if (!e.date) return false;
            const ed = new Date(e.date);
            ed.setHours(0,0,0,0);
            return ed >= today && ed <= nextWeek;
        }).sort((a,b) => new Date(a.date) - new Date(b.date)).slice(0,4);

        uList.innerHTML = '';
        if (upcoming.length === 0) {
            uList.innerHTML = '<li style="color:var(--text-secondary)">No upcoming events.</li>';
            return;
        }

        upcoming.forEach(e => {
            const timeStr = e.time || 'All Day';
            const li = document.createElement('li');
            li.innerHTML = `
                <span class="dot c-${e.color}"></span>
                <div class="u-info">
                    <h5>${e.title}</h5>
                    <span>${e.date}, ${timeStr}</span>
                </div>
            `;
            uList.appendChild(li);
        });
    }

    function renderMiniCalendar() {
        const miniTitle = document.querySelector('.mini-nav span');
        const miniGrid = document.querySelector('.mini-grid');
        
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        if (miniTitle) {
            const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            miniTitle.textContent = `${monthNames[month]} ${year}`;
        }

        if (miniGrid) {
            // Keep headers
            miniGrid.innerHTML = `
                <div class="m-head">Mo</div><div class="m-head">Tu</div><div class="m-head">We</div>
                <div class="m-head">Th</div><div class="m-head">Fr</div><div class="m-head">Sa</div><div class="m-head">Su</div>
            `;

            // Date calculations
            const firstDay = new Date(year, month, 1);
            const lastDay = new Date(year, month + 1, 0);
            
            let startDayIndex = firstDay.getDay() - 1; // 0 = Mon, -1 = Sun
            if (startDayIndex === -1) startDayIndex = 6;

            const prevMonthLastDay = new Date(year, month, 0).getDate();
            
            // Render previous month days
            for (let i = startDayIndex - 1; i >= 0; i--) {
                const dayNum = prevMonthLastDay - i;
                miniGrid.innerHTML += `<div class="m-day out">${dayNum}</div>`;
            }

            // Render current month days
            const today = new Date();
            for (let i = 1; i <= lastDay.getDate(); i++) {
                const isToday = (i === today.getDate() && month === today.getMonth() && year === today.getFullYear());
                miniGrid.innerHTML += `<div class="m-day ${isToday ? 'active' : ''}">${i}</div>`;
            }

            // Render next month days to fill grid (usually 42 cells total for 6 rows)
            const totalCellsAdded = startDayIndex + lastDay.getDate();
            const remainingCells = 42 - totalCellsAdded;
            for (let i = 1; i <= remainingCells; i++) {
                miniGrid.innerHTML += `<div class="m-day out">${i}</div>`;
            }
        }
    }

    // Subscribe to changes
    if (!window.calendarSubscribed && window.EventBus) {
        window.EventBus.on('calendarUpdated', () => {
            if (document.querySelector('.calendar-main')) renderCalendar();
        });
        window.calendarSubscribed = true;
    }

    // ==========================================
    // MODAL LOGIC
    // ==========================================
    
    if (addEventBtn && modal) {
        addEventBtn.addEventListener('click', () => {
            resetForm();
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

    if (modalForm && !modalForm.dataset.initialized) {
        modalForm.dataset.initialized = 'true';
        modalForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const title = document.getElementById('event-title').value.trim();
            const date = document.getElementById('event-date').value;
            const time = document.getElementById('event-time').value;
            const category = document.getElementById('event-category').value;
            const color = document.getElementById('event-color').value;
            const notes = document.getElementById('event-notes').value.trim();

            let isValid = true;
            document.querySelectorAll('#addEventForm .has-error').forEach(el => el.classList.remove('has-error'));
            document.querySelectorAll('#addEventForm .error-msg').forEach(el => el.classList.add('hidden'));

            if (!title) { showError('event-title', 'err-event-title'); isValid = false; }
            if (!date) { showError('event-date', 'err-event-date'); isValid = false; }

            if (!isValid) return;

            btnSave.disabled = true;
            btnSave.innerHTML = 'Saving...';

            setTimeout(() => {
                if (window.calendarManager) {
                    const newEvent = window.calendarManager.createEventObject({
                        title, date, time, category, color, notes
                    });
                    window.calendarManager.events.push(newEvent);
                    window.calendarManager.saveEvents();
                }
                btnSave.disabled = false;
                btnSave.innerHTML = 'Save Event';
                modal.classList.add('hidden');
            }, 300);
        });
    }

    function showError(inputId, errId) {
        document.getElementById(inputId).classList.add('has-error');
        document.getElementById(errId).classList.remove('hidden');
    }

    function resetForm() {
        if (modalForm) modalForm.reset();
        document.querySelectorAll('#addEventForm .has-error').forEach(el => el.classList.remove('has-error'));
        document.querySelectorAll('#addEventForm .error-msg').forEach(el => el.classList.add('hidden'));
    }

    // Initial render
    renderCalendar();
};

document.addEventListener('DOMContentLoaded', window.initCalendar);
