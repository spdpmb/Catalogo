/* ===========================================================
   CATÁLOGO DIGITAL PMB — app.js
   Cb Pacheco / Praça 01/03/2019
   Compatível com HTML v2 (dados via dados.js global)
   ============================================================ */

const ITENS_POR_PAGINA = 5;

// "dados" vem do arquivo dados/dados.js como variável global
let filtrados    = [...dados];
let paginaAtual  = 1;
let categoriaAtual = 'Todos';

/* ===================== CATEGORIAS ========================= */
function criarCategorias() {
  const lista = ['Todos', ...new Set(dados.map(i => i.categoria))].sort((a, b) =>
    a === 'Todos' ? -1 : a.localeCompare(b, 'pt-BR')
  );

  const container = document.getElementById('categorias');
  container.innerHTML = '';

  lista.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'categoria-btn' + (cat === categoriaAtual ? ' ativo' : '');
    btn.textContent = cat;
    btn.addEventListener('click', () => {
      categoriaAtual = cat;
      document.querySelectorAll('.categoria-btn').forEach(b => b.classList.remove('ativo'));
      btn.classList.add('ativo');
      paginaAtual = 1;
      filtrar();
    });
    container.appendChild(btn);
  });
}

/* ===================== FILTRAR ============================ */
function filtrar() {
  const termo = document.getElementById('pesquisa').value.toLowerCase().trim();
  const ordem = document.getElementById('ordenacao').value;

  filtrados = dados.filter(item => {
    const busca = !termo ||
      item.item.toString().includes(termo) ||
      item.categoria.toLowerCase().includes(termo) ||
      item.descricao.toLowerCase().includes(termo);
    const cat = categoriaAtual === 'Todos' || item.categoria === categoriaAtual;
    return busca && cat;
  });

  filtrados.sort((a, b) => {
    if (ordem === 'item')      return a.item - b.item;
    if (ordem === 'categoria') return a.categoria.localeCompare(b.categoria, 'pt-BR');
    if (ordem === 'descricao') return a.descricao.localeCompare(b.descricao, 'pt-BR');
    return 0;
  });

  paginaAtual = 1;
  atualizarDashboard();
  renderizar();
}

/* ===================== RENDERIZAR CARDS =================== */
function renderizar() {
  const inicio = (paginaAtual - 1) * ITENS_POR_PAGINA;
  const fim    = inicio + ITENS_POR_PAGINA;
  const pagina = filtrados.slice(inicio, fim);

  const catalogo = document.getElementById('catalogo');
  catalogo.innerHTML = '';

  if (pagina.length === 0) {
    catalogo.innerHTML = `
      <div class="sem-resultados">
        <i class="fas fa-search"></i>
        <p>Nenhum item encontrado.<br>Tente outro termo ou categoria.</p>
      </div>`;
    renderizarPaginacao();
    return;
  }

  pagina.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';
    const desc = item.descricao.length > 110
      ? item.descricao.substring(0, 110) + '...'
      : item.descricao;

    card.innerHTML = `
      <div class="card-imagem">
        <img
          src="imagens/${item.imagem}"
          alt="Item ${item.item}"
          onerror="this.src='imagens/sem-imagem.jpg'"
          loading="lazy"
        >
        <span class="card-num-badge">Nº ${item.item}</span>
      </div>
      <div class="card-body">
        <span class="card-cat-badge">${item.categoria}</span>
        <h3>Item ${item.item}</h3>
        <p>${desc}</p>
        <button onclick="abrirModal(${item.item})">
          <i class="fas fa-expand-alt"></i> Ver Detalhes
        </button>
      </div>`;

    catalogo.appendChild(card);
  });

  renderizarPaginacao();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ===================== PAGINAÇÃO ========================== */
