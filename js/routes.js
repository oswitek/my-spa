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

document.querySelector('#gallery-link').addEventListener('click', (event) => {
    let stateObj = { page: 'gallery' };
    document.title = 'Gallery';
    history.pushState(stateObj, "gallery", "?gallery");
    RenderGalleryPage();
});

document.getElementById('theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
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
        <div class="gallery" id="gallery-container">
            <!-- Gallery images will be loaded here -->
        </div>`;
    
    LoadGalleryImages();
}

function LoadGalleryImages() {
    const galleryContainer = document.getElementById('gallery-container');
    for (let i = 1; i <= 9; i++) {
        const img = document.createElement('img');
        img.src = `https://via.placeholder.com/300?text=Image+${i}`;
        img.alt = `Image ${i}`;
        img.dataset.index = i;
        galleryContainer.appendChild(img);

        img.addEventListener('click', () => openModal(img.src));
    }
}

function openModal(imageSrc) {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
        <img src="${imageSrc}" alt="Modal Image">
        <span class="close">&times;</span>`;
    
    document.body.appendChild(modal);
    modal.style.display = 'flex';

    const closeModal = modal.querySelector('.close');
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.removeChild(modal);
    });

    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.removeChild(modal);
        }
    });
}

function popStateHandler() {
    let loc = window.location.href.toString().split(window.location.host)[1];

    if (loc === pageUrls.contact) {
        RenderContactPage();
    } else if (loc === pageUrls.about) {
        RenderAboutPage();
    } else if (loc === pageUrls.gallery) {
        RenderGalleryPage();
    }
}

window.onpopstate = popStateHandler;
