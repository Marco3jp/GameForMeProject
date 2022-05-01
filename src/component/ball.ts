import * as PIXI from 'pixi.js';
import {Graphics} from "pixi.js";
import {initial_ball, INITIAL_BALL} from "../service/parameter/ball";
import {Component} from "./component";
import {Service} from "./service/service";

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
            this.service.moving.move(this)
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
}
