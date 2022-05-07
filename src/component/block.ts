import {Component, ComponentName} from "./component";
import {Graphics} from "pixi.js";
import {Service} from "./service/service";
import * as PIXI from "pixi.js";
import {initial_block, INITIAL_BLOCK} from "../service/parameter/block";

export const BlockComponentName = "Block"

export class Block implements Component {
    componentName: ComponentName
    instance: Graphics
    isBlockBreaker: boolean
    service: Service

    // FIXME: 超暫定でここで座標を指定しているものの、適切に配置するためのサービスが必要な気がする
    constructor(service: Service, initial: initial_block = INITIAL_BLOCK, location: { x: number, y: number }) {
        this.service = service

        this.instance = new PIXI.Graphics()
        this.instance.beginFill(initial.COLOR)
        this.instance.drawRect(0, 0, initial.WIDTH, initial.HEIGHT)
        this.instance.endFill()

        this.instance.setTransform(location.x, location.y)
        this.instance.angle = initial.ANGLE

        this.componentName = BlockComponentName

        this.isBlockBreaker = false

        this.speed = initial.SPEED

        PIXI.Ticker.shared.add(()=> {
            this.service.moving.move(this)
        })
    }

    onCollision(collisionTarget: Component): void {
        if (collisionTarget.isBlockBreaker) {
            this.service.componentManager.remove(this)
        }
    }

    speed: number;
}