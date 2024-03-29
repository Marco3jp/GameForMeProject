import {DisplayObject} from "pixi.js";
import {onMouseMoveEvent} from "./service/input";

export type ComponentName = string
export type InstanceName = string

export interface Component {
    componentName: ComponentName
    instanceName?: InstanceName

    // TODO: 上の instanceName はコンポーネントを実体化した一つ一つに対してつけるもの
    //   以下の instance はコンポーネントが保持するDisplayObjectのことで、こちらの名前が適切ではないので
    instance: DisplayObject | null

    // TODO: 属性としてまとめたほうがよくなったらまとめたほうがいいかも（それはそうでは……？）
    // これは現状に必要なだけの実装で、どのようにこういった設定を持つのが良いのか決めあぐねている段階
    // 例えば攻撃的な投射物として持つとか、破壊できるモノを持つとか、このままで他に破壊できるものができるなら別々の属性として持つとか
    isBlockBreaker: boolean

    /**
     * @description directionOfMovement set and get by the angle.
     * TODO: 『動かない状態』が、speed: 0とか、componentのconstructorでTickerに登録するか否かとごちゃごちゃしているので整理したい
     *   こいつも関係があるけど、一旦それと切り離したいので、適当に0とか登録することにする
     */
    directionOfMovement: number

    speed?: number

    onCollision?: (collisionTarget: Component) => void

    onMouseMove?: (event: onMouseMoveEvent) => void

    onKeydown?: (event: KeyboardEvent) => void
}