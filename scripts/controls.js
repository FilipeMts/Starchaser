let playerShoots = new Audio();
playerShoots.src = './assets/audio/player_shoots.wav';

class Controls {
    constructor(game) {
      this.game = game;
      this.playerShoots = new Audio();
    }

    setControls() {
        window.addEventListener('keydown', (e) => {  
            switch (e.keyCode) { 
                case 87: {
                    e.preventDefault();
                    this.game.up = true;
                    break;
                }              
                case 83:  {                 
                    e.preventDefault();  
                    this.game.down = true;     
                    break; 
                }  
                case 65: {
                    e.preventDefault(); 
                    this.game.left = true;
                    break; 
                }   
                case 68:  {                 
                    e.preventDefault();
                    this.game.right = true
                    break; 
                } 

                case 32 : {
                    if (this.game.gameEnds === true) {
                        this.game.resetGame();
                    }
                }
            } 
        });

        window.addEventListener('keyup', (e) => {
            switch (e.keyCode) {
                case 87: {
                    e.preventDefault(); 
                    this.game.up = false;
                }
                case 83: {
                    e.preventDefault(); 
                    this.game.down = false;
                }
                case 65: {
                    e.preventDefault(); 
                    this.game.left = false;
                }
                case 68: {
                    e.preventDefault(); 
                    this.game.right = false;
                }
            }
        })

        window.addEventListener('mousedown', (e) => {        
            if (e.which === 1) {
                this.game.bulletShoot = true; 
                this.game.bullets.push(new Bullet(this.game));                 
                playerShoots.currentTime = 0;
                playerShoots.play();         
            }    
        }) 
    }
}; // end 