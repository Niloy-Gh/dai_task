document.addEventListener('DOMContentLoaded', () => {
    const sliderContainer = document.getElementById('slider-container');
    const sliderThumb = document.getElementById('slider-thumb');
    const sliderProgress = document.getElementById('slider-progress');
    const sliderText = document.querySelector('.slider-text');

    let isDragging = false;
    let startX = 0;
    let currentX = 0;
    
    // Config
    const maxDrag = sliderContainer.clientWidth - sliderThumb.clientWidth - 20; // 10px padding on each side
    const threshold = maxDrag * 0.9;

    function initDrag(e) {
        isDragging = true;
        startX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
        sliderThumb.classList.add('glow');
        sliderThumb.style.transition = 'none';
        sliderProgress.style.transition = 'none';
        sliderText.style.opacity = '0.5';
    }

    function drag(e) {
        if (!isDragging) return;

        e.preventDefault(); // Prevent text selection/scrolling while dragging
        
        const currentClientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
        let diffX = currentClientX - startX;

        // Boundaries
        if (diffX < 0) diffX = 0;
        if (diffX > maxDrag) diffX = maxDrag;

        currentX = diffX;

        // Update UI
        sliderThumb.style.transform = `translateX(${currentX}px)`;
        sliderProgress.style.width = `${currentX + 60}px`; // 60 is initial thumb size + padding
        
        // Dynamic opacity based on progress
        const progressPercentage = currentX / maxDrag;
        sliderText.style.opacity = Math.max(0, 0.5 - progressPercentage);

        // Success condition (dragged over 90%)
        if (currentX >= threshold) {
            completeDrag();
        }
    }

    function stopDrag() {
        if (!isDragging) return;
        isDragging = false;
        
        sliderThumb.classList.remove('glow');

        // Reset if not completed
        if (currentX < threshold) {
            sliderThumb.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            sliderProgress.style.transition = 'width 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            sliderText.style.transition = 'opacity 0.4s ease';
            
            sliderThumb.style.transform = `translateX(0px)`;
            sliderProgress.style.width = `60px`;
            sliderText.style.opacity = '1';
            currentX = 0;
        }
    }

    function completeDrag() {
        isDragging = false;
        sliderThumb.classList.remove('glow');
        
        // Snap to end
        sliderThumb.style.transition = 'transform 0.2s ease-out';
        sliderProgress.style.transition = 'width 0.2s ease-out';
        
        sliderThumb.style.transform = `translateX(${maxDrag}px)`;
        sliderProgress.style.width = `100%`;
        
        // Play success animation and show loading
        sliderThumb.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9d54eb" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
        
        setTimeout(() => {
            openModal();
        }, 500); // 500ms loading/success effect
    }

    // Modal Logic
    const modal = document.getElementById('user-modal');
    const nameInput = document.getElementById('full-name');
    const ageInput = document.getElementById('user-age');
    const form = document.getElementById('user-form');
    const cancelBtn = document.getElementById('modal-cancel-btn');
    const ageError = document.getElementById('age-error');

    function openModal() {
        modal.classList.remove('hidden');
        setTimeout(() => {
            nameInput.focus();
        }, 100);
    }

    function closeModal() {
        modal.classList.add('hidden');
        // Reset slider so user can try again if they canceled
        setTimeout(() => {
            sliderThumb.style.transition = 'transform 0.4s ease';
            sliderProgress.style.transition = 'width 0.4s ease';
            sliderThumb.style.transform = `translateX(0px)`;
            sliderProgress.style.width = `60px`;
            sliderText.style.opacity = '1';
            currentX = 0;
            sliderThumb.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>`;
        }, 300);
    }

    cancelBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const age = parseInt(ageInput.value, 10);
        
        if (age < 10 || age > 100) {
            ageError.classList.remove('hidden');
            ageInput.style.borderColor = '#ff4d4d';
            return;
        }

        ageError.classList.add('hidden');
        ageInput.style.borderColor = '';

        // Store data
        localStorage.setItem('fullName', nameInput.value.trim());
        localStorage.setItem('userAge', age);

        // Navigate
        window.location.href = 'dashboard.html';
    });

    // Mouse Events
    sliderThumb.addEventListener('mousedown', initDrag);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDrag);

    // Touch Events
    sliderThumb.addEventListener('touchstart', initDrag, { passive: false });
    document.addEventListener('touchmove', drag, { passive: false });
    document.addEventListener('touchend', stopDrag);
});
