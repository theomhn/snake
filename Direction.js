export default {
    UP: 0,
    LEFT: 1,
    DOWN: 2,
    RIGHT: 3,
    includes(val) {
        return (val === this.UP || val === this.LEFT || val === this.DOWN || val === this.RIGHT);
    }
}