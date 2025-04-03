// Navigation mobile
const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        menu.classList.toggle('active');
    });
}

// Fermer le menu quand on clique sur un lien
const navLinks = document.querySelectorAll('.menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        menu.classList.remove('active');
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.padding = '10px 0';
        header.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        header.style.padding = '';
        header.style.background = '';
    }
});

// Carousel
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

if (slides.length > 0) {
    let currentSlide = 0;

    // Function to update carousel
    const updateCarousel = () => {
        // Hide all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Show current slide
        slides[currentSlide].classList.add('active');
        
        // Update dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        dots[currentSlide].classList.add('active');
    };

    // Previous button
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentSlide--;
            if (currentSlide < 0) {
                currentSlide = slides.length - 1;
            }
            updateCarousel();
        });
    }

    // Next button
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentSlide++;
            if (currentSlide > slides.length - 1) {
                currentSlide = 0;
            }
            updateCarousel();
        });
    }

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateCarousel();
        });
    });

    // Auto slide (optional)
    setInterval(() => {
        currentSlide++;
        if (currentSlide > slides.length - 1) {
            currentSlide = 0;
        }
        updateCarousel();
    }, 5000);
}

// Form validation
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        let isValid = true;
        
        // Simple validation
        if (name.trim() === '') {
            showError('name', 'Veuillez entrer votre nom');
            isValid = false;
        } else {
            removeError('name');
        }
        
        if (email.trim() === '') {
            showError('email', 'Veuillez entrer votre email');
            isValid = false;
        } else if (!isValidEmail(email)) {
            showError('email', 'Veuillez entrer un email valide');
            isValid = false;
        } else {
            removeError('email');
        }
        
        if (message.trim() === '') {
            showError('message', 'Veuillez entrer votre message');
            isValid = false;
        } else {
            removeError('message');
        }
        
        if (isValid) {
            // Here you would typically send the form data to your server
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = 'Merci ! Votre message a été envoyé. Nous vous contacterons bientôt.';
            
            contactForm.innerHTML = '';
            contactForm.appendChild(successMessage);
        }
    });
}

// Helper functions
function showError(field, message) {
    const input = document.getElementById(field);
    const errorElement = document.getElementById(`${field}-error`);
    
    input.classList.add('error');
    
    if (errorElement) {
        errorElement.textContent = message;
    } else {
        const error = document.createElement('div');
        error.id = `${field}-error`;
        error.className = 'error-message';
        error.textContent = message;
        input.parentNode.appendChild(error);
    }
}

function removeError(field) {
    const input = document.getElementById(field);
    const errorElement = document.getElementById(`${field}-error`);
    
    if (input) input.classList.remove('error');
    if (errorElement) errorElement.remove();
}

function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Gallery filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            // Show/hide gallery items based on filter
            galleryItems.forEach(item => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Animation on scroll (optional)
const animateElements = document.querySelectorAll('.animate');

function checkIfInView() {
    const windowHeight = window.innerHeight;
    const windowTop = window.scrollY;   }
    document.addEventListener('DOMContentLoaded', function() {
        const gallery = document.getElementById('gallery');
        const modal = document.getElementById('imageModal');
        const modalImg = document.getElementById('modalImage');
        const closeModal = document.getElementById('closeModal');
        
        // Fonction pour ouvrir le modal
        function openModal() {
            modalImg.src = this.src;
            modal.style.display = 'flex';
            setTimeout(() => {
                modal.classList.add('show');
            }, 10);
        }
        
        // Fermer le modal
        closeModal.addEventListener('click', function() {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        });
        
        // Fermer le modal en cliquant en dehors de l'image
        window.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('show');
                setTimeout(() => {
                    modal.style.display = 'none';
                }, 300);
            }
        });
        
        // Ajouter des événements click aux images
        document.querySelectorAll('.gallery-item img').forEach(img => {
            img.addEventListener('click', openModal);
        });
    });