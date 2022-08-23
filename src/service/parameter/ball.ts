export const INITIAL_BALL: initial_ball = {
    X: 124,
    Y: 235,
    RADIUS: 5,
    COLOR: 0xffffff,
    SPEED: 8,
    ANGLE: 0,
    DIRECTION_OF_MOVEMENT: 40,
    ACCELERATION_STEP: 0.25,
    ACCELERATION_LIMIT: 30,
    DECELERATION_STEP: 1,
    DECELERATION_LIMIT: 5
}

export type initial_ball = {
    X: number,
    Y: number,
    RADIUS: number,
    COLOR: number,
    SPEED: number,
    ANGLE: number,
    DIRECTION_OF_MOVEMENT: number,
    ACCELERATION_STEP: number,
    ACCELERATION_LIMIT: number,
    DECELERATION_STEP: number,
    DECELERATION_LIMIT: number
}