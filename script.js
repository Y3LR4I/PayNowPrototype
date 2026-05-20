window.addEventListener('pagesLoaded', initializeApp);

let fluxoAtual = null;

function resetarTodasAsTelas() {
    const inicioScreen = document.getElementById('inicio-screen');
    const cadastroScreen = document.getElementById('cadastro-screen');
    const dadosScreen = document.getElementById('dados-screen');
    const contatoScreen = document.getElementById('contato-screen');
    const emailScreen = document.getElementById('email-screen');
    const documentoScreen = document.getElementById('documento-screen');
    const loginScreen = document.getElementById('login-screen');
    const dashboardScreen = document.getElementById('dashboard-screen');

  [inicioScreen, cadastroScreen, dadosScreen, contatoScreen, emailScreen, documentoScreen, loginScreen, dashboardScreen].forEach(tela => {
        if (tela) {
            tela.classList.remove('hidden-left', 'hidden-right');
        }
    });

  cadastroScreen?.classList.add('hidden-right');
    dadosScreen?.classList.add('hidden-right');
    contatoScreen?.classList.add('hidden-right');
    emailScreen?.classList.add('hidden-right');
    documentoScreen?.classList.add('hidden-right');
    loginScreen?.classList.add('hidden-right');
    dashboardScreen?.classList.add('hidden-right');

    fluxoAtual = null;
}

