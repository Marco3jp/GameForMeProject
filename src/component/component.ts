import {DisplayObject} from "pixi.js";
import {onMouseMoveEvent} from "./service/barControllerPositionNotifier";

export type ComponentName = string

export interface Component {
    componentName: ComponentName

    instance: DisplayObject | null

    // TODO: 属性としてまとめたほうがよくなったらまとめたほうがいいかも（それはそうでは……？）
    // これは現状に必要なだけの実装で、どのようにこういった設定を持つのが良いのか決めあぐねている段階
    // 例えば攻撃的な投射物として持つとか、破壊できるモノを持つとか、このままで他に破壊できるものができるなら別々の属性として持つとか
    isBlockBreaker: boolean

    speed?: number

    onCollision?: (collisionTarget: Component) => void

    onChangeControllerPosition?: (controllerPosition: onMouseMoveEvent) => void
}