class Bullet {
    constructor(game) {
        this.game = game;
        this.position = {
            x: this.game.player.position.x + 7.5,
            y: this.game.player.position.y - 5,
        }
        this.vy = -5;
        this.IMG_URL = './assets/images/laser-bolts.png',          
        this.img = new Image(),
        this.img.src = this.IMG_URL;
        this.radius = 10;
    }

    drawBullet() { 
        const size = 16; 
        this.game.context.drawImage(
        this.img,
        0,
        size,
        size,
        size,
        this.position.x,
        this.position.y,
        size,
        size
        );
    }
        
    collisionDetection(bullet, object) {
        if (bullet) {
            let distanceFrom = Math.sqrt((bullet.position.x - object.position.x) ** 2 + (bullet.position.y - object.position.y) ** 2);
            return bullet.radius + object.radius > distanceFrom;
        };
      }

    update() {        
        this.position.y += this.vy;         
    }
}; //end