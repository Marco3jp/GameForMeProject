// TODO: これ本来ラリーが持つべきというよりはバーが持つべきステータスな気がしてきた
export const INITIAL_RALLY: initial_rally = {
    FARTHEST_RANGE: 45,
    FAR_RANGE: 30,
    CLOSE_RANGE:  15
}

export type initial_rally = {
    FARTHEST_RANGE: number,
    FAR_RANGE: number,
    CLOSE_RANGE:  number
}