window.addEventListener('pagesLoaded', initializeApp);

let fluxoAtual = null;

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

function initializeApp() {

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
        showPage('login');
      } else {
        showPage('contato');
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
  const saldoDashboard = document.getElementById('saldo-dashboard');

  const btnOlho = document.getElementById('btn-olho');
  const imgOlho = document.getElementById('img-olho');

  let olhoAberto = true;

  if (btnOlho) {
    btnOlho.addEventListener('click', () => {

      olhoAberto = !olhoAberto;

      if (olhoAberto) {
        imgOlho.src = '../fotos/olho.png';
        saldoDashboard.textContent = 'R$ 2560,32';
      } else {
        imgOlho.src = '../fotos/olcorte.png';
        saldoDashboard.textContent = '••••••';
      }

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
  const saldoValor = document.getElementById('saldo-valor');

  let saldoVisivel = true;

  if (btnOlhoExtrato) {
    btnOlhoExtrato.addEventListener('click', () => {
      saldoVisivel = !saldoVisivel;

      if (saldoVisivel) {
        saldoValor.textContent = 'R$ 2560,32';
        btnOlhoExtrato.textContent = '👁';
      } else {
        saldoValor.textContent = '••••••';
        btnOlhoExtrato.textContent = '👁‍🗨';
      }
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
    steps[stepNumber - 1].classList.add('transf-step-active');
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
  const btnContinuarValor = document.getElementById('btn-continuar-valor');

  if (btnContinuarValor) {
    btnContinuarValor.addEventListener('click', () => {
      const valor = parseFloat(inputValorTransf.value);

      if (!valor || valor <= 0) {
        alert('Digite um valor válido');
        return;
      }

      localStorage.setItem('transfValor', valor.toFixed(2));

      const valorFormatado = 'R$ ' + valor.toFixed(2).replace('.', ',');
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
      const idTransacao = 'E' + Math.random().toString(36).substr(2, 9).toUpperCase();
      document.getElementById('comp-id').textContent = idTransacao;

      const agora = new Date();
      const dataHora = agora.toLocaleDateString('pt-BR') + ' ' + agora.toLocaleTimeString('pt-BR');
      document.getElementById('comp-data').textContent = dataHora;

      goToTransfStep(5);
    });
  }

  const btnVoltarPixFinal = document.getElementById('btn-voltar-pix-final');

  if (btnVoltarPixFinal) {
    btnVoltarPixFinal.addEventListener('click', () => {
      showPage('pix');
    });
  }

}
