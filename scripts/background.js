class Background {
    constructor(game) {
        this.game = game;
        this.$canvas_WIDTH = this.game.$canvas.width;
        this.$canvas_HEIGHT = this.game.$canvas.height;
        this.y = 0;
        this.vy = 1;
        this.img = new Image();
        this.img.src = './assets/images/pixel_space.png';
    }

    draw() {
        this.game.context.drawImage(this.img, 0, this.y, this.$canvas_WIDTH, this.$canvas_HEIGHT);
        this.game.context.drawImage(this.img, 0, this.y - this.$canvas_HEIGHT, this.$canvas_WIDTH, this.$canvas_HEIGHT);
    }

    update(){
        this.y += this.vy;
        if(this.y > this.$canvas_HEIGHT) {
            this.y -= this.$canvas_HEIGHT;
        }
    }
} //end