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
let errors = 0;

function startGame() {
  errors = 0;
  currentItemIndex = 0;
  document.getElementById('message').style.display = 'none';
  document.querySelector('.container').innerHTML = `
    <div class="bin bin-reciclavel" data-type="reciclavel">Reciclável</div>
    <div class="bin bin-organico" data-type="organico">Orgânico</div>
    <div class="bin bin-plastico" data-type="plastico">Plástico</div>
    <div class="bin bin-vidro" data-type="vidro">Vidro</div>
    <div class="bin bin-metal" data-type="metal">Metal</div>
  `;
  setInterval(dropItem, 2000);
}

function createItem() {
  const item = document.createElement('div');
  item.className = 'item';
  item.innerText = items[currentItemIndex].name;
  item.setAttribute('data-type', items[currentItemIndex].type);
  currentItemIndex = (currentItemIndex + 1) % items.length;
  return item;
}

function dropItem() {
  const item = createItem();
  const container = document.querySelector('.container');
  const randomPosition = Math.floor(Math.random() * (container.offsetWidth - 50));
  item.style.left = `${randomPosition}px`;
  container.appendChild(item);
  animateItem(item, container.offsetHeight - 100);
}

function animateItem(item, targetTop) {
  let currentTop = 0;
  const animation = setInterval(() => {
    currentTop += 5;
    item.style.top = `${currentTop}px`;
    if (currentTop >= targetTop) {
      clearInterval(animation);
      checkBin(item);
      item.remove();
    }
  }, 20);
}

function checkBin(item) {
  const itemType = item.getAttribute('data-type');
  const bin = document.querySelector(`.bin[data-type="${itemType}"]`);
  const binRect = bin.getBoundingClientRect();
  const itemRect = item.getBoundingClientRect();
  if (
    itemRect.left + itemRect.width / 2 >= binRect.left &&
    itemRect.left + itemRect.width / 2 <= binRect.left + binRect.width &&
    itemRect.top + itemRect.height >= binRect.top
  ) {
    console.log(`O item '${item.innerText}' foi descartado corretamente na lixeira ${bin.innerText}`);
  } else {
    console.log(`O item '${item.innerText}' foi descartado incorretamente`);
    errors++;
    if (errors >= 15) {
      showMessage('Oops! Você perdeu :(', false);
    }
  }
}

function showMessage(text, success) {
  document.getElementById('message-text').textContent = text;
  document.getElementById('message').style.display = 'block';
}

window.onload = startGame;
