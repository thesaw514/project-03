// Theodore Sawyer, FEND - Project 03: 'Classic Arcade Game Clone' / app.js / 07.28.18

// 07.29.18 - Disabled ESLint Indent
/* eslint-disable indent */

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// 07.28.18 - Initial 'PlayerClass' Class Definition
class PlayerClass {
    constructor() {
        this.x = 200;
        this.y = 400;

        this.sprite = 'images/char-boy.png';

        // 07.29.18 - Added 'move_x' + 'move_y' Properties
        this.move_x = 101;
        this.move_y = 83;
    }

    // Draw hero sprite on current x and y coord position
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    // 07.29.18 - Implemented Missing 'handleInput()' Method
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
    }

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// 07.28.18 - Instantiate New 'player' Object
const player = new PlayerClass();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'move_left',
        38: 'move_up',
        39: 'move_right',
        40: 'move_down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});