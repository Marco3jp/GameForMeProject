import {ReflectionInterface} from "./reflection";
import {MovingInterface} from "./moving";
import {BarMovingInterface} from "./barMoving";
import {ComponentManagerInterface} from "./componentManager";
import {NudgingInterface} from "./nudging";
import {RallyInterface} from "./rally";

export interface Service {
    reflection: ReflectionInterface
    moving: MovingInterface
    barMoving: BarMovingInterface
    componentManager: ComponentManagerInterface
    nudging: NudgingInterface
    rally: RallyInterface
}