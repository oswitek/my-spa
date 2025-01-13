let pageUrls = {  
    about: '/index.html?about',  
    contact:'/index.html?contact'  
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
 
function popStateHandler() {  
    let loc = window.location.href.toString().split(window.location.host)[1];  
 
    if (loc === pageUrls.contact){ RenderContactPage(); } 
    if(loc === pageUrls.about){ RenderAboutPage(); } 
} 
 
window.onpopstate = popStateHandler;   

document.getElementById('theme-toggle').addEventListener('click', () => { 
    document.body.classList.toggle('dark-mode'); 
});

document.querySelector('#gallery-link').addEventListener('click', () => {
    let stateObj = { page: 'gallery' };
    document.title = 'Gallery';
    history.pushState(stateObj, "gallery", "?gallery");
    RenderGalleryPage();
});

function RenderGalleryPage() {
    document.querySelector('main').innerHTML = `
        <h1 class="title">Gallery</h1>
        <div class="gallery-grid"></div>
        <div id="modal" class="hidden">
            <div id="modal-content">
                <span id="close-modal">&times;</span>
                <img id="modal-image" src="" alt="Full-size image">
            </div>
        </div>`;
    loadGalleryImages();
}

function loadGalleryImages() {
    const imageUrls = Array.from({ length: 9 }, (_, i) => `images/image${i + 1}.jpg`);
    const galleryGrid = document.querySelector('.gallery-grid');

    imageUrls.forEach((url, index) => {
        const img = document.createElement('img');
        img.dataset.src = url;
        img.alt = `Image ${index + 1}`;
        img.className = 'gallery-thumbnail lazy';
        galleryGrid.appendChild(img);
    });

    implementLazyLoading();
    setupModal();
}

function implementLazyLoading() {
    const lazyImages = document.querySelectorAll('.lazy');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => observer.observe(img));
}

function setupModal() {
    const modal = document.getElementById('modal');
    const modalImage = document.getElementById('modal-image');
    const closeModal = document.getElementById('close-modal');

    document.querySelectorAll('.gallery-thumbnail').forEach(img => {
        img.addEventListener('click', () => {
            modalImage.src = img.src;
            modal.classList.remove('hidden');
        });
    });

    closeModal.addEventListener('click', () => modal.classList.add('hidden'));
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.classList.add('hidden');
        }
    });
}