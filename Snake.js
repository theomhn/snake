import Direction from "./Direction.js";
import SnakePart from "./SnakePart.js";

export default class Snake {
    #parts = [];
    #direction;
    constructor(x, y) {
        this.#direction = Direction.RIGHT;
        this.#parts.push(new SnakePart(x, y));
        this.move(true);

    }
    getHead() {
        return this.#parts[this.#parts.length - 1];
    }
    #pushHead(limitX, limitY) {
        let x = this.getHead().getX() + ((this.#direction === Direction.RIGHT) - (this.#direction === Direction.LEFT));
        let y = this.getHead().getY() + ((this.#direction === Direction.DOWN) - (this.#direction === Direction.UP));

        if (x >= limitX) {
            x = 0;
        } else if (x < 0) {
            x = limitX - 1;
        } else if (y >= limitY) {
            y = 0;
        } else if (y < 0) {
            y = limitY - 1;
        }

        this.#parts.push(new SnakePart(x, y));
    }
    #dropTail() {
        this.#parts.shift();
    }
    move(apple, limitX, limitY) {
        this.#pushHead(limitX, limitY);
        if (!apple) {
            this.#dropTail();
        }
    }
    setDirection(newDirection) {
        if (Direction.includes(newDirection) && this.#direction % 2 != (newDirection % 2)) {
            this.#direction = newDirection;
        }
    }
    touch(x, y, includesHead = true) {
        let nbPart = this.#parts.length;
        if (!includesHead) {
            nbPart = nbPart - 1;
        }
        for (let index = 0; index < nbPart; index++) {
            if ((x == this.#parts[index].getX()) && (y == this.#parts[index].getY())) {
                return true;
            }
        }
        return false;
    }
    overlap() {
        let x = this.getHead().getX();
        let y = this.getHead().getY();
        return this.touch(x, y, false);
    }
    getParts() {
        return this.#parts;
    }
}