function initializeApp() {
  const btnCriarConta = document.getElementById('btn-criar-conta');
    const btnEntrarConta = document.getElementById('btn-entrar-conta');
    const btnSair = document.getElementById('btn-sair');
    const inicioScreen = document.getElementById('inicio-screen');
    const dashboardScreen = document.getElementById('dashboard-screen');
    const cadastroScreen = document.getElementById('cadastro-screen');
    const loginScreen = document.getElementById('login-screen');
    const cpfCnpjInput = document.getElementById('cpf-cnpj');
    const btnVoltar = document.getElementById('btn-voltar');
    const loginInput = document.getElementById('login-input');
    const btnContinuarLogin = document.getElementById('btn-continuar-login');
    const btnVoltarLogin = document.getElementById('btn-voltar-login');

    const btnContinuarCpf = document.querySelector('.btn-continuar');
    const dadosScreen = document.getElementById('dados-screen');

    const btnVoltarCpf = document.getElementById('btn-voltar-cpf');
    const btnFecharDados = document.getElementById('btn-fechar-dados');

    const dataNascimentoInput = document.getElementById('data-nascimento');

    const contatoScreen = document.getElementById('contato-screen');

    const btnContinuarDados = document.getElementById('btn-continuar-dados');

    const btnVoltarContato = document.getElementById('btn-voltar-contato');

    const btnFecharContato = document.getElementById('btn-fechar-contato');

    const emailScreen = document.getElementById('email-screen');

    const btnContinuarContato = document.getElementById('btn-continuar-contato');

    const btnVoltarEmail = document.getElementById('btn-voltar-email');

    const btnFecharEmail = document.getElementById('btn-fechar-email');

    const emailInput = document.getElementById('email');

    const emailMascarado = document.getElementById('email-mascarado');

    const documentoScreen = document.getElementById('documento-screen');

    const btnConfirmarEmail = document.getElementById('btn-confirmar-email');

    const btnVoltarDocumento = document.getElementById('btn-voltar-documento');

    const btnFecharDocumento = document.getElementById('btn-fechar-documento');

    btnCriarConta.addEventListener('click', () => {
        fluxoAtual = 'cadastro';
        inicioScreen.classList.add('hidden-left');
        cadastroScreen.classList.remove('hidden-right');
    });

    btnEntrarConta.addEventListener('click', () => {
        fluxoAtual = 'login';
        inicioScreen.classList.add('hidden-left');
        loginScreen.classList.remove('hidden-right');
    });

    btnVoltar.addEventListener('click', () => {
        resetarTodasAsTelas();
        document.getElementById('inicio-screen').classList.remove('hidden-left');
    });

    btnSair.addEventListener('click', () => {
        resetarTodasAsTelas();
        document.getElementById('inicio-screen').classList.remove('hidden-left');
    });

    btnVoltarLogin.addEventListener('click', () => {
        resetarTodasAsTelas();
        document.getElementById('inicio-screen').classList.remove('hidden-left');
    });

    function validarLoginInput(valor) {
        const apenasNumeros = valor.replace(/\D/g, '');

      if (apenasNumeros.length === 11) return true;

      if (apenasNumeros.length === 14) return true;

      if ((apenasNumeros.length === 10 || apenasNumeros.length === 11) && valor.includes('(')) return true;

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(valor)) return true;

        return false;
    }

    function continuarParaEmailLogin() {
        const valor = loginInput.value.trim();

        if (!validarLoginInput(valor)) {
            alert('Informe um CPF, email ou telefone válido.');
            return;
        }

        const email = valor.includes('@') ? valor : 'contato@example.com';
        const emailMascarado = document.getElementById('email-mascarado');
        emailMascarado.textContent = mascararEmail(email);

        loginScreen.classList.add('hidden-left');
        emailScreen.classList.remove('hidden-right');
    }

    btnContinuarLogin.addEventListener('click', continuarParaEmailLogin);

    loginInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            continuarParaEmailLogin();
        }
    });

    loginInput.addEventListener('input', (e) => {
        let valor = e.target.value.replace(/\D/g, '');

      if (valor.length <= 11) {
            valor = valor.replace(/^(\d{3})(\d)/, '$1.$2');
            valor = valor.replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
            valor = valor.replace(/\.(\d{3})(\d)/, '.$1-$2');
            e.target.value = valor;
        }
    });

    function continuarParaDados() {

        const valor = cpfCnpjInput.value.replace(/\D/g, '');

        const cpfValido = valor.length === 11;
        const cnpjValido = valor.length === 14;

        if (!cpfValido && !cnpjValido) {
            alert('Informe um CPF ou CNPJ válido.');
            return;
        }

        cadastroScreen.classList.add('hidden-left');
        dadosScreen.classList.remove('hidden-right');
    }

    btnContinuarCpf.addEventListener('click', continuarParaDados);

    cpfCnpjInput.addEventListener('keydown', (e) => {

        if (e.key === 'Enter') {
            continuarParaDados();
        }
    });

    btnVoltarCpf.addEventListener('click', () => {
        dadosScreen.classList.add('hidden-right');
        cadastroScreen.classList.remove('hidden-left');
    });

    btnFecharDados.addEventListener('click', () => {
        resetarTodasAsTelas();
        document.getElementById('inicio-screen').classList.remove('hidden-left');
    });

    cpfCnpjInput.addEventListener('input', (e) => {

        let valor = e.target.value.replace(/\D/g, '');

      if (valor.length <= 11) {

            valor = valor.replace(/^(\d{3})(\d)/, '$1.$2');
            valor = valor.replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
            valor = valor.replace(/\.(\d{3})(\d)/, '.$1-$2');

        } else {

            valor = valor.replace(/^(\d{2})(\d)/, '$1.$2');
            valor = valor.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
            valor = valor.replace(/\.(\d{3})(\d)/, '.$1/$2');
            valor = valor.replace(/(\d{4})(\d)/, '$1-$2');
        }

        e.target.value = valor;
    });

    dataNascimentoInput.addEventListener('input', (e) => {

        let valor = e.target.value.replace(/\D/g, '');

        if (valor.length > 2) {
            valor = valor.replace(/^(\d{2})(\d)/, '$1/$2');
        }

        if (valor.length > 5) {
            valor = valor.replace(/^(\d{2})\/(\d{2})(\d)/, '$1/$2/$3');
        }

        e.target.value = valor;
    });

    btnContinuarDados.addEventListener('click', () => {

        dadosScreen.classList.add('hidden-left');
        contatoScreen.classList.remove('hidden-right');

    });

    btnVoltarContato.addEventListener('click', () => {

        contatoScreen.classList.add('hidden-right');
        dadosScreen.classList.remove('hidden-left');

    });

    btnFecharContato.addEventListener('click', () => {
        resetarTodasAsTelas();
        document.getElementById('inicio-screen').classList.remove('hidden-left');
    });

    function mascararEmail(email) {

        const partes = email.split('@');

        if (partes.length < 2) return email;

        const nome = partes[0];
        const dominio = partes[1];

        const primeiroCaractere = nome.charAt(0);

        return primeiroCaractere + '******@' + dominio;
    }

    btnContinuarContato.addEventListener('click', () => {

        const email = emailInput.value;

        emailMascarado.textContent = mascararEmail(email);

        contatoScreen.classList.add('hidden-left');
        emailScreen.classList.remove('hidden-right');

    });

    btnVoltarEmail.addEventListener('click', () => {
        emailScreen.classList.add('hidden-right');

        if (fluxoAtual === 'login') {
            loginScreen.classList.remove('hidden-left');
        } else {
            contatoScreen.classList.remove('hidden-left');
        }
    });

    btnFecharEmail.addEventListener('click', () => {
        resetarTodasAsTelas();
        document.getElementById('inicio-screen').classList.remove('hidden-left');
    });

    const codigoInputs = document.querySelectorAll('.codigo-input');

    codigoInputs.forEach((input, index) => {

        input.addEventListener('input', (e) => {

            e.target.value = e.target.value.replace(/\D/g, '');

            if (e.target.value.length === 1 && index < codigoInputs.length - 1) {
                codigoInputs[index + 1].focus();
            }

        });

    });

    btnConfirmarEmail.addEventListener('click', () => {
        emailScreen.classList.add('hidden-left');

        if (fluxoAtual === 'login') {
          dashboardScreen.classList.remove('hidden-right');
        } else {
          documentoScreen.classList.remove('hidden-right');
        }
    });

    btnVoltarDocumento.addEventListener('click', () => {

        documentoScreen.classList.add('hidden-right');
        emailScreen.classList.remove('hidden-left');

    });

    btnFecharDocumento.addEventListener('click', () => {
        resetarTodasAsTelas();
        document.getElementById('inicio-screen').classList.remove('hidden-left');
    });
}


