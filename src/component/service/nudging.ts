export enum NudgeDirection {
    LEFT = "LEFT",
    RIGHT = "RIGHT"
}

export interface NudgingInterface {
    calculateNudging(directionOfMovement: number, nudgeDirection: NudgeDirection): number
}