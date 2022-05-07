import {DisplayObject} from "pixi.js";
import {onMouseMoveEvent} from "./service/barControllerPositionNotifier";

export type ComponentName = string

export interface Component {
    componentName: ComponentName

    instance: DisplayObject | null

    speed?: number

    onCollision?: (collisionTarget: Component) => void

    onChangeControllerPosition?: (controllerPosition: onMouseMoveEvent) => void
}