var selectedCards = [];
var Versuche = 0;

function Game() {
  const spielbereich = document.querySelector('#spielbereich');

  if (spielbereich.hasChildNodes()) {
    return;
  }
  //dom wird erstellt
  createGame(spielbereich);

  //karten werden gemischt
  mischeKarten(spielbereich);

  //karten werden umgedreht nach 3 sekunden
  dreheAlleKarten();

  //zähler wird gestartet
  zaehleAuf();


  //beim Klick wird die Karte umgedreht für 1 Sekunde
  document.querySelectorAll('.memory-card').forEach(card => {
    if (parseInt(card.dataset.framework) == 0) {
      return;
    }
    card.addEventListener('click', addeEventListener(card));

  });

}


function dreheAlleKarten() {
  setTimeout(function () {
    document.querySelectorAll('.memory-card').forEach(card => card.style.transform = 'rotateY(180deg)');
  }, 3000);
}

function createGame(spielbereich) {
  for (let i = 1; i <= 16; i++) {
    const front = document.createElement('img');
    front.src = `pics/card${i}.png`;
    front.classList.add('front-face');


    const back = document.createElement('img');
    back.src = 'pics/memoryBg.png';
    back.classList.add('back-face');

    const card = document.createElement('div');
    card.classList.add('memory-card');

    card.dataset.framework = i;

    card.appendChild(front);
    card.appendChild(back);
    spielbereich.appendChild(card);
  }
}

function mischeKarten(spielbereich) {
  for (let i = spielbereich.children.length; i >= 0; i--) {
    spielbereich.appendChild(spielbereich.children[Math.random() * i | 0]);
  }
}

function zaehleAuf() {
  let counter = 0;
  setInterval(function () { counter++; document.getElementById('Zeit').textContent = counter; }, 1000);
}

function pruefeKarten() {
  const firstCard = selectedCards[0];
  const secondCard = selectedCards[1];

  if (parseInt(firstCard.dataset.framework) + parseInt(secondCard.dataset.framework) == 17) {
    firstCard.style.rotateY = '0deg';
    firstCard.style.opacity = '0.2';
    firstCard.style.pointerEvents = 'none';
    secondCard.style.rotateY = '0deg';
    secondCard.style.opacity = '0.2';
    secondCard.style.pointerEvents = 'none';
    firstCard.dataset.framework = 0;
    secondCard.dataset.framework = 0;
    firstCard.removeEventListener('click', addeEventListener);
    secondCard.removeEventListener('click', addeEventListener);
  } else {
    firstCard.style.transform = 'rotateY(180deg)';
    secondCard.style.transform = 'rotateY(180deg)';
  }
  selectedCards.pop();
  selectedCards.pop();

  checkWin();
}

function checkWin() {
  let counter = 0;
  document.querySelectorAll('.memory-card').forEach(card => {
    if (parseInt(card.dataset.framework) == 0) {
      counter++;
    }
  });
  if (counter == 16) {
    alert('Du hast Gewonnen'+ ' | ' + 'Versuche: ' + Versuche + ' | ' + 'Zeit: ' + document.getElementById('Zeit').textContent + ' Sekunden');
    clearInterval();
    Versuche = 0;
    document.getElementById('Versuche').textContent = Versuche;
    while(document.querySelector('#spielbereich').firstChild){
      document.querySelector('#spielbereich').removeChild(document.querySelector('#spielbereich').firstChild);
    }
  }
}

function zaehleVersuche() {
  Versuche++;
  document.getElementById('Versuche').textContent = Versuche;
}

function addeEventListener(card) {
  return function () {
    if (card.style.transform === 'rotateY(0deg)') {
      return;
    }

    // Wenn 2 Karten umgedreht sind, darf keine 3 umgedreht werden
    if (selectedCards.length > 1) {
      return;
    }
    card.style.transform = 'rotateY(0deg)';
    selectedCards.push(card);

    if (selectedCards.length == 2) {
      zaehleVersuche();
      setTimeout(function () {
        pruefeKarten();
      }, 1000);

    }
  };
}