/**
 * Settings Manager
 * Handles backend logic, user preferences, theming, and data persistence for Settings.
 */

class SettingsManager {
    constructor() {
        this.storageKey = 'student_productivity_settings';
        this.profileKey = 'student_productivity_profile';
        
        this.defaultSettings = {
            theme: 'Dark', // Light, Dark, System
            accentColor: 'purple', // purple, blue, green, orange, teal
            fontSize: 'Medium', // Small, Medium, Large
            uiDensity: 'Comfortable', // Comfortable, Compact
            cornerRadius: 'Medium', // Small, Medium, Large
            notifications: {
                taskReminders: true,
                goalReminders: true,
                desktopNotif: true,
                emailNotif: false,
                achievements: true,
                sound: true,
                dailySummary: false,
                weeklySummary: true
            }
        };

        this.defaultProfile = {
            fullName: 'Niloy Ghosh',
            email: 'niloy@example.com',
            university: 'Chandigarh University',
            course: 'B.E. Computer Science',
            country: 'India',
            bio: 'Focused on building a better version of myself everyday.'
        };

        this.settings = { ...this.defaultSettings };
        this.profile = { ...this.defaultProfile };

        this.loadData();
        this.applyAppearanceSettings();
    }

    loadData() {
        try {
            const savedSettings = localStorage.getItem(this.storageKey);
            if (savedSettings) this.settings = { ...this.defaultSettings, ...JSON.parse(savedSettings) };
            
            const savedProfile = localStorage.getItem(this.profileKey);
            if (savedProfile) this.profile = { ...this.defaultProfile, ...JSON.parse(savedProfile) };
        } catch (e) {
            console.error('[SettingsManager] Error loading data', e);
        }
    }

    saveSettings() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.settings));
        this.applyAppearanceSettings();
        if (window.EventBus) window.EventBus.emit('settingsUpdated', this.settings);
    }

    saveProfile() {
        localStorage.setItem(this.profileKey, JSON.stringify(this.profile));
        this.updateProfileUI();
        if (window.EventBus) window.EventBus.emit('profileUpdated', this.profile);
    }

    updateProfileUI() {
        const nameTags = document.querySelectorAll('.profile-title h3, #dashboard-greeting');
        if (nameTags.length > 0) {
            const firstName = this.profile.fullName.split(' ')[0] || 'User';
            const dashGreeting = document.getElementById('dashboard-greeting');
            if (dashGreeting) dashGreeting.textContent = `Good Morning, ${firstName}! 👋`;
        }
    }

    applyAppearanceSettings() {
        const root = document.documentElement;

        // 1. Accent Color
        const colorMap = {
            'purple': '#7257ff',
            'blue': '#3b82f6',
            'green': '#10b981',
            'orange': '#f59e0b',
            'teal': '#14b8a6'
        };
        const activeColor = colorMap[this.settings.accentColor] || colorMap['purple'];
        root.style.setProperty('--color-purple', activeColor);
        root.style.setProperty('--primary-btn-hover', activeColor); // Assuming similar hover behavior

        // 2. Theme 
        // Our app is native dark. We will toggle a class for Light mode.
        if (this.settings.theme === 'Light') {
            document.body.classList.add('theme-light');
            root.style.setProperty('--bg-main', '#f3f4f6');
            root.style.setProperty('--bg-card', '#ffffff');
            root.style.setProperty('--text-primary', '#111827');
            root.style.setProperty('--text-secondary', '#4b5563');
            root.style.setProperty('--border-color', 'rgba(0,0,0,0.1)');
        } else {
            document.body.classList.remove('theme-light');
            root.style.setProperty('--bg-main', '#0f0f13');
            root.style.setProperty('--bg-card', 'rgba(25, 25, 32, 0.6)');
            root.style.setProperty('--text-primary', '#ffffff');
            root.style.setProperty('--text-secondary', '#8a8a98');
            root.style.setProperty('--border-color', 'rgba(255, 255, 255, 0.05)');
        }

        // 3. Font Size
        if (this.settings.fontSize === 'Small') {
            root.style.fontSize = '14px';
        } else if (this.settings.fontSize === 'Large') {
            root.style.fontSize = '18px';
        } else {
            root.style.fontSize = '16px';
        }

        // 4. UI Density
        if (this.settings.uiDensity === 'Compact') {
            root.style.setProperty('--spacing-main', '12px');
        } else {
            root.style.setProperty('--spacing-main', '24px');
        }

        // 5. Corner Radius
        if (this.settings.cornerRadius === 'Small') {
            root.style.setProperty('--border-radius', '8px');
        } else if (this.settings.cornerRadius === 'Large') {
            root.style.setProperty('--border-radius', '24px');
        } else {
            root.style.setProperty('--border-radius', '16px');
        }
    }

    exportData() {
        const exportObj = {
            tasks: localStorage.getItem('student_productivity_tasks'),
            calendar: localStorage.getItem('student_productivity_calendar'),
            goals: localStorage.getItem('student_productivity_goals'),
            settings: localStorage.getItem('student_productivity_settings'),
            profile: localStorage.getItem('student_productivity_profile'),
            timestamp: new Date().toISOString()
        };
        
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href",     dataStr);
        downloadAnchorNode.setAttribute("download", "productivity_hub_backup.json");
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    }

    importData(jsonString) {
        try {
            const data = JSON.parse(jsonString);
            if (data.tasks) localStorage.setItem('student_productivity_tasks', data.tasks);
            if (data.calendar) localStorage.setItem('student_productivity_calendar', data.calendar);
            if (data.goals) localStorage.setItem('student_productivity_goals', data.goals);
            if (data.settings) localStorage.setItem('student_productivity_settings', data.settings);
            if (data.profile) localStorage.setItem('student_productivity_profile', data.profile);
            
            alert('Data successfully imported! The application will now reload.');
            window.location.reload();
        } catch (e) {
            alert('Error parsing JSON backup file. Please ensure it is a valid backup.');
            console.error(e);
        }
    }
    
    deleteAccount() {
        localStorage.removeItem('student_productivity_tasks');
        localStorage.removeItem('student_productivity_calendar');
        localStorage.removeItem('student_productivity_goals');
        localStorage.removeItem('student_productivity_settings');
        localStorage.removeItem('student_productivity_profile');
        alert('Account data permanently deleted. Reloading...');
        window.location.reload();
    }
}

// Instantiate globally
window.settingsManager = new SettingsManager();
