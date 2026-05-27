const PAGES = [
    { name: 'inicio', styles: ['global', 'inicio'] },
    { name: 'cadastro', styles: ['global', 'cadastro'] },
    { name: 'dados', styles: ['global', 'cadastro'] },
    { name: 'contato', styles: ['global', 'cadastro'] },
    { name: 'email', styles: ['global', 'cadastro'] },
    { name: 'documento', styles: ['global', 'cadastro'] },
    { name: 'dashboard', styles: ['global', 'dashboard'] },
    { name: 'login', styles: ['global', 'login']},
    { name: 'pix', styles: ['global', 'pix']},
    { name: 'cadastro-pix', styles: ['global', 'cadastro-pix']},
    { name: 'transferencia-pix', styles: ['global', 'transferencia-pix']},
    { name: 'extrato', styles: ['global', 'extrato']}
];

async function loadPageHTML(pageName) {
    try {
        const response = await fetch(`pages/${pageName}.html`);
        if (!response.ok) throw new Error(`Erro ao carregar ${pageName}.html`);
        return await response.text();
    } catch (error) {
        console.error(`Erro ao carregar página ${pageName}:`, error);
        return '';
    }
}

function loadStylesheet(styleName) {
  if (document.querySelector(`link[href="styles/${styleName}.css"]`)) {
        return;
    }

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `styles/${styleName}.css`;
    document.head.appendChild(link);
}

function loadStyles(styleNames) {
    styleNames.forEach(style => loadStylesheet(style));
}

async function initializePages() {
    const screenContainer = document.querySelector('.screen');

    if (!screenContainer) {
        console.error('Tela não encontrada');
        return;
    }

  for (const page of PAGES) {
        const html = await loadPageHTML(page.name);
        if (html) {
            screenContainer.insertAdjacentHTML('beforeend', html);
        }
    }

  const allStyles = [...new Set(PAGES.flatMap(p => p.styles))];
    loadStyles(allStyles);

  window.dispatchEvent(new Event('pagesLoaded'));
}

document.addEventListener('DOMContentLoaded', initializePages);

