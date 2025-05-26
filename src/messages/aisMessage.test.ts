import {describe, it, expect} from "vitest";
import { AisMessage} from "./AisMessage";
import {aisMessageCreator} from "./messageCreator";
import {AisMessageType1} from "./MessageType1";
import {AisMessageType5} from "./MessageType5";

describe("AisMessage", () => {
    it("should create a valid AIS message type 1", () => {
        const armoredString = "13ku<7hw18LrQDSjpBPnr5Tl0D2j";

        const nmeaMessage = "!AIVDM,1,1,,A,13ku<7hw18LrQDSjpBPnr5Tl0D2j,0";
        const aisMessageType1 = aisMessageCreator(AisMessageType1, armoredString);

        const aisMessage = new AisMessage("!AIVDM", "1", "A", aisMessageType1);

        const sentences = aisMessage.toNmea();

        expect(sentences).length(1);
        expect(sentences[0]).toBe(nmeaMessage);
    })

    it("should create a valid AIS message type 5", () => {
        const armoredString = "53ku<7l2D2dd=4EKB20m<>1<tHT60<DhE=@F2217L9;CM6UD0O0TTln`888888888888880";

        const nmeaMessages = [
            "!AIVDM,2,1,1,A,53ku<7l2D2dd=4EKB20m<>1<tHT60<DhE=@F2217L9;CM6UD0O0TTln`888888,0",
            "!AIVDM,2,2,1,A,888888880,2"
        ]

        const aisMessage = aisMessageCreator(AisMessageType5, armoredString)
        const aisMessageObj = new AisMessage("!AIVDM", "1", "A", aisMessage);
        const sentences = aisMessageObj.toNmea();

        expect(sentences).length(2);
        expect(sentences[0]).toBe(nmeaMessages[0]);
        expect(sentences[1]).toBe(nmeaMessages[1]);
    })
})