class Explosion {
  constructor(game, x, y) {
    this.game = game;
    this.count = -1;
    this.sprites = [
      [0, 0],
      [16, 0],
      [32, 0],
      [38, 0],
      [64, 0]
    ]
    this.position = {
      x: x,
      y: y
    }    
    this.img = new Image();
    this.img.src = './assets/images/explosion.png';
  }

  draw() {    
    const size = 16; 
    if (this.count < 5) {      
      this.game.context.drawImage(
      this.img,
      this.sprites[this.count][0],
      this.sprites[this.count][1],
      size,
      size,
      this.position.x,
      this.position.y,
      size * 3,
      size * 3
      )
    }
    else if (this.count >= 5) {
      this.game.explosions.shift()
    }
  }

  update() {
    this.count++;
  }
} // end