import {Bar} from "../bar";
import {onMouseMoveEvent} from "./barControllerPositionNotifier";

export interface BarMovingInterface {
    move(component: Bar, mouseMoving: onMouseMoveEvent): void
}