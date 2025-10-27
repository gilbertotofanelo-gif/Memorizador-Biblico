const verses = [
  {
    reference: "Mateus 24:14",
    text: "E estas boas novas do Reino serão pregadas em toda a terra habitada, em testemunho a todas as nações; e, então, virá o fim."
  },
  {
    reference: "João 3:16",
    text: "Pois Deus amou tanto o mundo, que deu o seu Filho unigênito, para que todo aquele que nele exercer fé não seja destruído, mas tenha vida eterna."
  },
  {
    reference: "Filipenses 4:13",
    text: "Para todas as coisas tenho a força em virtude daquele que me dá poder."
  },
  {
    reference: "Salmos 23:1",
    text: "Jeová é o meu Pastor. Nada me faltará."
  },
  {
    reference: "Provérbios 3:5-6",
    text: "Confia em Jeová de todo o teu coração e não te estribes no teu próprio entendimento. Reconhece-o em todos os teus caminhos, e ele endireitará as tuas veredas."
  },
  {
    reference: "Romanos 10:17",
    text: "E, assim, a fé vem pelo ouvir, e o ouvir vem pela palavra de Cristo."
  },
  {
    reference: "Efésios 6:10",
    text: "Por fim, tornem-se fortes na união com o Senhor e na força do seu poder."
  },
  {
    reference: "1 Coríntios 16:13",
    text: "Fiquem vigilantes, mantenham-se firmes na fé, portem-se como homens, tornem-se poderosos."
  },
  {
    reference: "2 Timóteo 3:16",
    text: "Toda a Escritura é inspirada por Deus e proveitosa para ensinar, para repreender, para corrigir, para instruir em justiça."
  },
  {
    reference: "Tiago 1:5",
    text: "Se algum de vocês tiver falta de sabedoria, continue a pedi-la a Deus, pois ele dá generosamente a todos, sem censurar; e ela lhe será dada."
  }
];

let currentIndex = 0;
let intervalTime = 10000; // 10 segundos em ms
let timerInterval;
let countdownInterval;
let isPaused = false;
let countdown = 10; // Segundos para display

const referenceEl = document.getElementById('reference');
const textEl = document.getElementById('text');
const timerDisplay = document.getElementById('timer-display');
const intervalInput = document.getElementById('interval');
const applyBtn = document.getElementById('apply');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const pauseBtn = document.getElementById('pause');

// Função para mostrar o verso atual
function showVerse(index) {
  referenceEl.textContent = verses[index].reference;
  textEl.textContent = verses[index].text;
}

// Função para iniciar o ciclo
function startCycle() {
  if (isPaused) return;
  showVerse(currentIndex);
  countdown = intervalTime / 1000;
  timerDisplay.textContent = countdown;
  
  countdownInterval = setInterval(() => {
    countdown--;
    timerDisplay.textContent = countdown;
    if (countdown <= 0) {
      clearInterval(countdownInterval);
      nextVerse();
    }
  }, 1000);
  
  timerInterval = setTimeout(() => {
    nextVerse();
  }, intervalTime);
}

// Próximo verso
function nextVerse() {
  currentIndex = (currentIndex + 1) % verses.length;
  clearInterval(countdownInterval);
  clearTimeout(timerInterval);
  startCycle();
}

// Anterior verso
function prevVerse() {
  currentIndex = (currentIndex - 1 + verses.length) % verses.length;
  clearInterval(countdownInterval);
  clearTimeout(timerInterval);
  startCycle();
}

// Pausar/Reiniciar
function togglePause() {
  isPaused = !isPaused;
  pauseBtn.textContent = isPaused ? 'Retomar' : 'Pausar';
  if (isPaused) {
    clearInterval(countdownInterval);
    clearTimeout(timerInterval);
  } else {
    startCycle();
  }
}

// Aplicar novo intervalo
applyBtn.addEventListener('click', () => {
  const newTime = parseInt(intervalInput.value);
  if (newTime >= 1 && newTime <= 60) {
    intervalTime = newTime * 1000;
    clearInterval(countdownInterval);
    clearTimeout(timerInterval);
    startCycle();
  } else {
    alert('Escolha entre 1 e 60 segundos.');
  }
});

prevBtn.addEventListener('click', prevVerse);
nextBtn.addEventListener('click', nextVerse);
pauseBtn.addEventListener('click', togglePause);

// Iniciar o app
showVerse(currentIndex);
startCycle();
