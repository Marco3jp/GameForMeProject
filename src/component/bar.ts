import * as PIXI from 'pixi.js';
import {Graphics} from "pixi.js";
import {initial_bar, INITIAL_BAR} from "../service/parameter/bar";
import {Component} from "./component";


export class Bar implements Component{
    instance: Graphics

    collisionable: boolean
    angle: number
    speed?: number

    constructor(initial: initial_bar = INITIAL_BAR) {
        this.instance = new PIXI.Graphics()
        this.instance.beginFill(initial.COLOR)
        this.instance.drawRect(initial.X, initial.Y, initial.WIDTH, initial.HEIGHT)
        this.instance.endFill()

        this.collisionable = initial.COLLISIONABLE
        this.angle = initial.ANGLE
        this.speed = undefined
    }

    onCollision(_: Component): void {}
}