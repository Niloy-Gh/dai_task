// Sidebar State and Interactions

document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.querySelector('.sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const navItems = document.querySelectorAll('.sidebar-nav .nav-item, .sidebar-bottom .nav-item');
    
    // Load state from local storage immediately to prevent flashing
    const isCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
    if (isCollapsed && sidebar) {
        sidebar.classList.add('collapsed');
    }

    // Toggle Desktop Sidebar
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
            
            // Save state to local storage
            const currentState = sidebar.classList.contains('collapsed');
            localStorage.setItem('sidebarCollapsed', currentState.toString());
        });
    }

    // Mobile Hamburger Menu
    if (mobileMenuBtn && sidebar && sidebarOverlay) {
        mobileMenuBtn.addEventListener('click', () => {
            sidebar.classList.add('open');
            sidebarOverlay.classList.add('show');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    }

    // Close Mobile Menu functions
    function closeMobileMenu() {
        if (sidebar && sidebarOverlay) {
            sidebar.classList.remove('open');
            sidebarOverlay.classList.remove('show');
            document.body.style.overflow = ''; 
        }
    }

    // Close on overlay click
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', closeMobileMenu);
    }

    // Close on nav item click (mobile)
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                closeMobileMenu();
            }
        });
    });
});

// Immediately apply state before DOMContentLoaded to avoid flicker if script is in <head>
(function() {
    const isCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
    // If the script runs before body parsing, this will fail safely, hence the DOMContentLoaded backup
    if (isCollapsed && document.querySelector('.sidebar')) {
        document.querySelector('.sidebar').classList.add('collapsed');
    }
})();
