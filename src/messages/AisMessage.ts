import {IAisMessage} from "./aisMessage.interface";

export class AisMessage {
    public header: string = '!AIVDM';
    public id: string = Math.floor(Math.random() * 10).toString();
    public channel: string = 'A';
    public aisMessage: IAisMessage;

    constructor(header: string, id: string, channel: string, aisMessage: IAisMessage) {
        this.header = header;
        this.id = id;
        this.channel = channel;
        this.aisMessage = aisMessage;
    }

    public toNmea(): string[] {
        const MAX_PAYLOAD_LENGTH = 62;
        const armoredPayload = this.aisMessage.toArmoredString();
        const totalFragments = Math.ceil(this.aisMessage.toArmoredString().length / MAX_PAYLOAD_LENGTH);

        const sentences: string[] = [];

        for (let i = 0; i < totalFragments; i++) {
            const fragmentNumber = i + 1;
            const start = i * MAX_PAYLOAD_LENGTH;
            const end = start + MAX_PAYLOAD_LENGTH;
            const payloadPart = armoredPayload.slice(start, end);

            const pad = i === totalFragments - 1 ? this.aisMessage.getPaddedLength().toString() : '0';

            const sentence = `${this.header},${totalFragments},${fragmentNumber},${totalFragments > 1 ? this.id : ''},${this.channel},${payloadPart},${pad}`;
            sentences.push(sentence);
        }

        return sentences;
    }
}