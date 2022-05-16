import * as PIXI from 'pixi.js'
import {Ball} from "./component/ball";
import {Bar} from "./component/bar";
import {ComponentManager} from "./service/componentManager";
import {CollisionChecker} from "./service/collisionChecker";
import {GameGuardian} from "./service/GameGuardian";
import {SimpleStage} from "./component/stage/simpleStage/simpleStage";
import {Service} from "./component/service/service";
import {Reflection} from "./service/reflection";
import {Moving} from "./service/moving";
import {INITIAL_APP} from "./service/parameter/app";
import {BarMoving} from "./service/barMoving";
import {BlockSpawn} from "./service/blockSpawn";
import {Input} from "./service/input";
import {Nudging} from "./service/nudging";

function main() {
    if (import.meta.env.DEV) {
        // @ts-ignore
        window.__PIXI_INSPECTOR_GLOBAL_HOOK__ && window.__PIXI_INSPECTOR_GLOBAL_HOOK__.register({PIXI: PIXI});
    }

    const root = document.querySelector('#app')
    if (!root) return

    const pixiApp = new PIXI.Application({
        width: INITIAL_APP.canvasWidth,
        height: INITIAL_APP.canvasHeight
    })
    root.appendChild(pixiApp.view)

    const componentManager = new ComponentManager({
        stage: pixiApp.stage
    })

    const service: Service = {
        reflection: new Reflection(),
        moving: new Moving(),
        barMoving: new BarMoving(),
        nudging: new Nudging(),
        componentManager
    }

    const ball = new Ball(service);
    const bar = new Bar(service);

    componentManager.add(ball)
    componentManager.add(bar)

    // TODO: ステージのパーツをcomponentManagerに乗せるため、componentの型を使わずにinstancesを持つようにしている
    //  独自になっていて微妙なので、パーツをグループ化する仕組みを考えて適用したい
    const simpleStage = new SimpleStage()
    simpleStage.components.forEach(component => {
        componentManager.add(component)
    })

    new BlockSpawn(service)

    new CollisionChecker({
        componentManager: componentManager
    })

    new Input({
        componentManager: componentManager, stage: pixiApp.stage
    })
}

function initGameGuardian() {
    const pauseButton = document.querySelector("#pause-button")
    const resumeButton = document.querySelector("#resume-button")

    if (pauseButton) {
        pauseButton.addEventListener("click", GameGuardian.pause)
    }

    if (resumeButton) {
        resumeButton.addEventListener("click", GameGuardian.resume)
    }
}

main()
initGameGuardian()