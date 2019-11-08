//audio
const meteorExplodes = new Audio();
meteorExplodes.src = './assets/audio/meteor_explodes.wav';

const pinkEnemyExplodes = new Audio();
pinkEnemyExplodes.src = './assets/audio/pink_enemy_explodes.wav';

const playerHit = new Audio();
playerHit.src = './assets/audio/playerHit.wav';

const soundtrack = new Audio();
soundtrack.src = './assets/audio/Kaosu.mp3';
soundtrack.volume = 0.75;

const gameOverST = new Audio();
gameOverST.src = './assets/audio/Game_Over.mp3';

class Game {
    constructor($canvas) {
        this.$canvas = $canvas;
        this.context = this.$canvas.getContext('2d');
        this.hub = new Hub(this);
        this.background = new Background(this);
        this.player = new Player(this);
        this.controls = new Controls(this);  

        this.meteor = new Meteor(this);  
        this.meteors = [];
        this.meteorsTimer = 0;
        this.meteorSpeed = 3000;

        this.bullet = new Bullet(this);        
        this.bullets = [];
        this.bulletShoot = false;

        this.enemy = new Enemy(this);
        this.enemies = [];        
        this.enemiesTimer = 0;
        this.enemiesSpeed = 5000;
        this.enemiesKilled = 0;        

        this.up = false;
        this.down = false;
        this.left = false;
        this.right = false;

        this.explosion = new Explosion(this);
        this.explosions = [];
 
        this.gameEnds = true;
        this.gameOverScreen = new GameOver(this);
    }

    startGame() {
        this.gameEnds = false;              
        this.animation(); 
        this.controls.setControls(); 
    }

    drawGame() {
        this.clearGame();   
        this.background.draw(); 
        this.player.draw(); 

        //bullets
        for (let i = 0; i < this.bullets.length; i++) {                            
            this.bullets[i].drawBullet(); 
        }

        //enemies
        for (let i = 0; i < this.meteors.length; i++) {            
            this.meteors[i].draw();
        }  

        //explosions         
        for (let i = 0; i < this.explosions.length; i++) {
            this.explosions[i].update(); 
            this.explosions[i].draw();             
        }    
              
        this.hub.drawHub();  
    }   

    animation(timestamp) {
        soundtrack.play();
        let anima;

        this.drawGame();
        this.updateGame(timestamp);    
        anima = window.requestAnimationFrame((timestamp) => this.animation(timestamp));
  
        if (this.gameEnds === true) {
            window.cancelAnimationFrame(anima);   
        }
    }

    updateGame(timestamp) { 
        this.background.update();        

        //meteors        
        if (this.meteorsTimer < timestamp - this.meteorSpeed) {
            this.meteors.push(new Meteor(this));
            this.meteorsTimer = timestamp;
        }

        for (let i = 0; i < this.meteors.length; i++) { 
            if (this.meteors[i].position.y > 500) {
                this.meteors.shift();
            }
        }          
        
        for (let i = 0; i < this.meteors.length; i++) {
          this.meteors[i].update();          
        } 

        //enemies        
        if (this.enemiesTimer < timestamp - this.enemiesSpeed) {
            this.enemies.push(new Enemy(this));
            this.enemiesTimer = timestamp;
        }

        for (let i = 0; i < this.enemies.length; i++) {
            this.enemies[i].draw();            
            if (this.enemies[i].position.x > 660) {
                this.enemies.shift();           
            }
        }

        for (let i = 0; i < this.enemies.length; i++) {            
            this.enemies[i].update();   
        }   
    
       // bullets        
        if (this.bulletShoot === true && this.player.shootingTime === 0) {            
            this.bullets.push(new Bullet(this));
            this.player.shootingTime = 10;                  
        }

        for (let i = 0; i < this.bullets.length; i++) { 
            this.bullets[i].update(); 
            if (this.bullets[i].position.y < 0) {                
                this.bullets.shift();
            }
        }

        //collision bullets vs meteors
        for (let i = 0; i < this.bullets.length; i++) {
            for (let j = 0; j < this.meteors.length; j++) {
                if ( this.bullet.collisionDetection(this.bullets[i], this.meteors[j])) {
                    this.explosions.push(new Explosion(this, this.meteors[j].position.x, this.meteors[j].position.y));                    
                    this.meteors.splice(j, 1);
                    this.hub.score += 100;                
                    meteorExplodes.play(); 
                    this.bullets.splice(i, 1);  
                    for (let i = 0; i < this.explosions.length; i++) {                         
                        this.explosions[i].update(); 
                        this.explosions[i].draw(); 
                    }
                }
            }
        }

        //collision bullets vs enemy        
        for (let i = 0; i < this.bullets.length; i++) {
            for (let j = 0; j < this.enemies.length; j++) {
                if (this.bullet.collisionDetection(this.bullets[i], this.enemies[j])) {
                    this.explosions.push(new Explosion(this, this.enemies[j].position.x, this.enemies[j].position.y));
                    this.enemies.splice(j, 1);
                    this.hub.score += 200;
                    this.enemiesKilled += 1;
                    pinkEnemyExplodes.play();
                    this.bullets.splice(i, 1);                                      
                    for (let i = 0; i < this.explosions.length; i++) {                         
                        this.explosions[i].update(); 
                        this.explosions[i].draw(); 
                    }                    
                }
            }
        }
       
        //collision player vs meteors
        for (let i = 0; i < this.meteors.length; i++) {
            if (this.meteor.collisionDetection(this.player, this.meteors[i])) {
                this.explosions.push(new Explosion(this, this.meteors[i].position.x, this.meteors[i].position.y));
                this.meteors.splice(i, 1);
                this.hub.lives -= 1;
                playerHit.play();
                for (let i = 0; i < this.explosions.length; i++) {                         
                this.explosions[i].update(); 
                this.explosions[i].draw(); 
                }
            }
        }

        //collision player vs enemies
        for (let i = 0; i < this.enemies.length; i++) {
            if (this.enemy.collisionDetection(this.player, this.enemies[i])) {
                this.explosions.push(new Explosion(this, this.enemies[i].position.x, this.enemies[i].position.y));
                this.enemies.splice(i, 1);
                this.hub.lives -= 1;
                playerHit.play();
                for (let i = 0; i < this.explosions.length; i++) {                         
                this.explosions[i].update(); 
                this.explosions[i].draw(); 
                }
            }
        }

        this.movePlayer();
        this.achievements();
        this.gameOver();
    }

