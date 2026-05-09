document.addEventListener('DOMContentLoaded', () => {
    // 1. Download Countdown Logic
    const unlockBtn = document.getElementById('unlock-btn');
    const timerDisplay = document.getElementById('timer-display');
    const downloadContainer = document.getElementById('download-action-container');

    if (unlockBtn) {
        unlockBtn.addEventListener('click', () => {
            let timeLeft = 10;
            unlockBtn.disabled = true;
            unlockBtn.innerText = 'Unlocking...';
            
            if (timerDisplay) {
                timerDisplay.innerText = `Please wait ${timeLeft} seconds...`;
                timerDisplay.style.display = 'block';
            }

            const countdown = setInterval(() => {
                timeLeft -= 1;
                if (timerDisplay) {
                    timerDisplay.innerText = `Please wait ${timeLeft} seconds...`;
                }

                if (timeLeft <= 0) {
                    clearInterval(countdown);
                    if (timerDisplay) timerDisplay.style.display = 'none';
                    unlockBtn.style.display = 'none';
                    
                    // Show download link
                    const downloadLink = document.createElement('a');
                    downloadLink.href = '#';
                    downloadLink.className = 'final-link';
                    downloadLink.innerHTML = '<i class="fas fa-download"></i> Download Resource Now';
                    downloadLink.setAttribute('download', 'resource.pdf');
                    
                    if (downloadContainer) {
                        downloadContainer.appendChild(downloadLink);
                    }
                }
            }, 1000);
        });
    }

    // 2. Search Filter Logic
    const searchInput = document.getElementById('resource-search');
    const resourceItems = document.querySelectorAll('.resource-item');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            resourceItems.forEach(item => {
                const title = item.querySelector('h4').innerText.toLowerCase();
                if (title.includes(searchTerm)) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }

    // 3. Contact Form Handler (Formspree)
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            
            submitBtn.disabled = true;
            submitBtn.innerText = 'Sending...';

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    formStatus.innerText = 'Thanks for your message! We will get back to you soon.';
                    formStatus.className = 'form-status success';
                    contactForm.reset();
                } else {
                    const data = await response.json();
                    if (Object.hasOwn(data, 'errors')) {
                        formStatus.innerText = data['errors'].map(error => error['message']).join(', ');
                    } else {
                        formStatus.innerText = 'Oops! There was a problem submitting your form.';
                    }
                    formStatus.className = 'form-status error';
                }
            } catch (error) {
                formStatus.innerText = 'Oops! There was a problem submitting your form.';
                formStatus.className = 'form-status error';
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerText = 'Send Message';
            }
        });
    }

    // 4. Sticky Header Shadow
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (window.scrollY > 10) {
            header.style.boxShadow = 'var(--shadow-lg)';
        } else {
            header.style.boxShadow = 'var(--shadow)';
        }
    });
});
