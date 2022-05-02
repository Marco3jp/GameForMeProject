import {Component} from "../component";

export type Movement = {
    x: number,
    y: number
}

export interface MovingInterface {
    move(component: Component): void
}