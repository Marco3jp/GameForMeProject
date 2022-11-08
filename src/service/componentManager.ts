import {Component} from "../component/component";
import {Container} from "@pixi/display";
import {ComponentManagerInterface} from "../component/service/componentManager";
import {Composite, World} from "matter-js";

type ComponentManagerInput = {
    stage: Container
    matterStage: World
}

export class ComponentManager implements ComponentManagerInterface{
    private stage: Container
    private matterStage: World
    private components: Component[]

    constructor(input: ComponentManagerInput) {
        this.stage = input.stage
        this.matterStage = input.matterStage
        this.components = []
    }

    // TODO: 複数受け入れられるようにしていいかも
    add(component: Component) {
        if (!(component.instance || component.matterInstance)) return

        this.components.push(component)

        if(component.instance) {
            this.stage.addChild(component.instance)
        }

        if(component.matterInstance) {
            Composite.add(this.matterStage, component.matterInstance)
        }
    }

    remove(component: Component) {
        if (!(component.instance || component.matterInstance)) return

        const index = this.components.findIndex(v => v === component)
        if (index < 0) return

        this.components.splice(index, 1)

        if(component.instance) {
            this.stage.removeChild(component.instance)
        }

        if(component.matterInstance) {
            Composite.remove(this.matterStage, component.matterInstance)
        }
    }

    get list(): Component[] {
        return this.components
    }
}
