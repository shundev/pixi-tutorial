import * as PIXI from "pixi.js"
import "./index.styl"

import cat_asset from "./images/cat.png"
import tileset_asset from "./images/tileset.png"

const width = 512;
const height = 512;

const options = {
    antialias: true,
    backgroundColor: 0xFFFFFF,
    width: width,
    height: height
}

// ステージを作る
const app = new PIXI.Application(options)

app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoResize = true;
app.renderer.resize(window.innerWidth, window.innerHeight);

// レンダラーのviewをDOMに追加する
document.body.appendChild(app.view);

PIXI.loader.add([cat_asset, tileset_asset, "./images/treasureHunter.json"]).load(setup)

let cat
let rocket
let textobj
let dungeon
let explorer
let treasure
let door

function setup() {
    cat = new PIXI.Sprite(
        PIXI.loader.resources[cat_asset].texture
    )
    cat.position.x = width / 4
    cat.position.y = height / 2
    cat.anchor.x = 0.5
    cat.anchor.y = 0.5
    app.stage.addChild(cat)

    const texture = PIXI.utils.TextureCache[tileset_asset]
    const rectangle = new PIXI.Rectangle(192, 128, 64, 64)
    texture.frame = rectangle
    rocket = new PIXI.Sprite(texture)
    rocket.x = 32
    rocket.y = 32
    rocket.anchor.x = 0.5
    rocket.anchor.y = 0.5
    app.stage.addChild(rocket)

    // テキストオブジェクトを作る
    var word = "Hello World!"
    var style = { fontFamily: "Arial", fontSize: 60, fontWeight:'bold', fill: 0x000000 }
    textobj = new PIXI.Text(word, style)
    textobj.position.x = width / 2
    textobj.position.y = height / 2
    textobj.anchor.x = 0.5
    textobj.anchor.y = 0.5

    // テキストオブジェクトをステージに乗せる
    app.stage.addChild(textobj);

    let dungeonTex = PIXI.utils.TextureCache["dungeon.png"]
    dungeon = new PIXI.Sprite(dungeonTex)
    app.stage.addChild(dungeon)

    explorer = new PIXI.Sprite(PIXI.utils.TextureCache["explorer.png"])
    explorer.x = 68
    explorer.y = app.stage.height / 2 - explorer.height / 2
    app.stage.addChild(explorer)

    treasure = new PIXI.Sprite(PIXI.utils.TextureCache["treasure.png"])
    treasure.x = app.stage.width - 68
    treasure.y = app.stage.height / 2 - treasure.height / 2
    app.stage.addChild(treasure)

    door = new PIXI.Sprite(PIXI.utils.TextureCache["door.png"])
    door.position.set(32, 0)
    app.stage.addChild(door)

    let numberOfBlobs = 6, spacing = 48, xOffset =  150
    for (let i = 0; i < numberOfBlobs; i++) {
        let blob = new PIXI.Sprite(PIXI.utils.TextureCache["blob.png"])
        let x = spacing * i + xOffset
        let y = randomInt(0, app.stage.height - blob.height)
        blob.x = x
        blob.y = y
        app.stage.addChild(blob)
    }

    // 次のアニメーションフレームでanimate()を呼び出してもらう
    requestAnimationFrame(animate)
}

// アニメーション関数を定義する
function animate () {
    requestAnimationFrame(animate) // 次の描画タイミングでanimateを呼び出す
    textobj.rotation += 0.01 // テキストを回転する
    cat.rotation += 0.01
    rocket.rotation += 0.01
    app.render()   // 描画する
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
