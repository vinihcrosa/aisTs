export interface IAisMessage {
    toArmoredString(): string;
    getPaddedLength(): number;
}
export interface IAisMessageConstructor<T extends IAisMessage = IAisMessage> {
    new (armoredString: string): T;
}

