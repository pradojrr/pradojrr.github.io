document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;

  /* ---------- armazenamento seguro (nunca quebra o site) ---------- */
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };

  /* ---------- IDIOMA PT / EN ----------
     Todo elemento com data-en é traduzido. O texto original (PT) é
     guardado automaticamente e restaurado ao voltar para português. */
  const translatable = document.querySelectorAll('[data-en]');
  translatable.forEach(el => { el.dataset.pt = el.innerHTML; });

  const meta = {
    pt: {
      title: 'Ronaldo Prado Jr. | Engenharia Elétrica',
      desc: 'Portfólio de Ronaldo Prado Jr. — Engenharia Elétrica, Powertrain e Fórmula SAE na UFMS.'
    },
    en: {
      title: 'Ronaldo Prado Jr. | Electrical Engineering',
      desc: 'Portfolio of Ronaldo Prado Jr. — Electrical Engineering, Powertrain and Formula SAE at UFMS.'
    }
  };
  const metaDesc = document.querySelector('meta[name="description"]');
  const langBtn = document.getElementById('btn-lang');
  const langIndicator = document.getElementById('lang-indicator');

  function setLang(lang) {
    translatable.forEach(el => { el.innerHTML = el.dataset[lang]; });
    root.lang = lang === 'pt' ? 'pt-BR' : 'en';
    root.dataset.lang = lang;
    document.title = meta[lang].title;
    if (metaDesc) metaDesc.setAttribute('content', meta[lang].desc);
    // o botão mostra o idioma para o qual vai trocar
    langIndicator.textContent = lang === 'pt' ? 'EN' : 'PT';
    store.set('lang', lang);
  }

  const saved = store.get('lang');
  const browser = (navigator.language || 'pt').toLowerCase().startsWith('pt') ? 'pt' : 'en';
  setLang(saved === 'pt' || saved === 'en' ? saved : browser);

  langBtn.addEventListener('click', () => {
    setLang(root.dataset.lang === 'pt' ? 'en' : 'pt');
  });

  /* ---------- TEMA CLARO / ESCURO ---------- */
  const themeBtn = document.getElementById('btn-theme');
  const themeIcon = themeBtn.querySelector('i');
  function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    themeIcon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
    store.set('theme', theme);
  }
  setTheme(store.get('theme') === 'light' ? 'light' : 'dark');
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

  /* ---------- BARRA DE PROGRESSO ---------- */
  const bar = document.getElementById('scroll-progress');
  function updateProgress() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + '%';
  }
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  /* ---------- ANIMAÇÃO AO ROLAR ---------- */
  const revealTargets = document.querySelectorAll(
    '.hero-content, .hero-image-wrapper, .impact-card, .project-card, .about-header, .about-card, .interest-strip'
  );
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    revealTargets.forEach((el, i) => {
      el.classList.add('reveal');
      el.style.transitionDelay = (i % 3) * 80 + 'ms';
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
