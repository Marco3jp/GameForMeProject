import * as PIXI from 'pixi.js';
import {Graphics} from 'pixi.js';
import {initial_ball, INITIAL_BALL} from "../service/parameter/ball";
import {Component, ComponentName} from "./component";
import {Service} from "./service/service";
import {NudgeDirection} from "./service/nudging";
import {BarComponentName} from "./bar";

export const BallComponentName: ComponentName = "Ball"

// TODO: key bindの管理を考える
//  一旦、物理的な配置に依存するように KeyboardEvent.code を使って実装する
export const NudgeKeyBind = {
    NUDGE_LEFT_SIDE: "KeyA",
    NUDGE_RIGHT_SIDE: "KeyD"
}

export const RallyKeyBind = {
    RALLY: "Space"
}

export class Ball implements Component {
    instance: Graphics

    isBlockBreaker: boolean

    componentName: ComponentName;

    speed: number
    accelerationStep: number
    accelerationLimit: number

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
        this.accelerationStep = initial.ACCELERATION_STEP
        this.accelerationLimit = initial.ACCELERATION_LIMIT

        this.isBlockBreaker = true

        this.directionOfMovement = initial.DIRECTION_OF_MOVEMENT

        PIXI.Ticker.shared.add(() => {
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

    onKeydown(event: KeyboardEvent) {
        switch (event.code) {
            case NudgeKeyBind.NUDGE_LEFT_SIDE:
                this.handleNudge(NudgeDirection.LEFT)
                return;
            case NudgeKeyBind.NUDGE_RIGHT_SIDE:
                this.handleNudge(NudgeDirection.RIGHT)
                return;
            case RallyKeyBind.RALLY:
                this.handleRally()
                return;
        }
    }

    handleNudge(nudgeDirection: NudgeDirection) {
        try {
            this.directionOfMovement = this.service.nudging.calculateNudging(
                this.directionOfMovement, nudgeDirection)
        } catch (e) {
            // TODO: 最悪なのでどうにかしよう
            this.directionOfMovement = 270
        }
    }

    handleRally() {
        const bar = this.service.componentManager.list.find((component) => component.componentName === BarComponentName)
        if (!bar) return
        this.service.rally.tryRally(this, bar)
    }
}
