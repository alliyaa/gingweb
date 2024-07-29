let currentIndex = 0;
let autoSlideInterval;



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



startAutoSlide();
stopAutoSlide();

const emailForm = document.getElementById('emailForm');
emailForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    document.getElementById('confirmationMessage').style.display = 'block';
    emailForm.reset();
});

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


    document.querySelectorAll('.category-button').forEach(button => {
        button.addEventListener('click', () => {
            alert(`You clicked on ${button.textContent}`);
        });
    });

    document.querySelector('.new-category-button').addEventListener('click', () => {
        alert('You clicked on new category');
    });


    const emailForm = document.getElementById('emailForm');
    emailForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;

        fetch('/api/subscribe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email })
        })
        .then(response => {
            if (response.ok) {
                document.getElementById('confirmationMessage').style.display = 'block';
            } else {
                alert('Error: ' + response.statusText);
            }
        })
        .catch(error => console.error('Error:', error));
        
        emailForm.reset();
    });
});

