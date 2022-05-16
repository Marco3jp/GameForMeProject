import {BarMovingInterface} from "../component/service/barMoving";
import {Bar} from "../component/bar";
import {onMouseMoveEvent} from "../component/service/input";
import {INITIAL_APP} from "./parameter/app";
import {CANVAS_PADDING, WALL_THICKNESS} from "../component/stage/simpleStage/simpleStage";

export class BarMoving implements BarMovingInterface{
    move(component: Bar, mouseMoving: onMouseMoveEvent): void {
        if (!component.instance) return

        const barHalfWidth = component.instance.width / 2
        const leftmostCoordinatesInStage = CANVAS_PADDING.X + WALL_THICKNESS
        const rightmostCoordinatesInStage = INITIAL_APP.canvasWidth - CANVAS_PADDING.X - WALL_THICKNESS

        if (mouseMoving.clientX < barHalfWidth + leftmostCoordinatesInStage){
            // |___           |
            component.instance.x = 25 + 10
        } else if (mouseMoving.clientX >  rightmostCoordinatesInStage - barHalfWidth) {
            // |           ___|
            component.instance.x = rightmostCoordinatesInStage - component.instance.width
        } else {
            // |   ___        |
            component.instance.x = mouseMoving.clientX - barHalfWidth
        }
    }
}