    achievements() {
        const ctx = this.context;

        const bronzeMedal = new Image();
        bronzeMedal.src = './assets/images/star_bronze.png';

        const silverMedal = new Image();
        silverMedal.src = './assets/images/star_silver.png';
        
        const goldMedal = new Image();
        goldMedal.src = './assets/images/star_gold.png';

        if (this.enemiesKilled >= 10) {
            ctx.drawImage(bronzeMedal, 250, 15);
            this.hub.medals = 1;
        }

        if (this.enemiesKilled >= 25) {
            ctx.drawImage(silverMedal, 300, 15);
            this.hub.medals = 2;
 
        }
        if (this.enemiesKilled >= 50) {
            ctx.drawImage(goldMedal, 350, 15);
            this.hub.medals = 3; 
        }

        if (this.hub.score >= 1000) {
            this.hub.stage = 2;
            this.meteorSpeed = 1000;
            this.enemiesSpeed = 1500;
            this.meteor.vy = 4;
            this.background.vy = 2;

        }
        if (this.hub.score >= 2000) {
            this.hub.stage = 3;
            this.meteorSpeed = 700;
            this.enemiesSpeed = 1000;
            this.meteor.vy = 6;
            this.background.vy = 4;
        }

        if (this.hub.score >= 3000) {
            this.hub.stage = 4;
            this.meteorSpeed = 600;
            this.enemiesSpeed = 750;
            this.meteor.vy = 7;
            this.background.vy = 5;
        }

        if (this.hub.score >= 4000) {
            this.hub.stage = 5;
            this.meteorSpeed = 250;
            this.enemiesSpeed = 500;
            this.meteor.vy = 10;
            this.background.vy = 7;
            this.enemy.vx = 8;
        }

        if (this.hub.score >= 5000) {
            this.hub.stage = 6;
            this.meteorSpeed = 200;
            this.enemiesSpeed = 400;
            this.meteor.vy = 12;
            this.background.vy = 8;
            this.enemy.vx = 10;
        }

        if (this.hub.score >= 6000) {
            this.hub.stage = 7;
            this.meteorSpeed = 100;
            this.enemiesSpeed = 300;
            this.meteor.vy = 14;
            this.background.vy = 10;
            this.enemy.vx = 12;
        }

        if (this.hub.score >= 8000) {
            this.hub.stage = 8;
            this.meteorSpeed = 10;
            this.enemiesSpeed = 20;
            this.meteor.vy = 15;
            this.background.vy = 12;
            this.enemy.vx = 13;
        }
    }

    gameOver() {
        if (this.hub.lives === 0) {
            soundtrack.pause();
            gameOverST.play();
            this.gameEnds = true;     
            this.gameOverScreen.draw();
        }  

        if (this.player.position.y > 470) {
            soundtrack.pause();
            gameOverST.play();
            this.hub.coward = true;
            this.gameEnds = true;     
            this.gameOverScreen.draw();
        }      
    }

    resetGame() {  
        this.hub.lives = 3;
        this.gameEnds = false;
        this.clearGame();
        gameOverST.pause();
        this.hub = new Hub(this);
        this.background = new Background(this);
        this.player = new Player(this);
        this.controls = new Controls(this); 
        this.meteor = new Meteor(this);  
        this.bullet = new Bullet(this); 
        this.enemy = new Enemy(this);

        this.meteors = [];
        this.meteorsTimer = 0;
        this.meteorSpeed = 3000;
        this.enemiesTimer = 0;
        this.enemiesSpeed = 5000;
        this.enemiesKilled = 0;
        this.background.vy = 1;
        this.meteor.vy = 3;
        this.enemy.vx = 4;

        this.bullets = [];
        this.enemies = [];
        this.hub.score = 0;
        this.hub.stage = 1;
        let init = (this.animation());        
    }

    movePlayer() { 
        if (this.up === true) {
            this.player.moveUp();
        }
        if (this.down === true) {
            this.player.moveDown();
        }
        if (this.left === true) {
            this.player.moveLeft();
        }
        if (this.right === true) {
            this.player.moveRight();
        }
    }

    clearGame() {
        this.context.clearRect(0, 0, this.$canvas.width, this.$canvas.height)
    }

}; // end