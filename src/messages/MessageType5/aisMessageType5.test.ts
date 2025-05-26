import { describe, expect, it } from 'vitest'
import { AisMessageType5 } from './index'
import {aisMessageCreator} from "../messageCreator";

describe(`AisMessageType5`, () => {
    it("should create a valid ais message type 5 from sofia ship", () => {
        const armoredString = "53ku<7l2D2dd=4EKB20m<>1<tHT60<DhE=@F2217L9;CM6UD0O0TTln`888888888888880";

        const aisMessage = aisMessageCreator(AisMessageType5, armoredString)

        expect(aisMessage).toBeInstanceOf(AisMessageType5);
        expect(aisMessage.repeatIndicator).toBe(0);
        expect(aisMessage.mmsi).toBe("255806495");
        expect(aisMessage.aisVersion).toBe(1);
        expect(aisMessage.imoNumber).toBe(9702091);
        expect(aisMessage.callSign).toBe("CQEV4");
        expect(aisMessage.shipName).toBe("MSC SOFIA CELESTE");
        expect(aisMessage.shipType).toBe(71);
        expect(aisMessage.toBow).toBe(225);
        expect(aisMessage.toStern).toBe(75);
        expect(aisMessage.toPort).toBe(19);
        expect(aisMessage.toStarboard).toBe(29);
        expect(aisMessage.epfd).toBe(1);
        expect(aisMessage.etaMonth).toBe(10);
        expect(aisMessage.etaDay).toBe(10);
        expect(aisMessage.etaHour).toBe(20);
        expect(aisMessage.etaMinute).toBe(0);
        expect(aisMessage.draught).toBe(12.4);
        expect(aisMessage.destination).toBe("BRSSZ");
        expect(aisMessage.dte).toBe(0);
        expect(aisMessage.spare).toBe(0);
    })

    it("should create a valid armored string", () => {
        const armoredString = "53ku<7l2D2dd=4EKB20m<>1<tHT60<DhE=@F2217L9;CM6UD0O0TTln`888888888888880";
        const aisMessage = aisMessageCreator(AisMessageType5, armoredString)

        const newArmoredString = aisMessage.toArmoredString();
        expect(newArmoredString).toBe(armoredString);
    })
})