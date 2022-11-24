// TODO: 壁をグルーピングして実装してみたいんだけど、コンテナに入れたらいいのかな……
//  コンポーネントマネージャが切り出されているので、そのあたりを考慮しないとダメになっちゃっているなぁ
//  コンテナコンポーネントを考慮してComponent.instancesにするとかかな
import {SimpleWall} from "./simpleWall";
import {INITIAL_SIMPLE_WALL} from "../../../service/parameter/simpleWall";
import {Component} from "../../component";
import {INITIAL_APP} from "../../../service/parameter/app";

export const WALL_THICKNESS = 50;

// TODO: これ壁の厚さを含めたサイズなので明示したほうが良さそう
export const STAGE_SIZE = {
    X: INITIAL_APP.canvasWidth,
    Y: INITIAL_APP.canvasHeight
}

export const TOP_WALL_INSTANCE_NAME = "topWall"
export const RIGHT_WALL_INSTANCE_NAME = "rightWall"
export const BOTTOM_WALL_INSTANCE_NAME = "bottomWall"
export const LEFT_WALL_INSTANCE_NAME = "leftWall"

export class SimpleStage {
    components: Component[]

    constructor() {
        // create stage
        const wall1 = new SimpleWall({
            ...INITIAL_SIMPLE_WALL,
            COLOR: 0xF44336,
            ANGLE: 0,
            HEIGHT: WALL_THICKNESS,
            WIDTH: STAGE_SIZE.X,
            X: INITIAL_APP.canvasWidth / 2,
            Y: WALL_THICKNESS / 2,
            DIRECTION_OF_MOVEMENT: 0
        }, TOP_WALL_INSTANCE_NAME)
        const wall2 = new SimpleWall({
            ...INITIAL_SIMPLE_WALL,
            COLOR: 0x2196F3,
            ANGLE: 90,
            HEIGHT: WALL_THICKNESS,
            WIDTH: STAGE_SIZE.Y,
            X: INITIAL_APP.canvasWidth - (WALL_THICKNESS / 2),
            Y: INITIAL_APP.canvasHeight / 2,
            DIRECTION_OF_MOVEMENT: 0
        }, RIGHT_WALL_INSTANCE_NAME)
        const wall3 = new SimpleWall({
            ...INITIAL_SIMPLE_WALL,
            COLOR: 0x4CAF50,
            ANGLE: 180,
            HEIGHT: WALL_THICKNESS,
            WIDTH: STAGE_SIZE.X,
            X: INITIAL_APP.canvasWidth / 2,
            Y: INITIAL_APP.canvasHeight - (WALL_THICKNESS / 2),
            DIRECTION_OF_MOVEMENT: 0
        }, BOTTOM_WALL_INSTANCE_NAME)
        const wall4 = new SimpleWall({
            ...INITIAL_SIMPLE_WALL,
            COLOR: 0xFFEB3B,
            ANGLE: 270,
            HEIGHT: WALL_THICKNESS,
            WIDTH: STAGE_SIZE.Y,
            X: WALL_THICKNESS / 2,
            Y: INITIAL_APP.canvasHeight / 2,
            DIRECTION_OF_MOVEMENT: 0
        }, LEFT_WALL_INSTANCE_NAME)

        this.components = [wall1, wall2, wall3, wall4]
    }
}
