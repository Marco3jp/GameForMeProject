import {ComponentManagerInterface} from "../component/service/componentManager";

type InputServiceInput = {
    componentManager: ComponentManagerInterface
    canvas: HTMLCanvasElement
}

/**
 * 入力を司り、コンポーネント
 */
export class Input {
    componentManager: ComponentManagerInterface

    constructor(input: InputServiceInput) {
        this.componentManager = input.componentManager

        input.canvas.addEventListener("mousemove", (e) => this.onMouseMove(e) )
        window.document.addEventListener("keydown", (e) => this.onKeydown(e))
    }

    onMouseMove(event: MouseEvent) {
        const targetComponents = this.componentManager.list.filter(component => component.onMouseMove)
        targetComponents.forEach(component => {
            if (component.onMouseMove) {
                component.onMouseMove({
                    clientX: event.clientX
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