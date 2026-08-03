// Core LocalStorage Wrapper

const Storage = {
    /**
     * Safely save data to local storage
     * @param {string} key - The domain key (e.g. 'hub_tasks')
     * @param {*} data - The data object or array to save
     */
    saveData(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch (e) {
            console.error(`[Storage] Error saving data to localStorage for key: ${key}`, e);
            // Handle storage quota exceeded or other errors
        }
    },

    /**
     * Safely load data from local storage
     * @param {string} key - The domain key
     * @param {*} defaultData - The fallback data if storage is empty or corrupted
     * @returns {*} - The parsed data or default fallback
     */
    loadData(key, defaultData) {
        try {
            const data = localStorage.getItem(key);
            
            // If empty storage, return default data
            if (data === null || data === undefined) {
                return defaultData;
            }
            
            // Attempt to parse existing data
            return JSON.parse(data);
        } catch (e) {
            console.error(`[Storage] Error loading or parsing data for key: ${key}. Falling back to default.`, e);
            // Handle corrupted storage by resetting to default
            this.saveData(key, defaultData);
            return defaultData;
        }
    }
};

window.Storage = Storage;
