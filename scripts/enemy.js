const randomR = (min, max) => Math.floor(Math.random() * (max - min) + min);

class Enemy {
  constructor(game) {
    this.game = game;
    this.position = {
      x: -70,
      y: randomR(60, 460)
    };
    this.vx = 4;
    this.img = new Image();
    this.img.src ='./assets/images/enemy-medium.png';
    this.width = this.img.width;
    this.height = this.img.height;
    this.radius = 22;
    this.shootingTime = 10;
  }

  draw() {
    const size = 32;
    this.game.context.drawImage(
      this.img,
      0,
      0,
      size,
      size,
      this.position.x,
      this.position.y,
      size * 2,
      size * 2
    );
  }

  collisionDetection(player, enemy) {
    let distanceFrom = Math.sqrt(
      (enemy.position.x - player.position.x) ** 2 +
        (enemy.position.y - player.position.y) ** 2
    );
    return player.radius + enemy.radius > distanceFrom;
  }

  update() {
    this.position.x += this.vx;
  }
}// end