const ITENS_POR_PAGINA = 5;

// O array "dados" vem do arquivo dados.js
let filtrados = [...dados];

let paginaAtual = 1;
let categoriaAtual = "Todos";


function criarCategorias(){

const categorias =
["Todos",
...new Set(dados.map(i => i.categoria))
];

const container =
document.getElementById("categorias");

container.innerHTML="";

categorias.forEach(cat=>{

const btn =
document.createElement("button");

btn.className="categoria-btn";

btn.textContent=cat;

btn.onclick=()=>{

categoriaAtual=cat;

filtrar();

};

container.appendChild(btn);

});

}

function filtrar(){

const termo =
document.getElementById("pesquisa")
.value
.toLowerCase();

filtrados =
dados.filter(item=>{

const busca=
item.item.toString().includes(termo) ||
item.categoria.toLowerCase().includes(termo) ||
item.descricao.toLowerCase().includes(termo);

const categoria=
categoriaAtual==="Todos" ||
item.categoria===categoriaAtual;

return busca && categoria;

});

paginaAtual=1;

atualizarDashboard();

renderizar();

}

function renderizar(){

const inicio =
(paginaAtual-1)*ITENS_POR_PAGINA;

const fim =
inicio+ITENS_POR_PAGINA;

const pagina =
filtrados.slice(inicio,fim);

const catalogo =
document.getElementById("catalogo");

catalogo.innerHTML="";

pagina.forEach(item=>{

const card =
document.createElement("div");

card.className="card";

card.innerHTML=`

<img
src="imagens/${item.imagem}"
onerror="this.src='imagens/sem-imagem.jpg'"
>

<div class="card-body">

<h3>Item ${item.item}</h3>

<p>${item.categoria}</p>

<p>
${item.descricao.substring(0,120)}...
</p>

<button onclick="abrirModal(${item.item})">
Ver Detalhes
</button>

</div>
`;

catalogo.appendChild(card);

});

renderizarPaginacao();

}

function renderizarPaginacao(){

const total =
Math.ceil(
filtrados.length /
ITENS_POR_PAGINA
);

const pag =
document.getElementById("paginacao");

pag.innerHTML=`

<button
class="page-btn"
onclick="mudarPagina(-1)">
Anterior
</button>

<span>
Página ${paginaAtual} de ${total}
</span>

<button
class="page-btn"
onclick="mudarPagina(1)">
Próxima
</button>

`;

}

function mudarPagina(valor){

const total =
Math.ceil(
filtrados.length /
ITENS_POR_PAGINA
);

paginaAtual += valor;

if(paginaAtual<1)
paginaAtual=1;

if(paginaAtual>total)
paginaAtual=total;

renderizar();

}

function abrirModal(numero){

const item =
dados.find(i=>i.item===numero);

document.getElementById("modalImagem")
.src=`imagens/${item.imagem}`;

document.getElementById("modalTitulo")
.innerText=`Item ${item.item}`;

document.getElementById("modalCategoria")
.innerText=item.categoria;

document.getElementById("modalDescricao")
.innerText=item.descricao;

document.getElementById("modal")
.style.display="block";

}

document.querySelector(".fechar")
.onclick=()=>{

document.getElementById("modal")
.style.display="none";

};

document
.getElementById("pesquisa")
.addEventListener("input",filtrar);

document
.getElementById("darkMode")
.addEventListener("click",()=>{

document.body.classList.toggle("dark");

});

function atualizarDashboard(){

document.getElementById("totalItens")
.innerText=dados.length;

document.getElementById("totalCategorias")
.innerText=
new Set(
dados.map(i=>i.categoria)
).size;

document.getElementById("itensEncontrados")
.innerText=
filtrados.length;

}

criarCategorias();
atualizarDashboard();
renderizar();