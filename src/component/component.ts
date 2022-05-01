import {DisplayObject} from "pixi.js";

export interface Component {
    instance: DisplayObject | null

    speed?: number

    onCollision?: (collisionTarget: Component) => void
}