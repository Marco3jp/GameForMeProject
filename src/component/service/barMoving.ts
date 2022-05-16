import {Bar} from "../bar";
import {onMouseMoveEvent} from "./input";

export interface BarMovingInterface {
    move(component: Bar, mouseMoving: onMouseMoveEvent): void
}