// Core Utilities

const Utils = {
    /**
     * Generates a unique collision-resistant ID based on current timestamp and random string
     */
    generateID() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
    },

    /**
     * Formats a date object or string into a readable format (e.g. "31 July 2026")
     */
    formatDate(dateInput) {
        if (!dateInput) return '';
        const d = new Date(dateInput);
        if (isNaN(d.getTime())) return dateInput; // Return as-is if invalid

        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const day = d.getDate();
        const month = months[d.getMonth()];
        const year = d.getFullYear();
        
        return `${day} ${month} ${year}`;
    },

    // ----------------------------------------------------
    // UI Refresh Stubs (As requested: Foundation only)
    // ----------------------------------------------------
    
    updateUI(context = 'all') {
        console.log(`[Utils] updateUI triggered for context: ${context}`);
        // Foundation logic: dispatch specific refresh events based on context
        if (context === 'all' || context === 'dashboard') this.refreshDashboard();
        if (context === 'all' || context === 'calendar') this.refreshCalendar();
        if (context === 'all' || context === 'analytics') this.refreshAnalytics();
    },

    refreshDashboard() {
        console.log(`[Utils] refreshDashboard triggered.`);
        // Placeholder for future logic
    },

    refreshCalendar() {
        console.log(`[Utils] refreshCalendar triggered.`);
        // Placeholder for future logic
    },

    refreshAnalytics() {
        console.log(`[Utils] refreshAnalytics triggered.`);
        // Placeholder for future logic
    }
};

window.Utils = Utils;
