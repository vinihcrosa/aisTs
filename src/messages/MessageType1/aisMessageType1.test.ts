import {describe, expect, it} from 'vitest';
import { AisMessageType1} from "./index";

describe(`AisMessageType1`, () => {
    it("should create a valid ais message type 1 from binary string", () => {
        const armoredString = "13ku<7hw18LrQDSjpBPnr5Tl0D2j";

        const aisMessage = AisMessageType1.fromArmoredString(armoredString);

        expect(aisMessage).toBeInstanceOf(AisMessageType1);
        expect(aisMessage.repeatIndicator).toBe(0);
        expect(aisMessage.mmsi).toBe("255806495");
        expect(aisMessage.navigationStatus).toBe(0);
        expect(aisMessage.rateOfTurn).toBeLessThan(0);
        expect(aisMessage.rateOfTurn).toBeGreaterThan(-1);
        expect(aisMessage.speedOverGround).toBe(7.2);
        expect(aisMessage.positionAccuracy).toBe(0);
        expect(aisMessage.longitude).toBeCloseTo(-43.140025, 6);
        expect(aisMessage.latitude).toBeCloseTo(-22.9297, 4);
        expect(aisMessage.courseOverGround).toBe(176.8);
        expect(aisMessage.trueHeading).toBe(178);
        expect(aisMessage.timestamp).toBe(26);
        expect(aisMessage.maneuverIndicator).toBe(0);
        expect(aisMessage.spare).toBe(0);
        expect(aisMessage.radioStatus).toBe(82098);
    })

    it('should create a valid armores string', () => {
        const armoredString = "13ku<7hw18LrQDSjpBPnr5Tl0D2j";
        const aisMessage = AisMessageType1.fromArmoredString(armoredString);

        const armoredStringResult = aisMessage.toArmoredString();

        expect(armoredStringResult).toBe(armoredString);
    })
})