function renderizarPaginacao() {
  const total = Math.ceil(filtrados.length / ITENS_POR_PAGINA);
  const pag   = document.getElementById('paginacao');
  pag.innerHTML = '';

  if (total <= 1) return;

  const btnAnterior = criarBtnPag('← Anterior', paginaAtual <= 1);
  btnAnterior.addEventListener('click', () => { if (paginaAtual > 1) { paginaAtual--; renderizar(); } });
  pag.appendChild(btnAnterior);

  const MAX_VISIVEL = 5;
  let ini = Math.max(1, paginaAtual - 2);
  let fim = Math.min(total, ini + MAX_VISIVEL - 1);
  if (fim - ini < MAX_VISIVEL - 1) ini = Math.max(1, fim - MAX_VISIVEL + 1);

  if (ini > 1) {
    const b1 = criarBtnPag('1'); b1.addEventListener('click', () => irPara(1)); pag.appendChild(b1);
    if (ini > 2) pag.appendChild(criarReticencias());
  }

  for (let i = ini; i <= fim; i++) {
    const b = criarBtnPag(String(i), false, i === paginaAtual);
    b.addEventListener('click', () => irPara(i));
    pag.appendChild(b);
  }

  if (fim < total) {
    if (fim < total - 1) pag.appendChild(criarReticencias());
    const bLast = criarBtnPag(String(total));
    bLast.addEventListener('click', () => irPara(total));
    pag.appendChild(bLast);
  }

  const btnProxima = criarBtnPag('Próxima →', paginaAtual >= total);
  btnProxima.addEventListener('click', () => { if (paginaAtual < total) { paginaAtual++; renderizar(); } });
  pag.appendChild(btnProxima);

  const info = document.createElement('span');
  info.className = 'pag-info';
  info.textContent = `Pág. ${paginaAtual} / ${total}`;
  pag.appendChild(info);

  document.getElementById('paginaAtualInfo').textContent = paginaAtual;
}

function criarBtnPag(texto, desabilitado = false, ativo = false) {
  const btn = document.createElement('button');
  btn.className = 'page-btn' + (ativo ? ' ativo' : '');
  btn.textContent = texto;
  btn.disabled = desabilitado;
  return btn;
}

function criarReticencias() {
  const s = document.createElement('span');
  s.className = 'pag-info';
  s.textContent = '…';
  return s;
}

function irPara(n) {
  paginaAtual = n;
  renderizar();
}

/* ===================== MODAL ============================== */
function abrirModal(numero) {
  const item = dados.find(i => i.item == numero); // == para evitar conflito string/number
  if (!item) return;

  document.getElementById('modalImagem').src              = `imagens/${item.imagem}`;
  document.getElementById('modalImagem').onerror          = () => {
    document.getElementById('modalImagem').src = 'imagens/sem-imagem.jpg';
  };
  document.getElementById('modalTitulo').innerText        = `Item ${item.item}`;
  document.getElementById('modalCategoriaBadge').innerText = item.categoria; // ID correto do seu HTML
  document.getElementById('modalDescricao').innerText     = item.descricao;
  document.getElementById('modalNumero').innerText        = `Nº de referência: ${String(item.item).padStart(4, '0')}`;

  document.getElementById('modal').classList.add('aberto'); // usa classe, não style.display
  document.body.style.overflow = 'hidden';
}

function fecharModal() {
  document.getElementById('modal').classList.remove('aberto');
  document.body.style.overflow = '';
}

/* ===================== DASHBOARD ========================== */
function atualizarDashboard() {
  document.getElementById('totalItens').innerText       = dados.length;
  document.getElementById('totalCategorias').innerText  = new Set(dados.map(i => i.categoria)).size;
  document.getElementById('itensEncontrados').innerText = filtrados.length;
  document.getElementById('paginaAtualInfo').innerText  = paginaAtual;
}

/* ===================== DARK MODE ========================== */
const btnDark = document.getElementById('darkMode');
btnDark.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const ativo = document.body.classList.contains('dark');
  btnDark.innerHTML = ativo
    ? '<i class="fas fa-sun"></i> <span>Modo Claro</span>'
    : '<i class="fas fa-moon"></i> <span>Modo Escuro</span>';
  localStorage.setItem('pmb-dark', ativo ? '1' : '0');
});

if (localStorage.getItem('pmb-dark') === '1') {
  document.body.classList.add('dark');
  btnDark.innerHTML = '<i class="fas fa-sun"></i> <span>Modo Claro</span>';
}

/* ===================== EVENTS ============================= */
document.getElementById('pesquisa').addEventListener('input', () => {
  paginaAtual = 1;
  filtrar();
});

document.getElementById('ordenacao').addEventListener('change', filtrar);

document.getElementById('limparPesquisa').addEventListener('click', () => {
  document.getElementById('pesquisa').value = '';
  paginaAtual = 1;
  filtrar();
});

document.querySelector('.fechar').addEventListener('click', fecharModal);

document.getElementById('modal').addEventListener('click', e => {
  if (e.target === document.getElementById('modal')) fecharModal();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') fecharModal();
});

/* ===================== INIT =============================== */
criarCategorias();
atualizarDashboard();
renderizar();
