export interface EventInterface {
    addMatterEventListener(eventName: string, callback: (e: any) => void): void
}
