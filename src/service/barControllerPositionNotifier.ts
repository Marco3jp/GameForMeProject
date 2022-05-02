import {ComponentManager} from "./componentManager";
import {Container} from "@pixi/display";
import {InteractionEvent} from "@pixi/interaction";

type BarControllerPositionNotifierInput = {
    componentManager: ComponentManager
    stage: Container
}

// TODO: 名前付けが微妙なので整理したい
//  本当にこいつはバーだけ操作するのか、コントローラって何、ポジションだけしか見ないのか、とか色々曖昧な状態
export class BarControllerPositionNotifier {
    constructor(input: BarControllerPositionNotifierInput) {
        input.stage.interactive = true

        // ドキュメントに書かれている mousemove の返す値と型が違うものの、実際 InteractionEvent が返ってくるのでそういうことにする
        // https://pixijs.download/release/docs/PIXI.Container.html#mousemove
        input.stage.on("mousemove", (event: InteractionEvent) => {
            const targetComponents = input.componentManager.list.filter(component => component.onChangeControllerPosition)
            targetComponents.forEach(component => {
                console.log(event)
                if (component.onChangeControllerPosition) {
                    component.onChangeControllerPosition({
                        clientX: event.data.global.x
                    })
                }
            })
        })
    }
}