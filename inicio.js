
let currentPosition = 0;
const track = document.getElementById('carrosselTrack');
const cards = document.querySelectorAll('.tenis-card, .card');
const totalCards = cards.length;

function getCardsPerView() {
    if (window.innerWidth > 1024) return 3;
    if (window.innerWidth > 768) return 2;
    return 1;
}

function moveCarrossel(direction) {
    if (!track || totalCards === 0) return;

    const cardsPerView = getCardsPerView();
    const cardWidth = cards[0].offsetWidth + 20;
    const maxPosition = totalCards - cardsPerView;

    currentPosition += direction;

    if (currentPosition < 0) {
        currentPosition = 0;
    } else if (currentPosition > maxPosition) {
        currentPosition = maxPosition;
    }

    const translateX = -currentPosition * cardWidth;
    track.style.transform = `translateX(${translateX}px)`;
}

window.addEventListener('resize', () => {
    currentPosition = 0;
    if (track) track.style.transform = `translateX(0px)`;
});


function mostrarToast(mensagem) {
    let toast = document.getElementById('toast-notification');

    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast-notification';
        document.body.appendChild(toast);
    }

    toast.innerHTML = `<span style="color: var(--cor-destaque, #ff3333); font-weight: bold;">✓</span> ${mensagem}`;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

function adicionarAoCarrinho(nome, preco, imagem) {
    let carrinho = JSON.parse(localStorage.getItem('carrinhoCulture')) || [];
    let itemExistente = carrinho.find(item => item.nome === nome);

    if (itemExistente) {
        itemExistente.quantidade += 1;
    } else {
        carrinho.push({
            nome: nome,
            preco: preco,
            imagem: imagem,
            quantidade: 1
        });
    }

    localStorage.setItem('carrinhoCulture', JSON.stringify(carrinho));

    atualizarContadorHeader();
    mostrarToast(`"${nome}" foi adicionado ao seu carrinho!`);
}

function atualizarContadorHeader() {
    let carrinho = JSON.parse(localStorage.getItem('carrinhoCulture')) || [];
    let totalItens = carrinho.reduce((acc, item) => acc + (item.quantidade || 1), 0);

    let elContador = document.getElementById('contador-carrinho');
    if (elContador) {
        elContador.innerText = totalItens;
    }
}

function abrirPesquisa() {
    let termo = prompt("O que você está procurando?");
    if (termo) {
        alert(`Buscando por: ${termo}`);
    }
}


function inicializarTema() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const themeText = document.getElementById('theme-text');

 
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme === 'light') {
        document.body.classList.add('theme-light');
        document.body.classList.remove('theme-dark');
        if (themeIcon) themeIcon.textContent = '☀️';
        if (themeText) themeText.textContent = 'Claro';
    } else {
        document.body.classList.add('theme-dark');
        document.body.classList.remove('theme-light');
        if (themeIcon) themeIcon.textContent = '🌙';
        if (themeText) themeText.textContent = 'Escuro';
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('theme-light');
            document.body.classList.toggle('theme-dark');

            const isLight = document.body.classList.contains('theme-light');

            if (themeIcon) themeIcon.textContent = isLight ? '☀️' : '🌙';
            if (themeText) themeText.textContent = isLight ? 'Claro' : 'Escuro';

            localStorage.setItem('theme', isLight ? 'light' : 'dark');
        });
    }
}


document.addEventListener('DOMContentLoaded', () => {
  
    atualizarContadorHeader();
    inicializarTema();

    document.querySelectorAll('.btn-adicionar').forEach(botao => {
        botao.onclick = (event) => {
            const card = event.target.closest('.tenis-card') || event.target.closest('.card');

            if (card) {
                const nome = card.querySelector('h3, h4')?.innerText.trim() || 'Produto';
                const preco = card.querySelector('.preco, .tenis-preco')?.innerText.trim() || 'R$ 0,00';
                const imagem = card.querySelector('img')?.src || '';

                adicionarAoCarrinho(nome, preco, imagem);
            }
        };
    });
});

function verificarUsuarioLogado() {
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioZikka'));
    const btnLogin = document.querySelector('.login-btn');

    if (usuarioLogado && btnLogin) {
       
        btnLogin.innerHTML = `👤 <span style="font-size: 0.8rem; font-weight: bold; margin-left: 2px;">✓</span>`;
        btnLogin.title = `Conectado como ${usuarioLogado.nome || 'Usuário'}`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    verificarUsuarioLogado();
});
