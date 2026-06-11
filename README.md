# 📦 CATÁLOGO DIGITAL PMB — Seção de Móveis

Sistema desenvolvido por **Cb Pacheco** | Praça em 01/03/2019

---

## 📁 Estrutura de Pastas

```
CATALOGO-PMB/
├── index.html            ← Página principal
├── css/
│   └── style.css         ← Estilos (design militar premium)
├── js/
│   └── app.js            ← Lógica: pesquisa, filtros, paginação, modal
├── dados/
│   └── dados.json        ← Base de dados dos itens
├── imagens/
│   ├── logo-pmb.png      ← Logo PMB (coloque aqui)
│   ├── intendencia.png   ← Logo Intendência (coloque aqui)
│   ├── sem-imagem.jpg    ← Imagem padrão quando não há foto
│   ├── 1.jpg             ← Foto do item 1
│   ├── 2.jpg             ← Foto do item 2
│   └── ...               ← Continue numerando
└── README.md
```

---

## 🚀 Como Usar

1. **Abra pelo servidor local** (necessário para carregar o JSON):
   - VS Code: instale a extensão **Live Server** → clique direito em `index.html` → *Open with Live Server*
   - Ou use Python: `python -m http.server 8080` e acesse `http://localhost:8080`
   - **Não funciona** ao abrir o `index.html` diretamente com duplo clique (restrição do navegador para arquivos locais)

2. **Adicione seus dados** no arquivo `dados/dados.json` seguindo o modelo:
```json
[
  {
    "item": 1,
    "categoria": "Cadeiras",
    "descricao": "Descrição completa do item aqui...",
    "imagem": "1.jpg"
  },
  {
    "item": 2,
    "categoria": "Mesas",
    "descricao": "Descrição completa do item...",
    "imagem": "2.jpg"
  }
]
```

3. **Adicione as imagens** na pasta `imagens/` nomeadas pelo número do item:
   - Item 1 → `1.jpg`
   - Item 23 → `23.jpg`
   - Se não tiver foto, coloque `sem-imagem.jpg` como substituto

4. **Logos**: coloque `logo-pmb.png` e `intendencia.png` na pasta `imagens/`

---

## ⚙️ Funcionalidades

| Recurso | Descrição |
|---|---|
| 🔍 Pesquisa inteligente | Busca em número, categoria e descrição |
| 🏷️ Filtro por categoria | Clique em qualquer categoria para filtrar |
| 📑 Paginação | 5 itens por página (ajustável em `app.js`) |
| 🌙 Dark Mode | Botão no topo, preferência salva no navegador |
| 🖼️ Modal de detalhes | Clique em "Ver Detalhes" para abrir |
| 📊 Dashboard | Totais de itens, categorias e encontrados |
| 📱 Responsivo | Funciona em celular, tablet e desktop |
| ⌨️ Atalho ESC | Fecha o modal |
| 🔃 Ordenação | Por nº item, categoria ou descrição |

---

## ✏️ Personalizações Rápidas

**Mudar itens por página** → em `js/app.js`, linha 1:
```js
const ITENS_POR_PAGINA = 5; // altere aqui
```

**Mudar cor principal** → em `css/style.css`, no `:root`:
```css
--verde: #1a3a2e;        /* cor do header e botões */
--dourado: #b8860b;      /* cor de destaque */
```

---

*Prefeitura Militar de Brasília — Seção de Móveis*
