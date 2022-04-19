import {DisplayObject} from "pixi.js";

export interface Component {
    instance: DisplayObject | null
    collisionable: boolean

    speed?: number

    onCollision(collisionTarget: Component): void
}