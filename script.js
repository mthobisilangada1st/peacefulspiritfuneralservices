(function(){
  "use strict";

  /* ================= THEME (day / night) ================= */
  var root = document.documentElement;
  var modeToggle = document.getElementById('mode-toggle');
  var stored = null;
  try { stored = localStorage.getItem('psfs-theme'); } catch(e){}

  var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  var initial = stored || (prefersDark ? 'dark' : 'light');
  root.setAttribute('data-theme', initial);

  modeToggle.addEventListener('click', function(){
    var current = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', current);
    try { localStorage.setItem('psfs-theme', current); } catch(e){}
  });

  /* ================= HAMBURGER MENU ================= */
  var hamburger = document.getElementById('hamburger');
  var mobileNav = document.getElementById('mobile-nav');

  function closeMenu(){
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileNav.classList.remove('open');
  }

  hamburger.addEventListener('click', function(){
    var isOpen = mobileNav.classList.toggle('open');
    hamburger.classList.toggle('active', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  mobileNav.querySelectorAll('a').forEach(function(link){
    link.addEventListener('click', closeMenu);
  });

  /* ================= SLIDESHOW ================= */
  var track = document.getElementById('slides-track');
  var slides = track.querySelectorAll('.slide');
  var dotsWrap = document.getElementById('slide-dots');
  var prevBtn = document.getElementById('slide-prev');
  var nextBtn = document.getElementById('slide-next');
  var index = 0;
  var autoTimer;

  slides.forEach(function(_, i){
    var dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', function(){ goTo(i); resetAuto(); });
    dotsWrap.appendChild(dot);
  });

  var dots = dotsWrap.querySelectorAll('button');

  function goTo(i){
    index = (i + slides.length) % slides.length;
    track.style.transform = 'translateX(-' + (index * 100) + '%)';
    dots.forEach(function(d, di){ d.classList.toggle('active', di === index); });
  }

  function startAuto(){
    autoTimer = setInterval(function(){ goTo(index + 1); }, 5000);
  }
  function resetAuto(){
    clearInterval(autoTimer);
    startAuto();
  }

  prevBtn.addEventListener('click', function(){ goTo(index - 1); resetAuto(); });
  nextBtn.addEventListener('click', function(){ goTo(index + 1); resetAuto(); });
  startAuto();

  /* ================= CONTACT FORM ================= */
  var form = document.getElementById('contact-form');
  var note = document.getElementById('form-note');

  form.addEventListener('submit', function(e){
    e.preventDefault();
    var data = new FormData(form);
    var name = data.get('name');

    // NOTE: This form currently has no backend. Connect it to a form service
    // (e.g. Formspree, Getform) or your own endpoint to receive submissions,
    // or replace this handler to send the details via WhatsApp/email.
    note.textContent = "Thank you, " + name + ". We've received your message and will be in touch shortly.";
    form.reset();
  });

  /* ================= FOOTER YEAR ================= */
  document.getElementById('year').textContent = new Date().getFullYear();

})();