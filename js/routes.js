let pageUrls = {
    about: '/index.html?about',
    contact: '/index.html?contact',
    gallery: '/index.html?gallery'
};

function OnStartUp() {
    popStateHandler();
}

OnStartUp();

document.querySelector('#about-link').addEventListener('click', (event) => {
    let stateObj = { page: 'about' };
    document.title = 'About';
    history.pushState(stateObj, "about", "?about");
    RenderAboutPage();
});

document.querySelector('#contact-link').addEventListener('click', (event) => {
    let stateObj = { page: 'contact' };
    document.title = 'Contact';
    history.pushState(stateObj, "contact", "?contact");
    RenderContactPage();
});

document.querySelector('#gallery-link').addEventListener('click', () => {
    let stateObj = { page: 'gallery' };
    document.title = 'Gallery';
    history.pushState(stateObj, "gallery", "?gallery");
    RenderGalleryPage();
});

function RenderAboutPage() {
    document.querySelector('main').innerHTML = `
        <h1 class="title">About Me</h1>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry...</p>`;
}

function RenderContactPage() {
    document.querySelector('main').innerHTML = `
        <h1 class="title">Contact with me</h1>
        <form id="contact-form">
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" required>
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>
            <label for="message">Message:</label>
            <textarea id="message" name="message" required></textarea>
            <button type="submit">Send</button>
        </form>`;

    document.getElementById('contact-form').addEventListener('submit', (event) => {
        event.preventDefault();
        alert('Form submitted!');
    });
}

function RenderGalleryPage() {
    document.querySelector('main').innerHTML = `
        <h1 class="title">Gallery</h1>
        <div class="gallery-container"></div>
        <div class="modal">
            <button class="modal-close">Close</button>
            <img src="" alt="Enlarged image">
        </div>`;
    loadGalleryImages();
}

function loadGalleryImages() {
    const galleryContainer = document.querySelector('.gallery-container');
    const modal = document.querySelector('.modal');
    const modalImg = modal.querySelector('img');
    const modalClose = modal.querySelector('.modal-close');

    modalClose.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    modal.addEventListener('click', (event) => {
        if (event.target === modal) modal.style.display = 'none';
    });

    const images = Array.from({ length: 9 }, (_, i) => `/images/image${i + 1}.jpg`);
    images.forEach((src, index) => {
        const img = document.createElement('img');
        img.classList.add('gallery-item');
        img.dataset.src = src;

        img.addEventListener('click', () => {
            modalImg.src = src;
            modal.style.display = 'flex';
        });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const lazyImg = entry.target;
                    lazyImg.src = lazyImg.dataset.src;
                    observer.unobserve(lazyImg);
                }
            });
        });

        observer.observe(img);

        galleryContainer.appendChild(img);
    });
}

function popStateHandler() {
    let loc = window.location.href.toString().split(window.location.host)[1];

    if (loc === pageUrls.contact) { RenderContactPage(); }
    if (loc === pageUrls.about) { RenderAboutPage(); }
    if (loc === pageUrls.gallery) { RenderGalleryPage(); }
}

window.onpopstate = popStateHandler;

document.getElementById('theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});
