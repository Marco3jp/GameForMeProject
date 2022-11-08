import {Component, ComponentName} from "./component";
import {Graphics} from "pixi.js";
import {Service} from "./service/service";
import * as PIXI from "pixi.js";
import {initial_block, INITIAL_BLOCK} from "../service/parameter/block";
import {Bodies, Body} from "matter-js";
import {calculateDegreesToRadians} from "../lib/formula";

export const BlockComponentName = "Block"

export class Block implements Component {
    componentName: ComponentName
    instance: Graphics
    matterInstance: Body

    isBlockBreaker: boolean
    service: Service
    directionOfMovement: number

    // FIXME: 超暫定でここで座標を指定しているものの、適切に配置するためのサービスが必要な気がする
    constructor(service: Service, initial: initial_block = INITIAL_BLOCK, location: { x: number, y: number }) {
        this.service = service

        this.instance = new PIXI.Graphics()
        this.instance.beginFill(initial.COLOR)
        this.instance.drawRect(0, 0, initial.WIDTH, initial.HEIGHT)
        this.instance.endFill()
        this.instance.setTransform(location.x, location.y)
        this.instance.angle = initial.ANGLE

        this.matterInstance = Bodies.rectangle(location.x + initial.WIDTH / 2, location.y, initial.WIDTH, initial.HEIGHT)
        Body.setAngle(this.matterInstance, calculateDegreesToRadians(initial.ANGLE))

        this.componentName = BlockComponentName

        this.isBlockBreaker = false

        this.speed = initial.SPEED

        this.directionOfMovement = initial.DIRECTION_OF_MOVEMENT

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
