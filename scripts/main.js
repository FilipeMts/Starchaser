const $canvas = document.querySelector('canvas');
const game = new Game($canvas);
const start = document.querySelector('.start');
const howText = document.querySelector('.how');
const back = document.querySelector('.back-to-menu');
const play = document.querySelector('.play-game');

start.addEventListener('click', () => {
  document.querySelector('#start-menu').style.display = 'none';
    document.querySelector('#title').style.visibility = 'hidden';
    $canvas.style.display = 'block';
    game.startGame();
});

howText.addEventListener('click', () => {
  document.querySelector('#start-menu').style.visibility = "hidden";
  document.querySelector('#how-to').style.display = 'flex';
});

back.addEventListener('click', () => {
  document.querySelector('#start-menu').style.display = 'flex';
  document.querySelector('#how-to').style.display = 'none';
});

play.addEventListener('click', () => {
  document.querySelector('#start-menu').style.display = 'none';
  document.querySelector('#title').style.visibility = "hidden";
  document.querySelector('#how-to').style.display = 'none';
  $canvas.style.display = 'block';
  game.startGame();
});