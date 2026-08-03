// Core Event Bus (Pub/Sub)

class EventBusManager {
    constructor() {
        this.events = {};
    }

    /**
     * Subscribe to an event
     * @param {string} eventName - The name of the event
     * @param {function} callback - The function to execute
     * @returns {function} - Unsubscribe function
     */
    on(eventName, callback) {
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }
        
        this.events[eventName].push(callback);
        
        // Return unsubscribe function
        return () => this.off(eventName, callback);
    }

    /**
     * Unsubscribe from an event
     * @param {string} eventName - The name of the event
     * @param {function} callback - The specific callback to remove
     */
    off(eventName, callback) {
        if (!this.events[eventName]) return;
        
        this.events[eventName] = this.events[eventName].filter(cb => cb !== callback);
    }

    /**
     * Publish/Emit an event
     * @param {string} eventName - The name of the event
     * @param {*} data - Payload to send to subscribers
     */
    emit(eventName, data) {
        if (!this.events[eventName]) return;
        
        console.log(`[EventBus] Emitting: ${eventName}`, data);
        
        this.events[eventName].forEach(callback => {
            try {
                callback(data);
            } catch (error) {
                console.error(`[EventBus] Error executing callback for event: ${eventName}`, error);
            }
        });
    }
}

// Global Singleton Instance
window.EventBus = new EventBusManager();
