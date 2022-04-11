import * as PIXI from 'pixi.js'
import {Ball} from "./component/ball";
import {Bar} from "./component/bar";

function main(){
    if (import.meta.env.DEV) {
        // @ts-ignore
        window.__PIXI_INSPECTOR_GLOBAL_HOOK__ && window.__PIXI_INSPECTOR_GLOBAL_HOOK__.register({ PIXI: PIXI });
    }

    const root = document.querySelector('#app')
    if (!root) return

    const pixiApp = new PIXI.Application({ width: 640, height: 360 })

    root.innerHTML = `<h1>Hello Vite x Pixi.js!</h1>`
    root.appendChild(pixiApp.view)

    const pixiGreetingText = new PIXI.Text("Hello, I'm Pixi.js", {
        fill: "#4DB6AC"
    })

    pixiApp.stage.addChild(pixiGreetingText)

    const ball = new Ball();
    const bar = new Bar();

    pixiApp.stage.addChild(ball.instance)
    pixiApp.stage.addChild(bar.instance)
}

main()