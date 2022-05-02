import {ReflectionInterface} from "./reflection";
import {MovingInterface} from "./moving";
import {BarMovingInterface} from "./barMoving";

export interface Service {
    reflection: ReflectionInterface
    moving: MovingInterface
    barMoving: BarMovingInterface
}