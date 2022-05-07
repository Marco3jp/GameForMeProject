import * as PIXI from 'pixi.js';
import {Graphics} from "pixi.js";
import {Component, ComponentName} from "../../component";
import {initial_simple_wall} from "../../../service/parameter/simpleWall";

// なんかこれ別名というか、汎用名と固有名がほしい気がする
// ステージが変わっても壁としての本質は変わらなさそう
export const SimpleWallComponentName: ComponentName = "SimpleWall"

export class SimpleWall implements Component{
    instance: Graphics

    componentName: ComponentName

    isBlockBreaker: boolean

    speed?: number

    directionOfMovement: number;

    constructor(initial: initial_simple_wall) {
        this.instance = new PIXI.Graphics()
        this.instance.beginFill(initial.COLOR)
        this.instance.drawRect(0, 0, initial.WIDTH, initial.HEIGHT)
        this.instance.endFill()
        this.instance.setTransform(initial.X, initial.Y)
        this.instance.angle = initial.ANGLE

        this.componentName = SimpleWallComponentName

        this.isBlockBreaker = false

        this.speed = undefined

        this.directionOfMovement = initial.DIRECTION_OF_MOVEMENT
    }

    onCollision(_: Component): void {}

}