// 1. MOBILE MENU TOGGLE
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// 2. INITIALIZE SWIPERS (FLAT SLIDERS WITH BUTTONS)

// Gallery Slider
var gallerySwiper = new Swiper(".gallery-swiper", {
    slidesPerView: "auto", // Shows the centered slide and edges of next
    centeredSlides: true,
    spaceBetween: 20,
    loop: true,
    // Connect the buttons
    navigation: {
        nextEl: ".next-gallery",
        prevEl: ".prev-gallery",
    },
});

// Products Slider
var productsSwiper = new Swiper(".products-swiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    // Connect the buttons
    navigation: {
        nextEl: ".next-product",
        prevEl: ".prev-product",
    },
    breakpoints: {
        768: { slidesPerView: 2 }, // Tablet: 2 products
        1024: { slidesPerView: 3 } // Desktop: 3 products
    }
});

// 3. BOOKING FORM LOGIC
const serviceSelect = document.getElementById('service');
const locationGroup = document.getElementById('location-group');
const locationInput = document.getElementById('location');

serviceSelect.addEventListener('change', function() {
    if (this.value === 'Home Service') {
        locationGroup.classList.remove('hidden');
        locationInput.setAttribute('required', 'required');
    } else {
        locationGroup.classList.add('hidden');
        locationInput.removeAttribute('required');
        locationInput.value = ''; 
    }
});

// 4. FORM SUBMISSION
const bookingForm = document.getElementById('bookingForm');
const scriptURL = 'https://script.google.com/macros/s/AKfycbwmE3LzgM4vD9j51o-xq6HJOGUwhgu8Wn8bIhpGxaJ5fDUl9JfA1giCZ4z9irWvPtw9/exec'; // Replace with your URL later

bookingForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const service = document.getElementById('service').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const location = locationInput.value;

    let message = `*NEW BOOKING - NANA K'AY*%0A%0A`;
    message += `*Name:* ${name}%0A`;
    message += `*Service:* ${service}%0A`;
    message += `*Date:* ${date}%0A`;
    message += `*Time:* ${time}%0A`;
    
    if (service === 'Home Service') {
        message += `*Location:* ${location}%0A`;
    }

    const phone = '233543258881';
    const whatsappURL = `https://wa.me/${phone}?text=${message}`;

    if(scriptURL !== 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
        fetch(scriptURL, {
            method: 'POST',
            body: new FormData(bookingForm)
        }).then(response => console.log('Sent to Sheet')).catch(error => console.error('Error', error));
    }

    window.open(whatsappURL, '_blank');
    bookingForm.reset();
    locationGroup.classList.add('hidden');
});