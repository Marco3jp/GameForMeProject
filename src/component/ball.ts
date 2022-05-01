import * as PIXI from 'pixi.js';
import {Graphics} from "pixi.js";
import {initial_ball, INITIAL_BALL} from "../service/parameter/ball";
import {Component} from "./component";
import {Service} from "./service/service";

// TODO: 汎用にする
type Movement = {
    x: number,
    y: number
}

export class Ball implements Component {
    instance: Graphics

    // TODO: 移動物は以下のパラメータ必ず持つのでcalculateMovingとか移動にあたって共通化する
    collisionable: boolean
    speed: number

    service: Service

    constructor(service: Service, initial: initial_ball = INITIAL_BALL) {
        this.service = service

        this.instance = new PIXI.Graphics()
        this.instance.beginFill(initial.COLOR)
        this.instance.drawCircle(0, 0, initial.RADIUS)
        this.instance.endFill()
        this.instance.setTransform(initial.X, initial.Y)
        this.instance.angle = initial.ANGLE

        this.collisionable = initial.COLLISIONABLE
        this.speed = initial.SPEED

        PIXI.Ticker.shared.add(()=> {
            const moving = this.calculateMoving()
            this.instance.x += moving.x
            this.instance.y += moving.y
        })
    }

    onCollision(collisionTarget: Component) {
        if (!collisionTarget.instance) return
        this.instance.angle = this.service.reflection.calculateWithLine(
            {
                angle: this.instance.angle
            }, {
                angle: collisionTarget.instance.angle
            }
        )
    }

    // TODO: サービスに移動する
    calculateMoving(): Movement {
        const radian = this.instance.rotation
        const unitCircleX = Math.cos(radian)
        const unitCircleY = Math.sin(radian)

        return {
            x: unitCircleX * this.speed,
            y: unitCircleY * this.speed
        }
    }
}
