import * as PIXI from 'pixi.js';
import {Graphics} from "pixi.js";
import {initial_ball, INITIAL_BALL} from "../service/parameter/ball";
import {Component, ComponentName} from "./component";
import {Service} from "./service/service";

export const BallComponentName: ComponentName = "Ball"

export class Ball implements Component {
    instance: Graphics

    isBlockBreaker: boolean

    componentName: ComponentName;

    speed: number

    service: Service

    directionOfMovement: number

    constructor(service: Service, initial: initial_ball = INITIAL_BALL) {
        this.service = service

        this.instance = new PIXI.Graphics()
        this.instance.beginFill(initial.COLOR)
        // FIXME: x, yは中心らしいので、当たり判定に違和感ありそうで直したい
        this.instance.drawCircle(0, 0, initial.RADIUS)
        this.instance.endFill()
        this.instance.setTransform(initial.X, initial.Y)
        this.instance.angle = initial.ANGLE

        this.componentName = BallComponentName

        this.speed = initial.SPEED

        this.isBlockBreaker = true

        this.directionOfMovement = initial.DIRECTION_OF_MOVEMENT

        PIXI.Ticker.shared.add(()=> {
            this.service.moving.move(this)
        })
    }

    onCollision(collisionTarget: Component) {
        if (!collisionTarget.instance) return
        this.directionOfMovement = this.service.reflection.calculateWithLine(
            {
                angle: this.directionOfMovement
            }, {
                angle: collisionTarget.instance.angle
            }
        )
    }
}
