import { describe, expect, it } from 'vitest'
import { AisMessageType5 } from './index'
import {aisMessageCreator} from "../messageCreator";

describe(`AisMessageType5`, () => {
    // it("should create a valid ais message type 5 from sofia ship", () => {
    //     const armoredString = "53ku<7l2D2dd=4EKB20m<>1<tHT60<DhE=@F2217L9;CM6UD0O0TTln`888888888888880";

    //     const aisMessage = aisMessageCreator(AisMessageType5, armoredString)

    //     expect(aisMessage).toBeInstanceOf(AisMessageType5);
    //     expect(aisMessage.repeatIndicator).toBe(0);
    //     expect(aisMessage.mmsi).toBe("255806495");
    //     expect(aisMessage.aisVersion).toBe(1);
    //     expect(aisMessage.imoNumber).toBe(9702091);
    //     expect(aisMessage.callSign).toBe("CQEV4");
    //     expect(aisMessage.shipName).toBe("MSC SOFIA CELESTE");
    //     expect(aisMessage.shipType).toBe(71);
    //     expect(aisMessage.toBow).toBe(225);
    //     expect(aisMessage.toStern).toBe(75);
    //     expect(aisMessage.toPort).toBe(19);
    //     expect(aisMessage.toStarboard).toBe(29);
    //     expect(aisMessage.epfd).toBe(1);
    //     expect(aisMessage.etaMonth).toBe(10);
    //     expect(aisMessage.etaDay).toBe(10);
    //     expect(aisMessage.etaHour).toBe(20);
    //     expect(aisMessage.etaMinute).toBe(0);
    //     expect(aisMessage.draught).toBe(12.4);
    //     expect(aisMessage.destination).toBe("BRSSZ");
    //     expect(aisMessage.dte).toBe(0);
    //     expect(aisMessage.spare).toBe(0);
    // })

    

    // it("should create a valid armored string", () => {
    //     const armoredString = "53ku<7l2D2dd=4EKB20m<>1<tHT60<DhE=@F2217L9;CM6UD0O0TTln`888888888888880";
    //     const aisMessage = new AisMessageType5();

    //     aisMessage.repeatIndicator = 0;
    //     aisMessage.mmsi = "255806495";
    //     aisMessage.aisVersion = 1;
    //     aisMessage.imoNumber = 9702091;
    //     aisMessage.callSign = "CQEV4";
    //     aisMessage.shipName = "MSC SOFIA CELESTE";
    //     aisMessage.shipType = 71;
    //     aisMessage.toBow = 225;
    //     aisMessage.toStern = 75;
    //     aisMessage.toPort = 19;
    //     aisMessage.toStarboard = 29;
    //     aisMessage.epfd = 1;
    //     aisMessage.etaMonth = 10;
    //     aisMessage.etaDay = 10;
    //     aisMessage.etaHour = 20;
    //     aisMessage.etaMinute = 0;
    //     aisMessage.draught = 12.4;
    //     aisMessage.destination = "BRSSZ";
    //     aisMessage.dte = 0;
    //     aisMessage.spare = 0;

    //     const newArmoredString = aisMessage.toArmoredString();
    //     expect(newArmoredString).toBe(armoredString);
    // })

    it("should create a valid ais message type 5 from sofia ship with 0s", () => {
        const armoredString = "53ku<7h2D2dd=4EK@00m<>1<tHT60<DhE=@D001J>IjCC0000Qh00000000000000000000";

        const aisMessage = aisMessageCreator(AisMessageType5, armoredString)

        expect(aisMessage).toBeInstanceOf(AisMessageType5);
        expect(aisMessage.repeatIndicator).toBe(0);
        expect(aisMessage.mmsi).toBe("255806495");
        expect(aisMessage.aisVersion).toBe(0);
        expect(aisMessage.imoNumber).toBe(9702091);
        expect(aisMessage.callSign).toBe("CQEV4");
        expect(aisMessage.shipName).toBe("MSC SOFIA CELESTE");
        expect(aisMessage.shipType).toBe(90);
        expect(aisMessage.toBow).toBe(115);
        expect(aisMessage.toStern).toBe(114);
        expect(aisMessage.toPort).toBe(19);
        expect(aisMessage.toStarboard).toBe(19);
        expect(aisMessage.epfd).toBe(0);
        expect(aisMessage.etaMonth).toBe(0);
        expect(aisMessage.etaDay).toBe(0);
        expect(aisMessage.etaHour).toBe(0);
        expect(aisMessage.etaMinute).toBe(0);
        expect(aisMessage.draught).toBe(13.5);
        expect(aisMessage.destination).toBe("");
        expect(aisMessage.dte).toBe(0);
        expect(aisMessage.spare).toBe(0);
    })

    it("should create a valid armored string", () => {
        const armoredString = "53ku<7h2D2dd=4EK@00m<>1<tHT60<DhE=@D001J>IjCC0000Qh00000000000000000000";
        const aisMessage = new AisMessageType5();

        aisMessage.repeatIndicator = 0;
        aisMessage.mmsi = "255806495";
        aisMessage.aisVersion = 0;
        aisMessage.imoNumber = 9702091;
        aisMessage.callSign = "CQEV4";
        aisMessage.shipName = "MSC SOFIA CELESTE";
        aisMessage.shipType = 90;
        aisMessage.toBow = 115;
        aisMessage.toStern = 114;
        aisMessage.toPort = 19;
        aisMessage.toStarboard = 19;
        aisMessage.epfd = 0;
        aisMessage.etaMonth = 0;
        aisMessage.etaDay = 0;
        aisMessage.etaHour = 0;
        aisMessage.etaMinute = 0;
        aisMessage.draught = 13.5;
        aisMessage.destination = "";
        aisMessage.dte = 0;
        aisMessage.spare = 0;

        const newArmoredString = aisMessage.toArmoredString();
        expect(newArmoredString).toBe(armoredString);
    })
})