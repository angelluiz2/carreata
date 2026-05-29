// Banco de alunos — será integrado com o banco de dados depois
const ALUNOS = {
  '2024001': {
    nome: 'Angel Luiz',
    ra: '2024001',
    matricula: '202400001',
    curso: 'Sistemas de Informação',
    turma: 'SI-2024/1'
  },
  '2024002': {
    nome: 'Piloto Teste',
    ra: '2024002',
    matricula: '202400002',
    curso: 'Engenharia Civil',
    turma: 'EC-2024/1'
  },
  '2024003': {
    nome: 'Organização FASIPE',
    ra: '2024003',
    matricula: '202400003',
    curso: 'Direito',
    turma: 'DIR-2024/1'
  },
  '0000000': {
    nome: 'Administrador',
    ra: '0000000',
    matricula: '000000000',
    curso: 'Administração',
    turma: 'ADM-2024/1'
  }
};

function fazerLogin() {
  const ra   = document.getElementById('ra-input').value.trim();
  const erro = document.getElementById('error-msg');
  const aluno = ALUNOS[ra];

  if (aluno) {
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
    document.getElementById('ra-input').value = '';
  }
}

function iniciarGPS2() {
  const btn = document.getElementById('btn-gps2');

  // Pede autorização para acessar o GPS
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function(position) {
        // Permissão concedida
        const eventCard = document.getElementById('event-card-aluno');
        const alunoCard = document.querySelector('#aluno-screen .event-info:first-of-type');

        eventCard.style.display   = 'block';
        eventCard.style.animation = 'fadeUp 0.5s ease both';
        if (alunoCard) alunoCard.style.display = 'none';

        btn.textContent     = 'ROTA INICIADA';
        btn.style.background = 'linear-gradient(135deg, #00C853, #009624)';
        btn.onclick = null;

        document.getElementById('aluno-screen').scrollTo({ top: 0, behavior: 'smooth' });
      },
      function(error) {
        // Permissão negada ou erro
        alert('Acesso ao GPS negado.\nPor favor, permita o acesso à localização para iniciar a rota.');
      },
      { enableHighAccuracy: true }
    );
  } else {
    alert('Seu navegador não suporta GPS.\nTente em outro dispositivo.');
  }
}

function sair() {
  document.getElementById('aluno-screen').classList.remove('active');
  document.getElementById('login-screen').classList.add('active');
  document.getElementById('ra-input').value = '';

  const btn = document.getElementById('btn-gps2');
  btn.textContent      = 'INICIAR ROTA';
  btn.style.background = '';
  btn.onclick          = iniciarGPS2;

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
