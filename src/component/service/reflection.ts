export type reflectionInput = {
    angle: number
}

export interface ReflectionInterface {
    calculateWithLine(reflective: reflectionInput, wall: reflectionInput): number
}