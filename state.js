// Centralized Application State Management

const DEFAULT_STATE_BLUEPRINTS = {
    tasks: [],
    goals: [],
    habits: [],
    calendar: [],
    settings: {
        theme: 'dark',
        accentColor: 'purple',
        fontSize: 'medium',
        density: 'comfortable',
        radius: 'medium'
    },
    profile: {
        fullName: 'Niloy Ghosh',
        email: 'niloy@example.com',
        university: 'Chandigarh University',
        course: 'B.E. Computer Science',
        country: 'India',
        bio: 'Focused on building a better version of myself everyday.',
        avatar: 'ui/desh_bord.png'
    },
    preferences: {
        language: 'en',
        timezone: 'Asia/Kolkata'
    },
    notifications: {
        taskReminders: true,
        goalReminders: true,
        habitReminders: true,
        desktopPush: true,
        emailPush: false,
        achievementPush: true,
        sound: true,
        dailySummary: false,
        weeklySummary: true
    },
    analytics: {
        xp: 500,
        level: 8,
        tasksCompleted: 0,
        currentStreak: 0
    }
};

class StateManager {
    constructor() {
        this.domains = {
            tasks: 'hub_tasks',
            goals: 'hub_goals',
            habits: 'hub_habits',
            calendar: 'hub_calendar',
            settings: 'hub_settings',
            profile: 'hub_profile',
            preferences: 'hub_preferences',
            notifications: 'hub_notifications',
            analytics: 'hub_analytics'
        };
        
        this.state = {};
        this.initializeState();
    }

    /**
     * Loads all domains from storage or seeds defaults
     */
    initializeState() {
        console.log('[State] Initializing application state...');
        
        for (const [domain, storageKey] of Object.entries(this.domains)) {
            const defaultBlueprint = DEFAULT_STATE_BLUEPRINTS[domain];
            
            // Deep clone default blueprint to prevent reference mutation
            const fallback = JSON.parse(JSON.stringify(defaultBlueprint));
            
            this.state[domain] = window.Storage.loadData(storageKey, fallback);
        }
    }

    /**
     * Get a specific domain's state
     * @param {string} domain - e.g. 'tasks'
     * @returns {*} - The current state of that domain
     */
    get(domain) {
        if (!this.domains[domain]) {
            console.error(`[State] Invalid domain requested: ${domain}`);
            return null;
        }
        // Return deep copy to prevent direct mutation outside setter
        return JSON.parse(JSON.stringify(this.state[domain]));
    }

    /**
     * Update a specific domain's state
     * @param {string} domain - e.g. 'tasks'
     * @param {*} newData - The new data to set
     */
    set(domain, newData) {
        if (!this.domains[domain]) {
            console.error(`[State] Invalid domain update attempted: ${domain}`);
            return;
        }

        // Update internal state
        this.state[domain] = newData;
        
        // Persist to local storage
        window.Storage.saveData(this.domains[domain], newData);
        
        // Broadcast change to all UI listeners
        window.EventBus.emit(`${domain}Updated`, newData);
        
        // Trigger global UI refresh helper
        if (window.Utils) {
            window.Utils.updateUI(domain);
        }
    }

    // ----------------------------------------------------
    // Convenience Helpers for Domains
    // ----------------------------------------------------

    updateTasks(tasksArray) { this.set('tasks', tasksArray); }
    updateGoals(goalsArray) { this.set('goals', goalsArray); }
    updateHabits(habitsArray) { this.set('habits', habitsArray); }
    updateCalendar(eventsArray) { this.set('calendar', eventsArray); }
    updateSettings(settingsObj) { this.set('settings', settingsObj); }
    updateProfile(profileObj) { this.set('profile', profileObj); }
    updatePreferences(prefObj) { this.set('preferences', prefObj); }
    updateNotifications(notifObj) { this.set('notifications', notifObj); }
    updateAnalytics(analyticsObj) { this.set('analytics', analyticsObj); }
}

// Global Singleton Instance
window.State = new StateManager();
