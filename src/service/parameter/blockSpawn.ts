export const INITIAL_BLOCK_SPAWN:initial_block_spawn = {
    STAGE_MARGIN: {
        Y: 25,
        X: 25
    },
    BLOCK_MARGIN: {
        Y: 50,
        X: 50
    },
    BLOCK_NUMBER_IN_WAVE: 4
}

export type initial_block_spawn = {
    // TODO: Stage側のPaddingで持つかあんまり考えずに書いてる
    STAGE_MARGIN: {
        Y: number,
        X: number
    },
    BLOCK_MARGIN: {
        Y: number // between waves
        X: number
    },
    BLOCK_NUMBER_IN_WAVE: number
}