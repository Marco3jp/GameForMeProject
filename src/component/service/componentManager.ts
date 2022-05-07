import {Component} from "../component";

export interface ComponentManagerInterface {
    add: (component: Component) => void
    remove: (component: Component) => void

    get list(): Component[]
}