// Theodore Sawyer, FEND - Project 03: 'Classic Arcade Game Clone' / app.js / 07.28.18

// 07.29.18 - Disabled ESLint Indent
/* eslint-disable indent */

// Enemies our player must avoid

// 07.29.18 - Updated 'Enemy' Contructor to accept additional parameters
const Enemy = function(x, y, movement) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

    // 07.29.18 - Added initial 'Enemy' starting properties
    this.x = x;
    this.y = y + 60;

    // 07.29.18 - Added 'Enemy' movement speed property
    this.movement = movement;

    this.sprite = 'images/enemy-bug.png';

    // 07.29.18 Added enemy_boundary properties
    this.move_x = 101;
    this.enemy_boundary = this.move_x * 5;

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // 07.29.18 - Added enemy_boundary conditional logic + continous iteration
    if (this.x < this.enemy_boundary) {
        this.x += this.movement * dt;
    } else {
        this.x = -100;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// 07.28.18 - Initial 'PlayerClass' class definition
class PlayerClass {
    constructor() {

        // 07.31.18 - Adjusted initial values
        this.x = 200;
        this.y = 392;

        this.sprite = 'images/char-boy.png';

        // 07.29.18 - Added 'move_x' + 'move_y' properties
        this.move_x = 101;
        this.move_y = 83;

        // 08.01.18 - Added 'gameOver' property
        this.gameOver = false;
    }

    // 07.31.18 - Implemented 'update()' method
    update() {
        for (let enemy of allEnemies) {
            if (this.y === enemy.y && (enemy.x + enemy.move_x / 2 > this.x && enemy.x < this.x + this.move_x / 2)) {
                this.reInit();
            }
        }

        // 08.01.18 - Conditional check for 'gameOver' condition
        if (this.y === 60) {
            this.gameOver = true;
        }
    }

    // Draw hero sprite on current x and y coord position
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    // 07.29.18 - Implemented missing 'handleInput()' method
    handleInput(input) {
        switch (input) {

            case 'move_left':
                if (this.x > 0) {
                    this.x -= this.move_x;
                }
                break;

            case 'move_up':
                if (this.y > this.move_y) {
                    this.y -= this.move_y;
                }
                break;

            case 'move_right':
                if (this.x < this.move_x * 3) {
                    this.x += this.move_x;
                }
                break;

            case 'move_down':
                if (this.y < this.move_y * 4) {
                    this.y += this.move_y;
                }
                break;
        }
    }

    // 08.01.18 - Reinitializes 'player' position
    reInit() {
        this.x = 200;
        this.y = 392;
    }
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// 07.28.18 - Instantiate new 'player' Object
const player = new PlayerClass();

// 07.29.18 - Instantiate new 'enemy' Objects
const enemy_01 = new Enemy(-100, 0, 225);
const enemy_02 = new Enemy(-100, 83, 175);
const enemy_03 = new Enemy(-100, 166, 250);

//07.29.18 - Instantiate 'allEnemies' Array to hold enemy Objects
const allEnemies = [];
allEnemies.push(enemy_01, enemy_02, enemy_03);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'move_left',
        38: 'move_up',
        39: 'move_right',
        40: 'move_down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});