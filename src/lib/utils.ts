export function numberPadding(v: number, length: number = 2, paddingCharacter: string = '0'): string {
    return v.toString().padStart(length, paddingCharacter)
}
