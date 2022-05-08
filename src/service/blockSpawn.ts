import {Service} from "../component/service/service";
import {INITIAL_BLOCK_SPAWN, initial_block_spawn} from "./parameter/blockSpawn";
import {INITIAL_BLOCK} from "./parameter/block";
import * as PIXI from "pixi.js";
import {Block} from "../component/block";
import {CANVAS_PADDING, STAGE_SIZE, WALL_THICKNESS} from "../component/stage/simpleStage/simpleStage";

export class BlockSpawn {
    stageMargin: {
        x: number,
        y: number
    }
    blockMargin: {
        x: number,
        y: number
    }
    blockThickness: number
    service: Service
    waveIntervalMillSeconds: number
    blockSpeed: number
    blockNumberInWave: number
    lastSpawnTimestamp: number

    constructor(service: Service, initial: initial_block_spawn = INITIAL_BLOCK_SPAWN) {
        this.service = service

        this.stageMargin = {
            x: initial.STAGE_MARGIN.X,
            y: initial.STAGE_MARGIN.Y
        }

        this.blockMargin = {
            x: initial.BLOCK_MARGIN.X,
            y: initial.BLOCK_MARGIN.Y
        }

        this.blockThickness = INITIAL_BLOCK.HEIGHT

        this.blockSpeed = INITIAL_BLOCK.SPEED

        // TODO: かなり雑に計算しているのであとから直したい
        this.waveIntervalMillSeconds = (this.blockThickness + this.blockMargin.y) / (this.blockSpeed * 60) * 1000

        this.blockNumberInWave = INITIAL_BLOCK_SPAWN.BLOCK_NUMBER_IN_WAVE

        this.lastSpawnTimestamp = 0

        PIXI.Ticker.shared.add(() => {
            if (this.lastSpawnTimestamp + this.waveIntervalMillSeconds > Date.now()) return

            const wave = this.createWave()
            wave.forEach(block => {
                this.service.componentManager.add(block)
            })

            this.lastSpawnTimestamp = Date.now()
        })
    }

    createWave(): Block[] {
        const waveWidth = STAGE_SIZE.X - WALL_THICKNESS * 2 - this.stageMargin.x * 2
        const blockMarginCount = this.blockNumberInWave - 1
        const blockWidth = (waveWidth - (blockMarginCount * this.blockMargin.x)) / this.blockNumberInWave

        const blocks: Block[] = []
        let blockXCoord = CANVAS_PADDING.X + WALL_THICKNESS + this.stageMargin.x;

        for (let i = 0; i < this.blockNumberInWave; i++) {
            const block = new Block(this.service, {
                ...INITIAL_BLOCK,
                WIDTH: blockWidth,
                HEIGHT: this.blockThickness,
                SPEED: this.blockSpeed,
            }, {
                x: blockXCoord,
                y: this.stageMargin.y,
            })

            blocks.push(block)
            blockXCoord += (blockWidth + this.blockMargin.x)
        }

        return blocks
    }
}