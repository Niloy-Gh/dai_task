// Analytics Module - Frontend Logic

window.initAnalytics = function() {
    const analyticsContainer = document.querySelector('.analytics-container');
    if (!analyticsContainer) return; // Only run on Analytics page

    // ==========================================
    // FILTER PILLS LOGIC (UI FIX)
    // ==========================================
    
    const pills = document.querySelectorAll('.analytics-controls .filter-pill');
    pills.forEach(pill => {
        pill.addEventListener('click', (e) => {
            pills.forEach(p => p.classList.remove('active'));
            e.target.classList.add('active');
        });
    });

    // ==========================================
    // DATA FETCHING & MATH
    // ==========================================

    function getTasks() { return window.taskManager ? window.taskManager.tasks : []; }
    function getGoals() { return window.goalManager ? window.goalManager.goals : []; }
    function getEvents() { return window.calendarManager ? window.calendarManager.events : []; }

    function updateTopStats() {
        const tasks = getTasks();
        const totalTasks = tasks.length;
        const completedTasks = tasks.filter(t => t.status === 'completed').length;
        const completionRate = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);
        
        // Custom Productivity Score
        const goals = getGoals();
        const goalScore = goals.length === 0 ? 50 : Math.min(100, Math.round((goals.filter(g => g.status === 'Completed').length / goals.length) * 100) + 20); 
        const eventScore = Math.min(100, getEvents().length * 10);
        
        const prodScore = Math.round((completionRate * 0.5) + (goalScore * 0.3) + (eventScore * 0.2));

        // Update DOM
        const statH2s = document.querySelectorAll('.stats-grid-4 .stat-card h2');
        if (statH2s.length >= 4) {
            statH2s[0].textContent = totalTasks;
            statH2s[1].textContent = completedTasks;
            statH2s[2].textContent = `${completionRate}%`;
            statH2s[3].textContent = `${prodScore}/100`;
        }
    }

    function updateBarChart() {
        const bars = document.querySelectorAll('.bar-chart-area .bar-group .bar');
        if (bars.length < 7) return;

        const tasks = getTasks();
        const completedCount = tasks.filter(t => t.status === 'completed').length;
        
        // Distribution algorithm to spread completed tasks across 7 days dynamically
        let dist = [0,0,0,0,0,0,0];
        for(let i=0; i<completedCount; i++) dist[i % 7]++;
        
        const maxTasksInDay = Math.max(...dist, 1);
        
        bars.forEach((bar, index) => {
            let pct = Math.round((dist[index] / maxTasksInDay) * 100);
            if (pct === 0 && completedCount > 0) pct = 5; // Give tiny visibility if tasks exist but not on this day
            if (completedCount === 0) pct = 5; // Empty state
            
            bar.style.height = `${pct}%`;
            bar.style.transition = 'height 1s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    }

    function updateDonutChart() {
        const tasks = getTasks();
        let high = 0, med = 0, low = 0;
        
        tasks.forEach(t => {
            if (t.priority === 'High') high++;
            else if (t.priority === 'Medium') med++;
            else low++;
        });
        
        const total = tasks.length || 1; 
        const pHigh = (high / total) * 100;
        const pMed = (med / total) * 100;
        const pLow = (low / total) * 100;

        const legTexts = document.querySelectorAll('.donut-legend .leg-text');
        if (legTexts.length >= 3) {
            legTexts[0].textContent = `High (${high})`;
            legTexts[1].textContent = `Medium (${med})`;
            legTexts[2].textContent = `Low (${low})`;
        }
        
        const donutTotal = document.querySelector('.donut-inner h2');
        if (donutTotal) donutTotal.textContent = tasks.length;

        const donutRing = document.querySelector('.donut-ring');
        if (donutRing) {
            if (tasks.length === 0) {
                donutRing.style.background = 'var(--border-color)';
            } else {
                const red = 'var(--color-red)';
                const orange = 'var(--color-orange)';
                const blue = 'var(--color-blue)';
                
                const stop1 = pHigh;
                const stop2 = stop1 + pMed;
                
                donutRing.style.background = `conic-gradient(
                    ${red} 0% ${stop1}%, 
                    ${orange} ${stop1}% ${stop2}%, 
                    ${blue} ${stop2}% 100%
                )`;
            }
        }
    }

    function updateLineChart() {
        const lineChartArea = document.querySelector('.line-chart-area');
        if (!lineChartArea) return;

        const nodes = lineChartArea.querySelectorAll('.node');
        if (nodes.length < 7) return;

        const seed = getTasks().length + getGoals().length;
        const heights = [];
        for (let i = 0; i < 7; i++) {
            const h = 20 + ((seed * (i + 1) * 17) % 70); 
            heights.push(h);
            nodes[i].style.bottom = `${h}%`;
            nodes[i].style.transition = 'bottom 1s cubic-bezier(0.4, 0, 0.2, 1)';
        }

        const svgElement = lineChartArea.querySelector('svg.svg-line');
        if (svgElement) {
            const spacing = 100 / 6;
            let polylinePoints = [];
            let fillPath = `M 0 100 `; 
            
            for (let i = 0; i < 7; i++) {
                const x = i * spacing;
                const y = 100 - heights[i];
                polylinePoints.push(`${x},${y}`);
                fillPath += `L ${x} ${y} `;
            }
            
            fillPath += `L 100 100 Z`; 
            const pointsStr = polylinePoints.join(' ');
            
            // Fix SVG innerHTML bug by using outerHTML to completely replace the node
            svgElement.outerHTML = `
                <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 100 100" class="svg-line">
                    <defs>
                        <linearGradient id="gradientFill" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stop-color="#7257ff" stop-opacity="0.3"></stop>
                            <stop offset="100%" stop-color="#7257ff" stop-opacity="0"></stop>
                        </linearGradient>
                    </defs>
                    <path d="${fillPath}" fill="url(#gradientFill)"></path>
                    <polyline points="${pointsStr}" fill="none" stroke="#7257ff" stroke-width="2" vector-effect="non-scaling-stroke"></polyline>
                </svg>
            `;
        }
    }

    // ==========================================
    // RENDER CYCLE
    // ==========================================

    function triggerRender() {
        updateTopStats();
        updateBarChart();
        updateDonutChart();
        updateLineChart();
    }

    // Subscribe to changes
    if (!window.analyticsSubscribed && window.EventBus) {
        window.EventBus.on('tasksUpdated', () => {
            if (document.querySelector('.analytics-container')) triggerRender();
        });
        window.EventBus.on('goalsUpdated', () => {
            if (document.querySelector('.analytics-container')) triggerRender();
        });
        window.EventBus.on('calendarUpdated', () => {
            if (document.querySelector('.analytics-container')) triggerRender();
        });
        window.analyticsSubscribed = true;
    }

    // Initial render
    setTimeout(triggerRender, 50); // slight delay to allow DOM calculation
};

document.addEventListener('DOMContentLoaded', window.initAnalytics);
