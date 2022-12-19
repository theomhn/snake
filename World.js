import Apple from "./Apple.js";
import Snake from "./Snake.js";

export default class World {
    #apple;
    #snake;
    #height;
    #width;
    #score;
    #buffer;
    #hasBorder;
    constructor(width, height, hasBorder = true) {
        this.#height = height;
        this.#width = width;
        this.#score = 0;
        this.#buffer = [];
        this.#hasBorder = hasBorder;
        this.#snake = new Snake(Math.floor(width / 2), Math.floor(height / 2));
        this.moveApple();

    }
    moveApple() {
        let posX = Math.floor(Math.random() * this.#width);
        let posY = Math.floor(Math.random() * this.#height);

        while (this.#snake.touch(posX, posY)) {
            posX = Math.floor(Math.random() * this.#width);
            posY = Math.floor(Math.random() * this.#height);
        }
        this.#apple = new Apple(posX, posY);
    }
    getHeight() {
        return this.#height;
    }
    getWidth() {
        return this.#width;
    }
    step() {

        if (this.#buffer.length > 0) {
            this.#snake.setDirection(this.#buffer.shift());
        }
        let xA = this.#apple.getX();
        let yA = this.#apple.getY();

        let xH = this.#snake.getHead().getX();
        let yH = this.#snake.getHead().getY();
        let eat = xA === xH && yA === yH;
        this.#snake.move(eat, this.#width, this.#width);
        if (eat) {
            this.#score++;
            this.moveApple();
        }
    }
    play(display) {
        this.step();
        display.score = this.#score;
        display.drawCircle(this.#apple.getX(), this.#apple.getY(), "green");

        let snakeParts = this.#snake.getParts();
        for (let index = 0; index < snakeParts.length; index++) {
            display.drawRectangle(snakeParts[index].getX(), snakeParts[index].getY(), "red");
        }
        display.drawRectangle(this.#snake.getHead().getX(), this.#snake.getHead().getY(), "orange");
        return this.hasLost() || this.hasWin();

    }
    snakeDirection(direction) {
        this.#buffer.push(direction);
    }
    touchBorder() {
        if (this.#snake.getHead().getX() < 0 || this.#snake.getHead().getX() >= this.getWidth() || this.#snake.getHead().getY() < 0 || this.#snake.getHead().getY() >= this.getHeight()) {
            return true;
        }
    }
    hasLost() {
        let lost = this.#snake.overlap() || this.touchBorder();

        if (lost) {
            alert("game over");
        }
        return lost;
    }
    hasWin() {
        if (this.#snake.getParts().length >= (this.#height * this.#width)) {
            alert("game win");
            return true;
        }
        return false;
    }
}