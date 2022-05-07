import {ReflectionInterface} from "./reflection";
import {MovingInterface} from "./moving";
import {BarMovingInterface} from "./barMoving";
import {ComponentManagerInterface} from "./componentManager";

export interface Service {
    reflection: ReflectionInterface
    moving: MovingInterface
    barMoving: BarMovingInterface
    componentManager: ComponentManagerInterface
}