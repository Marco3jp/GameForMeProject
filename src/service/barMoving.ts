import {BarMovingInterface} from "../component/service/barMoving";
import {Bar} from "../component/bar";
import {onMouseMoveEvent} from "../component/service/input";
import {INITIAL_APP} from "./parameter/app";
import {WALL_THICKNESS} from "../component/stage/simpleStage/simpleStage";
import Matter from "matter-js";

export class BarMoving implements BarMovingInterface{
    move(component: Bar, mouseMoving: onMouseMoveEvent): void {
        if (!component.instance || !component.matterInstance) return

        const barHalfWidth =  component.getWidth() / 2
        const leftmostCoordinatesInStage = WALL_THICKNESS
        const rightmostCoordinatesInStage = INITIAL_APP.canvasWidth - WALL_THICKNESS

        if (mouseMoving.clientX < barHalfWidth + leftmostCoordinatesInStage){
            // |___           |
            const x = WALL_THICKNESS
            component.instance.x = x
            Matter.Body.setPosition(component.matterInstance, Matter.Vector.create(x + barHalfWidth, component.matterInstance.position.y))
        } else if (mouseMoving.clientX >  rightmostCoordinatesInStage - barHalfWidth) {
            // |           ___|
            const x = rightmostCoordinatesInStage - component.instance.width
            component.instance.x = x
            Matter.Body.setPosition(component.matterInstance, Matter.Vector.create(x + barHalfWidth, component.matterInstance.position.y))
        } else {
            // |   ___        |
            const x = mouseMoving.clientX - barHalfWidth
            component.instance.x = x
            Matter.Body.setPosition(component.matterInstance, Matter.Vector.create(x + barHalfWidth, component.matterInstance.position.y))
        }
    }
}
