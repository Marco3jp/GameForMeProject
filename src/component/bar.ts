import * as PIXI from 'pixi.js';
import {Graphics} from "pixi.js";
import {initial_bar, INITIAL_BAR} from "../service/parameter/bar";


export class Bar {
    instance: Graphics

    constructor(initial: initial_bar = INITIAL_BAR) {
        this.instance = new PIXI.Graphics()
        this.instance.beginFill(initial.COLOR)
        this.instance.drawRect(initial.X, initial.Y, initial.WIDTH, initial.HEIGHT)
        this.instance.endFill()
    }
}