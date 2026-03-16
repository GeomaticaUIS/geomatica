document.addEventListener("DOMContentLoaded", function () {

  // SWIPER
  const swiperElement = document.querySelector('.swiper');
  if (swiperElement) {
    new Swiper('.swiper', {
      loop: true,
      autoplay: {
        delay: 4500,
        disableOnInteraction: false
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },
      speed: 800
    });
  }

  // HAMBURGER MENU
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });
  }

  window.closeMobile = function () {
    if (hamburger) hamburger.classList.remove('open');
    if (mobileMenu) mobileMenu.classList.remove('open');
  };


  // MODAL CONSULTORÍAS
  const modal = document.getElementById('projModal');
  const modalTitle = document.getElementById('projModalTitle');
  const modalIframe = document.getElementById('projModalIframe');
  const modalClose = document.getElementById('projModalClose');

  const cards = document.querySelectorAll('.fcard[data-html]');

  cards.forEach(card => {
    card.addEventListener('click', function () {

      const title = card.getAttribute('data-title');
      const html = card.getAttribute('data-html');

      if (modalTitle) modalTitle.textContent = title;
      if (modalIframe) modalIframe.src = html;

      if (modal) modal.classList.add('open');
      document.body.style.overflow = 'hidden';

    });
  });


  function closeModal() {
    if (modal) modal.classList.remove('open');
    if (modalIframe) modalIframe.src = '';
    document.body.style.overflow = '';
  }

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  if (modal) {
    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeModal();
  });

});
