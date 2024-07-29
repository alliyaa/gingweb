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

document.querySelector('.carousel').addEventListener('mouseover', stopAutoSlide);
document.querySelector('.carousel').addEventListener('mouseout', startAutoSlide);


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


    document.querySelectorAll('.category-button').forEach(button => {
        button.addEventListener('click', () => {
            alert(`You clicked on ${button.textContent}`);
        });
    });

    document.querySelector('.new-category-button').addEventListener('click', () => {
        alert('You clicked on new category');
    });
});

const form = document.getElementById('form');
const result = document.getElementById('result');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const formData = new FormData(form);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);
  result.innerHTML = "Please wait..."

    fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                result.innerHTML = json.message;
            } else {
                console.log(response);
                result.innerHTML = json.message;
            }
        })
        .catch(error => {
            console.log(error);
            result.innerHTML = "Something went wrong!";
        })
        .then(function() {
            form.reset();
            setTimeout(() => {
                result.style.display = "none";
            }, 3000);
        });
});