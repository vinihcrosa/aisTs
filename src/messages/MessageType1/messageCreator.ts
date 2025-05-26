import {IAisMessage, IAisMessageConstructor} from "../aisMessage.interface";

export function aisMessageCreator<T extends IAisMessage>(
    ctor: IAisMessageConstructor<T>,
    armoredString: string
): T {
    if (!ctor || typeof ctor !== 'function') {
        throw new Error("Invalid constructor provided");
    }
    if (!armoredString || typeof armoredString !== 'string') {
        throw new Error("Invalid armored string provided");
    }

    return new ctor(armoredString);
}