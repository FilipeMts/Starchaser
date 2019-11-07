class GameOver {
    constructor(game) {
        this.game = game;
    }

    draw() {
        const ctx = this.game.context;
        this.game.clearGame();
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, 640, 480)
        ctx.font = 'bold 75px VT323';
        ctx.fillStyle = 'red';
        ctx.fillText(`Game Over`, 185, 180);        
        
        ctx.font = '35px VT323';
        ctx.fillStyle = 'white';  

        if (this.game.hub.coward === true ) {
            ctx.fillText(`You left the battlefield!`, 160, 300);
        }        

        else if (this.game.hub.coward === false && this.game.hub.medals === 0) {
            ctx.fillText(`You reached level ${this.game.hub.stage}`, 190, 300);
            ctx.fillText(`and got no stars`, 210, 350); 
        }
        else if (this.game.hub.coward === false && this.game.hub.medals === 1) {
            ctx.fillText(`You reached level ${this.game.hub.stage}`, 190, 300);
            ctx.fillText(`and got the bronze star`, 160, 350); 
        }
        else if (this.game.hub.coward === false && this.game.hub.medals === 2) {
            ctx.fillText(`You reached level ${this.game.hub.stage}`, 190, 300);
            ctx.fillText(`and got the bronze and silver stars`, 80, 350); 
        }   
        else {
            ctx.fillText(`You reached level ${this.game.hub.stage}`, 190, 300);
            ctx.fillText(`and got all stars!`, 200, 350); 
        }

        ctx.font = 'bold 30px VT323';
        ctx.fillStyle = 'skyblue';        
        ctx.fillText(`Press space bar to play again`, 150, 450);     
    }
}