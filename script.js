// Seleção dos elementos do DOM
const btnCriarConta = document.getElementById('btn-criar-conta');
const btnSair = document.getElementById('btn-sair');
const loginScreen = document.getElementById('login-screen');
const dashboardScreen = document.getElementById('dashboard-screen');
const cadastroScreen = document.getElementById('cadastro-screen');
const cpfCnpjInput = document.getElementById('cpf-cnpj');
const btnVoltar = document.getElementById('btn-voltar');

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

/**
 * Evento de Login
 * Transiciona a tela de Login para a Esquerda (escondendo)
 * e traz a tela do Dashboard para o centro da visualização.
 */
btnCriarConta.addEventListener('click', () => {
    loginScreen.classList.add('hidden-left');
    cadastroScreen.classList.remove('hidden-right');
});

btnVoltar.addEventListener('click', () => {
    cadastroScreen.classList.add('hidden-right');
    loginScreen.classList.remove('hidden-left');
});

/**
 * Evento de Logout (Sair)
 * Faz o caminho inverso: remove a ocultação da tela de login
 * e joga o Dashboard de volta para a direita.
 */
btnSair.addEventListener('click', () => {
    loginScreen.classList.remove('hidden-left');
    dashboardScreen.classList.add('hidden-right');
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

    dadosScreen.classList.add('hidden-right');

    cadastroScreen.classList.remove('hidden-left');
    cadastroScreen.classList.add('hidden-right');

    loginScreen.classList.remove('hidden-left');
});

cpfCnpjInput.addEventListener('input', (e) => {

    let valor = e.target.value.replace(/\D/g, '');

    // CPF
    if (valor.length <= 11) {

        valor = valor.replace(/^(\d{3})(\d)/, '$1.$2');
        valor = valor.replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
        valor = valor.replace(/\.(\d{3})(\d)/, '.$1-$2');

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

    contatoScreen.classList.add('hidden-right');

    dadosScreen.classList.remove('hidden-left');
    dadosScreen.classList.add('hidden-right');

    cadastroScreen.classList.remove('hidden-left');
    cadastroScreen.classList.add('hidden-right');

    loginScreen.classList.remove('hidden-left');

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
    contatoScreen.classList.remove('hidden-left');

});

btnFecharEmail.addEventListener('click', () => {

    emailScreen.classList.add('hidden-right');

    contatoScreen.classList.remove('hidden-left');
    contatoScreen.classList.add('hidden-right');

    dadosScreen.classList.remove('hidden-left');
    dadosScreen.classList.add('hidden-right');

    cadastroScreen.classList.remove('hidden-left');
    cadastroScreen.classList.add('hidden-right');

    loginScreen.classList.remove('hidden-left');

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
    documentoScreen.classList.remove('hidden-right');

});

btnVoltarDocumento.addEventListener('click', () => {

    documentoScreen.classList.add('hidden-right');
    emailScreen.classList.remove('hidden-left');

});

btnFecharDocumento.addEventListener('click', () => {

    documentoScreen.classList.add('hidden-right');

    emailScreen.classList.remove('hidden-left');
    emailScreen.classList.add('hidden-right');

    contatoScreen.classList.remove('hidden-left');
    contatoScreen.classList.add('hidden-right');

    dadosScreen.classList.remove('hidden-left');
    dadosScreen.classList.add('hidden-right');

    cadastroScreen.classList.remove('hidden-left');
    cadastroScreen.classList.add('hidden-right');

    loginScreen.classList.remove('hidden-left');

});