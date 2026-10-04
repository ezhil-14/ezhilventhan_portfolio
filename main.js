(function () {
  'use strict';

  var root = document.documentElement;
  root.classList.add('js');

  var reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Theme toggle ---------- */
  var themeBtn = document.getElementById('theme-toggle');
  var themeIcon = themeBtn ? themeBtn.querySelector('.theme-icon') : null;

  function syncThemeButton() {
    var dark = root.getAttribute('data-theme') === 'dark';
    if (!themeBtn) return;
    themeBtn.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
    if (themeIcon) themeIcon.innerHTML = dark ? '&#9728;' : '&#9790;';
  }

  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) { /* storage unavailable */ }
      syncThemeButton();
    });
  }
  syncThemeButton();

  /* ---------- Mobile menu ---------- */
  var navToggle = document.getElementById('nav-toggle');
  var nav = document.getElementById('primary-nav');

  function setMenu(open) {
    if (!nav || !navToggle) return;
    nav.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }

  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      setMenu(!nav.classList.contains('open'));
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') setMenu(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setMenu(false);
    });
  }

  /* ---------- Project filter ---------- */
  var chips = document.querySelectorAll('.chip');
  var projects = document.querySelectorAll('.project');

  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      var filter = chip.getAttribute('data-filter');
      chips.forEach(function (c) {
        var active = c === chip;
        c.classList.toggle('is-active', active);
        c.setAttribute('aria-pressed', String(active));
      });
      projects.forEach(function (p) {
        var show = filter === 'all' || p.getAttribute('data-cat') === filter;
        p.hidden = !show;
        if (show) p.classList.add('in');
      });
    });
  });

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reducedMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- Highlight current section in the nav ---------- */
  var sections = document.querySelectorAll('main section[id]');
  var links = document.querySelectorAll('.nav a');
  if ('IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (a) {
          a.classList.toggle('is-current', a.getAttribute('href') === '#' + entry.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- Contact form (opens the visitor's email app) ---------- */
  var form = document.getElementById('contact-form');
  var note = document.getElementById('form-note');
  var TO = 'ezhilventhan1410@gmail.com';

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.elements['name'];
      var email = form.elements['email'];
      var message = form.elements['message'];
      var ok = true;

      [name, email, message].forEach(function (field) {
        var valid = field.value.trim() !== '' && (field.type !== 'email' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim()));
        field.classList.toggle('invalid', !valid);
        field.setAttribute('aria-invalid', String(!valid));
        if (!valid) ok = false;
      });

      if (!ok) {
        note.textContent = 'Please fill in every field with a valid email address.';
        return;
      }

      var subject = 'Portfolio message from ' + name.value.trim();
      var body = message.value.trim() + '\n\n' + name.value.trim() + '\n' + email.value.trim();
      window.location.href = 'mailto:' + TO + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
      note.textContent = 'Opening your email app. If nothing opens, write to ' + TO + '.';
    });
  }

  /* ---------- Footer year ---------- */
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
