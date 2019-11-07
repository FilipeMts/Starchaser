class Player {
    constructor(game) {
        this.game = game;
        this.$canvas_WIDTH = this.game.$canvas.width;
        this.$canvas_HEIGHT = this.game.$canvas.height;
        this.IMG_URL = './assets/images/ship.png';         
        this.img = new Image();
        this.img.src = this.IMG_URL;
        this.position = {
            x: (this.game.$canvas.width / 2) - 16,
            y: this.game.$canvas.height - 50
        };
        this.velocity = {
            x: 4,
            y: 6
        };
        this.shootingTime = 10;
        this.radius = 18;
    }

    draw() {  
        const size = 16; 
        this.game.context.drawImage(
        this.img,
        size * 2,
        0,
        size,
        size,
        this.position.x,
        this.position.y,
        size * 2,
        size * 2
        );   
    }

    moveLeft() {
        this.position.x > 0 ? this.position.x -= this.velocity.x : this.position;
    }
    
    moveUp() {
        this.position.y > 60 ? this.position.y -= this.velocity.y : this.position.y;
    }
    
    moveRight() {  
        this.position.x < this.$canvas_WIDTH - 34 ? this.position.x += this.velocity.x : this.position;  
    }

    moveDown() {
        //this.position.y < this.$canvas_HEIGHT - 50 ? this.position.y += this.velocity.y : this.position.y;
        this.position.y += this.velocity.y

    }

}; // end