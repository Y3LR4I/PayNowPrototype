window.addEventListener('pagesLoaded', initializeApp);

let fluxoAtual = null;

/* =========================
   ROUTER (NAVEGAÇÃO LIMPA)
========================= */

function showPage(name) {
    const pages = document.querySelectorAll('.app-page');

    pages.forEach(page => {
        page.classList.add('hidden-right');
        page.classList.remove('hidden-left');
    });

    const target = document.getElementById(`${name}-screen`);

    if (target) {
        target.classList.remove('hidden-right');
        target.classList.remove('hidden-left');
    }
}

/* =========================
   INIT
========================= */

function initializeApp() {

    /* -------------------------
       BOTÕES PRINCIPAIS
    ------------------------- */

    const btnCriarConta = document.getElementById('btn-criar-conta');
    const btnEntrarConta = document.getElementById('btn-entrar-conta');

    if (btnCriarConta) {
        btnCriarConta.addEventListener('click', () => {
            fluxoAtual = 'cadastro';
            showPage('cadastro');
        });
    }

    if (btnEntrarConta) {
        btnEntrarConta.addEventListener('click', () => {
            fluxoAtual = 'login';
            showPage('login');
        });
    }

    /* -------------------------
       CADASTRO
    ------------------------- */

    const btnVoltarCadastro = document.getElementById('btn-voltar');
    const btnContinuarCpf = document.querySelector('.btn-continuar');

    const btnVoltarCpf = document.getElementById('btn-voltar-cpf');

    const btnFecharEmail = document.getElementById('btn-fechar-email');

    const btnVoltarDocumento = document.getElementById('btn-voltar-documento');

    if (btnVoltarDocumento) {
        btnVoltarDocumento.addEventListener('click', () => {
            showPage('email');
        });
    }

    const btnFecharDocumento = document.getElementById('btn-fechar-documento');

    if (btnFecharDocumento) {
        btnFecharDocumento.addEventListener('click', () => {
            fluxoAtual = null;

            document.querySelectorAll('.app-page').forEach(page => {
                page.classList.add('hidden-right');
                page.classList.remove('hidden-left');
            });

            document.getElementById('inicio-screen')?.classList.remove('hidden-right');
        });
    }

    const btnVoltarLogin = document.getElementById('btn-voltar-login');

    if (btnVoltarLogin) {
        btnVoltarLogin.addEventListener('click', () => {
            fluxoAtual = null;

            document.querySelectorAll('.app-page').forEach(page => {
                page.classList.add('hidden-right');
                page.classList.remove('hidden-left');
            });

            document.getElementById('inicio-screen')?.classList.remove('hidden-right');
        });
    }

    if (btnFecharEmail) {
        btnFecharEmail.addEventListener('click', () => {
            fluxoAtual = null;
            showPage('inicio');
        });
    }

    if (btnVoltarCpf) {
        btnVoltarCpf.addEventListener('click', () => {
            showPage('cadastro');
        });
    }

    const cpfCnpjInput = document.getElementById('cpf-cnpj');

    cpfCnpjInput.addEventListener('input', (e) => {
        let valor = e.target.value.replace(/\D/g, '');

        // CPF
        if (valor.length <= 11) {
            valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
            valor = valor.replace(/(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
            valor = valor.replace(/(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4');
        }

        // CNPJ
        else {
            valor = valor.replace(/^(\d{2})(\d)/, '$1.$2');
            valor = valor.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
            valor = valor.replace(/\.(\d{3})(\d)/, '.$1/$2');
            valor = valor.replace(/(\d{4})(\d)/, '$1-$2');
        }

        e.target.value = valor;
    });

    if (btnVoltarCadastro) {
        btnVoltarCadastro.addEventListener('click', () => {
            showPage('inicio');
        });
    }

    function continuarCadastro() {
        const valor = cpfCnpjInput?.value?.replace(/\D/g, '');

        if (!valor || (valor.length !== 11 && valor.length !== 14)) {
            alert('Informe um CPF ou CNPJ válido.');
            return;
        }

        showPage('dados');
    }

    if (btnContinuarCpf) {
        btnContinuarCpf.addEventListener('click', continuarCadastro);
    }

    if (cpfCnpjInput) {
        cpfCnpjInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') continuarCadastro();
        });
    }

    /* -------------------------
       DADOS → CONTATO
    ------------------------- */

    const btnContinuarDados = document.getElementById('btn-continuar-dados');

    const btnFecharDados = document.getElementById('btn-fechar-dados');

    if (btnFecharDados) {
        btnFecharDados.addEventListener('click', () => {
            showPage('inicio');
        });
    }

    if (btnContinuarDados) {
        btnContinuarDados.addEventListener('click', () => {
            showPage('contato');
        });
    }

    /* -------------------------
       CONTATO → EMAIL
    ------------------------- */

    const btnContinuarContato = document.getElementById('btn-continuar-contato');

    if (btnContinuarContato) {
        btnContinuarContato.addEventListener('click', () => {
            showPage('email');
        });
    }

    /* -------------------------
       LOGIN → EMAIL
    ------------------------- */

    const loginInput = document.getElementById('login-input');
    const btnContinuarLogin = document.getElementById('btn-continuar-login');

    function continuarLogin() {
        const valor = loginInput?.value?.trim();

        if (!valor) {
            alert('Informe um dado válido.');
            return;
        }

        showPage('email');
    }

    if (btnContinuarLogin) {
        btnContinuarLogin.addEventListener('click', continuarLogin);
    }

    if (loginInput) {
        loginInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') continuarLogin();
        });
    }

    /* -------------------------
       EMAIL → PRÓXIMO PASSO
    ------------------------- */

    const btnConfirmarEmail = document.getElementById('btn-confirmar-email');

    if (btnConfirmarEmail) {
        btnConfirmarEmail.addEventListener('click', () => {
            if (fluxoAtual === 'login') {
                showPage('dashboard');
            } else {
                showPage('documento');
            }
        });
    }

    /* -------------------------
       VOLTAR EMAIL
    ------------------------- */

    const btnVoltarEmail = document.getElementById('btn-voltar-email');

    if (btnVoltarEmail) {
        btnVoltarEmail.addEventListener('click', () => {
            if (fluxoAtual === 'login') {
                showPage('login');
            } else {
                showPage('contato');
            }
        });
    }

    /* -------------------------
       DASHBOARD → SAIR
    ------------------------- */

    const btnSair = document.getElementById('btn-sair');

    if (btnSair) {
        btnSair.addEventListener('click', () => {
            fluxoAtual = null;
            showPage('inicio');
        });
    }

    const btnVoltarContato = document.getElementById('btn-voltar-contato');

    if (btnVoltarContato) {
        btnVoltarContato.addEventListener('click', () => {
            showPage('dados');
        });
    }

    const btnFecharContato = document.getElementById('btn-fechar-contato');

    if (btnFecharContato) {
        btnFecharContato.addEventListener('click', () => {
            fluxoAtual = null;
            showPage('inicio');
        });
    }
    const btnOlho = document.getElementById('btn-olho');
    const imgOlho = document.getElementById('img-olho');

    let olhoAberto = true;

    if (btnOlho) {
        btnOlho.addEventListener('click', () => {

            olhoAberto = !olhoAberto;

            if (olhoAberto) {
                imgOlho.src = '../fotos/olho.png';
            } else {
                imgOlho.src = '../fotos/olcorte.png';
            }

        });
    }

}