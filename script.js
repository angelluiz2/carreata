// ===== MÁSCARAS =====
function formatarCPF(input) {
  let v = input.value.replace(/\D/g, '');
  v = v.replace(/(\d{3})(\d)/, '$1.$2');
  v = v.replace(/(\d{3})(\d)/, '$1.$2');
  v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  input.value = v;
}

function formatarTelefone(input) {
  let v = input.value.replace(/\D/g, '');
  if (v.length <= 10) {
    v = v.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
  } else {
    v = v.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
  }
  input.value = v;
}

document.addEventListener('DOMContentLoaded', function() {
  const cpfInput = document.getElementById('ci-cpf');
  const telInput = document.getElementById('ci-telefone');
  if (cpfInput) cpfInput.addEventListener('input', function() { formatarCPF(this); });
  if (telInput) telInput.addEventListener('input', function() { formatarTelefone(this); });
});

// ===== CRONÔMETRO =====
let timerInterval = null;
let segundosRestantes = 2 * 60 * 60; // 2 horas

function iniciarCronometro() {
  const timerBox     = document.getElementById('timer-box');
  const timerDisplay = document.getElementById('timer-display');
  const conclusaoBox = document.getElementById('conclusao-box');

  timerBox.style.display = 'block';
  segundosRestantes = 2 * 60 * 60;

  timerInterval = setInterval(function() {
    segundosRestantes--;

    const h = Math.floor(segundosRestantes / 3600);
    const m = Math.floor((segundosRestantes % 3600) / 60);
    const s = segundosRestantes % 60;

    timerDisplay.textContent =
      String(h).padStart(2, '0') + ':' +
      String(m).padStart(2, '0') + ':' +
      String(s).padStart(2, '0');

    // Muda cor quando falta menos de 10 min
    if (segundosRestantes <= 600) {
      timerDisplay.style.color = '#FF6B00';
    }

    // Tempo esgotado
    if (segundosRestantes <= 0) {
      clearInterval(timerInterval);
      timerBox.style.display     = 'none';
      conclusaoBox.style.display = 'block';
      conclusaoBox.scrollIntoView({ behavior: 'smooth' });
    }
  }, 1000);
}

// ===== CHECK-IN =====
function fazerLogin() {
  const nome     = document.getElementById('ci-nome').value.trim();
  const telefone = document.getElementById('ci-telefone').value.trim();
  const ra       = document.getElementById('ci-ra').value.trim();
  const cpf      = document.getElementById('ci-cpf').value.trim();
  const curso    = document.getElementById('ci-curso').value;
  const erro     = document.getElementById('error-msg');

  if (!nome || !telefone || !ra || !cpf || !curso) {
    erro.textContent = 'Preencha todos os campos!';
    erro.classList.add('show');
    return;
  }

  erro.classList.remove('show');

  document.getElementById('info-nome').textContent      = nome;
  document.getElementById('info-ra').textContent        = ra;
  document.getElementById('info-matricula').textContent = cpf;
  document.getElementById('info-curso').textContent     = curso;
  document.getElementById('info-turma').textContent     = telefone;

  const labels = document.querySelectorAll('#aluno-screen .info-label');
  if (labels.length >= 5) {
    labels[0].textContent = 'Nome Completo';
    labels[1].textContent = 'RA';
    labels[2].textContent = 'CPF';
    labels[3].textContent = 'Curso';
    labels[4].textContent = 'Telefone';
  }

  document.getElementById('nome-usuario2').textContent  = nome.split(' ')[0];
  document.getElementById('avatar-letter2').textContent = nome[0].toUpperCase();

  document.getElementById('login-screen').classList.remove('active');
  document.getElementById('aluno-screen').classList.add('active');
}

// ===== INICIAR ROTA + GPS =====
function iniciarGPS2() {
  const btn = document.getElementById('btn-gps2');

  if (navigator.geolocation) {
    btn.textContent   = 'Aguardando permissao...';
    btn.style.opacity = '0.7';

    navigator.geolocation.getCurrentPosition(
      function(position) {
        const eventCard = document.getElementById('event-card-aluno');
        const alunoCard = document.querySelector('#aluno-screen .event-info:first-of-type');

        eventCard.style.display   = 'block';
        eventCard.style.animation = 'fadeUp 0.5s ease both';
        if (alunoCard) alunoCard.style.display = 'none';

        btn.textContent      = 'ROTA INICIADA';
        btn.style.background = 'linear-gradient(135deg, #00C853, #009624)';
        btn.style.opacity    = '1';
        btn.onclick          = null;

        // Inicia o cronômetro
        iniciarCronometro();

        document.getElementById('aluno-screen').scrollTo({ top: 0, behavior: 'smooth' });
      },
      function(error) {
        btn.textContent   = 'INICIAR ROTA';
        btn.style.opacity = '1';
        alert('Acesso ao GPS negado.\nPor favor, permita o acesso a localizacao para iniciar a rota.');
      },
      { enableHighAccuracy: true }
    );
  } else {
    alert('Seu navegador nao suporta GPS.\nTente em outro dispositivo.');
  }
}

// ===== SAIR =====
function sair() {
  // Para o cronômetro
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
  segundosRestantes = 2 * 60 * 60;

  document.getElementById('aluno-screen').classList.remove('active');
  document.getElementById('login-screen').classList.add('active');

  // Limpa formulário
  document.getElementById('ci-nome').value     = '';
  document.getElementById('ci-telefone').value = '';
  document.getElementById('ci-ra').value       = '';
  document.getElementById('ci-cpf').value      = '';
  document.getElementById('ci-curso').value    = '';

  // Reset botão GPS
  const btn = document.getElementById('btn-gps2');
  btn.textContent      = 'INICIAR ROTA';
  btn.style.background = '';
  btn.style.opacity    = '1';
  btn.onclick          = iniciarGPS2;

  // Reset timer e conclusão
  document.getElementById('timer-box').style.display       = 'none';
  document.getElementById('conclusao-box').style.display   = 'none';
  document.getElementById('timer-display').textContent     = '02:00:00';
  document.getElementById('timer-display').style.color     = 'var(--verde-claro)';

  // Reset cards
  const eventCard = document.getElementById('event-card-aluno');
  eventCard.style.display = 'none';
  const alunoCard = document.querySelector('#aluno-screen .event-info:first-of-type');
  if (alunoCard) alunoCard.style.display = 'block';
}

document.addEventListener('keydown', e => {
  if (e.key === 'Enter' && document.getElementById('login-screen').classList.contains('active')) {
    fazerLogin();
  }
});
