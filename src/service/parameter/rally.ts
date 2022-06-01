// TODO: これ本来ラリーが持つべきというよりはバーが持つべきステータスな気がしてきた
export const INITIAL_RALLY: initial_rally = {
    FARTHEST_RANGE: 30,
    FAR_RANGE: 20,
    CLOSE_RANGE:  10
}

export type initial_rally = {
    FARTHEST_RANGE: number,
    FAR_RANGE: number,
    CLOSE_RANGE:  number
}