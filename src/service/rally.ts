import {RallyInterface} from "../component/service/rally";
import {BarComponentName} from "../component/bar";
import {Ball} from "../component/ball";
import {Component} from "../component/component";
import {Rectangle} from "@pixi/math";
import {INITIAL_RALLY} from "./parameter/rally";
import {DisplayObject} from "pixi.js";

const RACKETTABLE_OBJECTS = [
    BarComponentName
]

enum RACKETTABLE_OBJECT_DIRECTION {
    RIGHT = "RIGHT",
    BOTTOM = "BOTTOM",
    LEFT = "LEFT",
    TOP = "TOP"
}

enum EXIST_IN_RANGE {
    FARTHEST_RANGE = "FARTHEST_RANGE",
    FAR_RANGE = "FAR_RANGE",
    CLOSE_RANGE = "CLOSE_RANGE",
    NOT_EXIST = "NOT_EXIST"
}

export class Rally implements RallyInterface {
    tryRally(ball: Ball, rackettableObject: Component): void {
        if (!RACKETTABLE_OBJECTS.includes(rackettableObject.componentName)) return;

        if (this.judgeRally(ball, rackettableObject) !== EXIST_IN_RANGE.NOT_EXIST) {
            this.accelerateBall(ball)
        }
    }

    // TODO: これここにあるの微妙に迷っているので良いか考え直したい
    accelerateBall(ball: Ball) {
        const tmpSpeed = ball.speed + ball.accelerationStep;
        if (tmpSpeed >= ball.accelerationLimit) return
        ball.speed = tmpSpeed
    }

    /**
     * @description judgeRallyRange はラリーのタイミングを判定するメソッド
     *   instanceのangleを正面とみなして、正面側の一定距離をラリー成功の範囲とする
     */
    judgeRally(ball: Ball, rackettableObject: Component): EXIST_IN_RANGE {
        if (!rackettableObject.instance) return EXIST_IN_RANGE.NOT_EXIST

        // TODO: 0, 90, 180, 270を向いているものに対して、その向きのすべてを判定とする実装にしている
        //  後者はゲーム性として考えられる範囲だけど、前者は単に手抜きなので対応したい
        const direction = this.getDirectionOfRackettableObject(rackettableObject.instance)
        const ballBounds = ball.instance.getBounds()
        const rackettableObjectBounds = rackettableObject.instance.getBounds()
        const range = this.getRangeFromBallToRackettableObject(ballBounds, rackettableObjectBounds, direction)
        return this.judgeExistInRange(range)
    }

    getDirectionOfRackettableObject(rackettableDisplayObject: DisplayObject): RACKETTABLE_OBJECT_DIRECTION {
        switch (rackettableDisplayObject.angle) {
            case 0:
                return RACKETTABLE_OBJECT_DIRECTION.RIGHT
            case 90:
                return RACKETTABLE_OBJECT_DIRECTION.BOTTOM
            case 180:
                return RACKETTABLE_OBJECT_DIRECTION.LEFT
            case 270:
                return RACKETTABLE_OBJECT_DIRECTION.TOP
            default:
                // FIXME: 微妙
                return RACKETTABLE_OBJECT_DIRECTION.RIGHT
        }
    }

    getRangeFromBallToRackettableObject(
        ballBounds: Rectangle,
        rackettableObjectBounds: Rectangle,
        direction: RACKETTABLE_OBJECT_DIRECTION): number {
        switch (direction) {
            case RACKETTABLE_OBJECT_DIRECTION.RIGHT:
                return ballBounds.x - rackettableObjectBounds.x
            case RACKETTABLE_OBJECT_DIRECTION.BOTTOM:
                return ballBounds.y - rackettableObjectBounds.y
            case RACKETTABLE_OBJECT_DIRECTION.LEFT:
                return rackettableObjectBounds.x - ballBounds.x
            case RACKETTABLE_OBJECT_DIRECTION.TOP:
                return rackettableObjectBounds.y - ballBounds.y
        }
    }

    judgeExistInRange(
        range: number
    ): EXIST_IN_RANGE {
        const absoluteRange = Math.abs(range)

        if (absoluteRange <= INITIAL_RALLY.CLOSE_RANGE) {
            return EXIST_IN_RANGE.CLOSE_RANGE
        }

        if (absoluteRange <= INITIAL_RALLY.FAR_RANGE) {
            return EXIST_IN_RANGE.FAR_RANGE
        }

        if (absoluteRange <= INITIAL_RALLY.FARTHEST_RANGE) {
            return EXIST_IN_RANGE.FARTHEST_RANGE
        }

        return EXIST_IN_RANGE.NOT_EXIST
    }
}