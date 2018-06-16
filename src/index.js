import * as PIXI from "pixi.js"

var width = 600;
var height = 400;

// ステージを作る
const app = new PIXI.Application({ backgroundColor: 0xFFFFFF })

// レンダラーのviewをDOMに追加する
document.getElementById("pixiview").appendChild(app.view);

// テキストオブジェクトを作る
var word = "Hello World!"
var style = { fontFamily: "Arial", fontSize: 60, fontWeight:'bold', fill: 0x000000 }
var textobj = new PIXI.Text(word, style)
textobj.position.x = width / 2
textobj.position.y = height / 2

// テキストオブジェクトをステージに乗せる
app.stage.addChild(textobj);

// アニメーション関数を定義する
function animate(){
    requestAnimationFrame(animate); // 次の描画タイミングでanimateを呼び出す
    textobj.rotation += 0.01; // テキストを回転する
    app.render();   // 描画する
}

// 次のアニメーションフレームでanimate()を呼び出してもらう
requestAnimationFrame(animate);
