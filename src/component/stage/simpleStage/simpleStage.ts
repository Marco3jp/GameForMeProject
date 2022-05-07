// TODO: 壁をグルーピングして実装してみたいんだけど、コンテナに入れたらいいのかな……
//  コンポーネントマネージャが切り出されているので、そのあたりを考慮しないとダメになっちゃっているなぁ
//  コンテナコンポーネントを考慮してComponent.instancesにするとかかな
import {SimpleWall} from "./simpleWall";
import {INITIAL_SIMPLE_WALL} from "../../../service/parameter/simpleWall";
import {Component} from "../../component";

export class SimpleStage {
    components: Component[]

    constructor() {
        // create stage
        const wall1 = new SimpleWall({
            ...INITIAL_SIMPLE_WALL,
            COLOR: 0xF44336,
            ANGLE: 0,
            HEIGHT: 10,
            WIDTH: 950,
            X: 25,
            Y: 25,
            DIRECTION_OF_MOVEMENT: 0
        })
        const wall2 = new SimpleWall({
            ...INITIAL_SIMPLE_WALL,
            COLOR: 0x2196F3,
            ANGLE: 90,
            HEIGHT: 10,
            WIDTH: 700,
            X: 975,
            Y: 25,
            DIRECTION_OF_MOVEMENT: 0
        })
        const wall3 = new SimpleWall({
            ...INITIAL_SIMPLE_WALL,
            COLOR: 0x4CAF50,
            ANGLE: 180,
            HEIGHT: 10,
            WIDTH: 950,
            X: 975,
            Y: 725,
            DIRECTION_OF_MOVEMENT: 0
        })
        const wall4 = new SimpleWall({
            ...INITIAL_SIMPLE_WALL,
            COLOR: 0xFFEB3B,
            ANGLE: 270,
            HEIGHT: 10,
            WIDTH: 700,
            X: 25,
            Y: 725,
            DIRECTION_OF_MOVEMENT: 0
        })

        this.components = [wall1, wall2, wall3, wall4]
    }
}