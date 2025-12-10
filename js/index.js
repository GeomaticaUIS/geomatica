const swiper = new Swiper('.swiper', {
    spaceBetween: 0,
    centeredSlides: true,

    loop: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        576: { slidesPerView: 1, spaceBetween: 10 }, // Móviles
        768: { slidesPerView: 2, spaceBetween: 20 }, // Tablets
        1200: { slidesPerView: 3, spaceBetween: 30 }, // Desktop
    },
});

//cards
document.addEventListener("DOMContentLoaded", function () {
    adjustGrid();
    window.addEventListener("resize", adjustGrid);
});

function adjustGrid() {
    const cards = document.querySelectorAll(".flip-card");
    const images = document.querySelectorAll(".flip-card img");
    const screenWidth = window.innerWidth;
    let cardsPerRow;
    console.log(screenWidth);
    if (screenWidth > 1660) {
        cardsPerRow = 5;
    } else if (screenWidth > 1391) {
        cardsPerRow = 4;
    } else if (screenWidth > 1220) {
        cardsPerRow = 3;
    } else if (screenWidth > 850) {
        cardsPerRow = 2;
    } else {
        cardsPerRow = 1;
    }

    cards.forEach(card => {
        card.style.width = `calc((100% - ${(cardsPerRow - 1) * 20}px) / ${cardsPerRow})`;
    });
    images.forEach(img => {
        img.style.width = "100%";  // Que ocupe todo el ancho
        img.style.objectFit = "cover"; // Evita distorsión y se adapta bien al contenedor
    });
}

document.addEventListener("DOMContentLoaded", function() {
const flipCards = document.querySelectorAll('.flip-card');

flipCards.forEach(card => {
  card.addEventListener('click', function() {
    const contenidoURL = this.getAttribute('data-html'); // Ruta al HTML externo
    document.getElementById('modalIframe').src = contenidoURL;
    var modal = new bootstrap.Modal(document.getElementById('miModal'));
    modal.show();
  });
});
});