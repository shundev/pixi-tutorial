import * as PIXI from "pixi.js"
import "./index.styl"

const width = 600;
const height = 600;

const options = {
    antialias: true,
    backgroundColor: 0xDDDDDD
}

// ステージを作る
const app = new PIXI.Application(width, height, options)
const graphics = new PIXI.Graphics()
app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoResize = true;
app.renderer.resize(window.innerWidth, window.innerHeight);

// レンダラーのviewをDOMに追加する
document.body.appendChild(app.view);

const lineParam = {
    tan: 0.1
}

const origin = {
    x: 300, y: 300
}

function f(x) {
    return 0.1 * (x - 100)**2 - 100
}

function c(p) {
    return {
        x: p.x + origin.x,
        y: height - p.y - origin.y
    }
}

function setup() {
    drawGraph()
    app.stage.addChild(graphics)
    app.ticker.add(delta => gameLoop(delta))
}

let x = 100, step = 0, flag = true

// アニメーション関数を定義する
function gameLoop (delta) {
    step++
    if (step%2===0) {
        if (flag) {
            x++
        } else {
            x--
        }

        let y = f(x)
        if (y >= 0) {
            flag = !flag
            return
        }

        let p = c({x:x, y:y})


        graphics.clear()
        drawGraph()
        graphics.beginFill(0x000000, 0.9)
        graphics.drawCircle(p.x, p.y, 3)
        graphics.endFill()
    }
}

function drawGraph() {
    graphics.beginFill(0x222222)
    graphics.lineStyle(1, 0x222222)
    graphics.moveTo(0, origin.y)
    graphics.lineTo(width, origin.y)
    graphics.moveTo(origin.x, 0)
    graphics.lineTo(origin.x, height)
    graphics.endFill()

    graphics.beginFill(0x000000)
    graphics.lineStyle(2, 0x000000)
    for (let x=-300; x<300; x++) {
        let p1 = c({x: x-1, y: f(x-1)})
        let p2 = c({x: x, y: f(x)})
        graphics.moveTo(p1.x, p1.y)
        graphics.lineTo(p2.x, p2.y)
    }
    graphics.endFill()
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

setup()
