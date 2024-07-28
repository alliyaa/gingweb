let currentIndex = 0;
let autoSlideInterval;

function toggleTheme() {
    document.body.classList.toggle('dark-theme');
}

function showImage(index) {
    const images = document.querySelectorAll('.carousel img');
    if (index >= images.length) {
        currentIndex = 0;
    } else if (index < 0) {
        currentIndex = images.length - 1;
    } else {
        currentIndex = index;
    }
    images.forEach(img => {
        img.style.transform = `translateX(-${currentIndex * 100}%)`;
    });
}

function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        showImage(currentIndex + 1);
    }, 2000);
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

document.querySelector('.carousel').addEventListener('mouseover', stopAutoSlide);
document.querySelector('.carousel').addEventListener('mouseout', startAutoSlide);

startAutoSlide();

const emailForm = document.getElementById('emailForm');
emailForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    document.getElementById('confirmationMessage').style.display = 'block';
    emailForm.reset();
});

function filterCountries() {
    const searchBar = document.getElementById('searchBar').value.toLowerCase();
    const countryCards = document.querySelectorAll('.country-card');
    countryCards.forEach(card => {
        const country = card.getAttribute('data-country').toLowerCase();
        if (country.includes(searchBar)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.section');
    const footer = document.getElementById('footer');
    const triggerBottom = window.innerHeight / 5 * 4;

    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < triggerBottom) {
            section.classList.add('visible');
        } else {
            section.classList.remove('visible');
        }
    });

    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        footer.style.display = 'block';
    } else {
        footer.style.display = 'none';
    }
});


document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    document.getElementById('searchBar').addEventListener('keyup', filterCountries);

    document.querySelector('nav a[href="about.html"]').addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = 'about.html';
    });

  
    function addCardListeners() {
        const countryCards = document.querySelectorAll('.country-card');
        countryCards.forEach(card => {
            card.addEventListener('click', () => {
                const country = card.getAttribute('data-country').toLowerCase();
                window.location.href = `${country}.html`;
            });
        });
    }

    addCardListeners();

    function filterCountries() {
        const searchBar = document.getElementById('searchBar').value.toLowerCase();
        const countryCards = document.querySelectorAll('.country-card');
        countryCards.forEach(card => {
            const country = card.getAttribute('data-country').toLowerCase();
            if (country.includes(searchBar)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
        
        addCardListeners();
    }

    document.querySelectorAll('.category-button').forEach(button => {
        button.addEventListener('click', () => {
            alert(`You clicked on ${button.textContent}`);
        });
    });

    document.querySelector('.new-category-button').addEventListener('click', () => {
        alert('You clicked on new category');
    });
});


const canvas = document.getElementById('heroCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let curves = [];

function createCurves() {
    for (let i = 0; i < 20; i++) {
        curves.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            speedX: (Math.random() - 0.5) * 2,
            speedY: (Math.random() - 0.5) * 2,
            radius: Math.random() * 50
        });
    }
}

function drawCurves() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    
    curves.forEach(curve => {
        ctx.beginPath();
        ctx.moveTo(curve.x, curve.y);
        ctx.quadraticCurveTo(
            curve.x + curve.speedX * 50,
            curve.y + curve.speedY * 50,
            curve.x + curve.speedX * 100,
            curve.y + curve.speedY * 100
        );
        ctx.stroke();
        curve.x += curve.speedX;
        curve.y += curve.speedY;

        if (curve.x < 0 || curve.x > canvas.width) curve.speedX *= -1;
        if (curve.y < 0 || curve.y > canvas.height) curve.speedY *= -1;
    });
}

function animate() {
    drawCurves();
    requestAnimationFrame(animate);
}

createCurves();
animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});