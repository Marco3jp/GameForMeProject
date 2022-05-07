import {Component} from "../component/component";
import {Container} from "@pixi/display";
import {ComponentManagerInterface} from "../component/service/componentManager";

type ComponentManagerInput = {
    stage: Container
}

export class ComponentManager implements ComponentManagerInterface{
    private stage: Container
    private components: Component[]

    constructor(input: ComponentManagerInput) {
        this.stage = input.stage
        this.components = []
    }

    // TODO: 複数受け入れられるようにしていいかも
    add(component: Component) {
        if (!component.instance) return

        this.components.push(component)
        this.stage.addChild(component.instance)
    }

    remove(component: Component) {
        if (!component.instance) return

        const index = this.components.findIndex(v => v === component)
        if (index < 0) return

        this.components.splice(index, 1)
        this.stage.removeChild(component.instance)
    }

    get list(): Component[] {
        return this.components
    }
}