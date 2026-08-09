document.addEventListener('DOMContentLoaded', function () {
  var burger = document.querySelector('.hamburger');
  var mobileNav = document.querySelector('.mobile-nav');
  if (burger && mobileNav) {
    burger.addEventListener('click', function () {
      mobileNav.classList.toggle('open');
    });
    mobileNav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { mobileNav.classList.remove('open'); });
    });
  }

  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  // Lightbox for gallery photos
  var galleryImgs = Array.prototype.slice.call(document.querySelectorAll('.gallery-photo img'));
  var lightbox = document.getElementById('lightbox');
  if (galleryImgs.length && lightbox) {
    var lbImg = lightbox.querySelector('.lightbox-img');
    var lbClose = lightbox.querySelector('.lightbox-close');
    var lbPrev = lightbox.querySelector('.lightbox-prev');
    var lbNext = lightbox.querySelector('.lightbox-next');
    var current = 0;

    function showImage(i) {
      current = (i + galleryImgs.length) % galleryImgs.length;
      var img = galleryImgs[current];
      lbImg.src = img.currentSrc || img.src;
      lbImg.alt = img.alt || '';
    }
    function openLightbox(i) {
      showImage(i);
      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
    function closeLightbox() {
      lightbox.classList.remove('open');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
    galleryImgs.forEach(function (img, i) {
      img.parentElement.addEventListener('click', function () { openLightbox(i); });
    });
    lbClose.addEventListener('click', closeLightbox);
    lbPrev.addEventListener('click', function () { showImage(current - 1); });
    lbNext.addEventListener('click', function () { showImage(current + 1); });
    lightbox.addEventListener('click', function (e) { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', function (e) {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showImage(current - 1);
      if (e.key === 'ArrowRight') showImage(current + 1);
    });
  }
});
