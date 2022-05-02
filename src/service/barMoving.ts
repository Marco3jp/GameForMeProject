import {BarMovingInterface} from "../component/service/barMoving";
import {Bar} from "../component/bar";
import {onMouseMoveEvent} from "../component/service/barControllerPositionNotifier";

export class BarMoving implements BarMovingInterface{
    move(component: Bar, mouseMoving: onMouseMoveEvent): void {
        if (!component.instance) return

        const barHalfWidth = component.instance.width / 2

        // FIXME: 本来はステージの数字を見たほうがいいけど一旦ハードコーディングした
        const padding = 25;
        const wallWidth = 10;
        const frameSize = 1000;

        if (mouseMoving.clientX < barHalfWidth + padding + wallWidth){
            // |___           |
            component.instance.x = 25 + 10
        } else if (mouseMoving.clientX > frameSize - padding - wallWidth - barHalfWidth) {
            // |           ___|
            component.instance.x = frameSize - padding - wallWidth - component.instance.width
        } else {
            // |   ___        |
            component.instance.x = mouseMoving.clientX - barHalfWidth
        }
    }
}