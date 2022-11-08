import * as PIXI from 'pixi.js';
import {Graphics} from "pixi.js";
import {Component, ComponentName, InstanceName} from "../../component";
import {initial_simple_wall} from "../../../service/parameter/simpleWall";
import {Bodies, Body} from "matter-js";
import {calculateDegreesToRadians} from "../../../lib/formula";

// なんかこれ別名というか、汎用名と固有名がほしい気がする
// ステージが変わっても壁としての本質は変わらなさそう
export const SimpleWallComponentName: ComponentName = "SimpleWall"

export class SimpleWall implements Component{
    instance: Graphics
    matterInstance: Body

    componentName: ComponentName
    instanceName: InstanceName

    isBlockBreaker: boolean

    speed?: number

    directionOfMovement: number;

    constructor(initial: initial_simple_wall, name: InstanceName) {
        this.instance = new PIXI.Graphics()
        this.instance.beginFill(initial.COLOR)
        this.instance.drawRect(0, 0, initial.WIDTH, initial.HEIGHT)
        this.instance.endFill()
        this.instance.setTransform(initial.X, initial.Y)
        this.instance.angle = initial.ANGLE

        this.matterInstance = Bodies.rectangle(
            initial.X, initial.Y, initial.WIDTH, initial.HEIGHT,
            { isStatic: true }
        )
        Body.setAngle(this.matterInstance, calculateDegreesToRadians(initial.ANGLE))

        this.componentName = SimpleWallComponentName
        this.instanceName = name

        this.isBlockBreaker = false

        this.speed = undefined

        this.directionOfMovement = initial.DIRECTION_OF_MOVEMENT
    }

    onCollision(_: Component): void {}

}
