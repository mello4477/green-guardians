const bins = document.querySelectorAll('.bin');
const items = [
  { name: "Garrafa de plástico", type: "plastico" },
  { name: "Papelão", type: "reciclavel" },
  { name: "Restos de comida", type: "organico" },
  { name: "Garrafa de vidro", type: "vidro" },
  { name: "Lata de alumínio", type: "metal" },
  // Adicione mais itens conforme necessário
];

let currentItemIndex = 0;
let score = 0;
let errors = 0;
const maxErrors = 15;

function startGame() {
  score = 0;
  errors = 0;
  currentItemIndex = 0;
  document.getElementById('score').textContent = `Pontuação: ${score}`;
  document.getElementById('message').style.display = 'none';
  document.querySelector('.container').innerHTML = `
    <div class="bin bin-reciclavel" data-type="reciclavel">Reciclável</div>
    <div class="bin bin-organico" data-type="organico">Orgânico</div>
    <div class="bin bin-plastico" data-type="plastico">Plástico</div>
    <div class="bin bin-vidro" data-type="vidro">Vidro</div>
    <div class="bin bin-metal" data-type="metal">Metal</div>
  `;
  generateItems();
}

function generateItems() {
  for (let i = 0; i < 10; i++) {
    const item = createItem();
    const container = document.querySelector('.container');
    const randomPosition = Math.floor(Math.random() * (container.offsetWidth - 50));
    item.style.left = `${randomPosition}px`;
    container.appendChild(item);
  }
}

function createItem() {
  const item = document.createElement('div');
  item.className = 'item';
  item.innerText = items[currentItemIndex].name;
  item.setAttribute('data-type', items[currentItemIndex].type);
  item.draggable = true;
  item.addEventListener('dragstart', dragStart);
  item.addEventListener('dragend', dragEnd);
  currentItemIndex = (currentItemIndex + 1) % items.length;
  return item;
}

function dragStart(event) {
  event.dataTransfer.setData('text/plain', event.target.getAttribute('data-type'));
  event.target.style.opacity = '0.5';
}

function dragEnd(event) {
  event.target.style.opacity = '1';
}

bins.forEach(bin => {
  bin.addEventListener('dragover', dragOver);
  bin.addEventListener('drop', dropItem);
});

function dragOver(event) {
  event.preventDefault();
}

function dropItem(event) {
  event.preventDefault();
  const itemType = event.dataTransfer.getData('text/plain');
  const binType = event.target.getAttribute('data-type');
  if (itemType === binType) {
    score++;
    document.getElementById('score').textContent = `Pontuação: ${score}`;
    const item = document.querySelector(`.item[data-type="${itemType}"]`);
    if (item) item.remove();
  } else {
    score--;
    errors++;
    document.getElementById('score').textContent = `Pontuação: ${score}`;
    if (errors >= maxErrors) {
      showMessage('Oops! Você perdeu :(', false);
    }
  }
}

function showMessage(text, success) {
  document.getElementById('message-text').textContent = text;
  document.getElementById('message').style.display = 'block';
}

window.onload = startGame;

