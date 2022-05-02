import {DisplayObject} from "pixi.js";
import {onMouseMoveEvent} from "./service/barControllerPositionNotifier";

export interface Component {
    instance: DisplayObject | null

    speed?: number

    onCollision?: (collisionTarget: Component) => void

    onChangeControllerPosition?: (controllerPosition: onMouseMoveEvent) => void
}