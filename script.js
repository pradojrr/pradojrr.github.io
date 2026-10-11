document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const root = document.documentElement;

  /* ---------- helpers de armazenamento (nunca quebram o site) ---------- */
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };

  /* ---------- IDIOMA PT / EN ---------- */
  const langBtn = document.getElementById('btn-lang');
  const langIndicator = document.getElementById('lang-indicator');

  function setLang(lang) {
    body.classList.remove('lang-pt', 'lang-en');
    body.classList.add('lang-' + lang);
    root.lang = lang === 'pt' ? 'pt-BR' : 'en';
    // o botão mostra o idioma para o qual vai trocar
    langIndicator.textContent = lang === 'pt' ? 'EN' : 'PT';
    store.set('lang', lang);
  }

  const savedLang = store.get('lang');
  const browserLang = (navigator.language || 'pt').toLowerCase().startsWith('pt') ? 'pt' : 'en';
  setLang(savedLang || browserLang);

  langBtn.addEventListener('click', () => {
    setLang(body.classList.contains('lang-pt') ? 'en' : 'pt');
  });

  /* ---------- TEMA CLARO / ESCURO ---------- */
  const themeBtn = document.getElementById('btn-theme');
  const themeIcon = themeBtn.querySelector('i');

  function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    themeIcon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
    store.set('theme', theme);
  }
  setTheme(store.get('theme') || 'dark');
  themeBtn.addEventListener('click', () => {
    setTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  });

  /* ---------- MENU MOBILE ---------- */
  const menuBtn = document.getElementById('btn-menu');
  const nav = document.getElementById('main-nav');
  menuBtn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', open);
  });
  nav.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => nav.classList.remove('open'))
  );

  /* ---------- BARRA DE PROGRESSO DE ROLAGEM ---------- */
  const bar = document.getElementById('scroll-progress');
  function updateProgress() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + '%';
  }
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  /* ---------- ANIMAÇÃO AO ROLAR (reveal) ---------- */
  const revealTargets = document.querySelectorAll(
    '.hero-content, .hero-image-wrapper, .impact-card, .project-card, .about-header, .about-text, .mvv-item'
  );
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });
    revealTargets.forEach((el, i) => {
      el.classList.add('reveal');
      el.style.transitionDelay = (i % 4) * 80 + 'ms';
      io.observe(el);
    });
  }

  /* ---------- LINK ATIVO NO MENU ---------- */
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('#main-nav a');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 140) current = s.id;
    });
    navLinks.forEach(a =>
      a.classList.toggle('active', a.getAttribute('href') === '#' + current)
    );
  }, { passive: true });
});
