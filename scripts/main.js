// Main JavaScript file
console.log('Majha Dijital loaded');

document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');

            // Animate hamburger
            const bars = menuToggle.querySelectorAll('.bar');
            // Simple animation logic can be added here if needed
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    // Auto-select subject from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const subject = urlParams.get('subject');
    if (subject) {
        const subjectSelect = document.getElementById('subject');
        if (subjectSelect) {
            subjectSelect.value = subject;
        }
    }

    // Handle smooth scrolling and selection from same-page links
    // Handle smooth scrolling and selection from same-page links
    const serviceLinks = document.querySelectorAll('a[data-subject]');
    console.log('Found service links:', serviceLinks.length);

    serviceLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const subjectValue = link.getAttribute('data-subject');
            console.log('Service clicked:', subjectValue);

            const subjectSelect = document.getElementById('subject');
            const contactSection = document.getElementById('contact');

            // 1. Select the subject
            if (subjectSelect) {
                // Check if value exists in options
                const optionExists = Array.from(subjectSelect.options).some(opt => opt.value === subjectValue);
                if (optionExists) {
                    subjectSelect.value = subjectValue;
                    console.log('Subject set to:', subjectValue);

                    // Visual feedback
                    subjectSelect.style.transition = 'border-color 0.3s ease';
                    const originalBorder = subjectSelect.style.borderColor;
                    subjectSelect.style.borderColor = '#2563eb'; // Highlight color
                    setTimeout(() => {
                        subjectSelect.style.borderColor = originalBorder;
                    }, 1500);
                } else {
                    console.warn(`Option value '${subjectValue}' not found in dropdown`);
                }
            } else {
                console.error('Subject select element not found');
            }

            // 2. Scroll to contact section
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            } else {
                console.error('Contact section not found');
                window.location.hash = 'contact';
            }
        });
    });

    // Handle Contact Form Submission (Web3Forms Version)
const form = document.getElementById('form');

if (form) {
    const submitBtn = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        formData.append("access_key", "0f65ad1a-8f94-44b7-b8af-a09baebc8b22");

        const originalText = submitBtn.textContent;

        submitBtn.textContent = "Sending...";
        submitBtn.disabled = true;

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            if (response.ok) {
                // Replace form with a clean confirmation UI
                form.innerHTML = `
                    <div class="success-message" style="text-align:center; padding:2rem;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                        <h3>Message Sent!</h3>
                        <p>Thank you for reaching out. We'll get back to you shortly.</p>
                    </div>
                `;
            } else {
                alert("Error: " + data.message);
            }

        } catch (error) {
            alert("Something went wrong. Please try again.");
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}
