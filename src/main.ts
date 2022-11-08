import * as PIXI from 'pixi.js'
import {Ball} from "./component/ball";
import {Bar} from "./component/bar";
import {ComponentManager} from "./service/componentManager";
import {CollisionChecker} from "./service/collisionChecker";
import {GameGuardian} from "./service/gameGuardian";
import {SimpleStage} from "./component/stage/simpleStage/simpleStage";
import {Service} from "./component/service/service";
import {Reflection} from "./service/reflection";
import {Moving} from "./service/moving";
import {INITIAL_APP} from "./service/parameter/app";
import {BarMoving} from "./service/barMoving";
import {BlockSpawn} from "./service/blockSpawn";
import {Input} from "./service/input";
import {Nudging} from "./service/nudging";
import {Rally} from "./service/rally";
import {Composite, Engine, Mouse, MouseConstraint, Render, Runner, World} from "matter-js";

export function main(): MatterComponents | null {
    if (import.meta.env.DEV) {
        // @ts-ignore
        window.__PIXI_INSPECTOR_GLOBAL_HOOK__ && window.__PIXI_INSPECTOR_GLOBAL_HOOK__.register({PIXI: PIXI});
    }

    const root = document.querySelector('#app')
    if (!root) return null;

    const pixiApp = new PIXI.Application({
        width: INITIAL_APP.canvasWidth,
        height: INITIAL_APP.canvasHeight
    })
    root.appendChild(pixiApp.view)

    const matterComponents = initMatter()
    if (!matterComponents) return null;

    const {engine, render, world} = matterComponents

    const componentManager = new ComponentManager({
        stage: pixiApp.stage,
        matterStage: world
    })

    const service: Service = {
        reflection: new Reflection(),
        moving: new Moving(),
        barMoving: new BarMoving(),
        nudging: new Nudging(),
        rally: new Rally(),
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

    const mouse = Mouse.create(render.canvas)
    const mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.2,
            render: {
                visible: false
            }
        }
    });

    Composite.add(world, mouseConstraint);

    render.mouse = mouse;

    Render.lookAt(render, {
        min: { x: 0, y: 0 },
        max: { x: INITIAL_APP.canvasWidth, y: INITIAL_APP.canvasHeight }
    });

    // return for testing page
    return matterComponents
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

type MatterComponents = {
    engine: Engine,
    runner: Runner,
    render: Render,
    world: World,
    canvas: HTMLCanvasElement,
    stop: () => void
}

function initMatter(): MatterComponents | null {
    const matterRoot = document.querySelector<HTMLDivElement>("#matter_app")
    if (!matterRoot) {
        return null
    }

    const engine = Engine.create()
    const world = engine.world
    const render = Render.create({
        element: matterRoot,
        engine: engine,
        options: {
            width: INITIAL_APP.canvasWidth,
            height: INITIAL_APP.canvasHeight
        }
    })

    Render.run(render);
    const runner = Runner.create()
    Runner.run(runner, engine)

    return {
        engine: engine,
        runner: runner,
        render: render,
        world: world,
        canvas: render.canvas,
        stop: function() {
            Render.stop(render);
            Runner.stop(runner);
        }
    };
}

main()
initGameGuardian()
