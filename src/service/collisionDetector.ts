import {DisplayObject, Rectangle} from "pixi.js";

export class CollisionDetector {
    checkCollision(displayObject1: DisplayObject, displayObject2: DisplayObject):boolean {
        const boundsRectangle1 = displayObject1.getBounds()
        const boundsRectangle2 = displayObject2.getBounds()

        return CollisionDetector.checkCollisionXAxis(boundsRectangle1, boundsRectangle2) &&
            CollisionDetector.checkCollisionYAxis(boundsRectangle1, boundsRectangle2)
    }


    // X軸側に重複あるか
    private static checkCollisionXAxis(displayObject1: Rectangle, displayObject2: Rectangle): boolean {
        if (displayObject1.x >= displayObject2.x) {
            //    o     |    o    |      x
            //    --1-- |    --1--|       --1--
            // --2--    | -2-     | --2--
            return displayObject1.x <= displayObject2.x + displayObject2.width
        } else {
            //    o     |    o     |      x
            // --1--    | --1--    | --1--
            //    --2-- |      -2- |       --2--
            return displayObject1.x + displayObject1.width >= displayObject2.x
        }
    }

    // Y軸側に重複あるか
    private static checkCollisionYAxis(displayObject1: Rectangle, displayObject2: Rectangle): boolean {
        if (displayObject1.y >= displayObject2.y) {
            //  o  :  o  :  x
            //   | :   2 :   2
            //   2 :   | :   |
            // | | : |   :
            // 1   : 1   : |
            // |   : |   : 1
            return displayObject1.y <= displayObject2.y + displayObject2.height
        } else {
            //  o  :  o  :  x
            // |   : |   : 1
            // 1   : 1   : |
            // | | : |   :
            //   2 :   | :   |
            //   | :   2 :   2
            return displayObject1.y + displayObject1.height >= displayObject2.y
        }
    }
}