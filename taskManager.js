/**
 * Task Foundation Manager
 * Handles the backend logic, data layer, and local storage for the Tasks module.
 * Exclusively manages the 'student_productivity_tasks' localStorage key.
 */

class TaskManager {
    constructor() {
        this.storageKey = 'student_productivity_tasks';
        this.tasks = [];
        this.loadTasks();
    }

    /**
     * Helper: Generate a unique ID for tasks
     */
    generateTaskID() {
        // Fallback to our Utils if available, otherwise generate standalone
        if (window.Utils && window.Utils.generateID) {
            return window.Utils.generateID();
        }
        return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
    }

    /**
     * Load all tasks from localStorage
     */
    loadTasks() {
        try {
            const data = localStorage.getItem(this.storageKey);
            if (data === null || data === undefined) {
                // If no data exists, automatically create an empty task array
                this.tasks = [];
                this.saveTasks();
            } else {
                this.tasks = JSON.parse(data);
            }
        } catch (e) {
            console.error(`[TaskManager] Error loading tasks from ${this.storageKey}. Resetting to empty array.`, e);
            this.tasks = [];
            this.saveTasks();
        }
        return this.tasks;
    }

    /**
     * Save current tasks to localStorage and dispatch event
     */
    saveTasks() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.tasks));
            
            // Dispatch event via EventBus if available
            if (window.EventBus) {
                window.EventBus.emit('tasksUpdated', this.tasks);
            }
            
            // Also dispatch standard DOM event as a fallback
            window.dispatchEvent(new CustomEvent('tasksUpdated', { detail: this.tasks }));
            
        } catch (e) {
            console.error(`[TaskManager] Error saving tasks to ${this.storageKey}`, e);
        }
    }

    /**
     * Create a standard Task Object adhering strictly to the Task Data Model
     */
    createTaskObject(data) {
        return {
            id: data.id || this.generateTaskID(),
            title: data.title || '',
            description: data.description || '',
            category: data.category || 'general',
            repeatType: data.repeatType || 'none',
            priority: data.priority || 'medium',
            status: data.status || 'pending',
            dueDate: data.dueDate || null,
            dueTime: data.dueTime || null,
            createdAt: data.createdAt || new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            completedAt: data.completedAt || null,
            tags: Array.isArray(data.tags) ? data.tags : [],
            notes: data.notes || ''
        };
    }

    /**
     * Validate a task before saving/updating
     */
    validateTask(taskData) {
        if (!taskData.title || taskData.title.trim() === '') {
            return { valid: false, error: 'Task title is required.' };
        }
        return { valid: true };
    }

    /**
     * Retrieve a specific task by its ID
     */
    getTaskById(taskId) {
        return this.tasks.find(t => t.id === taskId) || null;
    }

    /**
     * Update an existing task
     */
    updateTask(taskId, updates) {
        const index = this.tasks.findIndex(t => t.id === taskId);
        if (index === -1) {
            console.warn(`[TaskManager] Cannot update: Task ID ${taskId} not found.`);
            return false;
        }

        // Merge existing task with updates
        this.tasks[index] = {
            ...this.tasks[index],
            ...updates,
            updatedAt: new Date().toISOString()
        };

        this.saveTasks();
        return true;
    }

    /**
     * Delete a task by its ID
     */
    deleteTask(taskId) {
        const initialLength = this.tasks.length;
        this.tasks = this.tasks.filter(t => t.id !== taskId);
        
        if (this.tasks.length !== initialLength) {
            this.saveTasks();
            return true;
        }
        return false;
    }
}

// Global Singleton Instance
window.taskManager = new TaskManager();
