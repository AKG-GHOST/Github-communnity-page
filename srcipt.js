// Smooth Scrolling Effect with Passive Event Listeners for Better Performance
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }, { passive: true });
});

// Sticky Navigation Bar with Throttling for Performance
let lastKnownScrollPosition = 0;
let ticking = false;

function updateActiveNav() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', () => {
    lastKnownScrollPosition = window.scrollY;
    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateActiveNav();
            ticking = false;
        });
        ticking = true;
    }
});

// Add Animation to About Section with Intersection Observer
const aboutSection = document.getElementById('about');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            aboutSection.classList.add('fadeIn');
            observer.unobserve(aboutSection);
        }
    });
}, { threshold: 0.75 });
observer.observe(aboutSection);

// Add Styles for About Section Animation
const style = document.createElement('style');
style.innerHTML = `
    .fadeIn {
        opacity: 1;
        transform: translateY(0);
        transition: opacity 1s ease, transform 1s ease;
    }
    #about {
        opacity: 0;
        transform: translateY(50px);
    }
`;
document.head.appendChild(style);

// Testimonials Slider with Improved Looping (CSS Transitions)
let slideIndex = 0;
const slides = document.querySelectorAll('.testimonial-item');

function showSlides() {
    slides.forEach(slide => slide.classList.remove('active'));
    slideIndex = (slideIndex + 1) % slides.length;
    slides[slideIndex].classList.add('active');
    setTimeout(showSlides, 3000); // Change slide every 3 seconds
}

showSlides();

// Scroll to Top Button with Visibility Toggle
document.body.insertAdjacentHTML('beforeend', `
    <button id="scrollToTopBtn" style="position: fixed; bottom: 30px; right: 30px; padding: 10px; border-radius: 50%; background-color: #0073e6; color: white; border: none; font-size: 1.5rem; cursor: pointer; display: none;">↑</button>
`);

const scrollToTopBtn = document.getElementById('scrollToTopBtn');

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', () => {
    scrollToTopBtn.style.display = window.scrollY > 200 ? 'block' : 'none';
});

// Dropdown Menu for Navigation
const navMenu = document.querySelector('.nav-menu');
navMenu.insertAdjacentHTML('beforeend', `
    <li class="dropdown">
        <a href="#" class="nav-link">More</a>
        <ul class="dropdown-content">
            <li><a href="#testimonials" class="nav-link">Testimonials</a></li>
            <li><a href="#portfolio" class="nav-link">Portfolio</a></li>
            <li><a href="#events" class="nav-link">Events</a></li>
        </ul>
    </li>
`);

const dropdownStyles = document.createElement('style');
dropdownStyles.innerHTML = `
    .dropdown {
        position: relative;
        display: inline-block;
    }
    .dropdown-content {
        display: none;
        position: absolute;
        background-color: #fff;
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
        z-index: 1;
        opacity: 0;
        transform: translateY(-10px);
        transition: opacity 0.2s ease, transform 0.2s ease;
    }
    .dropdown:hover .dropdown-content {
        display: block;
        opacity: 1;
        transform: translateY(0);
    }
    .dropdown-content li {
        list-style: none;
    }
    .dropdown-content a {
        color: #333;
        padding: 10px 20px;
        text-decoration: none;
        display: block;
    }
    .dropdown-content a:hover {
        background-color: #f4f4f4;
    }
`;
document.head.appendChild(dropdownStyles);
