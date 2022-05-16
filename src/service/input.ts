import {ComponentManagerInterface} from "../component/service/componentManager";
import {Container} from "@pixi/display";
import {InteractionEvent} from "@pixi/interaction";

type InputServiceInput = {
    componentManager: ComponentManagerInterface
    stage: Container
}

/**
 * 入力を司り、コンポーネント
 */
export class Input {
    componentManager: ComponentManagerInterface

    constructor(input: InputServiceInput) {
        this.componentManager = input.componentManager
        input.stage.interactive = true

        input.stage.on("mousemove", (e) => this.onMouseMove(e))
        window.document.addEventListener("keydown", (e) => this.onKeydown(e))

    }

    // ドキュメントに書かれている mousemove の返す値と型が違うものの、実際 InteractionEvent が返ってくるのでそういうことにする
    // https://pixijs.download/release/docs/PIXI.Container.html#mousemove
    onMouseMove(event: InteractionEvent) {
        console.log(this.componentManager)

        const targetComponents = this.componentManager.list.filter(component => component.onMouseMove)
        targetComponents.forEach(component => {
            if (component.onMouseMove) {
                component.onMouseMove({
                    clientX: event.data.global.x
                })
            }
        })
    }

    onKeydown(event: KeyboardEvent) {
        const targetComponents = this.componentManager.list.filter(component => component.onKeydown)
        targetComponents.forEach(component => {
            if (component.onKeydown) {
                component.onKeydown(event)
            }
        })
    }
}