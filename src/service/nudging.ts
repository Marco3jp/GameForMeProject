import {NudgeDirection, NudgingInterface} from "../component/service/nudging";

export class Nudging implements NudgingInterface {
    calculateNudging(directionOfMovement: number, nudgeDirection: NudgeDirection): number {
        directionOfMovement = directionOfMovement % 360

        if (directionOfMovement >= 0 && directionOfMovement < 180) {
            if (nudgeDirection === NudgeDirection.LEFT) {
                return (180 - directionOfMovement) / 2 + directionOfMovement
            }

            return directionOfMovement / 2
        } else if (directionOfMovement === 180) {
            return 180
        } else if (directionOfMovement > 180 && directionOfMovement < 360) {
            if (nudgeDirection === NudgeDirection.LEFT) {
                return ((directionOfMovement - 180) / 2) + 180
            }

            return (180 - (directionOfMovement - 180)) / 2 + directionOfMovement
        }

        throw new Error("failed calculateNudging")
    }
}