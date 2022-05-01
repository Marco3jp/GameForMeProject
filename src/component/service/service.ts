import {ReflectionInterface} from "./reflection";
import {MovingInterface} from "./moving";

export interface Service {
    reflection: ReflectionInterface
    moving: MovingInterface
}