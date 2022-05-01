import {Component} from "../component/component";
import {Movement, MovingInterface} from "../component/service/moving";

export class Moving implements MovingInterface {
    move(component: Component) {
        if (!component.instance || !component.speed) return

        const moving = this.calculateMovement(component)
        component.instance.x += moving.x
        component.instance.y += moving.y
    }

    calculateMovement(component: Component): Movement {
        if (!component.instance || !component.speed) {
            //
            return {
                x: 0,
                y: 0
            }
        }

        const radian = component.instance.rotation
        const unitCircleX = Math.cos(radian)
        const unitCircleY = Math.sin(radian)

        return {
            x: unitCircleX * component.speed,
            y: unitCircleY * component.speed
        }
    }
}