import {RallyInterface} from "../component/service/rally";
import {BarComponentName} from "../component/bar";
import {Ball} from "../component/ball";
import {Component} from "../component/component";
import {Rectangle} from "@pixi/math";

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

        if (this.judgeRally(ball, rackettableObject)) {
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
    judgeRally(ball: Ball, rackettableObject: Component): boolean {
        if (!rackettableObject.instance) return false

        // TODO: 0, 90, 180, 270を向いているものに対して、その向きのすべてを判定とする実装にしている
        //  後者はゲーム性として考えられる範囲だけど、前者は単に手抜きなので対応したい

        let direction: RACKETTABLE_OBJECT_DIRECTION

        switch (rackettableObject.instance.angle) {
            case 0:
                direction = RACKETTABLE_OBJECT_DIRECTION.RIGHT
                break
            case 90:
                direction = RACKETTABLE_OBJECT_DIRECTION.BOTTOM
                break
            case 180:
                direction = RACKETTABLE_OBJECT_DIRECTION.LEFT
                break
            case 270:
                direction = RACKETTABLE_OBJECT_DIRECTION.TOP
                break
            default:
                return false
        }

        const bounds ball.instance.getBounds()

    }

    judgeExistInRange(
        ballBounds: Rectangle,
        rackettableObjectBounds: Rectangle,
        direction: RACKETTABLE_OBJECT_DIRECTION
    ): EXIST_IN_RANGE {
        switch (direction) {
            case RACKETTABLE_OBJECT_DIRECTION.RIGHT:

        }
    }
}