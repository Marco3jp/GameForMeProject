import * as PIXI from 'pixi.js';
import {Graphics} from "pixi.js";
import {initial_bar, INITIAL_BAR} from "../service/parameter/bar";
import {Component, ComponentName} from "./component";
import {Service} from "./service/service";
import {onMouseMoveEvent} from "./service/input";

export const BarComponentName: ComponentName = "Bar"

export class Bar implements Component{
    instance: Graphics

    componentName: ComponentName

    isBlockBreaker: boolean

    speed?: number

    service: Service

    directionOfMovement: number

    constructor(service: Service, initial: initial_bar = INITIAL_BAR) {
        this.service = service

        this.instance = new PIXI.Graphics()
        this.instance.beginFill(initial.COLOR)
        this.instance.drawRect(0, 0, initial.WIDTH, initial.HEIGHT)
        this.instance.endFill()
        this.instance.setTransform(initial.X, initial.Y)
        this.instance.angle = initial.ANGLE

        this.componentName = BarComponentName

        this.isBlockBreaker = false

        this.speed = undefined // TODO: 操作系を実装するときにここ入れる（はず）

        this.directionOfMovement = initial.DIRECTION_OF_MOVEMENT
    }

    onCollision(_: Component): void {}

    onMouseMove(event: onMouseMoveEvent) {
        this.service.barMoving.move(this, event)
    }
}