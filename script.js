document.addEventListener('DOMContentLoaded', () => {
    const langBtn = document.getElementById('langToggle');
    let currentLang = 'pt'; // Idioma padrão

    langBtn.addEventListener('click', () => {
        // Alterna o idioma
        currentLang = currentLang === 'pt' ? 'en' : 'pt';
        
        // Atualiza todos os elementos que possuem os atributos data-pt e data-en
        const translatableElements = document.querySelectorAll('[data-pt]');
        
        translatableElements.forEach(el => {
            el.innerHTML = el.getAttribute(`data-${currentLang}`);
        });
    });
});
