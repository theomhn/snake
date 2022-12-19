export default class Display {
    #ctx
    #scale
    speed
    score = 0

    constructor(width, height, scale = 10, speed = 100) {
        this.#scale = scale
        this.speed = speed
        const canvas = document.createElement('canvas')
        canvas.width = width * this.#scale
        canvas.height = height * this.#scale
        this.#ctx = canvas.getContext('2d')
        document.getElementById("display").appendChild(canvas)
    }

    drawRectangle(x, y, color) {
        this.#ctx.beginPath()
        this.#ctx.fillStyle = color
        this.#ctx.fillRect(x * this.#scale, y * this.#scale, this.#scale, this.#scale)
    }

    drawCircle(x, y, color) {
        this.#ctx.beginPath()
        this.#ctx.fillStyle = color
        this.#ctx.arc(x * this.#scale + this.#scale / 2, y * this.#scale + this.#scale / 2, this.#scale / 2, 0, 2 * Math.PI)
        this.#ctx.fill()
    }

    refreshScore() {
        score.innerHTML = score;
    }

    play(game) {
        let lastChrono
        let done = false

        let loop = (chrono) => {
            if (!lastChrono)
                lastChrono = chrono
            const delta = chrono - lastChrono

            if (delta >= this.speed) {
                this.#ctx.clearRect(0, 0, this.#ctx.canvas.width, this.#ctx.canvas.height)
                done = game.play(this)
                score.innerHTML = this.score
                lastChrono = chrono
            }

            if (!done)
                requestAnimationFrame(loop)
        }

        requestAnimationFrame(loop)
    }
}