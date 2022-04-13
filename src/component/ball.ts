import * as PIXI from 'pixi.js';
import {Graphics} from "pixi.js";
import {initial_ball, INITIAL_BALL} from "../service/parameter/ball";
import {Component} from "./component";

// TODO: 汎用にする
type Movement = {
    x: number,
    y: number
}

export class Ball implements Component{
    instance: Graphics

    // TODO: 移動物は以下のパラメータ必ず持つのでcalculateMovingとか移動にあたって共通化する
    collisionable: boolean
    speed: number
    angle: number

    constructor(initial: initial_ball = INITIAL_BALL) {
        this.instance = new PIXI.Graphics()
        this.instance.beginFill(initial.COLOR)
        this.instance.drawCircle(initial.X, initial.Y, initial.RADIUS)
        this.instance.endFill()

        this.collisionable = initial.COLLISIONABLE
        this.speed = initial.SPEED
        this.angle = initial.ANGLE

        // TODO: 角度をdisplayObjectが持っているものと共通化する
        // this.instance.angle = this.angle

        PIXI.Ticker.shared.add(()=> {
            const moving = this.calculateMoving()
            this.instance.x += moving.x
            this.instance.y += moving.y
        })
    }

    onCollision(collisionTarget: Component) {
        this.angle += collisionTarget.angle
    }

    // TODO: サービスに移動する
    calculateMoving(): Movement {
        const radian = this.angle * Math.PI / 180
        const unitCircleX = Math.cos(radian)
        const unitCircleY = Math.sin(radian)

        return {
            x: unitCircleX * this.speed,
            y: unitCircleY * this.speed
        }
    }
}
