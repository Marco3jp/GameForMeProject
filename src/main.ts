import * as PIXI from 'pixi.js'
import {Ball} from "./component/ball";
import {Bar} from "./component/bar";
import {ComponentManager} from "./service/componentManager";
import {CollisionChecker} from "./service/collisionChecker";
import {GameGuardian} from "./service/GameGuardian";

function main(){
    if (import.meta.env.DEV) {
        // @ts-ignore
        window.__PIXI_INSPECTOR_GLOBAL_HOOK__ && window.__PIXI_INSPECTOR_GLOBAL_HOOK__.register({ PIXI: PIXI });
    }

    const root = document.querySelector('#app')
    if (!root) return

    const pixiApp = new PIXI.Application({ width: 640, height: 360 })
    root.appendChild(pixiApp.view)

    const pixiGreetingText = new PIXI.Text("Hello, I'm Pixi.js", {
        fill: "#4DB6AC"
    })

    pixiApp.stage.addChild(pixiGreetingText)

    const componentManager = new ComponentManager({
        stage: pixiApp.stage
    })

    const ball = new Ball();
    const bar = new Bar();

    componentManager.add(ball)
    componentManager.add(bar)

    new CollisionChecker({
        componentManager: componentManager
    })
}

function initGameGuradian() {
    const pauseButton = document.querySelector("#pause-button")
    const resumeButton = document.querySelector("#resume-button")

    if (pauseButton) {
        pauseButton.addEventListener("click", GameGuardian.pause)
    }

    if(resumeButton) {
        resumeButton.addEventListener("click", GameGuardian.resume)
    }
}

main()
initGameGuradian()