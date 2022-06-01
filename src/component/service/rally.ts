import {Component} from "../component";
import {Ball} from "../ball";

export interface RallyInterface {
    tryRally(ball: Ball, rackettableObject: Component): void
}