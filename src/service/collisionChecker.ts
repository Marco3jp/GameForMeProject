import * as PIXI from "pixi.js";
import {ComponentManager} from "./componentManager";
import {CollisionDetector} from "./collisionDetector";

type CollisionCheckerInput = {
    componentManager: ComponentManager
}

export class CollisionChecker {
    componentManager: ComponentManager
    collisionDetector: CollisionDetector

    constructor(input: CollisionCheckerInput) {
        console.log(input.componentManager);

        this.componentManager = input.componentManager
        this.collisionDetector = new CollisionDetector()
        PIXI.Ticker.shared.add(() => {
            this.onTick()
        })
    }

    onTick() {
        const collisionableComponents = this.componentManager.list.filter(component => component.collisionable)
        for (let i = 0; i < collisionableComponents.length; i++) {
            for (let j = i + 1; j < collisionableComponents.length; j++) {
                const component1 = collisionableComponents[i];
                const component2 = collisionableComponents[j];

                if (component1.instance &&
                    component2.instance &&
                    this.collisionDetector.checkCollision(
                        component1.instance, component2.instance
                    )
                ) {
                    component1.onCollision(component2)
                    component2.onCollision(component1)
                }
            }
        }
    }
}