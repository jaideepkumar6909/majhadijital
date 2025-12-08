/// Main JavaScript file
console.log('Majha Dijital loaded');

document.addEventListener('DOMContentLoaded', () => {

    // -------------------------
    // Mobile Menu Toggle
    // -------------------------
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    // -------------------------
    // Auto-select subject from URL parameter
    // -------------------------
    const urlParams = new URLSearchParams(window.location.search);
    const subject = urlParams.get('subject');

    if (subject) {
        const subjectSelect = document.getElementById('subject');
        if (subjectSelect) {
            subjectSelect.value = subject;
        }
    }

    // -------------------------
    // Smooth scroll + subject setter
    // -------------------------
    const serviceLinks = document.querySelectorAll('a[data-subject]');
    console.log('Found service links:', serviceLinks.length);

    serviceLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const subjectValue = link.getAttribute('data-subject');

            const subjectSelect = document.getElementById('subject');
            const contactSection = document.getElementById('contact');

            // Select subject
            if (subjectSelect) {
                const exists = Array.from(subjectSelect.options)
                    .some(opt => opt.value === subjectValue);

                if (exists) {
                    subjectSelect.value = subjectValue;
                }
            }

            // Scroll to contact form
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // -------------------------
    // Contact Form Submission (Web3Forms)
    // -------------------------
    const form = document.getElementById('form');

    if (form) {
        console.log("Contact form detected, enabling Web3Forms...");

        const submitBtn = form.querySelector('button[type="submit"]');

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(form);
            formData.append("access_key", "0f65ad1a-8f94-44b7-b8af-a09baebc8b22"); // your real key

            const originalText = submitBtn.textContent;

            submitBtn.textContent = "Sending...";
            submitBtn.disabled = true;

            try {
                const response = await fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    body: formData
                });

                const data = await response.json();
                console.log("Web3Forms Response:", data);

                if (response.ok && data.success) {
                    alert("Success! Your message has been sent.");
                    form.reset();
                } else {
                    alert("Error: " + (data.message || "Unknown error"));
                }

            } catch (error) {
                console.error("Web3Forms Error:", error);
                alert("Network error. Please try again.");
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });

    } else {
        console.log("No contact form found on this page. Skipping Web3Forms setup.");
    }

});
