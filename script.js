window.addEventListener('pagesLoaded', initializeApp);

let fluxoAtual = null;
let saldoAtual = 2560.32;
let saldoVisivel = true;

function showPage(name, direction = 'forward') {

  const currentPage = document.querySelector(
    '.app-page:not(.hidden-right):not(.hidden-left)'
  );

  const nextPage = document.getElementById(`${name}-screen`);

  console.log('Tela atual:', currentPage);
  console.log('Próxima tela:', nextPage);

  if (!nextPage) {
    console.error('Tela não encontrada:', name);
    return;
  }

  // se não tiver tela atual
  if (!currentPage) {
    nextPage.classList.remove('hidden-right');
    nextPage.classList.remove('hidden-left');
    return;
  }

  // evita repetir mesma tela
  if (currentPage === nextPage) return;

  if (direction === 'forward') {

    currentPage.classList.add('hidden-left');
    currentPage.classList.remove('hidden-right');

    nextPage.classList.remove('hidden-right');
    nextPage.classList.remove('hidden-left');
  }

  if (direction === 'back') {

    currentPage.classList.add('hidden-right');
    currentPage.classList.remove('hidden-left');

    nextPage.classList.remove('hidden-left');
    nextPage.classList.remove('hidden-right');
  }
}

function initializeApp() {

  const btnCriarConta = document.getElementById('btn-criar-conta');
  const btnEntrarConta = document.getElementById('btn-entrar-conta');

  if (btnCriarConta) {
    btnCriarConta.addEventListener('click', () => {
      fluxoAtual = 'cadastro';
      showPage('cadastro', 'forward');
    });
  }

  if (btnEntrarConta) {
    btnEntrarConta.addEventListener('click', () => {
      fluxoAtual = 'login';
      showPage('login', 'forward');
    });
  }

  const btnVoltarCadastro = document.getElementById('btn-voltar');
  const btnContinuarCpf = document.querySelector('.btn-continuar');

  const btnVoltarCpf = document.getElementById('btn-voltar-cpf');

  const btnFecharEmail = document.getElementById('btn-fechar-email');

  const btnVoltarDocumento = document.getElementById('btn-voltar-documento');
  const btnTirarFoto = document.getElementById('btn-tirar-foto');


  if (btnVoltarDocumento) {
    btnVoltarDocumento.addEventListener('click', () => {
      showPage('email', 'back');
    });
  }

  let documentoPronto = false;

  if (btnTirarFoto) {

    btnTirarFoto.addEventListener('click', () => {

      // PRIMEIRO CLIQUE
      if (!documentoPronto) {

        documentoPronto = true;

        btnTirarFoto.textContent = 'Enviar documento';

        // muda ícone/opcional
        document.querySelector('.upload-icon').textContent = '✅';

        return;
      }

      // SEGUNDO CLIQUE
      showPage('loading');

      setTimeout(() => {
        showPage('finalizacao');
      }, 6000);

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
      showPage('inicio', 'back');
    });
  }

  if (btnVoltarCpf) {
    btnVoltarCpf.addEventListener('click', () => {
      showPage('cadastro', 'back');
    });
  }

  const cpfCnpjInput = document.getElementById('cpf-cnpj');

  cpfCnpjInput.addEventListener('input', (e) => {
    let valor = e.target.value.replace(/\D/g, '');

    if (valor.length <= 11) {
      valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
      valor = valor.replace(/(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
      valor = valor.replace(/(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4');
    } else {
      valor = valor.replace(/^(\d{2})(\d)/, '$1.$2');
      valor = valor.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
      valor = valor.replace(/\.(\d{3})(\d)/, '.$1/$2');
      valor = valor.replace(/(\d{4})(\d)/, '$1-$2');
    }

    e.target.value = valor;
  });

  if (btnVoltarCadastro) {
    btnVoltarCadastro.addEventListener('click', () => {
      showPage('inicio', 'back');
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

  const btnContinuarDados = document.getElementById('btn-continuar-dados');

  const btnFecharDados = document.getElementById('btn-fechar-dados');

  if (btnFecharDados) {
    btnFecharDados.addEventListener('click', () => {
      showPage('inicio', 'back');
    });
  }

  if (btnContinuarDados) {
    btnContinuarDados.addEventListener('click', () => {
      showPage('contato');
    });
  }

  const btnContinuarContato = document.getElementById('btn-continuar-contato');

  if (btnContinuarContato) {
    btnContinuarContato.addEventListener('click', () => {
      showPage('email');
    });
  }

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

  const btnVoltarEmail = document.getElementById('btn-voltar-email');

  if (btnVoltarEmail) {
    btnVoltarEmail.addEventListener('click', () => {
      if (fluxoAtual === 'login') {
        showPage('login', 'back');
      } else {
        showPage('contato', 'back');
      }
    });
  }

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
      showPage('dados', 'back');
    });
  }

  const btnFecharContato = document.getElementById('btn-fechar-contato');

  if (btnFecharContato) {
    btnFecharContato.addEventListener('click', () => {
      fluxoAtual = null;
      showPage('inicio', 'back');
    });
  }
  const saldoDashboard = document.getElementById('saldo-dashboard');

  const btnOlho = document.getElementById('btn-olho');
  const imgOlho = document.getElementById('img-olho');
  const faturaCartao = document.getElementById('fatura-cartao');
  const limiteCartao = document.getElementById('limite-cartao');



  if (btnOlho) {

    btnOlho.addEventListener('click', () => {

      saldoVisivel = !saldoVisivel;

      atualizarVisibilidadeSaldo();

    });

  }

  const dashboardPixButtons = document.querySelectorAll('.dash-action');

  if (dashboardPixButtons.length > 0) {
    dashboardPixButtons[0].addEventListener('click', () => {
      showPage('pix');
    });
  }

  const saldoCard = document.querySelector('.saldo-card');

  if (saldoCard) {
    saldoCard.addEventListener('click', () => {
      showPage('extrato');
    });
  }

  const btnVoltarExtrato = document.getElementById('btn-voltar-extrato');

  if (btnVoltarExtrato) {
    btnVoltarExtrato.addEventListener('click', () => {
      showPage('dashboard');
    });
  }

  const btnOlhoExtrato = document.getElementById('btn-olho-extrato');
  let imgOlhoExtrato = document.getElementById('img-olho-extrato');
  const saldoValor = document.getElementById('saldo-valor');

  function atualizarVisibilidadeSaldo() {

    imgOlhoExtrato = document.getElementById('img-olho-extrato');

    const saldoFormatado =
      'R$ ' + saldoAtual.toFixed(2).replace('.', ',');

    // DASHBOARD
    if (saldoDashboard) {

      saldoDashboard.textContent =
        saldoVisivel ? saldoFormatado : '••••••';

      faturaCartao.textContent =
        saldoVisivel ? saldoFormatado : '••••••';

      limiteCartao.textContent =
        saldoVisivel
          ? 'Limite disponível: R$ 206,23'
          : 'Limite disponível: ••••••';

      imgOlho.src =
        saldoVisivel
          ? './fotos/olho.png'
          : './fotos/olcorte.png';
    }

    // EXTRATO
    if (saldoValor) {

      saldoValor.textContent =
        saldoVisivel ? saldoFormatado : '••••••';

      imgOlhoExtrato.src =
        saldoVisivel
          ? './fotos/olho.png'
          : './fotos/olcorte.png';
    }
  }

  atualizarVisibilidadeSaldo();


  if (btnOlhoExtrato) {

    btnOlhoExtrato.addEventListener('click', () => {

      saldoVisivel = !saldoVisivel;

      atualizarVisibilidadeSaldo();

    });

  }

  const btnVoltarPix = document.getElementById('btn-voltar-pix');

  if (btnVoltarPix) {
    btnVoltarPix.addEventListener('click', () => {
      showPage('dashboard');
    });
  }

  const minhasChavesBtns = document.querySelectorAll('.pix-action-card');

  if (minhasChavesBtns.length > 2) {
    minhasChavesBtns[2].addEventListener('click', () => {
      showPage('cadastro-pix');
    });
  }

  const suasChavesItems = document.querySelectorAll('.pix-key-item');

  suasChavesItems.forEach(item => {
    item.addEventListener('click', () => {
      showPage('cadastro-pix');
    });
  });

  const btnVoltarCadastroPix = document.getElementById('btn-voltar-cadastro-pix');

  if (btnVoltarCadastroPix) {
    btnVoltarCadastroPix.addEventListener('click', () => {
      showPage('pix');
    });
  }

  const btnConfirmarPix = document.getElementById('btn-confirmar-pix');
  const modalConfirmarPix = document.getElementById('modal-confirmar-pix');

  if (btnConfirmarPix) {
    btnConfirmarPix.addEventListener('click', () => {
      modalConfirmarPix.classList.remove('hidden');
    });
  }

  const btnConfirmarModal = document.getElementById('btn-confirmar-modal');

  if (btnConfirmarModal) {
    btnConfirmarModal.addEventListener('click', () => {
      modalConfirmarPix.classList.add('hidden');
      showPage('pix');
    });
  }

  const pixActionCards = document.querySelectorAll('.pix-action-card');

  if (pixActionCards.length > 0) {
    pixActionCards[0].addEventListener('click', () => {
      resetTransferenciaForm();
      showPage('transferencia-pix');
    });
  }

  function resetTransferenciaForm() {
    document.getElementById('input-chave-pix').value = '';
    document.getElementById('input-valor-transf').value = '';

    const steps = document.querySelectorAll('.transf-step');
    steps.forEach(step => step.classList.remove('transf-step-active'));
    steps[0].classList.add('transf-step-active');

    localStorage.removeItem('transfChavePix');
    localStorage.removeItem('transfValor');
  }

  function goToTransfStep(stepNumber) {
    const steps = document.querySelectorAll('.transf-step');

    steps.forEach(step => step.classList.remove('transf-step-active'));

    if (steps[stepNumber - 1]) {
      steps[stepNumber - 1].classList.add('transf-step-active');
    } else {
      console.error('Step inválido:', stepNumber);
    }

    const erroSaldo = document.getElementById('erro-saldo');
    if (erroSaldo) erroSaldo.textContent = '';
  }

  const btnVoltarTransf = document.getElementById('btn-voltar-transf');

  if (btnVoltarTransf) {
    btnVoltarTransf.addEventListener('click', () => {
      showPage('pix');
    });
  }

  const inputChavePix = document.getElementById('input-chave-pix');
  const btnContinuarChave = document.getElementById('btn-continuar-chave');

  if (btnContinuarChave) {
    btnContinuarChave.addEventListener('click', () => {
      const chave = inputChavePix.value.trim();

      if (!chave) {
        alert('Digite uma chave Pix válida');
        return;
      }

      localStorage.setItem('transfChavePix', chave);

      document.getElementById('recipient-name').textContent = 'Carlos Silva';
      document.getElementById('recipient-chave').textContent = chave;
      document.getElementById('resumo-destinatario').textContent = 'Carlos Silva';
      document.getElementById('resumo-chave').textContent = chave;
      document.getElementById('comp-destinatario').textContent = 'Carlos Silva';
      document.getElementById('comp-chave').textContent = chave;

      goToTransfStep(2);
    });
  }

  if (inputChavePix) {
    inputChavePix.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        btnContinuarChave.click();
      }
    });
  }

  const btnVoltarDestinatario = document.getElementById('btn-voltar-destinatario');

  if (btnVoltarDestinatario) {
    btnVoltarDestinatario.addEventListener('click', () => {
      goToTransfStep(1);
    });
  }

  const btnConfirmarDestinatario = document.getElementById('btn-confirmar-destinatario');

  if (btnConfirmarDestinatario) {
    btnConfirmarDestinatario.addEventListener('click', () => {
      goToTransfStep(3);
    });
  }

  const btnVoltarValor = document.getElementById('btn-voltar-valor');

  if (btnVoltarValor) {
    btnVoltarValor.addEventListener('click', () => {
      goToTransfStep(2);
    });
  }

  const inputValorTransf = document.getElementById('input-valor-transf');

  if (inputValorTransf) {

    inputValorTransf.addEventListener('input', (e) => {

      inputValorTransf.addEventListener('input', (e) => {
        erroSaldo.textContent = ''; // 👈 limpa erro sempre que digita

        let valor = e.target.value;

        valor = valor.replace(/\D/g, '');

        if (valor.length === 0) {
          e.target.value = '';
          return;
        }

        valor = (Number(valor) / 100).toFixed(2);
        valor = valor.replace('.', ',');
        valor = valor.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

        e.target.value = valor;
      });

      let valor = e.target.value;

      // remove tudo que não for número
      valor = valor.replace(/\D/g, '');

      // evita vazio
      if (valor.length === 0) {
        e.target.value = '';
        return;
      }

      // transforma em centavos
      valor = (Number(valor) / 100).toFixed(2);

      // troca ponto por vírgula
      valor = valor.replace('.', ',');

      // adiciona separador de milhar
      valor = valor.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

      e.target.value = valor;

    });

    atualizarVisibilidadeSaldo();

  }

  const btnVoltarInicio = document.getElementById('btn-voltar-inicio');

  if (btnVoltarInicio) {

    btnVoltarInicio.addEventListener('click', () => {

      fluxoAtual = null;

      // esconde todas as telas
      document.querySelectorAll('.app-page').forEach(page => {

        page.classList.add('hidden-right');
        page.classList.remove('hidden-left');

      });

      // mostra início
      document
        .getElementById('inicio-screen')
        ?.classList.remove('hidden-right');

    });

  }

  const btnContinuarValor = document.getElementById('btn-continuar-valor');

  const erroSaldo = document.getElementById('erro-saldo');

  if (btnContinuarValor) {
    btnContinuarValor.addEventListener('click', () => {

      const valorTexto = inputValorTransf.value
        .replace(/\./g, '')
        .replace(',', '.');

      const valor = parseFloat(valorTexto);

      if (!valor || valor <= 0) {
        alert('Digite um valor válido');
        return;
      }

      // 🔴 VALIDAÇÃO ANTES DE AVANÇAR
      if (valor > saldoAtual) {
        erroSaldo.textContent = 'Saldo insuficiente';
        return; // ❌ NÃO AVANÇA
      }

      // limpa erro se estiver ok
      erroSaldo.textContent = '';

      localStorage.setItem('transfValor', valor.toFixed(2));

      const valorFormatado =
        'R$ ' + valor.toFixed(2).replace('.', ',');

      document.getElementById('resumo-valor').textContent = valorFormatado;
      document.getElementById('comp-valor').textContent = valorFormatado;

      goToTransfStep(4);
    });
  }

  if (inputValorTransf) {
    inputValorTransf.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        btnContinuarValor.click();
      }
    });
  }

  const btnVoltarConfirmacao = document.getElementById('btn-voltar-confirmacao');

  if (btnVoltarConfirmacao) {
    btnVoltarConfirmacao.addEventListener('click', () => {
      goToTransfStep(3);
    });
  }

  const btnConfirmarTransf = document.getElementById('btn-confirmar-transf');

  if (btnConfirmarTransf) {
    btnConfirmarTransf.addEventListener('click', () => {

      // pega valor digitado
      const valorTransferencia = parseFloat(
        inputValorTransf.value
          .replace(/\./g, '')
          .replace(',', '.')
      );

      // valida saldo
      const erroSaldo = document.getElementById('erro-saldo');

      if (valorTransferencia > saldoAtual) {
        erroSaldo.textContent = 'Saldo insuficiente';
        return;
      } else {
        erroSaldo.textContent = '';
      }

      // diminui saldo
      saldoAtual -= valorTransferencia;

      atualizarVisibilidadeSaldo();

      // atualiza saldo disponível da transferência
      const saldoInfo = document.querySelector('.transf-saldo-info strong');

      if (saldoInfo) {
        saldoInfo.textContent =
          'R$ ' + saldoAtual.toFixed(2).replace('.', ',');
      }

      // gera id da transação
      const idTransacao =
        'E' + Math.random().toString(36).substr(2, 9).toUpperCase();

      document.getElementById('comp-id').textContent = idTransacao;

      // gera data/hora
      const agora = new Date();

      const dataHora =
        agora.toLocaleDateString('pt-BR') +
        ' ' +
        agora.toLocaleTimeString('pt-BR');

      document.getElementById('comp-data').textContent = dataHora;

      // vai para comprovante
      goToTransfStep(5);

    });
  }

  const btnVoltarPixFinal = document.getElementById('btn-voltar-pix-final');

  if (btnVoltarPixFinal) {
    btnVoltarPixFinal.addEventListener('click', () => {
      showPage('dashboard');
    });
  }

}
