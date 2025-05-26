export interface IAisMessage {
    toArmoredString(): string;
}
export interface IAisMessageConstructor<T extends IAisMessage = IAisMessage> {
    new (armoredString: string): T;
}

