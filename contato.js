
function atualizarBotaoTema(isLight) {
    const themeIcon = document.getElementById('theme-icon');
    const themeText = document.getElementById('theme-text');
    
    if (themeIcon && themeText) {
        themeIcon.textContent = isLight ? '☀️' : '🌙';
        themeText.textContent = isLight ? 'Claro' : 'Escuro';
    }
}


function alternarTema() {
    document.body.classList.toggle('theme-light');
    const isLight = document.body.classList.contains('theme-light');

    atualizarBotaoTema(isLight);
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
}


document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'light') {
        document.body.classList.add('theme-light');
        atualizarBotaoTema(true);
    } else {
        atualizarBotaoTema(false);
    }


    const btnTheme = document.getElementById('theme-toggle');
    if (btnTheme) {
        btnTheme.addEventListener('click', alternarTema);
    }
});
