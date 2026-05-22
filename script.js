const ALUNOS = {
  'angel': {
    senha: '1234',
    nome: 'Angel Luiz',
    ra: '2024001',
    matricula: '202400001',
    curso: 'Sistemas de Informação',
    turma: 'SI-2024/1'
  },
  'admin': {
    senha: 'carreata123',
    nome: 'Administrador',
    ra: '0000000',
    matricula: '000000000',
    curso: 'Administração',
    turma: 'ADM-2024/1'
  },
  'piloto': {
    senha: '1234',
    nome: 'Piloto Teste',
    ra: '2024002',
    matricula: '202400002',
    curso: 'Engenharia Civil',
    turma: 'EC-2024/1'
  },
  'org': {
    senha: 'fasipe2025',
    nome: 'Organização FASIPE',
    ra: '2024003',
    matricula: '202400003',
    curso: 'Direito',
    turma: 'DIR-2024/1'
  }
};

function fazerLogin() {
  const usuario = document.getElementById('usuario').value.trim();
  const senha   = document.getElementById('senha').value;
  const erro    = document.getElementById('error-msg');
  const aluno   = ALUNOS[usuario];

  if (aluno && aluno.senha === senha) {
    erro.classList.remove('show');

    document.getElementById('info-nome').textContent      = aluno.nome;
    document.getElementById('info-ra').textContent        = aluno.ra;
    document.getElementById('info-matricula').textContent = aluno.matricula;
    document.getElementById('info-curso').textContent     = aluno.curso;
    document.getElementById('info-turma').textContent     = aluno.turma;

    document.getElementById('nome-usuario2').textContent  = aluno.nome.split(' ')[0];
    document.getElementById('avatar-letter2').textContent = aluno.nome[0].toUpperCase();

    document.getElementById('login-screen').classList.remove('active');
    document.getElementById('aluno-screen').classList.add('active');
  } else {
    erro.classList.add('show');
    document.getElementById('senha').value = '';
  }
}

function iniciarGPS2() {
  const btn       = document.getElementById('btn-gps2');
  const eventCard = document.getElementById('event-card-aluno');
  const alunoCard = document.querySelector('#aluno-screen .event-info:first-of-type');

  // Mostra o card do evento
  eventCard.style.display = 'block';
  eventCard.style.animation = 'fadeUp 0.5s ease both';

  // Esconde o card do aluno suavemente
  if (alunoCard) alunoCard.style.display = 'none';

  // Atualiza o botão
  btn.textContent = 'ROTA INICIADA';
  btn.style.background = 'linear-gradient(135deg, #00C853, #009624)';
  btn.onclick = null;

  // Scroll suave para o topo do conteúdo
  document.getElementById('aluno-screen').scrollTo({ top: 0, behavior: 'smooth' });
}

function sair() {
  document.getElementById('aluno-screen').classList.remove('active');
  document.getElementById('login-screen').classList.add('active');
  document.getElementById('usuario').value = '';
  document.getElementById('senha').value   = '';

  // Reset tela do aluno
  const btn = document.getElementById('btn-gps2');
  btn.textContent = 'INICIAR ROTA';
  btn.style.background = '';
  btn.onclick = iniciarGPS2;

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
