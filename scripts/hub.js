class Hub {
    constructor(game) {
        this.game = game;
        this.position = {
            x: 0,
            y: 0
        };
        this.HEIGHT = 60;
        this.score = 0;
        this.stage = 1;
        this.lives = 3;
        this.medals = 0;
        this.missiles = 0;

        this.IMG_URL = './assets/images/ship.png';         
        this.img = new Image();
        this.img.src = this.IMG_URL;

        this.coward = false;
    }

    drawHub() {
        //hub        
        const ctx = this.game.context;        
        ctx.fillStyle = 'gray';
        ctx.fillRect(this.position.x, this.position.y, 640, this.HEIGHT);

        //score
        ctx.font = 'bold 26px VT323';
        ctx.fillStyle = 'black';
        ctx.fillText(`SCORE ${this.score}`, 10, 25);
        
        //stage
        ctx.font = 'bold 26px VT323';
        ctx.fillText(`LEVEL ${this.stage}`, 10, 50);

        const size = 16; 
        this.game.context.drawImage(
        this.img,
        size * 2,
        0,
        size,
        size,
        550,
        20,
        size * 1.5,
        size * 1.5
        );  
        ctx.font = 'bold 26px VT323';
        ctx.fillStyle = 'black';        
        ctx.fillText(`x ${this.lives}`, 585, 40);
    }
}; // end
