import * as PIXI from 'pixi.js';
import {Graphics} from 'pixi.js';
import {initial_ball, INITIAL_BALL} from "../service/parameter/ball";
import {Component, ComponentName} from "./component";
import {Service} from "./service/service";
import {NudgeDirection} from "./service/nudging";
import {BarComponentName} from "./bar";
import {BOTTOM_WALL_INSTANCE_NAME} from "./stage/simpleStage/simpleStage";
import {GameGuardian} from "../service/gameGuardian";
import {Bodies, Body} from "matter-js";
import {calculateDegreesToRadians} from "../lib/formula";

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
    matterInstance: Body

    isBlockBreaker: boolean

    componentName: ComponentName;

    speed: number
    accelerationStep: number
    accelerationLimit: number
    decelerationStep: number
    decelerationLimit: number

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

        this.matterInstance = Bodies.circle(0, 0, initial.RADIUS)
        Body.setAngle(this.matterInstance, calculateDegreesToRadians(initial.ANGLE))
        // なんかこれ叩くメソッド違いそう
        // Body.setAngularVelocity(this.matterInstance, calculateDegreesToRadians(initial.DIRECTION_OF_MOVEMENT))

        this.componentName = BallComponentName

        this.speed = initial.SPEED
        this.accelerationStep = initial.ACCELERATION_STEP
        this.accelerationLimit = initial.ACCELERATION_LIMIT
        this.decelerationStep = initial.DECELERATION_STEP
        this.decelerationLimit = initial.DECELERATION_LIMIT

        this.isBlockBreaker = true

        this.directionOfMovement = initial.DIRECTION_OF_MOVEMENT

        this.service.event.addMatterEventListener("beforeUpdate", ()=> {
            this.service.moving.move(this)
            GameGuardian.log({x: this.instance.x.toFixed(3), y: this.instance.y.toFixed(3), directionOfMovement: this.directionOfMovement}, 'Pixi_Ball_Stats')
            GameGuardian.log({x: this.matterInstance.position.x.toFixed(3), y: this.matterInstance.position.y.toFixed(3), directionOfMovement: this.directionOfMovement}, 'Matter_Ball_Stats')
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

        if (collisionTarget?.instanceName === BOTTOM_WALL_INSTANCE_NAME) {
            const tmpSpeed = this.speed - this.decelerationStep;
            if (tmpSpeed < this.decelerationLimit) {
                this.speed = this.decelerationLimit
                return
            }
            this.speed = tmpSpeed
        }
    }

    // TODO: 多分これNudgeサービスが受け取ってボールとラケットを探すほうが良い気がしてきた
    //   別にボールにとってはナッジされるかどうかってあんまり関係がない
    //   というかもしやイベントリスナーを自前で作ったほうが良いかも
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
