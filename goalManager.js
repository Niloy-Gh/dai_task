/**
 * Goals Foundation Manager
 * Handles backend logic, data layer, and local storage for Goals.
 */

class GoalManager {
    constructor() {
        this.storageKey = 'student_productivity_goals';
        this.goals = [];
        this.loadGoals();
    }

    generateGoalID() {
        if (window.Utils && window.Utils.generateID) {
            return window.Utils.generateID();
        }
        return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
    }

    loadGoals() {
        try {
            const data = localStorage.getItem(this.storageKey);
            if (data === null || data === undefined) {
                this.goals = [];
                this.saveGoals();
            } else {
                this.goals = JSON.parse(data);
            }
        } catch (e) {
            console.error(`[GoalManager] Error loading goals. Resetting array.`, e);
            this.goals = [];
            this.saveGoals();
        }
        return this.goals;
    }

    saveGoals() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.goals));
            if (window.EventBus) window.EventBus.emit('goalsUpdated', this.goals);
            window.dispatchEvent(new CustomEvent('goalsUpdated', { detail: this.goals }));
        } catch (e) {
            console.error(`[GoalManager] Error saving goals`, e);
        }
    }

    createGoalObject(data) {
        // Defaults if missing
        return {
            id: data.id || this.generateGoalID(),
            title: data.title || '',
            description: data.description || '',
            startDate: data.startDate || null,
            endDate: data.endDate || null,
            category: data.category || 'Monthly', // Daily, Weekly, Monthly, Yearly
            color: data.color || 'purple', // purple, green, orange, red, blue, purple-2
            progress: data.progress ? parseInt(data.progress) : 0, // 0 - 100
            status: data.status || 'Active', // Active, Completed, Archived
            createdAt: data.createdAt || new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
    }

    getGoalById(goalId) {
        return this.goals.find(g => g.id === goalId) || null;
    }

    updateGoal(goalId, updates) {
        const index = this.goals.findIndex(g => g.id === goalId);
        if (index === -1) return false;

        this.goals[index] = {
            ...this.goals[index],
            ...updates,
            updatedAt: new Date().toISOString()
        };

        // Auto-update status based on progress
        if (this.goals[index].progress >= 100 && this.goals[index].status !== 'Archived') {
            this.goals[index].progress = 100;
            this.goals[index].status = 'Completed';
        } else if (this.goals[index].progress < 100 && this.goals[index].status === 'Completed') {
            this.goals[index].status = 'Active';
        }

        this.saveGoals();
        return true;
    }

    deleteGoal(goalId) {
        const initialLength = this.goals.length;
        this.goals = this.goals.filter(g => g.id !== goalId);
        if (this.goals.length !== initialLength) {
            this.saveGoals();
            return true;
        }
        return false;
    }
}

window.goalManager = new GoalManager();
