export const INITIAL_BALL: initial_ball = {
    X: 5,
    Y: 5,
    RADIUS: 5,
    COLOR: 0xffffff,
    SPEED: 1,
    ANGLE: 45,
    COLLISIONABLE: true
}

export type initial_ball = {
    X: number,
    Y: number,
    RADIUS: number,
    COLOR: number,
    SPEED: number,
    ANGLE: number,
    COLLISIONABLE: boolean
}