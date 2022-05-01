import * as PIXI from 'pixi.js';
import {Graphics} from "pixi.js";
import {Component} from "../../component";
import {initial_simple_wall} from "../../../service/parameter/simpleWall";

export class SimpleWall implements Component{
    instance: Graphics

    collisionable: boolean
    speed?: number

    constructor(initial: initial_simple_wall) {
        this.instance = new PIXI.Graphics()
        this.instance.beginFill(initial.COLOR)
        this.instance.drawRect(0, 0, initial.WIDTH, initial.HEIGHT)
        this.instance.endFill()
        this.instance.setTransform(initial.X, initial.Y)
        this.instance.angle = initial.ANGLE

        this.collisionable = initial.COLLISIONABLE
        this.speed = undefined
    }

    onCollision(_: Component): void {}
}