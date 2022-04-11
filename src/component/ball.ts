import * as PIXI from 'pixi.js';
import {Graphics} from "pixi.js";
import {initial_ball, INITIAL_BALL} from "../service/parameter/ball";


export class Ball {
    instance: Graphics

    constructor(initial: initial_ball = INITIAL_BALL) {
        this.instance = new PIXI.Graphics()
        this.instance.beginFill(initial.COLOR)
        this.instance.drawCircle(initial.X, initial.Y, initial.RADIUS)
        this.instance.endFill()
        PIXI.Ticker.shared.add(()=> {
            this.instance.x += 0.5;
            this.instance.y += 0.5;
        })
    }
}