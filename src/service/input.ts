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
    canvas: HTMLCanvasElement

    constructor(input: InputServiceInput) {
        this.componentManager = input.componentManager
        this.canvas = input.canvas

        document.body.addEventListener("mousemove", (e) => this.onMouseMove(e))
        document.body.addEventListener("keydown", (e) => this.onKeydown(e))
    }

    onMouseMove(event: MouseEvent) {
        const canvasBoundingClientRect = this.canvas.getBoundingClientRect()
        const targetComponents = this.componentManager.list.filter(component => component.onMouseMove)
        targetComponents.forEach(component => {
            if (component.onMouseMove) {
                component.onMouseMove({
                    clientX: event.clientX - canvasBoundingClientRect.x
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