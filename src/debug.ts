import {main} from "./main";
import MatterTools from "matter-tools"
import  "matter-js";


// @ts-ignore
MatterTools.Demo.create({
    fullPage: true,
    preventZoom: true,
    startExample: true,
    appendTo: document.body,

    toolbar: {
        title: 'GameForMeProject',
        url: 'https://github.com/Marco3jp/GameForMeProject',
        reset: true,
        source: true,
        inspector: true,
        tools: true,
        fullscreen: true,
        exampleSelect: true
    },

    tools: {
        inspector: true,
        gui: true
    },

    examples: [
        {
            name: 'main',
            id: 'main',
            init: main,
        },
    ]
});
