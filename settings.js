// Settings Module - Frontend Logic

window.initSettings = function() {
    const settingsContainer = document.querySelector('.settings-container');
    if (!settingsContainer || !window.settingsManager) return; // Only run on Settings page

    const sm = window.settingsManager;

    // ==========================================
    // 1. PROFILE SECTION
    // ==========================================
    const nameInput = document.querySelector('input[value="Niloy Ghosh"]'); // We'll query better
    const profileInputs = document.querySelectorAll('#sec-profile input, #sec-profile textarea');
    
    // Set initial values
    if (profileInputs.length >= 4) {
        profileInputs[0].value = sm.profile.fullName;
        profileInputs[1].value = sm.profile.email;
        profileInputs[2].value = sm.profile.university;
        profileInputs[3].value = sm.profile.course;
    }
    const bioArea = document.querySelector('#sec-profile textarea');
    if (bioArea) bioArea.value = sm.profile.bio;

    const profileTitle = document.querySelector('.profile-title h3');
    if (profileTitle) profileTitle.textContent = sm.profile.fullName;

    // Save Profile
    const saveProfileBtn = document.querySelector('#sec-profile .btn-primary-glow');
    if (saveProfileBtn) {
        saveProfileBtn.addEventListener('click', () => {
            if (profileInputs.length >= 4) {
                sm.profile.fullName = profileInputs[0].value;
                sm.profile.email = profileInputs[1].value;
                sm.profile.university = profileInputs[2].value;
                sm.profile.course = profileInputs[3].value;
            }
            if (bioArea) sm.profile.bio = bioArea.value;
            sm.saveProfile();
            
            if (profileTitle) profileTitle.textContent = sm.profile.fullName;
            saveProfileBtn.textContent = 'Saved!';
            setTimeout(() => saveProfileBtn.textContent = 'Save Changes', 2000);
        });
    }

    // ==========================================
    // 2. APPEARANCE SECTION
    // ==========================================
    
    // Theme
    const themeButtons = document.querySelectorAll('.appearance-controls .control-group:nth-child(1) .seg-item');
    themeButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent === sm.settings.theme) btn.classList.add('active');
        
        btn.addEventListener('click', (e) => {
            themeButtons.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            sm.settings.theme = e.target.textContent;
            sm.saveSettings();
        });
    });

    // Accent Color
    const colorSwatches = document.querySelectorAll('.color-picker-premium .color-swatch');
    const colorMap = ['purple', 'blue', 'green', 'orange', 'teal'];
    colorSwatches.forEach((swatch, index) => {
        if (index < colorMap.length) { // skip the custom one for now
            swatch.classList.remove('active');
            if (colorMap[index] === sm.settings.accentColor) swatch.classList.add('active');

            swatch.addEventListener('click', (e) => {
                colorSwatches.forEach(s => s.classList.remove('active'));
                e.target.classList.add('active');
                sm.settings.accentColor = colorMap[index];
                sm.saveSettings();
            });
        }
    });

    // Font Size
    const fontButtons = document.querySelectorAll('.appearance-controls .control-group:nth-child(3) .seg-item');
    fontButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent === sm.settings.fontSize) btn.classList.add('active');
        
        btn.addEventListener('click', (e) => {
            fontButtons.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            sm.settings.fontSize = e.target.textContent;
            sm.saveSettings();
        });
    });

    // UI Density
    const densityButtons = document.querySelectorAll('.appearance-controls .control-group:nth-child(4) .seg-item');
    densityButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent === sm.settings.uiDensity) btn.classList.add('active');
        
        btn.addEventListener('click', (e) => {
            densityButtons.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            sm.settings.uiDensity = e.target.textContent;
            sm.saveSettings();
        });
    });

    // Corner Radius
    const radiusButtons = document.querySelectorAll('.appearance-controls .control-group:nth-child(5) .seg-item');
    radiusButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent === sm.settings.cornerRadius) btn.classList.add('active');
        
        btn.addEventListener('click', (e) => {
            radiusButtons.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            sm.settings.cornerRadius = e.target.textContent;
            sm.saveSettings();
        });
    });

    // ==========================================
    // 3. NOTIFICATIONS SECTION
    // ==========================================
    
    const notifSection = document.getElementById('sec-notifications');
    if (notifSection) {
        const toggles = notifSection.querySelectorAll('input[type="checkbox"]');
        const map = [
            'taskReminders', 'goalReminders', 'desktopNotif', 
            'emailNotif', 'achievements', 'sound', 'dailySummary', 'weeklySummary'
        ];
        
        toggles.forEach((toggle, index) => {
            if (map[index]) {
                toggle.checked = sm.settings.notifications[map[index]];
                toggle.addEventListener('change', (e) => {
                    sm.settings.notifications[map[index]] = e.target.checked;
                    sm.saveSettings();
                });
            }
        });
    }

    // ==========================================
    // 4. ACCOUNT ACTIONS (Export/Import)
    // ==========================================
    
    const btnExport = document.querySelector('.action-card:nth-child(2) button');
    if (btnExport) {
        btnExport.addEventListener('click', () => {
            btnExport.textContent = 'Exporting...';
            setTimeout(() => {
                sm.exportData();
                btnExport.textContent = 'Export';
            }, 500);
        });
    }

    const btnImport = document.querySelector('.action-card:nth-child(3) button');
    if (btnImport) {
        // Create hidden file input for JSON uploads
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = '.json';
        fileInput.style.display = 'none';
        document.body.appendChild(fileInput);

        btnImport.addEventListener('click', () => fileInput.click());

        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = function(event) {
                sm.importData(event.target.result);
            };
            reader.readAsText(file);
        });
    }

    const btnDelete = document.querySelector('.btn-danger-glow');
    if (btnDelete) {
        btnDelete.addEventListener('click', () => {
            if (confirm('CRITICAL WARNING: Are you sure you want to permanently delete ALL of your tasks, goals, calendar events, and settings? This cannot be undone.')) {
                if (confirm('Are you ABSOLUTELY sure?')) {
                    sm.deleteAccount();
                }
            }
        });
    }

    // ==========================================
    // NAVIGATION SCROLL SPY
    // ==========================================
    const sideNavItems = document.querySelectorAll('.side-nav-item');
    sideNavItems.forEach(item => {
        item.addEventListener('click', (e) => {
            // Keep default anchor scroll behavior but update active class
            sideNavItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
        });
    });

};

document.addEventListener('DOMContentLoaded', window.initSettings);
