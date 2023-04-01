import {EventInterface} from "../component/service/event";
import {Engine, Events} from "matter-js";

type EventServiceInput = {
    matterEngine: Engine
}

export class Event implements EventInterface {
    matterEngine: Engine

    constructor(input: EventServiceInput) {
        this.matterEngine = input.matterEngine
    }

    addMatterEventListener(eventName: string, callback: (e: any) => void): void {
        Events.on(this.matterEngine, eventName, callback)
    }
}
