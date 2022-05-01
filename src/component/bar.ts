import * as PIXI from 'pixi.js';
import {Graphics} from "pixi.js";
import {initial_bar, INITIAL_BAR} from "../service/parameter/bar";
import {Component} from "./component";


export class Bar implements Component{
    instance: Graphics

    collisionable: boolean
    speed?: number

    constructor(initial: initial_bar = INITIAL_BAR) {
        this.instance = new PIXI.Graphics()
        this.instance.beginFill(initial.COLOR)
        this.instance.drawRect(0, 0, initial.WIDTH, initial.HEIGHT)
        this.instance.endFill()
        this.instance.setTransform(initial.X, initial.Y)
        this.instance.angle = initial.ANGLE

        this.collisionable = initial.COLLISIONABLE
        this.speed = undefined // TODO: 操作系を実装するときにここ入れる（はず）
    }

    onCollision(_: Component): void {}
}