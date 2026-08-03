/**
 * Calendar Foundation Manager
 * Handles backend logic, data layer, and local storage for Calendar events.
 */

class CalendarManager {
    constructor() {
        this.storageKey = 'student_productivity_calendar';
        this.events = [];
        this.loadEvents();
    }

    generateEventID() {
        if (window.Utils && window.Utils.generateID) {
            return window.Utils.generateID();
        }
        return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
    }

    loadEvents() {
        try {
            const data = localStorage.getItem(this.storageKey);
            if (data === null || data === undefined) {
                this.events = [];
                this.saveEvents();
            } else {
                this.events = JSON.parse(data);
            }
        } catch (e) {
            console.error(`[CalendarManager] Error loading events. Resetting array.`, e);
            this.events = [];
            this.saveEvents();
        }
        return this.events;
    }

    saveEvents() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.events));
            if (window.EventBus) window.EventBus.emit('calendarUpdated', this.events);
            window.dispatchEvent(new CustomEvent('calendarUpdated', { detail: this.events }));
        } catch (e) {
            console.error(`[CalendarManager] Error saving events`, e);
        }
    }

    createEventObject(data) {
        return {
            id: data.id || this.generateEventID(),
            title: data.title || '',
            date: data.date || null,
            time: data.time || null,
            category: data.category || 'General',
            color: data.color || 'purple',
            notes: data.notes || '',
            createdAt: data.createdAt || new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
    }

    getEventById(eventId) {
        return this.events.find(e => e.id === eventId) || null;
    }

    updateEvent(eventId, updates) {
        const index = this.events.findIndex(e => e.id === eventId);
        if (index === -1) return false;

        this.events[index] = {
            ...this.events[index],
            ...updates,
            updatedAt: new Date().toISOString()
        };
        this.saveEvents();
        return true;
    }

    deleteEvent(eventId) {
        const initialLength = this.events.length;
        this.events = this.events.filter(e => e.id !== eventId);
        if (this.events.length !== initialLength) {
            this.saveEvents();
            return true;
        }
        return false;
    }
}

window.calendarManager = new CalendarManager();
