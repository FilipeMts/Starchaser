const randomRange = (min, max) => Math.floor(Math.random() * (max - min) + min);

class Meteor {
  constructor(game) {
    this.game = game;
    this.position = {
      x: randomRange(20, 620),
      y: 60
    };
    this.vy = 3;
    this.img = new Image();
    this.src = [
      './assets/images/meteorBrown_med1.png',
      /*'./assets/images/meteorRed_med1.png',
      './assets/images/meteorGrey_med2.png'*/
    ];
    this.randomSrc = Math.floor(Math.random() * this.src.length);
    this.img.src = this.src[this.randomSrc];
    this.width = this.img.width;
    this.height = this.img.height;
    this.radius = 22;
  }

  draw() {
    this.game.context.drawImage(
      this.img,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );

  }

  collisionDetection(player, meteor) {
    let distanceFrom = Math.sqrt(
      (meteor.position.x - player.position.x) ** 2 +
        (meteor.position.y - player.position.y) ** 2
    );
    return player.radius + meteor.radius > distanceFrom;
  }

  update() {
    this.position.y += this.vy;
  }
} // end
