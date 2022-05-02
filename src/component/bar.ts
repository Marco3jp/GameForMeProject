import * as PIXI from 'pixi.js';
import {Graphics} from "pixi.js";
import {initial_bar, INITIAL_BAR} from "../service/parameter/bar";
import {Component} from "./component";
import {Service} from "./service/service";
import {onMouseMoveEvent} from "./service/barControllerPositionNotifier";

export class Bar implements Component{
    instance: Graphics

    speed?: number

    service: Service

    constructor(service: Service, initial: initial_bar = INITIAL_BAR) {
        this.service = service

        this.instance = new PIXI.Graphics()
        this.instance.beginFill(initial.COLOR)
        this.instance.drawRect(0, 0, initial.WIDTH, initial.HEIGHT)
        this.instance.endFill()
        this.instance.setTransform(initial.X, initial.Y)
        this.instance.angle = initial.ANGLE

        this.speed = undefined // TODO: 操作系を実装するときにここ入れる（はず）
    }

    onCollision(_: Component): void {}

    onChangeControllerPosition(event: onMouseMoveEvent) {
        this.service.barMoving.move(this, event)
    }
}