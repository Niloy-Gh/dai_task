const fs = require('fs');

const calendarHtml = fs.readFileSync('calendar.html', 'utf8');
const tasksHtml = fs.readFileSync('tasks.html', 'utf8');
const goalsHtml = fs.readFileSync('goals.html', 'utf8');
const analyticsHtml = fs.readFileSync('analytics.html', 'utf8');
const settingsHtml = fs.readFileSync('settings.html', 'utf8');

function extractContainer(html) {
    const start = html.indexOf('<div class="page-container');
    if (start === -1) return '';
    
    const match = html.match(/<div class="page-container[\s\S]*?<\/body>/);
    if (match) {
        return match[0].replace(/<\/body>$/, '').replace(/<\/div>\s*$/, '');
    }
    return '';
}

const calendarContent = extractContainer(calendarHtml);
const tasksContent = extractContainer(tasksHtml);
const goalsContent = extractContainer(goalsHtml);
const analyticsContent = extractContainer(analyticsHtml);
const settingsContent = extractContainer(settingsHtml);

const routerCode = `
// Vanilla JS SPA Router (Local-first)

document.addEventListener('DOMContentLoaded', () => {
    const mainContentContainer = document.querySelector('.main-content');
    if (!mainContentContainer) return;

    // Cache with preloaded HTML to bypass local file CORS restrictions
    const pageCache = {
        'dashboard.html': mainContentContainer.innerHTML,
        'calendar.html': \`${calendarContent.replace(/`/g, '\\`')}\`,
        'tasks.html': \`${tasksContent.replace(/`/g, '\\`')}\`,
        'goals.html': \`${goalsContent.replace(/`/g, '\\`')}\`,
        'analytics.html': \`${analyticsContent.replace(/`/g, '\\`')}\`,
        'settings.html': \`${settingsContent.replace(/`/g, '\\`')}\`
    };

    const navLinks = document.querySelectorAll('.sidebar-nav .nav-item, .sidebar-bottom .nav-item');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            let href = link.getAttribute('href');
            if (!href || href === '#' || href === 'index.html') return;
            
            e.preventDefault();
            
            navLinks.forEach(n => n.classList.remove('active'));
            link.classList.add('active');

            if (pageCache[href]) {
                mainContentContainer.innerHTML = pageCache[href];
                reinitializeScripts(href);
            } else {
                mainContentContainer.innerHTML = '<div style="padding: 40px; color: white;"><h2>Work in progress</h2><p>This page has not been built yet.</p></div>';
            }
        });
    });

    function reinitializeScripts(href) {
        if (href === 'tasks.html' && window.initTasks) {
            window.initTasks();
        } else if (href === 'dashboard.html' && window.initDashboard) {
            window.initDashboard();
        } else if (href === 'calendar.html' && window.initCalendar) {
            window.initCalendar();
        } else if (href === 'goals.html' && window.initGoals) {
            window.initGoals();
        } else if (href === 'analytics.html' && window.initAnalytics) {
            window.initAnalytics();
        } else if (href === 'settings.html' && window.initSettings) {
            window.initSettings();
        }
    }
});
`;

fs.writeFileSync('js/router.js', routerCode);
console.log('Successfully built js/router.js with embedded HTML for Settings!');
