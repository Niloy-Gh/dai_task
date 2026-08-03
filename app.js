// Main Application Entry Point

document.addEventListener('DOMContentLoaded', () => {
    
    // Subscribe to EventBus for profile updates
    if (window.EventBus) {
        window.EventBus.on('profileUpdated', (profile) => {
            updateGlobalUI(profile);
        });
    }

    // Initial UI update
    if (window.State) {
        updateGlobalUI(window.State.get('profile'));
    } else {
        updateGlobalUI({ fullName: 'Guest' });
    }

    // Add a simple wave animation dynamically for the hand emoji
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes wave {
            0% { transform: rotate(0deg); }
            10% { transform: rotate(14deg); }
            20% { transform: rotate(-8deg); }
            30% { transform: rotate(14deg); }
            40% { transform: rotate(-4deg); }
            50% { transform: rotate(10deg); }
            60% { transform: rotate(0deg); }
            100% { transform: rotate(0deg); }
        }
    `;
    document.head.appendChild(style);

    // Set today's date dynamically in header
    const dateElement = document.querySelector('.current-date');
    if (dateElement) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dateElement.textContent = new Date().toLocaleDateString('en-US', options);
    }
});

function updateGlobalUI(user) {
    const dashboardGreeting = document.getElementById('dashboard-greeting');
    const sidebarName = document.getElementById('sidebar-name'); // We removed the profile card, but keeping this just in case

    if (dashboardGreeting) {
        dashboardGreeting.innerHTML = `Good Morning, ${user.fullName || 'Guest'}! <span style="display:inline-block; animation: wave 2s infinite; transform-origin: 70% 70%;">👋</span>`;
    }
    if (sidebarName) {
        sidebarName.textContent = user.fullName || "Guest";
    }
}
