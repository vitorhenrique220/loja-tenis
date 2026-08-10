 function mostrarToast(mensagem, tipo = 'sucesso') {
    let toast = document.getElementById('toast-notification');

    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast-notification';
      document.body.appendChild(toast);
    }

    const icone = tipo === 'aviso' ? '⚠️' : '✓';
    toast.innerHTML = `<span style="color: #3b82f6; font-weight: bold; margin-right: 5px;">${icone}</span> ${mensagem}`;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }


  function converterPrecoParaNumero(preco) {
    if (typeof preco === 'number') return preco;
    if (!preco) return 0;
    let limpo = preco.toString().replace('R$', '').replace(/\./g, '').replace(',', '.').trim();
    return parseFloat(limpo) || 0;
  }

  function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  function atualizarContadorCartHeader(totalItens) {
    const contador = document.getElementById('contador-carrinho');
    if (contador) contador.innerText = totalItens;
  }

  function carregarCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem('carrinhoCulture')) || [];
    const container = document.getElementById('lista-carrinho');
    const elSubtotal = document.getElementById('subtotal');
    const elTotal = document.getElementById('total-pedido');
    let subtotal = 0;
    let totalQtd = 0;

    if (carrinho.length === 0) {
      if (container) {
        container.innerHTML = `<p class="carrinho-vazio">Seu carrinho está vazio. <a href="inicio.html">Voltar para a loja.</a></p>`;
      }
      if (elSubtotal) elSubtotal.innerText = 'R$ 0,00';
      if (elTotal) elTotal.innerText = 'R$ 0,00';
      atualizarContadorCartHeader(0);
      return;
    }

    if (container) {
      container.innerHTML = '';

      carrinho.forEach((item, index) => {
        const precoUnitario = converterPrecoParaNumero(item.preco);
        const totalItem = precoUnitario * item.quantidade;
        subtotal += totalItem;
        totalQtd += item.quantidade;

        container.innerHTML += `
          <div class="item-carrinho">
            <img src="${item.imagem}" alt="${item.nome}">
            <div class="item-detalhes">
              <h4>${item.nome}</h4>
              <span class="item-preco">${formatarMoeda(precoUnitario)}</span>
            </div>
            <div class="item-qtd">
              <button onclick="alterarQtd(${index}, -1)">-</button>
              <span>${item.quantidade}</span>
              <button onclick="alterarQtd(${index}, 1)">+</button>
            </div>
            <button class="btn-remover" onclick="removerItem(${index})">🗑️</button>
          </div>
        `;
      });
    }

    if (elSubtotal) elSubtotal.innerText = formatarMoeda(subtotal);
    if (elTotal) elTotal.innerText = formatarMoeda(subtotal);
    atualizarContadorCartHeader(totalQtd);
  }

  function alterarQtd(index, mudanca) {
    let carrinho = JSON.parse(localStorage.getItem('carrinhoCulture')) || [];
    if (!carrinho[index]) return;

    carrinho[index].quantidade += mudanca;

    if (carrinho[index].quantidade <= 0) {
      carrinho.splice(index, 1);
    }

    localStorage.setItem('carrinhoCulture', JSON.stringify(carrinho));
    carregarCarrinho();
  }

  function removerItem(index) {
    let carrinho = JSON.parse(localStorage.getItem('carrinhoCulture')) || [];
    carrinho.splice(index, 1);
    localStorage.setItem('carrinhoCulture', JSON.stringify(carrinho));
    carregarCarrinho();
  }

  function finalizarCompra() {
    let carrinho = JSON.parse(localStorage.getItem('carrinhoCulture')) || [];
    
    if (carrinho.length === 0) {
      mostrarToast('Seu carrinho está vazio!', 'aviso');
      return;
    }

    mostrarToast('Pedido realizado com sucesso! Obrigado por comprar na ZIKKA.', 'sucesso');
    localStorage.removeItem('carrinhoCulture');
    carregarCarrinho();
  }

 
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
    carregarCarrinho();

  
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
