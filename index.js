import Display from "./Display.js";
import World from "./World.js";
import Direction from "./Direction.js";

let world = new World(30, 30, false);
let display = new Display(30, 30);
display.play(world);

document.addEventListener("keydown", (evt) => {
    switch (evt.key) {
        case "ArrowLeft": //LEFT
            world.snakeDirection(Direction.LEFT);
            break;
        case "ArrowUp": //UP
            world.snakeDirection(Direction.UP);
            break;
        case "ArrowRight": //RIGHT
            world.snakeDirection(Direction.RIGHT);
            break;
        case "ArrowDown": //DOWN
            world.snakeDirection(Direction.DOWN);
            break;
    }
});